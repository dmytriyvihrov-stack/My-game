# Crops the baked-in "P2"/"E1" labels, resizes, converts to JPEG and emits a
# JS file of data URIs that the single-file prototype can embed.
#
#   powershell -ExecutionPolicy Bypass -File art\build_assets.ps1
#
# Re-run this whenever art/src changes.

Add-Type -AssemblyName System.Drawing

$src = Join-Path $PSScriptRoot 'src'
$out = Join-Path $PSScriptRoot 'out'
New-Item -ItemType Directory -Force -Path $out | Out-Null

# jpeg encoder at quality 82 — small enough to embed, good enough to look at
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
         Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                 [System.Drawing.Imaging.Encoder]::Quality, 82)

# target box per asset family
function Get-Target($name) {
  if ($name -like 'P[1-5]_*')  { return @{ w=220; h=220; portrait=$true } }   # named busts
  if ($name -like 'P[6-8]_*')  { return @{ w=420; h=180; portrait=$false } }  # recruit rows
  if ($name -like 'C*')        { return @{ w=440; h=250; portrait=$false } }
  return @{ w=460; h=250; portrait=$false }                                    # event scenes
}

$entries = @()
$pngEntries = @()
$battleEntries = @()
$siteEntries = @()

Get-ChildItem $src -Filter *.png | Sort-Object Name | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $t   = Get-Target $_.Name

  # --- crop away the label corner -------------------------------------
  # the code sits top-left; take 9% off the top and 7% off the left,
  # then for portraits keep the upper-middle where the face is.
  $cx = [int]($img.Width  * 0.07)
  $cy = [int]($img.Height * 0.09)
  $cw = $img.Width  - $cx
  $ch = $img.Height - $cy

  if ($t.portrait) {
    # square crop centred on the head: portraits are tall, faces sit high
    $side = [Math]::Min($cw, [int]($ch * 0.62))
    $ox   = $cx + [int](($cw - $side) / 2)
    $oy   = $cy
    $srcR = New-Object System.Drawing.Rectangle $ox, $oy, $side, $side
  } else {
    $srcR = New-Object System.Drawing.Rectangle $cx, $cy, $cw, $ch
  }

  $bmp = New-Object System.Drawing.Bitmap $t.w, $t.h
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode  = 'HighQualityBicubic'
  $g.PixelOffsetMode    = 'HighQuality'
  $g.SmoothingMode      = 'HighQuality'
  $dstR = New-Object System.Drawing.Rectangle 0, 0, $t.w, $t.h
  $g.DrawImage($img, $dstR, $srcR, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()

  $jpg = Join-Path $out ($_.BaseName + '.jpg')
  $bmp.Save($jpg, $codec, $ep)
  $bmp.Dispose(); $img.Dispose()

  $bytes = [System.IO.File]::ReadAllBytes($jpg)
  $key   = ($_.BaseName -split '_')[0]          # P1, E7, C3 ...
  $entries += [pscustomobject]@{
    Key = $key
    B64 = [Convert]::ToBase64String($bytes)
    KB  = [math]::Round($bytes.Length / 1KB, 1)
  }
  "{0,-34} -> {1,6} KB" -f $_.Name, [math]::Round($bytes.Length/1KB,1)
}

# --- stage-1 pack: the painted event scenes --------------------------
# These arrive from art/src/stage-1/events already delivered at 640x360 with no
# baked-in label corner, so the crop-and-resize pass above would only damage
# them. They are embedded verbatim: no crop, no second resize, no re-encode.
# `EV-03_pedlar-on-the-ridge.jpg` -> key `EV03`.
$stage1 = Join-Path $src 'stage-1'
$evDir  = Join-Path $stage1 'events'
if (Test-Path $evDir) {
  Get-ChildItem $evDir -Filter *.jpg | Sort-Object Name | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    $key   = (($_.BaseName -split '_')[0]) -replace '-', ''
    $entries += [pscustomobject]@{
      Key = $key
      B64 = [Convert]::ToBase64String($bytes)
      KB  = [math]::Round($bytes.Length / 1KB, 1)
    }
    "{0,-34} -> {1,6} KB  (verbatim)" -f $_.Name, [math]::Round($bytes.Length/1KB,1)
  }
}

# --- stage-2 live event scenes ---------------------------------------
# Generated masters are clean 1672x941 PNGs. Crop the fractional excess for
# exact 16:9, resize to the live 640x360 card, and emit safe EV22-style keys.
$stage2 = Join-Path $src 'stage-2'
$stage2EvDir = Join-Path $stage2 'events'
if (Test-Path $stage2EvDir) {
  Get-ChildItem $stage2EvDir -Filter *.png | Sort-Object Name | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $tw = 640; $th = 360
    $sc = [Math]::Max($tw / $img.Width, $th / $img.Height)
    $sw = [int]($tw / $sc); $sh = [int]($th / $sc)
    $srcR = New-Object System.Drawing.Rectangle ([int](($img.Width-$sw)/2)), ([int](($img.Height-$sh)/2)), $sw, $sh
    $bmp = New-Object System.Drawing.Bitmap $tw, $th
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode='HighQualityBicubic';$g.PixelOffsetMode='HighQuality';$g.SmoothingMode='HighQuality'
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0,0,$tw,$th), $srcR, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $jpg = Join-Path $out ($_.BaseName + '.jpg')
    $bmp.Save($jpg, $codec, $ep)
    $bmp.Dispose(); $img.Dispose()
    $bytes = [System.IO.File]::ReadAllBytes($jpg)
    $key = (($_.BaseName -split '_')[0]) -replace '-', ''
    $entries += [pscustomobject]@{Key=$key;B64=[Convert]::ToBase64String($bytes);KB=[math]::Round($bytes.Length/1KB,1)}
    "{0,-34} -> {1,6} KB  (stage 2)" -f $_.Name, [math]::Round($bytes.Length/1KB,1)
  }
}

# --- stage-2 portrait library ----------------------------------------
# New portraits are clean 2:3 masters. A square upper crop retains the face,
# shoulders and class-defining gear for the roster/dialog canvases.
$stage2PorDir = Join-Path $stage2 'portraits'
if (Test-Path $stage2PorDir) {
  Get-ChildItem $stage2PorDir -Filter *.png | Sort-Object Name | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $side = [Math]::Min($img.Width, $img.Height)
    $srcR = New-Object System.Drawing.Rectangle ([int](($img.Width-$side)/2)), 0, $side, $side
    $bmp = New-Object System.Drawing.Bitmap 220, 220
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode='HighQualityBicubic';$g.PixelOffsetMode='HighQuality';$g.SmoothingMode='HighQuality'
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0,0,220,220), $srcR, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $jpg = Join-Path $out ($_.BaseName + '.jpg')
    $bmp.Save($jpg, $codec, $ep)
    $bmp.Dispose(); $img.Dispose()
    $bytes = [System.IO.File]::ReadAllBytes($jpg)
    $key = (($_.BaseName -split '_')[0]) -replace '-', ''
    $entries += [pscustomobject]@{Key=$key;B64=[Convert]::ToBase64String($bytes);KB=[math]::Round($bytes.Length/1KB,1)}
    "{0,-34} -> {1,6} KB  (portrait)" -f $_.Name, [math]::Round($bytes.Length/1KB,1)
  }
}

# --- stage-3/4 static event and prologue art -------------------------
# These masters are painted AT the live canvas size: 586x212 for the dialog
# window (DLGART_W x DLGART_H) and 460x190 for the prologue outcome card. They
# are NOT sent through the stage-2 640x360 resize/JPEG path: that would crop
# them a second time and enlarge them off their own grid. Embedded verbatim as
# PNG, so drawArt() cover-fits at scale 1 and draws pixel for pixel.
# `EV-29_warm-spring.png` -> key `EV29`, `EV-00B_no-joke.png` -> key `EV00B`.
$staticPacks = @(
  (Join-Path $src 'stage-3'),
  (Join-Path $src 'stage-4')
)
foreach ($pack in $staticPacks) {
  foreach ($sub in @('events', 'prologue')) {
    $dir = Join-Path $pack $sub
    if (-not (Test-Path $dir)) { continue }
    Get-ChildItem $dir -Filter *.png | Sort-Object Name | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $w = $img.Width; $h = $img.Height
    $img.Dispose()
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    $key = (($_.BaseName -split '_')[0]) -replace '-', ''
    $pngEntries += [pscustomobject]@{
      Key = $key
      B64 = [Convert]::ToBase64String($bytes)
      KB  = [math]::Round($bytes.Length / 1KB, 1)
    }
      "{0,-34} -> {1,6} KB  (static verbatim {2}x{3})" -f $_.Name, [math]::Round($bytes.Length/1KB,1), $w, $h
    }
  }
}

# --- selected key art: the original painted Bloom main menu ---------
# Fitted to the stage (1280x720) rather than embedded at its 1672x941 source
# size — the menu is never shown larger than the stage, and the full painting
# would cost a megabyte of base64 for pixels nobody sees. Cover-fit, so the
# company in the lower-left corner is never cropped away.
$menuSrc = Join-Path $stage1 'key\KEY-01_main-menu-bloom.png'
if (Test-Path $menuSrc) {
  $img = [System.Drawing.Image]::FromFile($menuSrc)
  $tw = 1280; $th = 720
  $sc = [Math]::Max($tw / $img.Width, $th / $img.Height)
  $sw = [int]($tw / $sc); $sh = [int]($th / $sc)
  $srcR = New-Object System.Drawing.Rectangle ([int](($img.Width-$sw)/2)), ([int](($img.Height-$sh)/2)), $sw, $sh
  $bmp = New-Object System.Drawing.Bitmap $tw, $th
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode='HighQualityBicubic';$g.PixelOffsetMode='HighQuality';$g.SmoothingMode='HighQuality'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0,0,$tw,$th), $srcR, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $jpg = Join-Path $out 'KEY01_main_menu_bloom.jpg'
  $bmp.Save($jpg, $codec, $ep)
  $bmp.Dispose(); $img.Dispose()
  $bytes = [System.IO.File]::ReadAllBytes($jpg)
  $entries += [pscustomobject]@{
    Key = 'MENU'
    B64 = [Convert]::ToBase64String($bytes)
    KB  = [math]::Round($bytes.Length / 1KB, 1)
  }
  "{0,-34} -> {1,6} KB" -f (Split-Path $menuSrc -Leaf), [math]::Round($bytes.Length/1KB,1)
}

# --- final battlefield models ---------------------------------------
# These are already cut to their exact live pixel dimensions by
# stage-3/battle-sprites/final-v4/build_final.py. Embed the transparent PNGs
# verbatim so the single-file prototype keeps crisp nearest-neighbour pixels.
$battleDir = Join-Path $out 'battle'
if (Test-Path $battleDir) {
  Get-ChildItem $battleDir -Filter *.png | Sort-Object Name | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $w = $img.Width; $h = $img.Height
    $img.Dispose()
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    $battleEntries += [pscustomobject]@{
      Key = $_.BaseName
      B64 = [Convert]::ToBase64String($bytes)
      KB  = [math]::Round($bytes.Length / 1KB, 1)
      W   = $w
      H   = $h
    }
    "{0,-34} -> {1,6} KB  (battle {2}x{3})" -f $_.Name, [math]::Round($bytes.Length/1KB,1), $w, $h
  }
}

# --- world-map sights: the landmark icon on a map node ---------------
# Authored as transparent cut-outs by art/src/world-map-sites/build_event_sites.py,
# which writes a 128px master and a 48px icon per sight. #115 ships the 128px
# MASTERS: the user ordered the map sights up to 120px on screen ("increase
# size of icon on global map on 250%"), and a 48px file stretched to 120 is
# mush. The 48px files stay on disk for a future small-scale use.
# They are NOT sent through any resize or JPEG path - a JPEG has no alpha, and
# these are cut-outs that sit on the painted map with no plate behind them.
# `MAP-EV01_blood-on-road-128.png` -> key `MAPEV01`, the same prefix rule the
# stage-1/2/3 passes use.
$siteDir = Join-Path $out 'world-map-sites'
if (Test-Path $siteDir) {
  # `MAP-EV*` and not `*-128`: the contact sheet lives in this folder too and
  # is a 480x320 proof, not an asset.
  Get-ChildItem $siteDir -Filter 'MAP-EV*-128.png' | Sort-Object Name | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $w = $img.Width; $h = $img.Height
    if ($w -ne 128 -or $h -ne 128) { $img.Dispose(); throw "$($_.Name) is ${w}x${h}, not 128x128 - rebuild it with build_event_sites.py" }
    # #116 - SCRUB THE HAZE. Most "-source" masters carry a near-invisible
    # alpha wash (alpha 1..39) across their WHOLE canvas: invisible at 48px,
    # but at 96px the CSS silhouette ring drop-shadows every non-zero pixel,
    # so the wash lit up as a full type-coloured square behind the painting
    # (the user: "make background of them more transparent"). The three
    # chroma-keyed icons (pedlar, salt-wives, hollow-tree) have no wash,
    # which is exactly why the pedlar was the one the user liked. Zeroing
    # alpha < 40 makes every icon a true cut-out like his; real edges
    # anti-alias at 40+ and are untouched.
    $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, 0, 0, $w, $h); $g.Dispose(); $img.Dispose()
    $scrubbed = 0
    for ($y = 0; $y -lt $h; $y++) { for ($x = 0; $x -lt $w; $x++) {
      $p = $bmp.GetPixel($x, $y)
      if ($p.A -gt 0 -and $p.A -lt 40) { $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0,0,0,0)); $scrubbed++ }
    } }
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $bytes = $ms.ToArray(); $ms.Dispose()
    $key = (($_.BaseName -split '_')[0]) -replace '-', ''
    $siteEntries += [pscustomobject]@{
      Key = $key
      B64 = [Convert]::ToBase64String($bytes)
      KB  = [math]::Round($bytes.Length / 1KB, 1)
    }
    "{0,-34} -> {1,6} KB  (map sight 128x128, {2} haze px scrubbed)" -f $_.Name, [math]::Round($bytes.Length/1KB,1), $scrubbed
  }
}

# --- item icons: one painted picture per piece of kit (#192) ---------
# ChatGPT-generated off art/ITEM_ICONS_GPT_TASK.md, delivered as 128x128
# transparent PNG singles straight into art/src/items/ (a SOURCE folder, so
# they are gitignored like every other master; the block below is what ships).
# Embedded VERBATIM: no resize, no JPEG (a JPEG has no alpha and these sit on
# a slot's own ground). `ITEM-06_fence-post-cudgel.png` -> key `ITEM06`, the
# same prefix rule as MAP-EV. ITEM_ICON{} in the prototype is what turns a
# GEAR key into one of these; a key with no picture falls back to its glyph.
$itemEntries = @()
$itemDir = Join-Path $src 'items'
if (Test-Path $itemDir) {
  # `ITEM-*` and not `*.png`: CONTACT_SHEET.png lives in this folder too and
  # is the 40px proof, not an asset.
  Get-ChildItem $itemDir -Filter 'ITEM-*.png' | Sort-Object Name | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $w = $img.Width; $h = $img.Height; $img.Dispose()
    if ($w -ne 128 -or $h -ne 128) { throw "$($_.Name) is ${w}x${h}, not 128x128 - the task asked for 128 singles" }
    $bytes = [IO.File]::ReadAllBytes($_.FullName)
    $key = (($_.BaseName -split '_')[0]) -replace '-', ''
    $itemEntries += [pscustomobject]@{
      Key = $key
      B64 = [Convert]::ToBase64String($bytes)
      KB  = [math]::Round($bytes.Length / 1KB, 1)
    }
    "{0,-40} -> {1,6} KB  (item icon 128x128, verbatim png)" -f $_.Name, [math]::Round($bytes.Length/1KB,1)
  }
}

# --- the world map's painted terrain ---------------------------------
# One 1280x638 painting per candidate ground, embedded VERBATIM as webp. It is
# the map's terrain layer and nothing else: roads, nodes, plates and the token
# are still drawn over it by drawMap()/drawNodes().
#
# It is embedded rather than linked because the published build is ONE file at
# the repo root, where a relative '../art/...' points outside the repo. That
# path works at this desk over tools\serve.ps1 and 404s on the host, which is
# the silent-difference failure this project has already shipped once.
$worldBgEntries = @()
$worldBgDir = Join-Path $PSScriptRoot 'world-map-backgrounds'
# throws rather than skipping: an empty WORLD_BG is not a missing picture, it is
# a map that quietly goes back to the procedural ground and says nothing.
if (-not (Test-Path $worldBgDir)) { throw "world-map-backgrounds not found: $worldBgDir" }
# ONLY the ground the game actually asks for is embedded. The folder is the art
# archive and holds the rejected candidates too; shipping all of them would put
# ~430 KB of picture nobody looks at into every player's download.
# The key is read OUT OF THE PROTOTYPE rather than written here, so the build
# and the game cannot drift: change WORLD_BG.<key> in one place and this follows.
$protoText = Get-Content (Join-Path (Split-Path $PSScriptRoot -Parent) 'prototype\grimtoll_slice.html') -Raw -Encoding utf8
if ($protoText -notmatch 'WORLD_BG\.([A-Za-z0-9]+)') { throw 'the prototype asks for no WORLD_BG key' }
$wantKey = $Matches[1]
$worldBgFiles = @(Get-ChildItem $worldBgDir -Filter *.webp | Sort-Object Name | Where-Object {
  (($_.BaseName -replace '^world-map-', '') -replace '[^A-Za-z0-9]', '') -eq $wantKey })
if ($worldBgFiles.Count -ne 1) { throw "prototype wants WORLD_BG.$wantKey and $($worldBgFiles.Count) file(s) match it in $worldBgDir" }
$worldBgFiles | ForEach-Object {
    $bytes = [IO.File]::ReadAllBytes($_.FullName)
    $key = ($_.BaseName -replace '^world-map-', '') -replace '[^A-Za-z0-9]', ''
    $worldBgEntries += [pscustomobject]@{
      Key = $key
      B64 = [Convert]::ToBase64String($bytes)
      KB  = [math]::Round($bytes.Length / 1KB, 1)
    }
  "{0,-34} -> {1,6} KB  (world map terrain, verbatim webp)" -f $_.Name, [math]::Round($bytes.Length/1KB,1)
}

# --- emit the JS the prototype embeds --------------------------------
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('/* GENERATED by art/build_assets.ps1 — do not hand-edit.')
[void]$sb.AppendLine('   Painted assets as data URIs, keyed P1..P8 / E1..E16 / C1..C5,')
[void]$sb.AppendLine('   plus stage-1/stage-2 events, refreshed POR portraits and MENU. */')
[void]$sb.AppendLine('const ART={')
foreach ($e in $entries) {
  [void]$sb.AppendLine(("  {0}:'data:image/jpeg;base64,{1}'," -f $e.Key, $e.B64))
}
# static stage-3/4 masters keep their PNG bytes, so they carry a PNG mime type
foreach ($e in $pngEntries) {
  [void]$sb.AppendLine(("  {0}:'data:image/png;base64,{1}'," -f $e.Key, $e.B64))
}
[void]$sb.AppendLine('};')
[void]$sb.AppendLine('const BATTLE_ART={')
foreach ($e in $battleEntries) {
  [void]$sb.AppendLine(("  '{0}':{{src:'data:image/png;base64,{1}',w:{2},h:{3}}}," -f $e.Key, $e.B64, $e.W, $e.H))
}
[void]$sb.AppendLine('};')
# the map-node sights, keyed MAPEV00A and MAPEV01..MAPEV31 — MAP_SIGHT{} in the prototype
# is what turns an event key into one of these
[void]$sb.AppendLine('const MAP_ART={')
foreach ($e in $siteEntries) {
  [void]$sb.AppendLine(("  {0}:'data:image/png;base64,{1}'," -f $e.Key, $e.B64))
}
[void]$sb.AppendLine('};')
[void]$sb.AppendLine('const WORLD_BG={')
foreach ($e in $worldBgEntries) {
  [void]$sb.AppendLine(("  {0}:'data:image/webp;base64,{1}'," -f $e.Key, $e.B64))
}
[void]$sb.AppendLine('};')
# the item icons, keyed ITEM01..ITEM56 - ITEM_ICON{} in the prototype maps a GEAR key onto one
[void]$sb.AppendLine('const ITEM_ART={')
foreach ($e in $itemEntries) {
  [void]$sb.AppendLine(("  {0}:'data:image/png;base64,{1}'," -f $e.Key, $e.B64))
}
[void]$sb.AppendLine('};')
Set-Content -Path (Join-Path $out 'art_data.js') -Value $sb.ToString() -Encoding utf8

$allEntries = @($entries) + @($pngEntries) + @($battleEntries) + @($siteEntries) + @($worldBgEntries) + @($itemEntries)
$total = ($allEntries | Measure-Object -Property KB -Sum).Sum
"`nTOTAL EMBEDDED: $total KB across $($allEntries.Count) assets"
