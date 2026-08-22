---
name: drive
description: Drive the running build and measure it - launch a headless browser on this worktree, probe the DOM, run the standing gates, patch the 30MB prototype safely, and photograph what changed. Use whenever a session has to see or measure the game rather than read it: "check it in the running build", "measure the layout", "run the gates", "why is my screenshot blank", "the preview pane is not working", or before reporting that anything visual is done.
---

# Driving the build

**Nothing in this project is proved by reading it.** The rules files say so in capitals: *the
preview pane composites no frames and a screenshot proves nothing.* Every real finding here came
off the DOM of a running build.

⛔ **The toolkit is in the repo: `tools/dev/`. LOAD IT, DO NOT REBUILD IT.** Every file in it used
to be re-derived each session from a memory note that said *"budget two minutes"* - it had been
rebuilt at least three times before #234 committed it. `tools/dev/README.md` is the reference; this
is the order.

## 1. Take the build

```bash
python tools/dev/gt.py launch
```

⛔ **Do not reach for `preview_start`.** It runs in the session's PRIMARY directory, so a desk is
never what it serves, and in a non-interactive session the Browser pane is hidden: `javascript_tool`
times out after 30s and a screenshot returns *"the page is not compositing frames"*. Both failures
read like the game being broken. `gt.py` drives real headless Chrome over CDP on a `file://` URL,
on a port **derived from the worktree path**, and refuses to talk to a page that is not this
worktree's prototype. #234 measured another desk's build for one call before that check existed.

⚑ **Then prove the page holds YOUR edit before believing anything**, because a stale browser is the
one failure that produces confident wrong numbers:

```bash
python tools/dev/gt.py eval <(echo "typeof rarityName")   # or any symbol only your edit has
```

## 2. Ask in probe FILES, and ask several things at once

```bash
python tools/dev/gt.py eval gates.js sheet.js board.js
```

One connection, three answers. A 30 MB page costs 20-60s to load, so **the round trip is the
expensive part, not the probe** - batch the questions.

⛔ **A probe is a FILE, never a command-line string.** PowerShell eats `$`, quotes and parentheses
in an inline JS argument and the page comes back with `SyntaxError: Unexpected end of input`, which
reads like a bug in the probe.

`probes/lib.js` is prepended automatically, so a probe is only the question. It already carries the
setup that keeps being rewritten:

| | |
|---|---|
| `GT.playerTurn()` | jump to one of your bodies without playing three enemy turns |
| `GT.standNextTo(u,f)` · `GT.nearestFoe(u)` | make a reach-1 act legal |
| `GT.moveInHand(u)` · `GT.aimAtLit()` | MOVE standing, then the pointer on ground a step is paid for |
| `GT.rung(u,i)` | drive a body to a morale rung (⚠ `nerveFrac` LIFTS it, so setting `at` does not land) |
| `GT.floor()` · `GT.clip()` | the two `ui-scales.md` §5 counters, camera-aware |
| `GT.overlap(id)` · `GT.slack(id)` | #230's probe, which the other two are blind to |
| `GT.eachBody()` | the sheet, every body x every state, resetting each case at the top |

## 3. Run the gates before you believe you are done

```bash
python tools/dev/gt.py eval gates.js       # LINT, both counters on 2 screens, overlap, map, cards
python tools/dev/gt.py arena regress.js    # the eight fights
python tools/dev/gt.py check               # every inline <script> through node
```

Expected: `lint` 0 · every `floor` `[]` · `sheetOverlap` `[]` · map `0/0/0` · `emdash` false.
⚠ `battle.clip` is **not** expected to be empty: `#bField`, `#bLog` and `#bTrait` are the
documented known-and-pre-existing set. ⚠ The arena gate is **no ERR, no FATAL, no HIT GUARD** - the
round counts differ between two runs of the same build.

⛔ **AND A NUMBER ON ITS OWN IS NOT A FINDING, FOR ANYTHING ABOUT LAYOUT.** Serve the baseline and
diff:

```bash
git show HEAD:prototype/grimtoll_slice.html > /tmp/_head_baseline.html
python tools/dev/gt.py launch --port 9999 --url /tmp/_head_baseline.html
python tools/dev/gt.py --port 9999 eval sheet.js      # then diff against yours
rm /tmp/_head_baseline.html
```

A raw overflow count said 29 and meant nothing; the diff against the baseline said 2 and 2 and the
one real regression stood out at once. **Delete the copy when you are done.**

## 4. Edit through `safeedit.py`, in re-runnable scripts

```python
import sys; sys.path.insert(0, 'tools/dev')
from safeedit import patch
patch([(old, new), (old, new)])            # this worktree's prototype
patch([(old, new)], path=SOME_DOC)         # any file inside this worktree
```

Every `old` must match **exactly once** or nothing at all is written. The four clauses of that
contract are four sessions somebody lost: truncate-before-encode (a 0-byte 30 MB prototype), CRLF
(a byte pattern with `\n` matches nothing *silently*), a partial write, and - #234 - a patch aimed
at the MAIN checkout's `docs/` or `.claude/` while working on a desk, which edits the shared tree
instead of the branch.

⚑ **Keep each batch of edits as a script rather than typing them.** #191 restored from HEAD and
re-applied three finished items in minutes purely because they were scripts; #234 changed a colour
that turned out to be wrong by editing one line of one script and re-running.

⚠ **Run `gt.py check` after every patch.** Under a second, and it names the line.

## 5. Photograph it only after the DOM agrees

```bash
python tools/dev/gt.py shot out.png --setup board.js --clip 960 60 320 220 3.5
```

**The DOM is the proof and the picture is the eye check**, in that order - but take the picture,
because it catches what no probe can. #234's damage band measured perfectly and was drawn in the
wrong direction: it darkened the doomed run, and dark already means *empty* on that bar, so it read
as a bar that was already that short. Two probes said the geometry was right and the screenshot
said the meaning was wrong.

## What keeps biting

- **`aiTurn(u)` takes the unit as an argument.** Bare, it throws `Cannot read properties of
  undefined (reading 'state')`, which reads like a broken battle.
- **`window.GT`, not `const GT`** in a probe: a top-level `const` persists in the execution context,
  so the second probe of a session throws `already been declared`.
- **Python's stdout here is cp1251.** Printing a `⚔` from a check script raises, and the crash
  reads like a bug in the code under test. `gt.py` prints ASCII.
- **`location.reload()` never returns** to the evaluator, because the page navigates out from under
  it. Queue it: `setTimeout(()=>location.reload(),20)`.
- **`eyes.py`'s module body runs at import and reads `sys.argv`.** Save and restore it.
- **Reset every stubbed flag at the top of each case.** A `statPoints` left behind by the previous
  measurement made #230 read one state's cost as another's.
- **Reaching the aftermath means starting a run, which can clobber the user's save.** Snapshot every
  `gt_` key out of `localStorage` first. They have a live playthrough in there.
