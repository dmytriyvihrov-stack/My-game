# Builds the PUBLISHABLE site from the prototype: one self-contained index.html
# at the repo root, plus the icon set beside it.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\build_site.ps1
#
# WHY THIS EXISTS: `prototype/grimtoll_slice.html` is the working file and its
# AUDIO_EMBED table is deliberately EMPTY there, because at this desk the game
# reads the 44.1k WAV masters out of `../audio/`. A static host has no such
# folder, and the documented consequence was a build that played perfectly here
# and was completely silent for every playtester. So the thing that gets hosted
# is not the working file: it is the working file with the compressed pack
# poured into it, built here, and never hand-edited.
#
# The prototype is READ, never written. Run audio\build_audio.ps1 first (it
# writes audio\out\audio_data.js); this script only pours and copies.
#
# ---------------------------------------------------------------------------
# KEEP THIS FILE PURE ASCII. PowerShell 5.1 reads a .ps1 as ANSI and the repo
# path contains Cyrillic ("Google <disk>"): a literal non-ASCII character here
# comes back as mojibake at runtime. Every path derives from $PSScriptRoot.
# Same trap already bit tools\serve.ps1 and audio\build_audio.ps1.
# ---------------------------------------------------------------------------
$ErrorActionPreference = 'Stop'
$root  = Split-Path -Parent $PSScriptRoot
$src   = Join-Path $root 'prototype\grimtoll_slice.html'
$data  = Join-Path $root 'audio\out\audio_data.js'
$out   = Join-Path $root 'index.html'

if (-not (Test-Path -LiteralPath $src))  { throw "prototype not found: $src" }

$html = Get-Content $src -Raw -Encoding utf8

# ---- pour the audio in -----------------------------------------------------
# Idempotent and identical in shape to art\inject.ps1 and audio\build_audio.ps1,
# so there is one habit to remember rather than three.
$s = '/*__AUDIO_DATA__*/'
$e = '/*__END_AUDIO_DATA__*/'
if (Test-Path -LiteralPath $data) {
  $blk = Get-Content $data -Raw -Encoding utf8
  if ($html -notmatch [regex]::Escape($s)) { throw "marker $s not found in the prototype" }
  $pat  = [regex]::Escape($s) + '[\s\S]*?' + [regex]::Escape($e)
  $html = [regex]::Replace($html, $pat, { param($m) $blk })
  $cues = ([regex]::Matches($blk, 'data:audio/')).Count
  "audio  : $cues cues poured in"
} else {
  # LOUD, not silent. A hosted build with no sound is the exact bug this script
  # was written to stop, and it looks like nothing at all from the game's side.
  Write-Warning "audio\out\audio_data.js is MISSING - the site will be SILENT."
  Write-Warning "Run: powershell -NoProfile -ExecutionPolicy Bypass -File audio\build_audio.ps1"
}

[System.IO.File]::WriteAllText($out, $html, (New-Object System.Text.UTF8Encoding($false)))

# ---- icons -----------------------------------------------------------------
# The inline data: URI favicon in <head> covers modern browsers on its own; this
# set is what makes "add to home screen" work for a playtester on a phone.
$icoSrc = Join-Path $root 'prototype\icons'
$icoDst = Join-Path $root 'icons'
if (Test-Path -LiteralPath $icoSrc) {
  New-Item -ItemType Directory -Force -Path $icoDst | Out-Null
  Copy-Item (Join-Path $icoSrc '*') $icoDst -Force
  # start_url points at the prototype's filename one level up; at the site root
  # the page is index.html, so the manifest has to be told.
  $mf = Join-Path $icoDst 'site.webmanifest'
  if (Test-Path -LiteralPath $mf) {
    $j = (Get-Content $mf -Raw -Encoding utf8) -replace '\.\./grimtoll_slice\.html', '../'
    [System.IO.File]::WriteAllText($mf, $j, (New-Object System.Text.UTF8Encoding($false)))
  }
  "icons  : copied to icons\"
}

# Pages runs Jekyll by default, which silently drops anything starting with an
# underscore. Nothing here needs Jekyll.
$njk = Join-Path $root '.nojekyll'
if (-not (Test-Path -LiteralPath $njk)) { New-Item -ItemType File -Path $njk | Out-Null }

"site   : index.html is {0} MB" -f [Math]::Round((Get-Item $out).Length / 1MB, 2)
