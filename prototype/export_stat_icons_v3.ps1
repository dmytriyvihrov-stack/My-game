param(
  [string]$OutputRoot = (Join-Path $PSScriptRoot 'assets\stat-icons-pixel-v3')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

if (-not ('StatIconRaster' -as [type])) {
  Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;

public static class StatIconRaster {
  private static bool IsNeutralBackground(Color c) {
    int max = Math.Max(c.R, Math.Max(c.G, c.B));
    int min = Math.Min(c.R, Math.Min(c.G, c.B));
    return min >= 175 && max - min <= 30;
  }

  public static Bitmap RemoveConnectedNeutralBackground(Bitmap input) {
    Bitmap output = new Bitmap(input.Width, input.Height, PixelFormat.Format32bppArgb);
    using (Graphics g = Graphics.FromImage(output)) {
      g.DrawImageUnscaled(input, 0, 0);
    }

    int width = output.Width;
    int height = output.Height;
    bool[] seen = new bool[width * height];
    Queue<int> queue = new Queue<int>();

    Action<int, int> seed = (x, y) => {
      int index = y * width + x;
      if (seen[index]) return;
      seen[index] = true;
      if (IsNeutralBackground(output.GetPixel(x, y))) queue.Enqueue(index);
    };

    for (int x = 0; x < width; x++) {
      seed(x, 0);
      seed(x, height - 1);
    }
    for (int y = 1; y < height - 1; y++) {
      seed(0, y);
      seed(width - 1, y);
    }

    while (queue.Count > 0) {
      int index = queue.Dequeue();
      int x = index % width;
      int y = index / width;
      Color c = output.GetPixel(x, y);
      output.SetPixel(x, y, Color.FromArgb(0, c.R, c.G, c.B));

      if (x > 0) Visit(x - 1, y, width, output, seen, queue);
      if (x + 1 < width) Visit(x + 1, y, width, output, seen, queue);
      if (y > 0) Visit(x, y - 1, width, output, seen, queue);
      if (y + 1 < height) Visit(x, y + 1, width, output, seen, queue);
    }
    return output;
  }

  private static void Visit(int x, int y, int width, Bitmap bitmap, bool[] seen, Queue<int> queue) {
    int index = y * width + x;
    if (seen[index]) return;
    seen[index] = true;
    if (IsNeutralBackground(bitmap.GetPixel(x, y))) queue.Enqueue(index);
  }

  public static Rectangle AlphaBounds(Bitmap bitmap, byte threshold) {
    int minX = bitmap.Width;
    int minY = bitmap.Height;
    int maxX = -1;
    int maxY = -1;
    for (int y = 0; y < bitmap.Height; y++) {
      for (int x = 0; x < bitmap.Width; x++) {
        if (bitmap.GetPixel(x, y).A <= threshold) continue;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    return maxX < minX ? Rectangle.Empty : Rectangle.FromLTRB(minX, minY, maxX + 1, maxY + 1);
  }
}
'@
}

$strengthSource = 'C:\Users\USER\.codex\generated_images\01a01bcf-97db-74e2-912d-34632e701330\exec-da28207e-aa8b-43ca-8e51-baff60cbf6fe.png'
$brainSource = 'C:\Users\USER\.codex\generated_images\01a01bcf-97db-74e2-912d-34632e701330\exec-994953d6-5a5e-4ac6-97b7-f74a7604f154.png'

foreach ($source in @($strengthSource, $brainSource)) {
  if (-not (Test-Path -LiteralPath $source -PathType Leaf)) {
    throw "Missing generated source sheet: $source"
  }
}

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

function New-TransparentBitmap([int]$Width, [int]$Height) {
  return [System.Drawing.Bitmap]::new($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Save-NearestResize([System.Drawing.Bitmap]$Source, [int]$Size, [string]$Path) {
  $target = New-TransparentBitmap $Size $Size
  $graphics = [System.Drawing.Graphics]::FromImage($target)
  try {
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighSpeed
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None
    $graphics.DrawImage($Source, [System.Drawing.Rectangle]::new(0, 0, $Size, $Size), 0, 0, $Source.Width, $Source.Height, [System.Drawing.GraphicsUnit]::Pixel)
    for ($i = 0; $i -lt $Size; $i++) {
      $target.SetPixel($i, 0, [System.Drawing.Color]::Transparent)
      $target.SetPixel($i, $Size - 1, [System.Drawing.Color]::Transparent)
      $target.SetPixel(0, $i, [System.Drawing.Color]::Transparent)
      $target.SetPixel($Size - 1, $i, [System.Drawing.Color]::Transparent)
    }
    $target.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $graphics.Dispose()
    $target.Dispose()
  }
}

function Export-IconSheet([string]$Kind, [System.Drawing.Bitmap]$Sheet) {
  $kindRoot = Join-Path $OutputRoot $Kind
  $sourceDir = Join-Path $kindRoot 'source-padded'
  $smallDir = Join-Path $kindRoot 'pixel-16px'
  $largeDir = Join-Path $kindRoot 'pixel-24px'
  foreach ($dir in @($kindRoot, $sourceDir, $smallDir, $largeDir)) {
    [void][System.IO.Directory]::CreateDirectory($dir)
  }

  $sheet.Save((Join-Path $kindRoot 'source-sheet-transparent.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  $cellWidth = [int]($Sheet.Width / 3)
  $cellHeight = [int]($Sheet.Height / 3)

  for ($index = 0; $index -lt 9; $index++) {
    $column = $index % 3
    $row = [int][Math]::Floor($index / 3)
    $tile = $Sheet.Clone(
      [System.Drawing.Rectangle]::new($column * $cellWidth, $row * $cellHeight, $cellWidth, $cellHeight),
      [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    )
    try {
      $bounds = [StatIconRaster]::AlphaBounds($tile, 12)
      if ($bounds.IsEmpty) { throw "$Kind icon $index has no visible pixels" }
      $side = [int][Math]::Ceiling([Math]::Max($bounds.Width, $bounds.Height) * 1.25)
      $padded = New-TransparentBitmap $side $side
      $graphics = [System.Drawing.Graphics]::FromImage($padded)
      try {
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $destX = [int](($side - $bounds.Width) / 2)
        $destY = [int](($side - $bounds.Height) / 2)
        $graphics.DrawImageUnscaled($tile, $destX - $bounds.X, $destY - $bounds.Y)
      }
      finally {
        $graphics.Dispose()
      }

      $fileName = $gradeFiles[$index]
      $padded.Save((Join-Path $sourceDir $fileName), [System.Drawing.Imaging.ImageFormat]::Png)
      Save-NearestResize $padded 16 (Join-Path $smallDir $fileName)
      Save-NearestResize $padded 24 (Join-Path $largeDir $fileName)
      $padded.Dispose()
    }
    finally {
      $tile.Dispose()
    }
  }

  foreach ($size in @(16, 24)) {
    $dir = if ($size -eq 16) { $smallDir } else { $largeDir }
    $sprite = New-TransparentBitmap ($size * 3) ($size * 3)
    $graphics = [System.Drawing.Graphics]::FromImage($sprite)
    try {
      $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
      for ($index = 0; $index -lt 9; $index++) {
        $icon = [System.Drawing.Bitmap]::FromFile((Join-Path $dir $gradeFiles[$index]))
        try {
          $graphics.DrawImageUnscaled($icon, ($index % 3) * $size, [int][Math]::Floor($index / 3) * $size)
        }
        finally {
          $icon.Dispose()
        }
      }
      $sprite.Save((Join-Path $kindRoot "sprite-3x3-$($size)px.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $graphics.Dispose()
      $sprite.Dispose()
    }
  }

  $previewCell = 144
  $preview = [System.Drawing.Bitmap]::new($previewCell * 3, $previewCell * 3, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $graphics = [System.Drawing.Graphics]::FromImage($preview)
  try {
    $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#171208'))
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None
    for ($index = 0; $index -lt 9; $index++) {
      $icon = [System.Drawing.Bitmap]::FromFile((Join-Path $smallDir $gradeFiles[$index]))
      try {
        $x = ($index % 3) * $previewCell + 8
        $y = [int][Math]::Floor($index / 3) * $previewCell + 8
        $graphics.DrawImage($icon, [System.Drawing.Rectangle]::new($x, $y, 128, 128))
      }
      finally {
        $icon.Dispose()
      }
    }
    $preview.Save((Join-Path $kindRoot 'preview-actual-16px-8x.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $graphics.Dispose()
    $preview.Dispose()
  }
}

[void][System.IO.Directory]::CreateDirectory($OutputRoot)
$strength = [System.Drawing.Bitmap]::FromFile($strengthSource)
$brainRaw = [System.Drawing.Bitmap]::FromFile($brainSource)
try {
  $brain = [StatIconRaster]::RemoveConnectedNeutralBackground($brainRaw)
  try {
    Export-IconSheet 'strength' $strength
    Export-IconSheet 'brain' $brain
  }
  finally {
    $brain.Dispose()
  }
}
finally {
  $strength.Dispose()
  $brainRaw.Dispose()
}

Write-Output "Exported strength and brain icon sets to $OutputRoot"
