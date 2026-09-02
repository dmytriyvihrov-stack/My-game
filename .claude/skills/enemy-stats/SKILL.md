---
name: enemy-stats
description: "Where an enemy statblock lives and how it climbs the same four ladders your people do: FOE_T and FOE_BUILD, FOE_BASE inheritance, the lean and rung derivation, the champion, the ranged standoff, the threat price, and the oracle that proves a foe change. Use whenever an enemy statblock is added, edited, moved or rebalanced, and whenever anything reads or writes a unit's st on the foe side."
---

# Enemy stats: one place, one ladder

Apply this rule whenever an enemy statblock is added, edited, moved or rebalanced, and whenever anything reads or writes a unit's `st` on the foe side.

> **The reasoning, the measurements and every user quote behind these rules are in
> [`docs/archive/rules-history/enemy-stats.md`](../../../docs/archive/rules-history/enemy-stats.md).**
> Read it when a rule looks arbitrary, when you are about to argue with one, or when you need the
> entry number. Nothing was cut, only moved: this file is the same rules with the story taken out.

## The one sentence

**An enemy is a template plus rungs on the same four ladders your people climb, every statblock lives in ONE registry, and a number a fight is decided by is derived from the rung, never authored twice.**

## Where an enemy lives *(#263, #276)*

- **`FOE_T{}` is the one home for statblocks**, keyed by fight, beside `FOE_BUILD` (the one dispatch table). A new fight adds a group to `FOE_T` and a row to `FOE_BUILD`. ⛔ **A `const T={}` inside a plan function is the scattered shape #263 deleted.**
- **All sixteen tables are DECLARED in one contiguous block** above `FOE_LEAN` / `FOE_T` / `FOE_BUILD`, and that block is the whole of the other side. The seven that used to sit beside their plan function (`WED_T`, `CLASH_T`, `REINF_T`, `TAVERN_T`, `CHASE_T`, `HOLD_T`, `WARDEN`) moved verbatim. ⚠ **Their COMMENTS did not move**: an essay about a FIGHT belongs above the plan function that reads it, and a one-line pointer stands at each old site. The move is `tools/dev/patches/foegroup.py`, re-runnable, and it refuses a second run.
- **`build()` is the one body-maker for that side**, `besideYou()` the one door onto yours. A statblock body given `side='you'` by hand silently keeps the other side's ease knob.

## ⛔ #277 · One creature, authored once; a fight names only what differs

⛑ **`FOE_BASE` is the creature; a fight's row says `from:'<base>'` plus only what that fight tunes.** The five bases: `ratspear`, `ratsling`, `ratsniffer`, `ogreclub`, `lurcher`.

⛑ **`foeInherit()` expands them once, at declaration time**, so `build`, `LINT`, `devFoeCatalog`, the foe dex and the oracle go on seeing a complete row and no reader learns what `from:` is. A resolver called from `build()` would be called from six places and forgotten by the seventh.

⚠ **`acts` WINS WHOLE** (`t.st`'s rule one field across): a fight that re-dices a weapon restates the act, or the list has two authors. The bases are chosen so exactly ONE member of each family has to.

⛔ **A FIELD YOU FORGET TO LIST SILENTLY TAKES THE BASE'S VALUE.** That is the one failure mode of the whole shape, and only a field-by-field diff of both sides can see it. ⛑ **So run the oracle TWICE on each build, every time a row here changes** (last section).

⛑ **`LINT` 8k holds the other end**: a base nobody inherits is a statblock the game cannot field. `foeInherit` leaves `_from` on every expanded row for it to read. ⚠ **The other direction is a THROW, not a finding**: a `from:` naming a base that does not exist takes `foeInherit()` down at declaration time and the script with it.

⛔ **NOT MERGED, DELIBERATELY.** The steading's four ogres share the club's NAME and not its kit (three of eight ogre statblocks have SWEEP), so merging them is a balance decision, not a refactor: filed **B19**. The Bitch stays her own creature: an aura and a crest is not a lurcher. ⚠ **The four dogs were merged without being named in the ask**; one line each to back out.

## The four stats on the other side

- **A foe's rung is `FOE_LEAN[race]` + the template's `lean:{}`**, clamped by `rungClamp`. The three people-races mirror `RACEMOD` exactly, so no second table can drift. A beast is quick, dim and unbothered; `unknown` leans nowhere until authored.
- **`t.st` wins WHOLE and does not merge.**
- **A `noTrim` boss skips the four derived numbers**, as it skips `TRIM` and `ARM`. Its rungs still reach every live channel and the card.
- **The live channels are SHARED and must stay shared**: `thews`, the mood `loss` and `low` rungs, the mood `climb`, `D.arc`. They read `heldOf(unit)` and do not know which side a unit is on. A stat effect added to one side's path instead of the shared function is the promise-versus-payment defect merged out six times.
- **The baked four** (`hp`, `mskill`, `dodgeBase`, `moraleMax`) are derived at `build()` off the rung, after champ and trim, and do NOT re-read it mid-fight.
- **Buffs and debuffs go through `stMod`, read by `statRung(u,k)`**, never by editing `u.st`. `u.st` is what the body IS; `stMod` is what the field is doing to it. `heldOf` reads `statRung`, so every live channel and mark follows a buff unwired. ⚠ The baked four do not: a buff moving to-hit or dodge applies its own delta the way gear does.
- ⚠ **`statRung`, NEVER `rungOf`.** `rungOf` is the battle's MOOD ladder; two ladders, one name is #102's wrong-unit bug, and it threw once.

## ⛔ The ladder is shared. The GIVENS are not.

Your people start from `GIVEN` and climb; an enemy starts from **its own statblock** and climbs the same rungs. Measured over the **55 ordinary templates** (no captain, no boss, no `noTrim`):

| | an ordinary foe | your people | the gap |
|---|---|---|---|
| hitpoints | 49.1 | 60 | **-18%** |
| to hit | 53.3 | 70 | **-16.7** |
| nerve | 62.7 | **100** | **-37.3** |
| dodge | 16.5 | 14 | +2.5 |

⛔ **RE-MEASURE THIS TABLE WHENEVER EITHER SIDE'S GIVENS MOVE.** ⚠ The 55-template scoping is load-bearing: an unfiltered `FOE_BUILD` sweep puts the Fen-Mother's 300 and the Warden's 460 into the mean and answers a different question in the same words.

Then `TRIM` takes another 10% of a non-boss body's hitpoints, `ARM` a quarter of its harness, and `HIT_EASE` tilts the roll a net +5 your way. **Dodge is the one column they lead, and that is correct**: they are lighter and worse armoured, and it is all a ratkin in rags has.

⛔ **There is no `FOE_GIVEN` and there must not be one.** One number behind 61 statblocks is a second author for figures hand-tuned per fight. A knob says what the two SIDES are worth against each other; a `FOE_GIVEN` stands in for 61 authored rows. The knobs that exist:

| | |
|---|---|
| `HIT_EASE` | the to-hit tilt *(#146)* |
| `FOE_NERVE` **1.25** | on the mood pool in `build()` *(#265)*. ⛔ **A MULTIPLIER, NOT A FLAT ADD**: authored pools run **24 to 120**, so a flat add is +67% on a wedding guest and +13% on a mirehare and deletes the shape the wedding deck is tuned around. The 62.7 above is still what templates AUTHOR. ⚠ The ladder is FRACTIONAL (`nerveFrac`), so HOW they break is unmoved; fights run a round or two longer because fewer end in a rout. ⛔ A `noTrim` boss is exempt |
| `DODGE_SOFT` **25** · `HIT_SOFT` **100** | *(#275)*, `hitOf` is `dodgeOf`'s shape. Authored dodge figures are pre-cap and unchanged. ⛔ **Not priced over the road matrix, at the user's own call**: the one number here whose road effect is unmeasured. If the road reads slower to kill through, look here first |
| `START_NERVE` **.64** | the opening fraction *(#266, from .78)*. If *"a little bit harder to break them"* stops reading true, this eroded it and `FOE_NERVE` did not |

## ⛔ #265 · A champion is a body four levels on

The `CHAMP` multipliers are still the BODY (half again meat, harness and swing, a tenth more skill). The same word on a plan row also buys what four levels buy on your roster:

- **Two perks, ROLLED**, from `RACEPERKS[race]` + `GENPERKS` at tier <= `CHAMP.level`: `perksAt` minus the class half a foe does not have.
- **One rung, DERIVED and never rolled**: a shooter is better quicker, a caster cleverer, everything that closes and swings better stronger. A rolled rung would put INTELLECT on a dog.
- ⚠ **The rung is written onto `u.st`**, so the marks show it unwired and every live channel pays it. It does NOT retro-derive the baked four: extra STRENGTH is felt in the swing, not the hitpoints, which is what `CHAMP.hp` is for.

⛔ **THIRTEEN OF THE 28 PERKS WOULD PAY A FOE NOTHING, AND THE ANSWER IS TO PAY THEM RATHER THAN BAN THEM.** They are read off `p.perks` inside `effStats`/`bodyHp`/`unitFrom`, the ROSTER path no foe takes, so handing one over prints a promise nothing pays. **`FOE_PERK_OK` is the list, `foePerks()` the foe's copy of those build-time lines.** ⚠ **Three are deliberately out**: DISENGAGE puts a new ACT on a body neither AI brain can spend one on (#224's greyed-act trap); SHIELDWORK and VERSATILE read GEAR a foe has no `eq` to hold. **A perk goes on the list when something pays it, not before.** ⚠ Rolled perks make `snarejoin` drift against ITSELF in the oracle.

⛔ **THE CENSUS A FOE CHANGE IS PRICED OVER IS `FOE_BUILD`, NOT THE ROAD.** The road list has no `snarejoin`, no `tavern`, no `chase`, which is how `snarejoin` went 30% -> 15% -> 0% unwatched. ⚠ **`snarejoin` is measured at n=20 or not measured** (same build reads 33% at n=15): the high-variance fight. ⚠ A tuning sweep that rebuilds its subject rebuilds ALL of it, `holdHost`'s `if(G.party.length>=6)` clause included.

## ⛔ #274 · A `range` buys two things, and one has a floor

`range` decides what an act reaches. It ALSO decides, through `disposition`, whether the side thinks of itself as a shooting line, and those are not the same question.

⛑ **`outRanged` IS THE ONE PREDICATE AND `STANDOFF` IS 4.** A shot under four hexes is not a bow: it buys no standoff, and the body carrying it is still a body in the line. **Three readers, and they must stay one predicate**: `disposition` decides the stance, `rooted` holds a body to it, the cohesion weight in the movement scorer asks from the other end. *A body counted INTO a stance has to be held BY it.*

| | |
|---|---|
| **range 3** | the salamander's spit and the slag-hide's tongue. **Nothing else in the game** |
| **range 5** | every bow, every sling, the Hold's crossbow |
| `arcane` | the three `warp` castings: **always a standoff whatever their range says** |

⛔ **AUTHOR A DAMAGE WEAPON AT RANGE 4 AND YOU HAVE MOVED SOMEBODY ACROSS THAT BOUNDARY**, both directions: re-run the sweep over every ranged damage act in `FOE_BUILD` before believing the fight it is in.

⚠ **`doctrine`'s `band` reads `bandFor(shotAct)` and asks `onCool`, NOT `canUse`.** `doctrine` is read AFTER the move is paid for, so a two-action weapon always answers *cannot afford* and every archer loses its band on the turn it walks. The cooldown is the fact about the NEXT turn, which is what a band is for.

⛑ **A beast keeps station on the heavier beasts of its own side** (`herdBig`, `hpMax*1.4`): the ogres' `herd` asked of the BODY instead of the race. ⚠ **Scoped to `race==='beast'` on purpose**: reading hitpoints across every race would re-price the sling-line.

⚡ **Making them fight makes them win more**: ash-drakes / prepared **93% -> 63%**, glass road / prepared **100% -> 83%**, nothing in `LIZ_T` moved. The five lizard fights were priced in #267 against an AI that stood still, so those figures describe a fight nobody had played.

## The threat price: `unitPts` is ADVISORY

`unitPts` (#216) is the one scale for a body, a piece of kit and a fight: `sqrt(off * stay) * PTS_SCALE`. It prices the practice field's easy/even/hard bands, the dev bench and the map's dev badge, and **it never touches a fight**. A wrong reading here is a readout bug, not a balance bug.

| | |
|---|---|
| `PTS_SCALE` **1.275** | so `ARENA.COMPS.four()` reads **101**, the dial's own comment |
| the caster clamp | **there is none.** An arcane act is scored off its real dice like any other. ⛔ A constant inside a derived formula is a second author |
| `PTS_ARC_THROUGH` **1.35** | a working goes through the plates, so it only chews hitpoints. Measured `(hp+.8*armour)/hp`: 1.19 starting four, 1.53 prepared six |
| the aiming stat | **per ACT.** `D.arc(u)` weights an arcane act, `mskill` a swing |
| a cooled act | `(best + cool*bestFree)/(cool+1)`: arithmetic, not a discount |
| burning ground | `EMBER_HIT + BURN_TICK*BURN_TURNS`, the game's own three constants |
| `bounce` / `veiled` | staying x1.20 / x1.15: they buy turns, and were worth nothing |

⛔ **1.275 IS NOT A PURE RESCALE OF THE OLD 0.42.** The other four fixes move your own people too, so the dial is re-derived AFTER them. **Re-derive it again the day any of the other four changes.** ⚠ The BANDS cannot move: `simBands` is ratios of the same net.

⚠ **IT READS SIX FIELDS, SO A CREATURE WHOSE THREAT IS A RULE PRICES AS ITS LEFTOVERS.** It sees damage, hitpoints, armour, soak, dodge and rout. It does NOT see `pull`, multi-hex, a mood attack, `guards`, or SPEED at all. The salamander is still priced on its bite, honestly: biting twice scores 9.0 against 8.25 for a spit plus its ground. ⛑ **Know the blind spot rather than guess at it**: a price with a documented blind spot beats one that estimates unmodelled rules. Filed **B17**.

## The marks

The inspect card shows the four `STAT_ICON` paintings (**32px, never 24**: a 3:4 resample smears a pixel painting, #230) for every body except `noFace`, with `tell()`'s band word on the hover. **The mark is a claim about the rung and nothing else**: not a receipt, not a threat rating, and it never carries a number. `noFace` is refused its marks because the Warden is a thing you cannot read.

## ⛑ The one table of every enemy: the ENEMIES tab of `tools/lab.html`

**It is DERIVED and it is not part of the game.** A statblock change moves the file by itself:

```bash
python tools/dev/gt.py launch
python tools/dev/gt.py eval tools/dev/probes/foedex.js    > foedex.raw
python tools/dev/gt.py eval tools/dev/probes/orphanart.js > orphan.raw
python tools/dev/build_foedex.py foedex.raw orphan.raw
```

⛔ **EDITS LIVE BESIDE THE ROW AND NEVER IN IT.** Every edit is a `{variant|name|field: value}` entry in the browser's own storage, exported on demand. An edit written INTO the row is lost the first time somebody regenerates, which is the one thing a derived file must never cost anybody.

⚠ **A NAME IS NOT A KEY**: a champion wears its ordinary twin's name, so grouping a cast by name folds two statblocks into one row. **The key is `name+pts`**, the bench's own. ⚠ **A base body can have MORE THAN ONE CHAMPION** (perks are rolled), so the join is a LIST.

⛑ **`tools/dev/foedex_desc.py` is the one AUTHORED file in the pipeline**, because what it holds does not exist in the build: ONE sentence saying what this thing DOES TO YOU, for a battle hover read in a second. ⚠ **Keyed on the NAME, not the variant**: two tables use `spear` for two different creatures, and no two creatures share a name. A name with no row falls back to the derived line, so a new statblock is never described by an empty box. ⏳ Not wired into the battle screen yet.

## After a change here

```bash
python tools/dev/gt.py eval tools/dev/probes/foeoracle263.js    # 19 fields a body, both builds
python tools/dev/gt.py eval tools/dev/probes/statmark263.js     # the card, driven not read
python tools/dev/gt.py eval tools/dev/probes/matrix263.js       # the road, 6 fight-comps a call
python tools/dev/gt.py eval tools/dev/probes/champ265.js        # the champion + the nerve gap
```

- **The oracle** builds every `FOE_BUILD[k]()` side and compares 19 fields. 0 drift on a refactor; on a re-stat, exactly the drift the entry names. ⛔ **FOUR KINDS DRIFT AGAINST THEMSELVES**: `steading` (rolls three of four ogres, so it differs even SORTED), `snarejoin`, `ashdrakes`, `glassroad` (all roll champions). ⛑ **So the honest reading is the oracle run TWICE on each build**: whatever differs against itself is noise, and the finding is the cross-build diff MINUS that set. A single cross-build diff reports four false findings.
- **`LINT()` builds every foe side itself** (the acts census), so a throw in the derivation fails loud there. It returns an OBJECT: read `.findings`, never `.length`.
- **Any change to a foe's numbers is priced with `ARENA.match`** over the road kinds, both comps, **n>=15 a side**, against a baseline build. n=6 cannot tell 0% from 20%. The tutorial brawl staying winnable for the starting four is part of the gate.
- ⚠ **`eyes.py` opens its CDP socket with `timeout=120` on the socket ITSELF**, so any single eval over two minutes dies on `recv` whatever `--timeout` says, and stacking timed-out evals wedges the page. That is why `matrix263.js` accumulates a few fight-comps a call. If the browser stops answering even a trivial probe, kill the headless chrome on its debug port and relaunch.
