---
name: grimtoll-205-feedback-three
description: "#205 the three feedback bugs - BUILT 2026-08-19 (8f.227), not deployed: a health bar whose fill was a sub-pixel accident, no warning before a parting swing, and a tutorial that deadlocked on one man's nerve"
metadata: 
  node_type: memory
  type: project
  originSessionId: 625c8e05-3f62-4e4a-806e-76294e446345
  modified: 2026-08-19T21:32:00.223Z
---

Three items out of a collected-feedback round, all three landed in `prototype/grimtoll_slice.html`.
**Built and gated, NOT deployed** - `index.html` was deliberately left stale; the user's call.

⛔ **1. A `zoom` SCALES COMPUTED LENGTHS, SO A BORDER IS NOT THE PX YOU TYPED.** The token health
bar (`.ubars div`) was `height:2px` with a 1px border under `*{box-sizing:border-box}`, so its fill
was `2 - 2 × border`. The board is drawn inside a camera `zoom`: one stop computes the border at
**0.513px** (0.97px of red survives) and another at **1px** (**exactly 0**). The same build painted
a hairline on one machine and nothing on the next, which is why it was reported as "Android and Mac"
and nobody could see the cause. Rows are 4px/3px now; the anchor moved to `--head - 9` so the 1px of
clear air over the head is the same 1px. See [[grimtoll-measuring-the-running-build]].

⛔ **2. A SCRIPTED EXIT MAY NOT HANG OFF A NUMBER THAT OSCILLATES.** Every wave of the tap-room
brawl is gated on Harl leaving the room. `capTick` zeroes his nerve; `beginTurn`'s situational block
hands **8 of his 52 back at the top of his own turn - .154 against a .15 break threshold**. So he
fled on even rounds and walked back at the Captain on odd ones, forever. Found by trapping the
position setter and reading the call stack (`walkTo<tavernFlee<aiTurn` against `walkTo<step<aiTurn`),
not by reading the code. It now reads the script's own flag.

⛑ **AND TWO MORE DEFECTS WERE SITTING BEHIND IT.** `tavernPlace` fell back to the PREFERRED HEX,
occupied or not - **two bodies on one hex is one body**, because `at()` returns the first, so the
second is on the field with no way to see it or hit it (reported as "he never came in"). And
`checkEnd`'s catch-net fired wave two, which puts a KNIFE on the field, then **fell through to the
win on a foe count taken before it fired**; wave three (the crew) was never in the net at all.

⚑ **`partingRisk(u)` IS NOW THE ONE LIST** for the zone of control's price: `partingShots` swings
from it, the UNDO `clean` test is its emptiness, and render draws it (**⊘⚔** on the hex you are
leaving, a red drop-shadow on every sprite that will swing). #173 had named four places that must
agree; the picture was a fifth, so the test stopped being copied. It clears the instant DISENGAGE is
pressed, because `safeMove` empties the list. ⚠ **MOVE is restored inside `render()`** (#91's
standing default), so the warning is up from the moment the turn opens and goes when an attack card
is picked.

⚠ **A stray `*/` closed the new CSS comment early and the prose after it was parsed as a selector,
which ate `.hin>.zwarn` whole. `#cssTail` did NOT fire** (the parser recovered at the next brace) and
the file read correctly. Found by reading the mark's COMPUTED style - colour bone, 16px, z-index 1.
See [[grimtoll-unverified-comment-is-a-defect]] and [[grimtoll-safe-file-patching]].

Gates all clean: `LINT()` 0 · nothing under the 10px floor · overflow diffed against a
`git show HEAD:` baseline in a second tab · map counters 0/0/0 · the #194 road check 0.
