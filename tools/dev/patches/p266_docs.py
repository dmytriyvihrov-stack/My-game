# -*- coding: utf-8 -*-
"""#266 - the five writes."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'docs')
D = os.path.abspath(D)

# ─────────────────────────────────────────────────────── 1 · CHANGELOG
ROW = (
 "| 8f.291 | **#266 - THE POOL IS 100, `STEADY` IS THE BAND A FIGHT OPENS IN, AND NOTHING IS BORN "
 "WITH ANYTHING.** *(User, 2026-08-29, nine asks off the company sheet.)* "
 "⛔ **`GIVEN.nerve` 90 -> 100** (*\"basic start is 100% (I don`t know, why some of my people have "
 "90)\"*). 90 was never a decision anybody defends - it is the figure the MOR ladder's +-10 a rung "
 "was authored around, so an ordinary body carried 90 and the Captain 110. ⚠ It is YOUR side only: "
 "a foe's pool is `t.mor` off its own statblock and has never come through `GIVEN`. "
 "⛔ **A SIXTH BAND, AND IT IS WHERE A FIGHT OPENS** (*\"Add intermediate more (steady) ... And your "
 "guys basic start on the middle of stead (aprox 55-60)\"*). `LADDER` is **It rocks .90 - Happy .72 - "
 "Steady .42 - Shaken .30 - Breaking .15 - Broken 0**, and `NERVE_RUNGS` moved with it because "
 "`restate`'s own comment says the two are one fact in two places. #228's merge is KEPT - both free "
 "rungs cost nothing and both are mechanically `steady` - and what it left the game without was a "
 "NAME for where a body stands: a fight opened in the middle of a 38-point band called Happy, so the "
 "first word every player read was the second-best rung in the game with nothing under it but bad "
 "news. ⛑ The two free rungs say different things rather than the same thing twice: one is a step "
 "from the top rung, the other a step from the first penalty. "
 "⚡ **AND THE NUMBERS ARE THE ONES THEY ARE BECAUSE ±15 IS EXACTLY HALF THE BAND.** Steady runs "
 ".42-.72, its middle is .57 and that is `START_NERVE_YOU`; `moodFx().start` runs -15 to +15, so a "
 "company at HIGH SPIRITS opens on the top edge of STEADY and one ON THE BRINK on its bottom edge - "
 "the company's mood is worth precisely one band and cannot be worth two. Measured on the shipped "
 "four: **57/100 at AT EASE, 72 at HIGH SPIRITS, 42 ON THE BRINK**. `START_NERVE` went .78 -> .64, "
 "which keeps #244's measured 7-point gap between the sides EXACTLY and puts both of them back in one "
 "band, so the note beside `mor0` (*\"the enemy starts on the same rung you do\"*) is true again after "
 "two entries of drift. "
 "⛔ **THE MOOD BAR'S DIVIDERS WERE TYPED INTO CSS AND TWO OF THE FOUR WERE WRONG.** "
 "`.bar.nrv::before` read `15 / 40 / 70 / 90` and the ladder's gates have been `15 / 34 / 52 / 90` "
 "since #129 and #228 - so for two entries the battle card drew ticks at rungs that do not exist, out "
 "by up to 18% of the pool, and nothing said so because a stylesheet cannot ask `LADDER` anything. "
 "`--nrvticks` is BUILT from the table, beside it. ⛑ **And the dividers came to the sheet** "
 "(*\"Bars with health do more in style of the game - and feel free to add some dividers (like in "
 "battle)\"*): #249 had already given both surfaces the socket and the crown and left the DIVIDERS "
 "behind, so the sheet drew the same three pools as blocks. One `:is(#bPlq,.ibars)` selector, which "
 "is #219's arithmetic - `:is()` keeps the 1-1-0 those rules had. ⛔ **AND ONLY THE PICTURE FOUND "
 "THE LAYER BUG**: a generated `::before` is the FIRST child and the `<i>` fill is a real one, so the "
 "mood ticks painted UNDER the fill while the blows hatch (`::after`) paints over it - three bars in "
 "one column, two divided end to end and the third only in its empty half, on the battle card since "
 "#102. Both readings are `background:<gradient>` on an `inset:0` pseudo and **no probe in the "
 "project can tell them apart**. "
 "⛔ **NO BODY IS BORN WITH A LEAN** (*\"No Born !\"*, the row boxed on the STRENGTH hover). #255 "
 "stopped ROLLING one and kept the Captain's authored `{str:1,agi:1}`; the ask is the same ask "
 "pointed at the row that survived, so he is -1 STR and -1 AGI and what is left of him is four named "
 "lines. ⛑ **AND DELETING THE ROW WOULD HAVE DELETED TWO SHIPPED REWARDS, WHICH IS THE FINDING.** "
 "The residual is not birth and not backstory any more: it is `p.st` raised IN PLAY - a night at THE "
 "WARM SPRING (`springStay`, +1 MOR, *permanently, for as long as they live*) and the wish off the "
 "falling star (`starWish`, +1 on their weakest axis). Both are written straight into `p.st` on "
 "purpose and this is the only row that pays them. **So the word goes and the row stays**, and the "
 "new word is the true one: `the road`. "
 "⛑ **THE TOTAL IS THE HEADLINE** (*\"Show bigger total bonus - i feel it is quite important\"*): "
 "`--fs4` -> `--fs6` on the sum and `--fs1` -> `--fs2` on what it BUYS, brightened off the dimmest "
 "brown on the card, the sources deliberately not moved (what makes a total read as a total is the "
 "gap to the rows above it), and the column 154 -> 176 paid by the tip rather than the ladder. "
 "⚠ **`#gtTip` IS A CHILD OF `document.body`, SO BOTH `ui-scales.md` §5 COUNTERS ARE BLIND TO IT** - "
 "they walk `#stage *`. The one box this entry made bigger is the one box no gate can see; measured "
 "by hand instead, 8 stat-hovers x 2 bodies, **0,0 overflow, the total's right edge exactly the "
 "column's, `mor` at the 640 cap and still clean**. "
 "⛑ **THE PERSONALITY LINE STOPS SAYING THE LEDGER** (*\"don`t like this line\"*, on a header reading "
 "**Experienced · +1 STR and +1 MOR**). #234 authored that string at his own word and it is right "
 "where it is READ - the muster wall, the promotion card, the battle hover, all places with no ledger "
 "beside them. On this sheet the stat hovers name EXPERIENCED as a row and total it, and this entry "
 "just made that total the loudest thing in the box. **A filter and not a rewrite, on this surface "
 "only**: a clause that is ONLY a stat restatement comes off, a clause that says something else keeps "
 "every word (DOES NOT RUN keeps *Cannot rout, ever*). `SHEET_TRAIT_STATS=true` puts it back in one "
 "word, which is #240's switch and the reason that entry cost one line when he changed his mind hours "
 "later. "
 "⛑ **THE LEVEL COMES BACK WITH THE FIGURES ON IT** (*\"return lvl with expirience - so i can see it "
 "in details\"*). #251's argument was that the roster tile 130px away says it twice - true of the "
 "LEVEL, never true of the EXPERIENCE: a 42px arc round a bust says *somewhere along* and the two "
 "exact figures were on a `title`, which is the one readout this project has twice recorded as not "
 "being a readout. "
 "⛑ **AN OFF-HAND PIECE SAYS WHAT IT DOES** (*\"For offhand dirk and shield show what they exactly "
 "do\"*). `shortGear` had a weapons branch and a coats branch and the slot they both missed is the OFF "
 "HAND, so a shield read `RARE · OFF` beside a cook-pot reading `COMMON · ARMOUR · stops 12` - the one "
 "slot whose whole job is a modifier was the one with no figure on it. Derived off the same fields "
 "`gearLine` reads, so a field added to a GEAR row appears on the row and in the hover untaught; "
 "`tipFor` gained #244's `meleeHit`/`meleeDmg`, which had reached `gearLine` and not it, so the piece "
 "with the most conditional rule in the game opened a hover with a flavour paragraph and not one "
 "number. The dirk's prose went **39 words to 20** and it is affordable because both halves of the "
 "old sentence were describing fields the row now derives. "
 "⛔ **AND A COMMON WEAPON IS NOT A PRIZE, AT BOTH DOORS** (*\"For after battle don`t give a common "
 "weapon as bonus\"*). The rule was already written one function away: `rollRack`'s note says in "
 "capitals *THE COMMON ROW IS NEVER A MAIN-HAND WEAPON ... a cheap sword is the thing a company "
 "already has six of*, and `rollFind` is where it never got applied - `common` is only reached there "
 "as the step DOWN from an emptied rare pool. ⛑ **Proved by making it fire**: with the whole rare "
 "pool bought out and six common main-hand weapons sitting in the pool, 300 finds returned **0** of "
 "them. The other door is authored, so **LINT 8j** asks it - and the two rows it names are the ones "
 "the player actually meets, a Boar spear off the clash and off the Snare, both cut. "
 "⚡ **PRICED, AND THE FLAGS WERE ALL SAMPLE.** `ARENA.match` n=15 a side over 14 road fights x 2 "
 "comps, against `git show HEAD:` in a second browser: **starting four 56% -> 55%, prepared six 87% -> "
 "86%**. Four cells moved 20 points or more and **every one of them evaporated at n=30 on both "
 "builds** - four/brigand **80% vs 80%** (24/30 each), four/slingline **23% vs 23%** (7/30 each), "
 "four/armour 13% vs 17%, prepared/hold 93% vs 97%. A 20-point swing at n=15 is three fights, which is "
 "this repo's own written note (*n=6 cannot tell 0% from 20%*) arriving one sample size up. "
 "**Gates:** `LINT()` **0** on a fresh page · `gt.py check` 3 scripts 0 problems · floor `[]` and "
 "clip `[]` on the sheet, the documented set on the world and the battle · overlap `[]`, slack **109** "
 "· map 0/0/0 · the stat tip measured by hand, 0 overflow on 8 · `shots/266_sheet.png`, "
 "`266_ledger.png`, `266_bars.png`. | |\n")

patch([("| **NEXT** | **The plan lives in", ROW + "| **NEXT** | **The plan lives in")],
      path=os.path.join(D, 'CHANGELOG.md'))

# ─────────────────────────────────────────────────────── 2 · SHIPPED
SROW = (
 "| **266** | **The nine-ask inventory batch.** A body's mood pool is **100** (`GIVEN.nerve` 90 -> "
 "100; a foe's is still its own statblock) and the ladder has a sixth band: **It rocks .90 - Happy "
 ".72 - Steady .42 - Shaken .30 - Breaking .15 - Broken 0**, with both sides opening in the middle of "
 "STEADY. ⚡ **±15 is exactly half that band**, so the company's mood is worth precisely one rung and "
 "cannot be worth two - measured 57/100 at AT EASE, 72 at HIGH SPIRITS, 42 ON THE BRINK · ⛔ **the "
 "mood bar's ticks were typed into CSS at `15/40/70/90` and the gates have been `15/34/52/90` since "
 "#228**, so the battle card drew rungs that do not exist for two entries; `--nrvticks` is built from "
 "`LADDER` now, and the sheet's three bars took the card's dividers through one `:is(#bPlq,.ibars)` · "
 "⛔ **only the PICTURE found the layer bug**: the mood ticks were a `::before` and painted UNDER the "
 "fill while the blows hatch paints over it, on the battle card since #102, and no probe in the "
 "project can tell the two apart · ⛔ **nothing is born with anything** (the Captain's authored "
 "`{str:1,agi:1}` is gone) and ⛑ **deleting the row would have deleted two shipped rewards** - the "
 "warm spring's permanent +1 MOR and the star's wish both write straight into `p.st`, so the word went "
 "and the row stayed as `the road` · the ledger's TOTAL is `--fs6` and what it buys `--fs2` · the "
 "personality line stops restating the rungs (`SHEET_TRAIT_STATS` puts it back) · the level ring is "
 "back **with the xp figures on it** · an off-hand piece says what it does on the row and in the "
 "hover, derived off `gearLine`'s own fields, and the dirk's prose is 39 words -> 20 · **a common "
 "main-hand weapon is not a prize at either door**: `rollFind` refuses one on the step-down and "
 "**LINT 8j** refuses one in `LOOT` (two Boar spear rows cut) | ⚠ **`#gtTip` is a child of "
 "`document.body`, so BOTH `ui-scales.md` §5 counters are blind to it** - the one box this entry "
 "made bigger is the one box no gate can see, and it was measured by hand · 👤 **Q1** the Captain "
 "losing 1 STR and 1 AGI is a balance call, not a display one · 👤 **Q2** *don`t like this line* was "
 "read as the stat restatement rather than the whole personality row · ⏳ **the two free rungs are "
 "mechanically identical** and are told apart only by which way they are one step from |\n")

patch([("| **264** | **The race lanes fill out", SROW + "| **264** | **The race lanes fill out")],
      path=os.path.join(D, 'SHIPPED.md'))

# ─────────────────────────────────────────────────────── 3 · BACKLOG
BROW = (
 "| **#266** *(08-29)* | **the nine-ask inventory batch**: the mood pool is **100** and the ladder "
 "gains **STEADY** (.42-.72), where both sides now open - `±15` of company mood is exactly half that "
 "band · ⛔ **the mood bar's ticks were a stale CSS literal** (`15/40/70/90` against gates of "
 "`15/34/52/90`) and are derived from `LADDER` now, and the sheet's bars took the card's dividers · "
 "⛔ **only the picture found the layer bug** (`::before` paints under the fill, `::after` over it) · "
 "nothing is born with anything, and the row that stays is `the road` because the warm spring and the "
 "star write into `p.st` · a bigger total on the stat ledger · the personality line stops restating "
 "it · the level ring returns with its figures · an off-hand piece says what it does · **a common "
 "weapon is not a prize at either door** (LINT 8j) | 8f.291 |\n")

patch([("| **#264** *(08-28)* | **the race lanes fill out",
        BROW + "| **#264** *(08-28)* | **the race lanes fill out")],
      path=os.path.join(D, '00_PLAN_AND_BACKLOG.md'))

# ─────────────────────────────────────────────────────── 4 · WHAT_TO_TEST
WTT = """
---

## 🧪 THE COMPANY SHEET: A 100 POOL, A BAND CALLED STEADY, AND WHAT A THING ACTUALLY DOES  *(#266 · 2026-08-29 · build log 8f.291)*

**What it is.** Nine asks off one screen. The two that change the FIGHT are the mood pool and the
mood ladder; the other seven are about being able to read what is in front of you.

**How to reach it in three steps.**
1. THE COMPANY (the roster button on the road bar).
2. Look at the three bars, the row under the name, and the chips beside it.
3. Hover STR (or any of the four) for the ledger.

**What should happen.**

- **Everybody's mood pool is a round number now.** An ordinary body reads `/100`; the Captain reads
  `/120` because he leans +2 MOR, and every rung is worth 10 either way. Nothing reads `/90`.
- **The bar says STEADY, and that is where a fight opens.** The ladder is IT ROCKS · HAPPY · STEADY ·
  SHAKEN · BREAKING · BROKEN. Your people walk on at **57 of 100**, dead centre of STEADY, and the
  enemy walks on in the same band. Hover the row for the whole ladder.
  - A company at HIGH SPIRITS opens at **72** (the top edge of STEADY) and one ON THE BRINK at
    **42** (its bottom edge). That is the company's mood being worth exactly one rung.
  - **STEADY and HAPPY both cost nothing.** That is deliberate: what tells them apart is that one is
    a step from the bonus and the other a step from the first penalty.
- **All three bars are divided.** Armour and hitpoints in *blows* (a wide section is a tough body);
  the mood bar at the ladder's own rungs, so you can see how far the next word is. The same three
  rows on the battle card read identically.
- **The line under the name is just the personality.** `Experienced` and not
  `Experienced · +1 STR and +1 MOR` - the rungs are two columns over, where they add up.
- **The level is back on the chip row, with the experience on it**: the ring, the level inside it,
  and `0/150 XP` beside it. The exact wording is on its hover.
- **The stat ledger's total is the big thing in the box**, with what the rung BUYS under it in
  brighter type. `born` is gone from it entirely.
- **An off-hand piece says what it does.** A Round Shield row reads `RARE · OFF · +9 dodge`, an
  off-hand dirk `COMMON · OFF · +5 to hit in melee · +5 melee damage · reaches what a bow cannot`.
  The dirk's paragraph is half the length it was.
- **After a battle you are never handed a cheap weapon.** The extra piece on top of the haul refuses
  a common main-hand weapon, and the two hauls that handed over a Boar spear pay salvage instead.

**What would be a bug.**
- Any body reading `/90`, or a mood bar with no ticks on it.
- The battle card and the sheet disagreeing about the word or the dividers.
- A personality whose short form is a RULE losing it: DOES NOT RUN must still read
  `Cannot rout, ever`, HAS NO STOMACH FOR IT must still read its per-kill clause.
- A stat ledger row called `born`. (A row called **the road** is correct and rare: it is the warm
  spring's permanent +1 MOR or the falling star's wish, and nothing else can make one.)
- A Boar spear, a broom, a gut-knife or a short sword arriving as the extra piece after a fight.

**What was measured, so you know what is NOT a bug.** The road was priced against the previous build
at n=15 a side over 14 fights and both companies: **starting four 56% → 55%, prepared six 87% → 86%**.
Four fights looked like they had moved 20 points or more and every one of them came back identical at
n=30. ⚠ **The Captain is one rung weaker** - he was carrying +1 STR and +1 AGI that nothing on the
sheet could explain, and that is the *No Born* ask. If he now feels thin, that is the one number to
argue about.
"""
patch([("\n---\n\n## 🧪 THE ENEMY HAS THE FOUR STATS NOW",
        WTT + "\n---\n\n## 🧪 THE ENEMY HAS THE FOUR STATS NOW")],
      path=os.path.join(D, 'WHAT_TO_TEST.md'))

# ─────────────────────────────────────────────────────── 5 · OPEN_QUESTIONS
OQ = """## Q · From #266

| | the question | ⭑ mine |
|---|---|---|
| **Q1** · #266 | **"No Born !" took a real point off the Captain, and only you can say whether that is what you meant.** #255 stopped ROLLING a born line and kept his authored `{str:1,agi:1}`; the ask, pointed at the row that survived, reads as *that one too*. So he is **-1 STR and -1 AGI**, and what is left of him is EXPERIENCED (+1 STR +1 MOR), the captaincy (+1 MOR) and being human (+1 INT). Priced: the road is flat (four 56 → 55%, six 87 → 86%, and every cell that looked worse came back identical at n=30) | **keep it.** The row was unreadable by design - a residual with no story - and four named lines is the whole point of the ladders. If he feels thin, the honest fix is to give EXPERIENCED the point rather than to put the residual back: a personality is something the sheet can explain |
| **Q2** · #266 | **"don`t like this line" was read as the STAT half of it, not the whole row.** The header said **Experienced · +1 STR and +1 MOR** and now says **Experienced**. The other reading is that the personality row should go entirely - but then the one thing on the sheet that says WHO this body is would be a hover on a name | **the half.** The rungs are two columns over where they add up, so the tail was the second receipt; the name is the only copy of the personality on this screen. ⚑ Either way it is one word: `SHEET_TRAIT_STATS = true` puts the numbers back, and `#iTrait` is one line to drop |
| **Q3** · #266 | **STEADY and HAPPY are mechanically identical and are told apart only by which way they are one step from.** #228 merged those two bands precisely because neither should cost anything, and this entry splits the display again without giving either a number. That is legal (IT ROCKS has been a display-only distinction since it was written) and it is a judgement about how much a band should have to earn | **leave them both free.** A penalty on HAPPY would undo the ask #228 was, and a bonus would make the rung a fight opens one step from feel like a thing you are losing. What the split buys is a word for where a body actually stands, which the ladder did not have |

---

"""
patch([("## P · From #263", OQ + "## P · From #263")],
      path=os.path.join(D, 'OPEN_QUESTIONS.md'))

print('docs ok')
