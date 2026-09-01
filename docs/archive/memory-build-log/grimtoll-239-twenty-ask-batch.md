---
name: grimtoll-239-twenty-ask-batch
description: "#239 the twenty-ask batch - LANDED + DEPLOYED 2026-08-24 (8f.262); salvage halved above 3 at one door, a level is worth +5% hp/+1 hit/+1 dodge, shops roll their own stock, BREAK DOWN in the stash; three asks were CHECKS and two were already true"
metadata: 
  node_type: memory
  type: project
  originSessionId: c3620ed0-f241-4804-a0b0-cf33f8122356
  modified: 2026-08-24T09:41:53.435Z
---

**2026-08-24. Twenty asks in one message**, grouped by screen at the user's own suggestion.
**Landed on main and DEPLOYED the same session** (2abcc92, 029dbdd, deploy 62c6d72). `work/twentyask`
was the only unmerged branch and every other desk was clean, so the land was a fast-forward.

**The three findings worth carrying, none of which was in the ask:**

- ⛔ **A "show me X" ask can be a "stop showing me Y" bug.** *"When picking the spear show its
  range"* - the spear's reach footprint had been drawn since #94. Counted by wash with the act in
  hand: **bow 46 amber / 0 teal, spear 12 / 22, sword 5 / 28.** The bow only looked like it worked
  because range 5 swallows the whole walk preview. The fix was `!rngA` on the WALK wash, and it cost
  the bow nothing because its teal was already 0. **Measure both the thing that works and the thing
  that does not, or you fix the wrong one.**

- ⛔ **Adding a derived readout catches the un-derived one lying.** The +5% hp per level forced a
  single `bodyHp`, and that found the field, the company sheet and the paper doll computing
  hitpoints THREE ways: the sheet printed the bare stat curve, so an archer's sheet said **50**
  while his own battle plaque said **45**. Nobody had reported it.

- ⛔ **A `#wDlg` card with `max-height` + `overflow-y:hidden` does not clip, it CRUSHES.** Three
  pictured shop rows overflowed Coldharrow by 165px; `#wChoices` is `position:sticky`, so the
  buttons won and `.bd` went to height **0** - the whole paragraph on the card, invisible. Every
  gate read 0 (the clip counter skips `overflow:auto`, and `.bd` IS auto). The measurement is
  `scrollHeight-clientHeight` on the CARD plus the height of `.bd`, and it is in
  `.claude/rules/ui-scales.md` §4b now. ⚠ And `replaceDlg()` FIRST: measured before it, the road-out
  button read y 811 on a stage ending at 760 - a soft lock that was not there.

**⏳ OPEN, and the one to raise first:** the wagon's 6/12/24 was NOT re-priced against the new
salvage curve, at the user's explicit call. A salvage-taking run now ends on **23-24 against 42**,
so tier III is a greedy-run purchase. The numbers are in the changelog row.

**⛔ UNRESOLVED: `clash` hit the harness guard twice** (`1rd DRAW/STALL`), both times as the first
`regress.js` after `gt.py eval` probes on the same page. **~155 clash runs on this build, 2 stalls,
not reproducible** in 145 targeted attempts across four setups. The lesson-card theory is disproved
(`nextTurn` returns early on `B.tutLock`, so 85 runs were done with `LEGACY.seen`'s `L_` marks
deleted before each). HEAD is 60 clean, which at ~1% proves nothing. Suspects are both harness-side
(`aiTurn` defers `routStep` through `later()`, which a synchronous loop never fires; and a
probe-driven page carries state `startBattle` does not reset). See [[grimtoll-harness-render-stub-trap]].

Related: [[grimtoll-238-wagon-on-the-road]] · [[grimtoll-event-card-rules]] ·
[[grimtoll-measuring-the-running-build]]
