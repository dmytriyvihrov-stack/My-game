# Enemy stats: one place, one ladder

Apply this rule whenever an enemy statblock is added, edited, moved or rebalanced, and whenever
anything reads or writes a unit's `st` on the foe side. It is the standing version of #263
(8f.288), which the user asked for in the same breath as the feature: *"if enemies stats and
behavior not together - I think it is a good idea to groop it in main build. So it is easier to
find - you can also add it as instruction."*

## The one sentence

**An enemy is a template plus rungs on the same four ladders your people climb, every statblock
lives in ONE registry, and a number a fight is decided by is derived from the rung, never authored
twice.**

## Where an enemy lives

- **`FOE_T{}` is the one home for statblocks**, keyed by fight, sitting beside `FOE_BUILD` (the one
  dispatch table). A new fight adds a group to `FOE_T` and a row to `FOE_BUILD`. ⛔ **A `const T={}`
  inside a plan function is the scattered shape #263 deleted** - it was fourteen tables in fourteen
  places, and *what does the other side look like* could not be answered without opening eight
  functions and knowing which eight.
- The six tables that already had module-level names (`WED_T`, `CLASH_T`, `REINF_T`, `TAVERN_T`,
  `CHASE_T`, `HOLD_T`) and `WARDEN` are **referenced** by `FOE_T`, not re-declared. There is still
  exactly one copy of each.
- **`build()` is the one body-maker for that side** and `besideYou()` the one door onto yours. A
  statblock body given `side='you'` by hand silently keeps the other side's ease knob; that warning
  is on `besideYou` itself and it stays true.

## The four stats on the other side

- **A foe's rung is `FOE_LEAN[race]` + the template's `lean:{}`**, clamped by `rungClamp` - the
  roster's *born + race + class + trait* said smaller. The three people-races mirror `RACEMOD`
  exactly, so a clan ratkin leans the way your ratkin do and there is no second table to drift. A
  beast is quick, dim and unbothered; `unknown` leans nowhere until authored.
- **`t.st` wins WHOLE and does not merge.** A hand-tuned boss says what it is, and a half-inherited
  lean underneath it would be a second author.
- **A `noTrim` boss skips the four derived numbers**, the same way it skips `TRIM` and `ARM`: a boss
  is tuned by hand or not at all. Its rungs still reach every live channel and the card.
- **The live channels already worked and must stay shared**: `thews`, the mood `loss` and `low`
  rungs, the mood `climb`, `D.arc`. They read `heldOf(unit)` and do not know which side the unit is
  on. A stat effect added to one side's path instead of the shared function is the
  promise-versus-payment defect this repo has merged out six times.
- **The baked four** (`hp`, `mskill`, `dodgeBase`, `moraleMax`) are derived at `build()` off the
  rung, after champ and trim, and do NOT re-read it mid-fight.
- **Buffs and debuffs go through `stMod`, read by `statRung(u,k)`**, never by editing `u.st`. `u.st`
  is what the body IS; `stMod` is what the field is doing to it. `heldOf` reads `statRung`, so every
  live channel and every mark follows a buff with no extra wiring. ⚠ The baked four do not follow
  it: a buff meant to move to-hit or dodge applies its own delta the way gear does.
- ⚠ **`statRung` and never `rungOf`.** `rungOf` is already the battle's MOOD ladder. Two ladders,
  two meanings, one name is #102's wrong-unit bug waiting in a stack trace, and it threw once.

## ⛔ The ladder is shared. The GIVENS are not.

*(User, 2026-08-28: "but of course, enemy have thier own basic stats, that could be a bit lover
then the party".)*

Your people start from `GIVEN` and climb. An enemy starts from **its own statblock** and climbs the
same rungs. A rung is worth the same to both sides; the two sides are not the same body.

**Measured over the 55 ordinary templates** (no captain, no boss, no `noTrim`), 2026-08-28:

| | an ordinary foe | your people | the gap |
|---|---|---|---|
| hitpoints | 49.1 | 60 | **-18%** |
| to hit | 53.3 | 70 | **-16.7** |
| nerve | 62.7 | **100** | **-37.3** |
| dodge | 16.5 | 14 | +2.5 |

⚡ **THE NERVE ROW MOVED ON 2026-08-29 (#266) AND THE FOE COLUMN DID NOT, WHICH IS THIS SECTION
WORKING RATHER THAN ROTTING.** `GIVEN.nerve` went 90 to 100 at the user's word (*"basic start is
100%"*); a foe's pool is `t.mor` off its own statblock and has never come through `GIVEN`, so the
gap widened by 10 points and nothing on the other side was touched. ⚠ **The widening is smaller
than it looks**, because `START_NERVE` came down .78 to .64 in the same edit and both sides open in
the same band as they always did. **Priced with `ARENA.match` n=15 a side over 14 fights x 2 comps:
starting four 56% -> 55%, prepared six 87% -> 86%**, and every cell that moved 20 points came back
identical at n=30 on both builds.
⛔ **RE-MEASURE THIS TABLE WHENEVER EITHER SIDE'S GIVENS MOVE.** A gap written down once is a claim
about a build, and this row was one edit away from being a wrong one.

...before `TRIM` takes another 10% of a non-boss body's hitpoints, `ARM` a quarter of its harness,
and `HIT_EASE` tilts the roll a net +5 your way. **Dodge is the one column they lead**, which is
correct: they are lighter and worse armoured, and it is all a ratkin in rags has.

⛔ **There is no `FOE_GIVEN` constant and there must not be one.** A single number behind 61
statblocks would be a second author for figures that are hand-tuned per fight, and each of those
tunings is somebody's measurement. ⚑ **The knob that does exist is `HIT_EASE`**, which is where
#146 put exactly this tilt.

## The marks

The inspect card shows the four `STAT_ICON` paintings (32px - **never 24**, #230: a 3:4 resample
smears a pixel painting) for every body except `noFace`, with `tell()`'s band word on the hover.
**The mark is a claim about the rung and nothing else** - not a receipt, not a threat rating, and
it never carries a number, which is the show-a-state-hide-the-figure rule the mood row already
obeys. `noFace` is refused its marks because the Warden is a thing you cannot read.

## After a change here

```bash
python tools/dev/gt.py eval tools/dev/probes/foeoracle263.js    # 19 fields a body, both builds
python tools/dev/gt.py eval tools/dev/probes/statmark263.js     # the card, driven not read
python tools/dev/gt.py eval tools/dev/probes/matrix263.js       # the road, 6 fight-comps a call
```

- **The oracle** builds every `FOE_BUILD[k]()` side and compares 19 fields. 0 drift on a refactor;
  on a re-stat, exactly the drift the entry names. ⚠ `steading` drifts against ITSELF - it rolls
  three of four ogres for its wall - so compare it sorted or skip it.
- **`LINT()` builds every foe side itself** (the acts census), so a throw in the derivation fails
  loud there. It returns an OBJECT: read `.findings`, never `.length`.
- **Any change to a foe's numbers is priced with `ARENA.match`** over the road kinds, both comps,
  n>=15 a side, against a baseline build. n=6 cannot tell 0% from 20%. The tutorial brawl staying
  winnable for the starting four is part of the gate.
- ⚠ **`eyes.py` opens its CDP socket with `timeout=120` on the socket ITSELF**, so any single eval
  over two minutes dies on `recv` whatever `--timeout` says - and stacking timed-out evals wedges
  the page. That is why `matrix263.js` accumulates a few fight-comps a call. If the browser stops
  answering even a trivial probe, kill the headless chrome on its debug port and relaunch.
