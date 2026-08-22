# Builds the PUBLISHABLE site from the prototype: one self-contained index.html
# at the repo root, plus the icon set beside it.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\build_site.ps1
#   ... -Player                 the PLAYTESTER build: developer tools unreachable
#   ... -Out play\index.html    write somewhere other than the root index.html
#
# WHY THIS EXISTS: `prototype/grimtoll_slice.html` is the working file and its
# AUDIO_EMBED table is deliberately EMPTY there, because at this desk the game
# reads the 44.1k WAV masters out of `../audio/`. A static host has no such
# folder, and the documented consequence was a build that played perfectly here
# and was completely silent for every playtester. So the thing that gets hosted
# is not the working file: it is the working file with the compressed pack
# poured into it, built here, and never hand-edited.
#
# THE PLAYER BUILD (#202, 2026-08-19). The user: "prepare build and deploy in
# safe folder/place for my buddy platester - actual build without dev.mode".
# Dev mode is the dim cog in the corner (#testBtn) that flips TEST.on, and
# TEST.on is the one gate in front of WIN NOW, LINT, WIPE HISTORY, the TEXT
# editor, AUTO and the playtest-notes menu row. -Player therefore does exactly
# two things to the page and asserts both landed: TEST is declared `on:false`
# (it no longer reads `gt_test` out of localStorage) and the cog's <button> is
# deleted from the markup, so there is no element to press and nothing to
# unhide. Every handler behind it is already null-guarded (`if(tb){...}`,
# `syncTest` returns on a missing button), which is why the deletion is safe
# and is checked by loading the page, not by reading this comment. A marker
# (/*__PLAYER_BUILD__*/) is left in the file so deploy.ps1 can tell the two
# builds apart by reading what shipped.
#
# The prototype is READ, never written. Run audio\build_audio.ps1 first (it
# writes audio\out\audio_data.js); this script only pours and copies.
#
# ---------------------------------------------------------------------------
# KEEP THIS FILE PURE ASCII. PowerShell 5.1 reads a .ps1 as ANSI and the repo
# path contains Cyrillic ("Google <disk>"): a literal non-ASCII character here
# comes back as mojibake at runtime. Every path derives from $PSScriptRoot.
# Same trap already bit tools\serve.ps1 and audio\build_audio.ps1.
# ---------------------------------------------------------------------------
param(
  [switch] $Player,
  [string] $Out = ''
)
$ErrorActionPreference = 'Stop'
$root  = Split-Path -Parent $PSScriptRoot
$src   = Join-Path $root 'prototype\grimtoll_slice.html'
$data  = Join-Path $root 'audio\out\audio_data.js'
if (-not $Out) { $Out = 'index.html' }
$out   = if ([System.IO.Path]::IsPathRooted($Out)) { $Out } else { Join-Path $root $Out }
$outDir = Split-Path -Parent $out
if (-not (Test-Path -LiteralPath $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

if (-not (Test-Path -LiteralPath $src))  { throw "prototype not found: $src" }

$html = Get-Content $src -Raw -Encoding utf8

# ---- pour the audio in -----------------------------------------------------
# Idempotent and identical in shape to art\inject.ps1 and audio\build_audio.ps1,
# so there is one habit to remember rather than three.
$s = '/*__AUDIO_DATA__*/'
$e = '/*__END_AUDIO_DATA__*/'
if (Test-Path -LiteralPath $data) {
  $blk = Get-Content $data -Raw -Encoding utf8
  if ($html -notmatch [regex]::Escape($s)) { throw "marker $s not found in the prototype" }
  $pat  = [regex]::Escape($s) + '[\s\S]*?' + [regex]::Escape($e)
  $html = [regex]::Replace($html, $pat, { param($m) $blk })
  $cues = ([regex]::Matches($blk, 'data:audio/')).Count
  "audio  : $cues cues poured in"
} else {
  # LOUD, not silent. A hosted build with no sound is the exact bug this script
  # was written to stop, and it looks like nothing at all from the game's side.
  Write-Warning "audio\out\audio_data.js is MISSING - the site will be SILENT."
  Write-Warning "Run: powershell -NoProfile -ExecutionPolicy Bypass -File audio\build_audio.ps1"
}

# ---- pour the ART back in --------------------------------------------------
# #235. The working file stopped carrying 26.8 MB of base64 (88% of it) and
# loads art\embed\art_data.js and art\embed\j_pack.js with two script tags
# instead. THE PAGE THAT SHIPS IS STILL ONE SELF-CONTAINED FILE: GitHub Pages
# serves index.html on its own, the itch upload is a zip with index.html at its
# root and nothing beside it, and a playtester saving the page has to get the
# art with it. So each tag is swapped here for an inline copy of the file.
#
# ⛔ THE TAG IS FOUND BY `data-embed`, NOT BY ITS src PATH, so moving the files
# does not silently stop the pour - and a tag that is present and NOT poured is
# a fatal error rather than a warning. A hosted build that quietly lost its art
# would fall back to procedural painting and look like a rendering bug, which is
# exactly the class of silent failure the audio block above exists to prevent.
# ⚠ AND A MISSING FILE THROWS. The working file degrades (see HASART); a BUILD
# may not, because nobody would be looking at it when it went out.
foreach ($e in @('art_data', 'j_pack')) {
  $f = Join-Path $root ('art\embed\' + $e + '.js')
  $pat = '<script src="[^"]*" data-embed="' + [regex]::Escape($e) + '"></script>'
  $m = [regex]::Match($html, $pat)
  if (-not $m.Success) { throw "art: no <script data-embed=""$e""> in the prototype. Has the tag moved? Update build_site.ps1." }
  if (-not (Test-Path -LiteralPath $f)) { throw "art: $f is missing. Run art\inject.ps1 (art_data) or art\inject_j_pack.ps1 (j_pack) first." }
  $blk = [System.IO.File]::ReadAllText($f)
  # a MatchEvaluator, never a replacement string: $ in 13 MB of base64 would be
  # read as a capture reference. Same reason the audio pour above uses one.
  $html = [regex]::Replace($html, $pat, { param($x) "<script>`n" + $blk + "`n</script>" }.GetNewClosure(), 1)
  "art    : $e poured in ({0:N1} MB)" -f ($blk.Length / 1MB)
}
if ($html -match 'data-embed=') { throw "art: a data-embed tag survived the pour - the built page would load a file that is not beside it" }

# ---- the player build: take the developer tools out of reach ---------------
# Two exact-string replacements, each asserted to match exactly once. A regex
# that silently matched zero times would ship the dev build under the player
# build's name, which is the one failure this switch exists to prevent.
if ($Player) {
  $testDecl = "const TEST={on:localStorage.getItem('gt_test')==='1'};"
  $testOff  = "const TEST={on:false};/*__PLAYER_BUILD__*/"
  $n = ([regex]::Matches($html, [regex]::Escape($testDecl))).Count
  if ($n -ne 1) { throw "player build: expected the TEST declaration exactly once in the prototype, found $n. Has it moved? Update build_site.ps1." }
  $html = $html.Replace($testDecl, $testOff)

  $cogBtn = '<button id="testBtn" title="developer tools">'
  $m = [regex]::Match($html, [regex]::Escape($cogBtn) + '[^<]*</button>\r?\n?')
  if (-not $m.Success) { throw "player build: the DEV.MODE button markup was not found. Has it changed? Update build_site.ps1." }
  $html = $html.Remove($m.Index, $m.Length)
  if ($html -match 'id="testBtn"') { throw "player build: a second #testBtn survived the cut" }
  "player : TEST forced off, DEV.MODE button removed (/*__PLAYER_BUILD__*/ marker set)"
}

# ---- the build stamp ------------------------------------------------------
# #226. The page carries a dim build id in its top right corner so a bug report
# can name the build it came from. The working file always reads 'dev', which is
# itself the fact a report needs; this is the only place a real one is written.
#
# WHY THE CHANGELOG NUMBER AND NOT A COMMIT HASH. deploy.ps1 builds the page and
# only THEN runs `git add -A`, so a hash read here is the PARENT commit's - a
# stamp that is precisely wrong, which is worse than one that is coarsely right.
# `8f.NNN` is the vocabulary every doc in this repo already cites.
#
# LOUD, NOT SILENT, on both halves: an unmatched marker throws (the page would
# ship saying 'dev' and nobody would know which build a tester was on), and an
# unreadable changelog warns and falls back to the date alone.
$mk    = '/*__BUILD_ID__*/'
$mkEnd = '/*__END_BUILD_ID__*/'
$stamp = (Get-Date -Format 'yyyy-MM-dd')
$chg   = Join-Path $root 'docs\CHANGELOG.md'
if (Test-Path -LiteralPath $chg) {
  $nums = [regex]::Matches((Get-Content $chg -Raw -Encoding utf8), '8f\.(\d+)') |
          ForEach-Object { [int]$_.Groups[1].Value }
  # the separator is written as a code point: this file must stay pure ASCII (see the header).
  if ($nums.Count -gt 0) { $stamp = ('8f.{0} {1} {2}' -f ($nums | Measure-Object -Maximum).Maximum, [char]0x00B7, $stamp) }
  else { Write-Warning "no 8f.NNN found in docs\CHANGELOG.md - the stamp is the date alone" }
} else {
  Write-Warning "docs\CHANGELOG.md is missing - the stamp is the date alone"
}
$pat = [regex]::Escape($mk) + '.*?' + [regex]::Escape($mkEnd)
$n = ([regex]::Matches($html, $pat)).Count
if ($n -ne 1) { throw "build stamp: expected the BUILD_ID marker pair exactly once, found $n. Has it moved? Update build_site.ps1." }
$html = [regex]::Replace($html, $pat, ("{0}'{1}'{2}" -f $mk, $stamp, $mkEnd))
if ($html -notmatch [regex]::Escape("'$stamp'")) { throw "build stamp: the replacement did not land" }
"stamp  : $stamp"

[System.IO.File]::WriteAllText($out, $html, (New-Object System.Text.UTF8Encoding($false)))

# ---- icons -----------------------------------------------------------------
# The inline data: URI favicon in <head> covers modern browsers on its own; this
# set is what makes "add to home screen" work for a playtester on a phone. It is
# copied BESIDE the output, because the page links icons/ relative to itself.
$icoSrc = Join-Path $root 'prototype\icons'
$icoDst = Join-Path $outDir 'icons'
if (Test-Path -LiteralPath $icoSrc) {
  New-Item -ItemType Directory -Force -Path $icoDst | Out-Null
  Copy-Item (Join-Path $icoSrc '*') $icoDst -Force
  # start_url points at the prototype's filename one level up; at the site root
  # the page is index.html, so the manifest has to be told.
  $mf = Join-Path $icoDst 'site.webmanifest'
  if (Test-Path -LiteralPath $mf) {
    $j = (Get-Content $mf -Raw -Encoding utf8) -replace '\.\./grimtoll_slice\.html', '../'
    [System.IO.File]::WriteAllText($mf, $j, (New-Object System.Text.UTF8Encoding($false)))
  }
  "icons  : copied to $icoDst"
}

# Pages runs Jekyll by default, which silently drops anything starting with an
# underscore. Nothing here needs Jekyll.
$njk = Join-Path $root '.nojekyll'
if (-not (Test-Path -LiteralPath $njk)) { New-Item -ItemType File -Path $njk | Out-Null }

"site   : $out is {0} MB" -f [Math]::Round((Get-Item $out).Length / 1MB, 2)
