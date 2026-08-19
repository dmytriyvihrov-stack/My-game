# ============================================================================
# ONE COMMAND. Builds the playable page, checks it is not silent, pushes it.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File deploy.ps1
#   ... -Audio                 re-encode the sound too (only after audio/ changed)
#   ... -m "what changed"      your own commit message
#   ... -NoPush                build and commit, do not push
#   ... -Player                ALSO build play\index.html: the playtester build
#                              with the developer tools unreachable (#202)
#   ... -Branch                allow a deploy from a work/ branch: it pushes THAT
#                              branch and leaves the live link alone (#202)
#
# The live page updates about a minute after the push. The link never changes.
# Full explanation in docs\DEPLOY.md.
#
# THE PLAYER BUILD (#202, 2026-08-19). The playtester's page lives at play\ so
# the user's own link keeps its dev tools and the buddy's has none: same file,
# same sound, same art, minus the cog (see tools\build_site.ps1 -Player). It is
# served at <live link>/play/ once the commit is on main, and guarded here by
# reading the marker out of the built file, never by trusting the build ran.
# NOTE: a -Branch deploy pushes a work branch. GitHub Pages serves main/(root)
# only, so nothing a playtester can open changes until that branch is merged;
# the script says so instead of printing a URL that is not live.
#
# THE ONE THING THIS SCRIPT EXISTS TO PREVENT: shipping a silent build. The
# working file prototype\grimtoll_slice.html has an EMPTY audio table on
# purpose, because at this desk the game reads the WAV masters out of audio\.
# A host has no such folder. Copying the working file to a host therefore
# produces a game that plays perfectly here and is silent for every playtester,
# which is exactly what happened from build 8f.70 until 8f.111 and was reported
# as the music dying. So this script REFUSES to push a page with no sound in it.
#
# ---------------------------------------------------------------------------
# KEEP THIS FILE PURE ASCII. PowerShell 5.1 reads a .ps1 as ANSI and the repo
# path contains Cyrillic ("Google <disk>"): a literal non-ASCII character here
# comes back as mojibake at runtime. Every path derives from $PSScriptRoot.
# ---------------------------------------------------------------------------
param(
  [switch] $Audio,
  [Alias('m')] [string] $Message = '',
  [switch] $NoPush,
  [switch] $Player,
  [switch] $Branch
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
Set-Location $root

function Step($n, $t) { Write-Host ""; Write-Host "[$n] $t" -ForegroundColor Cyan }
function Die($t) { Write-Host ""; Write-Host "STOPPED: $t" -ForegroundColor Red; exit 1 }

if (-not (Test-Path (Join-Path $root '.git'))) { Die "this is not a git repo. Run: git init -b main" }

# ---- 0a. the right desk, the right branch ----------------------------------
# Since branch-per-session (#139) there can be several checkouts of this repo on
# this machine. Step 4 runs `git add -A` and step 5 runs `git push origin HEAD`,
# so a deploy from a branch desk would push work\<name> to the live link with
# half a feature in it. In a worktree `.git` is a FILE, not a folder, so the
# check above passes there and is not enough on its own.
Push-Location $root
try {
  $common = (& git rev-parse --git-common-dir 2>$null)
  $branch = (& git rev-parse --abbrev-ref HEAD 2>$null)
} finally { Pop-Location }

if ($common) {
  $common = $common.Trim()
  if (-not [System.IO.Path]::IsPathRooted($common)) { $common = Join-Path $root $common }
  $mainRoot = Split-Path (Resolve-Path -LiteralPath $common).Path -Parent
  if ((Resolve-Path -LiteralPath $root).Path -ne (Resolve-Path -LiteralPath $mainRoot).Path) {
    Die "this is a branch desk, and the live link is published from the MAIN desk only.`n         Merge first, then deploy from:  $mainRoot`n         (tools\branch.ps1 done <name>)"
  }
}
$onBranch = ($branch -and $branch.Trim() -ne 'main')
if ($onBranch -and -not $Branch) {
  Die "on branch '$($branch.Trim())'. deploy pushes HEAD, so this would publish a work branch.`n         Switch to main and merge the branch in:  tools\branch.ps1 done <name>`n         (or pass -Branch to push this branch on purpose; the live link stays as it is)"
}
if ($onBranch) { $branch = $branch.Trim(); Write-Host "branch deploy: '$branch' will be pushed, main and the live link are untouched" -ForegroundColor Yellow }

# ---- 0. the other session --------------------------------------------------
# Step 4 below runs `git add -A`, which sweeps the ENTIRE working tree, and step
# 5 pushes it to the live link. Two Claude sessions share one working tree here,
# so a deploy from this one would publish the other one's half-finished
# prototype to every playtester. See docs\PARALLEL_SESSIONS.md.
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $root 'tools\claim.ps1') gate
if ($LASTEXITCODE -ne 0) { Die "another session owns the prototype. Its work would go live with yours." }

# ---- 1. sound --------------------------------------------------------------
# Skipped by default because ffmpeg takes about half a minute and the approved
# pack almost never changes. Pass -Audio the day it does.
$dataJs = Join-Path $root 'audio\out\audio_data.js'
if ($Audio -or -not (Test-Path $dataJs)) {
  Step 1 "encoding the audio pack (this is the slow one, about 30s)"
  & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $root 'audio\build_audio.ps1')
  if ($LASTEXITCODE -ne 0) { Die "build_audio.ps1 failed. Is ffmpeg installed, and is the audio\ folder present?" }
} else {
  Step 1 "audio: reusing audio\out\audio_data.js (pass -Audio to re-encode)"
}

# ---- 2. build --------------------------------------------------------------
Step 2 "building index.html from the prototype"
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $root 'tools\build_site.ps1')
if ($LASTEXITCODE -ne 0) { Die "build_site.ps1 failed" }
if ($Player) {
  Step 2 "building play\index.html, the playtester build (no developer tools)"
  & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $root 'tools\build_site.ps1') -Player -Out 'play\index.html'
  if ($LASTEXITCODE -ne 0) { Die "build_site.ps1 -Player failed" }
}

# ---- 3. the guard ----------------------------------------------------------
# Read the built file back and count what is actually in it. Asserting on the
# thing that ships, not on the thing that was meant to ship, is the whole point.
# One function, run on every page this script ships, so the player build is
# held to the same floor as the main one plus its own marker.
function Check-Page($rel, $wantPlayer) {
  $path  = Join-Path $root $rel
  $built = Get-Content $path -Raw -Encoding utf8
  $cues  = ([regex]::Matches($built, 'data:audio/')).Count
  $art   = ([regex]::Matches($built, 'data:image/')).Count
  $mb    = [Math]::Round((Get-Item $path).Length / 1MB, 2)
  "      $rel : $cues audio cues | $art pictures | $mb MB"
  if ($cues -lt 11) { Die "only $cues audio cues in $rel, expected 11 or more. It would be SILENT for everyone. Run with -Audio." }
  if ($art  -lt 100) { Die "only $art pictures in $rel. Something is wrong with the art block." }
  # The world map's ground is the ONE picture in the build with a working
  # fallback behind it, so its absence is the only one that is invisible: the
  # map simply draws the procedural terrain again and says nothing. Every other
  # missing image leaves a hole somebody reports. It is asserted by name.
  if ($built -notmatch 'data:image/webp;base64,') { Die "the world map's painted ground is not in $rel. The map would silently fall back to the procedural terrain and nobody would notice." }
  # The two builds are told apart by what is IN the file, never by which
  # command was run: the player page must carry the marker and no cog, the
  # main page must carry the cog and no marker.
  $isPlayer = $built.Contains('/*__PLAYER_BUILD__*/')
  $hasCog   = $built.Contains('id="testBtn"')
  if ($wantPlayer -and (-not $isPlayer -or $hasCog)) { Die "$rel was meant to be the player build and still has the developer tools in it (marker $isPlayer, cog $hasCog)." }
  if (-not $wantPlayer -and ($isPlayer -or -not $hasCog)) { Die "$rel was meant to be the main build and the developer tools are missing from it (marker $isPlayer, cog $hasCog)." }
  "      $rel : " + $(if ($isPlayer) { 'PLAYER build, no developer tools' } else { 'main build, developer tools behind the cog' })
}
Step 3 "checking the built page(s)"
Check-Page 'index.html' $false
if ($Player) { Check-Page 'play\index.html' $true }

# ---- 4. commit -------------------------------------------------------------
Step 4 "committing"
# Say out loud what -A is about to sweep up. A deploy that quietly carries eight
# files you did not touch is how another session's work ends up in your commit.
$sweep = & git status --porcelain
if ($sweep) {
  "      this commit will contain:"
  foreach ($line in $sweep) { "        $line" }
}
& git add -A
$dirty = & git status --porcelain
if (-not $dirty) {
  "      nothing changed, keeping the last commit"
} else {
  if (-not $Message) { $Message = "deploy: rebuild the playable page ({0})" -f (Get-Date -Format 'yyyy-MM-dd HH:mm') }
  & git commit -q -m $Message
  if ($LASTEXITCODE -ne 0) { Die "git commit failed" }
  "      " + (& git log --oneline -1)
}

# ---- 5. push ---------------------------------------------------------------
# `git remote get-url` on a missing remote writes to stderr, and PowerShell 5.1
# turns a native command's stderr into an ErrorRecord under ErrorActionPreference
# Stop. Ask the question that cannot fail instead.
$remote = ''
if ((& git remote) -contains 'origin') { $remote = (& git remote get-url origin) }
if (-not $remote) {
  Write-Host ""
  Write-Host "NO REMOTE YET. Four clicks, once ever:" -ForegroundColor Yellow
  Write-Host "  1. github.com/new  ->  name it grimtoll  ->  Public  ->  do NOT add a README"
  Write-Host "  2. git remote add origin https://github.com/<you>/grimtoll.git"
  Write-Host "  3. git push -u origin main"
  Write-Host "  4. repo Settings -> Pages -> Deploy from a branch -> main / (root) -> Save"
  Write-Host ""
  Write-Host "Then this script pushes on its own every time. See docs\DEPLOY.md."
  exit 0
}

if ($NoPush) { Step 5 "committed, not pushed (-NoPush)"; exit 0 }

Step 5 "pushing"
& git push -q -u origin HEAD
if ($LASTEXITCODE -ne 0) { Die "git push failed. If it is asking for a password, GitHub wants a personal access token, not your account password. See docs\DEPLOY.md." }

# https://github.com/<user>/<repo>.git  ->  https://<user>.github.io/<repo>/
if ($remote -match 'github\.com[:/]([^/]+)/([^/.]+)') {
  $url = "https://{0}.github.io/{1}/" -f $matches[1], $matches[2]
  Write-Host ""
  if ($onBranch) {
    # Pages serves main/(root) only. Printing the live URL here would claim a
    # page a playtester cannot open yet.
    Write-Host "PUSHED BRANCH '$branch'. THE LIVE LINK IS UNCHANGED." -ForegroundColor Yellow
    Write-Host "  to put it live: merge the branch into main, then run deploy.ps1 again from main."
    Write-Host "  it will then be at:   $url"
    if ($Player) { Write-Host "  and the playtester's page at:   ${url}play/" }
  } else {
    Write-Host "LIVE IN ABOUT A MINUTE: $url" -ForegroundColor Green
    if ($Player) { Write-Host "PLAYTESTER BUILD (no developer tools): ${url}play/" -ForegroundColor Green }
    Write-Host "(hard-refresh with Ctrl+F5 if you still see the old one)"
  }
}
