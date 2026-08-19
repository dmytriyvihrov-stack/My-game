# Event cards: how long the prose is, and where the receipt lives

Apply this rule whenever an event card is written, rewritten, trimmed, or given a new outcome. It
covers `EVENTS{}`, the `CAMPS` incidents and the `VIGNETTES`, because since #143 all three speak
one receipt language. It is the standing version of #143 (8f.171) and it exists so the next card
is written this way instead of the diet being run again in three months.

The VOICE rules are the nine in `docs/README.md` §4 and they are unchanged. This file is about
LENGTH and about the RECEIPT, which are the two things the voice rules do not decide.

## The one sentence

**A card is prose plus a receipt, and they must never say the same thing.** The prose says what
happened. The chips say what it cost. A number that appears in both is a second receipt, and the
day the multiplier changes it becomes a wrong one.

## Length: measure it, do not eyeball it

The 2026-08-13 diet took every road card and cut the whole road by a third. **The numbers below
are the shipped floor, not a target to beat**: a card longer than its band is a card to look at,
not automatically a card to cut.

| | words of body + all outcomes | what lives there |
|---|---|---|
| LIGHT, a pickup | **45 to 90** | coin 45 · cache 50 · snare 51 · hollow 58 |
| MEDIUM, a look at the ledger | **90 to 140** | taxman 82 · saltwives 100 · milestone 89 · ratcart 120 |
| HEAVY, a decision retold | **140 to 175** | shrine 173 · oasis 172 · deadco 170 · circle 148 |

**175 words is the ceiling the whole road now sits under.** The three heaviest cards in the game
land there, so a new card asking for more is claiming to be heavier than the Dead Company.

Measured on the shipped build, 2026-08-13: **34 cards, 3,652 words, shortest 45 (coin), longest
173 (shrine), none outside the bands, and the split is 14 light · 11 medium · 9 heavy.** That is
41% of the road light, which is the concept's *"roughly a third should be pickups"* arriving as a
count rather than as an intention.

*(#150, the same day, re-measured after the clash's third door was rewritten: **3,668 words, still
34 cards, still none outside the bands.** A card that GAINS words is not automatically a
regression; a card that leaves its band is.)*

*(#151, 2026-08-14, re-measured after the toll-man gained a fourth door: **3,703 words, still 34
cards, still none outside the bands.** The toll went 120 to **158**, which moves it from MEDIUM to
HEAVY - and that is the correct direction, because a fourth door is a heavier decision. ⚑ **The
band a card belongs in is decided by its WEIGHT, so a card that gains a door is allowed to gain
the words that door costs.** It is only a regression when the words arrive without the weight.)*

Measure in the running build, never by reading:

```js
/* one card */
(e=>{const w=s=>String(s||'').trim().split(/\s+/).length;
  return w(typeof e.body==='function'?e.body():e.body)+
    e.choices.reduce((n,c)=>n+w(c.after),0);})(EVENTS.oasis)
```

⚠ **THAT COUNTER PREDATES BRANCH-GATED DOORS AND OVER-COUNTS THEM** *(#160,
2026-08-16)*. It sums **every** `after` on the card, which was the same thing as
"what the player reads" for as long as every door was shown to everybody. It is
not any more: `needSins`/`maxSins` (and `needRace`/`needHurt`/`needUnpaid`/
`needMin` before them) mean one company sees three doors and another sees two.
THE HOLD'S MEN measures **183** by the counter above and the player reads **137
on the one-sin branch and 125 on the two-sin branch**, because three of its four
outcomes are unreachable on any single run.

⛔ **So a card with gated doors is measured against what its OWN ledger shows.**
The same filter `openEvent` uses, and nothing else:

```js
/* one card, as one company will actually read it */
(e=>{const w=s=>String(s||'').trim().split(/\s+/).length,n=(G.sins||[]).length;
  return w(typeof e.body==='function'?e.body():e.body)+
    e.choices.filter(c=>(c.needSins==null||n>=c.needSins)&&(c.maxSins==null||n<=c.maxSins))
      .reduce((s,c)=>s+w(c.after),0);})(EVENTS.holdmen)
```

⚑ **And the general rule under it: a card with a function body must be measured
on every branch it can take, not on whichever one the current run happens to
produce.** `body()` returns ONE string, so a fresh page measures the clean-ledger
branch and says nothing about the other two. Stub the state, measure each, and
record the worst.

⚠ **A percentage cut is not a goal in itself.** Four cards finished the diet under the asked 30%
(hollow 11% · wedding 13% · cache 15% · pedlar 18%) because their remaining lines were
load-bearing: the pedlar's barrel-lid with a strap, the boots nobody has said anything about, the
is-was village pair. **Cutting to a quota costs the joke or the fact, and both are the reason the
card exists.**

### What comes out first, in order

1. **Any number the chips now carry.** "Thirty-eight crowns." and "(morale +8, now STEADY.)" are
   receipts, and the receipt has its own row.
2. **The sentence about the sentence.** *"Nobody complains, which is its own kind of complaining."*
   after a line that already showed them not complaining.
3. **Stage directions between two beats.** The company walking, arriving, standing, looking at
   each other, before the thing happens.
4. **The second adjective, then the second clause.** Simple words, one image.
5. **A stock clause that stands in for the receipt.** #150 deleted *"it sits badly with them"* from
   **24 cards** at the user's order: it appeared on every door with a morale cost, said nothing the
   chip did not, and by the twentieth card it had stopped being read at all. ⚑ **A phrase you can
   grep 24 times is furniture, whatever it says.**

   **#151 then deleted its positive twin, *"it sits well with them"*, from 16 more** ("delete it
   too, so it is cleaner"). ⚠ **This file said the twin was on SIX cards and it was on SIXTEEN**,
   because the count had been taken over `EVENTS{}` alone and the phrase was also in the CAMPS
   incidents. ⛔ **A count of a stock phrase must be taken over every table that speaks the receipt
   language, which since #143 is all three.** The grep that is actually right:

   ```js
   (JSON.stringify(EVENTS)+JSON.stringify(CAMPS)+JSON.stringify(VIGNETTES)).split('the phrase').length-1
   ```

   ⚑ **And the deletion was four lines rather than a hunt, because #150 had already made
   `choiceNote()` JOIN its parts.** The rule below about concatenated labels is what turned the
   second half of this job into nothing.

⚠ **A label built by concatenation cannot survive its parts going empty.** Deleting that phrase
emptied twelve `c:` strings, and every fragment of a choice's sub-line used to carry its own leading
`" · "` - so those twelve would have opened on a floating middle dot. **`choiceNote()` is now the
one builder for both the EVENTS and the CAMPS renderer** and it JOINS parts. Add a new fragment
there, never as another `+' · '+` at a call site.

### What never comes out

- **A price, a gate, or anything the choice needs to be made** (`need:` figures, what the fight
  fields, which door is free).
- **The one concrete detail the card is remembered by.** Every card keeps at least one.
- **A user's own words.** The clan speech at the long fire, the elder's *"Road's ours today"*,
  Wynn's *"I had made my peace with being a small course."* Frame lines around them may go; the
  line itself is canon.

## ⛔ The sub-line: the COST is derived, and `c:` is only what `fx` cannot say

*(#176, 2026-08-17. The user: **"Delete highlighted with red. Cost 10 coinds and gives 5 mood
bonus"** and **"delete typical 'they will remember' from options"**, with the clauses boxed in red
on a screenshot of THE COLLECTOR.)*

**A door's sub-line is built, in this order, and only from these four things:**

| | where it comes from |
|---|---|
| the cost | **`fxNote(o.fx)`, derived.** Never typed. |
| what the cost cannot say | `c:` - gear by name, a battle's shape, a rule of the door |
| the mood | `moraleTag(o.fx)`, derived |
| the gate | `needTag(o.need)`, derived |

⛔ **`c:` MAY NOT CARRY A FIGURE `fx` ALREADY CARRIES.** That is two receipts for one payment, which
is the rule at the top of this file on its fourth surface. `LINT` 6f holds it and the check is a
line:

```js
[...Object.entries(EVENTS),...Object.entries(CAMPS)].flatMap(([k,e])=>(e.choices||[])
  .filter(c=>c.c&&/(^|\s)[+−-]\d/.test(c.c)))                    // 0
```

⚑ **THIS WAS NOT A TIDY-UP, AND THE ORDER OF DISCOVERY IS THE LESSON.** The literal deletion the
user asked for would have deleted four PRICES. **THE HANGED TOLL-MAN** charges a day and pays 38
crowns across four doors, and its four labels read *"it will cost you the afternoon"*, *"he has no
further use for either"*, *"good wood · tired men"* and *"nothing is left standing here"*. On that
card the prose **was** the receipt, and nobody could have known by reading it. ⛔ **So when a
deletion would take a fact with it, the answer is to move the fact to where it cannot be lost, not
to keep the sentence.**

⚑ **AND THE DERIVATION IMMEDIATELY CAUGHT A SHIPPED LIE.** THE RATKIN WATERWORKS' second door
promised **`+1 salvage`** and `pickChoice` paid **2**. That is the sixth member of the family this
file has caught five times, and it is the argument for the whole change in one row: **a promise is
the half that is allowed to be wrong, so stop writing promises.**

⚠ **`fxNote` PASSES `mulCrowns:true`.** `pickChoice` applies `lootMul()` to what you FIND, so a
label printing the base figure would under-promise on a company carrying the Brass Token, which is
the same lie from the other end.

⚠ **AND A SWEEP OVER `c:'…'` MUST BE SCOPED TO CAMPS AND EVENTS.** The aftermath's LOOT rows wear
the same `{t,c,fx}` shape and are NOT rendered by `choiceNote` - their chips come off
`fxChips(haul.fx)` and their `c:` is the prose beside it - and the withdraw screen builds a `c:`
by CONCATENATION. An unscoped pass deletes receipts nothing else prints and rewrites half an
expression. It was run once, unscoped, and reverted off the diff.

### What comes out of `c:`, on top of the numbers

The mood echo, which is the third generation of a phrase this file has now deleted three times
(*"it sits badly with them"* ×24 in #150, *"it sits well with them"* ×16 in #151, and in #176 the
63 that had grown back: *they think better of you* ×6, *they will remember this* ×6, *quietly
approved of* ×6, and 45 one-offs). ⚑ **The reason it kept growing back is that nothing stopped a
new card authoring one.** Now the mood has exactly one renderer and the label has no room for it.

## The receipt: chips, and they are built off the payment

Every outcome renders `evFxChips(paid)` plus `evGearStrip(got)`. The chips are the aftermath's own
`.abfx`/`.fxc` furniture from #137, with three rows the battle screen never needed: **MORALE**,
**◐ DAYS** (a day spent prints as a minus) and **♥ MENDED**.

⛔ **THE GLYPHS ARE NOT INTERCHANGEABLE, AND #150 FIXED THEM ONCE.** A morale chip wears the
company's own **face** out of `MOODSTATES` (💀 😟 😐 🙂 😄), the same ladder the map's mood chip and
the battle's nerve rungs use, and it shows the mood the choice **lands** the company in. **♥ means
BLOOD and only blood**: it is the MENDED row, paid by `healAll` and the spring, and it is the same
heart the road bar's health chip wears. Putting a heart on a morale row was a readout printing the
wrong unit, which is #102's rule, and it survived from #143 to #150 because nobody said it aloud.

⚠ **`evFxChips(f, moodAt)`**: the second argument exists for the one caller that draws chips
BEFORE paying, which is the one-door pickup below. Pass the projected morale there. Everywhere
else it defaults to `G.morale`, which by then is the post-payment figure.

⛔ **THE CHIPS ARE BUILT BESIDE THE `pay()` CALL, NEVER OFF THE HAND-WRITTEN `c:` STRING.** In
`pickChoice` that is `paid`/`addPaid`, and every new payment site added to that function has to
call `addPaid` in the same edit. This is #137's rule on its third surface and the reason is not
hypothetical: six content rows were once caught printing a price the game did not charge. The
label is a promise, the chip is a fact, and only one of them is allowed to be wrong.

- `evPaidOf(fx)` is for the sites whose payment IS the raw fx: camp incidents, vignettes, and the
  one-door card view. It takes `mulCrowns` only where the site will pay through `lootMul()`.
- A `hurtLine` written by a special effect (the cache split, the star's wish, the spring stay)
  stays PROSE. It is a consequence with a story, not a resource.
- **`moraleLine()` and `fxLine()` are gone.** Do not write a third one.

⛔ **AND THE CHIP FURNITURE IS SHARED, SO A RESTYLE OF IT IS SCOPED OR IT IS A BUG** *(#187,
2026-08-18)*. `.abfx`, `.fxc`, `.fxi`, `.fxn` and `.fxl` are drawn by **three** callers now: the
aftermath's own `fxChips` inside `consequences()`, the road's `evFxChips`, and `tavernReceipt()`
on the contract card. #187 made the aftermath's tiles bigger and rounder (the number at `--fs8`, a
medallion behind the glyph, rivets in the corners) and every one of those rules lives behind
`#spoils`. **The check is not a reading, it is a measurement**: open a road card on the new build
and on `git show HEAD:` in a second tab and compare the computed `padding`, `border-color`,
`font-size` of `.fxi` and `.fxn`, and the `border-radius`. They were identical, which is what
"scoped" has to mean.

⚑ **A haul's PROSE sits beside its numbers, never under them.** Since #187 the aftermath's tray
(`.amTray`) holds the chips and the flavour line as siblings behind a hairline. That is the same
one-sentence rule at the top of this file arriving on the aftermath: the prose says what happened,
the chips say what it paid, and a caption printed under a figure reads as a second receipt for it.
⚠ The aftermath's `LOOT` rows are STILL exempt from #176's derivation - their `c:` strings can and
do repeat a figure their `fx` carries ("a boar spear +3 salvage" next to a `+3 SALVAGE` chip) -
and putting the two side by side has made that more visible than it was. **That is a content job
on the `LOOT` tables, not a layout one**, and it is the next thing to do on this screen.

## The intent glyph: what a door DOES, before it is read

Since #154 every action door carries **one or two glyphs at the head of its label**, from
`CHOICE_ICO` and `RACE_ICO` and nowhere else. They exist so a card can be sorted by eye before it
is read, which is the clarity pass's own goal applied to the one surface that had four paragraphs
and no shape.

| | glyph | it means |
|---|---|---|
| `fight` | ⚔️ | starts a battle |
| `help` | 🤝 | somebody is helped |
| `evil` | ☠️ | kill, rob, or worse |
| `leave` | 👣 | walk away |
| `trade` | ⚖️ | buy, sell, or pay |
| `take` | 🧺 | take what lies there |
| `rest` | ⛺ | stay a while |
| `honor` | 🙏 | bury, pray, respect |

**The verb comes first and the moral colour second**: ⚔️🤝 is fighting for somebody, ⚔️☠️ is
fighting as the predator. **The cap is two**, and `LINT` 6c holds it.

⛔ **THE GLYPH IS INTENT AND NEVER A RECEIPT.** What a door costs is on the chips and the sub-line.
A glyph that starts meaning "this one pays well" is a second receipt, which is the rule at the top
of this file arriving on a third surface.

⛔ **☠️ AND NOT 💀, EVER.** The morale chips wear 💀 as the lowest face out of `MOODSTATES`. One
glyph may not mean two things on one screen (#102's wrong-unit rule).

⚑ **THE RACE MARK IS DERIVED FROM `needRace`, NEVER AUTHORED** (🐀 ratkin · 👹 ogre · 🧑 human).
This is #137's rule on its fourth surface: red was hand-flagged per door and five doors never got
it. `needRace` already IS the fact. A race-gated door therefore authors only ONE intent, because
the race mark takes the second slot. **There is no human-gated door in the build and that is
correct** - the company is human by default, so the gate would open on everybody and a mark that
fires everywhere is furniture. 🧑 waits for the door that earns it.

⛔ **AND SINCE #196 THE THREE FACES ARE NOT AUTHORED HERE EITHER. `RACE_ICON` IS THE ONE TABLE, AND
`RACE_ICO` READS IT.** *(2026-08-19.)* These doors held the only pictograms in the game while the
company sheet, the battle rail and the muster wall printed ◆ ▪ ⬢ out of a `RACE_ICON` authored as
small/medium/huge BODY MARKS. Same three races, two symbols, on two screens a player crosses in a
minute, which is #102's wrong-unit rule with the glyphs themselves as the units. The class table's
`RACE_ICON` is the source now and this table takes `g:` from it; `RACE_ICO` still owns the door's
WORDS, which is its own job. ⚠ **The dependency runs DOWNWARDS on purpose** - `RACE_ICON` is
declared ~24,000 lines above `RACE_ICO` - because a `const` read from above its own declaration is
the temporal-dead-zone throw that aborts the whole script, and this file has shipped it once.

⛑ **THE COMPANION RULE, ON THE OTHER SIDE OF THE SAME GLYPHS: THE WORD COMES OFF A LIST AND STAYS
WHERE ONE BODY IS STUDIED.** `cMark`/`rMark`/`rcMarks` are the only builders and `.bmk` the only
box. The roster, the battle rail, the tavern strip, the muster wall and the aftermath's recruits
show marks alone; the promotion card, the trade being PICKED at a level, the lore box that IS the
explanation, and the camp's news line keep their words. **A symbol earns its place by sorting
twelve rows at a glance and earns nothing on the one row you are already reading.** The word is
never actually gone: `data-cls`/`data-race` open the full lore box where `bindLoreTips` runs, and a
plain `title=` carries it where it does not - ⚠ and `bindLoreTips` STRIPS that title as it wires,
or one mark opens two tooltips.

⚑ **A DOOR MAY BE BARE, AND THE FIRE'S RULINGS ARE.** The CAMPS deck is mostly judgments rather
than actions - the debt, the aunt, the nine seconds - and a glyph forced onto a ruling would
dilute the eight that mean something. **Bare reads as "this is you deciding, not doing".** 94 of 94
road doors carry one; 31 of 53 camp doors do.

⛔ **AND ONLY ONE RACE DOOR IS EVER OFFERED. THE RATKIN'S WINS.** (#159, the user: *"if party has
both ratking and ogr - show only ratkin option"*.) A company holding both races used to open every
race-gated door at once, which put **the wedding and the Sitting Stone at five doors** - one over
style rule 4, on the two cards written to have *a* special guest rather than two.

`raceDoorPick()` is the one builder, called by the road renderer and the fire renderer both, and
the priority is `RACE_DOOR_ORDER = ['ratkin','ogre','human']`. **It is a priority and not a ban**:
every race door still exists and still fires; the rule only decides which is offered when more than
one could be. Ratkin first because this is a ratkin island and these cards are about the clans.

⚠ **It runs AFTER the `needRace` gate** (a door whose race is absent is not a contender) **and
BEFORE the appended walk-away**, which is not race-gated and has to survive it. ⚠ **The visible
maximum is 4 again on every card in the deck** - which is the check to re-run after authoring a
second race door anywhere: drive the card with a company holding both.

## Where a receipt may appear before the choice

**A multi-door card shows nothing before the pick.** That is the pillar's own corollary: prices
stay on the buttons as intent, the score stays hidden.

**A card with ONE live non-battle door is a pickup, and it wears its loot on the card**, the way
the aftermath shows a haul. With one door there is no decision to protect, so hiding the outcome
protects nothing and costs the player a click to learn what they had no choice about. Today that
is the coin, the cache and the drowned chapel.

⚠ The gate is `visible.length===1 && !visible[0].battle`, computed after the `need`/`needRace`
filters, so **a card can become a pickup for one company and stay a decision for another**. That
is correct and it is worth knowing before reading a screenshot as a bug.

⚠ A one-door card whose `after` is empty closes straight to the road. An outcome screen that is an
empty box with a button on it is the defect #138 deleted from the opening; do not reintroduce it
here.

## The `?`: a door that refuses to write a receipt

Since #159 a choice may carry **`mystery:true`**, and its whole sub-line becomes a single **`?`**
with a hover reading *"Nobody here knows what this pays. You find out by doing it."*

It is **authored, never derived**, and it is the user's call which doors get one: *"на некоторых
выборах ставить '?' - в основном я буду говорить. На определенных выборах по лутанию"* (2026-08-16).
Do not add one because a door feels mysterious.

⛔ **IT HIDES A PAYOUT AND NEVER A PRICE.** The pillar is that prices stay on the buttons as intent
and the score is what is hidden; a `?` is the card admitting it has no honest intent to state,
because the company cannot see into the cart either. So the things that are not receipts all stay:

- a `need:` the chest cannot meet still prints beside the question mark, because a door the player
  cannot afford has to say so **before** it is pressed;
- `danger:true` and the battle door's red are untouched - a warning is not a receipt;
- the intent glyphs stay, and on a `?` door they are the only thing left to sort it by, which is
  #154 turning out to have been the load-bearing half.

⛔ **AND IT MAY NOT CHARGE ANYTHING AT THE PICK.** No `c:` line, and no `days`, `morale`, negative
`crowns` or negative `food` in its `fx`. **`LINT` 6d holds both halves.** Whatever the door costs,
it costs on the far side of the answer.

⚑ **THAT PUSHED THE RECEIPT SOMEWHERE NEW, AND THE PLACE ALREADY EXISTED.** The wedding's massacre
door pays nothing at the pick and starts a fight, so its bill lands on the aftermath: `AFTER` rows
may now carry **`mor`** (and `remember`), which `consequences()` applies and prints as a MORALE chip
in the aftermath's own row. It is `BEATEN`'s `mor` field, on the winning screen instead of the
losing one, and today exactly one row uses it. ⚠ It is not a licence for loot rows: **an automatic
haul still may never charge morale or days** (the `lootIsChoice` rule).

⚑ **THE `?` IS ONLY WORTH ANYTHING WHILE IT IS RARE.** Three or four across the whole road and it
reads as "this one is a gamble"; on every second door it is a font. Today there is exactly one.

## Before the card ships

Run these in the running build and expect what is named:

```js
LINT()                                   // 0 findings. It reads the tables for morale-in-label and the rest
/—/.test(JSON.stringify(EVENTS))         // false. No em dash, anywhere, ever
/* #154: every road door wears an intent, and no door wears three glyphs */
Object.values(EVENTS).flatMap(e=>e.choices).filter(c=>!c.ico||!c.ico.length).length   // 0
/* #159: and a ? door is still rare. If this ever reads above 4, argue about it first */
Object.values(EVENTS).flatMap(e=>e.choices).filter(c=>c.mystery).length               // 1
```

⚑ **AND IF THE CARD STARTS A FIGHT, THE ARENA IS PART OF THE GATE.** #159's massacre door shipped
its first cut at the engine's standard two actions a body and the starting four lost **6 of 8** to
a card whose entire brief was *"механически бой легкий. Просто масака"*. One field (`actions:1`)
took it to **20/20**. A door's prose can be right while the fight behind it says the opposite, and
only `ARENA.match()` can tell you which one the player will meet.

Then drive the card itself and read the DOM, because **the preview pane composites no frames and a
screenshot proves nothing**: the chip row against the top bar's actual change, the strip against
the stash or the wearer, and one door taken end to end. `shots/143_event_chips.html` is the shape
of the eye check, three live captures with the build's own CSS.
