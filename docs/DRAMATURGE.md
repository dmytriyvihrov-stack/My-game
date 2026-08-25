# The Dramaturge - how it works

> **`tools/dramaturge.html`.** A standalone page for looking at the *shape* of a run: build a map,
> pick a road through it, and see what walking that road would feel like. It is not part of the
> game and the game does not know it exists.
>
> Built 2026-08-01 (build log 8f.53). This file is the manual; the build reasoning is in
> [`CHANGELOG.md`](CHANGELOG.md), the thing to try is in [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md), and
> the one unbuilt piece is backlog **#57**.

**Contents:** [Open it](#open-it) · [The one rule](#the-one-rule-that-matters) ·
[The screen](#the-screen) · [The map](#the-map) · [Choosing a road](#choosing-a-road) ·
[The line](#the-line) · [The four curves](#the-four-curves) · [Scoring](#scoring-a-beat) ·
[What to look at](#what-to-look-at) · [The run sheet](#the-run-sheet) ·
[Consequence trees](#consequence-trees) · [New events](#new-events) ·
[Saving](#saving) · [Limits](#known-limits)

---

## Open it

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools\serve.ps1
```

Then **http://localhost:8777/tools/dramaturge.html**.

The top right must say **`live · prototype/grimtoll_slice.html`** in teal. If it says *snapshot*,
the server is not running and the page has fallen back to its built-in copy.

---

## The one rule that matters

**The tool does not own a copy of the game's content.** On boot it fetches
`prototype/grimtoll_slice.html`, slices `const EVENTS={…}` and its six siblings out of the source
text with a string-and-comment-aware brace matcher, and evaluates them with a stubbed `G`/`who`.
Camp and vignette bodies are functions of the party, so they are called with `{A}`/`{B}` and
flattened.

Edit an event in the game and it is edited here. **No export step, no build step, no Node.**

There *is* an embedded snapshot in the file, but it is a **fallback only** - for opening the page
off disk (`file://` cannot fetch a sibling) or when the server is down. The header always says
which one you are looking at.

> ⚑ **If you ever regenerate that fallback, parse the SOURCE TEXT - never read the running game's
> globals.** The game renames its slot nodes at boot (`o1.n` becomes *"Something on the road"*, the
> true title moves to `.real`), so a snapshot taken from a booted page carries runtime-mutated data.
> That happened once and showed up as vague names in the crossroad picker.

**The paintings** are read the same way - `EVENTART` maps an event to an art id, `ART` holds the
data URIs. ~2.5 MB of base64, so they are read in live mode only and deliberately never written to
the snapshot or to `localStorage`. Hence: pictures when served, no pictures off disk, on purpose.

---

## The screen

Two tabs. **MAP + DRAMATURGE** is one screen - the map on top, the analysis in an accordion under
it - because they are one job. **ANALYTICS** is a deliberate stub (backlog #57); its whole spec is
written on the tab.

Three panels fold away when you want the room: **THE TRAY** (left), **SCORE** (right) and
**WHAT TO LOOK AT** (bottom). The fold state is remembered.

---

## The map

The real `NODES` and `EDGES`, editable.

| | |
|---|---|
| **drag a place** | move it |
| **click a place / a road** | edit it on the right |
| **`+ place`** with a road selected | drops the new place **into** that road - `A → X → B`, days split |
| **`+ place`** with nothing selected | a free place with no roads on it (it says so) |
| **`+ road`** | two clicks: start, then end. A band across the top tells you which step you are on, the source is ringed white, a dashed line follows the cursor, **Esc** stops |
| **`delete`** | removes the selected place or road |
| **`show code`** | a paste-ready `const NODES` / `const EDGES` block |

Roads are drawn 2px but are **16px wide to the mouse**, and carry an **arrow** showing which way
they run - direction is order.

**Changing the order.** Three ways, in order of how often you will want them:

1. **Select a road, then `+ place`** - put something between two things you already have.
2. **Re-point a road** - the road inspector has *from* and *to* dropdowns. Everything downstream
   moves with it.
3. **⇅ swap** in a place's inspector - exchanges it with its neighbour, positions and all. Only
   legal where both sit in a simple chain; on a fork it refuses and says why, because there is no
   single "before" to exchange.

**The map runs the game's own two linters** - `spacingViolations` and `labelViolations`, ported
arithmetic-for-arithmetic including `labelSpot`'s search. A map arranged here will not ship the
overlaps that #6 and 8f.51 had to fix.

> ⚠ Both are **computed, never measured**. `getBoundingClientRect()` returns zeros in a hidden
> preview pane, so a "measure the DOM and look for overlaps" check silently passes everything.

---

## Choosing a road

**The road is a decision at each crossroad, not an index into a list.** `YOUR ROAD` on the right
shows one block per fork the road actually reaches, in the order you reach them, with the days and
the road's own description. Click one and everything downstream re-walks - later crossroads appear
and disappear as the road moves.

Because it is stored as decisions (`S.picks[node] = node`), **re-pointing a road or inserting a
place keeps every choice you made downstream of it.** A route list would not survive that.

It tells you when you have not decided: *"3 crossroads (2 not chosen yet - taking the first road)"*.
The full list of enumerated routes is still there, folded away; clicking one just fills in these
choices.

**`what is actually on it`** is the second half. A place on the map is one of three things, and
they are not treated alike:

| | |
|---|---|
| **FIXED** | the node names its event - stated, not offered, because it is not a choice |
| **SLOT** | it is in `SLOTS_ON_MAP`, so the game deals it from the floating pool at run time - **a dropdown** |
| **NIGHT** | the camp card after each place - **a dropdown**, with *- no fire -* |

Unset reads *"- whatever the pool gives -"*, so a guess is never dressed up as a decision. Both
pools are **once per run**, matching the game; when the deck runs dry the road has quiet nights.

**Everything regenerates live.** Change a road's days, drop a place into one, pick a different
crossroad - the analysis below re-reads it. Delete a road the live route needed and it falls back
to the nearest surviving route *and says so*; cut the map in half and it warns rather than showing
a stale line under a confident label.

---

## The line

The road, laid out left to right, with a road connector between every two places carrying its day
cost. A crossroad is marked **⋔3**; hover it and it names the roads you did *not* take.

- **Drag** to reorder, drag in from the tray, drag out to the tray to remove.
- **Hover** a card for the full text, every choice with its real costs, and the painting.
- **Hover** a card and its place lights up on the map. Hover a place and its card lights up.
- **Click** a card to score it.

**Moving a card moves the place.** On a live road, dragging a place's card rewires the map:
`P → X → Q` closes to `P → Q` with the days added together, and the road you dropped into splits
with the days shared. The place moves to its new road's midpoint. It refuses when the answer is not
unique - a fork or a join - rather than guessing.

A **camp night** is a night, not a location: dragging one re-assigns which place it belongs to and
does not touch the map.

**◇ ANY -** the slot cards at the top of the tray are not events. Drop one on the line and it
stands for *"the game draws a merchant thing here"*, scored as the mean of that pool. Plan the
shape in slots, fill it with named events after.

---

## The four curves

### DRAMA - a signed move, not a level

Positive winds tension up: threat, an irreversible cost, a moral compromise, a name put at risk.
Negative discharges it: relief, warmth, competence, comedy. **The alternation is the point** - a
story that only goes up numbs an audience as fast as one that never moves.

```
+5  the act's climax          −1  a good trade, competence
+4  a named monster           −2  warmth, comedy
+3  a real fight, or a crime you cannot undo
+2  teeth shown, a hard ruling      −3  full release: the fire, the wedding
+1  unease, a question, a small cost
 0  texture
```

Bars are the per-beat move; the gold line over them is accumulated tension. **Solid above the axis
is tension, hollow below it is relief**, and each bar takes its beat's **category colour** - so a
stretch of fights reads differently from a stretch of moral squeezes.

### SURVIVAL PRESSURE - not scored at all

This one is the **ledger**. It spends the real `fx.crowns` / `fx.food` / `fx.days` out of the game
file against wages per day, and a route carries **the days of each road it walked**.

- wages/day = `dailyUpkeep()` = sum of `WAGE[race]` - ratkin 1, human 2, **ogre 1** (he takes 3 of
  the party room, `COST[race]`, but is paid a single coin) - so a starting four humans is 8/day
- provisions start at 8 and are **not** a daily drain; only events move them
- the purse floors at zero, exactly as `pay()` does - **and what the floor swallows is reported**

The **played** switch - *kind* / *average* / *cruel* - picks which choice the walker takes. That is
the whole argument:

> On the longest route, played **kind** the purse is empty at beat 10 of 24 and pressure peaks at
> 70/100. Played **cruel** it never empties, peak pressure 40, 257 crowns in hand.

A longer road is only dramatic if it takes something, so the tool spends real numbers rather than
asking you how it felt.

### The three that only climb

- **LORE** +1 - the beat says something about the island, the war, the Bloom, the peoples.
- **ATTACHMENT** - your character flag **plus what the data already knows**: +1 where a choice can
  scar somebody (`hurt`), +1 for a card gated on a bond (`castTie`). #38's ties count themselves.
- **EROSION** 0–3 - how hard the cruel option *pays*. Not whether one exists. 3 is *"the profitable
  answer is the ugly one"*. It is the pillar made checkable.

---

## Scoring a beat

Click a card. Everything is editable and **your edits always win**; `reset scores` goes back to the
shipped ones. All 60 beats ship pre-scored against the rubric above, printed in the panel so you can
argue with it.

| field | |
|---|---|
| **category** | one of ten - also the colour, everywhere |
| **drama** | −3 … +5, the signed move |
| **swing** | 0–3, how far the player's choice can move it |
| **lore / character** | +1 flags |
| **erosion** | 0–3 |
| **tactical** | 0–3 - what the *fight* costs in bodies and ground, which the purse never hears about |
| **recovery** | 0–3 - how much this beat lets you mend and refit |
| **battle tier** | none / teaching / standard / climax, plus **dynamic** |
| **threads** | `name:step`, comma separated |
| **creates / requires** | tokens, checked along the line |

**What is derived and never typed:**

- **role** - `main` thread → MAIN, any other thread → SIDE (it continues something), none → DYN
  (about nothing yet, so poolable). Give a beat a thread and it stops being dynamic.
- **stage** - the thread step (setup / complication / payoff).
- **act phase** - position on the line. *A floating event is early on one run and late on the next,
  so storing a phase against it would simply be untrue.*
- **repeat rule** - `FLOATING` vs fixed.
- **follow-up deadline** - "settle the debt before the Snare" **is** a `requires` token on the Snare.

**Threads were not invented here.** The camp chains - `debt → debt2/3/4`, `found → found2`,
`fiddler → fiddler2`, `kin → kin2/3/4` - are the game's own `needs:{id,opt}`, read out and drawn as
arcs under the board.

---

## What to look at

The bottom panel. A summary you can read folded - `1 to fix · 13 to look at · 4 fine` - and inside,
a list sorted worst-first, because it is a to-do.

**Every finding names real beats and says what to do**, and the suggestion is computed: it looks up
which beat actually carries the missing payoff, and names the calmest or most restful thing *not
already on your road*.

> ✗ **THE DEAD COMPANY pays off the "mirror" thread, but nothing on this road sets it up.** Its
> setup is **THE BROKEN MEN** - route through it, or take the thread off this beat.

Where nothing can fix it, it says so rather than inventing advice: *"There is no payoff written yet.
That is a thing to write, not a thing to fix here."*

**What it checks.** Value-charge monotony · flatlines · a long climb with no relief · the climax not
being the top · the loudest beat in the first third · setup without payoff and payoff without setup
· lore and character droughts · a purse never in danger · a purse empty too early · the floor
swallowing crowns · front-loaded erosion · more than one climax fight · a first real fight before
anything taught them to fight · fights stacked back to back · a dynamic teaching fight or a dynamic
climax · nowhere to mend · main/side/dynamic balance · a `requires` no earlier beat `creates` ·
unfilled slots · unscored beats.

**None of it is an order.** Each one is a named thing that goes wrong in stories, stated so you can
look at it and disagree.

---

## The run sheet

`run sheet` prints the whole road on one page. One row per beat, fixed columns, and **the drama
column is its own text chart** - relief grows left of a spine, tension right of it - so the pulse is
visible without reading a word.

Then `EARNED` / `SPENT` / `NET` across crowns, provisions, salvage and gems; the wage bill over the
day count; `MADE OF` main/secondary/dynamic; the fights by tier; and where the company can mend.

---

## Consequence trees

`tree`, or `copy tree` in a beat's panel. The user's own format:

```
THE CLAN CART
    ├─ Fix the wheel. It takes an ogre and an hour.
    │   ├─ [days +1 · morale +8]
    │   └─ The strongest of you lifts the axle…
    └─ Take the cart.
        ├─ [crowns +120 · salvage +8 · morale -20]
        └─ Four ratkin walk away down the road without hurrying…
        └─ ◇ the wedding recognises your banner
```

Two kinds of branch, kept apart on purpose: **what the game already does** (`after` prose, a battle,
a scar, gear, a mutation - read live, never typed here) and **what it should do later** - the ◇
lines you write in the inspector. Marked, so nobody mistakes a wish for a feature.

---

## New events

**＋ new events…** at the top of the tray.

⚠ **This page has no network and no model behind it, so it does not write prose and does not pretend
to.** What it does is the part a tool can do well:

1. **Real, scored DRAFT beats** you can drop on the road immediately - dashed edge, and they go
   through every graph and every check like anything else. Their placeholder choices carry real
   `fx` shaped by category, **so a road planned out of drafts still produces an honest pressure
   curve.** You can answer *"would this shape work"* before a word is written.
2. **`copy the briefs`** - a commission for each, carrying the project's house rules (costs as
   intent not receipts, consequences landing on a named person, the party tokens, the
   provisions/salvage vocabulary, the pillar), so what comes back fits the game.
3. **`copy code skeletons`** - valid `EVENTS` entries that paste in and boot. Every string is a
   `TODO`; the shape is already right.

Set how many, the kind, the role and thread, a drama range (spread across the batch rather than
repeated), swing, erosion, recovery, fight tier - then one prompt line per event.

Drafts are yours, not the game's: a rescan never touches them, and they ride along in `export`.

---

## Saving

- **Scores, lines, drafts, map edits and picks** live in `localStorage` and persist.
- **`export` / `import`** - the whole lot as JSON.
- **`save map as…`** - a named map keeps the places, the roads **and the road you had picked
  through them** (crossroads, slot fills, camp nights), because a map without the road you were
  reading is half the work. The dropdown loads them; `✕` deletes one; `revert` goes back to the
  shipped map and leaves saved ones alone.
- **`rescan game`** - re-read the game file by hand, for when live-load is not available. New beats
  arrive flagged **NEW** with a white edge; removed ones are named.

---

## Known limits

- **ANALYTICS is not built.** Backlog **#57**. Its input already exists - #53's copy-paste run
  journal. The spec is written on the tab.
- **The map block is a fixed 62vh and the dramaturge 78vh.** No draggable divider.
- **Drama is per-event plus a swing number**, not per-choice. That was a deliberate call; the open
  question is whether swing is earning its place or whether each choice wants its own score.
- **The tool never writes to the game.** `show code` and `copy code skeletons` produce text for you
  to paste. Nothing here can break `grimtoll_slice.html`.
- **No pictures off disk** - see [the one rule](#the-one-rule-that-matters).
