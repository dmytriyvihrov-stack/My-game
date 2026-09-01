---
name: grimtoll-dodge-vs-miss
description: "#84 SHIPPED 2026-08-04: a dodge and a miss print different lines. The lesson is that the roll already in hand answered a second question, so no second roll was needed."
metadata: 
  node_type: memory
  type: project
  originSessionId: 907bf1f8-cff6-4a85-b42b-18901ebb9d74
  modified: 2026-08-04T13:46:24.922Z
---

**#84, shipped 2026-08-04, build log 8f.113.** The user's whole ask: *"Can you please make diffrent
messeges - when dodge and when miss"*. One `if` in `strike()` handled every failed attack roll and
did two contradictory things in the same breath: `say(a.name+' misses.')` blamed the attacker while
`fx(d,'DODGE',...)` credited the defender.

⚑ **THE TRANSFERABLE LESSON: THE VALUE ALREADY IN HAND ANSWERED THE SECOND QUESTION, SO THERE WAS
NOTHING TO ROLL.** `hitBreakdown().total` is `clamp(skill - dodge + flank + other, 5, 95)`, which
means the target's dodge is the only difference between two numbers the function already holds. So
`roll <= clamp(skill+flank+other,5,95)` asks *would this have landed on somebody who never moved?*
with no new randomness at all. **Rolling a second time for the flavour is the obvious version and it
is a different lie** - a blow that failed by 30 points would read as a nimble dodge one time in
three. When a derived number is a difference, the difference is usually a second fact you can read
for free. Pairs with [[grimtoll-obstacle-height]]: same family of finding, opposite direction (there
one value was doing two jobs badly, here one value could do two jobs honestly).

⚠ **CLAMP THE DERIVED THRESHOLD THE SAME WAY THE ORIGINAL IS CLAMPED.** Unclamped, a roll of 96
against a 95-capped chance reads as a dodge on an ogre with 2 dodge - the cap exists precisely
because those points are not real. Both clamps floor and ceil identically, so a target with no dodge
can never produce a dodge line.

**One word for three weapons is worse than three.** A bow does not swing and a working is not
sidestepped, so it is six lines: *swings wide / shoots wide / the working comes apart* against *leans
back out of it / twists, and the shot goes past / is not where it lands*. The arcane dodge line is
`hitBreakdown`'s own design comment ("you do not sidestep a blight-wind, you just fail to be where it
lands") finally said to the player instead of only to the next programmer - **a comment explaining a
rule to a reader of the code is often the missing player-facing line**. See [[grimtoll-text-style]].

**The board carries it too**: `animClash` took a fourth argument so the defender's `evade` plays only
when the defender is the reason, and a wide swing leaves them standing still.

**The distribution fell out rather than being designed**, and it is the part worth watching in
playtest: across a full `regress()` it is **51 dodges to 169 misses**, 10-12 dodges apiece in the dog
and slinger fights against **2 in the whole steading fight and 0 against the Fen-Mother** (ratkin
18-28 dodge, ogre 3, against a ~55 skill). The ogre fights now read *I keep swinging badly* and the
fast fights *they will not stand still*, which is what the stat block always said and the field never
showed. **No balance change: not one roll, threshold or damage number moved.**

Open remainder: the hover odds are still a single number, so a player cannot see how much of their
45% failure is the target moving. A split preview is a separate entry.
