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

# --- stage-3 static event and prologue art ---------------------------
# These masters are painted AT the live canvas size: 586x212 for the dialog
# window (DLGART_W x DLGART_H) and 460x190 for the prologue outcome card. They
# are NOT sent through the stage-2 640x360 resize/JPEG path: that would crop
# them a second time and enlarge them off their own grid. Embedded verbatim as
# PNG, so drawArt() cover-fits at scale 1 and draws pixel for pixel.
# `EV-29_warm-spring.png` -> key `EV29`, `EV-00B_no-joke.png` -> key `EV00B`.
$stage3 = Join-Path $src 'stage-3'
foreach ($sub in @('events', 'prologue')) {
  $dir = Join-Path $stage3 $sub
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
    "{0,-34} -> {1,6} KB  (stage 3 verbatim {2}x{3})" -f $_.Name, [math]::Round($bytes.Length/1KB,1), $w, $h
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

# --- emit the JS the prototype embeds --------------------------------
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('/* GENERATED by art/build_assets.ps1 — do not hand-edit.')
[void]$sb.AppendLine('   Painted assets as data URIs, keyed P1..P8 / E1..E16 / C1..C5,')
[void]$sb.AppendLine('   plus stage-1/stage-2 events, refreshed POR portraits and MENU. */')
[void]$sb.AppendLine('const ART={')
foreach ($e in $entries) {
  [void]$sb.AppendLine(("  {0}:'data:image/jpeg;base64,{1}'," -f $e.Key, $e.B64))
}
# stage-3 masters keep their PNG bytes, so they carry a PNG mime type
foreach ($e in $pngEntries) {
  [void]$sb.AppendLine(("  {0}:'data:image/png;base64,{1}'," -f $e.Key, $e.B64))
}
[void]$sb.AppendLine('};')
[void]$sb.AppendLine('const BATTLE_ART={')
foreach ($e in $battleEntries) {
  [void]$sb.AppendLine(("  '{0}':{{src:'data:image/png;base64,{1}',w:{2},h:{3}}}," -f $e.Key, $e.B64, $e.W, $e.H))
}
[void]$sb.AppendLine('};')
Set-Content -Path (Join-Path $out 'art_data.js') -Value $sb.ToString() -Encoding utf8

$allEntries = @($entries) + @($pngEntries) + @($battleEntries)
$total = ($allEntries | Measure-Object -Property KB -Sum).Sum
"`nTOTAL EMBEDDED: $total KB across $($allEntries.Count) assets"
