---
name: land
description: Land every finished desk onto main, keep the record honest, verify the merged build and deploy. Use when the user says merge the desks, land everything, merge and deploy, clean up the branches, or "check nothing was lost" - and at the end of any run of parallel sessions.
---

# Landing

Parallel sessions are cheap and **landing them is where every failure this project has had came
from**. This is the order, and the traps are in it because each one cost a session once.

⛔ **The merges are the easy half.** On 2026-08-21 six desks merged with four trivial conflicts, and
every real defect was in the RECORD, where nothing conflicts and nothing shows in a diff.

## 1. Survey. Never trust one tool

```bash
git worktree list                       # desks the branch tool may not know about
git status --short                      # THE MAIN DESK IS A DESK. It is often the dirty one
for b in $(git branch --format='%(refname:short)'); do
  git merge-base --is-ancestor $b main || echo "UNMERGED: $b"; done
```

```powershell
powershell -NoProfile -File tools\branch.ps1 land        # reports; acts only on -Go
powershell -NoProfile -File tools\claim.ps1 status
```

⚠ **`branch.ps1 land` sees a `.claude/worktrees` desk once its work is COMMITTED**, and does not see
**uncommitted** work in one. Run the loop above first; it is what finds the desk nobody counted.

⛑ **Untracked files in the main desk are somebody's finished work.** Commit anything unrelated
**separately and first**, or `land -Go` folds it into the entry it is about to commit.

## 2. Land

```powershell
powershell -NoProfile -File tools\branch.ps1 land -Go
```

It commits the main desk's tree, then merges each desk oldest-first, and **stops at the first
conflict**. Resolve, `git add`, `git commit`, run it again. Repeat until it says nothing is waiting.

### The two conflict families, and neither wants a coin toss

| what conflicted | the resolution |
|---|---|
| **`docs/*`** | mechanical. `python tools/record.py fix` keeps both rows and orders them by number, and REFUSES anything that is not two entry rows |
| **the prototype** | ⛔ **read both sides.** A desk branched before a refactor holds its own copy of the thing that refactor unified |

⛔ **THE PROTOTYPE RULE, WHICH HAS COST THIS PROJECT TWICE: RESOLVE TOWARD THE UNIFIER, THEN
RE-READ WHAT THE UNIFIER NAMES.** If HEAD collapsed two implementations into one and the incoming
desk still carries its own, taking the incoming side silently reverts the fix. Give the unified
thing the FACT the other side was carrying instead.

⚑ **Two worked examples, both from 2026-08-21:**

- **A shared function whose signature both desks changed.** `#216` made `col()` take pre-built rows;
  `#215` made it take items plus a wrapper class. The answer is one builder with both:
  `col(title, rows, attr, cls)`. Neither side alone was right.
- **A desk that predates a selector change.** `#218` authored every rule as `#wDlg`; `#219` had since
  made the stage live in two hosts as `:is(#wDlg,#prDlg)`. **18 selectors had to be lifted at the
  merge**, and only OUTSIDE CSS comments, which discuss `#wDlg` by name. Unlifted, the two opening
  cards would have been the only cards in the game that never unfold.

⚠ **Then check the file still parses before believing any of it.** A 5 MB single-script HTML:

```bash
python - <<'PY'
import re,subprocess,sys,tempfile,os
src=open("prototype/grimtoll_slice.html","rb").read().decode("utf-8")
for m in re.finditer(r"<script\b([^>]*)>(.*?)</script>",src,re.S|re.I):
    if "src=" in m.group(1).lower(): continue
    f=os.path.join(tempfile.mkdtemp(),"b.js"); open(f,"wb").write(m.group(2).encode("utf-8"))
    r=subprocess.run(["node","--check",f],capture_output=True,text=True)
    print("ok" if r.returncode==0 else "FAIL\n"+r.stderr)
PY
```

## 3. The record. This is the half that hides

```bash
python tools/record.py check
```

⛔ **`CHANGELOG.md`, `SHIPPED.md` and `WHAT_TO_TEST.md` are `merge=union`, so their damage NEVER
CONFLICTS and arrives looking exactly like success.** It has produced, silently: a registry row
duplicated (once as authored, once as a later entry edited it to close its remainder - **the two
differ**), and a changelog row with another row written into the middle of it.

The checker counts **the four writes** `SHIPPED.md` has always demanded, and the structural faults
no reading catches. `fix` does the mechanical ones. `prove` makes all eight fire and go quiet -
run it if you change the checker, and note it refuses a dirty tree because it seeds real files.

⚠ **A stranded claim blocks the commit that would record it.** The sweep clears a claim once its
number is in the COMMITTED record, so the commit describing a dead number is refused by the claim on
that number. Free it first (`claim.ps1 release <n> -By <session>`, or move the file to
`.grimtoll/freed/`), then commit. Safe because the issuing floor comes from a repo scan: once the
number is committed it can never be issued again.

## 4. Verify the merged build, by driving it

⛔ **The preview pane composites no frames, so a screenshot proves nothing.** Serve it and read the
DOM.

```
preview_start {name: "grimtoll"}  ->  http://localhost:8777/prototype/grimtoll_slice.html
```

```js
LINT()                                     // {findings: 0}
spacingViolations().length                 // 0
labelViolations().length                   // 0
Object.entries(MAP_SIGHT).filter(([k,v])=>!MAP_ART[v]).length   // 0
Object.values(EVENTS).flatMap(e=>e.choices).filter(c=>!c.ico||!c.ico.length).length  // 0
```

Plus the three scale greps and the two probes in `.claude/rules/ui-scales.md` §5. **Known and
pre-existing on the clipped-box probe: `#wMap`, `#bField`, `#bLog`, `#menu`/`#mTitle`, `#bTrait`.**

⛑ **Drive the seams you hand-resolved, not the screens you did not touch.** A merged file that
parses is not a working file. If a conflict was in `openSim`, open the practice field and click a
door in every column; if it was in the card CSS, open a road card AND the opening card and read
`getComputedStyle(...).animationName` on both.

## 5. Deploy

```powershell
powershell -NoProfile -File deploy.ps1 -Player -m "...what shipped..."
```

⛔ **One command. `index.html` and `play/index.html` are `merge=ours`, so after any merge they are
STALE ON PURPOSE and must be rebuilt** - which is what this does. Never copy the prototype.

⚑ **Then assert the built page carries the merge**, because a generated file that fails falls back
silently: `grep -c` the built `index.html` for a string only the new code has.

⚠ **No game change means no deploy.** `git diff --stat <last-deploy>..HEAD -- prototype/` empty is
the check.

## 6. What was lost. Ask the chats, not the branches

The branches hold code; the **questions** are in the session reports and get lost there.

```
mcp__ccd_session_mgmt__list_sessions        then list_events on each unaccounted one
```

Every session from the period, matched against a branch or a commit. What comes back is usually
three kinds of thing, and all three belong in `00_PLAN_AND_BACKLOG.md` rather than in a transcript:

- **rulings the desk asked for and never got** - they go under *Rulings still waiting on you*;
- **open remainders the desk declared** - a first-cut number, an unswept pattern;
- **work with no record at all** - a number claimed and written nowhere, an untracked research file.

⛔ **If it cannot be fixed in this session, it goes in the backlog with its reason.** A finding that
lives only in a session report is a finding that is gone.

## 7. Docs hygiene, when a file has outgrown reading

Cut by the rule the file itself states. Both directions are correct and the difference is the rule:

| | how it is cut | why |
|---|---|---|
| **`WHAT_TO_TEST.md`** | delete, name the hash in *Everything older* | a played test is disposable |
| **`CHANGELOG.md`** | move to a **file** under `docs/archive/` | `.claude/rules/*` and memory cite old entry numbers constantly, and a rule pointing at reasoning `grep` cannot reach is worse than a long file |

**Keep what is CITED, hash what is merely PAST.**

⛔ **A move is not a deletion only if the readers follow it.** `tools/claim.ps1`'s `$ShipRecord` and
`tools/record.py`'s `CHANGELOG_ARCHIVES` both list the archive files. Forget either and the split
looks to them like two hundred entries vanishing.

⚠ **Re-measure sizes rather than trusting the prose**: `ls -la docs/ docs/archive/`. Every size
written into `README.md` §7 has been wrong within days of being written, four times now.

## Before you say it is done

- `python tools/record.py check` clean
- `LINT()` 0 and the map counters 0/0/0 in the RUNNING build
- the hand-resolved seams driven, not read
- the built page asserted to contain the merge
- everything unfixable written into the backlog with its reason
- `git status --short` empty, and `git log origin/main -1` is your commit
