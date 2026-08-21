# ============================================================================
# merge.ps1 - bring a branch desk back onto main. (#139)
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\merge.ps1 <name>
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\merge.ps1 -Abort
#
# Usually you do not call this directly: `branch.ps1 done <name>` runs it and
# then takes the desk away. Call it on its own when you want the work on main
# but the desk kept open.
#
# THE ONE RULE THIS FILE ENFORCES:
#
#   NOTHING GENERATED IS EVER MERGED. IT IS REBUILT AFTER THE MERGE.
#
# index.html and art\embed\art_data.js are `merge=ours` in .gitattributes, so a
# merge always keeps main's copy of them and never stops on a conflict inside
# 10 MB of base64. That makes them STALE the moment the merge lands, which is
# correct and is why this script ends by telling you what to rebuild. A
# generated file that survives a merge untouched is a generated file that is
# now lying about the source it was generated from.
# ---------------------------------------------------------------------------
# KEEP THIS FILE PURE ASCII, same reason as claim.ps1 and deploy.ps1.
# ---------------------------------------------------------------------------
[CmdletBinding()]
param(
  [Parameter(Position = 0)]
  [string] $Name = '',
  [switch] $Abort,
  [switch] $NoVerify
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path $PSScriptRoot -Parent

function Die([string] $m) { Write-Host ""; Write-Host "  $m" -ForegroundColor Red; Write-Host ""; exit 1 }
function Say([string] $m) { Write-Host "  $m" }
function Ok ([string] $m) { Write-Host "  $m" -ForegroundColor Green }
function Hm ([string] $m) { Write-Host "  $m" -ForegroundColor Yellow }
function Dim([string] $m) { Write-Host "  $m" -ForegroundColor DarkGray }

Push-Location $Root
try {

  # -- where am I ------------------------------------------------------------
  # NO 2>$null (#226, sweeping #222's declared remainder). Under
  # $ErrorActionPreference='Stop', REDIRECTING a native command's stderr is what
  # promotes a harmless git warning into a terminating NativeCommandError;
  # unredirected stderr is inert. The Die below already covers a real failure.
  $common = ''
  try { $common = & git rev-parse --git-common-dir } catch { $common = '' }
  if (-not $common) { Die "not a git repo" }
  $common = $common.Trim()
  if (-not [System.IO.Path]::IsPathRooted($common)) { $common = Join-Path $Root $common }
  $main = Split-Path (Resolve-Path -LiteralPath $common).Path -Parent

  if ((Resolve-Path -LiteralPath $Root).Path -ne (Resolve-Path -LiteralPath $main).Path) {
    Die "a merge happens on the MAIN desk, not on a branch desk. Go to:`n  $main"
  }

  if ($Abort) {
    & git merge --abort
    Ok "merge aborted. main is back where it was, the desk is untouched."
    exit 0
  }

  if (-not $Name) { Die "which branch. Give it a name: merge.ps1 battle-panel" }
  $n = $Name.Trim().ToLower() -replace '^work/', ''
  $branch = "work/$n"

  if (-not (& git rev-parse --verify --quiet $branch)) { Die "no branch called $branch. See: branch.ps1 list" }

  $head = (& git rev-parse --abbrev-ref HEAD).Trim()
  if ($head -ne 'main') { Die "main desk is on '$head', not main. Switch to main first: git switch main" }

  # NOT "main must be clean". The main desk is shared, and another session is
  # very often mid-edit on something unrelated: a blanket clean-tree rule would
  # refuse every merge on this repo and hand the queue straight back. What
  # actually loses work is an uncommitted change to a file THIS MERGE TOUCHES,
  # so that is what is checked. And never stash: a stash here would yank the
  # other session's work out from under it.
  $incoming = @(& git diff --name-only "main...$branch")
  $dirty = @(& git status --porcelain) | ForEach-Object { ($_ -replace '^..\s+', '').Trim().Trim('"') }
  $clash = $dirty | Where-Object { $incoming -contains $_ }
  if ($clash) {
    Write-Host ""
    Hm "main has UNCOMMITTED changes to files this merge would overwrite:"
    foreach ($d in $clash) { Write-Host "    $d" -ForegroundColor Red }
    Write-Host ""
    Dim "That is somebody's work in progress, probably another session. Commit it,"
    Dim "or wait for them, then merge. Do NOT stash: the stash would be theirs."
    Die "nothing was merged."
  }
  $other = $dirty | Where-Object { $incoming -notcontains $_ }
  if ($other) {
    Say "main is dirty in $(@($other).Count) file(s) this merge does not touch. Leaving them alone."
  }

  # -- is the driver actually registered ------------------------------------
  # Without this, `merge=ours` in .gitattributes is silently ignored and the
  # first index.html conflict is 10 MB wide. Cheap to check, expensive to miss.
  $drv = (& git config merge.ours.driver)
  if (-not $drv) {
    Hm "the 'ours' merge driver was not registered in this clone. Registering it now."
    & git config merge.ours.driver true
  }

  # -- what is about to happen ----------------------------------------------
  $counts = & git rev-list --left-right --count "main...$branch"
  $behind = 0; $ahead = 0
  if ($counts -match '(\d+)\s+(\d+)') { $behind = [int] $Matches[1]; $ahead = [int] $Matches[2] }
  # NOT an error. `branch.ps1 done` calls this and then removes the desk, and
  # "already merged" is the normal state on a second run or when the work went
  # in by hand. Failing here would refuse to close a desk that has nothing left
  # in it, which is the one case where closing is obviously safe.
  if ($ahead -eq 0) {
    Ok "$branch has nothing main does not already have. Safe to close."
    exit 0
  }

  $files = & git diff --name-only "main...$branch"
  Write-Host ""
  Say "merging $branch into main: $ahead commit(s), $(@($files).Count) file(s)"
  foreach ($f in $files) { Dim "  $f" }
  Write-Host ""

  # -- the merge -------------------------------------------------------------
  & git merge --no-ff $branch -m "merge $branch"
  $mergeExit = $LASTEXITCODE

  if ($mergeExit -ne 0) {
    $conf = & git diff --name-only --diff-filter=U
    Write-Host ""
    Hm "CONFLICTS. The merge is half-done and waiting for you:"
    foreach ($f in $conf) { Write-Host "    $f" -ForegroundColor Red }
    Write-Host ""
    Dim "Both desks changed the same lines. Open each file, keep the version that is"
    Dim "true of the game now, then:"
    Dim "  git add <file> ; git commit"
    Write-Host ""
    Dim "Or walk away and keep main as it was:"
    Dim "  powershell -NoProfile -File tools\merge.ps1 -Abort"
    Write-Host ""
    Dim "If a GENERATED file is in that list, something is wrong with .gitattributes:"
    Dim "index.html and art\embed\art_data.js should never reach a conflict."
    exit 1
  }

  Ok "merged clean"
  Write-Host ""

  # -- what is now stale -----------------------------------------------------
  $touchedProto = $files -contains 'prototype/grimtoll_slice.html'
  $touchedArt   = ($files | Where-Object { $_ -like 'art/*' })

  Hm "REBUILD BEFORE YOU SHIP. The generated files kept main's copy on purpose,"
  Hm "so right now they do not match the source that was just merged."
  Write-Host ""
  if ($touchedArt) {
    Say "  art changed on that branch, so rebuild the painted block:"
    Dim "    powershell -NoProfile -File art\build_assets.ps1"
    Dim "    powershell -NoProfile -File art\inject.ps1"
  }
  if ($touchedProto -or $touchedArt) {
    Say "  then rebuild and publish the played page:"
    Dim "    powershell -NoProfile -File deploy.ps1 -Message `"merge $branch`""
  } else {
    Dim "  nothing generated depends on what changed. Nothing to rebuild."
  }
  Write-Host ""
  Dim "The desk is still open. Close it with: branch.ps1 done $n"
  Write-Host ""

} finally { Pop-Location }
