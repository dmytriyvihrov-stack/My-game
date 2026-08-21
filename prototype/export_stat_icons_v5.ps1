param([string]$OutputRoot=(Join-Path $PSScriptRoot 'assets\stat-icons-pixel-v5-24px'))
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing

if(-not('StatIconV5Raster'-as[type])){
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
public static class StatIconV5Raster {
  public static Bitmap Copy32(Bitmap input){Bitmap o=new Bitmap(input.Width,input.Height,PixelFormat.Format32bppArgb);using(Graphics g=Graphics.FromImage(o))g.DrawImageUnscaled(input,0,0);return o;}
  static bool Neutral(Color c){int max=Math.Max(c.R,Math.Max(c.G,c.B)),min=Math.Min(c.R,Math.Min(c.G,c.B));return min>=170&&max-min<=35;}
  public static Bitmap RemoveNeutralBorder(Bitmap input){
    Bitmap o=Copy32(input);int w=o.Width,h=o.Height;bool[] seen=new bool[w*h];Queue<int> q=new Queue<int>();
    Action<int,int> seed=(x,y)=>{int i=y*w+x;if(seen[i])return;seen[i]=true;if(Neutral(o.GetPixel(x,y)))q.Enqueue(i);};
    for(int x=0;x<w;x++){seed(x,0);seed(x,h-1);}for(int y=1;y<h-1;y++){seed(0,y);seed(w-1,y);}
    while(q.Count>0){int i=q.Dequeue(),x=i%w,y=i/w;o.SetPixel(x,y,Color.Transparent);Visit(x-1,y,w,h,o,seen,q);Visit(x+1,y,w,h,o,seen,q);Visit(x,y-1,w,h,o,seen,q);Visit(x,y+1,w,h,o,seen,q);}return o;
  }
  static void Visit(int x,int y,int w,int h,Bitmap b,bool[] seen,Queue<int> q){if(x<0||y<0||x>=w||y>=h)return;int i=y*w+x;if(seen[i])return;seen[i]=true;if(Neutral(b.GetPixel(x,y)))q.Enqueue(i);}
  static bool Dark(Color c,int limit){return Math.Max(c.R,Math.Max(c.G,c.B))<=limit;}
  public static Bitmap RemoveDarkBorder(Bitmap input,int limit){
    Bitmap o=Copy32(input);int w=o.Width,h=o.Height;bool[] seen=new bool[w*h];Queue<int> q=new Queue<int>();
    Action<int,int> seed=(x,y)=>{int i=y*w+x;if(seen[i])return;seen[i]=true;if(Dark(o.GetPixel(x,y),limit))q.Enqueue(i);};
    for(int x=0;x<w;x++){seed(x,0);seed(x,h-1);}for(int y=1;y<h-1;y++){seed(0,y);seed(w-1,y);}
    while(q.Count>0){int i=q.Dequeue(),x=i%w,y=i/w;o.SetPixel(x,y,Color.Transparent);VisitDark(x-1,y,w,h,limit,o,seen,q);VisitDark(x+1,y,w,h,limit,o,seen,q);VisitDark(x,y-1,w,h,limit,o,seen,q);VisitDark(x,y+1,w,h,limit,o,seen,q);}return o;
  }
  static void VisitDark(int x,int y,int w,int h,int limit,Bitmap b,bool[] seen,Queue<int> q){if(x<0||y<0||x>=w||y>=h)return;int i=y*w+x;if(seen[i])return;seen[i]=true;if(Dark(b.GetPixel(x,y),limit))q.Enqueue(i);}
  public static void RemoveSmallComponents(Bitmap b,int threshold,int minArea){
    int w=b.Width,h=b.Height;bool[] seen=new bool[w*h];int[] dx={-1,1,0,0,-1,-1,1,1},dy={0,0,-1,1,-1,1,-1,1};
    for(int y=0;y<h;y++)for(int x=0;x<w;x++){int s=y*w+x;if(seen[s])continue;Color c=b.GetPixel(x,y);if(c.A<=threshold){seen[s]=true;if(c.A>0)b.SetPixel(x,y,Color.Transparent);continue;}List<int> comp=new List<int>();Queue<int> q=new Queue<int>();seen[s]=true;q.Enqueue(s);while(q.Count>0){int i=q.Dequeue(),cx=i%w,cy=i/w;comp.Add(i);for(int n=0;n<8;n++){int nx=cx+dx[n],ny=cy+dy[n];if(nx<0||ny<0||nx>=w||ny>=h)continue;int ni=ny*w+nx;if(seen[ni])continue;if(b.GetPixel(nx,ny).A>threshold){seen[ni]=true;q.Enqueue(ni);}}}if(comp.Count<minArea)foreach(int i in comp)b.SetPixel(i%w,i/w,Color.Transparent);}
  }
  public static void KeepLargestComponent(Bitmap b,int threshold){
    int w=b.Width,h=b.Height;bool[] seen=new bool[w*h];int[] dx={-1,1,0,0,-1,-1,1,1},dy={0,0,-1,1,-1,1,-1,1};List<List<int>> all=new List<List<int>>();
    for(int y=0;y<h;y++)for(int x=0;x<w;x++){int s=y*w+x;if(seen[s]||b.GetPixel(x,y).A<=threshold){seen[s]=true;continue;}List<int> comp=new List<int>();Queue<int> q=new Queue<int>();seen[s]=true;q.Enqueue(s);while(q.Count>0){int i=q.Dequeue(),cx=i%w,cy=i/w;comp.Add(i);for(int n=0;n<8;n++){int nx=cx+dx[n],ny=cy+dy[n];if(nx<0||ny<0||nx>=w||ny>=h)continue;int ni=ny*w+nx;if(seen[ni])continue;if(b.GetPixel(nx,ny).A>threshold){seen[ni]=true;q.Enqueue(ni);}}}all.Add(comp);}
    if(all.Count<2)return;List<int> keep=all[0];foreach(List<int> c in all)if(c.Count>keep.Count)keep=c;bool[] mask=new bool[w*h];foreach(int i in keep)mask[i]=true;for(int y=0;y<h;y++)for(int x=0;x<w;x++)if(b.GetPixel(x,y).A>threshold&&!mask[y*w+x])b.SetPixel(x,y,Color.Transparent);
  }
  public static Rectangle AlphaBounds(Bitmap b,int threshold){int minX=b.Width,minY=b.Height,maxX=-1,maxY=-1;for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++)if(b.GetPixel(x,y).A>threshold){if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;}return maxX<minX?Rectangle.Empty:Rectangle.FromLTRB(minX,minY,maxX+1,maxY+1);}
  public static Bitmap AddOutline(Bitmap input){Bitmap o=new Bitmap(input.Width,input.Height,PixelFormat.Format32bppArgb);Color edge=Color.FromArgb(255,9,8,6);for(int y=1;y<input.Height-1;y++)for(int x=1;x<input.Width-1;x++){if(input.GetPixel(x,y).A>8)continue;bool near=false;for(int yy=-1;yy<=1&&!near;yy++)for(int xx=-1;xx<=1;xx++)if(input.GetPixel(x+xx,y+yy).A>16){near=true;break;}if(near)o.SetPixel(x,y,edge);}using(Graphics g=Graphics.FromImage(o))g.DrawImageUnscaled(input,0,0);return o;}
}
'@
}

$gen='C:\Users\USER\.codex\generated_images\01a01bcf-97db-74e2-912d-34632e701330'
$sources=@{
  strength=(Join-Path $gen 'exec-9dc379f6-7a4c-4fd0-88c6-cda10fac35c2.png')
  mouth=(Join-Path $gen 'exec-c291d3a7-7d73-4bb5-88f4-5fe53f1ae161.png')
  heart=(Join-Path $gen 'exec-ddd41695-2e59-4d5f-adb4-c7bcfa5eab63.png')
  shoe=(Join-Path $gen 'exec-55229632-09d1-4821-9905-8e04cd4c3b46.png')
}
$previous=Join-Path $PSScriptRoot 'assets\stat-icons-pixel-v4-24px\strength\pixel-24px'
$grades=@('grade-minus-4.png','grade-minus-3.png','grade-minus-2.png','grade-minus-1.png','grade-0.png','grade-plus-1.png','grade-plus-2.png','grade-plus-3.png','grade-plus-4.png')

function New-Bitmap([int]$w,[int]$h){[Drawing.Bitmap]::new($w,$h,[Drawing.Imaging.PixelFormat]::Format32bppArgb)}
function Clear-Edge([Drawing.Bitmap]$b){for($i=0;$i-lt24;$i++){$b.SetPixel($i,0,[Drawing.Color]::Transparent);$b.SetPixel($i,23,[Drawing.Color]::Transparent);$b.SetPixel(0,$i,[Drawing.Color]::Transparent);$b.SetPixel(23,$i,[Drawing.Color]::Transparent)}}

function Export-Cell([Drawing.Bitmap]$sheet,[int]$index,[string]$path,[int]$target,[bool]$neutral=$false,[bool]$dark=$false,[bool]$outline=$false,[bool]$largestOnly=$false,[int]$minArea=80,[int]$finalMinArea=0){
  $cw=[int]($sheet.Width/3);$ch=[int]($sheet.Height/3)
  $tile=$sheet.Clone([Drawing.Rectangle]::new(($index%3)*$cw,[int][Math]::Floor($index/3)*$ch,$cw,$ch),[Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try{
    if($neutral){$clean=[StatIconV5Raster]::RemoveNeutralBorder($tile)}elseif($dark){$clean=[StatIconV5Raster]::RemoveDarkBorder($tile,82)}else{$clean=[StatIconV5Raster]::Copy32($tile)}
    try{
      [StatIconV5Raster]::RemoveSmallComponents($clean,10,$minArea);if($largestOnly){[StatIconV5Raster]::KeepLargestComponent($clean,10)};$bounds=[StatIconV5Raster]::AlphaBounds($clean,12);if($bounds.IsEmpty){throw "Empty cell $index"}
      $scale=$target/[double][Math]::Max($bounds.Width,$bounds.Height);$dw=[Math]::Max(1,[int][Math]::Round($bounds.Width*$scale));$dh=[Math]::Max(1,[int][Math]::Round($bounds.Height*$scale));$dx=[int][Math]::Floor((24-$dw)/2);$dy=[int][Math]::Floor((24-$dh)/2)
      $out=New-Bitmap 24 24;$g=[Drawing.Graphics]::FromImage($out)
      try{$g.CompositingMode=[Drawing.Drawing2D.CompositingMode]::SourceCopy;$g.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::NearestNeighbor;$g.PixelOffsetMode=[Drawing.Drawing2D.PixelOffsetMode]::Half;$g.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::None;$g.DrawImage($clean,[Drawing.Rectangle]::new($dx,$dy,$dw,$dh),$bounds.X,$bounds.Y,$bounds.Width,$bounds.Height,[Drawing.GraphicsUnit]::Pixel)}finally{$g.Dispose()}
      try{
        if($finalMinArea -gt 0){[StatIconV5Raster]::RemoveSmallComponents($out,10,$finalMinArea)}
        if($outline){$final=[StatIconV5Raster]::AddOutline($out);try{Clear-Edge $final;$final.Save($path,[Drawing.Imaging.ImageFormat]::Png)}finally{$final.Dispose()}}
        else{Clear-Edge $out;$out.Save($path,[Drawing.Imaging.ImageFormat]::Png)}
      }finally{$out.Dispose()}
    }finally{$clean.Dispose()}
  }finally{$tile.Dispose()}
}

function Make-Dirs([string]$kind){$root=Join-Path $OutputRoot $kind;$pixels=Join-Path $root 'pixel-24px';[void][IO.Directory]::CreateDirectory($pixels);@{Root=$root;Pixels=$pixels}}
function Refine-Grade8Trail([string]$path){
  $loaded=[Drawing.Bitmap]::FromFile($path)
  try{$b=[StatIconV5Raster]::Copy32($loaded)}finally{$loaded.Dispose()}
  try{
    $trail=$b.GetPixel(3,12)
    $b.SetPixel(1,13,[Drawing.Color]::Transparent);$b.SetPixel(2,13,[Drawing.Color]::Transparent)
    for($x=2;$x-le6;$x++){$b.SetPixel($x,15,$trail)}
    Clear-Edge $b;$b.Save($path,[Drawing.Imaging.ImageFormat]::Png)
  }finally{$b.Dispose()}
}
function Save-Preview([string]$kind){
  $root=Join-Path $OutputRoot $kind;$dir=Join-Path $root 'pixel-24px';$sprite=New-Bitmap 72 72;$g=[Drawing.Graphics]::FromImage($sprite)
  try{for($i=0;$i-lt9;$i++){$b=[Drawing.Bitmap]::FromFile((Join-Path $dir $grades[$i]));try{$g.DrawImageUnscaled($b,($i%3)*24,[int][Math]::Floor($i/3)*24)}finally{$b.Dispose()}};$sprite.Save((Join-Path $root 'sprite-3x3-24px.png'),[Drawing.Imaging.ImageFormat]::Png)}finally{$g.Dispose();$sprite.Dispose()}
  $p=[Drawing.Bitmap]::new(480,480,[Drawing.Imaging.PixelFormat]::Format24bppRgb);$pg=[Drawing.Graphics]::FromImage($p)
  try{$pg.Clear([Drawing.ColorTranslator]::FromHtml('#171208'));$pg.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::NearestNeighbor;$pg.PixelOffsetMode=[Drawing.Drawing2D.PixelOffsetMode]::Half;$pg.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::None;for($i=0;$i-lt9;$i++){$b=[Drawing.Bitmap]::FromFile((Join-Path $dir $grades[$i]));try{$pg.DrawImage($b,[Drawing.Rectangle]::new(($i%3)*160+8,[int][Math]::Floor($i/3)*160+8,144,144))}finally{$b.Dispose()}};$p.Save((Join-Path $root 'preview-actual-24px-6x.png'),[Drawing.Imaging.ImageFormat]::Png)}finally{$pg.Dispose();$p.Dispose()}
}

[void][IO.Directory]::CreateDirectory($OutputRoot);$sd=Make-Dirs 'strength';$md=Make-Dirs 'morale-mouth';$hd=Make-Dirs 'morale-heart';$ad=Make-Dirs 'agility-shoe'
for($i=2;$i-lt9;$i++){Copy-Item -LiteralPath (Join-Path $previous $grades[$i]) -Destination (Join-Path $sd.Pixels $grades[$i]) -Force}
$s=[Drawing.Bitmap]::FromFile($sources.strength);$m=[Drawing.Bitmap]::FromFile($sources.mouth);$h=[Drawing.Bitmap]::FromFile($sources.heart);$a=[Drawing.Bitmap]::FromFile($sources.shoe)
try{
  Export-Cell $s 0 (Join-Path $sd.Pixels $grades[0]) 22 $true;Export-Cell $s 1 (Join-Path $sd.Pixels $grades[1]) 21 $true
  $heartSizes=@(9,12,14,16,17,18,20,21,22);$shoeSizes=@(20,20,20,20,20,20,21,22,22)
  for($i=0;$i-lt9;$i++){
    Export-Cell $m $i (Join-Path $md.Pixels $grades[$i]) 21
    Export-Cell $h $i (Join-Path $hd.Pixels $grades[$i]) $heartSizes[$i] $false $false $false ($i -ge 4)
    if($i -ge 6){Export-Cell $a $i (Join-Path $ad.Pixels $grades[$i]) $shoeSizes[$i] $true $false $false $false 200 2}
  }
  Refine-Grade8Trail (Join-Path $ad.Pixels $grades[7])
}finally{$s.Dispose();$m.Dispose();$h.Dispose();$a.Dispose()}
foreach($kind in @('strength','morale-mouth','morale-heart','agility-shoe')){Save-Preview $kind}
Write-Output "Exported V5 24px icon iterations to $OutputRoot"
