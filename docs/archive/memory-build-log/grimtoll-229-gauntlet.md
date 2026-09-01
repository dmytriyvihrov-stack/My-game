---
name: grimtoll-229-gauntlet
description: "#229 the Gauntlet battle bench (LANDED 2026-08-21, 8f.252) + #258 its 2026-08-27 update (8f.283, e065f71): an iframe bridge drives the whole engine with zero build changes; what goes stale in a live-loading tool is what it CARRIES, not what it reads - the strategies now come off ORDER_PROF and the founders' calibration is measured (108, not the hardcoded 100); a build picker made the Snare's 30%->100% drift visible; a hidden tab starves even synchronous JS"
metadata: 
  node_type: memory
  type: project
  originSessionId: c2913e95-edfd-432d-9369-a44d97e043e4
  modified: 2026-08-27T10:14:57.110Z
---

**#229 (8f.252), 2026-08-21, commit 97e066c on `work/gauntlet`.** `tools/gauntlet.html` measures
every fight in the campaign: a bench (any `simComps()` company, leveled by `simLevelTo`) and a
campaign walk (founders march, XP via `payFightXP`, banks spent by the #216 policy, joins
editable), each cell win% / median rounds / down / hp-lost under three `AIP.you` strategies (the
brain · aggressive · steady), seeded, with a Δ column against the previous same-setup run. Spec in
`BACKLOG_ENTRY_SPECS.md` §229. **NOT landed**: main held 601c581b's uncommitted #226-#228, so
`branch.ps1 land` picks it up when sessions stop. Open it at
`http://localhost:8777/tools/gauntlet.html` after landing (needs `serve.ps1`, not `file://`).

- ⚑ **The iframe bridge is the whole architecture**: `fr.contentWindow.eval(src)` runs in the
  child's global scope and SEES the game's top-level consts (the same indirect-eval door
  [[grimtoll-session-pacing]]'s `harness.js` has always used), so a standalone tool can drive
  `startBattle`/`aiTurn`/`fightPts` with not one line changed in the prototype. The dramaturge
  parses the source TEXT; this one needs the ENGINE, so it runs the page instead.
- ⛔ **`SEENF.mark` must be stubbed in any measurement loop** - a run may never unlock a spoiler
  fight. ⚠ `tools/harness.js` `runFight` predates #216 and does NOT stub it: regression runs mark
  `gt_seen_fights` on the dev origin. Harmless there (TEST.on opens all), worth fixing on the next
  harness touch.
- ⛔ **A hidden tab starves even SYNCHRONOUS JS, not just timers.** The 14MB game boot went from 8s
  visible to over 45s hidden, and a 17s grid to many minutes. So: MessageChannel for every yield
  (parent page too, not only the game shim), **no deadline on a boot poll** (show elapsed instead;
  a timeout reads as "broken" when the truth is "slow"), and WHAT_TO_TEST tells the user to keep
  the tab fronted.
- ⚑ **Two identical runs report ZERO deltas (measured), but engine state carries across fights
  within a page session**: ~40 console-probe fights before a full run shifted later cells (Broken
  Men 70→60, mirehares 50→30, same seeds). Root cause not found; the honest rule shipped instead:
  RELOAD BUILD before a comparison you intend to act on. The Δ loop (edit → reload → run) is
  clean-room by construction.
- **First findings, for the balancing pass** (mirror-AI caveat from [[grimtoll-combat-benchmark]]
  stands: a mirror loss can be a hard human win): the #216 `simBands` mislead BOTH ways (Broken
  Men banded HARD measures 60-90%, Sling-Line banded HARD measures 100%; the PAST HARD tier is
  honest at 0-30%) · strategies split per fight (STEADY holds the palisade, AGGRESSIVE eats
  breakable humans and collapses at the Snare 20% vs 80%) · ⚠ **a fifth body or a third level can
  FLIP the Sling-Line from 10/10 to 3/10** (founders+Asha 3/10, founders L3 5/10 vs L2 10/10;
  cross-checked `ARENA.match('four','slingline',8)`=8/8 agrees with the tool's 10/10).
- ⚠ **Check `/json` before assuming a CDP port is yours**: 9411 held another session's headless
  Chrome on a `battleodds` desk; probing it timed out and looked like my bug.
- ⏳ Open: the in-game AUTO / auto-resolve strategy picker off the same three profiles (one caller;
  waits on the prototype + a mockup) · the band-multiplier retune · the fifth-body question.

## ⚑ #258 (8f.283), 2026-08-27, commit e065f71 on main - THE TOOL STOPS CARRYING WHAT IT CAN READ

*(The user: "хей, живой ли этот тул? можеш обновить его с последнего билда рабочей игры".)*
**It was alive** - live-loading means six days of #250/#252-#257 were already in it and every symbol
the bridge names still resolved. **What goes stale in a live-loading tool is what it CARRIES.**

- ⛔ **The strategies are read off `ORDER_PROF` now.** #242 had copied #229's two rows into the
  build for the practice field's dev orders and written the hand-sync warning in BOTH files; that
  is the five-times-merged shape (`choiceNote` #150 → `payMat` #239). ⚑ **Deriving it is what the
  build ASKED for** - `defensive` ships marked FIRST-CUT with *"the numbers get measured in the
  gauntlet"* beside it, and it arrived untouched. Fallback literals kept, and named on screen,
  because the tool must open a build older than #242.
- ⛔ **A TOOL CAN CARRY A SECOND RECEIPT TOO.** The status line asserted *"founders price at 100 by
  calibration"* as a **hardcoded string** - `PTS_SCALE`'s own words - so the one number certifying
  the whole points column was the one nobody read off the build. **Measured: 108.** Taken once per
  RELOAD BUILD now. ⚑ The game's card rule (prose and receipt may not say the same thing) applies
  to instruments, and this is the second time it caught a hardcoded number in a tool.
- ⛑ **A BUILD FILE picker makes `ui-scales.md` §5's second-tab baseline pressable.** ⚠ The Δ store
  deliberately does NOT key on the path - cross-build comparison is the point - so it stores the
  build it was taken on and warns in words.
- ⚑ **THE FINDING, and it is why the picker exists**: founders/brain/n=10, 8f.252 → today,
  **THE SNARE 30% → 100%** (3.1 down → 0.2), cross-checked on `ARENA.match('four','snare')`
  **1/6 → 6/6** against that fight's own header note of *"~3 of 10 in mirror-AI"*. **Sling-Line
  100% → 60%**, Broken Men 60% → 90%, clash still 100% but 5rd/0.4 → 8rd/1.4. Filed as `O1`.
- ⚠ **`defensive` is indistinguishable from `steady`**: byte-identical on 6 of 12 fights. `O2`
  recommends `hold` as the honest defensive lever - no order touches it, and it is the one knob
  meaning *make them come to you*.
- ⏳ **`tools/harness.js`'s `runFight` still does not stub `SEENF.mark`** (the gauntlet does), so a
  regression run marks spoiler fights on the dev origin. One line, next harness touch.
- ⚠ **Check `/json` before assuming a CDP port is yours** (again): 9411 held another desk's browser.
  And `probe.py` in the scratchpad hardcodes a repo path - a landed desk breaks it.
