# Packages the PLAYTESTER build as an itch.io HTML5 upload: one zip with
# index.html at its ROOT.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\build_itch.ps1
#   ... -Out D:\somewhere\rabblebound-itch.zip     write it elsewhere
#   ... -Dev                                       package the build WITH the
#                                                  developer cog (do not send
#                                                  this to a stranger)
#
# WHAT IT IS. itch serves an HTML game by unzipping the upload and loading
# index.html in an IFRAME on a different origin from the itch page. So the
# upload is the player build (tools\build_site.ps1 -Player: no cog, TEST off)
# plus the icons folder the page links relative to itself, and nothing else.
# The default output is OUTSIDE the repo and outside Google Drive, because a
# 19 MB zip does not belong in git and Drive syncing it while it is written is
# the corruption risk docs\PARALLEL_SESSIONS.md already names for worktrees.
#
# WHY IT ASSERTS INSTEAD OF TRUSTING THE BUILD. Every silent build this project
# has shipped was produced by steps that all reported success (see deploy.ps1
# step 3). So this reads the ZIP back: index.html at the root and not one level
# down, the player marker in it, no cog, the sound and the pictures present.
# An upload with index.html inside a folder is the commonest itch mistake and
# itch answers it with a blank frame and no reason.
#
# ---------------------------------------------------------------------------
# KEEP THIS FILE PURE ASCII. PowerShell 5.1 reads a .ps1 as ANSI and the repo
# path contains Cyrillic ("Google <disk>"): a literal non-ASCII character here
# comes back as mojibake at runtime. Every path derives from $PSScriptRoot.
# ---------------------------------------------------------------------------
param(
  [string] $Out = '',
  [switch] $Dev
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

function Die($t) { Write-Host ""; Write-Host "STOPPED: $t" -ForegroundColor Red; exit 1 }

if (-not $Out) { $Out = Join-Path $env:USERPROFILE 'grimtoll-itch\rabblebound-itch.zip' }
$outDir = Split-Path -Parent $Out
if (-not (Test-Path -LiteralPath $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

# ---- 1. stage -------------------------------------------------------------
# A fresh staging folder every time. A leftover file from a previous run would
# ride into the zip and nothing would say so.
$stage = Join-Path $outDir '_stage'
if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
New-Item -ItemType Directory -Force -Path $stage | Out-Null

Write-Host ""
Write-Host "[1] building the page" -ForegroundColor Cyan
$args = @('-NoProfile','-ExecutionPolicy','Bypass','-File',(Join-Path $root 'tools\build_site.ps1'),
          '-Out',(Join-Path $stage 'index.html'))
if (-not $Dev) { $args += '-Player' }
& powershell @args
if ($LASTEXITCODE -ne 0) { Die "build_site.ps1 failed" }

# ---- 2. zip ---------------------------------------------------------------
# NOT Compress-Archive. PS 5.1 writes entry names with BACKSLASHES, which the
# zip spec forbids (4.4.17.1: forward slash, always). A lenient unzipper makes
# a file literally called "icons\favicon.ico" out of it and a strict one
# refuses the entry, so the folder structure inside the upload is decided by
# whichever unzipper itch happens to run. Entries are written by hand instead,
# and step 3 asserts there is not a backslash among them.
Write-Host ""
Write-Host "[2] zipping" -ForegroundColor Cyan
if (Test-Path -LiteralPath $Out) { Remove-Item -LiteralPath $Out -Force }
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zw = [System.IO.Compression.ZipFile]::Open($Out, 'Create')
try {
  $prefix = (Resolve-Path -LiteralPath $stage).Path.TrimEnd('\') + '\'
  foreach ($f in (Get-ChildItem -LiteralPath $stage -Recurse -File)) {
    $rel = $f.FullName.Substring($prefix.Length).Replace('\', '/')
    [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zw, $f.FullName, $rel, 'Optimal')
  }
} finally { $zw.Dispose() }
$mb = [Math]::Round((Get-Item $Out).Length / 1MB, 2)

# ---- 3. read the zip back -------------------------------------------------
Write-Host ""
Write-Host "[3] checking the zip itself" -ForegroundColor Cyan
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($Out)
try {
  $names = $zip.Entries | ForEach-Object { $_.FullName }
  $index = $zip.Entries | Where-Object { $_.FullName -eq 'index.html' }
  if (-not $index) {
    Die "no index.html at the ROOT of the zip. itch would load a blank frame and say nothing.`n         entries: $($names -join ', ')"
  }
  $sr = New-Object System.IO.StreamReader($index.Open())
  try { $html = $sr.ReadToEnd() } finally { $sr.Close() }
} finally { $zip.Dispose() }

$cues     = ([regex]::Matches($html, 'data:audio/')).Count
$art      = ([regex]::Matches($html, 'data:image/')).Count
$isPlayer = $html.Contains('/*__PLAYER_BUILD__*/')
$hasCog   = $html.Contains('id="testBtn"')
$hasShim  = $html.Contains('STORE_OFF')

"      entries      : $($names.Count) ($(($names | Select-Object -First 4) -join ', ')$(if($names.Count -gt 4){', ...'}))"
"      index.html   : at the root, $([Math]::Round($html.Length/1MB,2)) MB"
"      sound / art  : $cues cues | $art pictures"
"      developer    : $(if($isPlayer -and -not $hasCog){'OFF - no cog, TEST forced false'}else{'ON - this build has the developer tools in it'})"
"      storage guard: $(if($hasShim){'present (an itch iframe with storage blocked still opens)'}else{'MISSING'})"

$slashed = $names | Where-Object { $_ -like '*\*' }
if ($slashed) { Die "these zip entries carry a backslash, which the zip spec forbids and unzippers disagree about:`n         $($slashed -join ', ')" }
if ($cues -lt 11)  { Die "only $cues audio cues in the zipped page. It would be SILENT for everyone." }
if ($art  -lt 100) { Die "only $art pictures in the zipped page. Something is wrong with the art block." }
if (-not $hasShim) { Die "the storage guard is not in the built page. On itch the game is a third-party iframe, and a browser blocking storage would give every such player a title screen with no buttons. See #203." }
if (-not $Dev -and (-not $isPlayer -or $hasCog)) { Die "this was meant to be the player build and the developer tools are still in it." }
if ($Dev -and $isPlayer) { Die "-Dev asked for the developer build and the player marker is in the page." }

Remove-Item -LiteralPath $stage -Recurse -Force

Write-Host ""
Write-Host "READY TO UPLOAD: $Out  ($mb MB)" -ForegroundColor Green
Write-Host ""
Write-Host "On the itch project page, and these four settings are the whole job:" -ForegroundColor Yellow
Write-Host "  Kind of project      : HTML"
Write-Host "  This file            : tick 'This file will be played in the browser'"
Write-Host "  Viewport             : 1280 x 720   <- NOT smaller. The stage is 1280x720 and"
Write-Host "                         fit() scales the WHOLE game, so a 960-wide embed renders"
Write-Host "                         the 10px type floor at 7.5px (see .claude\rules\ui-scales.md)"
Write-Host "  Fullscreen button    : tick it"
Write-Host ""
Write-Host "The page text to paste is in docs\ITCH_PAGE.md."
