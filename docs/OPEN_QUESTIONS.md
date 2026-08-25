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
