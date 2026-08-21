param(
  [string]$OutputRoot = (Join-Path $PSScriptRoot 'assets\stat-icons-final-32px')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$gradeFiles = @(
  'grade-minus-4.png',
  'grade-minus-3.png',
  'grade-minus-2.png',
  'grade-minus-1.png',
  'grade-0.png',
  'grade-plus-1.png',
  'grade-plus-2.png',
  'grade-plus-3.png',
  'grade-plus-4.png'
)

$sets = @(
  @{ Name = 'HEARTS'; Source = (Join-Path $PSScriptRoot 'assets\stat-icons-pixel-v5-24px\morale-heart\pixel-24px') },
  @{ Name = 'BRAINS'; Source = (Join-Path $PSScriptRoot 'assets\stat-icons-pixel-v4-24px\brain\pixel-24px') },
  @{ Name = 'HANDS'; Source = (Join-Path $PSScriptRoot 'assets\stat-icons-pixel-v5-24px\strength\pixel-24px') }
)

function New-ArgbBitmap([int]$Width, [int]$Height) {
  [Drawing.Bitmap]::new($Width, $Height, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Set-PixelScaling([Drawing.Graphics]$Graphics) {
  $Graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
  $Graphics.CompositingQuality = [Drawing.Drawing2D.CompositingQuality]::HighSpeed
  $Graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
  $Graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::Half
  $Graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::None
}

function Clear-OuterPixel([Drawing.Bitmap]$Bitmap) {
  for ($i = 0; $i -lt $Bitmap.Width; $i++) {
    $Bitmap.SetPixel($i, 0, [Drawing.Color]::Transparent)
    $Bitmap.SetPixel($i, $Bitmap.Height - 1, [Drawing.Color]::Transparent)
  }
  for ($i = 0; $i -lt $Bitmap.Height; $i++) {
    $Bitmap.SetPixel(0, $i, [Drawing.Color]::Transparent)
    $Bitmap.SetPixel($Bitmap.Width - 1, $i, [Drawing.Color]::Transparent)
  }
}

function Export-32pxIcon([string]$SourcePath, [string]$OutputPath) {
  $source = [Drawing.Bitmap]::FromFile($SourcePath)
  try {
    if ($source.Width -ne 24 -or $source.Height -ne 24) {
      throw "Expected a 24x24 source icon: $SourcePath"
    }
    $output = New-ArgbBitmap 32 32
    $graphics = [Drawing.Graphics]::FromImage($output)
    try {
      Set-PixelScaling $graphics
      $graphics.DrawImage(
        $source,
        [Drawing.Rectangle]::new(0, 0, 32, 32),
        0, 0, 24, 24,
        [Drawing.GraphicsUnit]::Pixel
      )
    } finally {
      $graphics.Dispose()
    }
    try {
      Clear-OuterPixel $output
      $output.Save($OutputPath, [Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $output.Dispose()
    }
  } finally {
    $source.Dispose()
  }
}

function Save-SetSheets([string]$SetRoot, [string]$PixelRoot) {
  $sprite = New-ArgbBitmap 96 96
  $spriteGraphics = [Drawing.Graphics]::FromImage($sprite)
  try {
    for ($i = 0; $i -lt 9; $i++) {
      $icon = [Drawing.Bitmap]::FromFile((Join-Path $PixelRoot $gradeFiles[$i]))
      try {
        $spriteGraphics.DrawImageUnscaled($icon, ($i % 3) * 32, [int][Math]::Floor($i / 3) * 32)
      } finally {
        $icon.Dispose()
      }
    }
    $sprite.Save((Join-Path $SetRoot 'sprite-3x3-32px.png'), [Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $spriteGraphics.Dispose()
    $sprite.Dispose()
  }

  $preview = [Drawing.Bitmap]::new(480, 480, [Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $previewGraphics = [Drawing.Graphics]::FromImage($preview)
  try {
    $previewGraphics.Clear([Drawing.ColorTranslator]::FromHtml('#171208'))
    $previewGraphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $previewGraphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::Half
    $previewGraphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::None
    for ($i = 0; $i -lt 9; $i++) {
      $icon = [Drawing.Bitmap]::FromFile((Join-Path $PixelRoot $gradeFiles[$i]))
      try {
        $x = ($i % 3) * 160 + 16
        $y = [int][Math]::Floor($i / 3) * 160 + 16
        $previewGraphics.DrawImage($icon, [Drawing.Rectangle]::new($x, $y, 128, 128))
      } finally {
        $icon.Dispose()
      }
    }
    $preview.Save((Join-Path $SetRoot 'preview-actual-32px-4x.png'), [Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $previewGraphics.Dispose()
    $preview.Dispose()
  }
}

[void][IO.Directory]::CreateDirectory($OutputRoot)
foreach ($set in $sets) {
  $setRoot = Join-Path $OutputRoot $set.Name
  $pixelRoot = Join-Path $setRoot 'pixel-32px'
  [void][IO.Directory]::CreateDirectory($pixelRoot)
  foreach ($file in $gradeFiles) {
    Export-32pxIcon (Join-Path $set.Source $file) (Join-Path $pixelRoot $file)
  }
  Save-SetSheets $setRoot $pixelRoot
}

& (Join-Path $PSScriptRoot 'export_reworked_boots_32.ps1') -OutputRoot (Join-Path $OutputRoot 'BOOTS')

Write-Output "Exported four final 32px icon sets to $OutputRoot"
