---
name: grimtoll-247-fourteen-ask-batch
description: "#247 the fourteen-ask batch - LANDED + DEPLOYED 2026-08-25 (8f.271). THREE of the fourteen asks were features that had already shipped and could not be seen - the second batch running where that is the finding; and the audit the user asked for said the previous five entries all landed, so 'some things are missing' meant invisible, not absent"
metadata: 
  node_type: memory
  type: project
  originSessionId: a6e87b30-0f64-4650-93eb-c3193dd477ac
  modified: 2026-08-25T16:43:06.938Z
---

**#247, 2026-08-25. Fourteen asks, landed on main and deployed** (main build and the playtester
build at `/play/`, which was a day stale until this deploy). See `docs/CHANGELOG.md` 8f.271 for the
full reasoning; this is the part worth carrying.

## The finding, and it is the same one as #245's

**Three of the fourteen asks were features that had already shipped and could not be found.** The
user's framing was *"I see some things are missing"*, and an audit of #242-#246 against the running
build (`tools/dev/probes/audit242_246.js`, 28 claims) came back **all true**. Nothing was absent.
Three things were invisible:

- *"highlight the second movement too"* - a far hex was clickable in ONE click since #246 and
  `.hex.lit` was still refused on it, by a #244 note reading *"one click cannot reach it"* that
  nobody re-read when #246 made it false. **57 hexes lit against 59 reachable-and-not-lit.**
- *"keep the undo on a double move"* - the offer was real and lasted **140ms**. `autoEnd` fires the
  moment a body has nothing left, `nextTurn` hands over, `beginTurn` clears `B.undo`, so the one
  move that always empties a body was the one move that could never be taken back.
- *"add a menu button in the battle screen"* - `MENU_ON` has carried `battle:1` since #130, at
  `left:100;bottom:10`, **underneath `#bPlq`** (z-index 40 against 20). Word for word what #223
  found about `? RULES` on this same screen, and it takes the same answer: reparent into the log.

⚑ **So when this user says a thing is missing, ask whether it is DRAWN somewhere nothing can reach
it before believing it was never built.** Three batches running now.

## What else it is worth knowing

- **A pool is `.sbar`: a mark, a bar, the figures inside it**, on the battle card and the sheet off
  ONE stylesheet block. Standing rule written into `.claude/rules/ui-scales.md` §3c, including
  `--sbh`, the outline-not-shadow rule for text on a fill, and the specificity trap below.
- ⚠ **`.ibars .bar{height:7px}` beat `.sbar>.sbb` at equal specificity on source order**, so the
  sheet's three rows shipped stacked on top of each other for one iteration while the battle card
  was correct. **A tie is decided by which entry wrote which block.**
- ⚠ **The card's health is RED now and the bars over the heads are untouched** - the user said so in
  the same breath. `hpCol(u,f,card)` is a flag on the one function, never a second table.
- ⚠ **A reparented element is a child of the box it was moved into, and that box's next
  `innerHTML=` deletes it.** OPTIONS worked perfectly on the first visit and had no switches ever
  again. **Found by a screenshot disagreeing with a probe taken one call earlier** - i.e. by
  measuring the SECOND visit.
- ⚠ **The clash's DRAW/STALL is the documented intermittent, not a regression**: 2 in 30 runs on the
  new build against 0 in 7 on a `git show HEAD:` baseline, and nothing in the diff is on the AI path
  (`runFight` stubs `render`, and `clickHex` is the player's door). #236 recorded 1 in 32.

Related: [[grimtoll-245-eleven-ask-batch]], [[grimtoll-invisible-feature-shape]],
[[grimtoll-session-toolkit]], [[grimtoll-measuring-the-running-build]].
