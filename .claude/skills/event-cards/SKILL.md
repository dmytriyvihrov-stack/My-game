---
name: event-cards
description: "The rules for an event card: the length bands, the receipt derived from fx (never typed), intent glyphs and door rails, the painted stage, and the checks a card passes before it ships. Use whenever an EVENTS, CAMPS or VIGNETTES card or the opening deck is written, rewritten, trimmed, given a new door or a new outcome, and whenever a door's label, sub-line, chips or gating are touched."
---

# Event cards: length, receipt, and the painted stage

Apply this rule whenever an event card is written, rewritten, trimmed, or given a new outcome. It covers `EVENTS{}`, the `CAMPS` incidents, the `VIGNETTES` and the opening deck, because all four speak one receipt language.

> **The reasoning, the measurements and every user quote behind these rules are in
> [`docs/archive/rules-history/event-cards.md`](../../../docs/archive/rules-history/event-cards.md).**
> Read it when a rule looks arbitrary, when you are about to argue with one, or when you need the
> entry number. Nothing was cut, only moved: this file is the same rules with the story taken out.

## The one sentence

**A card is prose plus a receipt, and they must never say the same thing.** A number in both is a
second receipt, and the day the multiplier changes it becomes a wrong one. ⛔ The test is not *is this
number also in the prose*, it is **is this chip the sentence above it** *(#251)*: a road card is safe
by construction, the opening deck is not, because `prStage` puts its `receipt` inside the flow. Faces
are a picture, not a receipt, and stay.

VOICE is [`docs/README.md`](../../../docs/README.md) §4. This file is LENGTH and RECEIPT.

## Length

| | words of body + all outcomes | what lives there |
|---|---|---|
| LIGHT, a pickup | **45 to 90** | coin 45 · cache 50 · snare 51 · hollow 58 |
| MEDIUM, a look at the ledger | **90 to 140** | taxman 82 · saltwives 100 · milestone 89 · ratcart 120 |
| HEAVY, a decision retold | **140 to 175** | shrine 173 · oasis 172 · deadco 170 · circle 148 |

⛔ **175 words is the ceiling the whole road sits under.** The band is set by WEIGHT: a card that
gains a door may gain that door's words. Over-band is a card to look at, not one to cut; a percentage
cut is never a goal. Measure in the running build, never by reading.

```js
/* one card */
(e=>{const w=s=>String(s||'').trim().split(/\s+/).length;
  return w(typeof e.body==='function'?e.body():e.body)+
    e.choices.reduce((n,c)=>n+w(c.after),0);})(EVENTS.oasis)
```

⛔ That over-counts GATED doors (`needSins`/`maxSins`/`needRace`/`needHurt`/`needUnpaid`/`needMin`);
measure a gated card with the filter `openEvent` uses. ⚠ A function `body` is measured on **every
branch**, worst recorded.

```js
/* one card, as one company will actually read it */
(e=>{const w=s=>String(s||'').trim().split(/\s+/).length,n=(G.sins||[]).length;
  return w(typeof e.body==='function'?e.body():e.body)+
    e.choices.filter(c=>(c.needSins==null||n>=c.needSins)&&(c.maxSins==null||n<=c.maxSins))
      .reduce((s,c)=>s+w(c.after),0);})(EVENTS.holdmen)
```

**Out, in order:** numbers the chips carry · the sentence about the sentence · stage directions
between two beats · the second adjective, then the second clause · a stock clause standing in for the
receipt. ⛔ Count a stock phrase over **every** table that speaks the receipt language:

```js
(JSON.stringify(EVENTS)+JSON.stringify(CAMPS)+JSON.stringify(VIGNETTES)).split('the phrase').length-1
```

**Never out:** a price, a gate, or anything the choice needs to be made · the one concrete detail the
card is remembered by · a user's own words (frame lines may go, the line is canon).

## ⛔ The sub-line: the COST is derived, `c:` is only what `fx` cannot say

**`choiceNote()` is the ONE builder** (EVENTS, CAMPS, mercy screen) and builds in this order:

| | where it comes from |
|---|---|
| the cost | **`fxNote(o.fx)`, derived.** Never typed |
| what the cost cannot say | `c:` - gear by name, a battle's shape, a rule of the door |
| the mood | `moraleTag(o.fx)`, derived |
| the blood | **`o.hurt.lasting` -> `permanent injury` / `temporary injury`**, derived *(#197)* |
| the gate | `needTag(o.need)`, derived |
| the seat | **`recruit`/`recruitPreset` -> `no room left`**, derived *(#197)* |

⛔ **`c:` may not carry a figure `fx` carries, nor a mood echo.** `LINT` 6f holds it in `scanLabel`
over EVENTS, CAMPS and `MERCY.opts`: a signed figure, the five mood phrases, *"needs a ratkin"* on a
`needRace` door.

```js
[...Object.entries(EVENTS),...Object.entries(CAMPS)].flatMap(([k,e])=>(e.choices||[])
  .filter(c=>c.c&&/(^|\s)[+−-]\d/.test(c.c)))                    // 0
```

- ⛔ `choiceNote` **JOINS** its parts; add a fragment there, never `+' · '+` at a call site, or an
  emptied part opens on a floating middle dot. **`moraleLine()`/`fxLine()` are gone.**
- ⚠ It returns `''` on a one-door pickup and **no `<i>` may wrap that**: `.choice i` is
  `display:block`, so an empty one is a line of button height.
- ⛔ When a deletion would take a FACT with it, move the fact where it cannot be lost.
- ⚠ `fxNote` passes `mulCrowns:true`; `pickChoice` pays found crowns through `lootMul()`.
- ⚠ **A sweep over `c:'…'` is scoped to EVENTS and CAMPS**: aftermath `LOOT` rows and the withdraw
  screen share the `{t,c,fx}` shape, are not rendered by `choiceNote`, and are exempt.

**`c:` may be a FUNCTION and a card may not count out loud** *(#240)*: a count reads the plan's own
test (`steadingHeads()`) and is spelled out (`numWord`). **`evLabel(c)` is the one resolver**, read by
`choiceNote` and by all five `LINT` label scans, or a function label passes every regex unread.

```js
const evLabel=c=>{try{return (typeof c.c==='function'?c.c():c.c)||'';}catch(e){return '';}};
```

⚠ A function, not a constant: `G.party` changes between cards. ⚠ It swallows a throw. ⚠ Truthy, so a
`mystery` door carrying one still trips `LINT` 6d: correct.

**Injury and room:** **`applyHurt` is the ONE applier**, called by both pickers, 18-40% of max hp;
⚠ `injure` stores a **copy**, never the card table's own object. ⛔ **`hideHurt` wins over the label**:
a door that buys a surprise may not say *permanent injury*. ⛔ **A door handing you a body says `no
room left` before it is pressed**, derived off `recruit`/`recruitPreset`; **`doorOpen` is the one
predicate and the appended walk-away asks it too**, or a card whose only live door is a full-party
recruit soft locks the node.

## The receipt: chips built off the payment

`evFxChips(paid)` + `evGearStrip(got)`, on the aftermath's `.abfx`/`.fxc` furniture, plus **MORALE**,
**◐ DAYS** (a day spent prints as a minus) and **♥ MENDED**.

- ⛔ **Glyphs are not interchangeable.** A morale chip wears the company's `MOODSTATES` face
  (💀 😟 😐 🙂 😄) and shows the mood the choice **lands** them in; **♥ is BLOOD only**, the MENDED row
  paid by `healAll` and the spring.
- ⛔ **Chips are built beside the `pay()` call, never off `c:`**: in `pickChoice` that is
  `paid`/`addPaid`, and every new payment site calls `addPaid` in the same edit. The label is a
  promise, the chip is a fact, and only one may be wrong.
- `evPaidOf(fx)` serves sites whose payment IS the raw fx (camp incidents, vignettes, one-door card
  view), with `mulCrowns` only where the site pays through `lootMul()`.
- `evFxChips(f, moodAt)`: the second argument is for the one caller drawing chips BEFORE paying (the
  one-door pickup); pass projected morale, elsewhere it defaults to `G.morale`.
- A `hurtLine` from a special effect stays PROSE: a consequence with a story, not a resource.
- ⛔ **The chip furniture is SHARED** (`fxChips` in `consequences()`, `evFxChips`, `tavernReceipt()`),
  so a restyle is scoped behind its own screen or it is a bug: measure computed `padding`,
  `border-color`, `font-size`, `border-radius` against a `git show HEAD:` tab.
- ⏳ Aftermath `LOOT` rows are still exempt from the derivation and do repeat their `fx` figure.

## ⛔ A payout is derived twice: from the fx, and from the world *(#239)*

- **A number on a card is an amount of STUFF, not of PAY**: `salvageCut(n)` halves anything over
  three, and **a payout that does not want the cut authors three or under**.
- **`payMat` is the ONE materials door** and takes the cut; it returns what it paid, so `addPaid`,
  `G.clashHaul` and `consequences` report the payment, and `evPaidOf` takes the same cut so `fxNote`
  promises it.
- **`MERCY.per` is per head, `mercyOpts(n)` builds the live rows**, and the renderer and `takeMercy`
  get the SAME built objects. ⛔ **Morale is flat and stays flat** (a fact about the decision, not the
  body count); the gem is a threshold at 4 heads.
- ⚠ Two derivations stack on purpose: mercy salvage is per head AND then cut by `payMat`.

## Where a receipt may appear before the choice

**A multi-door card shows nothing before the pick**: prices stay on the buttons as intent, the score
stays hidden. **A card with ONE live non-battle door is a pickup and wears its loot on the card**;
the gate is `visible.length===1 && !visible[0].battle`, after the `need`/`needRace` filters, so a card
can be a pickup for one company and a decision for another. ⚠ A one-door card whose `after` is empty
closes straight to the road: never an outcome screen that is an empty box with a button.

## The `?`: a door that refuses to write a receipt

`mystery:true` replaces the sub-line with **`?`** and a hover: *"Nobody here knows what this pays. You
find out by doing it."* ⛔ **Authored, never derived, and the user's call which doors get one.** ⛑ Worth
something only while rare: today exactly one. ⛔ **It hides a PAYOUT, never a PRICE**: an unmeetable
`need:` still prints, `danger:true` and the fight door's red are untouched, the intent glyphs stay.
⛔ **It may not charge at the pick**: no `c:`, no `days`, `morale`, negative `crowns` or negative
`food` in its `fx`; **`LINT` 6d holds both halves.** ⛑ The bill lands on the far side: `AFTER` rows may
carry **`mor`** (and `remember`), applied and chipped by `consequences()`. ⚠ Not a licence for loot
rows: **an automatic haul may never charge morale or days** (`lootIsChoice`).

## The intent glyph, from `CHOICE_ICO` and `RACE_ICO` and nowhere else

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

**Verb first, moral colour second**: ⚔️🤝 fights for somebody, ⚔️☠️ fights as the predator. **Cap two**,
`LINT` 6c holds it. ⛔ **Intent, never a receipt.** ⛔ **☠️ and not 💀, ever**: 💀 is the lowest
`MOODSTATES` face and one glyph may not mean two things. ⛑ **The race mark is DERIVED from `needRace`**
(🐀 ratkin · 👹 ogre · 🧑 human), so a race-gated door authors only ONE intent; no human-gated door
exists and that is correct. ⛔ **`RACE_ICON` (the class table) is the one source of the three faces**;
`RACE_ICO` takes `g:` from it and owns only the WORDS. ⚠ The dependency runs DOWNWARDS on purpose: a
`const` read above its declaration aborts the script. ⛑ **A door may be bare, and the fire's rulings
are**: bare reads as *this is you deciding, not doing*.

⛔ **Only one race door is ever offered and the ratkin's wins. `raceDoorPick()` is the one builder**,
called by the road and fire renderers both; `RACE_DOOR_ORDER = ['ratkin','ogre','human']`. **A
priority, not a ban.** ⚠ It runs AFTER the `needRace` gate and BEFORE the appended walk-away, which is
not race-gated and must survive it. ⚠ **The visible maximum is 4 doors**: after authoring a second
race door anywhere, drive the card with a company holding both races.

## The door's left rail: what KIND of act it is

⛔ **The four-sided border is STATE, the 2px LEFT RAIL is INTENT.** The border is a readout (`--e2`
rest, `#8c3a31` warning, `#5a7a6a` race-gated, `--g3` pointer) and is not touched. The rail is
`iv-<key>` classes written by **`evRail`** off `ico` alone, never off `fx` or what a door costs.

| | rail | why |
|---|---|---|
| `fight` | `--blood-lit` | the fight door's own red, fresh blood |
| `evil` | `--blood` | the dried half of the same ladder |
| `help` | `--grain` | the approve green, and the mended heart |
| `take` | `--wood` | the salvage chip's amber |
| `trade` | `--morale` | coin-yellow. ⛔ **NOT `--gold`**: gold is STATE (`--g3`/`--g4` hover and select on this button) |
| `rest` | `--gem` | the coldest colour, for the door that ends the day |
| `honor` | `--ore` | grave stone |
| `leave` | **no row** | ⛑ the quietest door has no colour: falls to the `--e3` default, and so do CAMPS doors with no `ico` |

⛔ **Which intent wins on a two-glyph door is the stylesheet's ROW ORDER**: every intent is a class, so
two rows match at equal specificity and the LATER wins. **Five verbs first, `help` and `evil` last.**
⛔ **Never key on `ico.slice(-1)`**: `['take','leave']` and `['trade','leave']` are two VERBS and
last-wins hands them the null rail; `evRail` must not learn which intents have a colour. ⚠ **A
`::before`, never `border-left-color`**: `.choice:hover` sets the `border-color` SHORTHAND and would
erase it. ⚠ `left:-2px;top:-1px;bottom:-1px`: an absolutely positioned child lays out against its
parent's PADDING box. ⚠ A ninth intent gets the `leave` treatment, uncoloured and never broken;
nothing lints this and nothing can.

## ⛔ The card is a painted stage, canon on all four decks

**1180x620 painting with the company standing in it**: title and encounter mark top left, cast on
plates below, prose down the middle **one beat at a time**, doors as the last beat. `evStageOpen`
builds it, **`evFlow` is the only thing that re-runs on a click**, `evDoors` builds the doors.

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

- ⛔ **The teller is this card's subject only if this card asks for him**: `G.fireTeller` is never
  cleared, so a card without `{TELLER}` must not read it. A picture is a claim.
- ⛔ **Each deck hands in four things: title, prose, doors, what pressing one does. A NEW DECK ADDS A
  FIFTH CALLER, NEVER A SECOND RENDERER.** Today: road, CAMPS fire, vignette, `prStage()`.
- ⛔ **The mode follows the content, never a class on `#wDlg`**: the stylesheet gates on
  **`:has(.evstage)`**, which cannot drift because every opener writes `dlg.innerHTML=` from scratch.
  Muster, shop, withdraw screen and returner stay the 620px column.
- ⛔ **The stage's CSS is `:is(#wDlg,#prDlg)`, never a shared class**: `:is()` keeps the specificity, a
  class drops it under `#wDlg .bd{overflow-y:auto}` and hands the stage a scrollbar. ⚠ **Anything
  added to the stage's CSS goes in the `:is()`**, or it misses the opening.
- ⛔ **Which box the stage is in is STATE**: `EVSTAGE.dlg` holds the host and **`evHost()` is the one
  reader**, never `$('wDlg')` by name. ⚠ The opening opts out of `placeDlg` (`place:false`).
- ⛑ **`placeDlg` CENTRES** and measures `dlg.offsetWidth`, never `DLGW` (two card widths exist);
  `DLGAX`/`DLGAY` still record node coords so `replaceDlg` works. Check by opening one card from two
  opposite nodes: same place, 0px off centre.
- ⛑ **A deck may also hand in `extra` (HTML after the receipt) and `wire` (a callback), both on the
  LAST beat.** ⚠ `wire` runs AFTER `evDoors`, because a form writes onto the door that spends it.
  ⚠ `.evflow` is `pointer-events:none` so a click on the prose steps the beat; anything INTERACTIVE
  hands the pointer back.
- ⚠ **`flex:0 0 auto` on every child of `.evflow`**: a column flex SHRINKS items before it scrolls,
  and a card that fits never shows it. ⚠ **`.evflow.cut`** fades the top edge rather than slicing a
  line, **threshold 8px and not 0**. ⚠ Beat gap `--p4`, `.evchoices` at `--p6`.
- ⚠ **A mockup is a picture of the intent; the three scales are not copied.** Every size an `--fs`
  step, every pad a `--p`, every structural edge an `--e`, and a door label **wraps, never clips**.
  Stage doors wear the game's own colours (`#2a2114` ground, `--e2` edge, `--g3` lit,
  `#8c3a31`/`--blood-lit` fight, `#5a7a6a`/`#8ca35a` race), never battle chrome (`--e4`/`--e5`); prose
  voices are `--gem` for your own people, `--wood` for everybody else.
- ⚠ **`proCard` has no live caller**, kept for the parked joke door and parked floor door. ⛔ **A
  restored door lands on the STAGE**: a `doors:[]` row in `prStage`, never a fourth argument to
  `proCard`. A title is suppressed with `title:''`.
- ⏳ Art lands one card at a time: anything without a `JSTAGE` row is a 586x212 letterbox cover-cropped
  into a 1.9:1 box. Known and accepted; the renderer needs no change when a file lands.

## The unfold

**The painting parts from a lit hairline at the middle, the frame opens with it, the left column
arrives behind them in reading order, and the doors cascade once the last beat is reached.** 470ms end
to end, first beat of prose at 170, paid on every card in the game.

- ⛔ **No part of it is a class on `#wDlg`**: `.evstage` is a brand new element on every open, and
  `#wDlg` goes `display:none` -> `flex` through `.on`, so both re-arm by themselves.
- ⚠ **The gate is `.on:has(.evstage)`, never the `:has` alone**: every close is
  `classList.remove('on')` and leaves the HTML standing, so a `:has`-only animation fires once a run.
- ⛑ **`backwards`, never `both`/`forwards`**: a `forwards` fill keeps the final `transform:none` in
  force and an animated transform outranks a declared one, so it silently kills
  `.choice:hover{transform:translateX(4px)}`. Test: write the hover transform inline, wait out
  `.choice`'s 140ms transition, read it back, and the declaration must win. ⚠ At t=0 it returns the
  identity matrix and looks like a broken fill.
- ⛔ **Every resting state is the natural one**, because a build where these never advance must come
  out merely still, never with the doors invisible: seam base opacity 0, frame base `inset` its final
  one, and `prefers-reduced-motion` DROPS each rather than freezing one.
- ⚠ Read a duration off the animation timeline (`a.startTime` +
  `a.effect.getComputedTiming().endTime`), never a sampling loop, which measures its own latency.
- ⚠ **A card is captured by PAUSING the timeline, not by racing it and not by waiting longer**;
  `tools/dev/probes/cardfloor.js` must be taken on a SETTLED card.

## Camp gates: a card can wait for a PLACE *(#212)*

`campPool` gates on people (`castRace`, `castTie`, `castMember`, `castLost`) and on the map:
**`afterNode:'<node id>'`** keeps a card out of the pool until `G.visited[<id>]`. ⛔ A cast gate is not
a timing gate. ⚠ **A node id, never a day count**: a rule phrased against PROGRESS through the run
breaks silently when the map is reordered. ⛑ **`LINT` reads both silent failures**: a gate on a node
the map no longer has, and one on a node only SOME companies walk (`allRoads('hold',QUEST_GOAL)`).
⚑ **The pool cannot empty into a dead end** (`openCamp` falls back to `openVignette`); check that
after adding any gate here.

## After a change here

```js
/* the label a door prints, against what the door pays. Expect them equal. */
(c=>{G.camp.salvage=0;const said=fxNote(c.fx),paid=payMat(c.fx).salvage;G.camp.salvage=0;
  return {authored:c.fx.salvage,label:said,paid:paid};})
  (EVENTS.aqueduct.choices.find(c=>c.fx&&c.fx.salvage))    // authored 6 -> "+3 salvage" -> 3
/* and the mercy table at every count a field can produce */
[1,2,3,4,6].map(n=>n+': '+mercyOpts(n).map(o=>choiceNote(o).replace(/<[^>]*>/g,'')).join(' | '))

/* the card and the field, at both party sizes. Expect them equal. */
[4,6].map(n=>{const keep=G.party.slice();G.party.length=0;
  for(let i=0;i<n;i++)G.party.push(keep[i%keep.length]);
  const r=steadingHeads()+' / '+evLabel(EVENTS.steading.choices.find(c=>c.battle==='steading'));
  G.party.length=0;keep.forEach(p=>G.party.push(p));return r;})
// ["4 / BATTLE · four ogres · they will not chase you",
//  "5 / BATTLE · five ogres · they will not chase you"]

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

⛑ **Prove the rail cascade by making it FIRE.** Append
`:is(#wDlg,#prDlg) .evchoices .choice.iv-fight{--rail:var(--blood-lit)}` to `<head>`: `fight,evil` must
flip `rgb(122,31,34)` -> `rgb(163,59,52)`, and flip home when removed. ⚠ A strip built to photograph
the rails must be built inside the stage's host, or every rule misses it.

## Before the card ships

```js
LINT()                                   // 0 findings. It reads the tables for morale-in-label and the rest
/—/.test(JSON.stringify(EVENTS))         // false. No em dash, anywhere, ever
/* every road door wears an intent, and no door wears three glyphs */
Object.values(EVENTS).flatMap(e=>e.choices).filter(c=>!c.ico||!c.ico.length).length   // 0
/* and a ? door is still rare. If this ever reads above 4, argue about it first */
Object.values(EVENTS).flatMap(e=>e.choices).filter(c=>c.mystery).length               // 1
```

⚑ **If the card starts a fight, the arena is part of the gate**: a door's prose can be right while the
fight behind it says the opposite, and only `ARENA.match()` says which the player meets.

Then drive the card and read the DOM, because **the preview pane composites no frames and a screenshot
proves nothing**: the chip row against the top bar's actual change, the strip against the stash or the
wearer, one door end to end. `shots/143_event_chips.html` is the shape of the eye check.
