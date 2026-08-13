# ============================================================================
# branch.ps1 - one branch and one desk per session. This is what replaced the
# queue. (#139)
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\branch.ps1 <verb>
#
#   new <name> [-t "what it is"]  branch work/<name> and a desk to work in
#   list                          every desk, its branch, how far ahead it is
#   done <name>                   merge it back, then take the desk away
#   drop <name>                   throw the desk away WITHOUT merging
#   setup                         register the merge drivers. Idempotent
#   where                         which desk am I standing in right now
#
# WHY THIS EXISTS. `claim.ps1 lock` made two sessions take turns on
# prototype\grimtoll_slice.html. That is the correct rule when they share one
# directory, and it is unbearable when the edits are small: the second session
# waits out the first one's whole feature to change six lines of CSS.
#
# A git worktree is a second working directory on the same .git. Each session
# gets its own directory and its own branch, edits the same file at the same
# time as the other one, and git merges the result the way it merges any source
# file. No queue.
#
# WHAT IS STILL SHARED, BECAUSE GIT CANNOT MERGE A COUNTER: the NUMBERS. Two
# desks that both invent "#140" produce two entries with one number and no
# merge can tell them apart. claim.ps1 resolves .grimtoll\ through
# `git rev-parse --git-common-dir`, so every desk asks the SAME store. Take a
# number before you write one, exactly as before.
#
# WHERE DESKS LIVE, AND WHY NOT NEXT TO THE REPO. The repo sits in a Google
# Drive folder. A worktree holds a full checkout, and pointing Drive at three
# more copies of a 5.6 MB prototype plus a 10 MB index.html is both wasteful
# and a real corruption risk while git is writing. Desks default to
# %USERPROFILE%\grimtoll-desks\<name>, outside Drive. Override with -Path.
# ---------------------------------------------------------------------------
# KEEP THIS FILE PURE ASCII, same reason as claim.ps1 and deploy.ps1:
# PowerShell 5.1 reads a .ps1 as ANSI and the repo path contains Cyrillic
# ("Google <disk>"). Every path derives from $PSScriptRoot.
# ---------------------------------------------------------------------------
[CmdletBinding()]
param(
  [Parameter(Position = 0)]
  [ValidateSet('new', 'list', 'done', 'drop', 'setup', 'where')]
  [string] $Verb = 'list',

  [Parameter(Position = 1)]
  [string] $Name = '',

  [Alias('t')] [string] $Title = '',
  [string] $Path = '',
  [switch] $Force
)

$ErrorActionPreference = 'Stop'

$Root = Split-Path $PSScriptRoot -Parent

function Die([string] $m) { Write-Host ""; Write-Host "  $m" -ForegroundColor Red; Write-Host ""; exit 1 }
function Say([string] $m) { Write-Host "  $m" }
function Ok ([string] $m) { Write-Host "  $m" -ForegroundColor Green }
function Hm ([string] $m) { Write-Host "  $m" -ForegroundColor Yellow }
function Dim([string] $m) { Write-Host "  $m" -ForegroundColor DarkGray }

# NOT named "Git". In PowerShell a function shadows an external command of the
# same name, so a helper called Git whose body runs `& git ...` calls ITSELF and
# the script hangs in recursion instead of failing with anything readable. This
# one cost a two-minute timeout to find. Resolve the executable once, call that.
$GitExe = (Get-Command git -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1).Source
if (-not $GitExe) { Write-Host "  git is not on PATH" -ForegroundColor Red; exit 1 }

# ⛔ NO param() BLOCK, AND THAT IS THE POINT. A [Parameter()] attribute makes
# this an ADVANCED function, which silently gains -Debug, -Verbose and the rest
# of the common parameters. `Gitx branch -d work/x` then binds `-d` as a prefix
# of -Debug, eats it, and runs `git branch work/x`, which CREATES the branch it
# was told to delete and reports "a branch named work/x already exists". The
# desk went away, the branch did not, and nothing looked like it had failed.
# A simple function does no parameter binding: everything lands in $args.
function Gitx {
  Push-Location $Root
  try { & $GitExe @args } finally { Pop-Location }
}

# The ONE .git, whichever desk is asking. Its parent is the main worktree.
function Get-MainRoot {
  $common = Gitx rev-parse --git-common-dir
  if (-not $common) { Die "not a git repo" }
  $common = $common.Trim()
  if (-not [System.IO.Path]::IsPathRooted($common)) { $common = Join-Path $Root $common }
  return (Split-Path (Resolve-Path -LiteralPath $common).Path -Parent)
}

function Clean-Name([string] $n) {
  if (-not $n) { Die "which one. Give it a name: branch.ps1 new battle-panel" }
  $n = $n.Trim().ToLower() -replace '[^a-z0-9\-]', '-' -replace '-+', '-'
  return $n.Trim('-')
}

function Desk-Path([string] $n) {
  if ($Path) { return $Path }
  return (Join-Path (Join-Path $env:USERPROFILE 'grimtoll-desks') $n)
}

# ---------------------------------------------------------------------------
# setup - the merge drivers. This is the half of #139 that does the real work.
#
# THE RULE: NOTHING GENERATED IS EVER MERGED. IT IS REBUILT AFTER THE MERGE.
#
# index.html is 10 MB of base64 that deploy.ps1 writes out of the prototype.
# art\embed\art_data.js is the painted block that build_assets.ps1 writes out
# of art\src. If two desks both rebuild one of those, git hands you a conflict
# in a blob no human can resolve, and the resolution was always going to be
# "rebuild it anyway". So both take `ours` and are regenerated on main.
#
# The append-only logs take `union`, which keeps BOTH sides instead of
# conflicting every single time two desks each add a row. The order can come
# out interleaved and that is a two-second tidy, not a blocked merge.
# ---------------------------------------------------------------------------
function Verb-Setup {
  # `ours` is not a built-in driver name, it has to be declared once per clone.
  # `true` as the driver command means "succeed and keep what is already there".
  Gitx config merge.ours.driver true | Out-Null
  Ok "merge drivers registered in this clone"
  Dim "  generated files keep main's copy and are rebuilt: index.html, art\embed\art_data.js"
  Dim "  append-only logs keep both sides:                 CHANGELOG.md, WHAT_TO_TEST.md, SHIPPED.md"
}

# ---------------------------------------------------------------------------
function Verb-New {
  $n = Clean-Name $Name
  $branch = "work/$n"
  $desk = Desk-Path $n

  if (Test-Path $desk) { Die "there is already a desk at $desk. Use it, or: branch.ps1 drop $n" }

  $exists = Gitx branch --list $branch
  if ($exists) { Die "branch $branch already exists. Open its desk with: branch.ps1 list" }

  Verb-Setup

  # Always off main, never off whatever this desk happens to be sitting on.
  # A desk branched off another desk merges twice and confuses every count.
  Gitx worktree add -b $branch "$desk" main
  if ($LASTEXITCODE -ne 0) { Die "git worktree add failed" }

  if ($Title) {
    $note = Join-Path $desk '.desk'
    Set-Content -Path $note -Value $Title -Encoding ascii
  }

  Write-Host ""
  Ok "desk ready"
  Say "  branch   $branch"
  Say "  folder   $desk"
  if ($Title) { Say "  doing    $Title" }
  Write-Host ""
  Dim "Open a Claude session with that folder as its working directory and it is"
  Dim "isolated: no lock, no queue, the prototype is yours. Take a number the same"
  Dim "way as always - the store is shared, so numbers still cannot collide:"
  Dim "  powershell -NoProfile -File tools\claim.ps1 number both -t `"$n`""
  Write-Host ""
  Dim "When it is finished, from the MAIN folder:"
  Dim "  powershell -NoProfile -File tools\branch.ps1 done $n"
  Write-Host ""
}

# ---------------------------------------------------------------------------
function Verb-List {
  $main = Get-MainRoot
  Write-Host ""
  Say "main desk   $main"
  Write-Host ""

  $raw = Gitx worktree list --porcelain
  $cur = @{}
  $rows = @()
  foreach ($line in $raw) {
    if ($line -match '^worktree (.+)$')     { if ($cur.Count) { $rows += $cur }; $cur = @{ path = $Matches[1] } }
    elseif ($line -match '^branch (.+)$')   { $cur.branch = ($Matches[1] -replace '^refs/heads/', '') }
    elseif ($line -match '^detached$')      { $cur.branch = '(detached)' }
  }
  if ($cur.Count) { $rows += $cur }

  $any = $false
  foreach ($r in $rows) {
    $p = $r.path -replace '/', '\'
    if ((Resolve-Path -LiteralPath $p -ErrorAction SilentlyContinue).Path -eq (Resolve-Path -LiteralPath $main).Path) { continue }
    $any = $true
    $b = $r.branch
    $counts = Gitx rev-list --left-right --count "main...$b"
    $behind = 0; $ahead = 0
    if ($counts -match '(\d+)\s+(\d+)') { $behind = [int] $Matches[1]; $ahead = [int] $Matches[2] }

    $note = ''
    $nf = Join-Path $p '.desk'
    if (Test-Path $nf) { $note = (Get-Content $nf -Raw).Trim() }

    $dirty = ''
    if (Test-Path $p) {
      Push-Location $p
      try { $st = & git status --porcelain } finally { Pop-Location }
      if ($st) { $dirty = (" " + @($st).Count + " uncommitted") }
    } else { $dirty = " FOLDER MISSING" }

    Write-Host ("  {0,-22} {1}" -f $b, $p)
    $line = "                         $ahead ahead, $behind behind main$dirty"
    if ($ahead -gt 0 -or $dirty) { Hm $line } else { Dim $line }
    if ($note) { Dim "                         $note" }
  }
  if (-not $any) { Dim "no desks open. Make one: branch.ps1 new <name>" }
  Write-Host ""
}

# ---------------------------------------------------------------------------
function Verb-Done {
  $n = Clean-Name $Name
  $main = Get-MainRoot
  if ((Resolve-Path -LiteralPath $Root).Path -ne (Resolve-Path -LiteralPath $main).Path) {
    Die "run this from the MAIN folder, not from a desk:`n  $main"
  }

  $merge = Join-Path $PSScriptRoot 'merge.ps1'
  & powershell -NoProfile -ExecutionPolicy Bypass -File $merge $n
  if ($LASTEXITCODE -ne 0) { Die "merge did not finish. The desk is untouched, fix it and run this again." }

  $desk = Desk-Path $n
  Gitx worktree remove "$desk" --force
  Gitx branch -d "work/$n"
  Ok "desk closed, branch deleted, work is on main"
}

# ---------------------------------------------------------------------------
function Verb-Drop {
  $n = Clean-Name $Name
  if (-not $Force) {
    Die "this THROWS AWAY everything on work/$n that is not merged. If you mean it:`n  branch.ps1 drop $n -Force"
  }
  $desk = Desk-Path $n
  Gitx worktree remove "$desk" --force
  Gitx branch -D "work/$n"
  Hm "work/$n is gone, unmerged and all"
}

# ---------------------------------------------------------------------------
function Verb-Where {
  $main = Get-MainRoot
  $here = (Resolve-Path -LiteralPath $Root).Path
  $b = (Gitx rev-parse --abbrev-ref HEAD).Trim()
  Write-Host ""
  if ($here -eq (Resolve-Path -LiteralPath $main).Path) {
    Say "the MAIN desk, on branch $b"
    Dim "  the lock and the PreToolUse hook are LIVE here, because two sessions in"
    Dim "  this one folder still overwrite each other. Deploy happens here and only here."
  } else {
    Say "a branch desk, on branch $b"
    Say "  $here"
    Dim "  no lock, no hook: this checkout is yours. Numbers still come from claim.ps1."
    Dim "  main is at $main"
  }
  Write-Host ""
}

switch ($Verb) {
  'new'   { Verb-New }
  'list'  { Verb-List }
  'done'  { Verb-Done }
  'drop'  { Verb-Drop }
  'setup' { Verb-Setup }
  'where' { Verb-Where }
}
