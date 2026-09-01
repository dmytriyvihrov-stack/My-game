---
name: grimtoll-verb-animations
description: "#87 the verb has a shape - SHIPPED 2026-08-10: eight animation primitives keyed on what an act DOES, hung off spend() and strike() so both AI brains inherited them free"
metadata: 
  node_type: memory
  type: project
  originSessionId: c53f3d22-a991-41c8-81b9-52b16d230e39
  modified: 2026-08-10T09:51:16.755Z
---

**#87, shipped 2026-08-10 (build log 8f.116).** The user asked for *"proper animation for all skill
moves... small but distinct. If push or kick - kind of wind in that direction. If sweep or scare -
to show that it has impact."*

**What it found:** thirty verbs sharing three animations (`.lunge`, `.recoil`/`.evade` +
`.hitflash`, `.shot`), all written for one act - a body hitting a body. A KICK looked like a sword;
a SWEEP played one lunge per neighbour, so a brute in a ring of four read as four attacks for two
actions; and ROAR · COMMAND · HOLD THE LINE · SPEAR WALL · THE FEN ANSWERS · SHE CALLS THEM IN put
**nothing on the board at all**.

**What shipped:** eight primitives, not thirty animations. GUST (displacement) · ARC (a sweep) ·
RING (a radius) · TETHER (one body has hold of another) · MOTES (something landed and stayed) ·
PLATE (something closed over you) · SHUDDER (it reached you where you stand) · GHOST (the body was
here and is not).

## ⚑ The four lines worth carrying to the next thing

1. **`spend()` IS THE ONE DOOR EVERY PAID ACT IN THE GAME PASSES THROUGH.** `aiTurn`, `autoStep`
   and the player's click all call it, so hanging actor-centred behaviour there means both brains
   inherit it **untaught** - which is the standing trap in this file (see [[grimtoll-game-project]],
   "two brains, one behaviour"). `strike()` is the matching door for anything carried by a blow.
   Only four verbs needed a hand-placed call, and all four are player-class acts reached through
   `clickHex`, which is also AUTO's door. **Before writing a behaviour into eight handlers, look for
   the one function they all already go through.**
2. **DERIVED, NOT DECLARED, AGAIN.** The dispatcher reads `act.push` / `act.sweep` / `act.fear` /
   `act.buff` / `act.venom`, never a name - the same rule `gathers` established. Anything that later
   grows a `push` gets its gust the day it is written.
3. **A RING TRAVELS OUTWARD AND MEANS BROADCAST; A PLATE SNAPS INWARD AND MEANS PROTECTION.** One
   opposition, and it is what tells COMMAND from HOLD THE LINE with no word on screen. Same shape of
   argument as [[grimtoll-dodge-vs-miss]]: **a recoil says you went back, a shudder says it reached
   you where you stand**, so the scare verbs were never allowed to borrow the recoil.
4. ⛔ **A STILL FRAME CANNOT PAY THE PICTURE GATE FOR AN ANIMATION.** The gate picture was
   `shots/87_skill_animations.html` - a **live sheet holding the exact CSS that ships**, 23 verbs
   looping at the real pace with a ×1 / ×1.75 / ×2.50 switch. It doubled as the implementation
   source. A hand-drawn mockup of motion is a lie the real screen cannot tell, and `shotBoard()`
   only ever catches one frame.

## Traps and open remainders

- ⚠ **`hexSpan()` MEASURES ONE HEX OFF THE LIVE DOM, never a constant.** A hardcoded 42px would
  have drawn a two-hex ROAR as a four-hex one at CLOSE. It goes through the same `relPt()` contract
  `hexPt` uses, which is #66's rule ([[grimtoll-obstacle-height]]'s neighbour).
- ⚠ **The `aoe` ring belongs at the RELEASE, not at the click**, and testing found it: every aoe
  school is arcane with a `dmg` pair, so `gathers` is true for all of them and `clickHex`'s own
  `a.aoe` branch is **unreachable**. BLIGHT-WIND is only *named* on the click.
- ⚠ **Every keyframe on `.usp` must end in `scaleX(var(--flip,1))`** or a mirrored body flips for
  the length of it. Pre-existing rule; SHUDDER had to obey it.
- **Open:** the held-spell tether is a flash, not a persistent line. **Three radii are named rather
  than derived** - ROAR's 2, COMMAND's 3, HOLD THE LINE's 2 exist only as literals inside their
  handlers, so a retune leaves the ring drawing the old number.
- ⚠ **Nobody has watched it animate.** The hidden pane composites no frames; every claim is a
  DOM-and-duration assertion plus the standalone sheet.
- ⚠ **It adds motion to a screen the 2026-08-10 feedback already called crowded**
  ([[grimtoll-clarity-pass]]). It adds no card, option or text - it is legibility - but the
  per-round motion budget is a real question and it is written into the backlog's focus block
  rather than left to be discovered.
