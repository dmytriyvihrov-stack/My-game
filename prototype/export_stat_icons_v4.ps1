param(
  [string]$OutputRoot = (Join-Path $PSScriptRoot 'assets\stat-icons-pixel-v4-24px')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

if (-not ('StatIconV4Raster' -as [type])) {
  Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;

public static class StatIconV4Raster {
  public static Bitmap Copy32(Bitmap input) {
    Bitmap output = new Bitmap(input.Width, input.Height, PixelFormat.Format32bppArgb);
    using (Graphics g = Graphics.FromImage(output)) g.DrawImageUnscaled(input, 0, 0);
    return output;
  }

  private static bool IsDark(Color c, int limit) {
    return Math.Max(c.R, Math.Max(c.G, c.B)) <= limit;
  }

  public static Bitmap RemoveDarkBorder(Bitmap input, int limit) {
    Bitmap output = Copy32(input);
    int w = output.Width, h = output.Height;
    bool[] seen = new bool[w * h];
    Queue<int> q = new Queue<int>();
    Action<int,int> seed = (x,y) => {
      int i = y * w + x;
      if (seen[i]) return;
      seen[i] = true;
      if (IsDark(output.GetPixel(x,y), limit)) q.Enqueue(i);
    };
    for (int x=0; x<w; x++) { seed(x,0); seed(x,h-1); }
    for (int y=1; y<h-1; y++) { seed(0,y); seed(w-1,y); }
    while (q.Count > 0) {
      int i=q.Dequeue(), x=i%w, y=i/w;
      output.SetPixel(x,y,Color.Transparent);
      VisitDark(x-1,y,w,h,limit,output,seen,q);
      VisitDark(x+1,y,w,h,limit,output,seen,q);
      VisitDark(x,y-1,w,h,limit,output,seen,q);
      VisitDark(x,y+1,w,h,limit,output,seen,q);
    }
    return output;
  }

  private static void VisitDark(int x,int y,int w,int h,int limit,Bitmap b,bool[] seen,Queue<int> q) {
    if (x<0 || y<0 || x>=w || y>=h) return;
    int i=y*w+x;
    if (seen[i]) return;
    seen[i]=true;
    if (IsDark(b.GetPixel(x,y),limit)) q.Enqueue(i);
  }

  public static void RemoveSmallAlphaComponents(Bitmap b, int threshold, int minArea) {
    int w=b.Width,h=b.Height;
    bool[] seen=new bool[w*h];
    int[] dx={-1,1,0,0,-1,-1,1,1};
    int[] dy={0,0,-1,1,-1,1,-1,1};
    for (int y=0;y<h;y++) for (int x=0;x<w;x++) {
      int start=y*w+x;
      if (seen[start]) continue;
      Color c=b.GetPixel(x,y);
      if (c.A<=threshold) { seen[start]=true; if(c.A>0)b.SetPixel(x,y,Color.Transparent); continue; }
      List<int> component=new List<int>();
      Queue<int> q=new Queue<int>();
      seen[start]=true;q.Enqueue(start);
      while(q.Count>0){
        int i=q.Dequeue(),cx=i%w,cy=i/w;component.Add(i);
        for(int n=0;n<8;n++){
          int nx=cx+dx[n],ny=cy+dy[n];
          if(nx<0||ny<0||nx>=w||ny>=h)continue;
          int ni=ny*w+nx;if(seen[ni])continue;
          Color nc=b.GetPixel(nx,ny);
          if(nc.A>threshold){seen[ni]=true;q.Enqueue(ni);}
        }
      }
      if(component.Count<minArea) foreach(int i in component)b.SetPixel(i%w,i/w,Color.Transparent);
    }
  }

  public static Rectangle AlphaBounds(Bitmap b, int threshold) {
    int minX=b.Width,minY=b.Height,maxX=-1,maxY=-1;
    for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++)if(b.GetPixel(x,y).A>threshold){
      if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
    }
    return maxX<minX?Rectangle.Empty:Rectangle.FromLTRB(minX,minY,maxX+1,maxY+1);
  }

  public static Bitmap AddOnePixelOutline(Bitmap input) {
    Bitmap outlined=new Bitmap(input.Width,input.Height,PixelFormat.Format32bppArgb);
    Color edge=Color.FromArgb(255,10,9,7);
    for(int y=1;y<input.Height-1;y++)for(int x=1;x<input.Width-1;x++){
      if(input.GetPixel(x,y).A>8)continue;
      bool near=false;
      for(int yy=-1;yy<=1&&!near;yy++)for(int xx=-1;xx<=1;xx++)if(input.GetPixel(x+xx,y+yy).A>16){near=true;break;}
      if(near)outlined.SetPixel(x,y,edge);
    }
    using(Graphics g=Graphics.FromImage(outlined))g.DrawImageUnscaled(input,0,0);
    return outlined;
  }
}
'@
}

$generatedRoot = 'C:\Users\USER\.codex\generated_images\01a01bcf-97db-74e2-912d-34632e701330'
$strengthSheetPath = Join-Path $generatedRoot 'exec-4b1168d0-a45d-48db-acff-f5b0b9b8893c.png'
$brainSheetPath = Join-Path $generatedRoot 'exec-a19dc062-386a-4317-9dbe-8d4ed54414df.png'
$moraleSheetPath = Join-Path $generatedRoot 'exec-cb36b742-1617-4e21-9942-f94f57118597.png'
$agilitySheetPath = Join-Path $generatedRoot 'exec-cfcc10b6-8ef2-4c7d-86d9-5a681ea0ae27.png'
$previousRoot = Join-Path $PSScriptRoot 'assets\stat-icons-pixel-v3'

$gradeFiles = @('grade-minus-4.png','grade-minus-3.png','grade-minus-2.png','grade-minus-1.png','grade-0.png','grade-plus-1.png','grade-plus-2.png','grade-plus-3.png','grade-plus-4.png')
$agilityFiles = @('boot-low.png','feather-low.png','dodge-low.png','boot-medium.png','feather-medium.png','dodge-medium.png','boot-high.png','feather-high.png','dodge-high.png')

function New-Bitmap([int]$Width,[int]$Height){
  return [System.Drawing.Bitmap]::new($Width,$Height,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Clear-Outer-Pixel([System.Drawing.Bitmap]$Bitmap){
  for($i=0;$i-lt$Bitmap.Width;$i++){$Bitmap.SetPixel($i,0,[Drawing.Color]::Transparent);$Bitmap.SetPixel($i,$Bitmap.Height-1,[Drawing.Color]::Transparent)}
  for($i=0;$i-lt$Bitmap.Height;$i++){$Bitmap.SetPixel(0,$i,[Drawing.Color]::Transparent);$Bitmap.SetPixel($Bitmap.Width-1,$i,[Drawing.Color]::Transparent)}
}

function Export-Cell(
  [System.Drawing.Bitmap]$Sheet,[int]$Index,[string]$OutputPath,
  [bool]$RemoveDark=$false,[bool]$AddOutline=$false
){
  $cw=[int]($Sheet.Width/3);$ch=[int]($Sheet.Height/3)
  $tile=$Sheet.Clone([Drawing.Rectangle]::new(($Index%3)*$cw,[int][Math]::Floor($Index/3)*$ch,$cw,$ch),[Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try{
    if($RemoveDark){$clean=[StatIconV4Raster]::RemoveDarkBorder($tile,72)}else{$clean=[StatIconV4Raster]::Copy32($tile)}
    try{
      [StatIconV4Raster]::RemoveSmallAlphaComponents($clean,10,80)
      $bounds=[StatIconV4Raster]::AlphaBounds($clean,12)
      if($bounds.IsEmpty){throw "Cell $Index has no visible pixels"}
      $side=[int][Math]::Ceiling([Math]::Max($bounds.Width,$bounds.Height)*1.16)
      $padded=New-Bitmap $side $side
      $g=[Drawing.Graphics]::FromImage($padded)
      try{
        $g.CompositingMode=[Drawing.Drawing2D.CompositingMode]::SourceCopy
        $dx=[int](($side-$bounds.Width)/2)-$bounds.X
        $dy=[int](($side-$bounds.Height)/2)-$bounds.Y
        $g.DrawImageUnscaled($clean,$dx,$dy)
      }finally{$g.Dispose()}
      try{
        $small=New-Bitmap 24 24
        $sg=[Drawing.Graphics]::FromImage($small)
        try{
          $sg.CompositingMode=[Drawing.Drawing2D.CompositingMode]::SourceCopy
          $sg.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
          $sg.PixelOffsetMode=[Drawing.Drawing2D.PixelOffsetMode]::Half
          $sg.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::None
          $sg.DrawImage($padded,[Drawing.Rectangle]::new(0,0,24,24),0,0,$padded.Width,$padded.Height,[Drawing.GraphicsUnit]::Pixel)
        }finally{$sg.Dispose()}
        try{
          if($AddOutline){$final=[StatIconV4Raster]::AddOnePixelOutline($small)}else{$final=[StatIconV4Raster]::Copy32($small)}
          try{Clear-Outer-Pixel $final;$final.Save($OutputPath,[Drawing.Imaging.ImageFormat]::Png)}finally{$final.Dispose()}
        }finally{$small.Dispose()}
      }finally{$padded.Dispose()}
    }finally{$clean.Dispose()}
  }finally{$tile.Dispose()}
}

function Export-CellTargetSize([System.Drawing.Bitmap]$Sheet,[int]$Index,[string]$OutputPath,[int]$TargetMax){
  $cw=[int]($Sheet.Width/3);$ch=[int]($Sheet.Height/3)
  $tile=$Sheet.Clone([Drawing.Rectangle]::new(($Index%3)*$cw,[int][Math]::Floor($Index/3)*$ch,$cw,$ch),[Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try{
    $clean=[StatIconV4Raster]::Copy32($tile)
    try{
      [StatIconV4Raster]::RemoveSmallAlphaComponents($clean,10,80)
      $bounds=[StatIconV4Raster]::AlphaBounds($clean,12)
      if($bounds.IsEmpty){throw "Cell $Index has no visible pixels"}
      $scale=$TargetMax/[double][Math]::Max($bounds.Width,$bounds.Height)
      $dw=[Math]::Max(1,[int][Math]::Round($bounds.Width*$scale));$dh=[Math]::Max(1,[int][Math]::Round($bounds.Height*$scale))
      $dx=[int][Math]::Floor((24-$dw)/2);$dy=[int][Math]::Floor((24-$dh)/2)
      $small=New-Bitmap 24 24;$g=[Drawing.Graphics]::FromImage($small)
      try{
        $g.CompositingMode=[Drawing.Drawing2D.CompositingMode]::SourceCopy
        $g.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
        $g.PixelOffsetMode=[Drawing.Drawing2D.PixelOffsetMode]::Half
        $g.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::None
        $g.DrawImage($clean,[Drawing.Rectangle]::new($dx,$dy,$dw,$dh),$bounds.X,$bounds.Y,$bounds.Width,$bounds.Height,[Drawing.GraphicsUnit]::Pixel)
      }finally{$g.Dispose()}
      try{Clear-Outer-Pixel $small;$small.Save($OutputPath,[Drawing.Imaging.ImageFormat]::Png)}finally{$small.Dispose()}
    }finally{$clean.Dispose()}
  }finally{$tile.Dispose()}
}

function New-SetFolders([string]$Kind){
  $kindRoot=Join-Path $OutputRoot $Kind
  $pixelDir=Join-Path $kindRoot 'pixel-24px'
  [void][IO.Directory]::CreateDirectory($pixelDir)
  return @{Root=$kindRoot;Pixel=$pixelDir}
}

function Save-SetPreview([string]$Kind,[string[]]$Files){
  $kindRoot=Join-Path $OutputRoot $Kind;$dir=Join-Path $kindRoot 'pixel-24px'
  $sprite=New-Bitmap 72 72;$g=[Drawing.Graphics]::FromImage($sprite)
  try{for($i=0;$i-lt9;$i++){$b=[Drawing.Bitmap]::FromFile((Join-Path $dir $Files[$i]));try{$g.DrawImageUnscaled($b,($i%3)*24,[int][Math]::Floor($i/3)*24)}finally{$b.Dispose()}};$sprite.Save((Join-Path $kindRoot 'sprite-3x3-24px.png'),[Drawing.Imaging.ImageFormat]::Png)}finally{$g.Dispose();$sprite.Dispose()}
  $preview=[Drawing.Bitmap]::new(480,480,[Drawing.Imaging.PixelFormat]::Format24bppRgb);$pg=[Drawing.Graphics]::FromImage($preview)
  try{$pg.Clear([Drawing.ColorTranslator]::FromHtml('#171208'));$pg.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::NearestNeighbor;$pg.PixelOffsetMode=[Drawing.Drawing2D.PixelOffsetMode]::Half;$pg.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::None;for($i=0;$i-lt9;$i++){$b=[Drawing.Bitmap]::FromFile((Join-Path $dir $Files[$i]));try{$x=($i%3)*160+8;$y=[int][Math]::Floor($i/3)*160+8;$pg.DrawImage($b,[Drawing.Rectangle]::new($x,$y,144,144))}finally{$b.Dispose()}};$preview.Save((Join-Path $kindRoot 'preview-actual-24px-6x.png'),[Drawing.Imaging.ImageFormat]::Png)}finally{$pg.Dispose();$preview.Dispose()}
}

[void][IO.Directory]::CreateDirectory($OutputRoot)
$strengthDirs=New-SetFolders 'strength';$brainDirs=New-SetFolders 'brain';$moraleDirs=New-SetFolders 'morale';$agilityDirs=New-SetFolders 'agility'

for($i=2;$i-lt9;$i++){Copy-Item -LiteralPath (Join-Path $previousRoot "strength\pixel-24px\$($gradeFiles[$i])") -Destination (Join-Path $strengthDirs.Pixel $gradeFiles[$i]) -Force}
for($i=0;$i-lt9;$i++){if($i -notin @(5,6,7)){Copy-Item -LiteralPath (Join-Path $previousRoot "brain\pixel-24px\$($gradeFiles[$i])") -Destination (Join-Path $brainDirs.Pixel $gradeFiles[$i]) -Force}}

$strengthSheet=[Drawing.Bitmap]::FromFile($strengthSheetPath);$brainSheet=[Drawing.Bitmap]::FromFile($brainSheetPath);$moraleSheet=[Drawing.Bitmap]::FromFile($moraleSheetPath);$agilitySheet=[Drawing.Bitmap]::FromFile($agilitySheetPath)
try{
  Export-Cell $strengthSheet 0 (Join-Path $strengthDirs.Pixel $gradeFiles[0]) $true $true
  Export-Cell $strengthSheet 1 (Join-Path $strengthDirs.Pixel $gradeFiles[1]) $true $true
  Export-CellTargetSize $brainSheet 5 (Join-Path $brainDirs.Pixel $gradeFiles[5]) 17
  Export-CellTargetSize $brainSheet 6 (Join-Path $brainDirs.Pixel $gradeFiles[6]) 20
  Export-CellTargetSize $brainSheet 7 (Join-Path $brainDirs.Pixel $gradeFiles[7]) 22
  for($i=0;$i-lt9;$i++){
    Export-Cell $moraleSheet $i (Join-Path $moraleDirs.Pixel $gradeFiles[$i])
    Export-Cell $agilitySheet $i (Join-Path $agilityDirs.Pixel $agilityFiles[$i])
  }
}finally{$strengthSheet.Dispose();$brainSheet.Dispose();$moraleSheet.Dispose();$agilitySheet.Dispose()}

Save-SetPreview 'strength' $gradeFiles
Save-SetPreview 'brain' $gradeFiles
Save-SetPreview 'morale' $gradeFiles
Save-SetPreview 'agility' $agilityFiles
Write-Output "Exported four 24px-only icon sets to $OutputRoot"
