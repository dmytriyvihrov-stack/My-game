---
name: grimtoll-sin-ledger
description: "#160 the Hold's men - the road now keeps a derived ledger of evil doors, and three lessons: a ledger the question writes into cannot be read by the answer; a card body that indexes it must survive being read out of context; the join fight's dial is the bill count, not the headcount"
metadata: 
  node_type: memory
  type: project
  originSessionId: 49c5592c-01ff-49e0-8ebe-ba77c2ae508b
  modified: 2026-08-16T13:13:02.584Z
---

**#160 / 8f.188, 2026-08-16, SHIPPED and deployed** (merged alongside #159, #161, #163, #164).

⛔ **AND THE MERGE IS THE HALF WORTH REMEMBERING.** #159 and #160 were built the same day in two
desks and collided three times in the prototype, and **every conflict was two independent additions
at one insertion point** - both sides were kept every time (#160's LINT check renumbered 6d→6e).
⚑ **Then the merged build's very first `LINT()` caught a real cross-desk gap**: #159's new
wedding-massacre door was marked evil with no `sin` phrase, because the ledger did not exist in the
desk that wrote it. **A linter written in one desk is what catches what another desk could not know
about** - which is the argument for writing the check in the same edit as the mechanism.

The user asked for enforcers who stop you on the road and read your crimes back to you, a parcel
for a company that has done nothing, and an "ask to join them" door on the bandit camp. What
shipped adds **`G.sins`**, the first thing in the game that remembers a pattern of behaviour.

⛔ **THE LEDGER IS DERIVED OFF THE ☠ GLYPH, NEVER OFF A HAND-KEPT LIST.** `markSin` reads
`ico:['evil']`, which #154 had already put on all eleven evil doors, so a twelfth written next
month joins untaught. Only the accusation PHRASE (`sin:`) is authored, because the card title says
where and the label says what you chose and neither is a sentence anybody could say aloud. **LINT
6d checks the pair in both directions.** This is #137's derive-it rule on its fifth surface.

⛔ **A LEDGER THE QUESTION WRITES INTO CANNOT BE READ BY THE ANSWER.** The Snare's third door
("ask for a place at their fire") is deliberately NOT marked evil, and it looks like an oversight
until you see why: `markSin` fires on the door that is clicked, and the card that door opens reads
`G.sins.length` to decide what the clan says back. A ☠ there would have told a company with a
clean ledger *"we heard about you"* about nothing it had done. The villainy sits on the door in
`joined`, where the deed actually happens.

⚑ **AND A DERIVED FACT DELETED A FLAG BEFORE IT WAS WRITTEN.** "One deed and you did not fight the
patrol" needs no `holdFought` test: fighting them is itself an evil door, so it can never leave you
at one. All three answers are `sins.length` alone.

⛔ **LINT CAUGHT A REAL HOLE ON ITS FIRST RUN, AND THE SHAPE GENERALISES.** `joined`'s body indexed
the ledger and capitalised the result, so `evBody` - which reads every card to scan it for tokens -
died on a clean company and took the whole of `LINT()` with it. The card is only REACHABLE with the
entries it quotes, which made the crash invisible in play and total in the one tool built to find
it. **A body that cannot be read out of context is a body nothing can check.** `sinAt(i,cap)` is
the one door now.

⚠ **AND THE STANDING WORD COUNTER WAS MEASURING THE WRONG THING** - see
[[grimtoll-event-card-rules]]. `.claude/rules/event-cards.md`'s snippet sums EVERY `after`, which
equalled "what the player reads" only while every door was shown to everybody. Branch-gated doors
(`needSins`/`maxSins`, and `needRace`/`needHurt` before them) break that: the card measures **183**
and the player reads **137 / 125**. The rule file now carries the branch-aware counter and the
lesson that **a function body must be measured on every branch it can take**, since `body()`
returns one string and a fresh page silently measures the clean one.

⛔ **THE JOIN FIGHT'S DIAL IS THE BILL COUNT AND IT IS NOT THE HEADCOUNT.** Measured n=15 a row
against a seasoned six plus the eight-body clan, counting only the ROSTER's losses: **5 bills won
12-13/15, 6 bills won 8/15, 18 coats with 6 bills won 4/12 - and a crossbow is worth nothing
measurable.** One bill is twenty-seven points of win rate, because a reach-2 body behind 58 armour
is a wall two parties cannot open before the bows work. ⚑ **The first three passes read as noise
because they moved the count, the plan's columns and the bows together and no delta could be
attributed to any of them.** Change one at a time.

⚠ Two placement traps worth keeping: **both road stops are anchored to `stepsToGoal()`, a distance
from `QUEST_GOAL`, never to a node id** (`armourWhere`'s lesson, and LINT 8c enumerates all eight
roads to prove each passes exactly one node per band and that neither band is a fight or leads into
one). And **`build()` clamps a foe's column at `COLS-2`**, so a plan written at cols 10-13 arrives
as a single file against the east wall - plan two columns west to get real ranks.

⛑ **Filed as its own task, not fixed here: a lost harness fight can delete a run save.** `checkEnd`
sends a non-`BEATEN` loss to `toDefeat()`→`clearRun()` **asynchronously**, after the harness's
synchronous loop has returned, which is why a same-call canary misses it. #157 fixed the WRITE and
left the DELETE. localStorage is partitioned by PORT, so a desk on its own port cannot touch the
save the user plays on.
