---
name: grimtoll-battlefield-patterns
description: "#90 and #93, both SHIPPED 2026-08-11: four named battlefield arrangements replace one random-blob generator, and the board is then DRAWN per battle from a terrain-owned pool"
metadata: 
  node_type: memory
  type: project
  originSessionId: 38e9215b-cecf-4f47-8053-df9ca5d3e4cf
  modified: 2026-08-11T07:12:58.204Z
---

## #93, an hour later: the board is DRAWN, not assigned  *(8f.120)*

User: *"make it so these diferent fields get into drawn in every batle randomly (so if it is in the
forrest or rock terrains - theres is more to drow from)."* He was correcting #90, and correctly: it
built four arrangements and then handed each fight exactly one, pinned, so the boards were still
frozen - just frozen at four instead of at one.

⚑ **A PLACE OWNS A `pool`, AND THE POOL IS WHAT THAT TERRAIN CAN PLAUSIBLY BUILD OUT OF WHAT IS
LYING AROUND.** The ridge draws from six because stone stacks, spans, scatters, piles and lies
about; the fen from five, the forest from four, the swamp and plains from three.

⚑ **TWO DICE, INDEPENDENT ON PURPOSE: the POOL draw picks the arrangement, the SEED draw picks
everything else.** That split is why the Sling-Line draws from a pool of one and still never gives
the same field twice.

⛔ **A POOL IS A PROMISE ABOUT WHAT MAY HAPPEN TO A FIGHT, NOT A LIST OF WHAT LOOKS NICE.** Four rows
narrow theirs, and linter rule 9f pins the three that matter BY NAME, because widening one back "for
variety" produces nothing that looks wrong - the Circle simply becomes winnable one run in three.
Fen-Mother pinned (`seed:29`, the only pin left; [[grimtoll-game-project]] notes #32 was filed
against that fight for never ending) · Sling-Line open · Circle broken · Blood on the Road draws
from three, holding `spine` and `broken` back to the second fight because the first already teaches
eleven things, which is [[grimtoll-clarity-pass]]'s "delay it rather than explain it".

⚠ **`strewn` stopped being an embarrassment** the moment variety became the point, and **the
forest's masses moved to STONE** on legibility: six trees among twenty-six trees is not an
arrangement, it is more forest.

⛔ **THE CORRECTION WORTH CARRYING: n=6 CANNOT TELL 0% FROM 20%.** #90's "0/8" rows were never 0 - at
n=40 the Circle is 5-10% winnable and always was. **Three decisions across these two entries were
nearly taken on eight runs and two would have been wrong.**

⚠ Safe only because **a battle is regenerated and never restored**; the two facts are now written in
each other's sight. Side effect, and a good one: re-entering a fight gives a new field, so a board
can no longer be learned by heart and reloaded onto.

⚑ **First entry in the project whose number was ISSUED rather than grepped for** - #92's
`tools/claim.ps1` handed out #93/8f.120 and its hook blocked a prototype edit mid-session. See
[[grimtoll-parallel-sessions]] if that memory exists; otherwise `docs/PARALLEL_SESSIONS.md`.

---

**#90, shipped 2026-08-11 (build log 8f.118).** User: *"create 3-4 different battfield patterns for
fields using in a fights in the first act (diffrent position of rocks, trees and other objects)."*

**The entry is the measurement, not the request.** Dumping the nine boards act 1 actually generated
showed: **seven of nine ran the same code** (2-4 random rock blobs, the only dial being the count),
**not one act-1 fight contained a single tree** (`scat:'trees'` meant "three clumps" and set no tree
count, so six fights carried the name of an object none of them had), and **the mass landed where
nothing meets** - lines meet in columns 5-9, and the blob sat at rows 9-12 on five boards, or at
columns 1-5 *behind the player* on the Thing in Armour.

⚑ **The rule that decided the shape of the entry: A PATTERN IS A DECISION THE GROUND FORCES; A
DENSITY IS NOT A PATTERN.** "Four blobs instead of three" is a density. Each pattern is named for its
question: **ANVIL** (which side do you go round) · **SPINE** (which gap, and can you change your
mind) · **BROKEN** (is there a stone between you and the shot) · **FLANKS** (the short way exposed or
the long way hidden) · **OPEN**, kept on purpose for the Sling-Line.

⚑ **The material is the TERRAIN's, not the pattern's** - one spine is boulders on the ridge and trees
in the fen, because [[grimtoll-obstacle-height]] already made them behave alike when massed and #46
already made them differ when alone. So the shape is shared and the noun is not.

## The two findings that outlive the rows they changed

⚑ **A CENTRED MASS TAXES WHOEVER NEEDS RANGE.** The same anvil measured 17.0rd 5/8 in the middle of
the board and 16.4rd 7/8 at the top edge. The mass costs almost nothing; standing it between a
shooter and a closing boss costs a great deal. Consequence: **the Fen-Mother's famous 12-14 round
band is partly an accident of seed 29**, whose blob happened to sit on her approach lane. She is the
one fight #90 does NOT re-ground (the retired generator lives on as the named pattern `strewn`, on
#64's precedent), her board is byte-identical to what it was, and **whether to re-tune her is the
user's open ruling**.

⚑ **AGAINST TEN BODIES ANY WALL IS A CHOKEPOINT, AND A CHOKEPOINT IS EXACTLY HOW SIX BEAT TEN.** The
Circle (#74's unwinnable fight) was authored as ANVIL and would have shipped **winnable** at 4/8. It
is on BROKEN, the only arrangement that gives cover without giving a line to hold, and holds at 0/10.

## Method worth reusing

⚠ **Measure the noise floor with code that did not change.** The camp runs identical code on both
sides of the A/B and moved 6.0→6.2 rounds; the Fen-Mother's byte-identical board moved 13.3→11.4. So
±2 rounds is noise, and a 3-sample read is worthless here - an early 3-sample A/B "found" a doubling
that n=16 dissolved. See [[grimtoll-session-pacing]].

⚠ **`ls -t shots/` IS THE COLLISION TELL.** This was written as #89 and renumbered mid-session after
a parallel session's `shots/89_*` turned up on disk, timestamped twenty minutes earlier. **Neither
document said anything - both still read "next free #89"**, because code and shots are written before
docs are. Two sessions on one day were each nearly the sixth collision. The checklist is now: build
log AND all four docs AND the prototype AND `shots/`. See [[grimtoll-game-project]].

⚑ Gate paid in the game, not on paper: `shots/90_battlefield_patterns.html`, six boards serialised
out of the running generator via `grabUI()`/`shotUI()`, the old roll beside the new one for the same
fight. Nothing was added to the player's screen, which is what let it through
[[grimtoll-clarity-pass]]'s cut-delay-merge rule.
