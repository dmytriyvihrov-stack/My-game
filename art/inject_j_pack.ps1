# Injects art/out/j_pack.js into the prototype at the /*__J_PACK__*/ marker,
# writing prototype/grimtoll_slice.html in place. Idempotent: if the pack is
# already embedded it is replaced, not duplicated.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File art\inject_j_pack.ps1
#
# WHY THIS IS A SECOND INJECTOR AND NOT A FLAG ON inject.ps1
# ----------------------------------------------------------
# inject.ps1 rewrites the whole 10 MB /*__ART_DATA__*/ block. Two desks that
# both run it produce a conflict nothing can resolve, which is the open item at
# the foot of grimtoll-parallel-sessions. The J pack is ~2.4 MB, it is
# still being redrawn, and it will be re-injected often - so it gets its own
# marker and its own block, and re-running this can never touch the paintings.

$root = Split-Path $PSScriptRoot -Parent
$html = Join-Path $root 'prototype\grimtoll_slice.html'
$data = Join-Path $PSScriptRoot 'out\j_pack.js'

# Same shape as inject.ps1: reads the whole prototype and writes it whole back,
# which is exactly what erases a parallel session's work. Ask first.
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $root 'tools\claim.ps1') gate
if ($LASTEXITCODE -ne 0) { throw "another session owns the prototype. Not injecting." }

if (-not (Test-Path $data)) { throw "run `python art\build_j_pack.py` first" }

$src = Get-Content $html -Raw -Encoding utf8
$art = Get-Content $data -Raw -Encoding utf8

$startTag = '/*__J_PACK__*/'
$endTag   = '/*__END_J_PACK__*/'
$block    = "$startTag`n$art`n$endTag"

if ($src -notmatch [regex]::Escape($startTag)) { throw "marker $startTag not found in the prototype" }
if ($src -match [regex]::Escape($endTag)) {
  $pattern = [regex]::Escape($startTag) + '[\s\S]*?' + [regex]::Escape($endTag)
  $src = [regex]::Replace($src, $pattern, { param($m) $block })
} else {
  $src = $src -replace [regex]::Escape($startTag), $block
}

Set-Content -Path $html -Value $src -Encoding utf8 -NoNewline
$kb = [math]::Round((Get-Item $html).Length / 1KB, 1)
"injected the J pack. prototype is now $kb KB"
