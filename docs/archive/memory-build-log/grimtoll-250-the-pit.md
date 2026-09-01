---
name: grimtoll-250-the-pit
description: "#250 the pit + practice-field lock + one-triangle mood float - LANDED + DEPLOYED 2026-08-26 (8f.275)"
metadata: 
  node_type: memory
  type: project
  originSessionId: f1c0cc71-3e88-4aa1-9979-a5d8e057cebd
  modified: 2026-08-26T07:00:02.548Z
---

**#250 (8f.275), 2026-08-26.** Three asks: a PIT surface, lock the practice field until the road has
been taken, and simplify the morale float to one triangle.

**The finding worth carrying: a refusal stated in `mayAim` reaches both AI brains and the offer
ring for free, and it still does not reach the HIT ODDS.** The pit's melee ban went into `mayAim`
(#148's one-place rule) and `offerAtk` inherited it, so a foe in a pit had no offer ring - and `81%`
was printed over its head anyway, because the FIGURE comes off a hand-copied branch inside `render`
that repeats `mayAim`'s size gate and its oak. **#148 said four copies; that branch is the fifth
reader and it is still uncorrected** (the two pit clauses are repeated there with a note; the honest
fix is its own entry, because `mayAim` refuses a BLOCKED lane outright and that site draws one as
refused-red).

**The other one: `1 HEXES`.** Reachable since crippled-in-the-marsh and never once seen, because
nothing put a body on a budget of one often enough to notice. A pit does, on every climb. **A rare
branch is not a tested branch, and a new feature that makes it common is how you find out.**

**And the paint was a puddle until it was photographed.** The hex layer washes teal over the ground
canvas, so a blue-black mouth composites to exactly the colour `marsh` and `deep` wear. Warm black,
a lit crescent for the far wall (a hairline reads as an outline and an outline reads as a pond).

Key shapes, all in the code with their reasoning:
- **the rim is a DIFFERENCE, not a place** (`acrossRim`): two bodies in one hole fight normally;
- **the fall is what the shove BUYS** - forced in costs 10 through armour, walked in costs nothing;
- **`pitDue()` is anchored to `stepsToGoal()`**, the map's own shape, never a node id or a day count
  ([[map-dramaturgy-proposal]] / `armourWhere` is why);
- **`rocky` alone carries the dial**, and it needed no exclusions because the three fights on it are
  all in the back half of the road already.

✅ **LANDED + DEPLOYED 2026-08-26**, commit `49e1e09`, `deploy.ps1 -Player`. Both pages
carry it, asserted on the SHIPPED file rather than on the build's report: `pitClimb`,
`PIT_FALL`, `roadTried`, `fxmood` and `digPits` all present in `index.html` AND
`play/index.html`. See [[grimtoll-share-link]].

⚠ **Four rulings are waiting in `docs/OPEN_QUESTIONS.md` §H**: how wide the dial should be, whether
the enemy brain should AIM a shove at a hole (today only the player does, which is why the n=20
Steading-Line A/B moved nothing - 12.05 rounds against 11.20, 6 wins against 5), pit-to-pit melee,
and whether a body in a pit should still be able to shoot out.

Related: [[grimtoll-event-card-rules]] · [[grimtoll-session-toolkit]] · [[grimtoll-battle-screen-round-three]]
