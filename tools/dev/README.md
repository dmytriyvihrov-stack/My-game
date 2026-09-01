# `tools/dev` - the session toolkit

**Everything in here used to be rewritten from scratch, every session, from a memory file that
said so out loud** (*"safeedit.py is not persistent and has to be rebuilt each session - budget two
minutes"*). It had been rebuilt at least three times - #191, #195, #234 - and each rebuild
re-derived the same four traps from the same notes. It is in the repo now. **Load it, do not
rebuild it**, the same rule `tools/harness.js` already carries.

Nothing here is loaded by the game and nothing here ships.

---

## The four verbs a session actually uses

```bash
python tools/dev/gt.py launch          # headless Chrome on THIS worktree's prototype
python tools/dev/gt.py eval gates.js   # run a probe, with probes/lib.js prepended
python tools/dev/gt.py check           # every inline <script> through node's parser
python tools/dev/gt.py close
```

plus `shot`, `arena` and `grep`. `gt.py <verb> --help` for the flags.

---

## ⛔ Why not `preview_start`

`docs/README.md` §5 used to send every session to `tools/serve.ps1` through `preview_start`, and
from a desk it cannot work:

- **the preview tool runs in the session's PRIMARY working directory**, so a desk at
  `%USERPROFILE%\grimtoll-desks\<name>` is never what gets served. The served bytes were
  md5-different from the desk's file on the first try;
- **in a non-interactive session the Browser pane is hidden**, so `javascript_tool` times out after
  30s with *"the Browser pane is currently hidden"* and a screenshot returns *"the page is not
  compositing frames"*. `tabs_select` does not fix it.

`tools/playtest/eyes.py` drives a real headless Chrome over CDP and takes a `file://` URL. It
deliberately has **no `eval` verb** - a playtester is not allowed one - so `gt.py` imports its
`CDP` class and adds the verbs a layout session needs.

⚠ **`eyes.py`'s module body RUNS at import and reads `sys.argv`.** Save and restore it around
`exec_module`, or your own argument parsing is gone. `gt.py load_eyes()` does.

## ⛔ Why the port is derived and every connection is checked

#234 typed a round port number, connected to a browser **another desk already had open on it**, and
measured the wrong build for one call before noticing the URL in the launch output. That failure is
silent and it invalidates everything measured after it.

`gt.py` derives the port from a hash of the worktree path, so two desks cannot collide and the same
desk finds its own browser again; and **every connection asserts `location.href` is this worktree's
prototype** and refuses otherwise. ⚑ It is still worth confirming the build holds YOUR edit before
believing a number: `typeof <a symbol only your edit has>`.

⛔ **AND `--port` GOES AFTER THE VERB, NOT BEFORE IT** *(#243, and it cost an hour)*. The parser
declares `--port`/`--url` on the top level AND on each sub-parser, so `gt.py --port 9999 eval x.js`
parses without complaint and the sub-parser's own `None` wins - the call lands on **this worktree's
own browser** instead of the one named. The baseline-diff recipe in the `/drive` skill is the whole
reason that flag exists, and it silently compared the new build with itself: two runs, byte-identical
numbers, read as *"the change had no effect"*, and a correct edit was nearly reverted on the strength
of it. Write it `gt.py eval --port 9999 --url prototype/_head_baseline.html x.js`.
⚡ The tell is free and it is the one this section already recommends, pointed at both ports:
`{hasNew: someFn.toString().indexOf('<a string only the new build has>')>=0, href: location.href}`.
Read it off each browser before believing any comparison between them.

## ⛔ Why edits go through `safeedit.py`

`prototype/grimtoll_slice.html` is **30 MB, 91% of it 337 lines of embedded base64**, and there is
no second copy. The contract, and each clause is a session somebody lost:

| | |
|---|---|
| encode to bytes FIRST, temp file, `os.replace` | `open(p,'w')` truncates *before* it encodes, so an encode error leaves a **0-byte prototype** (#191) |
| normalise CRLF in memory, restore it on the way out | the file is CRLF, so a byte pattern written with `\n` matches **nothing, silently** |
| every anchor matches **exactly once** or nothing is written | a partial write to this file is worse than a failed one |
| refuse a path outside this worktree | #234 pointed a rule-file patch at the MAIN checkout and edited the shared tree instead of the branch |

**Keep each edit as a re-runnable script**, not a typed-in edit. #191 restored from HEAD and
re-applied three finished items in minutes purely because they were scripts; #234 changed the
damage band's colour by editing one line of one script and re-running it.

⚠ **Print ASCII.** Python's stdout here is **cp1251**: printing a `⚔` or a `═` from a check script
raises, and the crash reads like a bug in the code under test.

## ⛔ Why `gt.py grep` exists

A plain `grep` over the prototype returns **megabytes**, because those 337 base64 lines contain
almost any short pattern. The obvious dodge - `awk 'length<600' | grep -n` - **renumbers the
output**, which sent #234 to read the wrong sixty lines twice. `gt.py grep` filters by line length
and keeps the real numbers.

---

## The probes

`probes/lib.js` is prepended to every probe by `gt.py eval`, so a probe is only the question. It
carries the setup that keeps being rewritten - `GT.playerTurn()`, `GT.standNextTo()`,
`GT.moveInHand()`, `GT.aimAtLit()`, `GT.rung(u,i)` - and the measurements the rules files demand:
`GT.floor()`, `GT.clip()`, `GT.overlap(id)`, `GT.slack(id)`, `GT.eachBody()`.

| probe | what it answers |
|---|---|
| `gates.js` | `LINT()`, the two ui-scales counters on two screens, the #230 overlap probe, the three map counters, the event-card checks |
| `sheet.js` | the company sheet's height budget, every body x every state |
| `board.js` | every readout the battle screen carries about a swing, plus what must NOT survive a foe's turn |
| `sights.js` | the three map counters on their own |
| `smoke.js` | a screen-by-screen walk: every road card, every camp, every gear hover, reporting anything that THREW |
| `regress.js` | the eight fights, both AI brains, one line each |
| `fightn.js` | ONE fight n times, for a RATE. `regress` runs each fight once and can only say *something went wrong here* |
| `reach.js` | the built-but-unreachable census: art keys pointing at nothing, cards no node can deal, gear with no painting |
| `tutorial.js` | the world tour still runs and a battle lesson still stops and restarts the clock |
| `locktrace.js` | who WROTE a flag, with a stack, by trapping it with `defineProperty` after every `startBattle` |
| `reach.js` | … and its `deadGates` half: a door gated on something nothing in the build can grant |
| `wash.js` | a hex tint COMPOSITED over the painted ground, by luminance. #249 |
| `cardfloor.js` | the two ui-scales §5 counters over a CARD, which `gates.js` has never opened. ⚠ **Waits 900ms**: read in the same tick it reports twenty false findings off #218's unfold, and at 800ms it reports one. #251 |
| `foeoracle263.js` | every foe side, 19 fields a body, so a statblock refactor can be PROVED to change nothing and a re-stat to change exactly what it claims. #263. ⚠ `steading` drifts against itself (it rolls its wall) |
| `statmark263.js` | the four stat marks on the inspect card, DRIVEN through the real `inspect()`: a foe, one of yours, and the Warden that must have none. #263 |
| `matrix263.js` | the road's win rates, both comps, **accumulated six fight-comps a call** because `eyes.py`'s CDP socket times out at 120s regardless of `--timeout`. Run it until `done`. #263 |
| `champ265.js` | the champion's two rolled perks and its derived rung, plus the nerve gap between the two sides. #265 |
| `pit250.js` | every rule the PIT carries, driven on a live board: the budget in a hole, the rim in both directions and for all four kinds of act, the fall a shove buys, the turn a climb costs, the hex note, the badge, and the generation in situ. #250 |
| `foedex.js` · `orphanart.js` | the 62-body foe catalogue and the art nothing can reach, which together generate `tools/enemies.html`. #276 |
| `ptsprice.js` | every body and every fight's threat price, for diffing against a `git show HEAD:` baseline after any `unitPts` change. #276 |
| `align243.js` · `apron241e.js` · `diff243.js` · `road243i.js` · `a269_split.js` · `lad254b.js` · `m266_gap.js` · `promises257.js` · `statsum252.js` · `statsum252b.js` · `statzero253.js` | the one-offs a changelog row or a rule names as the instrument that measured it, which is how a one-off earns its place |

## ⛔ A PROBE IS EITHER AN INSTRUMENT OR IT IS SCRATCH, AND SCRATCH DOES NOT STAY

*(#248, 2026-08-25, after deleting **61** of them in one command. ⚡ **And again on 2026-09-01,
after deleting 78 more**: the directory had grown back to **118** files, of which 34 were
instruments. The rule below was right and nothing enforced it, so it decayed at about the same rate
twice. **The test that was actually used is mechanical and is the one to re-run**: a probe no
document, rule or script names anywhere is scratch.*

```bash
for p in tools/dev/probes/*.js; do b=$(basename "$p");
  n=$(grep -rl --include=*.md --include=*.py --include=*.ps1 -F "$b" docs .claude tools \
      | grep -v "^tools/dev/probes/" | wc -l);
  [ "$n" -eq 0 ] && echo "uncited $b"; done
```

⚠ **It is a starting list, not a verdict**: `_reload.js` and `_who.js` are infrastructure and are
cited by nothing, and a probe written this session has not been cited yet.*)

This directory had grown to **76 files**, of which fifteen were the ones above and the other
sixty-one were session scratch - `ask240c.js`, `ask247_wash.js`, `setup244blood.js`, four `ver243`
variants, five `apron241` variants. Each was right on the day it was written and none was ever
opened again. ⛔ **The cost is not disk, it is that a session reading this directory to find out
what already exists has to read sixty-one filenames to find the fifteen answers**, which is the
exact complaint this toolkit was created to end (*"stop rebuilding safeedit/drive/jscheck"*).

⛑ **THE TEST IS ONE QUESTION AND IT IS NOT ABOUT QUALITY: WILL SOMEBODY RUN THIS AGAIN?** A probe
that answers a question the build will keep having (a gate, a census, a rate, a trap) is an
instrument and gets a row in the table above. A probe that measured one pixel on one afternoon is
scratch, however careful it was. ⚠ **A one-off earns a place by being CITED** - `align243.js` stays
because a changelog row names it as the thing that measures the apron's paint against its tiles,
which makes it the only copy of a check the record claims exists.

⚠ **AND NOTHING IS LOST BY DELETING ONE.** Every file is in git, and the way back is
`git log --diff-filter=D --name-only -- tools/dev/probes/`. **Write the throwaway** - the alternative
is people not measuring - and delete it in the same session, or name it in the record and give it a
row here.

**Write a new probe as a file, never as a command-line string.** PowerShell eats `$`, quotes and
parentheses in an inline JS argument and the page comes back with `SyntaxError: Unexpected end of
input`, which reads like a bug in the probe.

⚑ **A NUMBER ON ITS OWN IS NOT A FINDING.** For anything about layout, serve
`git show HEAD:prototype/grimtoll_slice.html` into a second file, `gt.py launch --url` a second
browser on it, run the same probe, and diff. A raw overflow count said 29 and meant nothing; the
diff against the baseline said 2 and 2, and the one real regression stood out at once.

## The traps `lib.js` already has baked in

- **`Math.hypot(a,b)` and never `matrix.a`** when reading a transform: a mirrored element reads
  `-1` and a rotated one reads `0`.
- **`offsetParent` and not `display`** to test visibility: a `display:none` SCREEN does not make its
  children compute `display:none`, so a naive guard lets twelve hidden screens report at once.
- **`nerveFrac` lifts the rung a body reads at**, so setting morale to a band's own `at` does not
  land on that band. `GT.rung()` drives it until `ladderAt` agrees.
- **`aiTurn(u)` takes the unit as an argument.** Calling it bare throws
  `Cannot read properties of undefined (reading 'state')`, which reads like a broken battle.
- **`window.GT`, not `const GT`.** A top-level `const` persists in the execution context, so the
  second probe of a session would throw `already been declared`.
- **Reset every stubbed flag at the TOP of each case.** A `statPoints` left behind by the previous
  measurement made #230 read one state's cost as another's.
