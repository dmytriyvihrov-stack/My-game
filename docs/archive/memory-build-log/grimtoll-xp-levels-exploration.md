---
name: grimtoll-xp-levels-exploration
description: "#174 experience/levels - researched, ruled, specced AND BUILT on 2026-08-17 (8f.202, committed on main): XP instead of one random level a battle, cap 10 on a +50 triangle, race need ×.8/1/1.2, INT the learning rate, half to the line half to the hand, level-0 stranger on the muster wall, Total War ring, nothing on the field. The dial (1.5 XP a hitpoint) came out of the harness, not the spec"
metadata: 
  node_type: memory
  type: project
  originSessionId: 742cfb7d-0bb3-4c5b-a949-7d3f3b8fd020
  modified: 2026-08-17T15:34:30.399Z
---

**2026-08-17, one day end to end: research → his seven rulings → spec + mockup → "sounds good -
do it" → built, measured, four docs, committed.** Research `docs/XP_BENCHMARK_2026-08-17.md`,
spec `archive/BACKLOG_ENTRY_SPECS.md` §174, record `CHANGELOG.md` 8f.202 + `WHAT_TO_TEST.md`,
pictures `shots/174_xp_ring.html` (gate, mocked onto the live DOM) and `shots/174_after.html`
(built). Concept §8's *"Promotions, not XP bars / random is the point"* is rewritten, the old rule
kept as the rejected half at the `consequences()` site.

**His rulings, so nobody re-asks:** founders level 1 · one of three on every muster wall is level
0, cheaper, picks a trade on the sheet at his first level · random promotion GONE · nothing on the
battlefield, only the aftermath and the sheet · a gentle curve, a small step of power · intellect
modifies XP earned, race multiplies XP needed (rat .8 · human 1 · ogre 1.2) · a Total War ring.

**What is in the build:** `XP_TABLE=[0,100,250,450,700,1000,1350,1750,2200,2700,3300]`, `XP_RACE`,
`xpNeed`, `D.learn`, `levelUp` (the old alternation lifted out), `grantXP` (the one door),
`payFightXP` in `afterBattle` off `B.units` (⛔ never `G.party`), `payXPAll` for `fx.xp` on doors
(✦ LEARNED chip, no card uses it yet), `CLASSES.none` + `tradeOwed` + `takeTrade`, `xpRing`/`xpHover`,
`XPLAST` module state for the crew card's `✦ +N`, tiers re-keyed 2/4/6/8, `loadRun` gives an old
save its level's worth. `tools/harness.js` grew `opts.after(B)`.

**Three lessons that outlive it:** ⛔ **the spec's number was wrong and only the harness knew** -
2 XP a hitpoint read fine on paper and put founders at 4.7 after the eight fights; 1.5 shipped
(~4.0 six bodies / ~4.6 four), n=20, tail as a fraction never a minimum · ⛔ **a ring OUTSIDE the
bust took 8px off the text column and wrapped a trait line (65 → 91 a row)** - the second-tab
HEAD comparison caught it, and the ring went inside the box the bust already had · ⚑ **"no class"
is a KEY in the class table, not null**, so forty `CLASSES[p.cls].n` sites needed no guard.

**Still his:** the hand half is damage + kills as briefed and **the archer finishes ~a level ahead
of the spearwoman over the act** (one line in `payFightXP` to add damage taken / the class verb) ·
acts 2-4, which levels 5-10 are a promise about · the tavern brawl pays into a screen with no
receipt. Related: [[grimtoll-clarity-pass]] (a user-ordered addition like #108/#123),
[[grimtoll-combat-benchmark]], [[grimtoll-company-sheet]], [[explain-and-mockup-before-building]].
