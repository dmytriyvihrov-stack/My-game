---
name: grimtoll-193-mirehares
description: "#193 the MIREHARES (doe leaps exactly 3 and hits on landing, buck charges one of six cube axes) + the road card THE RED LIGHTS - IN THE BUILD 2026-08-19 (8f.212); the buck stood still for 85% of the fight and two separate measurements lied about it first"
metadata: 
  node_type: memory
  type: project
  originSessionId: 22aadaab-f2a1-41bd-9c5f-6a7e26a55c7f
  modified: 2026-08-19T06:47:08.929Z
---

**#193 (8f.212), 2026-08-19. IN THE BUILD** - `prototype/grimtoll_slice.html` and the generated
`index.html`, both parsing clean. Art was made by the user in a separate tab and was already on disk.
Spec: `BACKLOG_ENTRY_SPECS.md` §193. Bench: `tools/mirehare_bench.js`, which **defines nothing** and
only measures.

⛔ **NEITHER BODY MAY WALK.** `noWalk:true` makes `build()` skip the prepended MOVE act, so the leap
IS her move and the charge IS his. **doe** `mirehare_f` 88/18, THREE-HEX LANDING cost 2, hits what she
lands on. **buck** `mirehare_m` 68/10, STRAIGHT CHARGE cost 2, up to 4 hexes down one of six cube
axes, needs 2 hexes of run to be allowed at all. Fixed 2+2 on `swamp`. Card **THE RED LIGHTS**, art
`EV32`.

⛔ **THE BUG, AND HIS ONE SENTENCE IS WHAT FOUND IT.** *"I want some damage, if player ignores logic
of this enemy"* - no win rate would have. With no walk to fall back on, each verb only fired when a
target was **already** on a legal ring hex or lane, so `mirehareMove` returned false and the turn
ended: **the buck stood still for 85% of the fight**, the doe 33%. A creature whose whole rule is
*block his lane* teaches nothing when the lane is never threatened. ⚑ **The fix was the second half
of each verb, not a new verb**: same geometry, same lengths, used to REPOSITION when it cannot
strike, paying no damage when it does. 0% wasted after; charges 1.7 -> 3.3 a fight.

⚑ **TWO MEASUREMENTS LIED FIRST, AND BOTH LOOKED PLAUSIBLE:**

1. ⛔ **A NAIVE IDLE COUNTER READ EVERY SPENT TURN AS A WASTED ONE.** Both acts cost 2 of 2 actions,
   so the engine calls `aiTurn` again, `canUse` correctly refuses, and from inside the verb a spent
   turn is indistinguishable from a wasted one. It reported 90%/59% where the truth was 85%/33%.
   **A turn is only wasted if the body could still have PAID for the act.** Anything wrapping an AI
   verb must ask what the engine would have allowed, not what the verb returned.
2. ⛔ **THE BROWSER SERVED A CACHED 14 MB PROTOTYPE.** Three runs of "after the patch" numbers were
   really the unpatched build. The tell is cheap and is now the standing check:
   `someFn.toString().indexOf('<a phrase only the new code has>')`, **in the running page**. Add a
   cache-busting query string after editing the prototype. This is the same lesson as #192's silently
   reverted hunk: on a shared tree the tool's word is not the evidence.

⚑ **WHAT IGNORING IT COSTS, and the mechanism is not what the design claims.** Same fight, same
company, same brains, only the opening positions moved: **stood off 0.83 of yours down / 178 taken**
against **closed to contact 0.08 / 121**. Ten times the people. ⚠ But damage per ROUND is 29.7 vs
29.5 - identical. What closing buys is a **4.1-round fight instead of 6.0**. It is a TEMPO answer,
not a denial. Two levers if that is not enough, both untaken because he said *"Do not redesign the
Mirehares"*: the doe's landing hitting the whole ring, or the buck's dice scaling with the run.

⚠ **The detour door prints its price twice** (`−2 days` chip plus his authored *"the journey takes two
days longer"*). His text, so it stands; dropping the `c:` is one word. ⛔ **One ruling still his**:
whether *"strait and vertical"* means the six hex lanes, since a screen-vertical column is a zigzag
and there is no seventh straight line on a hex grid.

⚠ **`claim.ps1` HANDED OUT A SPENT NUMBER.** It issued #192, already used by the item pack, because
the backlog table writes entry numbers as bare `**192**` and the scan only matches `#192`. See
[[grimtoll-parallel-sessions]]. Entry took #193 instead.

⚠ **#195 (2026-08-19) FOUND TWO THINGS ABOUT THIS ENTRY.** The hover overlay had been painting a
WALK for both of them (they have `noWalk:true`), so the ring and the lanes were never on screen and
`peekThreat` had both counters backwards; and **`MB.gap()` measures the DEPLOYMENT, not the counter**, which is
why it reports the gap backwards on a later build - `arrange()` fires once and both counters are per-turn.
`MB.rules()` is the instrument that answers it: CONTACT 20/20 / 0.00 down / 46 taken against NAIVE 14/20 /
2.50 / 336. See [[grimtoll-195-hit-odds-and-mirehare-lines]].
