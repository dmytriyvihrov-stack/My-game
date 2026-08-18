# Static file server for verifying the RabbleBound prototype.
#
# WHY THIS EXISTS: the preview pane will not truly reload a file:// page for this
# project, and almost every real bug here was found by RUNNING the game rather
# than reading it. This used to live in the session scratchpad and had to be
# rewritten from scratch every session; it lives in the repo now so `.claude/
# launch.json` can point at something that is still there next time.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\serve.ps1
#   $env:GT_PORT / $env:GT_ROOT override the defaults.
#
# Then open http://localhost:8777/prototype/grimtoll_slice.html
#
# ---------------------------------------------------------------------------
# CONCURRENT AND RANGE-AWARE SINCE THE AUDIO PACK LANDED, AND BOTH HALVES WERE
# FOUND THE SAME WAY: by the game going silent and staying silent.
#
# It used to be one `while` loop calling GetContext() and writing the whole
# file in a single blocking Write. That is fine for HTML, JS and 5KB PNGs and
# it was fine for two years. It is NOT fine for a 16MB WAV in a <audio>
# element, for one specific reason: a media element does not read its response
# as fast as it can. It buffers ahead, then THROTTLES to roughly playback rate
# and holds the connection open for the length of the track. A single-threaded
# server sits inside that one Write for the whole song, and every other
# request in the world -- the next track, the page itself, a POST /__shot --
# queues behind it. Observed live: world_fen.wav played, and battle.wav,
# boss.wav and world_road.wav all sat at readyState 0 with zero bytes
# buffered, indefinitely.
#
# So: one runspace per request (pool of 12), and byte-range support, which is
# what a media element actually wants -- it can then ask for the slice it
# needs, be given it, and let go of the connection.
# ---------------------------------------------------------------------------
$port = if ($env:GT_PORT) { $env:GT_PORT } else { '8777' }
# 8.3 short path on purpose: the real one contains Cyrillic ("Google <disk>"), and
# PowerShell 5.1 reads a .ps1 as ANSI -- a literal Cyrillic path in this file comes
# back as mojibake and every request 404s. Keep this script pure ASCII.
$root = if ($env:GT_ROOT) { $env:GT_ROOT } else { Split-Path -Parent $PSScriptRoot }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "serving $root on http://localhost:$port/"

# .wav matters: served as application/octet-stream an <audio> element will
# still usually play it, but Safari refuses and Chrome is slower to report a
# duration, which the world crossfade reads. Name it properly.
$mime = @{ '.html'='text/html; charset=utf-8'; '.js'='application/javascript'; '.css'='text/css';
           '.png'='image/png'; '.webp'='image/webp'; '.jpg'='image/jpeg'; '.json'='application/json'; '.md'='text/plain; charset=utf-8';
           '.wav'='audio/wav'; '.mp3'='audio/mpeg'; '.ogg'='audio/ogg'; '.svg'='image/svg+xml' }

$handler = {
  param($ctx, $root, $mime)
  try {
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')

    # ---- POST /__shot/<name> : the page saves a picture of itself -------------
    # WHY: the preview pane runs HIDDEN, so it never composites a frame and a
    # screenshot is impossible. The gate ("show a picture, mandatory") still has
    # to be met, so the page serialises its own board -- style block + terrain
    # canvas + the live hex DOM -- and POSTs it here. Written under shots/,
    # which is a scratch folder: nothing in the game reads it.
    if ($ctx.Request.HttpMethod -eq 'POST' -and $rel -like '__shot/*') {
      $name = ($rel -replace '^__shot/', '') -replace '[^A-Za-z0-9._-]', '_'
      $dir  = Join-Path $root 'shots'
      if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
      $sr = New-Object System.IO.StreamReader($ctx.Request.InputStream, [System.Text.Encoding]::UTF8)
      $payload = $sr.ReadToEnd(); $sr.Close()
      [System.IO.File]::WriteAllText((Join-Path $dir $name), $payload, (New-Object System.Text.UTF8Encoding($false)))
      $ctx.Response.ContentType = 'text/plain'
      $ok = [System.Text.Encoding]::UTF8.GetBytes("saved shots/$name ($($payload.Length) chars)")
      $ctx.Response.OutputStream.Write($ok, 0, $ok.Length)
      $ctx.Response.OutputStream.Close()
      return
    }

    if ($rel -eq '') { $rel = 'prototype/grimtoll_slice.html' }
    $path = Join-Path $root ($rel -replace '/', '\')
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
      $ctx.Response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("not found: $rel")
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
      $ctx.Response.OutputStream.Close()
      return
    }

    $ext = [System.IO.Path]::GetExtension($path).ToLower()
    $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
    # never cache: the whole point is reloading the file we just edited
    $ctx.Response.Headers.Add('Cache-Control', 'no-store, no-cache, must-revalidate')
    $ctx.Response.Headers.Add('Accept-Ranges', 'bytes')

    # FileShare ReadWrite: the art and shot pipelines write into this tree while
    # the browser is reading from it, and a locked file here is a mystery 404.
    $fs = [System.IO.File]::Open($path, 'Open', 'Read', 'ReadWrite')
    try {
      $len  = $fs.Length
      $from = [int64]0
      $to   = $len - 1
      $rangeHdr = $ctx.Request.Headers['Range']
      if ($rangeHdr -and $rangeHdr -match '^bytes=(\d*)-(\d*)$') {
        $a = $matches[1]; $b = $matches[2]
        if ($a -ne '') {
          $from = [int64]$a
          if ($b -ne '') { $to = [int64]$b }
        } elseif ($b -ne '') {
          $from = $len - [int64]$b          # "last N bytes"
        }
        if ($from -lt 0) { $from = [int64]0 }
        if ($to -gt $len - 1) { $to = $len - 1 }
        if ($from -gt $to -or $from -ge $len) {
          $ctx.Response.StatusCode = 416
          $ctx.Response.Headers.Add('Content-Range', "bytes */$len")
          $ctx.Response.OutputStream.Close()
          return
        }
        $ctx.Response.StatusCode = 206
        $ctx.Response.Headers.Add('Content-Range', "bytes $from-$to/$len")
      }
      $count = $to - $from + 1
      $ctx.Response.ContentLength64 = $count
      $fs.Position = $from
      $buf = New-Object byte[] 65536
      $left = $count
      while ($left -gt 0) {
        $want = [int][Math]::Min([int64]$buf.Length, $left)
        $n = $fs.Read($buf, 0, $want)
        if ($n -le 0) { break }
        $ctx.Response.OutputStream.Write($buf, 0, $n)
        $left -= $n
      }
    } finally { $fs.Dispose() }
    $ctx.Response.OutputStream.Close()
  } catch {
    # a media element abandoning a range mid-write is normal, not an error
    try { $ctx.Response.Abort() } catch { }
  }
}

$pool = [RunspaceFactory]::CreateRunspacePool(1, 12)
$pool.Open()
$jobs = New-Object System.Collections.ArrayList

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $ps = [PowerShell]::Create()
    $ps.RunspacePool = $pool
    [void]$ps.AddScript($handler).AddArgument($ctx).AddArgument($root).AddArgument($mime)
    [void]$jobs.Add(@{ ps = $ps; h = $ps.BeginInvoke() })
    # reap finished handlers, or the list grows for the life of the server
    for ($i = $jobs.Count - 1; $i -ge 0; $i--) {
      if ($jobs[$i].h.IsCompleted) {
        try { $jobs[$i].ps.EndInvoke($jobs[$i].h) | Out-Null } catch { }
        $jobs[$i].ps.Dispose()
        $jobs.RemoveAt($i)
      }
    }
  } catch { }
}
