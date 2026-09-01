---
name: grimtoll-232-mood-rename
description: "#232 NERVE becomes MOOD, the Captain's own trait, the stat block re-laid - LANDED + DEPLOYED 2026-08-22 (8f.255, eae48e6). The four record files do NOT all sort the same way, and a right-pinned value column makes the WORD decide where the ICON starts"
metadata: 
  node_type: memory
  type: project
  originSessionId: c7b3bcb3-b2e1-439d-86a1-e12360820c0c
  modified: 2026-08-21T22:27:11.606Z
---

**#232 landed on main and deployed 2026-08-22 (8f.255, `eae48e6`), fourteen asks in one message,
all fourteen shipped.** NERVE -> MOOD on **48 player-facing surfaces** (internals deliberately untouched -
`nerveFrac`, `#iNerve`, `START_NERVE`, `FLAG_BY_RUNG` - which is [[grimtoll-199-em-dash-sweep]]'s
grep-counts-vs-player-reads split applied to a rename). Plus: the banner at It rocks only, the
ladder cut to its figures, a mood hover that says what moves the pool, `CLASS_ICON.captain` = ★,
a new captain trait, the drive line moved under the mood bar, the attribute icons aligned, the
skill card's damage back in flow, THE BODY deleted, SKILLS renamed, the field token moved right,
the short sword out of the stash.

⛔ **THE FOUR RECORD FILES DO NOT ALL SORT THE SAME WAY, AND ONLY `record.py` SAYS SO.**
`SHIPPED.md`, the backlog's Done table and `WHAT_TO_TEST.md` are **newest first**;
`CHANGELOG.md`'s build-log table is **ASCENDING**. Inserting the new row above its predecessor is
right in three files and wrong in the fourth. `python tools/record.py check --strict` reported
*"CHANGELOG.md build rows from 8f.207 are out of order"* - a note that sounds pre-existing and
was mine, confirmed by the fact that swapping the two rows made it disappear. **Run `check
--strict` after the four writes and treat every note as new until proved otherwise.**

⛔ **A RIGHT-PINNED VALUE COLUMN MAKES THE WORD'S LENGTH DECIDE WHERE THE PICTURE STARTS.**
`.itl .tvw` was `justify-content:flex-end` in a fixed-width row, so the four stat icons had four
different left edges - **46px apart on the mage** - and no reading of the CSS says so, because
nothing is wrong with any single rule. `flex-start` plus a fixed label column (INTELLECT is 73px
at `--fs2`, canvas-probed) puts every icon on 567 and every word on 603. ⚑ The row also had to
go `baseline` -> `center`: a 32px painting baselined against a 10px label hangs its whole body
below the row it belongs to.

⚑ **A 55px HOLE EXISTED ON EVERY BODY IN THE GAME AND THE ARITHMETIC IS ALL IT TOOK TO FIND.**
`.ibars` stacks to 69 beside `.itells` at 124, and the five drive figures took a full-width row
underneath. Moving `.idrv` into the hole costs nothing and gives **31px** back; crew slack went
**14.6 -> 32.4**. See [[grimtoll-230-stat-icons]] for why the worst case is a crew member and
not the Captain.

⚠ **A GEAR-CONDITIONAL TRAIT GOES IN `effStats`, BESIDE `sizeMismatch`, AND NOWHERE ELSE.** The
new trait is *Sleeps in the harness*: +1 STR, +1 MOR, **-2 MOR in anything under HEAVY**. ⛔ It
needed `bandKey`, which was declared ~6,800 lines BELOW `effStats`; a `const` read from above its
own declaration is the temporal-dead-zone throw that aborts the script, so the two thresholds and
the lookup moved up. `ARMOUR_BANDS` itself did not need to.

⚠ **THE SWEEP FOUND TWO SHIPPED LIES THE RENAME HAD NOTHING TO DO WITH**, both dead since #228
merged the `Ok` rung away: the standing reference listed **six rungs including Ok**, and `feral`
promised *+12% while Wavering or worse* while the code tests `state!=='steady'` (i.e. Shaken).
**Reading every string that names a thing is how you find the ones that describe a build that no
longer exists.**

⚠ **A USER'S REPLACEMENT LINE CAN CONTRADICT A LIVE MECHANIC.** He rewrote Broken as *"Are
running from the map and will not participate in the battle"*, which drops the rally. RALLY still
works, so it shipped as *Routed. Running off the map and out of the battle, unless somebody
rallies them* - flagged to him rather than shipped as written. See [[grimtoll-text-style]].

⚠ **OPEN, and it is his call:** two ★ now meet on one roster row (the gold unspent-level star on
the name line, the captain's class mark below it) - different lines, different colours, but it is
#102's wrong-unit rule at its smallest.

**Gates all green on the final file:** `LINT()` 0 · map 0/0/0 · scale-aware floor 0 on four
screens and **proved by making it fire** · clip counter reports only the documented `#wMap`,
`#bField`, `#bLog` · `#iChar` paint-over probe `[]` on all four bodies · font-size literals 0 ·
padding literals `86px` alone (a `.moodwhy` 5px was caught by the file's own grep) · no em dash
added. See [[grimtoll-measuring-the-running-build]].
