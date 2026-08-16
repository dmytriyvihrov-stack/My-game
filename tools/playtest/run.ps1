# run.ps1 - put a build through the three playtesters.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\playtest\run.ps1 -Who all
#   ... -Who andrey                      one tester
#   ... -Who all -Parallel               three browsers, three testers at once
#   ... -Url https://dmytriyvihrov-stack.github.io/My-game/     the deployed build
#   ... -Model sonnet -Budget 80         a cheaper, shorter sweep
#   ... -DryRun                          launch the browser and print the command, call nobody
#
# Each tester is a SEPARATE `claude -p` process, started in an EMPTY folder under
# %USERPROFILE%\grimtoll-playtest\, with `--tools ""` (no Read, no Bash, nothing) and
# `--strict-mcp-config` (none of the user's connectors). Its one tool is the game, served
# by tools\playtest\eyes.py over a headless Chrome/Edge with a fresh profile, so the run
# starts as a stranger's: no save, no legacy, no journal. That is the clean room. It is
# clean because the process never sees this repo, its rules, or the auto-memory: a subagent
# spawned inside a Claude session working this folder inherits all three, which is why
# this is a script and not an agent file.
#
# What comes back, per tester, into docs\playtests\:
#   <stamp>_<label>_<who>.md   the tester's report + the game's own telemetry + the diary
# and for -Who all also <stamp>_<label>_ALL.md, the comparison.
# The raw folder (transcript, screenshots-free action log, browser profile) stays under
# %USERPROFILE%\grimtoll-playtest\<stamp>_<label>\<who>\, outside the repo and outside Drive.
#
# ONE-TIME: the bundled claude.exe must be logged in for headless use. If a report says
# "Not logged in", run the exe once by hand and type /login:
#   & "$env:APPDATA\Claude\claude-code\<version>\claude.exe"
# (or set ANTHROPIC_API_KEY in the environment; the script passes it through.)
#
# This file is pure ASCII on purpose: PowerShell 5.1 reads a .ps1 as ANSI and the repo
# path is Cyrillic. Paths are computed, never typed.

param(
  [ValidateSet('dima', 'sanya', 'andrey', 'all')] [string]$Who = 'all',
  [string]$Url = 'http://localhost:8777/',
  [string]$Model = 'opus',
  [int]$Budget = 150,
  [double]$MaxUsd = 20,
  [string]$Label = '',
  [ValidateSet('chrome', 'edge')] [string]$Browser = 'chrome',
  [string]$Claude = '',
  [string]$Python = '',
  [switch]$Parallel,
  [switch]$DryRun,
  [switch]$KeepBrowser
)

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$repo = Split-Path -Parent (Split-Path -Parent $here)
$eyes = Join-Path $here 'eyes.py'
$personas = Join-Path $here 'personas'

# ---- tools we need
if (-not $Python) {
  $cands = @(
    "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe",
    'python.exe', 'py.exe'
  )
  foreach ($c in $cands) { if (Get-Command $c -ErrorAction SilentlyContinue) { $Python = (Get-Command $c).Source; break } }
}
if (-not $Python) { throw 'no python found; pass -Python' }

if (-not $Claude) {
  $onPath = Get-Command claude -ErrorAction SilentlyContinue
  if ($onPath) { $Claude = $onPath.Source }
  else {
    $dir = Join-Path $env:APPDATA 'Claude\claude-code'
    if (Test-Path $dir) {
      $v = Get-ChildItem $dir -Directory | Sort-Object { try { [version]$_.Name } catch { [version]'0.0' } } -Descending | Select-Object -First 1
      if ($v) { $Claude = Join-Path $v.FullName 'claude.exe' }
    }
  }
}
if (-not $Claude -or -not (Test-Path $Claude)) { throw 'no claude.exe found; pass -Claude' }

# ---- the build label: what this report is ABOUT
if (-not $Label) {
  $sha = ''
  try { $sha = (& git -C $repo rev-parse --short HEAD 2>$null) } catch { }
  if ($sha) { $Label = $sha } else { $Label = 'local' }
}
$stamp = Get-Date -Format 'yyyy-MM-dd_HHmm'
$when = Get-Date -Format 'yyyy-MM-dd HH:mm'

# ---- the game must be up if it is ours
if ($Url -match '^http://localhost:(\d+)/') {
  $port = [int]$matches[1]
  $up = $false
  try { $tc = New-Object Net.Sockets.TcpClient; $tc.Connect('127.0.0.1', $port); $up = $tc.Connected; $tc.Close() } catch { }
  if (-not $up) {
    Write-Host "starting tools\serve.ps1 on $port"
    $env:GT_PORT = "$port"
    Start-Process powershell -ArgumentList '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $repo 'tools\serve.ps1') -WindowStyle Hidden
    Start-Sleep -Seconds 2
  }
}

$testers = @()
if ($Who -eq 'all') { $testers = @('dima', 'sanya', 'andrey') } else { $testers = @($Who) }
$portOf = @{ dima = 9301; sanya = 9302; andrey = 9303 }
$visionOf = @{ dima = 'normal'; sanya = 'normal'; andrey = 'weak' }

$root = Join-Path $env:USERPROFILE ("grimtoll-playtest\" + $stamp + '_' + $Label)
$docs = Join-Path $repo 'docs\playtests'
New-Item -ItemType Directory -Force $root | Out-Null
New-Item -ItemType Directory -Force $docs | Out-Null

$common = Get-Content (Join-Path $personas '_common.md') -Raw -Encoding UTF8

function Start-Tester([string]$who) {
  $dir = Join-Path $root $who
  $out = Join-Path $dir 'out'
  $profile = Join-Path $dir 'profile'
  New-Item -ItemType Directory -Force $out, $profile | Out-Null

  # the persona + the shared protocol, one system prompt
  $persona = Get-Content (Join-Path $personas ($who + '.md')) -Raw -Encoding UTF8
  $sys = Join-Path $dir 'system.md'
  [IO.File]::WriteAllText($sys, ($persona + "`n" + $common), (New-Object Text.UTF8Encoding($false)))

  # a fresh browser on the build
  $port = $portOf[$who]
  & $Python $eyes launch --port $port --profile $profile --url $Url --browser $Browser | Out-Null

  # the one tool it gets
  $cfg = Join-Path $dir 'mcp.json'
  $mcp = @{ mcpServers = @{ game = @{ command = $Python; args = @($eyes, 'serve', '--port', "$port", '--out', $out,
      '--vision', $visionOf[$who], '--budget', "$Budget", '--who', $who) } } }
  [IO.File]::WriteAllText($cfg, ($mcp | ConvertTo-Json -Depth 6), (New-Object Text.UTF8Encoding($false)))

  $brief = "Build $Label is on the screen in front of you. You have about $Budget actions. Start with look() and screenshot(), then play by your own lights. note() as you go, and when you stop, report(). Begin."
  $maxTurns = $Budget * 3 + 60
  $args = @('-p', ('"' + $brief + '"'), '--model', $Model, '--system-prompt-file', ('"' + $sys + '"'),
    '--tools', '""', '--strict-mcp-config', '--mcp-config', ('"' + $cfg + '"'),
    '--permission-mode', 'bypassPermissions', '--no-session-persistence',
    '--output-format', 'stream-json', '--verbose', '--max-turns', "$maxTurns", '--max-budget-usd', "$MaxUsd")

  Write-Host ("[" + $who + "] browser on :" + $port + ", vision " + $visionOf[$who] + ", folder " + $dir)
  if ($DryRun) {
    Write-Host ('  ' + $Claude + ' ' + ($args -join ' '))
    return @{ who = $who; dir = $dir; port = $port; proc = $null }
  }
  $p = Start-Process -FilePath $Claude -ArgumentList $args -WorkingDirectory $dir -NoNewWindow -PassThru `
    -RedirectStandardOutput (Join-Path $dir 'transcript.jsonl') -RedirectStandardError (Join-Path $dir 'stderr.txt')
  return @{ who = $who; dir = $dir; port = $port; proc = $p }
}

function Finish-Tester($t) {
  $who = $t.who; $dir = $t.dir; $port = $t.port
  if ($t.proc) { $t.proc.WaitForExit() }
  # the game's own telemetry, read while the browser is still standing
  try { & $Python $eyes cli --port $port dump (Join-Path $dir 'results.json') | Out-Null } catch { Write-Host "  [$who] dump failed: $_" }
  if (-not $KeepBrowser) { try { & $Python $eyes cli --port $port close | Out-Null } catch { } }
  $tr = Join-Path $dir 'transcript.jsonl'
  if (Test-Path $tr) {
    try { & $Python $eyes thoughts $tr --out (Join-Path $dir 'thoughts.md') | Out-Null } catch { }
    if ((Get-Content $tr -Raw -ErrorAction SilentlyContinue) -match 'Not logged in') {
      Write-Host ''
      Write-Host "  [$who] THE CLI IS NOT LOGGED IN. Run it once by hand and type /login:" -ForegroundColor Yellow
      Write-Host ('    & "' + $Claude + '"') -ForegroundColor Yellow
      Write-Host ''
    }
  }
  $meta = @{ who = $who; label = $Label; url = $Url; model = $Model; when = $when; budget = $Budget; vision = $visionOf[$who] } | ConvertTo-Json -Compress
  [IO.File]::WriteAllText((Join-Path $dir 'meta.json'), $meta, (New-Object Text.UTF8Encoding($false)))
  $page = Join-Path $docs ($stamp + '_' + $Label + '_' + $who + '.md')
  & $Python $eyes assemble --dir $dir --out $page
  return $page
}

$started = @()
$pages = @()
if ($Parallel) {
  foreach ($w in $testers) { $started += Start-Tester $w }
  foreach ($t in $started) { $pages += Finish-Tester $t }
} else {
  foreach ($w in $testers) {
    $t = Start-Tester $w
    $pages += Finish-Tester $t
  }
}

if ($testers.Count -gt 1 -and -not $DryRun) {
  $dirs = $testers | ForEach-Object { Join-Path $root $_ }
  $all = Join-Path $docs ($stamp + '_' + $Label + '_ALL.md')
  & $Python $eyes compare --out $all --label $Label @dirs
  $pages += $all
}

Write-Host ''
Write-Host 'done. reports:'
$pages | ForEach-Object { Write-Host ('  ' + $_) }
Write-Host ('raw: ' + $root)
