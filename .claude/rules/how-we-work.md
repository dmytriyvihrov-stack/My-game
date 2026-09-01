# How we work here

**This is the only file loaded into every session.** Everything else is loaded when the work
touches it. Read the routing table before you start, and the gate table before you finish.

> Until 2026-09-01 six rules files totalling 204 KB were injected into every session, most of it the
> story of how each rule was found. The rules are the same; they now live where the work is. The
> stories are in [`docs/archive/rules-history/`](../../docs/archive/rules-history/).

## ⛔ The five rules that hold everywhere

1. **NEVER AN EM DASH.** Not in prose, not in code, not in a commit message, not in a document.
   Use a hyphen with spaces, a colon, or a comma. `python tools/dev/emdash.py` is the check.
2. **NOTHING IS PROVED BY READING IT.** The preview pane composites no frames, a screenshot proves
   nothing on its own, and `setInterval` fires zero times. Drive the build and read the DOM. The
   `drive` skill is the procedure and `tools/dev/` is the toolkit: load it, do not rebuild it.
3. **DERIVED, NEVER AUTHORED.** If the build already holds a fact, read it. A figure typed a second
   time is a figure that will be wrong on the day the first one moves. This repo has caught the same
   defect six times: a label promising one thing and the code paying another.
4. **ONE FACT, ONE BUILDER.** Two implementations of one rule have drifted every single time they
   were allowed to exist. Before writing a second one, find the first and call it.
5. **PROVE A NEW CHECK BY MAKING IT FIRE.** Move something into the fault on purpose, watch it
   report, put it back. A check that has only ever returned zero is indistinguishable from a broken
   one, and this repo has shipped three of those.

⚠ **A NUMBER ON ITS OWN IS NOT A FINDING.** For anything about layout or balance, serve
`git show HEAD:prototype/grimtoll_slice.html` into a second file, drive both, and diff. A raw
overflow count said 29 and meant nothing; the diff against the baseline said 2 and 2, and the one
real regression stood out at once.

## ⛑ Which rules to load, by what you are touching

⛔ **Load the skill BEFORE the edit, not after.** Each carries the constants, the traps and the
gate for its surface, and each replaced a file that used to be loaded whether you needed it or not.

| you are touching | load |
|---|---|
| **a numbered list of asks, screenshots, "another buch"** | `batch` **first**, before building anything |
| an event card, a door, a receipt, a camp incident, the opening deck | `event-cards` |
| any CSS, any inline style built in a JS string, a font size, a padding, a border | `ui-scales` |
| an enemy statblock, `FOE_*`, a foe's stats, threat points, the foe dex | `enemy-stats` |
| a map node icon, `MAP_SIGHT`, `MAP_PLACE`, node placement, a road label | `world-map-sights` |
| event art, item icons, stat icons, the J pack, `art/embed/*` | `static-event-art` |
| driving, measuring or photographing the running build | `drive` |
| merging desks, landing work, deploying | `land` |

## ⛑ The gate table: what to run, by what you changed

⛔ **Run the row, not the file.** Running every gate on every change is the habit this table
exists to end; so is skipping the one that would have caught it.

| what you changed | what to run |
|---|---|
| **anything at all** | `python tools/dev/gt.py check` · `python tools/dev/emdash.py` |
| a card's prose or doors | `gt.py eval gates.js` (`cards.emdash` false, `cards.noIco` 0) · the card's own word count |
| CSS, a font size, a box | `gt.py eval gates.js` · `sheet.js` if the sheet · `cardfloor.js` if a card · diff against a `HEAD:` baseline |
| a map node or its art | `gt.py eval sights.js` (0/0/0) · the road-crossing probe by hand |
| a foe's numbers or a statblock | `foeoracle263.js` **twice on each build** · `LINT()` · `ARENA.match` n>=15 over `FOE_BUILD`, not the road |
| the threat price | `ptsprice.js` against a `git show HEAD:` baseline · re-derive `PTS_SCALE` |
| art embedded or re-packed | `gt.py check` (it parses both embed files) · the key present in `art/embed/*.js` AND `index.html` |
| an act, a skill, a perk | `gt.py eval regress.js` · `smoke.js` · `LINT()` · `promises257.js` |
| **any new content**: a card, statblock, item, node, skill, painting | `gt.py eval reach.js` |
| anything shipped | `python tools/record.py check` |

⛔ **RUN `reach.js` WHENEVER CONTENT IS ADDED, AND THIS IS THE ROW THAT PAYS FOR ITSELF.** Grep the
record for `since #` and the pattern is overwhelming: **the expensive defects here are things that
shipped and were never driven**, and they live for tens of entries. Coldharrow soft-locked on every
visit since #243 and was found at #269; the perk tree drew on the stash tab since #264; three
readouts promised a card most bodies had not carried since #224; the mirehares were unreachable
since #193. Not one of those was caused by a big batch. ⚠ `reach.js` is a **list to read**, not a
pass/fail: a legitimate shipping state is common, and what you want is the row you cannot explain.

⚠ **`LINT()` returns an OBJECT.** Read `.findings` and `.items`, never `.length`. A session read
`(LINT().findings||[]).length` for two entries, which is 0 whatever the linter says: a vacuous check
reads exactly like a passing one.

⚠ **`eyes.py` opens its CDP socket with `timeout=120` on the socket itself**, so any single eval
over two minutes dies whatever `--timeout` says, and stacking timed-out evals wedges the page. Long
sweeps accumulate a few cells a call. If the browser stops answering a trivial probe, kill the
headless chrome on its debug port and relaunch.

## ⛔ Are you alone? Then skip the desk machinery

```bash
git worktree list && ls .grimtoll/claims/
```

⛑ **One worktree and no claims means you are the only session: work on `main` and skip all of it.**
No `claim.ps1 lock`, no branch, no worktree, no `land`. The locks, the desks and the landing
sweep exist because two sessions editing one 3.4 MB file lose work, and every failure this project
has had there was a LANDING failure. **With nobody to land against, that machinery is pure
ceremony**, and paying it on a solo session is the "too safe move" that costs an hour and buys
nothing.

⛔ **More than one worktree, or any claim file, and the `land` skill is not optional.** A desk
stacked on another desk cannot tell a number SPENT from one CITED, and an expired lock is not a
free desk: `claim.ps1 status` says how OLD a lock is, never whether anybody is coming back.

## ⛔ When an entry ships, five writes

| | |
|---|---|
| 1 | full text and a build-log row to [`CHANGELOG.md`](../../docs/CHANGELOG.md) |
| 2 | a one-line row to [`SHIPPED.md`](../../docs/SHIPPED.md), so a number is never reused and no remainder is lost |
| 3 | strike it from [`00_PLAN_AND_BACKLOG.md`](../../docs/00_PLAN_AND_BACKLOG.md) |
| 4 | a section in [`WHAT_TO_TEST.md`](../../docs/WHAT_TO_TEST.md): what it is, how to reach it in three steps, what would be a bug |
| 5 | every ruling it raised to [`docs/OPEN_QUESTIONS.md`](../../docs/OPEN_QUESTIONS.md) |

`python tools/record.py new <N> "<title>"` scaffolds all five. `python tools/record.py check`
counts them and `fix` repairs union-merge damage.

⚠ **Write 5 is the conditional one, which is why it needs a counter rather than a habit.** An entry
that raises no question writes nothing.

## ⛔ A question for the user lives in ONE file

**Every question only the user can answer goes in
[`docs/OPEN_QUESTIONS.md`](../../docs/OPEN_QUESTIONS.md), in the session that raises it.** Raise it
wherever the reasoning is; file it there as one line: the question, where it came from, and a
recommendation. Answered, parked or overtaken rows move to
[`docs/archive/QUESTIONS_ANSWERED.md`](../../docs/archive/QUESTIONS_ANSWERED.md).

⛔ **A CODE IS NEVER REISSUED.** The codes are how the user answers, and an answer landing on a
recycled code is worse than no record.

| glyph | means | goes |
|---|---|---|
| `👤` | a decision only the user can take | `OPEN_QUESTIONS.md`, same session |
| `⏳` | work nobody has done yet | the entry's own remainder column |

⚠ **A question a session can answer is not a question for the user.** Six of twenty were checked
against the running build before asking and four described something that no longer existed. Drive
the thing first.

⚠ **Why this file exists at all**: 39 open questions once sat in four places, twenty of them written
inside the changelog row that raised them, which is the most reasonable-looking place to put one and
the one place nobody will ever look. Some had waited since #90. **A question nobody can find is not
a question that waits, it is a question that rots.**

## Where everything else lives

| | |
|---|---|
| the work | [`docs/00_PLAN_AND_BACKLOG.md`](../../docs/00_PLAN_AND_BACKLOG.md) |
| the record | [`docs/CHANGELOG.md`](../../docs/CHANGELOG.md), older rows under `docs/archive/` |
| what shipped | [`docs/SHIPPED.md`](../../docs/SHIPPED.md) |
| the user's test bench | [`docs/WHAT_TO_TEST.md`](../../docs/WHAT_TO_TEST.md) |
| orientation and the nine voice rules | [`docs/README.md`](../../docs/README.md) §4 |
| canon | [`docs/03_WORLD_LORE.md`](../../docs/03_WORLD_LORE.md) |
| the toolkit and its probes | [`tools/dev/README.md`](../../tools/dev/README.md) |
| the reasoning behind every rule | [`docs/archive/rules-history/`](../../docs/archive/rules-history/) |

⛔ **Never read a long doc whole.** `CHANGELOG.md`, `SHIPPED.md` and `01_GAME_CONCEPT.md` are
registries: grep for the entry number or the term, open that section, and stop.
