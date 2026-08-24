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
| the blood | **`o.hurt.lasting` → `permanent injury` / `temporary injury`**, derived *(#197)* |
| the gate | `needTag(o.need)`, derived |
| the seat | **`recruit`/`recruitPreset` → `no room left`**, derived *(#197)* |

⛔ **`c:` MAY NOT CARRY A FIGURE `fx` ALREADY CARRIES.** That is two receipts for one payment, which
is the rule at the top of this file on its fourth surface. `LINT` 6f holds it and the check is a
line:

```js
[...Object.entries(EVENTS),...Object.entries(CAMPS)].flatMap(([k,e])=>(e.choices||[])
  .filter(c=>c.c&&/(^|\s)[+−-]\d/.test(c.c)))                    // 0
```

⛔ **AND FOR TWO DAYS THAT SENTENCE WAS A LIE: "LINT 6f" WAS CITED HERE AND IN A CODE COMMENT AND
NO SUCH CHECK EXISTED IN `LINT()`** *(#202, 2026-08-19)*. The one-liner above was the only thing
that ever ran it, by hand. In the meantime the mercy screen shipped exactly this defect on two rows
(*"+5 salvage +30 crowns · quietly approved of"*) plus the cub screen's three, which no sweep had
reached because **`MERCY` and the cub's `opts` are neither `EVENTS` nor `CAMPS`** - the same blind
spot #198 found for a door built at the renderer. 6f is real now, inside `scanLabel`, over EVENTS,
CAMPS and `MERCY.opts`: a signed figure in `c:`, any of the five mood phrases the sweeps kept
deleting, and *"needs a ratkin"* on a `needRace` door (a filtered door cannot also say it needs
the race). **It was proved by seeding one bad row in each table and watching four findings fire.**
⚑ **A check a document says exists is a claim about the build, and `LINT()` is where it is
checked.** The cub picker's rows are local to `cubChoice()` and the linter cannot see them; the
comment at that site says so, and the rows carry no figures today.

⚑ **AND THE MERCY SCREEN RENDERS `choiceNote(o)` LIKE A ROAD DOOR**, so its sub-line is derived:
*Let them go · morale +14* · *Strip them · +◉30 +▤5 · morale +4* · *No prisoners · +◉60 +▤9 +◈1 ·
morale −14*. `takeMercy` pays found crowns through `lootMul()` for the same reason `fxNote` prints
the multiplied figure. ⚠ The echo it replaced was also WRONG: the killing door paid −14 and wore
the ±2 phrase.

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

### ⛔ #197 · THE TWO THINGS A DOOR STILL WOULD NOT SAY

*(2026-08-19. The user: **"Near all events write: permanent or temporary injury (based on
injury)"** and **"with ogres event you don't have option ogre to join - when your party is
full"**.)*

⛔ **THE FIRST ASK COULD NOT BE ANSWERED, BECAUSE NOTHING IN THE BUILD WAS PERMANENT.** `pickChoice`
had branched on `hurt.lasting` since it was written and **not one card in the game set it**, so all
seven `hurt` rows were hitpoints. Five of them are AUTHORED as permanent and say so in their own
`d` field - *"−1 STR"*, *"−1 AGI"*, *"−1 INT"* - and **the player never saw that text**, because
the temporary branch prints `hurt.n` alone. A promise nobody can read is not a broken promise, it
is a dead one, and no reading of the tables would have found it: only asking what the label would
say did.

⛑ **AND THE CAMPS PICKER HAD ITS OWN APPLIER THAT NEVER READ `lasting` AT ALL.** A camp card marked
permanent would have shown PERMANENT INJURY on the button and charged hitpoints. That is the
second-source-of-truth shape this file keeps deleting (`choiceNote` in #150, the receipt in #176),
and it is why **`applyHurt` is now the ONE applier and both pickers call it**. ⚠ Their damage
ranges had drifted apart, 18-40% of max hp against 15-35%; the events range wins because it serves
six of the seven rows. ⚠ `injure` stores a **copy**, having pushed the card table's own object onto
the roster for as long as it existed.

⛔ **`hideHurt` STILL WINS OVER THE LABEL.** Two doors buy a surprise and the beam that comes down
IS the surprise; a door that says *permanent injury* before it is opened has sold the card.

⛔ **AND A DOOR THAT HANDS YOU A BODY SAYS "NO ROOM" BEFORE IT IS PRESSED.** The second ask was
reported as an option that does not exist, and **the option existed the whole time**: it was live,
it said *an ogre may join*, and the room check ran inside `pickChoice`, so a full company spent its
one choice and was told afterwards. From the outside those two are the same thing. The rule was
already written twice in this file (*"a door the player cannot afford has to say so BEFORE it is
pressed"*) and on the muster wall, which has printed `· no room left` on a greyed row since it was
built; room was simply the one price a road card could not read.

⚑ **DERIVED, NEVER AUTHORED, WHICH IS #137's RULE ON ITS FIFTH SURFACE.** The door already carries
`recruit:{race}` or `recruitPreset`, so the seat count IS the fact and nothing new is typed onto a
card - and deriving it fixed the four preset doors (Skree, Nib, Gell, Bruht) that nobody had
reported. ⚠ **`doorOpen` is the one predicate and the appended walk-away asks it too**, or a card
whose only live door was a full-party recruit would have had every button dead and no way off the
node: the exact soft lock that guard exists to stop.

### ⚠ #197 · AND A DOOR WITH NO SUB-LINE EMITS NO SUB-LINE ELEMENT

`choiceNote` returns `''` on a one-door pickup, whose receipt is on the card, and both renderers
wrapped that empty string in `<i></i>` anyway. `.choice i` is `display:block`, so the empty box was
a real line of button height. **Caught by measuring the button, not by reading the string** - which
is the whole argument for driving a card rather than reading one.

## The receipt: chips, and they are built off the payment

Every outcome renders `evFxChips(paid)` plus `evGearStrip(got)`. The chips are the aftermath's own
`.abfx`/`.fxc` furniture from #137, with three rows the battle screen never needed: **MORALE**,
**◐ DAYS** (a day spent prints as a minus) and **♥ MENDED**.

⛔ **THE GLYPHS ARE NOT INTERCHANGEABLE, AND #150 FIXED THEM ONCE.** A morale chip wears the
company's own **face** out of `MOODSTATES` (💀 😟 😐 🙂 😄), the same ladder the map's mood chip and
the battle's mood rungs use, and it shows the mood the choice **lands** the company in. **♥ means
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

## ⛔ #197 · AND THE CARD ITSELF OPENS IN THE MIDDLE

*(2026-08-19. The user: **"A lot of pictures are shown in one of the sides of the screen. Show
everething in the middle."**)*

#104 mapped a card to its NODE and #156 put the camera into that mapping, so a card opened beside
the place it was about. The argument was good and it is overruled: **a 620px card on a 1280px stage
is CLAMPED against an edge for half the map**, so THE DEBT opened hard left and SOMETHING IN ARMOUR
hard right, and the painting inside each one - which since stage 4 is the first thing on the card -
landed wherever the node happened to be. An anchor that is clamped half the time is a coin toss.

`placeDlg` centres. ⚠ **Every caller still hands its node coords and `DLGAX`/`DLGAY` still record
them**, so `replaceDlg` works and the anchor is one block away if it is ever wanted back. **The
check is a measurement**: open the same card from two nodes at opposite ends of the map and the box
must land in the same place, 0px off centre.

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

## ⛔ #209 · THE CARD IS A PAINTED STAGE, AND THE FORM IS CANON ON ALL THREE DECKS

*(2026-08-20. The user, pointing at `prototype/event_formats_sketch.html` tab J: **"I want you to
change events style shown ... I like style j (the sitting stone) ... inherit composition and
everething else"**, and then, once the road deck was on it: **"but form of all events new - as was
in new design - it is canon now"**.)*

**A card is a 1180x620 painting with the company standing in it.** The title and a small encounter
mark top left, the cast on plates below them, the prose down the middle **one beat at a time**, and
the doors as the last beat. `evStageOpen` builds it, `evFlow` is the only thing that re-runs on a
click, `evDoors` builds the door list. **The road deck, the CAMPS incidents and the VIGNETTES all go
through it**, which is the same three tables this file has governed since #143.

⛔ **AND EVERY PART OF IT IS DERIVED, WHICH IS WHY 99 CARDS CHANGED FORM IN ONE EDIT AND NONE OF
THEM CHANGED A WORD.** This is #137's rule applied to a LAYOUT instead of to a field:

| what the stage shows | what it reads |
|---|---|
| the beats | the card's own blank-line paragraphs |
| the voice of a beat | its own first character: a quote mark is somebody else, `{` is a cast token and therefore one of yours, anything else is the road |
| the first face | `G.fireTeller`, **only if the raw body says `{TELLER}`**; else the Captain |
| the second face | the member a visible `needRace` door needs |
| the fire's two faces | `evWhoIs(cast1.a)` / `evWhoIs(cast1.b)`, off the prose names it was cast with |
| which face a door belongs to | `needRace`, else the first face |
| the picture treatment | whether the picture is being CROPPED (`.evstage.fit`) |
| the glyph column | whether ANY visible door has a mark (`.evchoices.nomark`) |

⛔ **THE TELLER IS ONLY THIS CARD'S SUBJECT IF THIS CARD ASKS FOR HIM.** `G.fireTeller` is set by
the four cards that need a named speaker and is **never cleared**, by design: `cast()` reads it and
`{TELLER}` has to resolve to the same body in the body, the outcome and the effect prose. So the
field outlives its card, and the first cut of `evCast` put THE COIN IN THE ROAD's finder on the front
plate of A WEDDING ON THE ROAD three nodes later. **A picture is a claim, and a stale one is a claim
nothing else on screen agrees with.**

⛑ **ONE STAGE, THREE DECKS, ONE FUNCTION, AND THAT IS THE POINT RATHER THAN THE TIDY-UP.** The
road and the fire kept two door builders that said the same thing in thirteen lines each, and the
vignette a third half-renderer. That is the shape `choiceNote` was merged out of in #150,
`raceDoorPick` in #159, the mood echo in #176 and `applyHurt` in #197 - **one fact with two
implementations, four times, and every one of them had drifted by the time it was found.** Each deck
now hands in exactly four things: **its title, its prose, its doors, and what pressing one does.** A
new deck adds a fifth caller, never a second renderer.

⛔ **THE MODE FOLLOWS THE CONTENT AND NEVER A CLASS ON `#wDlg`.** Twelve functions open that box
and only three of them are cards; a class the other nine had to remember to clear is a rule that
survives exactly until somebody writes the thirteenth opener. The stylesheet gates on
**`:has(.evstage)`**, which cannot drift because every opener writes `dlg.innerHTML=` from scratch.
The muster, the shop, the withdraw screen and the returner are still the 620px column, and that is
correct: **the stage is for a card with prose and doors, not for a wall of recruits or a row of
prices.**

⚠ **THE SKETCH'S OWN TYPE WOULD NOT HAVE PASSED, AND A SKETCH NEVER HAS TO.** Tab J sets the door
label at 12.5px and its receipt line at **8px**, under `--fs1`'s 10px floor, and clips both with
`white-space:nowrap;text-overflow:ellipsis` - which is the exact regression table in
`.claude/rules/ui-scales.md` §4. Ported, every size is a `--fs` step, every pad a `--p` step, every
structural edge an `--e`, and **the door label wraps instead of clipping**. The user asked for this
in the same round (*"also follow rules with fonts size and eveething"*), and it is the general rule:
**a mockup is a picture of the intent, and the three scales are not part of what is being copied.**

⛔ **THE DOORS WEAR THE GAME'S OWN COLOURS.** (*"make buttons of choices a bit more in colors of
game (i feel now they use colors what don`t use in the game)"*.) The sketch's `#63766f`, `#82958b`
and `rgba(13,22,21)` are this build's **battle chrome** (`--e4`/`--e5`), i.e. a colour that already
means *you are on the field*. Every hex on a stage door is lifted off the column card's own `.choice`
rules: `#2a2114` ground, `--e2` edge, `--g3` lit, `#8c3a31`/`--blood-lit` for the fight door,
`#5a7a6a`/`#8ca35a` for the race door. The three prose voices took the same treatment: `--gem` for
your own people and `--wood` for everybody else, **not** the sketch's teal and orange.

⚑ **AND THE AIR BETWEEN THE PROSE AND THE DOORS IS A NUMBER, NOT A FEELING.** (*"add a bit more
space between text and choices"*.) The flow's beat gap is `--p4` and `.evchoices` sits at `--p6`, so
a door is nearly twice as far from the last line as two lines are from each other. That is what makes
the doors read as a different kind of thing rather than as a fifth paragraph.

⚠ **WHAT BROKE, AND ALL THREE WERE FOUND BY DRIVING RATHER THAN BY READING:**

- **`placeDlg` read `DLGW` and there are two card widths now**, so the stage opened 280px right of
  centre - #197's own complaint arriving through the back door. It measures `dlg.offsetWidth`.
- **A column flex SHRINKS its items before it scrolls**, so THE BROKEN MEN's outcome came back with
  its chip row cut in half and no scrollbar. `flex:0 0 auto` on every child of `.evflow`. ⚠ Found
  on the OUTCOME, not on the card: **a card that fits never shows it.**
- **The blurred background overflowed its box by 12x6**, and `.claude/rules/ui-scales.md` §5 forbids
  adding a fifth entry to the known-overflow list to make a decoration fit. The same file records the
  free fix: overflow to the LEFT and the TOP is not scrollable, so `transform-origin:100% 100%` sends
  every grown pixel up and left. **The decoration changed, not the counter.**

⏳ **THE ART IS THE OPEN HALF AND IT LANDS ONE CARD AT A TIME.** Seven road cards have a wide
1672x941 master composed for this frame; everything else is still a 586x212 letterbox being
cover-cropped into a 1.9:1 box, which throws away nearly half its width. **That is a known, accepted
shipping state** (the user: *"even arts are not ready - we will replace them slovly - just use
availible ones in the asked format (it would be ugly, but don`t worry)"*), and the renderer needs no
change when a file lands: drop the PNG in `art/src/stage-6/j-stage/`, rebuild the pack, add one row
to `JSTAGE`, and `.evstage.fit` picks up the lighter treatment by itself.

## ⛔ #212 · A CAMP CARD CAN WAIT FOR A PLACE

*(2026-08-20. The user: **"Event on the road with asha a bit later - after fen mother (when she tells
stories)"**.)*

`campPool` had four cast gates and they all ask about PEOPLE: `castRace`, `castTie`, `castMember`,
`castLost`. **`afterNode` is the fifth and it asks about the MAP.** A card carrying
`afterNode:'<node id>'` does not enter the pool until `G.visited[<id>]`.

⛔ **IT EXISTS BECAUSE A CAST GATE IS NOT A TIMING GATE, AND THE TWO LOOK THE SAME UNTIL A CARD
NEEDS BOTH.** `castMember:'ash'` already held THE WRONG COLOUR back until Asha is in the company,
which reads like a delay and is not one: she joins at Blood on the Road, the fourth node of the run.
So the one card in the game about *a woman who has never told anybody her story telling it* was being
dealt at the first or second fire the company ever built, to strangers. The card was right and its
place in the run was wrong, and nothing in the deck could say so.

⚠ **A NODE ID, NEVER A DAY COUNT.** `armourWhere` carries the long note: a rule phrased against a
node's PROGRESS through the run breaks silently the day somebody reorders the map, and #71 proved it.
The Black Fen is the beat that was named, so the Black Fen is what is asked for.

⛑ **AND IT FAILS THE SAME TWO SILENT WAYS EVERY GATE IN THAT BLOCK FAILS, SO `LINT` READS BOTH.** A
gate keyed on a node the map no longer has, or on a node only SOME companies walk, does not crash and
does not warn: the card simply never comes, for the whole life of the project. The check names the
missing node, and it enumerates `allRoads('hold',QUEST_GOAL)` the way 8c already does for the two road
stops. **Proved by moving the gate into each fault on purpose and watching it report** - `afterNode
"nowhere" is not a node on the map`, `afterNode "sling" is missable` - then restoring it to silence.

⚠ **`G.visited[k]` IS SET ON ARRIVAL**, one line before a boss card is dealt, so "after the
Fen-Mother" is true of every fire the card can reach for the ordinary reason: the fires are on the
ROADS, and the next road out of the fen is `mother -> vill`.

⚑ **THE POOL CANNOT EMPTY ITSELF INTO A DEAD END**, which is the thing to check after adding any
gate here: `openCamp` falls back to `openVignette` when nothing qualifies. Measured, 8 incidents
before the Fen and 9 after.

## ⛔ #218 · THE CARD OPENS, AND THE DOOR'S LEFT RAIL SAYS WHAT KIND OF ACT IT IS

*(2026-08-21. The user: **"i also want when event unfolds - add some animation to the screen (like
unfolding) - similar as choices where in frostpank"** and **"improwe a bit design of butons on the
choices sreen (i like icons and placment) - maybe some borders more thematic and coreleated to
choice"**.)*

### The unfold

**The painting parts from a lit hairline at the middle, the frame opens with it, the left column
arrives behind them in reading order, and the doors cascade once the last beat is reached.** 470ms
end to end, the first beat of prose beginning at 170.

⛔ **NOT ONE PART OF IT IS A CLASS ON `#wDlg`, WHICH IS #209's OWN RULE ARRIVING ON MOTION.** Twelve
functions open that box and a one-shot class the other eleven have to remember to clear is a rule
that survives until somebody writes the thirteenth. Two things re-arm these animations by
themselves and neither can go stale: **`.evstage` is a brand new element on every open** (every
opener writes `dlg.innerHTML=` from scratch, so a CSS animation on it runs exactly once, untold),
and **`#wDlg` goes `display:none` -> `flex` through `.on`**, and an element that becomes displayed
starts its animations fresh.

⚠ **SO THE BOX'S GATE IS `.on:has(.evstage)` AND NEVER THE `:has` ALONE, AND THAT IS A FACT ABOUT
HOW A CARD CLOSES.** Every close in the file is `dlg.classList.remove('on')` and nothing else: the
HTML is left standing, so `#wDlg` goes on matching `:has(.evstage)` for the rest of the session and
an animation hung on the `:has` would fire **once**, on the first road card of the run, and never
again. `.on` is the half that comes and goes. ⚠ It is also why the gate is not `.on` bare: the
muster wall, the shop and the withdraw screen are still the 620px column.

⛑ **`backwards`, NEVER `both`, AND THE DIFFERENCE IS A SHIPPED HOVER.** A `forwards` fill keeps
the animation's final `transform:none` in force after the animation ends, and **an animated
transform outranks a declared one** - so `both` on the doors silently killed
`.choice:hover{transform:translateX(4px)}`, the one piece of feedback a door has, with nothing in
the console and nothing in the stylesheet looking wrong. `backwards` holds the `from` state through
the DELAY, which is all a stagger needs, and hands the element back at the end. **The test is one
line and it needs no pointer**: write the hover's transform inline, wait out `.choice`'s own 140ms
transition, and read it back. If the declaration wins, the fill is right. ⚠ Reading it at t=0
returns the identity matrix and looks exactly like a broken fill; that cost one wrong conclusion.

⛔ **EVERY RESTING STATE IS THE NATURAL ONE, AND THAT IS A SAFETY RULE RATHER THAN A STYLE.**
`.claude/rules/ui-scales.md` §5 says the preview pane composites no frames; a build where these
never advance has to come out merely **still**, never one where the doors are invisible and the
card cannot be answered. So the seam's own base opacity is 0 (a flash that never runs is nothing),
the frame's base `inset` is its final one, and `prefers-reduced-motion` drops every one of them
rather than freezing one.

⚠ **AND THE DURATION IS MEASURED, NOT FELT.** The first cut ran **600ms**, because the two longest
members are a DELAY plus a DURATION and nobody had added them up. ⛑ **Read it off the animation
timeline and never off a sampling loop** - `a.startTime` plus `a.effect.getComputedTiming().endTime`
- because a loop polling `getAnimations()` measures its own latency and reported 725ms for the same
470ms choreography. **This is paid on every card in the game**, so the ceiling is what a player sits
through thirty-four times in a run, never what looks best once.

⚠ **A card is captured by PAUSING the timeline, not by racing it.** `document.getAnimations()`
returns CSS animations like any others: pause them, set `currentTime` to the millisecond you want,
and the screenshot is exact. That is what the gate picture for this entry is.

### The door's edge

⛔ **THE OUTLINE IS STATE AND THE RAIL IS INTENT, AND MERGING THEM WOULD BE #102's WRONG-UNIT BUG.**
The four-sided border on a door is a READOUT and has been since #137: `--e2` at rest, `#8c3a31` when
the door is a warning, `#5a7a6a` when it is only open because of who is in the company, `--g3` under
the pointer. `.claude/rules/ui-scales.md` §2 says in capitals that an accent edge carries meaning
and may not be flattened, so none of it is touched. **What was empty is the 2px LEFT RAIL**, which
every door in the game wore in the same `--e3` whatever the door did.

⛑ **DERIVED, WHICH IS #137's RULE ON ITS SIXTH SURFACE.** The classes are `iv-<key>` off the
door's own `ico`, written by `evRail` beside the two classes `evDoors` already writes. **The glyph
column says what the act IS and the rail says what KIND of act it is**, and two channels read off
one field cannot come to disagree.

⛔ **IT IS NOT A SECOND RECEIPT.** The head of this file forbids an intent glyph that starts
meaning *"this one pays well"*, and the same line binds here: the rail is keyed on `ico` and on
nothing else, never on `fx`, never on what a door costs. A door that takes a purse and a door that
takes a dead man's boots wear the same amber.

| | rail | why this hex |
|---|---|---|
| `fight` | `--blood-lit` | the fight door's own red. Fresh blood |
| `evil` | `--blood` | the dried half of the same two-step ladder |
| `help` | `--grain` | the approve green: morale-up, and the mended heart |
| `take` | `--wood` | the salvage chip's amber. What you pick up |
| `trade` | `--morale` | coin-yellow. ⛔ **AND NOT `--gold`** |
| `rest` | `--gem` | the coldest colour on the card, for the door that ends the day |
| `honor` | `--ore` | grave stone |
| `leave` | **no row** | ⛑ the quietest door is the one with no colour |

⛔ **`trade` IS `--morale` AND NOT `--gold` BECAUSE GOLD IS STATE.** `--g3`/`--g4` is hover and
select on this very button, and a gold rail on the 24 trade doors would read as *these are chosen*.

⛑ **AND THE `leave` ROW IS THE LOAD-BEARING ONE.** It is **28 of the 158 doors** in the two decks
and it is the null option; a rail on it would tint a third of every card to say *nothing happens
here*. It has no rule, so it falls to the `--e3` default - **and so do the 19 CAMPS doors that carry
no `ico` at all**, which is this file's own *"a door may be bare, and the fire's rulings are ... bare
reads as this is you deciding, not doing"* arriving on the edge without being told twice. A NINTH
intent gets the same treatment on the day one is written: uncoloured, never broken. ⚠ **Nothing
lints this**, and it cannot: an intent with no row is indistinguishable from an oversight, because
`leave` is deliberately exactly that.

⛔ **WHICH INTENT WINS ON A TWO-GLYPH DOOR IS THE STYLESHEET'S ROW ORDER, AND THE ORDER IS THE
RULE.** A door wears EVERY intent as a class, so a two-glyph door matches two rows at identical
specificity and the LATER one wins. The five verbs are listed first and **`help` and `evil` last**,
which is this file's own *"the verb comes first and the moral colour second"* written as a cascade:
⚔️☠️ is blood, ⚔️🤝 is green, 🧺☠️ is blood.

⛔ **THE FIRST CUT KEYED ON `ico.slice(-1)` AND ONE DOOR BROKE IT INSIDE AN HOUR.** THE WARM
SPRING's second door is marked `['take','leave']`, which is **two VERBS** rather than a verb and a
moral colour, so "last wins" handed the null rail to a door that takes something. Moving the
question into the cascade fixed it and deleted the second table it was about to grow: `evRail` does
not know which intents have a colour, nor which of two wins, and it must not learn.

⚠ **A PSEUDO AND NOT `border-left-color`, AND THE REASON IS SPECIFICITY.** `.choice:hover` sets the
`border-color` SHORTHAND, which writes all four sides, so a rail painted as a border is erased by
the pointer at exactly the moment the player is reading it. A `::before` cannot be clobbered by a
shorthand, and it can light up in its own colour instead. ⚠ `left:-2px;top:-1px;bottom:-1px`: an
absolutely positioned child is laid out against its parent's PADDING box, so the rail has to step
back over the border it replaces or it floats inside the outline.

### After a change here

```js
/* every ico combination in the two decks, against a REAL .evchoices list */
(()=>{const h=document.createElement('div');h.className='evchoices';
  $('wDlg').appendChild(h);const seen=new Set(['']);
  [...Object.values(EVENTS),...Object.values(CAMPS)].flatMap(e=>e.choices||[])
    .forEach(c=>seen.add((c.ico||[]).join(',')));
  const out=[...seen].sort().map(k=>{const b=document.createElement('button');
    b.className='choice'+evRail({ico:k?k.split(','):[]});h.appendChild(b);
    const v=getComputedStyle(b,'::before').backgroundColor;h.removeChild(b);
    return (k||'(bare)')+' -> '+v;});
  h.remove();return out;})()
```

⛑ **AND PROVE THE CASCADE BY MAKING IT FIRE, NOT BY READING IT.** Append
`:is(#wDlg,#prDlg) .evchoices .choice.iv-fight{--rail:var(--blood-lit)}` to `<head>` and `fight,evil` must flip
from `rgb(122,31,34)` to `rgb(163,59,52)`; remove it and it must flip home. Source-order precedence
is exactly the kind of rule that is right in the head and wrong in the file, and a check that has
only ever agreed with you is indistinguishable from one that is broken.

⚠ **A STRIP BUILT TO PHOTOGRAPH THE RAILS MUST BE BUILT INSIDE THE STAGE'S HOST.** Hung off
`document.body` it comes back with no rails and a collapsed grid, because every rule here is
`:is(#wDlg,#prDlg) .evchoices .choice`. That is the scoping working, not a bug, and it is worth
thirty seconds of confusion once rather than a widened selector.

⛔ **AND THE SELECTOR ABOVE IS THE `:is()` PAIR BECAUSE #219 LANDED BESIDE THIS ENTRY, NOT
BECAUSE ANYBODY WIDENED IT.** This work was branched before the opening became the fourth deck,
so every rule it added was authored as a bare `#wDlg` and every one of them was lifted at the
merge - 18 selectors across the unfold and the rails. That is #219's own standing instruction
(*"anything added to the stage's CSS goes in the `:is()`"*) doing the job it was written for: an
unlifted rule would have left THE THREE BELLS and THE MAN IN THE CORNER as the two cards in the
game that do not unfold and whose doors have no rail, which nothing on screen would have
explained. ⚠ The COMMENTS in the stylesheet still say `#wDlg` throughout and that is correct:
they are explaining why the box is gated on `.on` rather than naming a selector.
## ⛔ #219 · THE OPENING IS THE FOURTH DECK, AND THE STAGE STOPPED ASSUMING ITS BOX

*(2026-08-21. The user: **"make intro (before fight) and after picking name in the same event style
(after you kind of get people and money)"**.)*

#209's law is *"a new deck adds a fifth caller, never a second renderer"*, and **the opening was the
deck nobody had counted**. THE THREE BELLS and THE MAN IN THE CORNER are prose and doors like every
other card in the game, and they were still being drawn by `proCard` into the 800px column the road,
the fire and the vignette all left behind. `prStage()` is the new caller and it is nine lines. **Not
one word of either card changed**, which is the same result #209 got across 99 cards and for the same
reason: the beats, the voices, the faces and the picture treatment are all DERIVED.

⛔ **WHICH BOX THE STAGE IS IN IS STATE NOW, AND IT WAS A LOOKUP FOR AS LONG AS THERE WAS ONLY ONE.**
`evFlow`, `evFront` and the beat pips read `$('wDlg')` by name; `#wDlg` is a child of `#wMap`, and the
map does not exist yet when these two cards are read. `EVSTAGE.dlg` holds the host and `evHost()` is
the one reader. ⚠ **`placeDlg` IS OPTED OUT OF (`place:false`)**, because it centres inside `#wMap`
and reads `$('wDlg')` itself, so an unguarded call would have moved the WORLD's card instead of its
own. The opening's host is centred by `#prologue`'s own flexbox: measured 50,49 in a 1280x720 stage,
which is 1180x622 dead centre.

⛑ **THE CSS IS `:is(#wDlg,#prDlg)` AND NOT A SHARED CLASS, AND THAT IS ARITHMETIC RATHER THAN
STYLE.** `:is()` takes the specificity of its most specific argument, so all **30** stage selectors
keep exactly the weight they had. A class would have dropped them below `#wDlg .bd{overflow-y:auto}`
and handed the stage its own scrollbar - the fault #206 deleted from this card. ⚠ **Anything added
to the stage's CSS goes in the `:is()`**, or it lands on the road cards and not on the opening.

⚑ **A DECK MAY HAND IN TWO MORE THINGS AND THEY BOTH BELONG TO THE LAST BEAT.** `extra` is an HTML
string rendered into the flow after the receipt, and `wire` is a callback run after `evDoors`. The
contract card uses both for the 7x7 naming form, which is neither prose nor a door and must not be
seen before the offer has been read to the end. ⚠ **`wire` runs AFTER `evDoors` on purpose**: the
picker writes the chosen name onto the door that spends it, so the door has to exist first. ⚠ And
`.evflow` is `pointer-events:none` so a click on the prose steps the beat - anything INTERACTIVE in
there hands the pointer back, the way `.evchoices` already does.

⛔ **THE CONTRACT CARD IS THE FIRST CARD IN THE GAME WHOSE FLOW DOES NOT FIT, AND THE NUMBER IS THE
ARGUMENT.** 698 into 518, against **439** for THE DOOR SHRINE, which is the heaviest card the road
has. It is not badly written: it carries a receipt strip AND a naming form on top of four beats, and
no road card carries either. Three cuts, each right on its own merits:

- the picker goes to **one list per row** (four rows to two, 115px to 53) with the tracking off,
  which is `.claude/rules/ui-scales.md` §4's own trade on `.role`, made for the same reason - the box
  may not grow, so the letter-spacing gives instead of the size. **No word clips**, measured;
- **"THE ROOM SETTLES" and its divider are hidden inside the stage.** A road card's receipt is chips
  and nothing else (#143), and a third small-caps heading under a title and a mark is exactly the
  furniture this file keeps deleting. ⚠ Hidden rather than cut from `tavernReceipt`, because the
  dormant column path has no title of its own and still wants it;
- and the last **99px fades at the top edge** rather than slicing a line in half. `.evflow.cut` is
  set by `evFlow` and by the box's own `onscroll`, so it is gone the moment the player scrolls back.
  ⚠ **The threshold is 8px and not 0**: the opening measures 521 into 518, three pixels of
  sub-pixel rounding across six beats, and a fade over a card that is effectively full reads as a
  smudge on its first line.

⚑ **AND #150's TITLE CUT IS OVERRULED BY THE FORM, NOT BY TASTE.** *"we don't need a name for it so
far at left right corner"* was said about a COLUMN card sitting one pixel under a hard 684px ceiling,
where an `<h1>` cost 33px of prose. On the stage the title is absolutely positioned over the painting
and costs nothing, and every other card in the game carries one. The opening is **THE THREE BELLS ·
before the road**; the contract keeps its own title and takes **after the brawl** / **the far table**,
derived from the branch its prose already branches on. If the title is still not wanted, `title:''`
and the `<h3>` is not drawn.

⚠ **`proCard` HAS NO LIVE CALLER NOW** and is kept for the reason `contractSettle` and `prologueEnd`
are: the parked joke door (#134) and the parked floor door (#138) both land there. ⛔ **A restored
door lands on the STAGE** - a `doors:[]` row in the `prStage` call, never a fourth argument to
`proCard`.


## ⛔ #239 · A PAYOUT IS DERIVED TWICE NOW: FROM THE FX, AND FROM THE WORLD

*(2026-08-24. The user: **"Salvage - 50% of the income from the current things in everything, for
everything where it is more than 3 salvage"** and **"in the second fight (the chase) - much stingier,
the choice for letting go or killing prisoners"**.)*

This file has said since #176 that a door's cost is READ off its `fx` and never typed. Two asks push
that one step further: what a row is WORTH is no longer a property of the row alone.

⛔ **A NUMBER ON A CARD IS AN AMOUNT OF STUFF, NOT AN AMOUNT OF PAY.** `salvageCut(n)` halves anything
over three; the pile a card describes is unchanged and what it is worth is decided in one place. The
alternative was editing **40 of the 49 salvage figures in the content**, which puts the rule in 40
places and gets it wrong on the 41st card somebody writes.

⛔ **AND THE CUT IS TAKEN AT `payMat`, WHICH IS THE ONE MATERIALS DOOR, BECAUSE THERE WERE FIVE.**
`takeLoot`, `takeMercy`, the CAMPS picker, `applyFx` and `pickChoice` each carried their own copy of
`['salvage','wood','iron','gems'].forEach(...)`. That is the shape this file has merged out four times
(`choiceNote` #150, `raceDoorPick` #159, the mood echo #176, `applyHurt` #197) and every one of them
had drifted by the time somebody looked. **A cut applied at four of five sites is not a nerf, it is a
bug.** `payMat` returns what it paid, so `pickChoice`'s `addPaid`, `clashAfter`'s travelling
`G.clashHaul` and `consequences`' chip row all report the payment rather than the authored figure;
`evPaidOf` takes the same cut, so `fxNote` promises it.

⛔ **A ROW MAY ALSO BE DERIVED FROM THE FIELD IT IS DEALT ON, AND `MERCY` IS THE FIRST.** The three
prisoner rows paid a flat +30/+5 and +60/+9/+1 gem whether **one** body was kneeling or **six**. The
screen already knew: it speaks their race in `mercyLine` and names their kit in `MERCYSAY.strip`, and
the payout was the one thing on the card that did not read `MERCYASK`. `MERCY.per` is per head,
`mercyOpts(n)` builds the live rows, and **the renderer and `takeMercy` are handed the SAME built
objects** - a row built twice with two counts is the promise-versus-payment defect wearing a new coat.
⚑ **A chase-only special case would have been a second mercy table**, which is what this file spends
its length deleting. The user named one fight; the fault was in all of them.
⛔ **MORALE IS FLAT AND STAYS FLAT.** What it costs the company to watch you do this is a fact about
the DECISION and not about the body count. The gem is a THRESHOLD (4 heads) for the same reason: it is
the one thing on the card that is not money, and a fifth of a gem is nothing.

⚠ **AND TWO DERIVATIONS CAN STACK, ON PURPOSE.** The mercy salvage is per head AND then cut by
`payMat`, because the cut is a rule about every pile in the game. Both apply, the chips are derived, and
nothing on screen can disagree about which. **A new payout that does not want to be cut authors its
figure at three or under** - which is what the break-down table in the stash does, and it says so.

### After a change here

```js
/* the label a door prints, against what the door pays. Expect them equal. */
(c=>{G.camp.salvage=0;const said=fxNote(c.fx),paid=payMat(c.fx).salvage;G.camp.salvage=0;
  return {authored:c.fx.salvage,label:said,paid:paid};})
  (EVENTS.aqueduct.choices.find(c=>c.fx&&c.fx.salvage))    // authored 6 -> "+3 salvage" -> 3
/* and the mercy table at every count a field can produce */
[1,2,3,4,6].map(n=>n+': '+mercyOpts(n).map(o=>choiceNote(o).replace(/<[^>]*>/g,'')).join(' | '))
```

## ⛔ #240 · A DOOR'S LABEL MAY BE A FUNCTION, AND A CARD MAY NOT COUNT OUT LOUD

*(2026-08-24. The user: **"В событии с ограми писало 4, а стало 5 в бою. Писать корректно"**.)*

THE STEADING-LINE says *"Four of them across the road"* in its prose and `BATTLE · four ogres` on
its door, and `steading()` fields a FIFTH on a company of six or more. **Six encounters in the game
carry a `G.party.length>=6` reinforcement clause and this is the only one whose card counts out
loud**, which is why it is the only one that was ever wrong.

⛔ **SO THE COUNT IS DERIVED, WHICH IS #137's RULE ARRIVING ON THE ONE FIELD NOBODY HAD APPLIED IT
TO.** `steadingHeads()` is the same `>=6` test the plan makes, said once; `body` and `c:` both read
it. The day the wall grows a sixth ogre neither has to be found and edited.

⛔ **AND THAT MEANS `c:` MAY BE A FUNCTION, FOR THE SAME REASON `body` MAY.** `evBody(e)` has existed
since a card's prose first depended on the state it was read in; a door's sub-line has exactly the
same problem the moment anything on it is derived. **`evLabel(c)` is the one resolver** and it is
read by `choiceNote` AND by all five of `LINT`'s label scans:

```js
const evLabel=c=>{try{return (typeof c.c==='function'?c.c():c.c)||'';}catch(e){return '';}};
```

⚠ **THE LINTER IS HALF THE POINT.** Handed a function object, `scanLabel`'s five regexes test the
SOURCE and quietly find nothing - the receipt check, the mood-echo check and the needRace check all
pass a card they have not read. That is the trap the note on `evBody` was written about, one field
across.
⚠ **It swallows a throw and returns `''`.** A label that cannot be built must not take the card
down with it.
⚠ **A FUNCTION IS TRUTHY, so a `mystery` door with one still trips LINT 6d** (*"mystery door also
carries a c: line"*), which is correct: a `?` door has no label to derive.

⛑ **THE COUNT IS SPELLED OUT (`numWord`), because every other number on a road card is** - *"nine
men in a ditch three miles back"*, *"Two winters now, by his own account"*. A card that says
*"BATTLE · 5 ogres"* is the only digit in the deck.

⚠ **AND IT IS A FUNCTION RATHER THAN A CONSTANT** because `G.party` changes between one card being
read and the next: a muster between the two would leave a stale figure on a card dealt later.

### After a change here

```js
/* the card and the field, at both party sizes. Expect them equal. */
[4,6].map(n=>{const keep=G.party.slice();G.party.length=0;
  for(let i=0;i<n;i++)G.party.push(keep[i%keep.length]);
  const r=steadingHeads()+' / '+evLabel(EVENTS.steading.choices.find(c=>c.battle==='steading'));
  G.party.length=0;keep.forEach(p=>G.party.push(p));return r;})
// ["4 / BATTLE · four ogres · they will not chase you",
//  "5 / BATTLE · five ogres · they will not chase you"]
```

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
