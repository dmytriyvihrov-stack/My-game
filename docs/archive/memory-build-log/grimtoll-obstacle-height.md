---
name: grimtoll-obstacle-height
description: "#82 SHIPPED 2026-08-04: obstacles carry a HEIGHT, a spear stops reaching through trees, an arrow crosses a fire. The lesson is that one map was answering two questions."
metadata: 
  node_type: memory
  type: project
  originSessionId: 3a38dd3f-c157-4e25-a692-5299d7d406b8
  modified: 2026-08-03T22:10:14.527Z
---

**#82, shipped 2026-08-04, build log 8f.108.** The user's whole ask was one sentence:
*"Spearmen can't hit through the tall objects (tree, group o rocks). Independent rock medium-small.
But archers can shoot through smaller objects (like fire)."*

⚑ **THE TRANSFERABLE LESSON, AND IT IS THE ONLY THING WORTH CARRYING: `BLOCKED{}` WAS ANSWERING TWO
DIFFERENT QUESTIONS.** *Can a body walk here* and *can a shot cross here* had the same answer for a
year, so one map served both, and the day the answers had to differ the map could not. **When a
single table is consulted by two unrelated verbs, the split is already overdue.** This is the third
time this exact shape has appeared in the codebase: `walkable` was answering *can I END here* vs
*can I CROSS here* (#68), and `a.range` was answering *is this an archer* (8f.49).

The shipped rule, in three rows:

| height | what | arrow | reach-2 thrust |
|---|---|---|---|
| TALL | tree · huge · wall · **a rock touching another rock** | BLOCKED | refused |
| MED | an INDEPENDENT rock | **COVER, -14** | allowed |
| LOW | fire · flower | CLEAR | allowed |

Things a later session needs:

- **No new terrain kind was added.** `loneRock` (written for #46 so an ogre may only lift a boulder
  standing on its own) is exactly the test that separates a spine from a stone. #61's rule holds: a
  terrain kind is a place with its own rule, and height is a dial.
- ⛔ **A BODY NEVER REFUSES A SPEAR.** The thrust's lane test asks about TERRAIN ONLY. Fighting over
  the person in front of her is the whole spearwoman, and a version reading bodies deletes the class
  in one line. Same reasoning will apply to #47.
- **The refusal lives in `mayAim`, so both brains got it untaught**, with the twin gate in `clickHex`
  and the offer withdrawn in `render` (never lit-then-refused). `reachBlocked()` and `heightAt()`.
- ⚑ **The lane is worth the WORST thing in it, never the sum.** Boulder + body = -22, not -36. Two
  costs added is a number nobody can predict off the board, which defeats the point of naming states.
- **COVER slotted into the `SHOT{}` ladder in one line because that ladder was already sorted by
  cost.** A design that orders its states by what they cost absorbs a new state for free.
- ⚠ **`losState` is memoised on where the BODIES are, and a lifted boulder moves no body**, so
  `terrMoved()` now clears the lane cache at all three mid-fight writes to `B.terr`. And a rock's
  height depends on its NEIGHBOURS: lift half a pair and the other half re-heights without that hex
  changing at all.
- ⚠ **It demoted a line of #46**: the thrown boulder was *"the only way to turn a BLOCKED lane back
  into a shooting lane"*, and a lone boulder no longer blocks. What the lift buys now is removing
  cover. Written down at the site rather than left to be discovered.
- Open: **-14 is chosen, not measured** (#50 owns it), an archer is worth more on every generated
  board now, and the bloom flower was filed LOW without an argument.

See [[grimtoll-game-project]], [[explain-and-mockup-before-building]] (the gate was walked: rules,
then `shots/82_obstacle_height.html` before any code, then the after shot and a `WHAT_TO_TEST.md`
section), and [[grimtoll-session-pacing]].
