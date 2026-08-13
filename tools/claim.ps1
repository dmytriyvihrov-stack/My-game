# ============================================================================
# claim.ps1 - one working tree, two Claude sessions. This is the traffic light.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 <verb>
#
#   number [entry|build|both]  reserve the next free #NN and 8f.NNN
#   lock   [path]              take the prototype (or any path) for this session
#   release [path|NN|all]      give it back
#   status                     who holds what, and for how long
#   verify [staged]            does this change use a number somebody else holds
#   gate   [path]              exit 1 if somebody else owns it. For build scripts
#   hook                       internal: Claude Code PreToolUse gate, stdin JSON
#
# WHY THIS EXISTS. The number used to live in a sentence in a document, and the
# document is written LAST: the code and shots\ get the number first. So "grep
# before you take a number" could never work, and it cost five collisions. A
# claim is taken FIRST, and it is a file that cannot be created twice.
#
# The two sessions share ONE working tree and ONE branch, so git isolates
# nothing between them. The filesystem is the only thing they both see, so the
# filesystem is where the lock goes: .grimtoll\, which is gitignored.
#
# ---------------------------------------------------------------------------
# KEEP THIS FILE PURE ASCII, same reason as deploy.ps1: PowerShell 5.1 reads a
# .ps1 as ANSI and the repo path contains Cyrillic ("Google <disk>"). Every
# path derives from $PSScriptRoot.
# ---------------------------------------------------------------------------
[CmdletBinding()]
param(
  [Parameter(Position = 0)]
  [ValidateSet('number', 'lock', 'release', 'status', 'verify', 'gate', 'hook')]
  [string] $Verb = 'status',

  [Parameter(Position = 1)]
  [string] $Arg = '',

  [Alias('t')] [string] $Title = '',
  [Alias('b')] [string] $By = '',
  [switch] $Steal,
  [switch] $Json
)

$ErrorActionPreference = 'Stop'

$Root      = Split-Path $PSScriptRoot -Parent

# ---------------------------------------------------------------------------
# THE STORE IS SHARED BY EVERY WORKTREE ON THIS MACHINE. (#139)
#
# Since branch-per-session, a session may be running in a git worktree: its own
# directory, its own branch, ONE shared .git. If the store followed $Root, each
# worktree would count numbers from its own empty store and hand out #136 three
# times, which is the exact collision this file exists to stop.
#
# `git rev-parse --git-common-dir` points at the ONE .git no matter which
# worktree asks. Its parent is the main worktree, and that is where .grimtoll
# lives. Everything else in this file reads $Store, so this is the only place
# that has to know.
# ---------------------------------------------------------------------------
function Get-StoreRoot {
  try {
    Push-Location $Root -ErrorAction Stop
    try   { $common = & git rev-parse --git-common-dir 2>$null }
    finally { Pop-Location }
    if ($LASTEXITCODE -eq 0 -and $common) {
      $common = $common.Trim()
      if (-not [System.IO.Path]::IsPathRooted($common)) { $common = Join-Path $Root $common }
      $common = (Resolve-Path -LiteralPath $common -ErrorAction Stop).Path
      return (Split-Path $common -Parent)
    }
  } catch { }
  return $Root          # not a git repo, or git is missing: behave as before
}

$StoreRoot = Get-StoreRoot
$Store     = Join-Path $StoreRoot '.grimtoll'
$ClaimDir  = Join-Path $Store 'claims'
$LockDir   = Join-Path $Store 'locks'

# Am I the main worktree, or a branch desk hanging off it? The lock only means
# anything in the main worktree: two worktrees cannot overwrite each other's
# files, so gating them would only reintroduce the queue branches removed.
function In-MainWorktree {
  try {
    $a = (Resolve-Path -LiteralPath $Root      -ErrorAction Stop).Path.TrimEnd('\', '/')
    $b = (Resolve-Path -LiteralPath $StoreRoot -ErrorAction Stop).Path.TrimEnd('\', '/')
    return ($a -eq $b)
  } catch { return $true }
}
$TtlHours  = 4          # a lock older than this is treated as abandoned
$MaxEntry  = 200        # ceiling so a stray "#404" in prose cannot move the floor
$MaxBuild  = 400

function Ensure-Store {
  if (-not (Test-Path $ClaimDir)) { New-Item -ItemType Directory -Path $ClaimDir -Force | Out-Null }
  if (-not (Test-Path $LockDir))  { New-Item -ItemType Directory -Path $LockDir  -Force | Out-Null }
}

# Who am I. Claude Code exports CLAUDE_CODE_SESSION_ID into every shell it runs,
# which is what makes "the other session" a question with an answer.
function Get-Me {
  if ($By) { return $By }
  foreach ($v in @('CLAUDE_CODE_SESSION_ID', 'CLAUDE_CODE_HOST_SESSION_ID')) {
    $val = [Environment]::GetEnvironmentVariable($v)
    if ($val) { return $val.Substring(0, [Math]::Min(8, $val.Length)) }
  }
  return ''   # empty means "a human at a terminal", which is never blocked
}

function Slugify([string] $p) {
  $s = $p -replace '^[\\/]+', '' -replace '[\\/:]+', '_'
  return ($s -replace '[^A-Za-z0-9._-]', '_')
}

# The whole race is decided here. CreateNew throws if the file already exists,
# and NTFS makes that check-and-create one indivisible operation, so two
# sessions asking for the same number at the same instant cannot both win.
function Try-Create([string] $path, [string] $body) {
  try {
    $fs = [System.IO.File]::Open($path, [System.IO.FileMode]::CreateNew,
                                 [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
  } catch {
    return $false
  }
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
    $fs.Write($bytes, 0, $bytes.Length)
  } finally {
    $fs.Close()
  }
  return $true
}

function New-Record([hashtable] $extra) {
  $rec = @{
    by    = (Get-Me)
    at    = (Get-Date).ToString('s')
    title = $Title
  }
  foreach ($k in $extra.Keys) { $rec[$k] = $extra[$k] }
  return ($rec | ConvertTo-Json -Compress)
}

function Read-Record([string] $path) {
  try { return (Get-Content $path -Raw -Encoding utf8 | ConvertFrom-Json) } catch { return $null }
}

function Age-Hours($rec) {
  if (-not $rec -or -not $rec.at) { return 999 }
  try { return [Math]::Round(((Get-Date) - [datetime] $rec.at).TotalHours, 1) } catch { return 999 }
}

# --- what numbers the repo has already spent -------------------------------
# The two kinds need different eyes.
#
#   8f.NNN  is unambiguous, so it is read from everywhere: docs, prototype,
#           tools, skills.
#   #NN     collides head-on with a three-digit CSS hex colour, and the
#           prototype is full of them. A first cut of this scan read "#373"
#           out of a stylesheet and issued it as a backlog number. So entry
#           numbers are read from PROSE and from shots\ only, with fenced and
#           inline code stripped first, and capped at a sane ceiling.
function Get-UsedNumbers {
  $entry = @{}
  $build = @{}

  $ScanRoots = @($Root)
  if (-not (In-MainWorktree)) { $ScanRoots += $StoreRoot }

  $prose = New-Object System.Collections.ArrayList   # entry numbers + build numbers
  $code  = New-Object System.Collections.ArrayList   # build numbers only
  foreach ($spec in @(
      @{ p = 'docs';           f = '*.md';   prose = $true },
      @{ p = 'content';        f = '*.md';   prose = $true },
      @{ p = 'prototype';      f = '*.html'; prose = $false },
      @{ p = 'tools';          f = '*.html'; prose = $false },
      @{ p = '.claude\skills'; f = '*.html'; prose = $false })) {
    # Both roots: a worktree's checkout is behind main by whatever main has
    # committed since it was branched, and shots\ is gitignored so it exists in
    # the main worktree only. Reading one of them would lower the floor. (#139)
    foreach ($r in $ScanRoots) {
      $dir = Join-Path $r $spec.p
      if (-not (Test-Path $dir)) { continue }
      foreach ($f in (Get-ChildItem $dir -Recurse -Filter $spec.f -File -ErrorAction SilentlyContinue)) {
        if ($spec.prose) { [void] $prose.Add($f) } else { [void] $code.Add($f) }
      }
    }
  }

  foreach ($f in $prose) {
    $txt = ''
    try { $txt = Get-Content $f.FullName -Raw -Encoding utf8 } catch { continue }
    foreach ($m in [regex]::Matches($txt, '8f\.(\d{1,3})')) {
      $n = [int] $m.Groups[1].Value
      if ($n -ge 1 -and $n -le $MaxBuild -and -not $build.ContainsKey($n)) { $build[$n] = $f.Name }
    }
    $bare = [regex]::Replace($txt, '(?s)```.*?```', ' ')
    $bare = [regex]::Replace($bare, '`[^`\r\n]*`', ' ')
    # "next free #92" is a POINTER, not a use. Old build-log rows are frozen by
    # the changelog's own rule, so every one of these left standing would burn a
    # real number for good. The pointers are what this script replaces anyway.
    $bare = [regex]::Replace($bare, '(?i)next\s+free(\s+number)?\s*(is|:)?\s*#?\d{1,3}', ' ')
    foreach ($m in [regex]::Matches($bare, '(?<![\w#])#(\d{1,3})(?!\d)')) {
      $n = [int] $m.Groups[1].Value
      if ($n -ge 1 -and $n -le $MaxEntry -and -not $entry.ContainsKey($n)) { $entry[$n] = $f.Name }
    }
  }

  foreach ($f in $code) {
    $txt = ''
    try { $txt = Get-Content $f.FullName -Raw -Encoding utf8 } catch { continue }
    foreach ($m in [regex]::Matches($txt, '8f\.(\d{1,3})')) {
      $n = [int] $m.Groups[1].Value
      if ($n -ge 1 -and $n -le $MaxBuild -and -not $build.ContainsKey($n)) { $build[$n] = $f.Name }
    }
  }

  # shots\NN_name.html - written before any document is, so it decides the floor
  foreach ($r in $ScanRoots) {
    $shots = Join-Path $r 'shots'
    if (-not (Test-Path $shots)) { continue }
    foreach ($f in (Get-ChildItem $shots -ErrorAction SilentlyContinue)) {
      $m = [regex]::Match($f.Name, '^(\d{1,3})[_.]')
      if ($m.Success) {
        $n = [int] $m.Groups[1].Value
        if ($n -ge 1 -and $n -le $MaxEntry -and -not $entry.ContainsKey($n)) { $entry[$n] = 'shots\' + $f.Name }
      }
    }
  }

  return @{ entry = $entry; build = $build }
}

function Claim-One([string] $kind, [hashtable] $used) {
  $floor = 1
  foreach ($n in $used.Keys) { if ($n -ge $floor) { $floor = $n + 1 } }

  for ($n = $floor; $n -lt ($floor + 50); $n++) {
    $path = Join-Path $ClaimDir ("{0}-{1}.claim" -f $kind, $n)
    $body = New-Record @{ kind = $kind; number = $n }
    if (Try-Create $path $body) { return $n }
  }
  throw "could not claim a $kind number: 50 consecutive candidates were already taken"
}

# --- verbs -----------------------------------------------------------------

function Verb-Number {
  Ensure-Store
  $used = Get-UsedNumbers
  $want = $Arg
  if (-not $want) { $want = 'both' }

  $out = @{}
  if ($want -eq 'entry' -or $want -eq 'both') {
    $out.entry = Claim-One 'entry' $used.entry
  }
  if ($want -eq 'build' -or $want -eq 'both') {
    $out.build = Claim-One 'build' $used.build
  }

  if ($Json) { ($out | ConvertTo-Json -Compress); return }

  Write-Host ""
  Write-Host "CLAIMED by session '$(Get-Me)'" -ForegroundColor Green
  if ($out.ContainsKey('entry')) { Write-Host ("  backlog entry   #{0}" -f $out.entry) }
  if ($out.ContainsKey('build')) { Write-Host ("  build log       8f.{0}" -f $out.build) }
  if ($Title) { Write-Host ("  for             {0}" -f $Title) }
  Write-Host ""
  Write-Host "These are yours from this second. Write them into the code, shots\ and the docs" -ForegroundColor DarkGray
  Write-Host "in any order you like: no other session can be issued them now." -ForegroundColor DarkGray
}

function Verb-Lock {
  Ensure-Store
  $target = $Arg
  if (-not $target) { $target = 'prototype\grimtoll_slice.html' }

  # A LOCK ON A SENTENCE PROTECTS NOTHING, AND IT LOOKS EXACTLY LIKE A LOCK.
  # Found live on 2026-08-13: a session ran `lock "the seven-item pack and the
  # opening chain"` - passing its TITLE where the path goes. The
  # lock file was written, `status` listed it, and the session believed it owned
  # the prototype. It did not: the hook matches on the file's leaf name, and no
  # edit anywhere was ever going to match that string. Use -t for the title.
  if (-not (Test-Path (Join-Path $Root $target)) -and -not (Test-Path $target)) {
    Write-Host ""
    Write-Host "THAT IS NOT A FILE IN THIS REPO: $target" -ForegroundColor Red
    Write-Host ""
    Write-Host "  A lock is on a PATH. A lock on a sentence is written, listed by" -ForegroundColor Yellow
    Write-Host "  'status', and protects nothing at all." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  What you probably meant:" -ForegroundColor DarkGray
    Write-Host ("    claim.ps1 lock -t `"{0}`"" -f $target) -ForegroundColor DarkGray
    Write-Host "  which takes the prototype and records that as what you are doing." -ForegroundColor DarkGray
    Write-Host ""
    exit 1
  }

  $path = Join-Path $LockDir ((Slugify $target) + '.lock')
  $me   = Get-Me

  $existing = $null
  if (Test-Path $path) { $existing = Read-Record $path }
  if ($existing) {
    $age = Age-Hours $existing
    if ($existing.by -eq $me) {
      Write-Host "you already hold $target (taken $age h ago)" -ForegroundColor DarkGray
      return
    }
    if ($age -lt $TtlHours -and -not $Steal) {
      Write-Host ""
      Write-Host "HELD BY ANOTHER SESSION: $target" -ForegroundColor Red
      Write-Host ("  holder  {0}" -f $existing.by)
      Write-Host ("  since   {0} ({1} h ago)" -f $existing.at, $age)
      if ($existing.title) { Write-Host ("  doing   {0}" -f $existing.title) }
      Write-Host ""
      Write-Host "Work on something else, or take it over with -Steal if that session is gone." -ForegroundColor Yellow
      exit 1
    }
    Remove-Item $path -Force
    if ($Steal) { Write-Host "took it over from $($existing.by)" -ForegroundColor Yellow }
    else { Write-Host "the previous lock expired ($age h old), taking it" -ForegroundColor Yellow }
  }

  if (-not (Try-Create $path (New-Record @{ path = $target }))) {
    Write-Host "lost the race for $target, another session took it a moment ago" -ForegroundColor Red
    exit 1
  }
  Write-Host "you own $target" -ForegroundColor Green
}

function Verb-Release {
  Ensure-Store
  $me = Get-Me
  $n  = 0

  foreach ($f in (Get-ChildItem $LockDir -Filter *.lock -File -ErrorAction SilentlyContinue)) {
    $rec = Read-Record $f.FullName
    if ($rec -and $rec.by -eq $me) {
      if ($Arg -and $Arg -ne 'all' -and $rec.path -notlike "*$Arg*") { continue }
      Remove-Item $f.FullName -Force; $n++
      Write-Host "released lock on $($rec.path)"
    }
  }

  $num = -1
  if ($Arg -match '^#?(\d{1,3})$') { $num = [int] $matches[1] }
  if ($num -ge 0 -or $Arg -eq 'all') {
    foreach ($f in (Get-ChildItem $ClaimDir -Filter *.claim -File -ErrorAction SilentlyContinue)) {
      $rec = Read-Record $f.FullName
      if (-not $rec -or $rec.by -ne $me) { continue }
      if ($num -ge 0 -and [int] $rec.number -ne $num) { continue }
      Remove-Item $f.FullName -Force; $n++
      Write-Host "released $($rec.kind) number $($rec.number)"
    }
  }

  if ($n -eq 0) { Write-Host "nothing of yours to release" -ForegroundColor DarkGray }
}

function Verb-Status {
  Ensure-Store
  $me = Get-Me
  Write-Host ""
  Write-Host "this session: '$me'" -ForegroundColor Cyan

  $locks = @(Get-ChildItem $LockDir -Filter *.lock -File -ErrorAction SilentlyContinue)
  Write-Host ""
  Write-Host "LOCKS" -ForegroundColor Cyan
  if ($locks.Count -eq 0) { Write-Host "  (none: nobody owns the prototype right now)" -ForegroundColor DarkGray }
  foreach ($f in $locks) {
    $rec  = Read-Record $f.FullName
    $age  = Age-Hours $rec
    $mine = ''
    if ($rec.by -eq $me) { $mine = '  <- yours' }
    $stale = ''
    if ($age -ge $TtlHours) { $stale = '  (expired)' }
    Write-Host ("  {0}  by {1}, {2} h ago{3}{4}" -f $rec.path, $rec.by, $age, $mine, $stale)
  }

  $claims = @(Get-ChildItem $ClaimDir -Filter *.claim -File -ErrorAction SilentlyContinue)
  Write-Host ""
  Write-Host "NUMBERS HELD" -ForegroundColor Cyan
  if ($claims.Count -eq 0) { Write-Host "  (none)" -ForegroundColor DarkGray }
  foreach ($f in ($claims | Sort-Object Name)) {
    $rec  = Read-Record $f.FullName
    $mine = ''
    if ($rec.by -eq $me) { $mine = '  <- yours' }
    $label = ("#{0}" -f $rec.number)
    if ($rec.kind -eq 'build') { $label = ("8f.{0}" -f $rec.number) }
    Write-Host ("  {0}  by {1}  {2}{3}" -f $label, $rec.by, $rec.title, $mine)
  }
  Write-Host ""
}

# Check only, take nothing. This is what the build scripts call before they
# rewrite the prototype wholesale, so a rebuild cannot land on top of somebody
# else's half-finished edit.
function Verb-Gate {
  $target = $Arg
  if (-not $target) { $target = 'prototype\grimtoll_slice.html' }
  # A branch desk edits its OWN checkout. Nothing it rebuilds can reach another
  # session's file, so there is nothing to gate. (#139)
  if (-not (In-MainWorktree)) { exit 0 }
  if (-not (Test-Path $LockDir)) { exit 0 }
  $path = Join-Path $LockDir ((Slugify $target) + '.lock')
  if (-not (Test-Path $path)) { exit 0 }
  $rec = Read-Record $path
  if (-not $rec) { exit 0 }
  if ($rec.by -eq (Get-Me)) { exit 0 }
  if ((Age-Hours $rec) -ge $TtlHours) { exit 0 }

  Write-Host ""
  Write-Host ("ANOTHER SESSION OWNS {0}" -f $target) -ForegroundColor Red
  Write-Host ("  holder  {0}, since {1}" -f $rec.by, $rec.at)
  if ($rec.title) { Write-Host ("  doing   {0}" -f $rec.title) }
  Write-Host ""
  Write-Host "Rebuilding now would overwrite work that is still in progress." -ForegroundColor Yellow
  Write-Host "Wait for it, or take it over with: tools\claim.ps1 lock -Steal" -ForegroundColor DarkGray
  exit 1
}

# Backstop. A session that skipped the tool still gets caught here, because the
# number it invented shows up as an ADDED line in the diff while somebody else
# holds the claim on it.
function Verb-Verify {
  Ensure-Store
  $me = Get-Me

  $held = @{}
  foreach ($f in (Get-ChildItem $ClaimDir -Filter *.claim -File -ErrorAction SilentlyContinue)) {
    $rec = Read-Record $f.FullName
    if ($rec -and $rec.by -and $rec.by -ne $me) {
      $held[("{0}-{1}" -f $rec.kind, $rec.number)] = $rec
    }
  }
  if ($held.Count -eq 0) { if (-not $Json) { Write-Host "clear: no other session is holding a number" -ForegroundColor Green }; return }

  Push-Location $Root
  try {
    if ($Arg -eq 'staged') { $diff = & git diff --cached -U0 2>$null }
    else { $diff = & git diff HEAD -U0 2>$null }
  } finally { Pop-Location }

  $added = @()
  foreach ($line in $diff) {
    if ($line -like '+*' -and $line -notlike '+++*') { $added += $line }
  }
  if ($added.Count -eq 0) { Write-Host "clear: nothing added" -ForegroundColor Green; return }
  $text = ($added -join "`n")

  $bad = @()
  # ⚠ A CSS HEX COLOUR IS NOT AN ENTRY NUMBER, AND THIS SCAN DID NOT KNOW IT.
  # A six-digit colour whose first three characters are digits and whose
  # fourth is a letter matches the pattern below: the (?!\d) guard sees the
  # letter and passes happily, so the leading three digits are read as a
  # backlog reference. Get-UsedNumbers was hardened against exactly this trap
  # when it read a stylesheet value and issued it as a backlog number (see the
  # note above it), but the hardening never reached the pre-commit side, so the
  # trap survived here and refused an honest commit whose only crime was a
  # background colour on a new panel.
  # ⚑ THE LESSON IS THE ONE PARALLEL_SESSIONS.md ALREADY TELLS ABOUT NUMBERS:
  # one fact, two readers, and only one of them was taught. When a rule gets a
  # second implementation, fix both or the old bug is still shipping.
  # Six and eight digit colours go before the entry scan; a bare three-digit
  # shorthand (#131 as a colour) stays ambiguous on purpose, because it is
  # genuinely indistinguishable from a reference and is vanishingly rare.
  $scan = [regex]::Replace($text, '#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?\b', '')
  foreach ($m in [regex]::Matches($scan, '(?<![\w#])#(\d{1,3})(?!\d)')) {
    $k = "entry-" + $m.Groups[1].Value
    if ($held.ContainsKey($k)) { $bad += ("#{0} is held by session {1} ({2})" -f $m.Groups[1].Value, $held[$k].by, $held[$k].title) }
  }
  foreach ($m in [regex]::Matches($text, '8f\.(\d{1,3})')) {
    $k = "build-" + $m.Groups[1].Value
    if ($held.ContainsKey($k)) { $bad += ("8f.{0} is held by session {1} ({2})" -f $m.Groups[1].Value, $held[$k].by, $held[$k].title) }
  }
  $bad = $bad | Select-Object -Unique

  if ($bad.Count -eq 0) { Write-Host "clear: this change uses no number another session holds" -ForegroundColor Green; return }

  Write-Host ""
  Write-Host "COLLISION" -ForegroundColor Red
  foreach ($b in $bad) { Write-Host "  $b" }
  Write-Host ""
  Write-Host "Take your own with:  powershell -NoProfile -File tools\claim.ps1 number" -ForegroundColor Yellow
  Write-Host "If the number really is yours:  tools\claim.ps1 release <NN>" -ForegroundColor DarkGray
  exit 1
}

# Claude Code PreToolUse gate. Exit 2 blocks the tool call and hands stderr back
# to the model, which is the version-stable contract, so no JSON schema to drift.
function Verb-Hook {
  $raw = ''
  try { $raw = [Console]::In.ReadToEnd() } catch { exit 0 }
  if (-not $raw) { exit 0 }
  try { $inp = $raw | ConvertFrom-Json } catch { exit 0 }

  $tool = $inp.tool_name
  if ($tool -ne 'Write' -and $tool -ne 'Edit' -and $tool -ne 'NotebookEdit') { exit 0 }
  $file = $inp.tool_input.file_path
  if (-not $file) { exit 0 }

  $me = $inp.session_id
  if ($me) { $me = $me.Substring(0, [Math]::Min(8, $me.Length)) }

  # In a branch desk this hook is off. That is the whole point of #139: the
  # lock was a queue, and a worktree is isolation, so the queue is not needed.
  # In the MAIN worktree it still fires, because two sessions sharing one
  # directory still overwrite each other.
  if (-not (In-MainWorktree)) { exit 0 }

  if (-not (Test-Path $LockDir)) { exit 0 }
  foreach ($f in (Get-ChildItem $LockDir -Filter *.lock -File -ErrorAction SilentlyContinue)) {
    $rec = Read-Record $f.FullName
    if (-not $rec -or -not $rec.path) { continue }
    if ($rec.by -eq $me) { continue }
    if ((Age-Hours $rec) -ge $TtlHours) { continue }

    $leaf = Split-Path $rec.path -Leaf
    if ($file -like ("*" + $leaf)) {
      [Console]::Error.WriteLine("BLOCKED: another Claude session (" + $rec.by + ") owns " + $rec.path + " since " + $rec.at + ".")
      if ($rec.title) { [Console]::Error.WriteLine("It is doing: " + $rec.title) }
      [Console]::Error.WriteLine("Do not edit this file. Work on docs or analysis instead, or ask the user whether that session is finished.")
      [Console]::Error.WriteLine("If it is gone: powershell -NoProfile -File tools\claim.ps1 lock -Steal")
      exit 2
    }
  }
  exit 0
}

switch ($Verb) {
  'number'  { Verb-Number }
  'lock'    { Verb-Lock }
  'release' { Verb-Release }
  'status'  { Verb-Status }
  'verify'  { Verb-Verify }
  'gate'    { Verb-Gate }
  'hook'    { Verb-Hook }
}
