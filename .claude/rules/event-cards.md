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

⚑ **A DOOR MAY BE BARE, AND THE FIRE'S RULINGS ARE.** The CAMPS deck is mostly judgments rather
than actions - the debt, the aunt, the nine seconds - and a glyph forced onto a ruling would
dilute the eight that mean something. **Bare reads as "this is you deciding, not doing".** 94 of 94
road doors carry one; 31 of 53 camp doors do.

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

## Before the card ships

Run these in the running build and expect what is named:

```js
LINT()                                   // 0 findings. It reads the tables for morale-in-label and the rest
/—/.test(JSON.stringify(EVENTS))         // false. No em dash, anywhere, ever
/* #154: every road door wears an intent, and no door wears three glyphs */
Object.values(EVENTS).flatMap(e=>e.choices).filter(c=>!c.ico||!c.ico.length).length   // 0
```

Then drive the card itself and read the DOM, because **the preview pane composites no frames and a
screenshot proves nothing**: the chip row against the top bar's actual change, the strip against
the stash or the wearer, and one door taken end to end. `shots/143_event_chips.html` is the shape
of the eye check, three live captures with the build's own CSS.
