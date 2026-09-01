---
name: grimtoll-212-crowded-lane-and-asha
description: "#212 - COMMITTED on desk work/asha-lane 2026-08-20 (8f.235), NOT landed: an ally in the archer's lane is a PRICE now (CROWDED -20), Asha keeps the id 'ash', and campPool gained afterNode - its first gate that is a PLACE"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1e4e2fbd-5cd6-4373-90cf-d5640d0c3de9
  modified: 2026-08-20T16:02:03.420Z
---

Three notes in one message (2026-08-20): *"change full block of ally for an archer, it reduses
accurecy rather then block fully"* · *"Not name ash - but Asha"* · *"Event on the road with asha a
bit later - after fen mother (when she tells stories)"*.

⚠ **STATE: committed as `19a8d4a` on the desk `work/asha-lane`, NOT on main.** `branch.ps1 land`
reports it waiting, and `-Go` was deliberately NOT run because step 1 would have committed ANOTHER
session's uncommitted `prototype/grimtoll_slice.html`. See [[grimtoll-parallel-sessions]].

⛔ **`losState` COUNTED BODIES AND NOW COUNTS ENEMIES.** The old rule was `seen.length>1 -> BLOCKED`,
so any two bodies withdrew the shot and the commonest way to lose a bow for a turn was **your own
line closing up in front of it**. A withdrawn offer reads as the game taking the turn away rather
than as a position to fix. The block is taken off the FOES in the lane alone; your own people cost
**CROWDED, -20**.

⚑ **THE CHANGE IS FIVE LINES BECAUSE #82's LAW ALREADY DECIDED THE HARD PART**: *the lane is worth
the worst thing in it, never the sum*. One enemy is -22 whether or not your shieldman is there too.
And the one-word ladder has been sorted BY COST since #82, so -20 placed itself between OBSTRUCTED
(-22) and FAR (-18) with no argument. **A ladder sorted by cost is what makes a fifth state cheap.**

⛔ **THE REFUSAL IT REPLACES WAS COPIED INTO FOUR PLACES**, twice in each AI brain, as
`k!=='BLOCKED'&&k!=='OBSTRUCTED'`. `laneClean(u,t)` off `LANETIER` is the one predicate now. ⚠ **And
the AI's PREFERENCE had to GROW, not shrink**: #36's contract is *an archer who occasionally puts one
through his own shieldman reads as broken*, and that reading got MORE likely the day the lane stopped
refusing him.

⛑ **TWO BOARD LIES, BOTH FOUND BY READING THE DOM RATHER THAN THE CODE.** `clickHex`'s BLOCKED line
still said *"you would be shooting your own people"* - the one case it can no longer reach. And
`inWay` marked ONE body off `los.who`, in a state that is by definition about several: the board told
the player to move the front man and the lane was still crowded once he had. `los.all` is **the
bodies the VERDICT is about**, which is not the same list as everything in the lane - one of theirs
plus two of yours is OBSTRUCTED, and marking your two men would name the wrong bodies.

⚑ **PROVED WITH TWO HEADLESS BROWSERS ON THE SAME BOARD** (see
[[grimtoll-measuring-the-running-build]]): `git show HEAD:` says **BLOCKED / mayAim false / no
odds**, the new build says **CROWDED / mayAim true / 29%**.

**Asha keeps `id:'ash'`.** The id is not a name: `castMember`, `member()`, her sprite
`ratkin_you_thief`, her portrait `POR10` and every run in `localStorage` reach her through it.
Renaming it renames her in five places that are not the screen. Only `name:` and `LINT`'s NAMES list
moved.

⛔ **`afterNode` IS `campPool`'s FIFTH GATE AND ITS FIRST THAT IS A PLACE.** The four before it ask
about PEOPLE, and **a cast gate is not a timing gate**: `castMember:'ash'` looks like a delay and is
not one, because she joins at the fourth node. So the card about *a woman who has never told anybody
her story telling it* was being dealt at the first or second fire, to strangers. Now it waits for
`G.visited['mother']`. ⚠ A NODE ID, never a day count (`armourWhere`'s note: a rule anchored to
PROGRESS breaks silently on a map reorder). ⛑ `LINT` reads both silent failures - a node the map
lost, and a node only some companies walk - **proved by moving the gate into each fault on purpose**.

Related: [[grimtoll-201-ratkin-romance]], [[grimtoll-event-card-rules]],
[[grimtoll-safe-file-patching]].
