# The content layer

**Everything in this folder is content, not code.** It is written so you can rewrite, extend or
regenerate any of it without touching game logic — and so an AI can be pointed at one file and
told "make thirty more of these".

| File | What it holds |
|---|---|
| `01_names_and_personalities.md` | 10+ names **and** personalities per race |
| `02_events.md` | Every world-map event, tagged FIXED or FLOATING |
| `03_gear.md` | The whole gear catalogue |
| `04_art_prompts.md` | Picture prompts for events, characters and creatures |

Every new or rewritten art brief inherits one visual rule: **line before noise**. Build from a
readable silhouette, a clear gesture and connected colour masses. Add texture only when it follows
form and survives the final crop; reject random speckles, all-over scratches and uniform
micro-detail. Preserve deliberate abstraction so the player's imagination completes the subject.
The full reusable wording lives in `04_art_prompts.md`.

## How this reaches the game

The prototype (`prototype/grimtoll_slice.html`) is a **single self-contained file** — it has to
be, because the published build cannot load external files. So the content lives inside it, in
one clearly banner-marked region near the top of the `<script>`:

```
/* ══════════ CONTENT ══════════ */   ← everything editable lives between these
/* ══════════ END CONTENT ══════════ */
```

**This folder is the source of truth for authoring.** Write here first, then mirror into that
block. When the Godot port happens these files become real data files (JSON/resources) and the
duplication disappears.

## The two kinds of event

- **FIXED** — structural. The act needs them and they always appear in the same place:
  the monster fight, the recruitment field, the gear-handover, the final battle.
- **FLOATING** — flavour and economy. These are **shuffled and sampled each run**, so two runs
  down the same road are not the same run. Add as many as you like; more is strictly better.

## Current vocabulary — the resource names changed

The economy was reworked; the older entries in `02_events.md` still use the old names. **When you
write or rewrite, use these:**

| Say this | Not this | Why |
|---|---|---|
| **provisions** | food | It is no longer eaten per day. It is the good barrels — a proper meal for the mood, double rations for the wounded, and the road's hungry moments. Travel is paid in **crowns** (wages and keep, one number). |
| **salvage** | wood, iron | One pool. Nothing ever wanted wood but not iron. *(`wood`/`iron` still work as write-through aliases so old data keeps running — never use them in new content.)* |
| **party room** | charisma | It was never a social stat: it is how many bodies the wagon and the pay-chest carry. Ratkin 1, human 2, ogre 3. |
| **a scar** | a death | **Nobody on the roster dies in a fight.** They go down, get carried out, and come back worse. An event may injure (heals) or scar (permanent) — never kill one of the player's people. |

## Rules for writing a good event

1. **Name a real party member.** The engine substitutes actual company members via the token layer
   (`{ANY}` `{OGRE}` `{RATKIN}` `{MAGE}`…) — events that say "somebody" are weaker than events that
   name Bruht. **Never hardcode a name**: the player may never have recruited them.
2. **Cost stated as intent, not as a receipt.** *"he has no further use for either"* beats
   *"+38 crowns · morale −4"*. Guaranteed material prices a captain would know may show
   (*"Pay 45 crowns." "Two days."*); everything psychological or uncertain stays hidden.
3. **Consequence outlives the event.** Gear, an injury, a scar, a trinket, a person, a memory on
   somebody's sheet.
4. **No clear villains** — see `docs/03_WORLD_LORE.md` §5.

### The costing yardstick — "you cannot afford to be good to everyone"

This is the game's third pillar (full version in `docs/01_GAME_CONCEPT.md`). Every event is measured
against it:

5. **The good path must exist — and must never get you everything.** Never a scene whose only way
   forward is the ugly one. If there is no alternative, the player says *the game made me do it* and
   feels nothing. Give them the honest option and make it cost time, coin, a gem, or an opportunity.
6. **The greedy choice must actually pay.** *"Rob the beggar: +10 crowns, everyone hates you"* is an
   idiot button, not a temptation. What they seize should solve a problem they have **right now** —
   the wage bill, empty barrels, a recruit only available today.
7. **The kind choice must not secretly pay better.** No returned purse that belonged to a king. If
   virtue reliably out-earns sin the player just optimises virtue. Sometimes honesty simply costs
   money; sometimes the person you spared never appears again.
8. **Consequences are personal, never a meter.** One named person approves; another stops speaking to
   the Captain; a third decides the rules are off and helps themselves too.
9. **A deed changes future options, not a bar.** After a robbery a later choice can read *"We have
   done this before"* — easier for some of the company, harder for others. The robbed man may return
   as a beggar rather than an enemy.
10. **Camp incidents can CHAIN.** An incident fires once per run and its sequel is gated on the exact
    ruling the player made (`needs:{id,opt}`), reusing the same two people. A continuation beats a
    repeat: eight incidents that chain tell more stories than twenty that don't.
