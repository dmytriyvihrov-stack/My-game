# Injects art/out/art_data.js into the prototype at the /*__ART_DATA__*/ marker,
# writing prototype/grimtoll_slice.html in place. Idempotent: if art is already
# embedded it is replaced, not duplicated.
#
#   powershell -ExecutionPolicy Bypass -File art\inject.ps1

$root  = Split-Path $PSScriptRoot -Parent
$html  = Join-Path $root 'prototype\grimtoll_slice.html'
$data  = Join-Path $PSScriptRoot 'out\art_data.js'

# This script reads the whole prototype and writes the whole prototype back, so
# it is the exact shape that erases a parallel session's work. Ask first.
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $root 'tools\claim.ps1') gate
if ($LASTEXITCODE -ne 0) { throw "another session owns the prototype. Not injecting." }

if (-not (Test-Path $data)) { throw "run build_assets.ps1 first" }

$src = Get-Content $html -Raw -Encoding utf8
$art = Get-Content $data -Raw -Encoding utf8

$startTag = '/*__ART_DATA__*/'
$endTag   = '/*__END_ART_DATA__*/'

$block = "$startTag`n$art`n$endTag"

if ($src -match [regex]::Escape($startTag)) {
  if ($src -match [regex]::Escape($endTag)) {
    # replace whatever is between the markers
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
