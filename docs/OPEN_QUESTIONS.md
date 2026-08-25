# Every open question, in one place

> **Built 2026-08-25 (#248) at your request**: *"what questions? can you please gather all questions
> and send to me in one go?"*
>
> ⛔ **They were scattered across four places and that is why you had never seen them as a list**:
> five in the backlog's *Rulings still waiting on you*, four in [`README.md`](README.md) §8, **twenty
> marked `👤` inside `SHIPPED.md` rows** (a convention nothing ever collected), and the rest sitting
> as `⏳` remainders on the last ten entries. **This file is now the one place**, and a question
> leaves it by being answered here, not by being answered in chat and forgotten.
>
> **Each one is genuinely one line of code or one word from you.** Where I have a recommendation it
> is marked ⭑ and you can answer *"yours"* and I will take it.

---

## ⏸ PARKED 2026-08-25: anything about PERKS, CLASSES or STATS

> The user: *"summarise something that not related to perks, clases and stats (they are under
> rework)"*.
>
> **Five questions leave the live list and none of them is answered.** They are parked because the
> systems under them are being reworked, and a ruling taken now would be a ruling about a shape that
> is changing.

| | what it was | why it is parked |
|---|---|---|
| **A1** | **#204**, stats become signed ladders | it IS the stat rework. It comes back as the rework's own first decision, not as a question beside it |
| **A2** | **#47**, the spear gets its weakness | a class contract. The whole entry is what one class is FOR |
| **B4** | **#243**, the glass-cannon mage behind `MAGE_GLASS` | two buttons that differ only in perks |
| **B9** | **#240**, `PUNCH THROUGH` priced and never fielded | an archer perk |
| **C5** | **#134**, the joke door needs a readable reason | its own note says the reason has to be *a stat, a trait, a personality* - so it is blocked on the rework by construction |

⚠ **`C3` (the muster may not be distinguishing anybody) stays LIVE and that is a judgement call.**
Its bands are read off stats, so the rework could move it - but the fault is that **four sentences a
head say the same thing about all three candidates**, and that is a writing and banding problem that
will still be there whatever the numbers become. ⛑ **A question the rework might incidentally fix is
not the same as a question the rework OWNS.**

---

## A · The two you asked about

### A1 · What is #204?  ⏸ PARKED (the stat rework)

**STRENGTH and AGILITY become visible ladders instead of invisible modifiers.** Your own words,
2026-08-19: *"возле уровня показать, что он дает. Базовый уровень - условно средний для человека и
обозначен 1... каждый уровень давал изменение к стату... показатели не перемножаются, а
добавляются"*, and *"на здоровье влияет размер... здоровье огра большое - потому-что он большой и
много силы. И реткина маленькое."*

**Today** a stat is a number that feeds a formula nobody sees. **After #204** each stat is a rung on
a signed ladder, **0 is the ordinary human**, and the rung says on the sheet what it gives you:

| | |
|---|---|
| **hitpoints** | `BASE_HP[size] × (1 + Σ STR hp rungs)` - the **size** carries the body (ogre 70, human 56, ratkin 42) and STR multiplies it, which is exactly your ogre/ratkin sentence |
| **damage** | `dice + 2 × (1 + morale + Σ STR damage rungs)`, one bracket, **no flat bonus** |
| **to hit** | `68 + Σ AGI` · **dodge** `14 + Σ AGI`, added and never multiplied |
| **the shape** | nine rungs, **−4 to +4**, negatives are real debuffs but softer than the buffs, and ±4 carries a capstone |

⚑ **It is specced to round three and deliberately not built** - it is the only thing in the whole
backlog waiting purely on you. ⚠ **The picture already exists**: #230 painted nine grades × four
stats (HANDS / BOOTS / BRAINS / HEARTS) and they are on the sheet right now. **The ladder art is
shipped and the ladder is not**, which is the odd state this entry sits in.

⭑ **My read: build it.** It is the last big thing that makes a character sheet mean something to a
stranger, ten people have now played, and the art is already paid for. The risk is that it touches
every damage number in the game at once, so it wants the Gauntlet (#229) run before and after.

**→ Your answer:** _______

### A2 · What is #47?  ⏸ PARKED (the class rework)

**The spear gets its weakness, and that turns it from a poke into field control.** Today the spear
is reach 2 with two signature moves and **no downside at all**. Your own version of the missing half:

> *A spear is a bad weapon in a clinch. Standing adjacent to a spearman costs them accuracy - one
> full band. But shove and strike still work perfectly, and after the shove the enemy has to spend a
> turn walking back in.*

| | |
|---|---|
| **strong** | at reach 2, the hex nobody else threatens |
| **weak** | at reach 1, the clinch it cannot fight in |
| **owns the answer** | SHOVE, the tool that turns reach 1 back into reach 2 |

⛑ **That is the only class in the game whose counter to its own weakness is a positioning action**,
and it quietly fixes something else: SPEAR WALL and BRACE AND SHOVE currently read as two unrelated
weapon modes, and under this rule they are **the same job answered twice** - the wall punishes the
approach, the shove undoes an approach that landed.

**The build is small: one condition in the accuracy calculation** (the site that already prints
`marsh −10` receipts) plus the receipt line *"too close for the spear."* ⚠ **The expensive half is
the enemy AI in both brains** - they have to understand that closing on a spearman is now correct.

⭑ **My read: it depends on your answer to A1.** Both are reworks of what a number means, both want
the Gauntlet run either side, and doing them in the same window means measuring once. If you only
want one, #204 is the one a player sees.

**→ Your answer:** _______

---

## B · Live now, one line each, from the last ten batches

*These came out of #238 to #247 as `⏳` remainders. Every one is a taste call and every one is a
one-line change.*

| # | the question | ⭑ |
|---|---|---|
| **#247** | **Two heart-ish marks are on one screen.** The mood row's mark is an emoji face (😄🙂😕😟💀) sitting beside two drawn glyphs (⛨ ♥), and the sheet's **MOR** stat tell is a painted heart two columns from the **♥** that means blood. Neither is wrong alone. #102's wrong-unit rule is what would decide it | leave the faces, redraw the MOR tell as something that is not a heart |
| **#246** | **`wear` was kept on the roster tile** against a literal reading of *"other things"*. It is a clock (how long until the injury clears), not a description. Should it go? | keep it - it is the one thing on that tile that changes |
| **#244** | **The dogs' pack aura is live and could not be reproduced as a bug.** Her radius is 3 against a 2-hex bounce, which is probably the impression you had. It is a dial | drop the radius to 2 so it matches the bounce |
| ⏸ **#243** | **The glass-cannon mage is off the wall**, behind `MAGE_GLASS=false`. Two identical buttons, same word, same globe, different perks - the price is what makes it a choice | leave it off until the perk tree is real |
| **#241** | **`APRON_LATTICE=0`.** The apron round the board is bare painted ground. If *"чуть выходящие квадратики"* meant you wanted to SEE tiles out there, this draws them as outlines | leave it bare - marked tiles you cannot stand on is a promise the board breaks |
| ~~**#239**~~ ✅ | ~~**The wagon is not re-priced**~~ **DONE 2026-08-25** (*"b6 - good, close"*): `FRAME_COST` **6/12/24 → 5/10/18**, and the card's own *"Seats go 13, 14, 16, 18"* sentence is DERIVED off `FRAME_SEATS` now rather than typed, so B8 moved it in the same edit without anybody finding it. Was: against the new salvage curve. 6 / 12 / 24 ▤ for the three frames, against a measured **23-24 salvage a run** now that #239 halved it. Tier III is currently a greedy-run purchase | re-price to about 5 / 10 / 18, or say you want tier III to stay a stretch |
| ~~**#239**~~ ✅ | ~~**A rare-tier shop roll leans to trinkets**~~ **DONE 2026-08-25** (*"b7 - if it answere, solved - close"*): it answered. `rollRack` walks `slotOrder()` the way `rollFind` already did, so the SLOT is rolled off `FIND_SLOT` before anything is picked inside it. **Measured over 300 racks: main 41% · armour 25% · trinket 12% · bag 12% · off 11%**, against a pool whose shape was an accident of how many rows somebody had authored. ⛑ Still a preference and never a rule - an empty slot falls through. Was:, because most rare rows are trinkets. If it reads as repetitive the fix is a slot preference in `rollRack` | fix it - it is the same complaint #227 already answered for road finds |
| ~~**#238**~~ ✅ | ~~**The weak joint is `PARTYBASE`, not the wagon.**~~ **DONE 2026-08-25** (*"b8 do it, great"*): **13 → 11**, so the seat ladder is **11 / 12 / 14 / 16** and the muster is a real question about who rides. Was: A seat upgrade is only candy when the cap binds, and four founders at 8 of 13 rarely hit it before the first muster. **13 → 11 is the lever** | take it to 11 |
| ⏸ **#240** | **`PUNCH THROUGH` is priced and never fielded** - an archer perk nobody has met | leave it for the perk tree |
| **#232** | **Two ★ meet on one roster row** - the gold unspent-level star on the name line and the Captain's class mark below it. Different lines, different colours | dim the class mark |
| **#230** | **Two states scroll the company sheet** (a banked point, 8px; THE CIRCLE, 21px), against #133's promise of one screen and no scroll | accept it - the alternative is a smaller stat icon |
| **#219** | **The opening card carries a title again**, `THE THREE BELLS · before the road`. You deleted the old card's title, but that was a narrow column card; on the painted stage a title costs nothing and every other card has one | keep it |
| **#218** | **Three rail colours and a pace.** `honor` sits on grave-stone grey (the coldest thing on a warm card), `rest` on blue (a campfire, in blue), and the card unfold is **470ms**, which you meet 34 times a run | shorten the unfold to ~380ms; leave the colours |
| **#215** | **The mirror's landing ring.** An ivory ring marks the hex your click will actually land on. Hiding it makes you do the flip in your head | keep it |

---

## C · Older `👤` calls that are still real

*These sat inside `SHIPPED.md` rows where nothing collected them. I checked each against the
current build; the ones below are the ones that still describe something that exists.*

| # | the question | ⭑ |
|---|---|---|
| **#96** | **The armour bar is steel on everybody**, yours and theirs, while #247 just made the health bar red on everybody. It is a shell, not a person | leave steel - it is the one bar that is about the kit and not the body |
| **#96** | **Your pet scores as an ALLY, not as yours** (gold, not blue) | make it blue - it is yours in every other sense |
| ~~**#157**~~ ✅ | ~~**The muster's `tellLine` may not be distinguishing anybody.**~~ **RESOLVED 2026-08-25** (*"c3 - find how to resolve it"*), and **the complaint was not literally true - the measurement is what said so.** Over 400 musters two candidates share a whole four-sentence line **0.7%** of the time and all three share one **0%**. ⛑ **What is the same is the REGISTER, and that is arithmetic**: over 1,740 bodies str/agi/int run **3-13, median 8, p95 11** against thresholds written for 17/15/13/11/9, so the median body took the SIXTH of nine phrases and the top four were unreachable - `Not strong` 38% · `Heavy-handed` 39% · `Plain` 40%, every one below the middle of its own vocabulary. ⚡ **And #230's paintings were paying for it too**: `statIco` reads the same index, so str showed **5 of 9 grades**. The bands move, not one word of the vocabulary does: now `Strong enough` 39% · `Steady enough` 40% · `Sensible` 35%, and grades seen go **str 5→8, agi 6→9**. ⚠ `mor` untouched - it runs 1-19 and already used 9 of 9. ⚠ A readout change, not the stat rework; **#204 re-derives this ladder when it lands**. |
| **#147** | **The finale is one row from softer** if you want it. `plains` and `outpost` are two arenas that stay unused, with the reason recorded | leave it - #245 already moved this fight to 40% |
| ⏸ **#134** | **The joke door needs a reason the player can read before it comes back** - a stat, a trait, a personality - or it returns as the same dice roll it was cut for | it comes back when there is a CHARM-ish stat to hang it on, not before |
| **#93 / #90 / #146** | **The Fen-Mother sits on an authored board, not a rolled one.** The finding underneath is real either way: *a centred mass taxes whoever needs range*, so her 12-14 round band is partly an accident of the seed. ⚠ #146 then made her **12 points easier to hit** and recorded that as *"the closest this pass comes to her reserved re-tune"*, so the reserved re-tune is still owed | leave her - she is a boss, and an authored board is allowed to be authored |

---

## D · The four design questions that shape a later system

*From [`README.md`](README.md) §8. Nothing is blocked on these, but each changes what a later batch
looks like.*

1. **AUTO doctrine.** One order for the whole company, or assignable per person? **Per-person is
   more expressive and roughly triples the UI.** ⭑ one order for the company; per-person is #37 and
   it waits on a mature AUTO.
2. **Numbers in the chronicle.** The interface rule says hide them. Does the expanded record get an
   exemption, or does even that stay in words? ⭑ words everywhere - the exemption is how a rule dies.
3. **The run contract.** Is the no-death rule kept alongside #34's injury chain as a gentler
   contract, or **is the chain simply how the game works?** #34 is written as the default. ⭑ the
   chain is the game; a difficulty toggle later is cheaper than two contracts now.
4. **Generated voice.** Acceptable as a labelled temporary track for timing, or not at all? ⭑ yes,
   labelled, for timing only.
5. **The subtitle.** The front door reads **RABBLEBOUND** over *YOU CANNOT AFFORD TO BE GOOD TO
   EVERYONE*, which says the morality but **not the genre** - a stranger cannot tell it is a
   tactical game. This was flagged when the name was settled and never answered.

---

## E · Two things that are broken rather than undecided

*Not questions about taste. Listed here because they came out of the same sweep and you should see
them beside the rest.*

- ⛔ **THE DROWNED CHAPEL HAS A DOOR NOBODY CAN EVER OPEN.** Its `needMut:'gills'` choice is the
  **only mutation-gated door in the game**, and `MUTATIONS_ON` has been `false` since #16 parked
  mutations for the whole first game - so no body ever has gills and that door has never once
  appeared. It was recorded in #123 as *"the one place a mutation pays rent outside combat"*, which
  is exactly why it was kept, and the flag that killed it landed two entries later. ⭑ **Two honest
  answers**: cut the door, or let ONE mutation exist behind the flag so the card keeps its point.
  Either is small; leaving it is the only bad option, because the card currently offers a fifth door
  in its own source that nothing can reach.
- ✅ **THE STONE SHIELD IS BUILT** *(2026-08-25, *"Stone shield - do"*)*. `stoneshield` was painted, embedded and had no `GEAR` row since #192.
  It is an EPIC two-handed MAIN now to the brief's own numbers - **8-13 damage, +30 armour, +12 dodge, and every hit shoves a hex** - and it needed **two engine fields nobody had built**:
  `armourValue` never summed a main-hand piece (the brief predicted that one in capitals) and `unitFrom` never read a main-hand `dodge`, so it would have shipped with two numbers the sheet
  printed and the board ignored. ⛑ **And it is REACHABLE, which is the half that would have made it the next census finding**: `unique:true` means no random find can offer it, so it rides THE
  SITTING STONE's bread door - the ogre has been sitting on a rock since that card was written, and the rock is the shield. **No fifth door**, because style rule 4 caps the card at four.
  ⏳ **The four unpainted items are PARKED as art** (*"paintings for future"*): `crossbow`, `shape`, `tmap`, `draught` fall back to a glyph, which is a legitimate shipping state.
  ⏳ **The kris stays blocked** on a BLEEDING status the engine does not have. The Thunder-fish Kris is blocked on a **BLEEDING** status that
  does not exist in the engine; the Stone Shield is not blocked on anything. ⭑ build the Stone
  Shield, park the kris until something else wants bleeding.

---

## F · Ones I read as ANSWERED by later work

*I have not struck these. Say the word and they go; say otherwise and they come back up.*

| # | why I read it as dead |
|---|---|
| **#94** | *"the rail's placement is yours - maybe place under the skills?"* The battle screen has been rebuilt in #231, #234, #236, #243, #244, #246 and #247 since. The rail it names is not the rail that is there |
| **#95** | *"everything at FULL is 9% smaller; one constant if that is too much."* #241 and #243 rewrote the camera, its clamping and its stops |
| **#122** | *"the prose paragraph above the grid; if he wants the pure BB ledger it goes."* #187 rebuilt the aftermath around that paragraph, deliberately, as a tray |
| **#135** | *"if the fights now read as too soft, that is a separate call."* You have just called the balance done |
| **#155** | *"whether the opening is now too FAST is a playtest question."* Ten people played it |
| **#108** | the two interpretation calls (the *"correct king"* read as the ratkin; Vesna as the second arrival). Both have been in the shipped opening for two weeks and nobody has objected |
| **#141** | *"the two mood numbers are a guess (−4 / +8)."* The card now has one door and one figure, `morale:8` |
| **#143** | the coin's one door overruling #141's two-door decision. Same card, same answer |
| **#152** | *"the 4-vs-5 number itself is his to feel out in play."* Ten runs of play, and the payday cycle has not been raised once |
| **#156** | *"whether the enemy's reach should show his weapon's REACH on top of his stride."* #244 and #246 rebuilt what a hex shows about reach twice |

---

*When you answer, an answer here is enough - I will move each one into the build and strike its row.*
