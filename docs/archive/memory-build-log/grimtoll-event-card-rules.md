---
name: grimtoll-event-card-rules
description: "#143 + #154's rulings are standing rules - a card's word count is measured against its weight band, every outcome receipt is chips built off the payment, and every road door wears a derived intent glyph"
metadata: 
  node_type: memory
  type: project
  originSessionId: 4ab54b74-7e7b-49e9-8ded-86fb00df73ad
  modified: 2026-08-14T10:56:10.539Z
---

**#143 / 8f.171 (2026-08-13) shipped the event text diet AND wrote its rulings into the docs the
same night**, so the next card is written this way rather than the diet being run twice.

**The procedure is `.claude/rules/event-cards.md`** (third file in that directory, alongside
`world-map-sights.md` and `static-event-art.md`). Read it before writing, trimming or adding an
outcome to any card in `EVENTS{}`, `CAMPS` or `VIGNETTES`.

- **Length is measured, not felt: LIGHT 45-90 words · MEDIUM 90-140 · HEAVY 140-175**, body plus
  every outcome, counted in the running build. The shipped road is 34 cards / 3,652 words, min 45
  (coin), max 173 (shrine), none outside, split 14/11/9.
- ⛔ **The receipt is chips built BESIDE the `pay()` call, never off the hand-written `c:` string**
  (`paid`/`addPaid` in `pickChoice`, `evPaidOf` elsewhere). Any new payment site added to
  `pickChoice` must call `addPaid` in the same edit. `moraleLine`/`fxLine` are deleted; do not
  write a third one.
- ⚑ **The pillar's boundary, found here:** a multi-door card shows nothing before the pick, but a
  card with ONE live non-battle door is a pickup and wears its loot on the card. The gate is
  computed after the `need`/`needRace` filters, so **the same card can be a pickup for one company
  and a decision for another**.
- ⚠ **A percentage is not a goal.** Four cards finished under the asked 30% because their
  remaining lines were load-bearing; cutting to a quota costs the joke or the fact.

## #154 / 8f.182 (2026-08-14): the doors wear their intent

Same rule file, new section. **Eight glyphs, MEASURED DOWN from a first draft of ten by reading
every door in the game**: ⚔️ FIGHT · 🤝 HELP · ☠️ EVIL · 👣 LEAVE · ⚖️ TRADE · 🧺 TAKE · ⛺ REST ·
🙏 HONOR, verb first and moral colour second (⚔️🤝 fights *for* somebody, ⚔️☠️ fights as predator).

- ⛔ **TALK and RISK died to the count.** Every talk door carries another intent underneath, and
  RISK duplicated `danger:true` - **a glyph that says what the button styling already says is
  furniture**. The user's own four were right; the build needed four more.
- ⛔ **☠️ and never 💀**: the morale chips wear 💀 as the lowest `MOODSTATES` face, and one glyph
  may not mean two things on one screen. #102's wrong-unit rule, caught in design this time.
- ⚑ **The race mark is DERIVED from `needRace`** (🐀 · 👹 · 🧑), which is **#137's rule on its
  fourth surface**: red was hand-flagged per fight door and five doors never got it. Cap is two, so
  a race-gated door authors one intent. **No human-gated door exists and that is correct** - the
  company is human by default, so the gate would fire on everybody.
- ⚑ **A bare door is legal and the fire's rulings are bare**: the CAMPS deck is judgments rather
  than actions, and bare reads as *you deciding, not doing*. 94/94 road doors tagged, 31/53 camp.
- ⛑ **Two em dashes had shipped for months in CAMPS prose**, because the standing gate reads
  `EVENTS` alone. **Same blind spot #151 hit counting a stock phrase over one table: a check on
  player-facing text must read every table that speaks it.** The gate now names both.
- Fen-Mother cut to two doors by the user, and ⚠ **he ruled the kill door is NOT evil** ("hunting a
  beast for its hide"), which is worth keeping: the glyph set has to survive the author disagreeing
  with it.

**The general lesson worth carrying to other surfaces: reading cost is part of a decision's
weight, and it was the half nobody was measuring.** [[grimtoll-clarity-pass]]'s #123 counted
DOORS; a two-door card written at 259 words still charged a heavy card's attention for a
light card's decision. Concept §5 rules 7-8 and the decisions log carry it; README §4 has it as a
tenth text rule beside [[grimtoll-text-style]]'s nine.
