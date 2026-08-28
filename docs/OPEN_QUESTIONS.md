# Open questions

> **Everything here is waiting on you, and nothing else is.** One line of code or one word each.
> Answer by code (`B2 yours`, `E1 cut it`) and the row is struck in the session that acts on it.
>
> **The rule that keeps this file the only place:**
> [`.claude/rules/open-questions.md`](../.claude/rules/open-questions.md). Raise a ruling with `👤`
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
