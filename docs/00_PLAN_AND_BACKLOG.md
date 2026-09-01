# RabbleBound - the plan and the backlog

> **This file is the WORK.** What we are doing now, what waits, and one line per entry.
> The full spec of any entry lives in [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md).
> ⛔ **Open the one entry's section there, never the file: it is 199 KB.**
>
> Orientation is [`README.md`](README.md) · the record is [`CHANGELOG.md`](CHANGELOG.md) ·
> what shipped is [`SHIPPED.md`](SHIPPED.md) · your test bench is [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md).

---

# 🔴 THE CURRENT FOCUS

> ## ⛔ 2026-08-22: THE "NOTHING IS ADDED" RULE IS LIFTED. THE FOCUS IS FINISHING THE BUILD.
>
> The user, 2026-08-22, while ordering #238 (the wagon): *"and change the rule add no more, i get 7
> feedbacks, waiting for 3 more. Need to sinish build"*.
>
> So: the rule below (*nothing is added; cut, delay, merge*) no longer decides an argument, and an
> entry is judged by whether it **finishes the build**. Everything the clarity pass found stays as
> the measuring habit (measure the box before the font, a sign is not a readout, the receipt is
> derived) and as history; it is no longer the veto. The first entry under the new rule is **#238**,
> and its spec still passes the gate the old way: rules, a picture, then code.

> ## ✅ 2026-08-25: **THE TEN-FRIENDS GATE IS PAID. TEN PEOPLE HAVE PLAYED IT.**
>
> The user: *"10 people played, I slowly implement feedback."*
>
> ⛑ **So the gate below stops being a thing to reach and becomes a thing that is RUNNING.** The
> question it was built to ask - *does it survive somebody who is not you* - has been asked ten
> times, and the answer arrives as a queue of feedback rather than as a verdict. **What that changes
> for this file: an entry earns its place by being on that queue, not by an argument made here.**
>
> ⚠ **And it retires the phrase *before the friends play*, which is the sorting rule 🟡 NEXT and
> ⚪ LATER were both written against.** Neither bucket means what its heading says any more: NEXT was
> *"still before the friends play"* and LATER was *"after the friends have played"*, and both of
> those moments are now behind us. **Read them as cost, not as time** - NEXT is what is small and
> finishable, LATER is the depth pass that is still deliberately not started.

> ## The feedback, 2026-08-10, in the user's words
>
> > *"The biggest thing: lack of clarity and too many options/systems from the start."*
>
> **And the ruling that came with it: *"I think this version we will work only on it."***
>
> ### The second round arrived the same day, with a screenshot of the battle panel
>
> > *"1) What is hard - understanding what is going on even in the menu - very small type and lots
> > of numbers everywhere. 2) It took me a very long time to see where to read a character's step
> > count - also hidden in small type. 3) Make the hot keys either smaller or not overlapping."*
>
> **#88 shipped against all three on 2026-08-10** *(8f.117, see [`CHANGELOG.md`](CHANGELOG.md))*, and
> the finding is worth carrying into the rest of the pass: **all three were one measurable cause.**
> The skill list was a two-column grid, a 133px column leaves a card 116px of inner width, and the
> longest skill name in the game wants 128px of it. **The card was structurally unable to show its
> own contents, so the type could not be raised - there was nowhere to put it.** One column gave it
> 213px and paid for all three fixes at once. ⚑ **The lesson: "the type is too small" was a
> SYMPTOM of a box that was too narrow. Measure the box before you argue about the font.**
>
> **⏳ MORE OF THE FEEDBACK MAY STILL COME.** Until it does, the two blocks above are the whole
> brief, and the work below is scoped to them.

## What that sentence actually says, and it is two complaints, not one

| | the complaint | what it means for the build |
|---|---|---|
| **A** | **lack of clarity** | the player does not know what is happening or why. This is a **legibility** problem, and it is fixed by explaining less at once, not by explaining more. |
| **B** | **too many options / systems from the start** | the player is handed the whole game in the first fifteen minutes. This is a **pacing** problem, and it is fixed by **taking things away from the opening**, not by adding a tutorial on top. |

**⛔ The rule for this whole pass, and it decides every argument in it:**

> ## NOTHING IS ADDED. THE ONLY MOVES ARE CUT, DELAY, AND MERGE.
>
> *(⛔ **LIFTED 2026-08-22** by the ruling at the top of this section. Kept as the record of the pass.)*
>
> A new tutorial, a new hint layer, a new card explaining the cards: all three are the wrong
> direction, because the report is *too much at the start*. If a system cannot be cut, it gets
> **delayed** until the player has a reason to care about it. If two things say the same thing, they
> become one thing.

**Why this outranks everything else in the file.** The build is feature-complete for one act and has
survived a full QA playthrough with no soft locks. It does not need more. It needs the first
fifteen minutes to stop being a wall, and that is a subtraction job.

## What the pass has shipped, and what it taught

*One line per entry, newest first. **[`SHIPPED.md`](SHIPPED.md) is the registry** and it names every
open remainder; the reasoning is in [`CHANGELOG.md`](CHANGELOG.md) under the build-log number. This
section used to carry each entry in full, which made the work file a second changelog. Cut back on
2026-08-14.*

| | the subtraction | log |
|---|---|---|
| **#286** *(09-01)* | **The signature needs the weapon in hand, the cards quote what they pay, and the arrow goes somewhere** | 8f.309 |
| **#285** *(09-01)* | **Every class gets its tier-4 fork, the training lock becomes a rule, and the picker says what a class gives** | 8f.308 |
| **#284** *(09-01)* | **The PLATEMAN, the harpoon, and the class lane stops costing a perk point** | 8f.307 |
| **#283** *(09-01)* | **The halberd had no door, the weapons get categories, and one MAGE says what it costs** | 8f.306 |
| **#281** *(09-01)* | **The glass-cannon mage is deleted, and the class lab says what each weapon unlocks** | 8f.305 |
| **#280** *(09-01)* | **The class lab: every class in one table, a body built by hand, and a fight to try it in** | 8f.304 |
| **#279** *(09-01)* | **The Armoury: every artifact, where it comes from, and who it is for** | 8f.303 |
| **#278** *(09-01)* | **three vacuous checks, the table the linter never read, and two dead vignettes** | 8f.302 |
| **#267** *(08-30)* | **the lizards of the burnt road** | 8f.292 |
| **#266** *(08-29)* | **the nine-ask inventory batch** | 8f.291 |
| **#265** *(08-28)* | **the other side breaks less easily, and a champion is four levels on** | 8f.290 |
| **#264** *(08-28)* | **the race lanes fill out** | 8f.289 |
| **#263** *(08-28)* | **the enemy climbs the same four ladders** | 8f.288 |
| **#262** *(08-27)* | **the tree lands** | 8f.287 |
| **#261** *(08-27)* | **the old tree comes out** | 8f.286 |
| **#260** *(08-27)* | **the first three general skills** | 8f.285 |
| **#259** *(08-27)* | **the promise audit** | 8f.284 |
| **#258** *(08-27)* | **the Gauntlet reads what it used to carry** | 8f.283 |
| **#257** *(08-27)* | **every promise on the four ladders pays** | 8f.282 |
| **#256** *(08-27)* | **the three remainders of #253 and #254** | 8f.281 |
| **#255** *(08-27)* | **six asks after playing the ladders** | 8f.280 |
| **#254** *(08-27)* | **the four ladders go in** | 8f.279 |
| **#253** *(08-27)* | **the ordinary human is 0 on every axis** | 8f.278 |
| **#252** *(08-27)* | **a stat is a sum, and both surfaces that print one show it** | 8f.277 |
| **#251** *(08-26)* | **seven small fixes** | 8f.276 |
| **#250** *(08-26)* | **three asks** | 8f.275 |
| **#249** *(08-26)* | **fourteen asks** | 8f.274 |
| **#248** *(08-25)* | **the maintenance pass** | 8f.272 |
| **#247** *(08-25)* | **fourteen asks** | 8f.271 |
| **#246** *(08-25)* | **twelve asks** | 8f.270 |
| **#245** *(08-25)* | **eleven asks, and three of them found things that were BUILT AND UNREACHABLE** | 8f.269 |
| **#244** *(08-25)* | **sixteen asks, by screen** | 8f.268 |
| **#243** *(08-25)* | **eighteen asks, by screen** | 8f.267 |
| **#242** *(08-24)* | **the dev bench** | 8f.265 |
| **#241** *(08-24)* | **the map is wider than the fight** | 8f.264 + 8f.266 |
| **#240** *(08-24)* | **nineteen asks, by screen** | 8f.263 |
| **#239** *(08-24)* | **twenty asks, by screen** | 8f.262 |
| **#238** *(08-23)* | **the wagon comes on the road** | 8f.261 |
| **#237** *(08-22)* | **the new world map, and the five permanent places stop being abstract marks** | 8f.260 |
| **#236** *(08-22)* | **the damage figure comes off the body and the bar learns to say *maybe** | 8f.259 |
| **#235** *(08-22)* | **the working file stops carrying 27 MB of base64** | 8f.258 |
| **#234** *(08-22)* | **the board answers again, the blow is drawn on the bar it comes out of, and the sheet's header pays for its own air** | 8f.257 |
| **#233** *(08-22)* | **the new world map is canon and seven portraits are repainted** | 8f.256 |
| **#232** *(08-22)* | **the pool is called MOOD, the Captain gets his own trait, and the stat block is re-laid out of its own hole** | 8f.255 |
| **#231** *(08-21)* | **the board answers when it is asked** | 8f.254 |
| **#230** *(08-21)* | **the stat icons land: four families, nine grades, 32px** | 8f.253 |
| **#229** *(08-21)* | **the Gauntlet, the campaign battle bench** | 8f.252 |
| **#228** *(08-21)* | **the flag moves off the head, fades until it is all the way out, takes every nerve readout with it, and the ladder loses a rung** | 8f.251 |
| **#227** *(08-21)* | **the road stops handing you a second one of what you have, a level-0 hire is half price and unarmed, and the morale flag is painted** | 8f.250 |
| **#226** *(08-21)* | **the build names itself, the seats mark joins the number it counts, and a walked road stops being transparent** | 8f.249 |
| **#225** *(08-21)* | **the injury ladder: a fall costs more every time, and the third one is the last** | 8f.248 |
| **#224** *(08-21)* | **seven small asks in one desk, and three of them were the file already having the parts** | 8f.247 |
| **#223** *(08-21)* | **Nine small asks, and four were one sentence nobody had measured** | 8f.246 |
| **#222** *(08-21)* | **`claim.ps1 verify` threw instead of answering, and the `2>$null` was the bug** | 8f.245 |
| **#221** *(08-21)* | **the payday and the card stop standing on each other** | 8f.244 |
| **#220** *(08-21)* | **the world bar counts bodies, the mood is a face, and the menu moves to the map's top right** | 8f.243 |
| **#219** *(08-21)* | **the opening's two cards are on the event stage** | 8f.242 |
| **#218** *(08-21)* | **the card unfolds, and a door's edge says what kind of act it is** | 8f.241 |
| **#217** *(08-21)* | **a beast is a race of its own, and the dogs stop being ratkin** | 8f.240 |
| **#216** *(08-21)* | **the practice field prices both sides of every fight on one derived scale** | 8f.239 |
| **#215** *(08-21)* | **the mirror, and three things the battlefield was saying too loudly or to the wrong creature** | 8f.238 |
| **#214** *(08-20)* | **fifteen more J-stage masters wired in, and one row had been wrong since #209** | 8f.237 |
| **#213** *(08-20)* | **the price of leaving a zone of control moves off the body and onto the hand** | 8f.236 |
| **#212** *(08-20)* | **an ally in the archer's lane costs accuracy now instead of the shot, and two notes about Asha** | 8f.235 |
| **#211** *(08-20)* | **the three race marks are the painted ones everywhere, not only on an event door** | 8f.234 |
| **#210** *(08-20)* | **the chase on the wheel-rut road, and the tap-room had never recorded who walked out of it** | 8f.233 |
| **#209** *(08-20)* | **every card in the game is a painted stage, style J out of the sketch, and not one of the 99 was rewritten** | 8f.232 |
| **#208** *(08-20)* | **skill groundwork, the three rulings the battle could already say** | 8f.231 |
| **#206** *(08-20)* | **five on battle readability, and three of them were a line nobody had written** | 8f.228 |
| **#205** *(08-19)* | **three out of the feedback round, and every one of them was a measurement before it was a fix** | 8f.227 |
| **#203** *(08-19)* | **the itch.io build, and the storage that is not there** | 8f.225 |
| **#202** *(08-19)* | **the run-through, and the playtester build** | 8f.224 |
| **#201** *(08-19)* | **the albino half-ratkin joins with the ratkin, and the fire card where she talks** | 8f.223 |
| **#200** *(08-19)* | **nine notes on the company sheet, and the two with findings under them were both the sheet quietly carrying something in the wrong container** | 8f.222 |
| **#199** *(08-19)* | **the em dash leaves the game** | 8f.221 |
| **#198** *(08-19)* | **a `grimtoll_text_edits` ledger of 24 marks, applied - and the instruction *"if you see some pattern or similareties that could be done for other tasks - do it"* is what found most of it** | 8f.220 |
| **#197** *(08-19)* | **seventeen asks in one morning, and three of them turned out to be the build lying quietly** | 8f.219 |
| **#196** *(08-19)* | **three asks, and two of them found something the build had been hiding** | 8f.218 |
| **#195** *(08-19)* | **the hit odds come back, and the mirehare overlay turned out to be lying** | 8f.217 |
| **#194** *(08-19)* | **four asks on the world map, and two of them were the map having quietly gone out of date** | 8f.216 |
| **#191** *(08-18)* | **six asks in one batch, and the finding is in the first one** | 8f.211 |
| **#190** *(08-18)* | **the world map's ground is a painting now, and the finding is that the ground was the only thing allowed to change** | 8f.210 |
| **#189** *(08-18)* | **his two notes, and the first one had a false premise that was worth more than the request** | 8f.209 |
| **#188** *(08-18)* | **his seven notes, and note 2 is the one with a finding under it** | 8f.208 |
| **#187** *(08-18)* | **the after-battle screen re-dressed on the hybrid mockup he approved outside the repo, and the discipline of the entry is that NOTHING under it moved** | 8f.207 |
| **#186** *(08-18)* | **his six notes, and every one is a user-ordered addition, so the file says so** | 8f.206 |
| **#185** *(08-17)* | **his three voice notes, and the middle one deleted a whole second teacher** | 8f.205 |
| **#176-#184** *(08-17)* | **the eleven-item batch, and the first item turned out to be a renderer**: a door's cost is **derived off `fx`** now instead of typed, because deleting the prose he boxed in red would have deleted the price off the toll-man, whose four labels *were* its receipt - and the derivation immediately caught the aqueduct promising `+1 salvage` on a door that pays 2. 63 mood-echo clauses gone with the shape that carried them · the second objective is one recruit and its row **closes itself** · the road speaks 29% less often and FOUND/LOST drop from 7 of 12 vignettes to 4 of 9 · a shop row gets a reserved art box and its real numbers (reversing the half of #157 that took the arithmetic off with the atmosphere) · the aftermath band set at its own shipped floor, 867 words to 702 · ⛔ **the fork sign was counting node TYPES and not one road on this map holds a fight you cannot refuse** - it asks the cards now, and the row became a Hades boon with the node's own painting on it · ⛔ **an empty larder started 4 of 4 of the line ROUTED**, measured against HEAD in a second tab, and the guard that stops it runs after the penalties and reads `nerveFrac` because the Circle is never written into `u.morale` · the first Hold patrol loses a crest, 9/15 → 14/15 at n=15 · the survey is three questions and the report stops showing the player a JSON blob | 8f.204 |
| **#175** *(08-17)* | **the shake comes back a quarter, and four captions get four lines** | 8f.203 |
| **#173** *(08-17)* | **the fight slows down enough to be watched, and the hex grid finally interlocks** | 8f.201 |
| **#164** *(08-16)* | **the designers' checklist out of the Turn-Based Games Discord, and the three scales that answered four of it** | 8f.192 |
| **#157** *(08-14)* | thirteen of his notes, and the first three were **one bug**: the token's furniture is nailed to the hex and ... | 8f.185 |
| **#156** *(08-14)* | twelve of his notes: **the step numbers and the terrain glyphs off the hexes**, the enemy's reach finally ... | 8f.184 |
| **#155** *(08-14)* | the opening pass: **THE GRAUSEN ROAD card and the tour's THE DAY step both deleted**, the prologue card stops ... | 8f.183 |
| **#154** *(08-14)* | **every road door wears its intent** | 8f.182 |
| **#151** *(08-14)* | eight of his notes: a fourth door on the toll-man that takes the whole robbery, the menu's two playtest rows ... | 8f.179 |
| **#150** *(08-13)* | eleven notes: the opening loses a title, a sub-label and a whole screen; the receipt chips learn which glyph ... | 8f.178 |
| **#145-#149** *(08-13)* | the brawl's second wave splits · the aiming pass, every summed row carrying its working · two finished grounds reach the campaign · #36's blocked lane joins the one gate · AUTO leaves `setInterval` | 8f.173-177 |
| **#143** *(08-13)* | **the road's prose cut by a third**: 5,474 words to 3,652 across 34 cards, and the outcome numbers leave the prose for the aftermath's own chips | 8f.171 |
| **#141 · #142** *(08-13)* | the coin is a one-door pickup that wears its loot on the card · the race box was saying everything twice | 8f.169-170 |
| **#124-#135** *(08-13)* | the overnight batch: one menu button and Esc everywhere, START NEW GAME starts one, six morale rungs instead of five, archers that advance and give ground, the spear line screening them, stat names people already have, every bow reaching 5 | 8f.152-163 |
| **#133 · #136 · #140** *(08-13)* | 🎒 **the company sheet, three rounds**: 1241px and 564 words down to 678px and 242, no scroll, stats first and the kit on the body | 8f.161-168 |
| **#137 · #138** *(08-13)* | the seven-item pack, and **four cards between the brawl and the map become one**, which leaves no decision in the opening at all | 8f.165-166 |
| **#123** *(08-12)* | **nine road events lose eleven doors**, then five more go 4 to 3: 48% of the multi-choice road, and the choice economy becomes concept §5 | 8f.150-151 |
| **#122** *(08-12)* | 📜 **the aftermath on the Battle Brothers shape**, so half the fights are one screen now | 8f.149 |
| **#108-#111 · #118-#120** *(08-12)* | 🚪 the front door: an intro brawl that teaches by being played, then fight first and contract after | 8f.135-147 |
| **#103-#107 · #112-#117 · #121** *(08-11/12)* | 🗺 **the road screen, ten rounds**, and 32 painted sights standing on the nodes | 8f.130-148 |
| **#88 · #91 · #94-#105** *(08-10/11)* | ⚔ **the battle screen, nine passes** | 8f.117-132 |
| **#90 · #93 · #99** *(08-11)* | the board is **drawn** per battle from a terrain-owned pool: four arrangements where there had only ever been one | 8f.118-127 |
| **#92 · #139 · #144** *(08-11/13)* | the desk itself: collision guards, a branch and a worktree per session, and a spent number that gives itself back | 8f.119-172 |
| **#87** *(08-10)* | every skill gets its own animation from eight primitives keyed on what an act does: **subtraction of reading, not addition of system** | 8f.116 |

### What it taught, and this is the part that decides the work still left

- ⛔ **Measure the box before you argue about the font** *(#88)*. All three of his battle-panel
  complaints had one cause: a 133px column leaves a card 116px of inner width and the longest skill
  name in the game wants 128. The type could not be raised because there was nowhere to put it.
- ⛔ **Budget three passes on a surface, not one: the second is finish, the third is corrections**
  *(#94, #95)*. The battle screen took nine. **And by the eighth pass, a complaint that sounds like
  taste is usually a constant that is wrong** *(#105)*: three of round nine's eight points were
  faults that had been shipping for weeks.
- ⛔ **By the third ask on a surface, look for the readout printing the wrong unit** *(#102)*, not for
  another box to move. SPEED counted in duration, so pressing toward the bigger number made the
  board slower.
- ⛔ **A rule that was complete when it was written breaks the day the screen grows a second kind of
  object** *(#113, #117, #121)*. When that happens, grep every placement rule that enumerates the old
  ones, and add the new candidates as a second pass rather than another rung in the first.
- ⛔ **A minimum over n is not a measurement, it is the unluckiest sample** *(#145)*, and it gets
  worse every time you look. Two nerfs were drafted against a worst case that n=50 said did not
  exist. **Measure a tail as the fraction of runs under a threshold.**
- ⛔ **Build the literal ask first when it is cheap, then measure it, then refuse it if it does
  nothing** *(#146)*. The measurement is what earns the right to ship the better version instead of
  arguing about it.
- ⛔ **Re-measure a remainder before scheduling work against it** *(#147-#149)*. #133's *"the sheet
  still scrolls 65px"* had already been closed by #136 and nobody noticed.
- ⛔ **A report's premise is a claim, and a claim about what was deleted is one `git log -S` away
  from being checked** *(#151, and #114 and #136 before it)*. Three reports now have described a
  build that does not exist.
- ⚑ **The signal usually exists already, inside the room it is about** *(#150)*. What ships is it
  being visible from where the player decides whether to open that room.
- ⚑ **A sign is not a readout** *(#151)*. A forecast carries its uncertainty on its face, a receipt
  stays exact. It is rule 11 in [`README.md`](README.md) §4 now.

> **⚑ #152 SHIPPED 2026-08-14 (8f.180): wages fall due every FOURTH day now, not daily.** He asked
> the design question first (*"how often do you think i need payments for crew? I am thinking once
> in 4-5 days +-"*), the analysis answered **4** (daily was Battle Brothers' cadence without its
> hundreds-of-days timescale; a ~22-day run wants the Wartales shape, a dated bill you can see
> coming; 4 gives one payday per fork branch and a bill one good find can cover), and he ruled
> *"ececute this new system of padayin 4 day"*. The bill **accrues silently** and the chest opens
> **loudly** on the day - a gold flash on the chip and the purse, the coin sound, a road line,
> never a card - and the new **PAYDAY chip** counts down to it, which is the "add this to global
> map more clear" half. **Every crown price came off the roads in the same order** (map labels,
> fork rows, travel buttons: days only now), which cashed #150's last open remainder, and is safe
> because accrual keeps a longer road costing more. Two wages changed hands with it: **the Captain
> draws 1** and **the ogre is paid 2**, ending the one-crown joke. The missed-payday grievance
> (#5/#114: 10 mood a day, nerve on the field, the five-day walkout) is untouched except for when
> it starts: the first short day is a payday now. **Under the pass's own rule this is a MERGE**:
> ~22 silent daily charges became 5-6 dated events, and the only new pixel is the chip that
> replaced UPKEEP. Full record: [`SHIPPED.md`](SHIPPED.md) #152 and [`CHANGELOG.md`](CHANGELOG.md)
> 8f.180.

## The work, in order

| | | done when |
|---|---|---|
| ~~**1**~~ | ~~Measure the opening before touching it.~~ ✅ **CLOSED 2026-08-25 BY THE USER, AND NOT BY A MEASUREMENT.** *"close, it is manual tuning, I was returning it many times"*. ⛑ **The step asked for a number so that #86's cuts would have something to argue with, and the cuts happened anyway** - #108 put the brawl first, #112 added a node, #118-#120 reshaped the whole opening, #138 collapsed four cards into one, #141 made the second card LIGHT, #219 put both cards on the painted stage. **Six passes of hand tuning, each judged by playing it**, and then ten people played the result. ⚠ **A count taken now would be measuring a thing that is already settled**, which is the opposite of what step 1 was for. | closed by ruling |
| **2** | **[#86 - the first fifteen minutes](#86--the-first-fifteen-minutes)** | the numbers from step 1 are cut hard, and the teaching survives the cut |
| **3** | **The screen pass**, five surfaces, one at a time, before-and-after shots | ✅ 🎒 **company** *(#133 · #136 · #140)* · ✅ 🗺 **road** *(ten rounds, #103-#107 · #112-#117 · #121)* · ✅ 📜 **aftermath** *(#122)* · ✅ ⚔ **battle** *(nine passes, #88 · #91 · #94-#105)* · ⏳ 🚪 **front door** - rebuilt by #108, #111, #118-#120, #138 and #150, and what it still owes is step 1's measurement · ⏳ **the practice field**, untouched. ⚑ ~~The target for what is left is a number: 61 declarations below 10px~~ **cashed by #164 (2026-08-16): the 10px floor raised all 153 of them and `font-size` literals in the file are 0** - re-measured by #202 on every screen, nothing under the floor. Each round's rules are in the focus section above; the rows are in [`SHIPPED.md`](SHIPPED.md) |
| **4** | **[#39 - Meet the Rabble](archive/BACKLOG_ENTRY_SPECS.md)** | the crew is introduced without a fourth modal. **It must replace or enrich the arrival cards, never add to them** |
| **5** | **Re-measure**, and hand it to the ten friends | step 1's numbers, run again |

---

## ~~270 · the nine-ask batch~~ ✅ BUILT 2026-08-31 (8f.295), in the working tree

> *2026-08-31, in one message with four screenshots. Quoted verbatim, because
> [[capture-all-task-context]]: the reason and the exact words are the half that does not survive a
> paraphrase. The batch arrived as **"another buch:"** directly after #269 landed.*

| # | the ask, in his words | where it lands |
|---|---|---|
| 1 | *"If you use terrain with pits use at least more then one (so it is more obsticle). And also feel fre to add other stuff here and there"* | `digPits` · `TERRAIN.rocky` |
| 2 | *"Don` need extra explanation about wen down and killed (screen) - because below ther is explisit infomation - also don`t write what resourse in words - icon is enough"* | `hurtTeach` · the aftermath's `fxChips` |
| 3 | *"After stop at the middle of the road i catch soft lock - that I cant continue forward movment"* | #268's mid-road pause · `drawNodes` |
| 4 | *"In the party maximum 4 ratkins (write then - if more they will kill each other)"* | a second cap, on race |
| 5 | *"I nned to go to menu from any screen"* | `MENU_ON` · `menuBtn`'s guard |
| 6 | *"The line near portrait when i was picking guy was good. But the line near each portrait on the left - i didnt want. You did it wronhly - can you please revrse and do right (screnshot)"* | `.rmem.on` vs `.rmem.<race>` |
| 7 | *"Add road event: When the mood is maximum (the highest tier) on the global map and it is payment day - your guys can skip payment 'travel with you is too good'. Very short shartp text (one sentence)"* | `MOODSTATES` · `passDays` |
| 8 | *"В фургон добавь постройку - которая перемещает одну из текущих построек в тележке в след. ран. И добавь несколько улучшений (как с сайзонм) которые увличвают кол-во активных построек в фургоне"* | THE RACKS · THE KEPT CRATE |
| 9 | *"Давай ограничим наем токо 1 воина из трех в пункте наема"* | `HIRE_LIMIT` |

---

## ~~269 · the twenty-five-ask batch~~ ✅ SHIPPED 2026-08-31 (8f.294)

> *2026-08-31, in one message with eleven screenshots. Quoted verbatim, because
> [[capture-all-task-context]]: the reason and the exact words are the half that does not survive a
> paraphrase.*

| # | the ask, in his words | where it lands |
|---|---|---|
| 1 | *"Lets delete catogeory of light and heady armor. Lets do the all type of armor blocks 70% of damage (and then some armor has different stats - that could be heavier or not). Would be easier to play around"* | `ARMOUR_BANDS` |
| 2 | *"Rename skill 'poison the blade' into 'poison' (both in battlfild and in inventory)"* | the ratkin act row |
| 3 | *"Show specifically - what this (and each sTAT last thing do)"* - arrow on **FLEET** | `capD` is authored and printed nowhere |
| 4 | *"For asha Trait 'Half human' - +1 strng + 1 morale, - 1 agility"* | `TRAITS` |
| 5 | *"Mirahare can go throgh their allies (buck)"* | movement blocking |
| 6 | *"On meraheres 'creeple shot' give them -1 to movement"* | `cripple` |
| 7 | *"Miraheres start battles without armor (put their curent armor into health)"* | `MIRE_T` |
| 8 | *"First and secondary weapon abilities related to a used weapon+class. Archer without bow couldnt use cripling shot (he just have nothing to shoot)"* | `actsFor` |
| 9 | *"somehow i feel with lower health you started to give less xp - can you please, reajust it again or check this connection?"* | `HDA_CUT` vs the XP formula |
| 10 | *"rename curent 'rate' to 'uncommon', 'epic' to 'rare' - amd create 1 more category - 'legendary'. It is golden and for exseptionally great artifacts"* | `RARITY` |
| 11 | *"Everchanging luck '+2', imstead +1"* | `effStats` |
| 12 | *"In the morale and health on hover show all modifiers to curent stat beloww"* | the two pool hovers |
| 13 | *"Some armors can have 'adjusteble' size - so you can put it on any creature without debaff. Create this property"* | `size:'any'` already exists; the WORD does not |
| 14 | *"And check agility increse of dodge and hit chance implimentation. So far i feel it isn`t alwayscorrect to writen numbers on stat (use it connected, not hard code)"* | measure, then report |
| 15 | *"when dog break enough distance - stop using 'the pack' ability. It should be a bit more dynamic"* | the aura tag |
| 16 | *"somehow in twitchy things doubles"* | the trait hover |
| 17 | *"on the enemy use same typeof icons as for your guys - so it is even more compact"* | the inspect card |
| 18 | *"lets delete it from the battlescreen (living option to zoom in and zoom out with your mouse)"* | `#bZoom` |
| 19 | *"In dog fith - some of them has armor, some of them doesnt - it doesnt go to hitpoints"* | same as 7, one fight along |
| 20 | *"Suriunded - 5 to swing for each adjustment ally (curen unit doesnt count). Morale debf stays also"* | `hitBreakdown` |
| 21 | *"move speed there"* - arrow at the player card's ACTIONS row | `#bPlq` |
| 22 | *"This marching dram is great. It sshould be a bit more expensive. and on the global map it is smaller icon with marching drum"* | price + the relic chip |
| 23 | *"reach of mages stuff - 1"* | `rod` |
| 24 | *"In here (after killing fen mother even) - two options only. And taking cub boosts morale +2 also"* | `cubChoice` |
| 25 | *"I cought soft lock on goldharrow"* | the Coldharrow card |

---

## 86 · The first fifteen minutes

> 🚪 **THE FRONT DOOR** and 🗺 **THE ROAD** - also ⚔ the first fight
> **SYSTEMS** the tavern prologue · the arrival cards · `COACH` · `whisper()` · `? RULES` ·
> #60's ten Captain lessons · the fork card · the first battle's action row
> **RELATED** #39 (the crew's introduction) · #60 (its open remainder IS the per-round cap) ·
> #14 (the three onboarding layers, shipped) · #43 (the speaking budget)
> **STATE** ⛔ specced only. **The gate is unpaid: no picture yet, and no measurement yet.**

**The entry is the feedback, and the number exists so the pass has somewhere to live.**

**What the opening currently runs, in order,** and the length of this list is the finding:

the tavern prologue cards → the joke and its verdict → the lord's brief (Skelbrook) → the map card →
the arrival whispers → the first fork → **Blood on the Road**, which is a four-or-five round fight
carrying **eleven Captain lessons**, allied NPCs you do not command, a side to pick, facing arcs,
engagement, the nerve ladder, cooldowns, two actions a turn, and a race skill.

**Three candidate cuts, and none of them is decided.** They are written down so the measurement in
step 1 has something to argue with:

1. **Cap the lesson rate.** #60's own open remainder already says this: *"eight to nine lessons
   landed inside a four or five round clash... if it reads as narration rather than teaching, the
   fix is the per-round cap, not the lesson count."* ⚠ **The thing this must not delete is the
   teaching.** A lesson that fires when its rule first bites is the cheapest teaching in the build
   and the most expensive to rebuild if it goes out with the prose.
2. **Delay a system rather than explain it.** The first fight does not have to contain every rule
   the game owns. Anything that can first appear at the Ruined Steading instead of at Blood on the
   Road is one fewer thing in the fifteen minutes.
3. **Fewer options on the opening cards.** The style rule already caps a card at four options
   ([`README.md`](README.md) §4). The opening is where that is worth being stricter than the rule.

**⚠ The trap in this entry: the opening is crowded, not empty.** Every instinct to "make the opening
clearer" adds a screen. Read the complaint again before writing anything.

> ✅ **#108 SHIPPED against this entry (2026-08-12, 8f.135): the Three Bells brawl**, the user's
> direct order. The run now opens with a scripted tavern 1v1 that grows in waves and teaches
> morale, armour, kick, the corner, the ratkin and a class skill with spotlight callouts on the
> real UI, while Blood on the Road's eleven balloon lessons stay muted there and unspent. **What
> this changes for #86: the cut of the first fight's lesson load is now SAFE to make**, because the
> teaching has somewhere else to live. The measurement in step 1 still comes first. Full record:
> [`SHIPPED.md`](SHIPPED.md) #108 and [`CHANGELOG.md`](CHANGELOG.md) 8f.135.

> ⚠ **AND #112 ADDED A NODE TO THE OPENING ON 2026-08-12** *(8f.139, the user's direct order, the
> same door #108 came through)*. **The Falling Star** sits between the tavern brawl and Blood on
> the Road, which had been two fights back to back; the road east is two days where it was one, and
> the wagon starts with 17 more crowns to pay for it (his number, in his sentence).
>
> **What this means for the measurement in step 1, and it has to be said plainly: the opening is
> one card and one day LONGER than it was when the complaint arrived.** That is not a violation of
> the pass by accident, it is the user overruling it deliberately in two consecutive orders, and
> both orders point the same way: he is not asking for more systems, he is asking for the two
> fights at the start to stop being adjacent. **The Falling Star adds no system, no screen, no hint
> layer and no resource** - one card, four options, and what it teaches is the pillar, which is
> the one thing the opening is supposed to teach.
>
> ⛔ **So step 1 must measure the opening AS IT NOW IS**, including the brawl and the star, and the
> candidate cuts above are to be re-argued against that number rather than against the one in the
> complaint. Full record: [`SHIPPED.md`](SHIPPED.md) #112 and
> [`CHANGELOG.md`](CHANGELOG.md) 8f.139.
>
> ⚑ **AND ON 2026-08-13 THE STAR LEFT THAT SLOT AGAIN, WHICH IS THE FIRST TIME THIS PASS HAS
> SUBTRACTED FROM THE OPENING RATHER THAN ARGUED ABOUT IT** *(#141, 8f.169, the user: "after tavern
> fight - next event instead of faling star (it could be a random event somwhere)")*. **The node
> stays. The beat stays. The two days stay. The CARD changed**, and it changed from a four-door wish
> that spends a permanent stat to a two-door pickup that costs nothing to understand. The star went
> into `FLOATING`, so it still happens, later, somewhere nobody scheduled.
>
> ⛔ **The number step 1 has to carry forward is therefore not "the opening is one card longer" any
> more, it is "the opening is one card longer and that card is now LIGHT."** #123's choice-weight
> rules (`01_GAME_CONCEPT.md` §5) are what make that a measurable difference rather than a taste:
> the second node used to ask for a decision the player would retell and now asks for one they will
> make in two seconds. **Whether the opening still needs the beat AT ALL is the question step 1 was
> always going to answer, and it is now the only thing left to argue about here.**

> ✅ **AND #118 + #119 + #120 RESHAPED THE OPENING ON 2026-08-12** *(8f.145-147, the user's
> five-task batch, built autonomously - the same door as #108 and #112)*. **The opening is the
> user's script now: the fight FIRST, the contract as its consequence.** One backstory card (a
> failed nobleman-venturer, alone; his own pint over his head; draw your sword) → the brawl →
> the man in the corner makes the Skelbrook offer with the old three replies intact → the
> company picks its own two-word name (7×7, deliberately ugly, signed along the bottom of the
> map) → a SHORT map card → **five spotlight steps on the #108 sheet** teaching the contract,
> the chest, the company, the day and the road, each beside the real element. The menu's "How
> any of this works" row became **The tutorial fight** (the brawl as a free practice fight;
> `? RULES` still owns the reference).
>
> **What this does to this entry's ledger:** the long first map card is CUT (four paragraphs →
> two), its teaching moved next to the furniture it describes, and the lord's pre-fight card is
> GONE as a separate beat - the opening now runs card → fight → cards, not cards → cards →
> fight. **Step 1's measurement must be taken against THIS opening.** Full record:
> [`SHIPPED.md`](SHIPPED.md) #118-#120 and [`CHANGELOG.md`](CHANGELOG.md) 8f.145-147.

## 137 · The seven-item pack, and 138 · the opening's post-brawl chain

> ✅ **BOTH SHIPPED 2026-08-13** (8f.165, 8f.166) and both are on the live link. One brief from the
> user, split across two numbers because five of its items were ordinary surface work and two of
> them were the front door.
>
> ⚑ **#138 got smaller after the mockup, and that is the entry's best moment.** The drawn card was
> built to carry the two existing doors settling in place. He looked at it and cut one of them
> outright - *"delete option 'put him on the floor' it is irrelevant"* - and turned the other into
> *"Finish your drink and leave"* straight to the map. **So the opening now contains no decision at
> all**, which is further than the spec dared go and is right: the card hands over a contract, a
> crew and a name, and the first real decision becomes the fork on the road, in a game about the
> road. **The mockup earned its keep by being cheap enough to be overruled.**
>
> **[#137](archive/BACKLOG_ENTRY_SPECS.md)** *(8f.165)* - the aftermath's haul line rebuilt off
> `haul.fx` with the top bar's own `RES_ICON` glyphs instead of 11.5px prose · **DISENGAGE's extra
> hex moves from NEXT turn to THIS turn** and takes a `cool:2` lockout, which is his *"so it makes
> sense and easier to escape"* · every event door carrying `battle:` renders red from one gate in
> the renderer (five fight doors ship un-marked today) · **four `learn`-tier Captain lessons
> deleted** because the #108 spotlight now teaches the same four rules ten minutes earlier · the
> map token wears the company's own name.
>
> **[#138](archive/BACKLOG_ENTRY_SPECS.md)** *(8f.166)* - **four full-screen cards between the
> brawl and the map become one.** Two of the four carry a single button that cannot be refused,
> which is the exact defect #118's own comment describes killing once already, on either side of
> the decision. The receipt joins the corner-table card, the pick settles in place, and **the
> naming strip appears only after the contract is accepted** - his second line, and the order the
> name card's own prose already assumed. ⛔ Nothing is deleted but the two dead buttons.
>
> ⚑ **This is #86's measurement arriving as a bug report before the measurement was taken.** Step
> 1 above still owes a number, and #138 changes the thing step 1 is supposed to count, so **the
> count must be taken against the post-#138 opening.**

---

# 🟡 NEXT - after the clarity pass, still before the friends play

*Fairness and finish. **Nothing here adds a system either.** These wait because the feedback did not
name them, not because they stopped mattering.*

| # | what it is | why it waits here | full spec |
|---|---|---|---|
| **204** | 📐 **STRENGTH and AGILITY become ladders, 0-5, and the rung says what it gives** - the user, 2026-08-19: *"возле уровня показать, что он дает. Базовый уровень - условно средний для человека и обозначен 1... каждый уровень давал изменение к стату... показатели не перемножаются, а добавляются"*, and *"на здоровье влияет размер... здоровье огра большое - потому-что он большой и много силы. И реткина маленькое... Вот это уже перемножающиеся результаты"*. **PROPOSED, not built, at ROUND THREE (nine signed rungs −4..+4, 0 = the ordinary human, the RACE table carries the body, damage is one bracket with no flat, negatives are real debuffs softer than the buffs, ±4 carries a capstone; the spec's round-three section supersedes the 0-5 numbers below)**: `HP = BASE_HP[size 42/56/70] × (1 + Σ STR hp rungs)`, damage `dice + 2 × (1 + morale + Σ STR dmg rungs)`, to-hit `68 + Σ AGI`, dodge `14 + Σ AGI`; STR 0..5 = −10%hp/−10%melee · base · +10%hp · +20%melee/+10%bow · +15%hp · +20%melee/+10%bow; AGI 0..5 = −5/−5 · base · +5 hit · +5 dodge · +5 hit · +5 dodge. Measured against today on the seven authored bodies: hitpoints, to-hit and dodge within 1-2 everywhere; the swing is −8% on the two human founders (the flat +3 becoming the field-wide +2), +20% on the ratkin knives, −12% on the bow (it moved to STR at his word). ⚑ one row closes both race deltas: **size also multiplies melee ×0.9/×1/×1.1** (recommended, his call). ⛔ STR and AGI only; INT and MOR are the next iteration. ⛔ prototype only. ⚠ the work is the MIGRATION (race lean, recruit roll, seven traits, three trinkets, five armour `agi`s, six injuries, the promotion click, the save map), all listed | the ruling on the five open numbers, then build + harness n=50 | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| ~~**193**~~ | ✅ **SHIPPED 2026-08-19 (8f.212), AND REACHABLE SINCE #245 (8f.269).** 🐇 **The mirehares, and THE RED LIGHTS.** The creatures, both movement verbs and the overlay were built on the day; ⛔ **and for six days nobody could meet them**, because `f2` was authored `ev:'mirehares'` AND listed in `SLOTS_ON_MAP`, so `dealEvents()` overwrote the key before the player took a step - **0 survivals in 20 deals**. #245 made it a fixed place and taught **LINT 8h** to ask whether a painted key can ever reach a node. ⚑ **The row stayed in NEXT for four days after it shipped**, which is the reason this file's own rule says *strike it from this file entirely* when an entry lands. | 8f.212 + 8f.269 |
| ~~**192**~~ | ✅ **BOTH HALVES SHIPPED: the art 2026-08-19 (8f.215), the ITEMS 2026-08-25 (8f.269).** 🎒 **Item pack 01.** All 56 paintings are wired through one table, `ITEM_ICON{}`, onto five surfaces plus the hover tip, ⛔ **the picture a COLUMN beside the text and never a character inside the name line** (inline it is a smudge at 24px and breaks the 67px slot pitch at 40). #245 then found the other half had never been pasted at all - specced, painted, embedded, **and no `GEAR` row anywhere** - and built four to this spec's own numbers: the draught, the pilum, the shuriken and the Time-Cube. ⏳ **What is left is TWO items and it is #245's remainder, not this row's**: the Thunder-fish Kris needs a BLEEDING status that does not exist, and the Stone Shield is unbuilt. Both already have paintings sitting in `ITEM_ICON` with no row to hang on. | 8f.215 + 8f.269 |
| ~~**174**~~ | ✅ **SHIPPED 2026-08-17 (8f.202).** ✦ **Experience: the level is earned, half by the company and half by the hand** - the user's order the same day the research landed, and the one entry in this bucket that DOES add a system, by his ruling. `p.xp` cumulative, `XP_TABLE` 100..3300 (a gentle triangle, cap 10), race need ×.8/1/1.2, INT the learning rate, a fight worth **1.5 × enemy hitpoints** (the dial set by the harness: 2 overshot to 4.7, 1.5 lands act 1 at ~4) paid half evenly to everyone who stood in it, half by damage + kills; the random promotion gone; nothing on the field; the crew card's `✦ +N`; the ring on the sheet and round every bust; perk tiers 2/4/6/8; one level-0 stranger per muster wall who picks a trade on the sheet; doors may pay `xp` | **Two things are still his**: whether the hand half counts damage TAKEN and the class verb (measured: the archer finishes ~a level ahead of the spearwoman over the act), and **acts 2-4**, which levels 5-10 are a promise about. Rows in [`SHIPPED.md`](SHIPPED.md) #174 and [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md) | [spec](archive/BACKLOG_ENTRY_SPECS.md) §174 |
| ~~**101**~~ | ✅ **CASHED BY #126, 2026-08-13 (8f.155).** *"The archer that is not allowed to leave"* is closed from the enemy's side, and the two gates it named were exactly the two that were wrong: the kite's `!engaged(u)` (so it switched off at the moment it was for) and AUTO having no kite at all. `fallBack` charges the parting swing now, because `walkTo` is not `clickHex`. ⚠ **Its own measurement was NOT re-taken** - 26% of archer turns with a 20%-or-better shot spent walking, and 119 dry ENGAGED turns of 874 - so whether those numbers moved is still an open reading, and #99's instrument is still the harness for it. ⚠ AUTO's kite is emergent (it retreats because the band scores hexes that way) rather than an explicit rule, so a future band change moves it silently | see [`SHIPPED.md`](SHIPPED.md) #126 |
| **13** | **The balance harness earns its keep** | ⚑ **the instrument.** Without it every balance session below is somebody's opinion. `window.ARENA` exists and has gone stale around every combat change since | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **89** | **The combat benchmark, and the three things it did not measure** - ✅ the document is written: [`COMBAT_BENCHMARK_2026-08-11.md`](COMBAT_BENCHMARK_2026-08-11.md) | ⚑ **the second instrument.** #13 measures *win rates*, this one measures **shape**: RabbleBound now sits in a table beside Battle Brothers, Wildermyth and Wartales at **8.45 rounds · 71.4 unit-turns · 115 actions · 1.61 actions per unit-turn · 4.6 skills per unit**, all measured. ⛔ **The remainder was three MEASUREMENTS, not builds** - the mop-up tail, a real stopwatch, and hit-rate distribution - so it does not argue with the clarity pass. ✅ **HIT-RATE DISTRIBUTION IS NOW TAKEN** (2026-08-13, during #146, ~1,200 swings a side across all eight fights, probed at `hitBreakdown` inside `runFight`): **before the pass, mean 60.3% · yours 58.7% · theirs 61.8% · 30.5% of every swing in the game was a coin flip or worse.** After: **65.6% · 66.3% · 65.0% · 19.4% under fifty.** ⚑ **AND THE MEASUREMENT FOUND SOMETHING NOBODY HAD ASKED ABOUT: BEFORE THIS PASS THE ENEMY WAS THE BETTER-AIMING SIDE**, by three points, in every fight in the act. It is not in any statblock - it falls out of the penalties only the player's side pays (shooting in a scrum, their own nerve, cautious) against the flanking bonus a side with more bodies collects - which is **THE FIGURE IN A STATBLOCK IS NOT THE FIGURE ON THE BOARD** arriving on a quantity nobody had thought to point it at. ⏳ **Four measurements still open**: the mop-up tail, a real stopwatch, and **two added 2026-08-18 by PART FOUR** - the forced-answer test and token legibility. Two readings are already live: **`brigand` runs 2.4x the opener at an even 6 v 6**, which is the exact shape of Wartales' *"longer, not harder"*, and the **enemy skill gap is 2:1** in the player's favour, which is what "one strategy beats everything" looks like from the inside. ⚑ **PART FOUR (2026-08-18, the user's GPT pass) ANSWERED THE SKILL-GAP TRAP AND IS THE PART TO READ**: *the unit of variety is not the race, it is the weapon* - Battle Brothers gets ten problems out of ten humans because **its enemies run on the same weapon rules the player does** (a spear is spearwall, a shield splits, a hook drags, a hammer breaks armour). ⛔ **So RabbleBound does not need new races or ten monsters. It needs the humans, ratkin and ogres it already has to force a different answer, visibly.** Its test routes the whole argument: *"what was I forced to do here that I did not do in the previous fight?"* - **same answer = MECHANICAL problem, different answers but same feel = PRESENTATION problem.** ⚠ **And it corrected itself on the way**: the research assumed most battle tokens were undrawn, and the check disproved it - **50 painted tokens are embedded, 41 of them units, nothing falls back to the silhouette** - which turns a vague worry into the measurable question in gap **e** (distinct as a FILE, but distinct as an OBJECT at 26x39 px?) | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| - | **The class pass** - pick up each of the seven and adjust | the human test the arena cannot run: **can the class be said in one sentence.** A class that needs a paragraph is a balance problem wearing a UI problem's clothes | [reasoning](archive/PLAN_REASONING.md) |
| - | **The race pass** - three ways to play, not three stat blocks | three banked questions: the poison stack is uncapped · a gilled body reaches 62% further in the swamp · is an ogre's 3 stride a tax or a shape | [reasoning](archive/PLAN_REASONING.md) |
| ~~**50**~~ | ✅ **DONE 2026-08-25, on the user's word**: *"that balance - done"*. The eight fights are survivable, readable and fair enough for strangers, which is all this entry ever claimed - it was always *"not the terminal pass"*. ⚑ **What actually paid it was not one session**: #216 priced both sides, #229 built the Gauntlet, #227 and #245 re-tuned the finale from a drifted 53% to 40%, #239 halved salvage and cut xp, and #242 gave the bench any foe and any perk. ⏳ **The TERMINAL pass is a different entry and is not claimed here** - #80's armour bands and #45's synergy rule are still its two named debts. | done by ruling |
| ~~**27**~~ | ~~Balance: the optional fight is harder than the finale~~ ⛑ **CARRIED BY #50's closure**, since this row's own note was *"inside #50's parking lot"*, and #245 measured and moved exactly this number: the enforcer finale had drifted to **53% against the honest one's 27%** and is **40%** now. ⚠ If the optional fight still reads as the harder one in play, it comes back as its own row with a win rate attached. | carried by #50 |
| **12** | Painted faces, pack 03 | mostly the user's generator work. A face is legibility, so it is arguably clarity work, but it is not a subtraction | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **158** | ➹ **The shot that always hits** | ⛔ **specced only, and deliberately unbuilt** - the user's own framing, 2026-08-14: *"add a skill (for the future, into the perk branch which is under development)."* An archer PERK, 2 actions, cool 3, **55-60% of the bow**, and it ignores the roll and only the roll: ⛔ the lane still refuses it, or *"always hits"* deletes #82's cover and #36's lane in one perk. ⚑ Its reason is measured rather than felt - the average chance to hit is 65.6% and 19.4% of swings are under fifty, so what an archer lacks is not power but the ability to **promise** anything. **It waits on #50 or at least #13**, because its value is exactly as large as the current hit rate is bad, and this pass has already moved that number once | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **47** | The spear becomes a zone | **a rework, not an addition**, which argues for earlier. It touches enemy AI in **both brains**, which is not what you destabilise the week before strangers arrive. **The trigger that pulls it forward:** the class pass finds the spearwoman unsayable in one sentence | [spec](archive/BACKLOG_ENTRY_SPECS.md) |

---

# ⚪ LATER - the depth pass, after the friends have played

*This is not a demotion. Most of it gets **cheaper** once the two foundations at the top exist.*

**Two foundations gate the rest, and the word gate means something else cannot start:**

| # | what it is | what is blocked behind it |
|---|---|---|
| **24** | **The provenance ledger** - `addFact` / `facts` / `latestFact` + `characterRef()`. The id is the reference; the snapshot is so a dead, dismissed or renamed person can still be talked about three hours later. **Double-write first, migrate never** | **#19 #22 #23 #25**, distant #26, #34's chain, and all of Act 2's memory. ⚑ **#38's typed bonds are its first real tenant** and currently live in their own store: absorb it rather than leaving two ledgers |
| **4+17** | **Body parts you can lose + mutations you can see.** One painter API, used in opposite directions: a lost part draws as outline-plus-cross, a mutated part is redrawn as a different shape | **#34 #35 #16** |

**Then, and the order inside is the tier order:**

| # | what it is | one line |
|---|---|---|
| **34** | ☠ **The mortality chain** | ✅ **SHIPPED as #225, 2026-08-21 (8f.248)**, on the user's own shape: **INJURED -> SCARRED -> gone**, where the middle rung is a temporary injury with a clock rather than #4's maiming. It therefore no longer waits on #4+#17. **Death is still the end of a visible chain, never a roll.** ⏳ Two halves of the original spec are still open and are the next work here: **AUTO may never spend somebody on their last rung**, and the road's `armourSac` door hands a body up the ladder without saying so |
| **32** | The rally rule | a routed body may not re-cross the rout line alone: it needs the Captain within 3 hexes or a steady ally adjacent |
| **2** | Personalities that command the AI | AUTO becomes a judgement about who you trust with which part of a fight |
| **35** | Grafts: rare authored consequences | of injuries **or of events on the road**. Not a doctor's menu. Start with one: Shield-Skull |
| **45** | ★ Reward the combination, not the repetition | the synergy rule. Deferred, and it returns as the first thing the terminal #50 builds |
| **78** | A good thing you carry takes something away | the gear side-effect contract. **The cost is paid on a different axis from the benefit.** ⚠ its quiver is blocked on a ruling that reopens #45 |
| **80** | The weapon gets its half of the armour bands back | ⛔ **hard order constraint: before the TERMINAL #50**, or the sweep gets done twice. #79 left a measured balance debt and this moves the number back |
| **16** | The rest of the mutations | 3 or 4 of the 14, never all. Each needs a real battle rule |
| **3** | The clash recruit is already changed | puts a mutation in front of the player in the first hour and gives the tutorial fight a cause |
| **22** | The road reads the company | waits on #24. *"Every Rabble is different"* should be visible in the prose, not only the stat screen |
| **19** | Desperation contracts at the Muster | waits on #24. ⚠ owes a rewrite: it promised a recruit *first pick of the loot* and there is no pick any more |
| **23** | The cost of command | waits on #24. The Captain's sheet only, and **facts with names, never a morality score** |
| **25** | Personalities that earn their evolution | waits on #24. Count qualified risky successes, never repeated actions |
| **59** | The woman from the cage comes back | spare Wynn, and in a **later run** she is waiting at the last quiet node and fights the Snare as an ally. She joins the fight, never the company |
| - | **Settlements & Legacy MVP** | the inheritance screen first. It is what makes a lost run mean something. [`09_SETTLEMENTS_AND_LEGACY.md`](09_SETTLEMENTS_AND_LEGACY.md) |
| **21** | What they did without you | strict thresholds and authored templates. If nothing exceptional happened, show nothing |

---

# ⏸ PARKED - with intent, never rejected

| # | what it is | why it waits |
|---|---|---|
| **134** | 🃏 **The joke at the man with paid swords** - the opening's cut third reply. *(Parked 2026-08-13 by the user: "make a joke option put from the opning to our ideas/things for future set.")* **"Agree with him. Cheerfully."** answered *"You scum"* with *"Scum, my lord, and cheap with it. You will not find better value in this county, and you have clearly been looking."* Then `Math.random()<0.5`: it lands and he pays **120** instead of 80, tells his swords this one can read, and leaves without shutting the door; or it does not, and the nearer sword puts a cudgel in your ribs for **50** and 16% of the Captain's hitpoints. | ⛔ **Why it was the right one of the three to cut**, and the note to argue with when it comes back: it put a **coin flip on the player's first real decision**. The other two are the pillar in one card (pride costs money, money costs pride) and a fifty-fifty beside them is not a third door, it is a lottery ticket nobody can reason about. **What it needs to return is a reason the player can read** - a stat gate, a trait, a personality, anything that makes the joke a judgement instead of a dice roll. ⚑ **Nothing was torn out:** `PRO_ART.joke_hit` still maps to EV00C (the rule file requires that mapping preserved and the painting is good), and the `verdict` banner machinery is intact. Full prose in [`CHANGELOG.md`](CHANGELOG.md) 8f.162, so this is a paste, not a rewrite |
| **49** | Make the AI explain itself | **deferred by the user.** The gate was paid: the rules are written and the picture was drawn, so it returns as a *build* session, not a design one. ⚠ **The picture itself is gone** - `shots/49_ai_explains.html` was deleted in the 2026-08-14 shots cleanup, and `shots/` was never in git. The written half survives in full at [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md) §49, so redrawing it is an hour, not a session |
| **16** | 🧬 **MUTATIONS - parked for the whole first game, behind one flag** *(2026-08-18, the user's call after weighing it)* | ⛔ **NOT A CUT. `MUTATIONS_ON=false` is the entire change**, and nothing was torn out: `MUTS`, both mutation acts (SINK BELOW, ROOTING GRASP), the gilled sprite state and its badge, `wetproof`, the sheet chip, the doll line and the `needMut` gate are all still there and all unreachable. **The only two statements in the game that write `p.mut` are inside the ripening block the flag guards**, which is what makes one flag enough - proved structurally, not by reading. Flip it and all ~35 touch points are live again with no archaeology.<br><br>**His reasoning, verbatim:** *"уже сложно: навыки, способности, типы врагов, арты со своими особенностями, метательное, расходники. Мутации звучат круто, но это огромный объём работы... раса и черты уже дают разброс. Слишком много систем, слишком много экранов."*<br><br>**And the measurement that agreed with him:** the system was **2 mutations** against ~35 integration points, and **exactly one door in the entire content set** gated on it (`chapel[1]`, needMut=gills). ⚠ **CORRECTED BY #278, 2026-09-01, AND IT WAS ONE DOOR AND TWO WHOLE CARDS.** `VIGNETTES[8]` and `VIGNETTES[9]` carry `needMut:'gills'` **on the card**, not on a door, so 2 of the 10 vignettes have been out of `openVignette`'s pool since the flag went false. Neither check could see them: `probes/reach.js` scanned `e.choices` only, and `VIGNETTES` was the one content table `LINT()` had no block for at all. Both read the card now. ⚑ **The slot was already occupied by SCARS** - permanent, stacking, removable once a run - which is the same design job (*run history written on a body*) at a fraction of the surface. And #89 part four says the unit of variety is the **weapon**, not a third axis.<br><br>⚑ **WHAT SURVIVES ON PURPOSE: THE COUGH.** The Fen-Mother's drag still marks whoever she held under, because that chain is the payoff of the hardest fight in the act and it is already built. It is now a plain permanent mark - **no bonus, no penalty, no clock** - per his instruction *"просто кашель, который не даёт ни позитивных, ни негативных эффектов, просто остаётся на персонаже."* Its description and its news line were rewritten: both used to promise a becoming and a bone-setter cure, and **neither was ever implemented** - the cure was always prose.<br><br>⚠ **The Bloom's `nail` is off too**, and that is deliberate rather than collateral: a magenta fingernail whose whole job is to make the player watch something coming is a promise the game will never keep. The door keeps its 8 morale and its bloom-stem; only the dangling chain is gone.<br><br>⚠ **`EVENTS.chapel[1]` is now permanently invisible**, and so are `VIGNETTES[8]` and `VIGNETTES[9]` (all three need gills and nobody can have gills; both vignette bodies dereference the gilled body, so they cannot be un-gated either). Left in place, because it comes back with the system.<br><br>⛔ **THE DECISION POINT IS THE GODOT PORT, NOT THE NEXT SESSION.** *"Когда будем передавать на Godot, на движок, тогда надо будет думать, хотим ли мы её делать или нет."* Until then this stays false and nobody re-opens the argument |
| **26** | The Smaller One | seven cards of content. Needs #24 first. **First candidate to graduate back** |
| **28** | The Act 1 stinger | demo-ending content, and the enemy still needs a real name |
| **29** | Zone of Control, the better version | cut once for making movement unaffordable. Needs #13 to measure a return |
| **30** | Action economy remainder: quiver, slow mage | its base rule was superseded by #45; **#78 is the new contract it waits for** |
| **37** | AUTO doctrines: PRESS · KEEP LINE · HOLD & SCREEN | needs a mature, trusted AUTO, so it sits on #2 |
| **42** | AUTO gets one flourish | after #37 |
| **43** | The narrator's budget | production-stage. **The audio ranking applies today**: action readability → barks → narrator → ambience |
| - | **ACT 2** | parked by the user 2026-08-01: *"Delete act 2 for now as in plan."* Nothing about it is rejected. **Deeper beats longer**, and the feedback above is an argument for that, not against it |
| - | The ScenarioSpec / dev-menu half of the Battle Lab | tools for the builder, not the game. Test mode and the linter cover the need |
| - | The Godot port | still the production target. Scope-lock after the systems stop moving |

---

# 👤 YOURS - not a build session

*Running in parallel, and none of it consumes a session here.*

| | what it is | state |
|---|---|---|
| **#77's round trip** | you edit [`content/events_book.html`](../content/events_book.html), then a session reads your edits back into the prototype | ⏳ **the doc is generated; nothing reads it back yet.** The three rules that make it possible are in the doc: keep the `[key]`, comment a deletion, leave the `{TOKENS}` |
| **The event art** | no event card falls back to a placeholder. By your own order this waits on the texts | ⏳ |
| **The unit sprites** | a body still reads at **x2.50**, the closest camera stop. **The size target is a number now, not a guess** | ⏳ |
| **Music and sound** | #8 shipped a sound for every verb and both rungs of the nerve ladder, and **the builder cannot hear it.** Step one is you listening and ruling | ⏳ |
| **#76's form** | the mailto send shipped in 8f.86; you verify it from the published page | ⏳ |
| **#57 event analytics** | ⛔ **do not pick this up here.** Your own task in a separate tab, the ANALYTICS tab of [`tools/dramaturge.html`](../tools/dramaturge.html), and **its spec lives inside the tool.** What this repo owes it: a stable journal blob, currently **v3**. If a row's *shape* ever changes, bump `v` and say so here | 🚧 running |

---

# ✅ The gate: ten friends - PAID, 2026-08-25

> **Ten people have played it** (*"10 people played, I slowly implement feedback"*). The gate is
> behind us and the feedback is now a QUEUE rather than a verdict, worked through a batch at a time:
> #243 eighteen asks, #244 sixteen, #245 eleven, #246 twelve, #247 fourteen. ⛑ **The section below
> is kept for the question list and for what gate 2 would be**, not as a thing still to reach.
>
> ⚑ **The one line worth carrying forward is what the batches keep proving**: in #245 and again in
> #247, **three asks in a row turned out to be features that had SHIPPED and could not be SEEN**.
> A player saying *"I have never seen X"* is the only instrument this project has for that class of
> fault, and no gate, linter or probe found any of them first. **That is what ten players bought.**

**What the gate was for:** *does it survive somebody who is not you?* Friends forgive rough edges, so
this gate tests **understanding**, not tolerance. That is exactly what the 2026-08-10 feedback is
about, which is why the focus above replaced the old thirteen-step list.

**The collection instrument already exists and needs no work.** #53 and #54 shipped the ★▲▼ bar on
every screen, reactions attached to the exact screen, a decision log, a per-run report, and a
copy-paste blob so a friend's journal travels home. #76 added the questionnaire and the send. So the
gate needs a build, a link, and a sentence asking them to paste the blob back.

**Questions to ask them, written before they play, because a question nobody wrote down is a run
wasted.** Each one came from a shipped entry that said some version of *"the harness structurally
cannot answer this"*:

| the question | from |
|---|---|
| is **"send somebody wide"** on the Thing in Armour worth the person it costs? | #18 |
| does the **bloom flower** actually force you to move? *(that was its whole reason)* | #64 |
| should the **Fen-Mother** get flowers after all? 11-29 rounds with, 8-23 without | #64 |
| is **24% wet** enough to READ as a swamp? the honest lever is the painting, not more water | #63 |
| is the **forest** interesting, or merely slow? | #56 |
| do the **sounds** actually sound right? | #8 |
| does the **first-fight teaching** read as teaching, or as narration? | #60 |
| what is the **haul worth** now that it cannot be optimised against the stash? | #55 |
| the **four camera questions**: distances, default stop, claustrophobia, hex text | #66 |
| is **×1.75** the right board speed? | #81 |

**Split them.** Feel-over-a-whole-run goes to the friends. A single screen or a single number goes
to a playthrough here, which is cheaper and repeatable. **Do not spend a human on anything the arena
could have measured.**

*(Gate 2, twenty to thirty strangers, is deliberately unwritten. What is worth recording now is what
changes between ten and thirty: **a friend asks you what a screen means, a stranger closes it.**)*

---

# Rulings still waiting on you

> ## ➡ **THEY ALL LIVE IN [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) NOW** *(#248, 2026-08-25)*
>
> The user: *"what questions? can you please gather all questions and send to me in one go?"*
>
> ⛔ **The reason he had never seen them as a list is that there were FOUR lists and one of them was
> not a list at all.** Five rulings sat here, four design questions in [`README.md`](README.md) §8,
> **twenty marked `👤` inside `SHIPPED.md` rows** - a convention that was faithfully written for
> twenty entries and that nothing ever collected - and the rest as `⏳` remainders spread over ten
> entries. **A question filed in the row of the entry that raised it is filed where nobody will ever
> look for it.**
>
> ⛑ **So the rule is now the same one this project uses for everything else: ONE place, and the
> other places point at it.** A `👤` in a `SHIPPED.md` row is still the right way to RAISE one - it
> is written where the reasoning is - but it is not where it lives. **An entry that raises a ruling
> adds a row to `OPEN_QUESTIONS.md` in the same session**, the way it already adds a row to
> `WHAT_TO_TEST.md`.
>
> ⚠ **Ten of them came back ANSWERED by the sweep and are in that file's section F**, unstruck,
> because a question closed by somebody other than the person who asked it should be seen before it
> disappears.

**The one older item that is not a taste call**, from the QA day
([`QA_PLAYTEST_2026-08-02.md`](QA_PLAYTEST_2026-08-02.md)):

- **QA-27: the defeat epilogue opens with *"The bells are still ringing"*** wherever the company
  dies, including half a map from Grausen. Keep it placeless, or key one clause on where the run
  ended.

# ⛔ PARKED BY THE LANDING SWEEP OF 2026-08-21

*Six desks landed together on 2026-08-21 (#215 through #222). Everything below was found while
checking that nothing had been lost, and none of it was fixed in that session. It is here rather than
in six session reports nobody will reopen. ⚡ **None of it blocks anything and none of it is a
regression**: every item either shipped this way or was never written down at all.*

## The record has holes, and the sweep is how they were found

~~⛔ **NINE NUMBERS ARE CLAIMED AND APPEAR NOWHERE IN THE DOCS.**~~ ✅ **ANSWERED BY #248,
2026-08-25, and the answer is that no work was lost.** Re-grepped four days later: all nine still
appear nowhere but in this section. ⛑ **The section framed it as a two-way question** - *either the
work shipped and wants its row, or it was abandoned and wants `claim.ps1 release`* - **and there is a
third answer it did not have, which covers most of them:**

| the claim | what it actually is |
|---|---|
| `#204` + `8f.226` | **the entry number is correctly held.** #204 is a LIVE row in 🟡 NEXT above - the STR/AGI ladders, specced, deliberately unbuilt, waiting on your ruling. Nothing is stranded; a build number was taken beside it and never spent |
| `#158` + `8f.186` | **the same shape.** #158 is a LIVE row in 🟡 NEXT - *the shot that always hits*, ⛔ *specced only, and deliberately unbuilt*, in your own framing |
| `#207` + `8f.229` + `8f.230` | **shipped, as DOCUMENTS.** The event book and the hover book were delivered 2026-08-21. A deliverable that is two generated files has no build-log row to write, so the two `8f` numbers beside it were never going to be spent. ⚠ This section guessed it *"describes what shipped as #208"*; that is the claim TITLE being stale, not the work being missing |
| `#153` | **no trace, and nothing missing from the build.** *the doc cut and clean-out*, and the doc cut demonstrably happened |
| `8f.213` | **never spent.** The changelog runs 8f.212 → 8f.215, and #192 part two took 8f.215 |

⛑ **SO THE RULE THE SWEEP WAS REACHING FOR IS THIS: AN UNSPENT NUMBER IS NOT EVIDENCE OF LOST
WORK.** `claim.ps1` issues an entry number and a build number together, and the two are spent by
different things - an entry number by a row in this file, a build number by a row in the changelog.
**A specced-and-parked entry spends the first and never the second, on purpose**, and that is the
healthy majority of this table rather than the exception.

⚡ **AND THE NINE CLAIM FILES WERE ALREADY FREED**, into `.grimtoll/freed/20260821-163937-sweep/`,
because the table above CITES all nine and the pre-commit guard reads a citation and a spend
identically (#144's trap, which #217 taught it only for a stacked desk). ⚠ **Freeing them lost
nothing and burning them cost nothing**: the issuing floor comes from a scan of the REPO, so all nine
have been unissuable since the day that paragraph was committed, claim file or no claim file.

⛔ **AND TWENTY-TWO SHIPPED ENTRIES HAVE NO ROW IN THE REGISTRY.** ⚠ **This entry first said SIX,
because the sweep had only looked from #195 up.** Counted over the whole record it is **22**: sixteen
below #195 (45 · 71 · 154 · 165 · 169-172 · 187-194) and six above it (#196, #198, #199, #201, #208,
#209). Each has a `CHANGELOG.md` row and none has a `SHIPPED.md` row. **#209 is the painted event
stage**, i.e. the largest single change on the board, so this is not a tail of small ones. ⛑ The
reason to care is stated in `SHIPPED.md`'s own header: it is **the registry that names every open
remainder**, so an entry missing from it has its leftovers recorded nowhere.

⚡ **AND THIS EXACT FAILURE IS ALREADY WRITTEN DOWN IN THAT HEADER, WHICH IS WHY IT IS NOW COUNTED
RATHER THAN NOTICED.** `SHIPPED.md` states the contract - *"when an entry ships, four writes"* - and
records the day it broke: *"#117, #137 and #138 were added to this table on 2026-08-14 by #151's
audit ... so the four writes were three."* That audit was done by hand, once, and left nothing behind
to do it again. **`python tools/record.py check` is what was left behind this time**, and the six
above the floor are named in its `KNOWN_MISSING_SHIPPED` list so that a NEW gap fires while these
stay parked. Each leaves that list the day its row is written.

⚡ **THE THREE ROWS THAT WERE WRONG WERE REPAIRED RATHER THAN PARKED**, and they are worth knowing
because two of them came out of the same mechanism: `docs/CHANGELOG.md` and `docs/SHIPPED.md` are
`merge=union` in `.gitattributes`. #221's row had been written INTO THE MIDDLE of #220's and rendered
as one broken line; #215's row was in `SHIPPED.md` twice, once as authored and once as #217 edited it
to close its remainder; and #222 had written no row anywhere at all. ⛔ **A UNION MERGE NEVER
CONFLICTS, WHICH IS WHY IT NEEDS A COUNTER**: the duplicate and the splice both merged clean and
neither would have been seen by reading the diff.

## Open remainders the desks declared, and one that half closed itself

- ~~**#263: the enemy runs on the four stats.**~~ ✅ **BUILT AND MEASURED 2026-08-28 (8f.288).** The spec is still in [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md) and the standing contract is `.claude/skills/enemy-stats/SKILL.md`. ⚠ **What it did NOT do is the part to carry forward**: the Snare is still 93% for the starting four at n=30, so `OPEN_QUESTIONS.md` **O1 stands** - the finale is a ratkin deck and the ratkin lean is close to a wash. Filed as **P2**, with **P1** asking whether the Steading-Line at 20% and the broken men at 53% came down too far.

- **#216: the easy / even / hard multipliers are a first cut.** 1.3 / 1.0 / 0.75 against a fight's
  points, and they ignore the player's tactical edge entirely. ⚡ The scale itself validated against
  something it never read (the seasoned six price at 202 against the six-body Snare's 199, the fight
  #160 measured at 45% win), so it is the MULTIPLIERS that want refining against real win rates when
  the balancing pass starts, not the pricing under them.
- ~~**#222: the `2>$null` sweep was never run.**~~ ✅ **CASHED BY #226 the same day**, and this row
  outlived it by a session: *"#222's own declared sweep was run: three live `2>$null` sites, proved by
  making them fire, plus a guard `deploy.ps1` was missing - an unreadable branch silently PASSED the
  check that keeps a work branch off the live link."* ⛑ **The lesson is the one this whole section is
  about**: a remainder can be cashed by the NEXT entry without anybody going back to strike the row, so
  re-read a parked item before scheduling work against it (#133's own finding, twice now).
- **#214's art remainder is HALF closed and #248 measured the other half exactly.** Its row read *`18 of 40 ``EVENTS`` cards, plus every one of the 19 ``CAMPS`` incidents and all 10 ``VIGNETTES```*. Driven through `jStageFor` on 2026-08-25: **0 road cards without a wide master and 19 camps with none**, plus the 10 vignettes. So the road deck is done and **the remainder is exactly those 29 cards**, each a 1672x941 master plus one row in `JSTAGE`. A legitimate shipping state per `.claude/skills/static-event-art/SKILL.md`, and now a number instead of a feeling.

- **#224: the items with no painting are FIVE, not two** *(counted by `probes/reach.js`, #248)*. THE SECOND SHAPE and the crossbow were the two this row named; `tmap` and `draught` arrived with #245's BAG and nobody added them here, and **the DISGUISE CLOAK arrived with #275 the same way** (re-counted by `reach.js`, #278). All five fall back to `gGlyph`, which is a legitimate shipping state and still five items whose whole point is that you can see what they are. ⚑ **One painting already exists and its ITEM does not**: `kris` is mapped in `ITEM_ICON` with no `GEAR` row (deliberate, per the art rule), and #245's remainder says it needs a BLEEDING status that does not exist. ⚠ **`stoneshield` came off this list**: it was the second of the pair and **`git log -S` says it has had a `GEAR` row since #248 (8f.273), the very entry whose count this row quotes** - so that half of the sentence was stale on the day it was written, so `itemIconNoGear` is `kris` plus the five `wagon_*` icons, which are wagon buildings and were never meant to be gear. Each of the five is one 128x128 cut-out with alpha plus one row.

- ~~**#236: the opening fight stalled once, and thirty more runs could not reproduce it.**~~ ✅ **CLOSED BY #248, 2026-08-25, and it was never the game.** This row asked for *`a seeded loop over that one fight at n>=200 with ``B.order`` dumped on the failing run`* and it did not need one: **the reproduction is a SEQUENCE, not a seed.** A fresh page then `regress.js` is clean; a fresh page then `gates.js` then `smoke.js` then `regress.js` stalled **4 of 4**. Both #236 and #239 recorded that shape in passing and read it as noise. ⛑ **What it was**: the game raises a spotlight or Captain card mid-fight, `nextTurn` takes its `if(B.tutLock)` door, and the harness has nobody to click it - a player does, and the fight carries on. **The flag that silences it existed and said in its own comment that the harness sets it**; nothing set it. 0 of 6 after. ⚡ **The lesson worth keeping is the one #226 already wrote down**: a check a document says exists is a claim about the build. #239's row said *``runFight`` already returns ``guard``, so the instrument exists`* - and `HIT GUARD` says the loop gave up, never what it gave up ON. It dumps its state now.

- ~~**878 em dashes survive in the DOCS**, against a standing hard rule of none anywhere.~~ ✅ **SWEPT BY #248, 2026-08-25, and the reason it waited was an assumption rather than the work.** This row parked it because #199 *`needed a lexer to tell a player-facing string from a code sample, and the docs have the same problem worse`*. ⛑ **They do not.** That difficulty is a fact about one 3.4 MB HTML file; in markdown a fenced block opens and closes on three backticks and an inline span on one, so the whole lexer is four lines. `tools/dev/emdash.py` counts by WHERE the dash sits and `--fix` rewrites prose only: **1,197 prose, 0 left, 24 inside fenced code untouched**, 1,028 lines out and 1,028 back. ⛔ **`docs/playtests/` is deliberately excluded**: it is a record of what was on the screen in front of Dima, Sanya and Andrey on a build three days older than #199, and **a transcript that is corrected is not a transcript**. ⚑ **And it is a note in `record.py check` now**, proved by seeding one and watching it fire, or it drifts straight back.

⚠ **AND ONE ENVIRONMENT NOTE, NOT A DEFECT**: `claim.ps1`'s repo scan intermittently runs past two to
  three minutes on this machine because the repo lives on a Google Drive path. It looks exactly like a
  hang and it is not one. Same shape as `LINT()`'s documented ~25s.

---

# How this file works

**One list, one order, one truth.** ⛔ **There is no second priority system.** Tiers, date buckets,
screen groups and a thirteen-step gate plan used to sit on top of each other in this file, and four
overlapping orders is the same complaint the playtesters made about the game. They were collapsed
into the four headings above on 2026-08-10. The reasoning that produced them is kept in
[`archive/PLAN_REASONING.md`](archive/PLAN_REASONING.md).

**One entry per session.** Do not batch. Each touches combat or character systems that are easy to
disturb.

> ## ⛔ NOTHING HERE GETS BUILT STRAIGHT FROM THE ENTRY
>
> **1. Write out the actual rules** - costs, targets, cooldowns, limits, what it takes away.
> **2. Show a picture. Mandatory.** ⚑ **Make it IN THE GAME** whenever the thing has a screen
> already: stand the real board up in the practice field and `shotBoard()` it, annotated. Hand-draw
> only when there is nothing to photograph, and keep it to the **two or three panels that carry the
> decision**. **3. Then build it. 4. Write its section in
> [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md)** the same session it ships.
>
> Set by the user 2026-07-31: *"That way we keep it clean and don't do extra job."* Every time it
> has been skipped, work has been thrown away.
>
> Applies to any new ability, resource, screen, panel, overlay or player-facing rule. Does not apply
> to bug fixes, wording, or balance numbers on something that already exists.

**When an entry ships, FIVE writes:** full text and a build-log row → [`CHANGELOG.md`](CHANGELOG.md)
· a one-line row → [`SHIPPED.md`](SHIPPED.md) · **strike it from this file entirely** · a section →
[`WHAT_TO_TEST.md`](WHAT_TO_TEST.md) · **and every ruling it raised → [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md)**.

> ## ⛔ THE FIFTH WRITE, AND IT IS THE ONE YOU ONLY OWE SOMETIMES *(#248, 2026-08-25)*
>
> The user: *"make a rule to put all questions in only 1 file"*. Full rule: [`.claude/rules/how-we-work.md`](../.claude/rules/how-we-work.md).
>
> ⛔ **When that was asked there were 39 open questions in FOUR places, and TWENTY of them were marked `👤` inside `SHIPPED.md` rows** - a real convention, used correctly, in twenty entries over five months, **that nothing ever collected**. Some had waited since #90. ⚑ **Ten came back answered by work that was not about them**, which is the cost: a question nobody can find does not wait, it rots, and it hides the twenty-nine beside it.
>
> ⛑ **RAISE IT WHERE THE REASONING IS, FILE IT WHERE HE READS.** A `👤` beside the measurement and the rejected alternative is still right and should keep being written - that is the raising. **The row in `OPEN_QUESTIONS.md` in the same session is the filing**, and the answer strikes that row in the session that acts on it.
>
> ⚠ **Unlike the other four this write is CONDITIONAL** - most entries raise nothing - **which is exactly why it is checked rather than remembered.** `record.py check` names a `👤` whose entry has no row there.

> ## ⛔ DO NOT PICK A NUMBER. ASK FOR ONE.
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 number
> ```
>
> **Run it before you write anything.** It scans the docs, the prototype and `shots/`, hands you a
> `#NN` and an `8f.NNN`, and reserves them in a file that cannot be created twice, so a session
> running beside you cannot be given the same ones. `claim.ps1 status` says who holds what.
> **`git commit` now refuses a change that spends a number somebody else is holding.**
>
> **This replaced a sentence in this document, and the sentence was the bug.** It said *next free
> #NN*, it was maintained by hand, and it was written **last**: the code and `shots/` get the number
> first. So at the moment the other session grepped, this line was already wrong. That cost **five
> collisions** and nearly two more on 2026-08-11, when both docs said *next free #89* while two
> sessions were both building #89. ⚑ **Neither tell was in a document.** `ls -t shots/` caught both,
> which is why the script reads `shots/` too.
>
> Full rules, and what else two sessions collide on: [`PARALLEL_SESSIONS.md`](PARALLEL_SESSIONS.md).
> **If you are going to change the prototype, take it first:** `claim.ps1 lock -Title "..."`.

**Which model builds it.** 🧠 **STRONG** for anything touching the two AI brains, morale, the save,
combat rules or the game's voice: every expensive bug here was subtle-systemic, and the tone is as
easy to get almost-right as the code. 🔧 **SONNET-OK** for mechanical, render-only or
schema-following work with an exact spec and a verifiable result. Either way **the strong model owns
the session** and may hand fenced mechanical sub-chunks down; the reverse is forbidden, because a
cheap model cannot escalate judgment it does not know it is missing.

---

# Where everything else lives

| | |
|---|---|
| [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md) | **the full text of every unbuilt entry.** Come here when you pick one up |
| [`archive/PLAN_REASONING.md`](archive/PLAN_REASONING.md) | why an entry waits, what was rejected and on what grounds. History, not instructions |
| [`README.md`](README.md) | what the game is, the pillar, the traps that keep biting |
| [`SHIPPED.md`](SHIPPED.md) | one line per shipped entry, and **every open remainder named** |
| [`CHANGELOG.md`](CHANGELOG.md) | the build log with the reasoning, and every shipped entry in full |
| [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md) | **the user's file.** How to reach each new thing in three steps and what it should do |
| [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) | **the user's other file.** Every ruling waiting on him and nothing else. A new one lands here the session it is raised; [`archive/QUESTIONS_ANSWERED.md`](archive/QUESTIONS_ANSWERED.md) takes them once they are closed, parked or overtaken |
| the running build | **what is actually true. It wins over every document.** |
