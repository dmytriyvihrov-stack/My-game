# -*- coding: utf-8 -*-
"""#266 - the price ON TOP OF #265, and the one flag that survived n=30."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

D = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                 '..', '..', '..', 'docs'))

NOTE = (
 "⚡ **AND THEN #265 LANDED ON MAIN AND THE WHOLE PRICE WAS TAKEN AGAIN, ON THE MERGED BUILD, "
 "BECAUSE THAT ENTRY IS ALSO ABOUT ENEMY MORALE.** `FOE_NERVE` 1.25 gives the other side a quarter "
 "more pool; this entry takes the opening fraction down for both sides. The two pull opposite ways "
 "and had to be measured together, not reasoned about: **starting four 58% -> 50%, prepared six "
 "86% -> 84%** at n=15 a side against main. ⛔ **THREE CELLS FLAGGED AND TWO OF THEM INVERTED AT "
 "n=30, INCLUDING THE ONE THAT IS THE GATE.** THE THREE BELLS read 93 -> 60% at n=15 and **90 -> "
 "97% at n=30** (27/30 against 29/30), so the tutorial brawl is not merely still winnable for the "
 "starting four, it got easier; the SLING-LINE read 27 -> 0% and is **7 -> 30%** (2/30 against "
 "9/30). ⛑ **A 20-point swing at n=15 is three fights, and this entry has now watched six of them "
 "evaporate.** "
 "⛔ **THE ONE THAT SURVIVED IS THE FEN-MOTHER, AND IT IS A REAL INTERACTION RATHER THAN A "
 "SAMPLE: 77% -> 57% for a prepared six at n=30** (23/30 against 17/30), 14.5 -> 16.5 rounds and "
 "2.4 -> 3.1 bodies down. **She is the one body in the game whose BROKEN state is stronger than her "
 "whole one.** `desperateAt` fires at `morale/max < 0.16` and #38's note says why she has it: she "
 "does not rout, she goes DESPERATE, loses hitpoints a turn and hits harder. A lower opening mood "
 "is therefore a BUFF to her and to nothing else on the road - 300 x .78 is 234 and 300 x .64 is "
 "192, so she starts 42 points nearer the state she is dangerous in. ⚠ **`desperateAt` itself did "
 "not drift**: .16 still sits just above BREAKING's .15, which this entry did not move. What moved "
 "is how far she starts from it, which is the same change every body took and reads with the "
 "opposite sign on her alone.")

patch([("**Gates:** `LINT()` **0** on a fresh page · `gt.py check` 3 scripts 0 problems · floor `[]` and",
        NOTE + " **Gates:** `LINT()` **0** on a fresh page · `gt.py check` 3 scripts 0 problems · floor `[]` and")],
      path=os.path.join(D, 'CHANGELOG.md'))

patch([("| ⚠ **`#gtTip` is a child of "
        "`document.body`, so BOTH `ui-scales.md` §5 counters are blind to it**",
        "· ⚡ **re-priced on the MERGED build against #265** (four 58 -> 50%, six 86 -> 84% at n=15): "
        "three cells flagged, **two inverted at n=30** including the tutorial gate (THE THREE BELLS "
        "90 -> 97%, the SLING-LINE 7 -> 30%), and the one that survived is **the Fen-Mother, 77 -> "
        "57% for a prepared six**, because `desperateAt` makes her the one body whose broken state "
        "is stronger than her whole one and a lower opening mood starts her nearer it "
        "| ⚠ **`#gtTip` is a child of "
        "`document.body`, so BOTH `ui-scales.md` §5 counters are blind to it**")],
      path=os.path.join(D, 'SHIPPED.md'))

patch([("**What was measured, so you know what is NOT a bug.**",
        "**⚠ ONE FIGHT GOT HARDER AND IT IS THE FEN-MOTHER.** A prepared six wins **57% where it "
        "won 77%** (n=30, against the build with #265 and without this). It is not the mood pool: "
        "she is the one body in the game that does not rout but goes **DESPERATE** below 16% of her "
        "nerve, losing hitpoints a turn and hitting harder, so starting a fight lower on the ladder "
        "starts her nearer the state she is frightening in. **Play it before judging it** - a 57% "
        "boss for a prepared six is in the same band as the Circle and the Steading-Line, and this "
        "may simply be the fight finally being one. If it reads wrong, the lever is `START_NERVE` or "
        "her own `desperateAt`, not the ladder.\n\n"
        "**What was measured, so you know what is NOT a bug.**")],
      path=os.path.join(D, 'WHAT_TO_TEST.md'))

patch([("| **R3** · #266 |",
        "| **R4** · #266 | **The Fen-Mother got harder and nobody asked for that.** A prepared six "
        "wins **57% where it won 77%** (n=30 either side, against main with #265). It is a real "
        "interaction and not the sample: she is the one body in the game whose BROKEN state is "
        "stronger than her whole one (`desperateAt` at 16% of nerve - she does not rout, she loses "
        "hitpoints a turn and hits harder), so a lower opening mood starts her 42 points nearer it. "
        "Every other cell that flagged inverted at n=30, including the tutorial gate | **keep it and "
        "play the fen once.** 57% for a prepared SIX puts her beside the Circle (33%) and the "
        "Steading-Line (20%) instead of below the ordinary road, which is where the act's boss "
        "should sit, and it is a step toward what O1 is about rather than away from it. ⚠ If it "
        "reads wrong the lever is HER `desperateAt` and not the ladder - moving `START_NERVE` back "
        "would undo the ask on all fourteen fights to fix one |\n"
        "| **R3** · #266 |")],
      path=os.path.join(D, 'OPEN_QUESTIONS.md'))

print('merged price recorded')
