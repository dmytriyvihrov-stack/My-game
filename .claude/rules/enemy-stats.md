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

⚡ **AND SINCE #265 THERE IS A SECOND SUCH KNOB, ON THE NERVE COLUMN ALONE: `FOE_NERVE`**
*(2026-08-28, the user: "i feel we need to add more morale for enemies, similar to us. So it is a
little bit harder to break them")*. It is **1.25**, applied to the mood pool in `build()`, and it
does not contradict the paragraph above: a knob is one number that says what the two SIDES are
worth against each other, which is exactly what `HIT_EASE` is; a `FOE_GIVEN` would be one number
standing in for 61 authored rows. **The table's 62.7 is still what the templates AUTHOR** - what
changed is what `build()` makes of it.

⛔ **IT IS A MULTIPLIER AND NOT A FLAT ADD, AND THE SPREAD IS WHY.** The authored pools run
**24 to 120**. A flat +16 is +67% on a wedding guest and +13% on a mirehare, so it would quietly
delete the one thing the wedding deck is tuned around - guests who break the moment it starts.
A multiplier keeps every fight's own shape and moves only the line between the sides.
⚡ **Measured both sides BUILT, 2026-08-28: your six average a 101.7 pool against the road's
63.6, which is -37.5%; at 1.25 the road reads 79.4, which is -21.9%.** Closer, and still the
lesser side, which is *"a little bit harder"* read exactly rather than *the same*.
⚠ **The ladder is FRACTIONAL** (`nerveFrac`), so a quarter more pool is a quarter more morale
damage before BREAKING and nothing about HOW they break has moved. ⚠ **Fights run a round or
two longer for it**, because fewer of them end in a rout - which is what broke the road matrix's
chunking twice in the entry that added it.
⛔ **A `noTrim` boss is exempt**, like every other derivation in this block.

## ⛔ #265 · A champion is a body four levels on

*(User, 2026-08-28: "For a champion - it could be 4 the lvl - so 2 random perks from that pool and
at least 1 stat up".)*

#245's rule is *a champion is one of these, but better*, carried by one word on a plan row. The
`CHAMP` multipliers are still the BODY (half again the meat, the harness and the swing, a tenth
more skill); the same word now also buys what four levels buy on your own roster, because
`levelUp` alternates a perk point and a stat point and level 4 is therefore two perks and two
stat points.

- **Two perks, ROLLED, from the body's own lanes** - `RACEPERKS[race]` + `GENPERKS` at tier
  <= `CHAMP.level`, which is `perksAt` minus the class half a foe does not have.
- **One rung, DERIVED and never rolled**, because which stat is the one thing on this body that is
  not a coin toss: a shooter is better quicker, a caster cleverer, and everything that closes and
  swings is better stronger. A rolled rung would put INTELLECT on a dog.
- ⚠ **The rung is written onto `u.st`**, so the four marks on the card show it with no extra
  wiring and every live channel pays it. It does NOT retro-derive the baked four - so a champion's
  extra STRENGTH is felt in its swing and not in its hitpoints, which is what `CHAMP.hp` is for.

⛔ **THIRTEEN OF THE 28 PERKS WOULD PAY A FOE NOTHING, AND THE ANSWER IS TO PAY THEM RATHER
THAN TO BAN THEM.** They are read off `p.perks` inside `effStats`/`bodyHp`/`unitFrom` - the ROSTER
path, which no foe takes - so handing one to a champion prints a promise nothing pays, which is the
defect #259's audit was run to delete. **`FOE_PERK_OK` is the list and `foePerks()` is the foe's
copy of those build-time lines.** Paying eight of them takes a human champion's pool from three
keys to five, which is the difference between every champion being the same and a champion that
can come up tanky, lucky or long-armed.
⚠ **Three are deliberately still out and the comment says why**: DISENGAGE would put a new ACT
on a body neither AI brain has been taught to spend one on (#224's greyed-act trap), and SHIELDWORK
and VERSATILE both read a piece of GEAR a foe has no `eq` to hold. **A perk goes on the list when
something pays it, and not before.**
⚠ **The perks are ROLLED, which the ask asks for**, so `snarejoin` now drifts against ITSELF in
the oracle the way `steading` already does. That is the probe's note, not a finding.

⛔ **AND THE FIGHT THAT FIELDS THEM IS NOT ON THE ROAD MATRIX'S LIST, WHICH IS HOW IT WENT TO
ZERO UNWATCHED.** `snarejoin` measured **0 wins in 20** after #263 and #265, on a fight
`holdHost`'s own table tunes to 40-53%: **30% before #263, 15% after it, 0% after #265**. Three
bills came out by that function's own documented dial (*"one bill is worth twenty-seven points of
win rate"*) and it reads 40% again. ⛑ **So the census a foe change is priced over is
`FOE_BUILD`, not the road** - the road list has no `snarejoin`, no `tavern` and no `chase`.
⚠ **It is measured at n=20 or it is not measured**: the same build reads 33% at n=15 and 55%
under a monkey-patched sweep. Its own note calls it the high-variance fight.
⚠ **A tuning sweep that rebuilds its subject has to rebuild ALL of it.** The first cut of that
sweep omitted `holdHost`'s `if(G.party.length>=6)` clause and measured a 15-body host against the
real 19, reporting 57% where the fight reads 0.

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
python tools/dev/gt.py eval tools/dev/probes/champ265.js        # the champion + the nerve gap
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
