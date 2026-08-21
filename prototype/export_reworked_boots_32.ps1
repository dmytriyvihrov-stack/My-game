param(
  [string]$OutputRoot = (Join-Path $PSScriptRoot 'assets\stat-icons-final-32px\BOOTS')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

if (-not ('ReworkedBootRaster' -as [type])) {
  Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;

public static class ReworkedBootRaster {
  public static Bitmap Copy32(Bitmap input) {
    Bitmap output = new Bitmap(input.Width, input.Height, PixelFormat.Format32bppArgb);
    using (Graphics g = Graphics.FromImage(output)) g.DrawImageUnscaled(input, 0, 0);
    return output;
  }

  static bool IsDark(Color color, int limit) {
    return Math.Max(color.R, Math.Max(color.G, color.B)) <= limit;
  }

  public static Bitmap RemoveDarkBorder(Bitmap input, int limit) {
    Bitmap output = Copy32(input);
    int width = output.Width, height = output.Height;
    bool[] seen = new bool[width * height];
    Queue<int> queue = new Queue<int>();
    Action<int,int> seed = (x,y) => {
      int index = y * width + x;
      if (seen[index]) return;
      seen[index] = true;
      if (IsDark(output.GetPixel(x,y), limit)) queue.Enqueue(index);
    };
    for (int x = 0; x < width; x++) { seed(x,0); seed(x,height-1); }
    for (int y = 1; y < height-1; y++) { seed(0,y); seed(width-1,y); }
    while (queue.Count > 0) {
      int index = queue.Dequeue(), x = index % width, y = index / width;
      output.SetPixel(x,y,Color.Transparent);
      Visit(x-1,y,width,height,limit,output,seen,queue);
      Visit(x+1,y,width,height,limit,output,seen,queue);
      Visit(x,y-1,width,height,limit,output,seen,queue);
      Visit(x,y+1,width,height,limit,output,seen,queue);
    }
    return output;
  }

  static void Visit(int x,int y,int width,int height,int limit,Bitmap bitmap,bool[] seen,Queue<int> queue) {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    int index = y * width + x;
    if (seen[index]) return;
    seen[index] = true;
    if (IsDark(bitmap.GetPixel(x,y), limit)) queue.Enqueue(index);
  }

  public static void RemoveSmallComponents(Bitmap bitmap, int alphaThreshold, int minArea) {
    int width = bitmap.Width, height = bitmap.Height;
    bool[] seen = new bool[width * height];
    int[] dx = {-1,1,0,0,-1,-1,1,1};
    int[] dy = {0,0,-1,1,-1,1,-1,1};
    for (int y = 0; y < height; y++) for (int x = 0; x < width; x++) {
      int start = y * width + x;
      if (seen[start]) continue;
      if (bitmap.GetPixel(x,y).A <= alphaThreshold) { seen[start] = true; continue; }
      List<int> component = new List<int>();
      Queue<int> queue = new Queue<int>();
      seen[start] = true;
      queue.Enqueue(start);
      while (queue.Count > 0) {
        int index = queue.Dequeue(), cx = index % width, cy = index / width;
        component.Add(index);
        for (int n = 0; n < 8; n++) {
          int nx = cx + dx[n], ny = cy + dy[n];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          int next = ny * width + nx;
          if (seen[next]) continue;
          if (bitmap.GetPixel(nx,ny).A > alphaThreshold) {
            seen[next] = true;
            queue.Enqueue(next);
          }
        }
      }
      if (component.Count < minArea) foreach (int index in component)
        bitmap.SetPixel(index % width,index / width,Color.Transparent);
    }
  }

  public static Rectangle AlphaBounds(Bitmap bitmap, int threshold) {
    int minX = bitmap.Width, minY = bitmap.Height, maxX = -1, maxY = -1;
    for (int y = 0; y < bitmap.Height; y++) for (int x = 0; x < bitmap.Width; x++)
      if (bitmap.GetPixel(x,y).A > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    return maxX < minX ? Rectangle.Empty : Rectangle.FromLTRB(minX,minY,maxX+1,maxY+1);
  }

  public static Bitmap AddOutline(Bitmap input) {
    Bitmap output = new Bitmap(input.Width,input.Height,PixelFormat.Format32bppArgb);
    Color outline = Color.FromArgb(255,8,7,5);
    for (int y = 1; y < input.Height-1; y++) for (int x = 1; x < input.Width-1; x++) {
      if (input.GetPixel(x,y).A > 10) continue;
      bool near = false;
      for (int yy = -1; yy <= 1 && !near; yy++) for (int xx = -1; xx <= 1; xx++)
        if (input.GetPixel(x+xx,y+yy).A > 18) { near = true; break; }
      if (near) output.SetPixel(x,y,outline);
    }
    using (Graphics graphics = Graphics.FromImage(output)) graphics.DrawImageUnscaled(input,0,0);
    return output;
  }
}
'@
}

$sourcePath = 'C:\Users\USER\.codex\generated_images\01a01bcf-97db-74e2-912d-34632e701330\exec-28b0f77c-53b9-4835-8532-6266199c65b7.png'
$gradeFiles = @(
  'grade-minus-4.png','grade-minus-3.png','grade-minus-2.png',
  'grade-minus-1.png','grade-0.png','grade-plus-1.png',
  'grade-plus-2.png','grade-plus-3.png','grade-plus-4.png'
)
$targetSizes = @(28,28,29,28,29,29,30,30,30)

function New-ArgbBitmap([int]$Width,[int]$Height) {
  [Drawing.Bitmap]::new($Width,$Height,[Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Clear-OuterPixel([Drawing.Bitmap]$Bitmap) {
  for ($i = 0; $i -lt $Bitmap.Width; $i++) {
    $Bitmap.SetPixel($i,0,[Drawing.Color]::Transparent)
    $Bitmap.SetPixel($i,$Bitmap.Height-1,[Drawing.Color]::Transparent)
  }
  for ($i = 0; $i -lt $Bitmap.Height; $i++) {
    $Bitmap.SetPixel(0,$i,[Drawing.Color]::Transparent)
    $Bitmap.SetPixel($Bitmap.Width-1,$i,[Drawing.Color]::Transparent)
  }
}

function Export-Cell([Drawing.Bitmap]$Sheet,[int]$Index,[string]$Path,[int]$TargetSize) {
  $cellWidth = [int]($Sheet.Width / 3)
  $cellHeight = [int]($Sheet.Height / 3)
  $tile = $Sheet.Clone(
    [Drawing.Rectangle]::new(($Index % 3) * $cellWidth,[int][Math]::Floor($Index / 3) * $cellHeight,$cellWidth,$cellHeight),
    [Drawing.Imaging.PixelFormat]::Format32bppArgb
  )
  try {
    $clean = [ReworkedBootRaster]::RemoveDarkBorder($tile,24)
    try {
      [ReworkedBootRaster]::RemoveSmallComponents($clean,10,100)
      $bounds = [ReworkedBootRaster]::AlphaBounds($clean,12)
      if ($bounds.IsEmpty) { throw "Empty shoe cell $Index" }
      $scale = $TargetSize / [double][Math]::Max($bounds.Width,$bounds.Height)
      $drawWidth = [Math]::Max(1,[int][Math]::Round($bounds.Width * $scale))
      $drawHeight = [Math]::Max(1,[int][Math]::Round($bounds.Height * $scale))
      $drawX = [int][Math]::Floor((32 - $drawWidth) / 2)
      $drawY = [int][Math]::Floor((32 - $drawHeight) / 2)
      $output = New-ArgbBitmap 32 32
      $graphics = [Drawing.Graphics]::FromImage($output)
      try {
        $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
        $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::Half
        $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::None
        $graphics.DrawImage(
          $clean,[Drawing.Rectangle]::new($drawX,$drawY,$drawWidth,$drawHeight),
          $bounds.X,$bounds.Y,$bounds.Width,$bounds.Height,[Drawing.GraphicsUnit]::Pixel
        )
      } finally {
        $graphics.Dispose()
      }
      try {
        $outlined = [ReworkedBootRaster]::AddOutline($output)
        try {
          Clear-OuterPixel $outlined
          $outlined.Save($Path,[Drawing.Imaging.ImageFormat]::Png)
        } finally {
          $outlined.Dispose()
        }
      } finally {
        $output.Dispose()
      }
    } finally {
      $clean.Dispose()
    }
  } finally {
    $tile.Dispose()
  }
}

function Save-Sheets([string]$Root,[string]$PixelRoot) {
  $sprite = New-ArgbBitmap 96 96
  $spriteGraphics = [Drawing.Graphics]::FromImage($sprite)
  try {
    for ($i = 0; $i -lt 9; $i++) {
      $icon = [Drawing.Bitmap]::FromFile((Join-Path $PixelRoot $gradeFiles[$i]))
      try { $spriteGraphics.DrawImageUnscaled($icon,($i % 3) * 32,[int][Math]::Floor($i / 3) * 32) }
      finally { $icon.Dispose() }
    }
    $sprite.Save((Join-Path $Root 'sprite-3x3-32px.png'),[Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $spriteGraphics.Dispose();$sprite.Dispose()
  }

  $preview = [Drawing.Bitmap]::new(480,480,[Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $previewGraphics = [Drawing.Graphics]::FromImage($preview)
  try {
    $previewGraphics.Clear([Drawing.ColorTranslator]::FromHtml('#171208'))
    $previewGraphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $previewGraphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::Half
    $previewGraphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::None
    for ($i = 0; $i -lt 9; $i++) {
      $icon = [Drawing.Bitmap]::FromFile((Join-Path $PixelRoot $gradeFiles[$i]))
      try {
        $previewGraphics.DrawImage($icon,[Drawing.Rectangle]::new(($i % 3) * 160 + 16,[int][Math]::Floor($i / 3) * 160 + 16,128,128))
      } finally { $icon.Dispose() }
    }
    $preview.Save((Join-Path $Root 'preview-actual-32px-4x.png'),[Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $previewGraphics.Dispose();$preview.Dispose()
  }
}

$pixelRoot = Join-Path $OutputRoot 'pixel-32px'
[void][IO.Directory]::CreateDirectory($pixelRoot)
$sheet = [Drawing.Bitmap]::FromFile($sourcePath)
try {
  for ($i = 0; $i -lt 9; $i++) {
    Export-Cell $sheet $i (Join-Path $pixelRoot $gradeFiles[$i]) $targetSizes[$i]
  }
} finally {
  $sheet.Dispose()
}
Save-Sheets $OutputRoot $pixelRoot
Copy-Item -LiteralPath $sourcePath -Destination (Join-Path $OutputRoot 'source-reworked-3x3.png') -Force
Write-Output "Exported reworked 32px boots to $OutputRoot"
