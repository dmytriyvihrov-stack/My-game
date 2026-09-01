# Open questions

> **Everything here is waiting on you, and nothing else is.** One line of code or one word each.
> Answer by code (`B2 yours`, `E1 cut it`) and the row is struck in the session that acts on it.
>
> **The rule that keeps this file the only place:**
> [`.claude/rules/how-we-work.md`](../.claude/rules/how-we-work.md). Raise a ruling with `👤`
> where the reasoning is, in the `CHANGELOG.md` or `SHIPPED.md` row; **file it here the same
> session**. It is the fifth write, and `python tools/record.py check` names any `👤` whose entry has
> no row in this file or in the answered one beside it.
>
> ⛔ **A `⏳` REMAINDER IS NOT A QUESTION AND DOES NOT BELONG HERE.** Work nobody has done yet stays
> in `SHIPPED.md`'s own remainder column. **If this file fills up with work it stops being
> answerable in one sitting, which is the whole thing it is for.**
>
> **Answered, parked and superseded rulings move to**
> [`archive/QUESTIONS_ANSWERED.md`](archive/QUESTIONS_ANSWERED.md). ⚠ **A code is never reissued**,
> so the gaps below are real rather than mistakes: `A1`, `A2`, `B4`, `B6`, `B7`, `B8`, `B9`, `C3`,
> `C5`, `E2` and all of `F` are in that file.

**Where they came from:** gathered 2026-08-25 (#248) out of four places at your request. Five sat in
the backlog, five in [`README.md`](README.md) §8, **twenty were marked `👤` inside `SHIPPED.md` rows**
by a convention nothing ever collected, and the rest were loose remainders. Ten of the twenty came
back already answered by work that was not about them.

---

## AA · From #280

| | the question | ⭐ mine |
|---|---|---|
| ~~**AA1**~~ | ~~**Two rows in `CLASSES` are both called MAGE.**~~ **ANSWERED 2026-09-01, #281: delete the row.** You said *“Older MAGE off the wall - we can delete from here and from current build”*, which is the other half of my recommendation and the better half: I proposed a second NAME and you took the class out. The row, its eight satellite tables and `MAGE_GLASS` are gone; `SCHOOLS` is now the definition of a caster so the two-schools mechanic outlived the class that used it; and `clsAlive()` catches an old save carrying the key. **⏳ One thing it leaves open and it is not a question for you yet: ELEMENTAL at tier 6 was aimed at that class *because he was bad in a scrum*, and it is now offered by nobody.** It is deliberately not re-homed on the battle-mage, which is the ruling #243 took and #281 does not overturn by accident. |
| **AA1-old** | *(the original text, kept because a code is never reissued and the reasoning is what made the answer easy)* **Two rows in `CLASSES` are both called MAGE, and a tool now has to print a raw engine key to tell them apart.** #243 moved the name MAGE and the globe onto `warmage` and turned the glass cannon off the muster wall with one `const` (`MAGE_GLASS=false`), on the correct reading that one word cannot name two classes on a picker. The row stayed, because traits, `isCaster`, the `elemental` gate and every save written before that day still name it. The class lab has to draw BOTH - it is a reference, and a row that exists is a row it shows - so its picker reads `MAGE warmage` / `MAGE mage`, which is an engine key on a screen. Every other surface in the project has one name per thing. | **give the glass cannon its own name and leave it off the wall.** It is a different class in every way that matters - two schools, a second working at half, and deliberately bad with a blade - and the moment it is ever dealt again the picker problem comes straight back. A name costs one string; renaming the KEY would throw the working row away, which is exactly what #243 refused and was right to refuse |

---

## Z · From #279

| | the question | ⭐ mine |
|---|---|---|
| **Z1** | **Four artifacts exist, are painted, are priced, and nothing in the game can hand any of them over.** The Armoury's reach scan walks the three decks, the fifteen loot tables, the roster, `START_GEAR`, `CRAFT` and the source of every global function, and finds no door for **The Wood-Stick With Two Holes** (legendary, 17-25 authored, *“it has been swung at people eleven times and has worked eleven times”*), **The Mirrored Sphere**, **The Company Banner** (`company`, +6 morale to everybody) and the **Foundry Ledger-Pin** (Wynn's, +1 INT and +3 MOR more on the Captain). All four are `unique`, so `findPool` refuses them by design and no rack or find can ever produce one; grep finds **zero** references to any of them outside their own `GEAR` row. This is not a bug, it is four finished things out-run by scenes that were rewritten or never written. Each wants either a door or a deletion, and which is a call about the FICTION, not about the code. | **give the Banner and the Ledger-Pin a door** - a `company` relic and a named pin off a dead clerk are both hooks the Foundry act wants anyway - and **leave the Wood-Stick and the Sphere where they are** until a scene earns them. They are jokes that only land once, and a joke handed over by a roll is a joke nobody set up |

---

## Y · From #275

| | the question | ⭐ mine |
|---|---|---|
| **Y1** | **The dodge cap went 12 to 25 and it is NOT priced against the road.** You said not to (*"maybe dont do it that pricacly with dodge cup through battles - it is your unit stat"*), and the reasoning is sound: what moved is a curve every body on both sides climbs, not a statblock. But it does move both sides - a foe's dodge averages 16.5 and was being taxed too, so **every enemy in the game also got a point or two harder to hit**. The baseline half of the matrix was taken before you said stop and it is in the session record; the other half is about twenty minutes. | **leave it unpriced and play it.** If the road feels slower to kill through, this is the number |
| **Y2** | **The brawl's first swing now cannot miss.** A playthrough report said an ~82% opening miss followed by two blows from the drunk made the tutorial feel harsher than intended. `SURE_AFTER` already exists for exactly that frustration and structurally cannot reach the FIRST swing. It is `TUT_FIRST_SURE`, one word, the tap-room only, one body's first blow only. | **keep it.** It is the first thing a new player ever does and it costs one swing in a whole run |
| **Y3** | **A hidden body still counts as CROWDING the enemy it is standing next to.** It holds no zone of control (nobody takes a free swing from a body they cannot see), but `engagers` still counts it, so your line gets the `surrounded` to-hit bonus from somebody the enemy does not know is there. That reads as an ambush working and it may read as a cheat. One clause either way. | **as built.** The body IS pressing on them; they simply do not know what it is |

---

## X · From #274

| | the question | ⭐ mine |
|---|---|---|
| **X1** | **The lizard fights are 20-30 points harder now that they actually fight, and that is a re-tune you did not ask for.** #267 priced them against an AI that stood still: measured over 30 runs a cell, the ash-drakes go **93% -> 63%** for a prepared six and the glass road **100% -> 83%**. Nothing in a statblock moved; what changed is that a range-3 spitter no longer counts as an archery line. If the third fight is now too steep the dial is the statblocks, not the AI - and the AI is the half that was reported as broken. | **leave the fights alone and play them.** #267's own note says the drakes priced at 100% in 6 rounds and calls that too easy for the third fight on the trail |
| **X2** | **Ask 10: *"when I hover on enemy - i stopped seeing automatical atack on range atacks"*. I could not reproduce it and I need a repro.** Driven on a real archer with MOVE standing: the figures are there at rest, they are still there while the pointer rests on an enemy, still there with the bow card hovered, still there with one action spent, still there while engaged (two figures, 50% and 5%). They go only where they should: when the shot has been taken twice this turn, and when a melee card is picked with nothing in reach. **What would help is one screenshot of the board with the odds missing**, with the act row visible. ⚡ It is possible ask 11 was the whole of it - the figures ARE from where the body stands, and hovering a hex you were about to walk to never showed you what the step buys. That is built now. | **a screenshot, or tell me it is fixed by ask 11** |
| **X3** | **The undo now survives the hand-over only while the next body is one of yours.** When the next in initiative is an enemy the offer goes with the turn, because an enemy's turn cannot be interrupted and its brain has already moved by the time a hand reaches the button. The alternative is holding the enemy's turn back for a second or two, which is the three-second wait this entry deleted. | **as built.** A wait is what you asked me to remove |

---

## W · From #272

| | the question | ⭑ mine |
|---|---|---|
| **W1** | **Does anybody actually recognise the arch?** Your own condition when you asked for it. It ships deliberately silent - no tutorial card, no printed label, just the chip and its hover - because a readout that needs explaining on the screen it lives on has already lost. If three playtesters cannot say roughly what it means, the fix is a WORD under it (`A BLACK ROAD` printed rather than only hovered), not a bigger picture. | **ship it silent, then ask the three** |
| **W2** | **Should it ever start paying?** Today it is wired to nothing, which is what you asked for, and that is the whole reason it does not contradict your pillar. The moment it opens a door or moves a price it IS a karma meter, and rules 5 and 6 of *"You cannot afford to be good to everyone"* have to be rewritten rather than worked around. | **reading-only until you say otherwise** |
| **W4** | **Should the company sheet get the road's state back?** #272 put the chip on the top bar, where `show()`'s #239 reparent carried it onto the sheet for free. #273 moved it into the map's own corner at your word, and a box positioned against `#wMap` cannot travel to a screen that hides the map - so the sheet lost it. Nothing else did: the map is where you are when you take the doors that move it. One `insertBefore` if you want it on both, and it would need its own second position rule on `#iBar`. | **map only, as built** |
| **W3** | **Is a cruelty worth two kindnesses?** `ROAD_W` is `evil -2, help +1, honor +1`, so a company that helps three villages and robs three carts still reads BLACK. That is rule 3 (*"bad deeds must actually pay"*) pointed at the readout. It is one digit if it reads as the game nagging you. | **-2, so a mixed ledger is not a clean one** |

---

## V · From #270

| | the question | ⭑ mine |
|---|---|---|
| **V1** | **Is the free payday every time, or sometimes?** You asked for it at the top mood rung and I built it deterministic: at HIGH SPIRITS the wages are simply waived, about thirty crowns every fourth day, and the ladder's own hover now says *they waive the wages*. A chance would read as the game being stingy about a rung that is expensive to hold; a certainty is a thing you can plan a route around. It is one `if` either way. | **every time**, as built |
| **V2** | **Two fittings before any racks: too tight?** The wagon had no slot cap at all (#238 deleted the last one deliberately: *"the money is the cap"*), and an upgradeable count needs something to upgrade FROM. `RACK_SLOTS` opens at **2** of five fittings and goes 3 / 4 / 5 for 4 / 8 / 14 salvage, against the frame's 5 / 10 / 18 and a run that holds 23-24 at the last fire. If it bites too hard the base is one digit. | **2**, so the first rack is worth buying |
| **V3** | **Does the ratkin cap belong on a body coming BACK?** Four is the cap on taking somebody NEW: a muster wall, a road door, the allies at Blood on the Road. It is deliberately NOT asked of the returner at a fire or the man who walks out of the sinkhole three days later, because both were already yours and a company that knifes its own for coming home is a different game. Say the word and it binds everywhere. | **new bodies only** |

---

## U · From the 2026-08-31 rhythm rulings (concept §5)

| | the question | ⭑ mine |
|---|---|---|
| **U1** · concept §5 | **The Sling-Line under the "no doors on 60-70% of fights" ruling: forced, or kept as a paid walk-around?** Every other fight classified itself (they attack = forced; you choose = doors). The Stone Field's walk-around is a PRICE - a day and two provisions - which makes it the toll-man's shape rather than a refusal, and it is the only door of its kind on the road | **keep the paid walk-around.** A priced detour is a real decision, not bureaucracy, and cutting it deletes a shape rather than a duplicate. If it reads as clutter in play, forcing it later is one door's deletion; un-forcing it later means re-tuning a fight |

---

## T · From #269

*(**T1** was answered the same day and is in [`archive/QUESTIONS_ANSWERED.md`](archive/QUESTIONS_ANSWERED.md).)*

| | the question | ⭑ mine |
|---|---|---|
| **T2** | **Which two doors on the cub screen?** You boxed the top ROW - TAKE THE CUB and KILL IT TOO - and wrote *two options only*. I read the box as *this list* rather than *these two*, and cut **KILL IT TOO**, because it was dominated: 2 gems against LEAVE IT's 3 gems and 120 crowns, 12 morale against 4, and the cub ends either way. | **Mine as shipped.** A door no company can have a reason to press is not a choice. If you meant the other pair, it is one line back |
| **T3** | **Which real harness should be adjustable?** The property existed and had no name; it is named now. But it is on **rags, a cook-pot and a worn bucket** - three junk pieces - so *some armour can be adjustable* is technically true and buys nothing. | Put it on **one** good piece, so it is a reason to keep something rather than a footnote. The rat-silk shroud is the obvious candidate |

---

## S · From #267

| | the question | ⭑ mine |
|---|---|---|
| **S1** · #267 | **The floating pool went 16 cards to 21 against six slots, which costs every other card about a fifth of its odds.** Five new cards is what *three fighting random events plus a boss plus a one-sentence one* comes to, and the deck is deliberately bigger than the road so two runs differ. The alternative is a seventh slot | **accept the dilution.** A seventh slot changes the pacing of every run for five cards' sake, and the deck outlasting the road is the property that makes the pool worth having. ⚠ If the road starts feeling like *all lizards*, the honest lever is dropping the one-sentence card back out of `FLOATING`, not shrinking the trail |
| **S2** · #267 | **The one-sentence card is TWELVE words and the LIGHT band starts at 45.** You asked for one sentence and said you would change it later, so it is authored out of band with a note saying so. The risk is that the next session to run a length census reads it as unfinished and pads it | **leave it, and tell me when you rewrite it.** The note in the code should stop a sweep touching it. ⚠ It is also the only card in the game with exactly one door, which is legal (the appended walk-away only fires when nothing visible is affordable) but makes it the thinnest thing the road can deal |
| **S3** · #267 | **"fiy skil" was read as FLIGHT, and built as a movement property rather than as an act.** A drake crosses water, bog and its own burning ground at a hex a hex and aims out of them unbothered - one word in `wetproof`, where that question is already answered for the gills and the Fen-Mother. The other readings were a 3-hex wing-hop as its own act (the mirehare doe's machinery) or a second FIERY skill beyond the breath | **the property, and it is the cheapest of the three.** A hop act would have routed the drake through `mirehareMove`, whose contract is *the leap IS the turn*, so a drake that hopped could never also breathe. ⚠ If you wanted a second fiery skill instead, say which and it is one row |
| **S4** · #267 | **The breath hits whoever is behind the target whether they are yours or its own.** That is the Heroes of Might and Magic rule you named, and it is what makes baiting the drake the counterplay | **keep it.** An exception for its own vermin would delete the one interesting decision the creature offers. ⚠ The AI does not currently AVOID doing it, so a drake will sometimes cook its own salamander; that reads as an animal rather than as a bug, but it is one scorer line if you want it smarter |

---

## R · From #266

| | the question | ⭑ mine |
|---|---|---|
| **R1** · #266 | **"No Born !" took a real point off the Captain, and only you can say whether that is what you meant.** #255 stopped ROLLING a born line and kept his authored `{str:1,agi:1}`; the ask, pointed at the row that survived, reads as *that one too*. So he is **-1 STR and -1 AGI**, and what is left of him is EXPERIENCED (+1 STR +1 MOR), the captaincy (+1 MOR) and being human (+1 INT). Priced: the road is flat (four 56 → 55%, six 87 → 86%, and every cell that looked worse came back identical at n=30) | **keep it.** The row was unreadable by design - a residual with no story - and four named lines is the whole point of the ladders. If he feels thin, the honest fix is to give EXPERIENCED the point rather than to put the residual back: a personality is something the sheet can explain |
| **R2** · #266 | **"don`t like this line" was read as the STAT half of it, not the whole row.** The header said **Experienced · +1 STR and +1 MOR** and now says **Experienced**. The other reading is that the personality row should go entirely - but then the one thing on the sheet that says WHO this body is would be a hover on a name | **the half.** The rungs are two columns over where they add up, so the tail was the second receipt; the name is the only copy of the personality on this screen. ⚠ **What it does to the other 26 traits is worth a look before you rule**: swept over all of them, **8 lose a clause and 2 fall to the name alone** (EXPERIENCED and TWITCHY, whose short forms were nothing but rungs), 17 are untouched - DOES NOT RUN keeps *Cannot rout, ever*, VETERAN keeps *-1 AGI, -8 hitpoints* because hitpoints are not on a ladder, FRIGHTENING keeps its joke. But **two now show only their COST**: HAS NO STOMACH FOR IT reads *-18 morale and -7% damage per kill*, VEGETARIAN reads *-10% damage*, because in both the upside was a rung and the price is a rule. That is the filter being right and reading a little bleak. ⚑ Either way it is one word: `SHEET_TRAIT_STATS = true` puts the numbers back, and `#iTrait` is one line to drop |
| **R4** · #266 | **The Fen-Mother got harder and nobody asked for that.** A prepared six wins **57% where it won 77%** (n=30 either side, against main with #265). It is a real interaction and not the sample: she is the one body in the game whose BROKEN state is stronger than her whole one (`desperateAt` at 16% of nerve - she does not rout, she loses hitpoints a turn and hits harder), so a lower opening mood starts her 42 points nearer it. Every other cell that flagged inverted at n=30, including the tutorial gate | **keep it and play the fen once.** 57% for a prepared SIX puts her beside the Circle (33%) and the Steading-Line (20%) instead of below the ordinary road, which is where the act's boss should sit, and it is a step toward what O1 is about rather than away from it. ⚠ If it reads wrong the lever is HER `desperateAt` and not the ladder - moving `START_NERVE` back would undo the ask on all fourteen fights to fix one |
| **R3** · #266 | **STEADY and HAPPY are mechanically identical and are told apart only by which way they are one step from.** #228 merged those two bands precisely because neither should cost anything, and this entry splits the display again without giving either a number. That is legal (IT ROCKS has been a display-only distinction since it was written) and it is a judgement about how much a band should have to earn | **leave them both free.** A penalty on HAPPY would undo the ask #228 was, and a bonus would make the rung a fight opens one step from feel like a thing you are losing. What the split buys is a word for where a body actually stands, which the ladder did not have |
---

## Q · From #265

| | the question | ⭑ mine |
|---|---|---|
| **Q1** · #265 | **`FOE_NERVE` is 1.25 and it is the one number in this entry that is a taste call.** Measured both sides built, the road's mood pool was **37.5% under your six's** and is now **21.9% under**. Your words were *"similar to us"* and *"a little bit harder to break"*, which point at slightly different numbers - 1.25 is the second one, and 1.45 would be the first (dead level) | **play it at 1.25 first.** The ladder is fractional, so this is a quarter more morale damage before anything breaks, and fights already run a round or two longer for it. ⚠ Going level would delete routing from the game as a thing that happens to the enemy, and routing is how most of your wins currently end - the aftermath's own mercy screen is built on it |
| **Q2** · #265 | **A champion is now the multipliers AND four levels, and I did not cut the multipliers to pay for it.** Your words were *"it could be 4 the lvl"*, which could equally have meant *instead of* the x1.5 body. Measured, a champion billman is 59hp/65 armour against a plain 40/44, and swings 16-26 against 11-17 | **keep both, and judge it in the Hold host.** #245 measured that the boards did not move the win rate and only changed the shape, and that is still roughly true: the fight reads 40% with them. If a champion reads as a boss rather than as a better soldier, the honest cut is `CHAMP.dmg` (1.5), which is the one multiplier that stacks with the STRENGTH rung the level now adds |
| **Q3** · #265 | **I retuned a fight without being asked, and it was a break rather than a preference.** `snarejoin` measured **0 wins in 20** on a fight its own table tunes to 40-53%: 30% before #263, 15% after it, 0% after this. Three bills came out by that function's own documented dial and it reads **40%** | **it needed doing and the number is yours to move.** What I want you to know is the shape: **#263's road matrix never covered `snarejoin`**, because that fight is not on the road list, so a 19-body host took two rounds of enemy buffs with nothing watching. The matrix list should grow that row |

---

## P · From #263

| | the question | ⭑ mine |
|---|---|---|
| **P1** · #263 | **The other side climbs the ladders now, and the road came down harder in some places than others.** `ARENA.match`, n=15 a side, against the same build without it. Starting four: **broken men 80 → 53%**, pack 100 → 80, Sling-Line 40 → 27, tavern 93 → 87. Prepared six: **the Circle 100 → 53%**, **the Steading-Line 53 → 20%**, the Snare 87 → 80. The early road still wins at 100% but slower and bloodier. Nothing here is a bug - it is the counterweight to O1 arriving, and the question is whether it arrived too hard on the two set-pieces | **keep it and play one run before touching a number.** The whole road moving one step down is what the entry was for, and a 53% Circle for a SIX is a real fight rather than a wall. The two I would watch are the **Steading-Line at 20%**, which was already the hardest fight in the game and now takes the ogre lean on top, and the **broken men at 53% for the four**, which is early. If either reads wrong the dial is that fight's own statblock, not `FOE_LEAN` - the lean is what makes a ratkin read like a ratkin |
| **P2** · #263 | **And it did NOT answer O1: the Snare is still 93% for the starting four** (28/30 at n=30, 0.6 bodies down). The finale is a ratkin deck, and the ratkin lean is close to a wash - +4 to hit and a fifth on the swing, against 5% of the hitpoints and 10 of the nerve. So the fight the act ends on is still not a threat to the company you start with | **O1 stands and wants its own pass, and it is now a smaller job than it was.** The honest lever is that deck's own rows rather than the lean: the Snare was retuned by the arena once before (its header comment still records *"~3 of 10 in mirror-AI"*) and the same instrument is what would do it again. ⚠ Do it AFTER a played run of this build, not on top of it - two difficulty changes measured together cannot be told apart |

---

## O · From #258

| | the question | ⭑ mine |
|---|---|---|
| **O1** · #258 | **The act finale is no longer a threat to the company you start with.** Founders, the shipped brain, n=10, seed 1234: **THE SNARE wins 100% with 0.2 bodies down**, where the same grid on the 8f.252 build reads **30% and 3.1 down**. Not the tool's opinion - `ARENA.match('four','snare')` reads **1/6 → 6/6**, and the arena's own header comment records the fight as tuned to *"~3 of 10 in mirror-AI"*. The road moved both ways in the same six days: **Sling-Line 100% → 60%**, **Broken Men 60% → 90%**, Blood on the Road still 100% but **5 rounds and 0.4 down → 8 and 1.4** | **re-tune the Snare, and treat the Sling-Line as the new act gate rather than fixing it.** The ladders made your people better at the thing the finale tested; the fight it replaced as the hardest on the road is the one your own walk already flags. ⚠ Mirror-AI caveat stands (a mirror loss can be a hard human win), but a fight going **1/6 → 6/6 on the instrument it was tuned with** is the one reading that caveat does not cover |
| **O2** · #258 | **`defensive` is indistinguishable from `steady`.** #242 shipped it FIRST-CUT with *"the numbers get measured in the gauntlet before they are trusted"*, and this is that measurement: **byte-identical on 6 of the 12 fights** and within one body on the rest. The two rows are `{cohere:3.5, flank:0, pile:0.6}` against `{cohere:3, flank:0.4, pile:1.3}`, so the knobs barely part | **move its numbers or cut the row.** A third order the player picks and cannot see the effect of is the ⏱ SPEED fault (#102) in a dev tool. If it stays, `cohere` is not the dial that separates them - the honest defensive lever is `hold`, which no order touches and which is the one knob that means *make them come to you* |
| **O3** · #258 | **`PTS_SCALE` no longer means what its own comment says.** It is *"calibrated so THE FOUR FOUNDERS SUM TO ~100"*, i.e. "bring 100 points" = "bring the starting company - and after the ladders **they price at 108**. Every band on the practice field and in the gauntlet is read against that number | **leave it until O1 is answered, then recalibrate once.** 0.39 puts the founders back on 100, but it moves every points figure on two screens, and re-tuning a fight would move them again. One recalibration after the balance settles, not two |

---

## N · From #257

| | the question | ⭑ mine |
|---|---|---|
| **N1** · #257 | **Three capstones went live today and not one of them has ever been fielded.** STANDS, UNREPEATABLE and TWO PERK POINTS were flags nothing read since #254, so `ARENA.match` has never once measured a fight containing them - and none of the eight authored fights puts a body on a +4 rung, so it still has not. They are priced on paper and nowhere else | **leave them and play one run that reaches a +4.** The arena cannot reach this: it fields the founders, and no founder is within two rungs of a capstone. If one reads as too strong, UNREPEATABLE is the one to watch - it is the only one that refuses the enemy an action rather than paying the player |

---

## M · From #255

| | the question | ⭑ mine |
|---|---|---|
| **M1** · #255 | **±10 mood a rung is the one figure of yours I changed.** Your page put nerve on the +1 and −1 rungs alone, which is why the whole ladder only moved the bar from 80 to 100 and Marrow read the same as everybody. Every rung pays it now, so the pool runs **50 to 130** and the other effects are untouched | **keep it.** A stat whose ladder does not move its own readout is a stat the player cannot feel. If 130 is too much on the top rung the honest dial is ±8 a rung (58..122), not putting the steps back on two |
| **M2** · #255 | **The `Big` personality is retired, not deleted.** The row is kept so a save carrying `trait:'big'` still resolves to a name; it costs nothing, says so, and no race or class can roll it. There are now **two** dead-but-kept rows in `TRAITS` | leave it for one run and then cut it, once no save in play can be carrying it |

---

## L · From #254

| | the question | ⭑ mine |
|---|---|---|
| **L1** · #254 | **The raised baseline moved exactly one fight and it is the brigand road**: 13/15 wins in 10.8 rounds became 15/15 in 6.2 over 15 runs a side. Every other fight, including both set-pieces, is inside the noise. 70 to hit against the old 58 is the cause, and it is your number out of the file | **play it once before touching anything.** A fight that used to grind for eleven rounds and now ends in six is not obviously worse; if it reads as too easy the dial is `HIT_EASE.you` (10), not the ladder |

---

## K · From #253

| | the question | ⭑ mine |
|---|---|---|
| **K2** · #253 | **MORALE's ladder steps by 2 where the other three step by 1**, so with the origin at 0 the ordinary rolled human sits one rung under its middle band and reads *Nervous* rather than *Fairly brave*. #248 left `mor` alone on the grounds that it already used all nine grades, and that is still true - but it is the one axis where "the human is in the middle" is not quite honest | **leave it for a played run.** Re-banding it is four numbers, and it moves what every body in the game is called on that axis; the other three are worth judging first |

---

## J · From #252

| | the question | ⭑ mine |
|---|---|---|
| **J1** · #252 | **The INTELLECT ladder is asymmetric on magic, and only deriving it showed that.** The positive side pays magic **+15%** (at +2, and nothing above it); the negative side pays **−12%** at −2 and **−13%** at −4, so *held at the bottom* is **−25%**. The doc had been claiming **+30%** at the top, which is not reachable from any rung. Every other channel on that ladder is symmetric: ±28 to land, ±10% experience | **give +4 `magic +15%` on top of its `+7 to land`.** It makes the top ↔ bottom pair ±25% like the rest of the ladder, and the capstone is already the one rung that is a rule plus a number. The alternative is to soften the bottom to −15%, which makes a stupid caster cheap rather than making a brilliant one good |

---

## I · From #251

| | the question | ⭑ mine |
|---|---|---|
| **I1** · #251 | **A hire with no trade yet has lost his only WORDS.** Deleting the header's mark line took `NO TRADE YET` with it - it was the one chip on that row that kept its text, because `cIcon('none')` is an empty ring and there is no picture of *not having a trade*. The green *A CLASS TO PICK* line covers him the moment a level is banked, and before that the sheet says nothing | leave it. He is one line of green away from being told, and putting one chip back for one case is the conditional furniture this build keeps deleting. **One word (`SHEET_HEAD_MARKS`) restores the whole row** if the blank reads wrong in play |

---

## H · From #250

| | the question | ⭑ mine |
|---|---|---|
| **H1** · #250 | **The pit is on the ridge and nowhere else.** `rocky` alone carries the dial, which covers the Sling-Line, the Steading-Line and Something in Armour - every other fight in the back half of the road is fought on `bloom` (the Fen-Mother) or `swamp` (the Snare), and both are hand-tuned bosses. Your words were *"especially where there is a rocky ravine and a lot of stones"*, so this is the literal reading | leave it on `rocky` for one played run and then decide. Widening it is one field per row; the two it would reach are the two fights whose round bands cost real work to set |
| **H2** · #250 | **Only YOU aim a shove at a hole.** The enemy brain walks round pits (it prices one at 26, less than the fire's 60, so it crosses when it must) and it can drop one of yours in by accident with its own kick, but nothing in it goes looking for the hole. That is why the measurement says the hazard costs 0.85 of a round and changes no outcome: it is a tool, and one side has it | teach the brain to aim it, or leave the pit as the player's own trick. **It is a real balance change either way** and it wants its own entry |
| **H3** · #250 | **Two bodies down in the same hole fight each other normally.** Your sentence is about the pit against the field and does not cover pit-to-pit; a rule that refused it would need explaining every time two people fall in together, and pits touch on 6 of every 10 two-pit boards | keep it. The alternative is *nothing swings in a pit at all*, which makes a shared hole a place where two people stand and look at each other |
| **H4** · #250 | **A body in a pit can still SHOOT out of it.** You banned casting back and said nothing about a bow, so the bow stayed. It is the one thing that stops a pit being a death sentence for an archer who gets kicked into one | confirm, or ban the shot too and accept that a shoved archer loses two turns rather than one |

---

## G · From #249

| | the question | ⭑ mine |
|---|---|---|
| **G1** · #249 | **The drawn body is parked and the mark on the PART went with it.** The gear block is two rows of three slots now (196px -> 108, and the 88 is the room the perk panel needs, which is what you asked for) - so the figure that carried a scar, the change and a condition **on the place they happened** is not drawn any more. Every one of them is still a chip under the grid with its own hover; nothing says WHERE. `drawDoll` is untouched and one call away | bring the figure back INSIDE the perk panel, where it has a reason to be big, rather than beside the gear |
| **G2** · #247 | **The sheet's MOR stat tell is a painted heart, two columns from the ♥ that means blood.** This is the half of B1 that #249 did not touch: the mood row's mark is fixed and this one is a second heart meaning a second thing on one screen (#102's wrong-unit rule) | redraw the MOR tell as something that is not a heart. The pack is `art/src/stat-icons/` and it is nine grades |
| **G3** · #249 | **The undo window is 3.15 seconds** at the shipped board speed. Move with your last action and the turn now hands itself on after that hold, with a bar draining along ⟲. Too long and it is still the hang you reported; too short and UNDO is back to being a button nobody can reach | play three fights before ruling. It is one number (`UNDO_HOLD`) |
| **G4** · #249 | **The near movement zone is 19 points of luminance louder than the far one**, against 8 before. Your own suggestion (*"maybe 1st a bit darker"*) measured as the direction that ERASES the difference, so it went the other way | if the board now reads as too washed, the far half is the one with room to come down, not the near one |

---

## E · Broken rather than undecided

**E1 · The Drowned Chapel has a door nobody can ever open.**

Its `needMut:'gills'` choice is the **only mutation-gated door in the game**, and `MUTATIONS_ON` has
been `false` since #16 parked mutations for the whole first game. It has never once appeared. #123
kept it deliberately, as *"the one place a mutation pays rent outside combat"*, and the flag that
killed it landed two entries later.

⭑ **Two honest answers: cut the door, or let one mutation exist behind the flag so the card keeps its
point.** Leaving it is the only bad option, because the card carries a fifth door in its own source
that nothing can reach.

⚠ **This is the last defect on the list.** Everything below is taste.

---

## B · From the last ten batches

| | the question | ⭑ mine |
|---|---|---|
| **B2** · #246 | **The injury clock stayed on the roster tile** against a literal reading of *"remove the other things"*. It is a clock, not a description: how long until this body is sound | keep it, it is the only thing on that tile that changes |
| **B3** · #244 | **The dogs' pack aura is live and could not be reproduced as a bug.** Her radius is 3 against a 2-hex bounce, which is probably the impression you had. It is a dial | drop the radius to 2 so it matches the bounce |
| **B5** · #241 | **The apron round the board is bare ground** (`APRON_LATTICE=0`). If *"чуть выходящие квадратики"* meant you wanted to SEE tiles out there, one value draws them as outlines | leave it bare: a marked tile you cannot stand on is a promise the board breaks |
| **B11** · #230 | **Two states scroll the company sheet** (a banked promotion point, 8px; THE CIRCLE, 21px) against #133's promise of one screen and no scroll | accept it: the alternative is shrinking the stat icons that were just painted |
| **B12** · #219 | **The opening card carries a title again**, `THE THREE BELLS · before the road`. You deleted the old card's title, but that was a narrow column card where it cost real prose. On the painted stage it costs nothing and every other card has one | keep it |
| **B13** · #218 | **Three rail colours and a pace.** `honor` sits on grave-stone grey, the coldest thing on a warm card; `rest` sits on blue, which is a campfire in blue; and the card unfold is **470ms**, which you meet thirty-four times a run | shorten the unfold to about 380ms, leave the colours |
| **B14** · #215 | **The mirror's landing ring.** An ivory ring marks the hex your click will actually land on. Hiding it makes you do the flip in your head, which is closer to a prank | keep it |
| **B15-B17** · the foe dex | ~~Three defects in the threat price~~ **ANSWERED 2026-08-31** (*"Can you recheck threat points?"*): PTS_SCALE recalibrated 0.42 -> 1.275 so the founders read 101 again, the flat-26 caster clamp deleted, an arcane act weighted by `D.arc` instead of the weapon arm, a cooled act blended, and burning ground / `bounce` / `veiled` priced off the game's own constants. `.claude/skills/enemy-stats/SKILL.md` carries the arithmetic | closed |
| **B19** · #276, #277 | **Five of the eight ogre statblocks have no SWEEP**, and two different bodies are both named "Ogre, club" - the clash one sweeps, the steading one does not. **#277 merged the two that ARE one animal and deliberately left the steading four out**, because merging bodies with different kits is a balance decision and not a refactor. The foe dex is what made it visible: from the player side an ogre IS the thing that takes everything standing next to it | give the steading four a SWEEP, or rename one of the two clubs. A player who learns "ogres sweep" at Blood on the Road and meets four that do not has been taught something untrue |
| **B18** · the foe dex | **Three assets and three statblocks are finished and unreachable.** THE DESERTER, SPEAR has a tuned statblock and its own painting and `brigands()` stopped fielding it in a balance cut; the FEN-THING and the BLOOM-SPITTER have statblocks, three paintings between them, a bestiary row, a map sight and two wide stages, and no fight was ever written; `ogre_you_guardian` and `ogre_you_maul` are painted for roster variants nothing sets. The full list is at the foot of `tools/enemies.html` | wire the spearman back into the brigands (it is one plan row and the fight was cut for being hard, not for being wrong); leave the fen-things parked until somebody wants that fight |

---

## C · Older, and still real

*These sat inside `SHIPPED.md` rows where nothing collected them. Each was checked against the
running build before being put in front of you.*

| | the question | ⭑ mine |
|---|---|---|
| **C1** · #96 | **The armour bar is steel on everybody**, yours and theirs, while #247 just made the health bar red on everybody. It is a shell, not a person | leave it steel: it is the one bar about the kit rather than the body |
| **C2** · #96 | **Your pet scores as an ALLY, not as yours** - gold on the board, not blue | ⚠ **I argue against my own first answer here.** `u.pet` is deliberately excluded from your bodies everywhere in the code (morale, injury, whispers), so blue would make it LOOK like one of your people while every rule treats it as not one. **Leave it gold** |
| **C4** · #147 | **The finale is one row from softer** if you ever want it. Two arenas, `plains` and `outpost`, stay unused with the reason recorded | leave it: #245 already moved this fight to 40% |
| **C6** · #93 / #90 / #146 | **The Fen-Mother sits on an authored board, not a rolled one.** The finding underneath is real either way: *a centred mass taxes whoever needs range*, so her 12-14 round band is partly an accident of the seed. ⚠ #146 then made her 12 points easier to hit and called it *"the closest this pass comes to her reserved re-tune"*, so the re-tune is still owed | leave her: she is a boss, and an authored board is allowed to be authored |

---

## D · Design questions that shape a later system

*From [`README.md`](README.md) §8. Nothing is blocked on these, but each changes what a later batch
looks like.*

| | the question | ⭑ mine |
|---|---|---|
| **D1** | **AUTO doctrine.** One order for the whole company, or assignable per person? Per-person is more expressive and roughly triples the interface | one order for the company; per-person is #37 and waits on a mature AUTO |
| **D2** | **Numbers in the chronicle.** The interface rule says hide them. Does the expanded record get an exemption, or does even that stay in words? | words everywhere: an exemption is how a rule dies |
| **D3** | **The run contract.** Is the no-death rule kept alongside the injury chain as a gentler contract, or **is the chain simply how the game works?** The chain is currently the default | the chain is the game; a difficulty toggle later is cheaper than two contracts now |
| **D4** | **Generated voice.** Acceptable as a labelled temporary track for timing, or not at all? | yes, labelled, timing only |
| **D5** | **The subtitle.** The front door reads **RABBLEBOUND** over *YOU CANNOT AFFORD TO BE GOOD TO EVERYONE*, which says the morality but **not the genre** - a stranger cannot tell it is a tactical game. Flagged when the name was settled and never answered | worth a second line. **It is the only question on this page a person who has not played will ever see** |

---

## And one that is not a taste call

- **QA-27: the defeat epilogue opens with *"The bells are still ringing"*** wherever the company
  dies, including half a map from Grausen. Keep it placeless, or key one clause on where the run
  ended. *(From the QA day: [`QA_PLAYTEST_2026-08-02.md`](QA_PLAYTEST_2026-08-02.md).)*
