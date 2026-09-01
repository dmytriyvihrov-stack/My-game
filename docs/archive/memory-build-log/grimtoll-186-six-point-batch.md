---
name: grimtoll-186-six-point-batch
description: "#186 (8f.206, 2026-08-18) shipped and deployed: 'One of us' reinforcements off the Circle ring / wedding kin, ember burning ground on rocky+forest, gem-for-a-level once a run, sure hit after two misses (player side), nine-word objective cheer, two kill mutters; plus two harness traps found on the way"
metadata: 
  node_type: memory
  type: project
  originSessionId: 30ce8845-319d-4b87-b3a2-339c2e32b933
  modified: 2026-08-18T09:13:38.161Z
---

**#186, 2026-08-18, six user notes, all built and deployed (commit bc40d03).** The rules live in
the code comments beside each constant (`REINF_ODDS`, `EMBER_HIT/BURN_TICK/BURN_TURNS`,
`blaze/blazeOdds` on TERRAIN, `SURE_AFTER`) and in `docs/WHAT_TO_TEST.md` §186. Open dials are
the user's: reinforcement odds .5, ember numbers 6/4/2, rocky .5 / forest .35.

**Why it matters later:** `reinforce()` is the first thing that reads a road CHOICE back into a
BATTLE mid-fight (via `p.mark==='circle'` and `G.kin`, saved in flags), and `envHurt()` is now
the one door for damage that has no attacker (fire). Any new hazard should go through it.

**How to apply / two traps:**
- ⛔ **`stage()` leaves `SIM.on=true`, and a later `runFight()` in the same page for a fight the
  practice field cannot finish (the Circle) hung the harness loop for 30s+.** HEAD in a second
  tab finished the same fight in 176ms, which is what proved it was state and not the change.
  Reload between `stage()` and `runFight()`, or the "regression" you find is your own leftovers.
- ⛔ **Environmental damage applied INSIDE `strike()` (a shove into the fire) must DEFER the fall**:
  strike's own `hp<=0` block runs a few lines later and credits the kill; a helper that drops the
  body itself makes it fall twice and say so twice. `ignite(d,why,true)` is the deferred form.
- ⚑ The user's own six-word line ("You ugly and you know it.") is canon over LINT 11's five-word
  cap; the cap was protecting WIDTH, and the line is 25 chars like the five-word ones, so the
  bound moved to six with the reason written on it.

Related: [[grimtoll-game-project]] · [[grimtoll-clarity-pass]] · [[grimtoll-render-destroys-dom-state]]
