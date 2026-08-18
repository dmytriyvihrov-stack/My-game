# Injects art/out/fonts.css into the prototype at the /*__FONT_DATA__*/ marker,
# writing prototype/grimtoll_slice.html in place. Idempotent: an already
# embedded set is replaced, not duplicated. Same shape as art\inject.ps1.
#
#   powershell -ExecutionPolicy Bypass -File art\inject_fonts.ps1
#
# KEEP THIS FILE PURE ASCII, same reason as claim.ps1 and deploy.ps1:
# PowerShell 5.1 reads a .ps1 as ANSI and the repo path contains Cyrillic.

$root = Split-Path $PSScriptRoot -Parent
$html = Join-Path $root 'prototype\grimtoll_slice.html'
$data = Join-Path $PSScriptRoot 'out\fonts.css'

# This script reads the whole prototype and writes the whole prototype back, so
# it is the exact shape that erases a parallel session's work. Ask first.
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $root 'tools\claim.ps1') gate
if ($LASTEXITCODE -ne 0) { throw "another session owns the prototype. Not injecting." }

if (-not (Test-Path $data)) { throw "run art\fonts\build_fonts.py first" }

$src   = Get-Content $html -Raw -Encoding utf8
$fonts = Get-Content $data -Raw -Encoding utf8

$startTag = '/*__FONT_DATA__*/'
$endTag   = '/*__END_FONT_DATA__*/'

$block = "$startTag`n$fonts`n$endTag"

if ($src -match [regex]::Escape($startTag)) {
  if ($src -match [regex]::Escape($endTag)) {
    $pattern = [regex]::Escape($startTag) + '[\s\S]*?' + [regex]::Escape($endTag)
    $src = [regex]::Replace($src, $pattern, { param($m) $block })
  } else {
    $src = $src -replace [regex]::Escape($startTag), $block
  }
} else {
  throw "marker $startTag not found in the prototype"
}

Set-Content -Path $html -Value $src -Encoding utf8 -NoNewline
$kb = [math]::Round((Get-Item $html).Length / 1KB, 1)
"injected. prototype is now $kb KB"
