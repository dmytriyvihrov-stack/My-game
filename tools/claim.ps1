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
# A CLAIM IS ALSO GIVEN BACK BY ITSELF. `number`, `status` and `verify` drop
# any claim whose number is in main's committed record, because a number that
# is written down is one the repo scan already defends and no claim can add to.
# Nobody ever ran `release` and the tool has stopped needing them to. (#144)
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
# GIT SPEAKS UTF-8 AND POWERSHELL DECODES IT WITH THE CONSOLE CODEPAGE, AND
# THIS REPO'S PATH IS CYRILLIC. (#144)
#
# Found by watching a commit from a desk print "clear: no other session is
# holding a number" while twelve claims sat in the store. `.git/hooks/pre-commit`
# is a SHELL script, so this file runs under sh, where the console is cp866
# rather than whatever an interactive PowerShell happens to be. git hands back
# "C:/Users/USER/Google <Cyrillic>/..." as UTF-8 bytes, cp866 turns them into a
# path that does not exist, Resolve-Path throws, and the catch below quietly
# answered $Root.
#
# So the store became the worktree's own empty .grimtoll: every desk got a
# private claim directory, `verify` found nothing in it, and THE PRE-COMMIT
# BACKSTOP HAS BEEN OFF IN EVERY DESK SINCE #139 while printing the word
# "clear" each time. #139's whole load-bearing idea is that the store is shared;
# this is that idea failing in the one place nobody watches, for a reason that
# has nothing to do with git.
#
# Two fixes, and the second matters as much as the first. Read git's answer as
# UTF-8. And NEVER FALL BACK SILENTLY: a fallback that cannot be distinguished
# from success is what let a decoding bug wear the word "clear" for days.
function Get-StoreRoot {
  try { Push-Location $Root -ErrorAction Stop } catch { return $Root }

  $common = ''
  $enc    = $null
  try { $enc = [Console]::OutputEncoding } catch { }
  try {
    try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch { }
    # No 2>$null: under $ErrorActionPreference='Stop', REDIRECTING a native
    # command's stderr is itself what turns a harmless warning into a
    # terminating NativeCommandError. Unredirected stderr is inert.
    $common = & git rev-parse --git-common-dir
  } catch {
    $common = ''
  } finally {
    if ($enc) { try { [Console]::OutputEncoding = $enc } catch { } }
    Pop-Location
  }

  # No git, or not a repo. This is the honest fallback and it stays quiet.
  if ($LASTEXITCODE -ne 0 -or -not $common) { return $Root }

  $common = $common.Trim()
  if (-not [System.IO.Path]::IsPathRooted($common)) { $common = Join-Path $Root $common }
  try {
    $common = (Resolve-Path -LiteralPath $common -ErrorAction Stop).Path
  } catch {
    # Git answered and the answer did not survive the trip. That is a bug in
    # here, not a machine without git, and it must never look like success.
    [Console]::Error.WriteLine("claim.ps1: git named a common dir that will not resolve:")
    [Console]::Error.WriteLine("  " + $common)
    [Console]::Error.WriteLine("claim.ps1: FALLING BACK TO A PRIVATE STORE. Numbers are not shared and")
    [Console]::Error.WriteLine("           the pre-commit guard is off. Fix this before trusting either.")
    return $Root
  }
  return (Split-Path $common -Parent)
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
$MaxEntry  = 300        # ceiling so a stray "#404" in prose cannot move the floor.
                        # was 200; raised 2026-08-20 after #211/#213 landed on main
                        # and this ceiling made both invisible to the scan, so
                        # `number entry` handed #211 out a second time. See #211's
                        # commit for the entry that walked into it.
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
#
# ---------------------------------------------------------------------------
# ONE PARSER, THREE CORPORA. (#144)
#
# "Which numbers does this text spend" is asked in three places now - the repo
# scan below, the shipped-record scan under it, and the pre-commit diff scan at
# the bottom of this file - and it was answered by three hand-written copies of
# the same regexes. Verb-Verify's own comment already names that as the bug it
# was shipped with: the colour guard was written there and never reached the
# repo scan, so each reader knew a trap the other did not. The rules live here
# and only here. Add a defence and all three get it.
#
# The colour guard, the pointer guard and the ceiling apply to every corpus.
# -Markdown adds the two that need a WHOLE DOCUMENT to be meaningful, and the
# switch exists because a git diff is the one corpus that is not one: its
# fences arrive as loose halves, so pairing them there could strip a real
# reference out of the backstop's own eyes. It is a fact about the corpus, not
# a preference, which is why it is named rather than left to drift.
# ---------------------------------------------------------------------------
function Add-BuildNumbers([string] $txt, [hashtable] $build, [string] $src) {
  foreach ($m in [regex]::Matches($txt, '8f\.(\d{1,3})')) {
    $n = [int] $m.Groups[1].Value
    if ($n -ge 1 -and $n -le $MaxBuild -and -not $build.ContainsKey($n)) { $build[$n] = $src }
  }
}

function Add-EntryNumbers([string] $txt, [hashtable] $entry, [string] $src, [switch] $Markdown) {
  $bare = $txt
  if ($Markdown) {
    $bare = [regex]::Replace($bare, '(?s)```.*?```', ' ')
    $bare = [regex]::Replace($bare, '`[^`\r\n]*`', ' ')
  }
  # A six or eight digit colour whose fourth character is a letter satisfies
  # the (?!\d) guard below, so its leading three digits read as a reference.
  $bare = [regex]::Replace($bare, '#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?\b', ' ')
  # "next free #92" is a POINTER, not a use. Old build-log rows are frozen by
  # the changelog's own rule, so every one of these left standing would burn a
  # real number for good. The pointers are what this script replaces anyway.
  $bare = [regex]::Replace($bare, '(?i)next\s+free(\s+number)?\s*(is|:)?\s*#?\d{1,3}', ' ')
  foreach ($m in [regex]::Matches($bare, '(?<![\w#])#(\d{1,3})(?!\d)')) {
    $n = [int] $m.Groups[1].Value
    if ($n -ge 1 -and $n -le $MaxEntry -and -not $entry.ContainsKey($n)) { $entry[$n] = $src }
  }
}

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
    Add-BuildNumbers $txt $build $f.Name
    Add-EntryNumbers $txt $entry $f.Name -Markdown
  }

  foreach ($f in $code) {
    $txt = ''
    try { $txt = Get-Content $f.FullName -Raw -Encoding utf8 } catch { continue }
    Add-BuildNumbers $txt $build $f.Name
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

# ---------------------------------------------------------------------------
# A SPENT CLAIM PROTECTS NOTHING, AND IT BLOCKS SENTENCES. (#144)
#
# Nobody ever runs `release` after shipping, and the tool spent months quietly
# treating that as a discipline problem. It is not one. On 2026-08-13 a session
# was refused its own #143 commit because the CHANGELOG row it was adding
# mentioned #141 and 8f.169 - work another session had shipped hours earlier
# and left claimed. The commit was not a collision. It was a CITATION, which is
# what a changelog row is made of.
#
# WHY IT IS SAFE TO DROP IT, AND THE ARGUMENT IS ARITHMETIC RATHER THAN TASTE.
# Claim-One takes its floor from the REPO, not from the claims. So the instant
# a number is written into the record, the floor is above it and no session can
# ever be issued it again - with or without the claim file. From that moment
# the claim is not holding a seat, it is holding a word, and the only thing it
# can still do is refuse somebody else's honest sentence.
#
# THE TWO SCANS WANT OPPOSITE CONSERVATISM, WHICH IS WHY THIS IS NOT THE ONE
# ABOVE. Get-UsedNumbers answers "what may I not be ISSUED", so it casts the
# widest net it can - every root, prose and code and shots\ - because a number
# it misses is a collision. This one answers "what has definitely SHIPPED", so
# it takes the narrowest and most authoritative source there is, because a
# number it wrongly counts is somebody's live seat thrown away. Widest and
# narrowest are both the careful direction; they are just careful about
# opposite things. Do not "simplify" these into one scan.
#
# AND IT READS COMMITTED main, NEVER THE WORKING TREE, WHICH IS THE WHOLE
# DIFFERENCE BETWEEN A FIX AND A HOLE. A working tree is something the session
# being guarded can write to. Session Y hand-writes a #NN it never claimed -
# the sixth collision, 2026-08-11, and the first caused by a document - a
# working-tree scan sees Y's own uncommitted line, drops the real holder's
# claim, and then waves through the exact commit pre-commit exists to refuse.
# Committed main is the one piece of evidence a session cannot manufacture for
# itself. main and not HEAD, because main is the only ref every desk and the
# main folder agree on: #139's lesson is that the store is shared, and the
# evidence about the store has to be shared too.
#
# So the proof the sweep is safe runs: a correctly issued claim's number was
# NOT in the record when it was issued (the floor was above everything there);
# nobody writes down a number they were not issued, and if they try, this scan
# cannot see their uncommitted line so verify still refuses them; therefore a
# claimed number appearing in main's committed record means the work that held
# it shipped.
#
# The four files are the four writes named in SHIPPED.md's own header, which is
# what "shipped" means in this repo. A number in shots\ or in the prototype but
# not in these is work in flight, and its claim is meant to survive.
# ---------------------------------------------------------------------------
$ShipRecord = @(
  'docs/CHANGELOG.md',
  'docs/SHIPPED.md',
  'docs/WHAT_TO_TEST.md',
  'docs/00_PLAN_AND_BACKLOG.md'
)

function Get-ShippedNumbers([string] $Ref = 'main') {
  $entry = @{}
  $build = @{}
  $read  = 0
  $enc   = $null
  try { $enc = [Console]::OutputEncoding } catch { }

  Push-Location $Root
  try {
    # Ask which of them main actually carries FIRST. `git show` on a missing
    # path writes to stderr, and under $ErrorActionPreference='Stop' that is a
    # terminating NativeCommandError, so the cheap listing keeps the reads
    # quiet instead of turning a renamed doc into a thrown exception.
    # UTF-8 before the first git call, not after: see Get-StoreRoot for what a
    # console codepage does to this repo's paths.
    try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch { }

    $have = @()
    try { $have = @(& git ls-tree -r --name-only $Ref -- docs) } catch { $have = @() }
    if ($have.Count -eq 0) { return $null }

    foreach ($f in $ShipRecord) {
      if ($have -notcontains $f) { continue }
      $txt = ''
      try { $txt = ((& git show ($Ref + ":" + $f)) -join "`n") } catch { continue }
      if (-not $txt) { continue }
      Add-BuildNumbers $txt $build $f
      Add-EntryNumbers $txt $entry $f -Markdown
      $read++
    }
  } catch {
    return $null
  } finally {
    if ($enc) { try { [Console]::OutputEncoding = $enc } catch { } }
    Pop-Location
  }

  # No git, no main, no record on it: say nothing rather than guess, and the
  # sweep becomes a no-op. Every failure here has to leave claims standing.
  if ($read -eq 0) { return $null }
  return @{ entry = $entry; build = $build }
}

# Drops every claim, anybody's, whose number is in MAIN's record - and only
# main's, which is why the sweep keeps the default $Ref. A number written into a
# DESK's record is not defended by the repo scan yet, so its claim has to stand.
# Verb-Verify reads the same parser at HEAD for a different question; see there.
# Returns what
# it took so the caller can say so: a claim vanishing silently is how a session
# would come to distrust the one file it has to trust.
function Sweep-SpentClaims {
  if (-not (Test-Path $ClaimDir)) { return @() }
  $claims = @(Get-ChildItem $ClaimDir -Filter *.claim -File -ErrorAction SilentlyContinue)
  if ($claims.Count -eq 0) { return @() }

  $ship = Get-ShippedNumbers
  if (-not $ship) { return @() }

  $gone = @()
  foreach ($f in $claims) {
    $rec = Read-Record $f.FullName
    if (-not $rec -or -not $rec.kind) { continue }
    $n = -1
    try { $n = [int] $rec.number } catch { continue }
    if ($n -lt 0) { continue }

    $tbl = $null
    if     ($rec.kind -eq 'entry') { $tbl = $ship.entry }
    elseif ($rec.kind -eq 'build') { $tbl = $ship.build }
    if (-not $tbl -or -not $tbl.ContainsKey($n)) { continue }

    try { Remove-Item $f.FullName -Force } catch { continue }
    $label = ("#{0}" -f $n)
    if ($rec.kind -eq 'build') { $label = ("8f.{0}" -f $n) }
    $gone += ("{0}  held by {1}, and in {2} on main" -f $label, $rec.by, $tbl[$n])
  }
  return $gone
}

function Show-Swept($gone) {
  if (-not $gone -or @($gone).Count -eq 0) { return }
  Write-Host ""
  Write-Host ("swept {0} spent claim(s) - shipped, so the repo scan defends them now" -f @($gone).Count) -ForegroundColor DarkGray
  foreach ($g in $gone) { Write-Host ("  {0}" -f $g) -ForegroundColor DarkGray }
}

# --- verbs -----------------------------------------------------------------

function Verb-Number {
  Ensure-Store
  $swept = Sweep-SpentClaims
  if (-not $Json) { Show-Swept $swept }
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
  # Sweeping here is what puts the meaning back into NUMBERS HELD. Left
  # unswept it fills with shipped work and stops answering the only question
  # anybody reads it for: is somebody mid-batch, or is this desk free.
  Show-Swept (Sweep-SpentClaims)
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

  # SPENT CLAIMS GO FIRST, AND THAT IS THE WHOLE OF #144 ON THIS SIDE. What
  # this scan can see is an ADDED LINE MENTIONING A NUMBER, and it cannot tell
  # a spend from a citation - a changelog row is made of citations. So the
  # difference has to be made before the diff is ever read, by asking whether
  # the number has shipped. Sweeping here rather than adding a second "but is
  # it spent" test below is deliberate: this file has already paid once for
  # answering one question in two places.
  $swept = Sweep-SpentClaims
  if (-not $Json) { Show-Swept $swept }

  $held = @{}
  foreach ($f in (Get-ChildItem $ClaimDir -Filter *.claim -File -ErrorAction SilentlyContinue)) {
    $rec = Read-Record $f.FullName
    if ($rec -and $rec.by -and $rec.by -ne $me) {
      $held[("{0}-{1}" -f $rec.kind, $rec.number)] = $rec
    }
  }
  # ---------------------------------------------------------------------------
  # #217: A NUMBER THIS BRANCH ALREADY CARRIES IS ONE AN EARLIER COMMIT SPENT.
  #
  # This scan cannot tell a number being SPENT from a number being CITED, and
  # for as long as every desk branched off main that did not matter: main's
  # numbers are swept, so the only held numbers a diff could name were another
  # desk's, and naming one was the mistake worth refusing.
  #
  # #217 was stacked on work/mirror-battle at the user's call, because it
  # extends #215's BEAST_KIND rather than duplicating it. Its changelog entry
  # and its code comments therefore cite #215 and 8f.238 several times each -
  # they have to, the entry is unreadable without saying what #215 did and did
  # not do - and both claims are still held, because a claim only sweeps itself
  # once it is on MAIN and #215 is on a desk. So the guard refused an honest
  # commit whose only crime was quoting its own parent.
  #
  # THE TEST IS THE SAME ONE THE MERGE SKIP ABOVE MAKES, ASKED OF ONE NUMBER
  # INSTEAD OF THE WHOLE COMMIT: is this number already in the committed record
  # on this branch? If it is, an ancestor commit spent it and this one is only
  # referring to it. A merge is that answer for every number at once.
  #
  # ---------------------------------------------------------------------------
  # THE CLAIM IS NOT DROPPED, AND THAT IS THE HALF THAT MATTERS. Sweep-
  # SpentClaims deletes a claim file once the number is on main and the repo
  # scan defends it; here it is NOT on main, so another session must still be
  # refused that number. This filter reaches only this one verify, so the guard
  # goes on protecting the thing it was built for - a session inventing a number
  # - and stops refusing a branch for quoting the branch under it.
  #
  # It is also the one PARALLEL_SESSIONS.md rule about numbers, once more: one
  # fact, two readers. The branch record is read by the SAME parser as main's,
  # with the ref passed in, so a guard added to Add-EntryNumbers cannot reach
  # one and miss the other.
  #
  # Fails CLOSED: any trouble reading HEAD leaves $branch null and every held
  # number standing, which is the strict answer and the safe one.
  # ---------------------------------------------------------------------------
  if ($held.Count -gt 0) {
    $branch = $null
    try { $branch = Get-ShippedNumbers 'HEAD' } catch { $branch = $null }
    if ($branch) {
      $ancestral = @()
      foreach ($k in @($held.Keys)) {
        $rec = $held[$k]
        $n = -1
        try { $n = [int] $rec.number } catch { continue }
        $tbl = $null
        if     ($rec.kind -eq 'entry') { $tbl = $branch.entry }
        elseif ($rec.kind -eq 'build') { $tbl = $branch.build }
        if (-not $tbl -or -not $tbl.ContainsKey($n)) { continue }
        $label = ("#{0}" -f $n)
        if ($rec.kind -eq 'build') { $label = ("8f.{0}" -f $n) }
        $ancestral += ("{0}  held by {1}, and already in {2} on this branch" -f $label, $rec.by, $tbl[$n])
        $held.Remove($k)
      }
      if (@($ancestral).Count -gt 0 -and -not $Json) {
        Write-Host ""
        Write-Host ("citing {0} number(s) this branch already carries - not spent here, so not refused" -f @($ancestral).Count) -ForegroundColor DarkGray
        foreach ($a in $ancestral) { Write-Host ("  {0}" -f $a) -ForegroundColor DarkGray }
      }
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

  # A CSS HEX COLOUR IS NOT AN ENTRY NUMBER, AND THIS SCAN DID NOT KNOW IT.
  # A six-digit colour whose first three characters are digits and whose
  # fourth is a letter matches the entry pattern: the (?!\d) guard sees the
  # letter and passes happily, so the leading three digits are read as a
  # backlog reference. Get-UsedNumbers was hardened against exactly this trap
  # when it read a stylesheet value and issued it as a backlog number, but the
  # hardening never reached the pre-commit side, so the trap survived here and
  # refused an honest commit whose only crime was a background colour on a new
  # panel.
  # THE LESSON IS THE ONE PARALLEL_SESSIONS.md ALREADY TELLS ABOUT NUMBERS:
  # one fact, two readers, and only one of them was taught. That is why the
  # regexes are no longer written here at all - this call and the repo scan and
  # the shipped scan are the same parser now, and a guard added to it cannot
  # reach two of the three and miss the third. A bare three-digit shorthand
  # (#131 as a colour) stays ambiguous on purpose, because it is genuinely
  # indistinguishable from a reference and is vanishingly rare.
  # No -Markdown: a diff's fences arrive as loose halves. See the parser.
  $de = @{}
  $db = @{}
  Add-EntryNumbers $text $de '(this change)'
  Add-BuildNumbers $text $db '(this change)'

  $bad = @()
  foreach ($n in ($de.Keys | Sort-Object)) {
    $k = "entry-$n"
    if ($held.ContainsKey($k)) { $bad += ("#{0} is held by session {1} ({2})" -f $n, $held[$k].by, $held[$k].title) }
  }
  foreach ($n in ($db.Keys | Sort-Object)) {
    $k = "build-$n"
    if ($held.ContainsKey($k)) { $bad += ("8f.{0} is held by session {1} ({2})" -f $n, $held[$k].by, $held[$k].title) }
  }
  $bad = @($bad)

  if ($bad.Count -eq 0) { Write-Host "clear: this change uses no number another session holds" -ForegroundColor Green; return }

  Write-Host ""
  Write-Host "COLLISION" -ForegroundColor Red
  foreach ($b in $bad) { Write-Host "  $b" }
  Write-Host ""
  Write-Host "Take your own with:  powershell -NoProfile -File tools\claim.ps1 number" -ForegroundColor Yellow
  Write-Host "If the number really is yours:  tools\claim.ps1 release <NN>" -ForegroundColor DarkGray
  Write-Host "A number listed here has NOT shipped: a shipped one clears itself." -ForegroundColor DarkGray
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
  #
  # WHICH WORKTREE IS DECIDED BY THE FILE BEING EDITED, NOT BY WHERE THIS
  # SCRIPT LIVES. (#141, and it is #139's own lesson landing on #139.) Claude
  # Code runs a PreToolUse hook out of $CLAUDE_PROJECT_DIR, so the MAIN
  # folder's copy of this file executes for every session on the machine,
  # including the ones standing in a desk. $Root is therefore always the main
  # worktree, In-MainWorktree() always answered "yes", and the desk exemption
  # written directly above it never fired once: a desk was still queued behind
  # the main lock while both PARALLEL_SESSIONS.md and this comment said it was
  # not. The path in the call is the only thing here that knows where the
  # session is actually standing.
  $inMain = $true
  try {
    $full = [System.IO.Path]::GetFullPath($file).TrimEnd('\', '/')
    $main = (Resolve-Path -LiteralPath $StoreRoot -ErrorAction Stop).Path.TrimEnd('\', '/')
    $inMain = $full.StartsWith($main + [System.IO.Path]::DirectorySeparatorChar,
                               [StringComparison]::OrdinalIgnoreCase)
  } catch { $inMain = $true }     # cannot tell where it is: gate, as before
  if (-not $inMain) { exit 0 }

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
