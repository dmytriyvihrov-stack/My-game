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
