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
- **Since 2026-08-31 all sixteen tables are DECLARED in one contiguous block** above `FOE_LEAN` /
  `FOE_T` / `FOE_BUILD`, and that block is the whole of the other side. The seven that used to sit
  where their plan function sits (`WED_T`, `CLASH_T`, `REINF_T`, `TAVERN_T`, `CHASE_T`, `HOLD_T`,
  `WARDEN`) moved there verbatim, on the user's second asking of #263's own question: *"could be
  good to group enemy data in the build - so it is grouped, rather then thrown through
  everething"*. ⚠ **Their COMMENTS did not move.** Each of the seven carried an essay about its
  FIGHT (the massacre brief on the wedding, the fiction on Blood on the Road, the teach script on
  the brawl, the lore on the Hold), and those belong above the plan function that reads them,
  which is where they still are. A one-line pointer stands at each old site.
  ⛑ **The move is `tools/dev/patches/foegroup.py`, and it is re-runnable and refuses a second
  run.** Its own scanner is the lesson: the first cut skipped strings but not COMMENTS, so an
  ordinary apostrophe in a comment opened a string that never closed and `HOLD_T` measured
  **107 KB instead of 1.9**. Only the balance guard stopped it being written.
- **`build()` is the one body-maker for that side** and `besideYou()` the one door onto yours. A
  statblock body given `side='you'` by hand silently keeps the other side's ease knob; that warning
  is on `besideYou` itself and it stays true.

## ⛔ #277 · ONE CREATURE, AUTHORED ONCE, AND A FIGHT NAMES ONLY WHAT DIFFERS

*(2026-08-31. The user: **"to merge same units (ogre club and ogr clan-hired). It is one unit in two
contexts. Same with smaller rats. I prefere to handmade specific characteristics in the specific
battle, rather then havin multiple entieties"**.)*

#263 put every statblock in one registry and #276 put them in one block. **Neither stopped the same
creature being written out three times.** A RATKIN SLINGER was authored in the snare, the clash AND
the sling-line; the clash's OGRE, CLUB and the snare's OGRE, CLAN-HIRED are the same animal wearing
two names; and the Hold hound's own comment had read *"Same lurcher the deserters run, better fed"*
since it was written.

⛑ **`FOE_BASE` IS THE CREATURE AND A FIGHT'S ROW SAYS `from:'<base>'` PLUS ONLY WHAT THAT FIGHT
TUNES.** Thirteen rows became **five bases and ten deltas**; the longest delta is five numbers and
the shortest is `{from:'lurcher',bare:true}`. The five are `ratspear`, `ratsling`, `ratsniffer`,
`ogreclub`, `lurcher`.

⛑ **`foeInherit()` EXPANDS THEM ONCE, AT DECLARATION TIME.** `build`, `LINT`, `devFoeCatalog`,
the foe dex and the oracle all go on seeing a complete row, so **not one reader had to learn what
`from:` is**. A resolver called from `build()` would have to be called from six places and would be
forgotten by the seventh.
⚠ **`acts` WINS WHOLE**, which is `t.st`'s own rule one field across: a fight that re-dices a
weapon restates the act, because a half-inherited act list would be a second author. **The bases are
chosen so exactly ONE member of each family has to** - the sling-line is the slinger's base and not
the Snare precisely because two of the three already agreed on 10-16.

⛔ **A FIELD YOU FORGET TO LIST SILENTLY TAKES THE BASE'S VALUE, AND THAT IS THE ONE FAILURE MODE
OF THE WHOLE SHAPE.** The clash's slinger dodges 20 and its new base dodges 22; the delta list left
`dodge` out, and a merge advertised as changing nothing moved one number on one body. **Nothing but
a field-by-field diff of both sides can see it.** The oracle caught it on the first run.
⛑ **SO: RUN THE ORACLE TWICE ON EACH BUILD, EVERY TIME A ROW HERE CHANGES.** `steading`,
`snarejoin`, `ashdrakes` and `glassroad` roll their own cast, so a single cross-build diff reports
four findings that are not there; the real finding is the cross-build diff MINUS whatever each build
disagrees with itself about.

⛑ **AND `LINT` 8k HOLDS THE OTHER END.** A base nobody inherits is a statblock the game cannot
field, and nothing in a run would ever say so - 8h's own finding (*a painted event no node can
deal*) arriving on the statblocks. `foeInherit` leaves `_from` on every row it expanded for the
check to read. **Proved by making it fire**: a scratch base reported *`"scratch" is in FOE_BASE and
no statblock inherits it`*, and removing it returned the linter to silence.
⚠ **The other direction is a THROW and not a finding**: a `from:` naming a base that does not
exist takes `foeInherit()` down at declaration time and the whole script with it, which is loud
enough.

⛔ **WHAT WAS DELIBERATELY NOT MERGED.** The steading's four ogres share the CLUB'S NAME and not
its kit - three of the eight ogre statblocks have SWEEP and five do not - so merging them is a
balance decision, not a refactor, and it is filed as **B19** rather than taken. The Bitch stays her
own creature: an aura and a crest is a different animal from a lurcher.
⚠ **The four dogs were merged without being named in the ask**, on the strength of the Hold
hound's own comment. One line each to back out.

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

⚡ **AND #275 MOVED WHAT BOTH DODGE COLUMNS ARE WORTH WITHOUT MOVING EITHER FIGURE**
*(2026-08-31, the user: "hard to stuck: -dodge after 25, -atack - after 100")*. `DODGE_SOFT` went
**12 to 25** and a `HIT_SOFT` of **100** was added beside it (`hitOf`, which is `dodgeOf`'s shape).
The authored numbers above are pre-cap and are unchanged; what changed is that at 12 the cap was
biting **every body on both sides** - your 14 and their 16.5 are both over it - so it was a flat tax
on the stat rather than a ceiling on stacking it. Effective dodge is now **+1 on a fresh body of
yours and about +2.5 on an ordinary foe**, which is the direction this table already says is
correct: the lighter side leads that column and now keeps more of its lead.
⛔ **IT IS NOT PRICED OVER THE ROAD MATRIX AND THAT IS THE USER'S OWN CALL**, given while the
sweep was running (*"maybe dont do it that pricacly with dodge cup through battles - it is your unit
stat"*). The BASELINE half was taken at n=15 over all 28 fight-comps before he said stop; the new
build's half was not. **So this is the one number in this file whose effect on the road is
unmeasured**, and if the road ever reads slower to kill through, it is the first place to look.

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
⚡ **AND #266 MOVED THE FIRST FIGURE THE NEXT DAY, WHICH IS THE TABLE ABOVE'S OWN INSTRUCTION
BEING OBEYED RATHER THAN A CONTRADICTION** *(2026-08-29)*. `GIVEN.nerve` 90 -> 100 adds exactly
10 to every body on your side and nothing at all to theirs, so **your six read 111.7 and the road
is unchanged**: the gap is **-43.1%** against the authored 63.6 and **-28.9%** against the 79.4
this knob makes of it. `probes/m266_gap.js` is that reading, and it re-derives the 101.7 exactly
on the pre-#266 build, which is what makes it the same measurement rather than a second one.
⚠ **ITS POPULATION IS THE 55-TEMPLATE ONE AND THE SCOPING IS LOAD-BEARING**: an unfiltered sweep
over `FOE_BUILD` puts the Fen-Mother's 300 and the Warden's 460 into the mean and reads 84 where
this reads 70.3, i.e. it answers a different question in the same words.
⚠ **AND #266 TOOK THE OPENING FRACTION DOWN IN THE SAME EDIT** (`START_NERVE` .78 -> .64), which
pulls the other way: a foe still carries the bigger pool this entry bought it and now walks on
with 64% of it rather than 78%. **The two were priced together** - `ARENA.match` n=15 a side over
14 fights x 2 comps, this build against main - and the road did not move. If *"a little bit
harder to break them"* ever stops reading true, `START_NERVE` is the number that eroded it and
`FOE_NERVE` is not.
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

## ⛔ #274 · A `range` ON A STATBLOCK BUYS TWO THINGS, AND ONE OF THEM HAS A FLOOR

*(2026-08-31. The user, of the lizard fights: **"on the other battle while they where able to move
and hit me - they where standing. They have amazing rang abilities to use it on me"**.)*

An act's `range` decides what it can reach. It ALSO decides, through `disposition`, whether the whole
side thinks of itself as a shooting line - and those are not the same question. #267 authored the
salamander's SPIT and the slag-hide's TONGUE at **three hexes** with `dmg` on both, which is correct
for what they do; it also made a warm-stones side count **four shooters against your two**, take the
hold stance, and stand at the far edge of the map for the entire fight, refusing to close on the
strength of a weapon that cannot touch anything they are refusing to close on.

⛑ **`outRanged` IS THE ONE PREDICATE AND `STANDOFF` IS 4.** A shot under four hexes is not a bow:
it does not buy a standoff, and the body carrying it is still a body in the line. Three readers, and
they must stay one predicate - `disposition` decides the stance, `rooted` holds a body to it, and the
cohesion weight in the movement scorer asks it from the other end. *A body counted INTO a stance has
to be held BY it* is #240's own note; this is its third customer.

⚡ **FOUR IS MEASURED, AND THE SWEEP IS THE THING TO RE-RUN.** Over every ranged damage act in
`FOE_BUILD` and a prepared six, 2026-08-31:

| | |
|---|---|
| **range 3** | the salamander's spit and the slag-hide's tongue. **Nothing else in the game.** |
| **range 5** | every bow, every sling, the Hold's crossbow |
| `arcane` | the three `warp` castings - **always a standoff whatever their range says** |

So the line moves the two lizards and leaves every shooting fight where it was. ⛔ **AUTHOR A
DAMAGE WEAPON AT RANGE 4 AND YOU HAVE MOVED SOMEBODY ACROSS THAT BOUNDARY**, in both directions:
re-run the sweep before believing the fight it is in.

⚠ **AND A BAND IS ONLY WORTH KEEPING WHILE THE WEAPON IT WAS MEASURED OFF CAN BE FIRED.**
`doctrine`'s `band` reads `bandFor(shotAct)`, and the slag-hide's tongue is `cool:1` - so on every
other turn the animal was parked at two hexes, one outside its own BITE, with nothing it could reach.
It asks `onCool` now and **not `canUse`**: `doctrine` is read AFTER the move has been paid for, so a
two-action weapon always answers *cannot afford* and every archer in the game would lose its band on
the one turn it walks. The cooldown is the fact about the NEXT turn, which is what a band is for.

⛑ **A BEAST ALSO KEEPS STATION ON THE HEAVIER BEASTS OF ITS OWN SIDE** (`herdBig`, `hpMax*1.4`),
which is the ogres' `herd` with the question asked of the BODY instead of the race. ⚠ **Scoped to
`race==='beast'` on purpose**: the dog and the Warden return their own doctrines above that line, the
mirehares never reach the movement scorer, and every ratkin/ogre/human fight in the census is
measured. A rule that read hitpoints across every race would re-price the sling-line.

⚡ **AND THE PRICE OF MAKING THEM FIGHT IS THAT THEY WIN MORE, WHICH IS THE THING TO LOOK AT
BEFORE TOUCHING A STATBLOCK.** `runFight` n=30 a cell against the previous build: ash-drakes /
prepared **93% -> 63%**, glass road / prepared **100% -> 83%**. Nothing in `LIZ_T` moved. The five
lizard fights were priced in #267 against an AI that stood still, so those figures describe a fight
nobody had played rather than a nerf.

## ⛔ THE THREAT PRICE IS ADVISORY, AND FIVE THINGS ABOUT IT WERE WRONG

*(2026-08-31, measured while building `tools/enemies.html`. The user: "you can double check enemy
threads points just in case".)*

`unitPts` (#216) is the one scale for a body, a piece of kit and a fight: a geometric mean of
offence and staying power, `sqrt(off * stay) * PTS_SCALE`. It prices the practice field's
easy/even/hard bands, the dev bench and the map's dev badge, and **it never touches a fight**. So
everything below is a readout being wrong, not a balance bug - which is exactly why nothing caught
it.

⚡ **THE ANCHOR SENTENCE IN ITS OWN COMMENT IS FALSE.** `PTS_SCALE` is documented as *"calibrated
so THE FOUR FOUNDERS SUM TO ~100"*. Measured on the shipped build the four founders sum to **37**,
because HDA_CUT took hitpoints, damage and armour 3.5x on BOTH sides and a geometric mean of two
things each cut 3.5x is cut 3.5x. ⛑ **The BANDS did not move**, because they are ratios of the
same net (`net*1.3` / `net` / `net*0.75`); only the absolute reading did. Filed as **B15**.

⛔ **A CONSTANT INSIDE A DERIVED FORMULA IS A SECOND AUTHOR, AND `26` IS ONE.** A caster's
damage-per-round is clamped `Math.max(dpr, 26*spellPow)`. Every damage die in the game was cut by
HDA_CUT; the 26 was not, so it now dominates all three casters in the build - measured raw dpr
**7 / 7 / 14** against a clamp of **26**. ⚠ It is also weighted by `mskill`, and an `arcane` act is
aimed with INTELLECT, so the one-word ogre - whose entire design is that he misses two working in
three - prices as the third-hardest body in the Snare. Filed as **B16**.

⚠ **AND IT READS SIX FIELDS, SO A CREATURE WHOSE THREAT IS A RULE PRICES AS ITS LEFTOVERS.**
It sees damage, hitpoints, armour, soak, dodge and rout. It does NOT see burning ground, `veiled`,
`bounce`, `pull`, being multi-hex, a mood attack, `guards`, or SPEED at all. The cinder salamander
prices at **4** on a bestiary line that says in so many words that its bite is not the point.
⛑ **The answer is to know it rather than to guess at it**: a price with a documented blind spot
is worth more than one that estimates unmodelled rules. Filed as **B17**.

⚡ **WHAT DID CHECK OUT.** The six fields it reads it reads correctly on all 62 bodies, and the
cooldown omission cost nothing: no body in the game has its highest-scoring act behind a `cool`.

## ⛑ AND ALL FIVE ARE FIXED, WITH EVERY NEW CONSTANT MEASURED OFF THE BUILD

*(2026-08-31, the user: "Can you recheck threat points?". `tools/dev/patches/ptsfix.py` is the
change, `tools/dev/probes/ptsprice.js` the before-and-after.)*

| | |
|---|---|
| `PTS_SCALE` **0.42 -> 1.275** | so `ARENA.COMPS.four()` reads **101**, which is the dial's own comment being obeyed |
| the flat `26` caster clamp | **gone.** An arcane act is scored off its real dice like every other act |
| `PTS_ARC_THROUGH` **1.35** | a working goes through the plates entirely, so it only has to chew the hitpoints. **Measured** as `(hp+.8*armour)/hp` on the two reference companies: 1.19 on the starting four, 1.53 on the prepared six |
| the aiming stat | **per ACT.** `D.arc(u)` weights an arcane act, `mskill` weights a swing |
| a cooled act | `(best + cool*bestFree)/(cool+1)`, which is arithmetic and not a discount |
| burning ground | `EMBER_HIT + BURN_TICK*BURN_TURNS`, **the game's own three constants**, on one body |
| `bounce` / `veiled` | staying x1.20 / x1.15: they buy turns, and they were worth nothing |

⛔ **1.275 IS NOT `0.42 * 100/37` AND THAT IS THE PART TO REMEMBER.** The other four fixes move
your own people too, so the dial has to be re-derived AFTER them: the flat 26 was making Marrow the
second most valuable body in the company, and without it the founders read 89 at 1.135. **Re-derive
it again the day any of the other four changes.**

⚡ **WHAT MOVED, PRICED AGAINST A `git show HEAD:` BASELINE, EVERY BODY AND EVERY FIGHT.** The
pure rescale is x3.04; anything off it is one of the five:

| | |
|---|---|
| the lurcher and the runt | **+15 to +21%** - `bounce`, which is their entire design |
| the one-word ogre | **-23%** - arc **41**, and the fight IS that he misses |
| both warp-sniffers | **-29%** - they were priced on a flat 26 and their working does 4-6 |
| every fight | **within 7% of the rescale except the pack (+15%) and snarejoin (+10%)**, which is the dogs in both cases |

⚠ **THE BANDS COULD NOT MOVE AND DID NOT**: `simBands` is ratios of the same net. What changed is
that an absolute reading now means something again.
⚠ **THE SALAMANDER IS STILL PRICED ON ITS BITE**, and that is the formula answering honestly
rather than the fix failing: with two actions, biting twice scores 9.0 against 8.25 for a spit plus
its ground. The ember term is in and it is correctly computed; on this creature it does not win.
⛑ **AND `LINT()`, the gates, the oracle and all twenty fights were re-run after it**, because a
readout change that breaks a fight is exactly the shape nobody would look for.

## The marks

The inspect card shows the four `STAT_ICON` paintings (32px - **never 24**, #230: a 3:4 resample
smears a pixel painting) for every body except `noFace`, with `tell()`'s band word on the hover.
**The mark is a claim about the rung and nothing else** - not a receipt, not a threat rating, and
it never carries a number, which is the show-a-state-hide-the-figure rule the mood row already
obeys. `noFace` is refused its marks because the Warden is a thing you cannot read.

## ⛑ The one table of every enemy: `tools/enemies.html`

*(2026-08-31. The user: "as independent tool create a file with all enemies ... Photo / Name /
Stats (all - from damage to hexes) / Race / Skills / Threat points / Typical party ...
Description".)*

**It is DERIVED and it is not part of the game.** `tools/dev/probes/foedex.js` runs every
`FOE_BUILD` builder through the dev bench's own seeded catalogue and dumps 62 bodies with the
figures `build()` actually makes of them; `tools/dev/probes/orphanart.js` asks each art table what
nothing can reach; `tools/dev/build_foedex.py` lays both out. A statblock change moves the file by
itself:

```bash
python tools/dev/gt.py launch
python tools/dev/gt.py eval tools/dev/probes/foedex.js    > foedex.raw
python tools/dev/gt.py eval tools/dev/probes/orphanart.js > orphan.raw
python tools/dev/build_foedex.py foedex.raw orphan.raw
```

⛔ **EDITS LIVE BESIDE THE ROW AND NEVER IN IT.** Every cell is editable and every edit is a
`{variant|name|field: value}` entry in the browser's own storage, exported on demand. An edit
written INTO the row would be lost the first time somebody regenerates, which is the one thing a
derived file must never cost anybody.

⚠ **A NAME IS NOT A KEY, AND THAT WAS A REAL DEFECT IN THE FIRST CUT.** A champion wears its
ordinary twin's name (Ash-drake 9 and 14, Hold corporal 9 and 13, Slag-hide 8 and 13), so grouping
a fight's cast by name folded two statblocks into one row and priced the whole cast off whichever
the sort happened to put first. The key is `name+pts`, the same one the bench uses.

⛑ **THE ONE AUTHORED FILE IN THE PIPELINE IS `tools/dev/foedex_desc.py`, AND IT IS AUTHORED
BECAUSE WHAT IT HOLDS DOES NOT EXIST IN THE BUILD** *(the user: "Make description short and clear
(one senctence), that they could be shown on hover in the battle screen")*. The derived fallback was
the bestiary `nature` line or the note on an act, and both are two or three sentences written for a
card read at rest. A battle hover is read in a second, over a body somebody is about to swing at, so
it gets ONE sentence saying what this thing DOES TO YOU. ⚠ **Keyed on the NAME and not the
variant**: two tables use `spear` for two different creatures, and no two creatures share a name. A
name with no row falls back to the derived line and the generator prints it, so a new statblock is
never described by an empty box.
⏳ **THEY ARE NOT WIRED INTO THE BATTLE SCREEN YET.** They are written to that spec and they live
in one dict; putting them on the hover is a separate edit.

⛑ **AND FOUR THINGS THE TABLE LEARNED BY BEING LOOKED AT** *(2026-08-31)*: the bodies are grouped
into **fourteen families** (`fam` is derived - a beast IS its bestiary row, everybody else belongs to
the fight that fields them - and the generator only gives those keys words); a **champion folds under
the body it is a better version of**, joined on the variant; the **cards that start each fight** are
read off `EVENTS`/`CAMPS` doors, never authored beside the statblock; and **MOVE and a champion's two
rolled perks are in the skills column**, because a list of acts was half of what a champion is.
⚠ **A base body can have MORE THAN ONE CHAMPION** - the perks are rolled, so Hold billman comes out
of the catalogue at 30 AND at 32 - and the first cut kept one of them: five champions in the data,
four toggles on the page. The join is a list.
⚠ **AND THE TABLE'S OWN HEADER CARRIED A TYPED FIGURE FOR ONE AFTERNOON** ("4 bodies / 37 pts"),
which `PTS_SCALE` invalidated the next morning. It reads `ARENA.COMPS.four()` now, which is the same
company the dial is calibrated against, so the two cannot come apart. **That is this file's own rule
arriving on the tool that reports it.**

⚡ **AND ITS ORPHAN HALF FOUND SIX PAINTINGS AND THREE STATBLOCKS NOTHING CAN REACH** - THE
DESERTER, SPEAR (cut from `brigands()` in a balance pass, statblock and painting both still there),
the FEN-THING and the BLOOM-SPITTER (statblocks, three paintings, a bestiary row, a map sight and
two wide stages, for a fight nobody wrote), and `ogre_you_guardian` / `ogre_you_maul`. ⛑ **All
of it was proved by DRIVING the thing that would use it** - the sprite cascade, the plan builders,
the two map tables - and three of the probe's first findings were its own blind spots: it filtered
weapons on a `slot` name `GEAR` does not use, built no body above level 1, and could not build
Asha. **A filter that matches nothing looks exactly like a finding.** Filed as **B18**.

## After a change here

```bash
python tools/dev/gt.py eval tools/dev/probes/foeoracle263.js    # 19 fields a body, both builds
python tools/dev/gt.py eval tools/dev/probes/statmark263.js     # the card, driven not read
python tools/dev/gt.py eval tools/dev/probes/matrix263.js       # the road, 6 fight-comps a call
python tools/dev/gt.py eval tools/dev/probes/champ265.js        # the champion + the nerve gap
```

- **The oracle** builds every `FOE_BUILD[k]()` side and compares 19 fields. 0 drift on a refactor;
  on a re-stat, exactly the drift the entry names.
  ⛔ **FOUR KINDS DRIFT AGAINST THEMSELVES AND THIS FILE ONLY EVER NAMED TWO.** `steading` rolls
  three of four ogres for its wall and `snarejoin` rolls its champion's perks; **`ashdrakes` and
  `glassroad` roll champions too** (measured 2026-08-31), and `steading` differs even SORTED
  because the roll picks a different three, not a different order. ⛑ **So the honest reading is
  the oracle run TWICE on each build**: whatever differs against itself is noise, and the finding
  is the cross-build diff MINUS that set. On the 2026-08-31 move that came out empty on all
  sixteen deterministic kinds, which is what proved it. A single cross-build diff would have
  reported four false findings.
- **`LINT()` builds every foe side itself** (the acts census), so a throw in the derivation fails
  loud there. It returns an OBJECT: read `.findings`, never `.length`.
- **Any change to a foe's numbers is priced with `ARENA.match`** over the road kinds, both comps,
  n>=15 a side, against a baseline build. n=6 cannot tell 0% from 20%. The tutorial brawl staying
  winnable for the starting four is part of the gate.
- ⚠ **`eyes.py` opens its CDP socket with `timeout=120` on the socket ITSELF**, so any single eval
  over two minutes dies on `recv` whatever `--timeout` says - and stacking timed-out evals wedges
  the page. That is why `matrix263.js` accumulates a few fight-comps a call. If the browser stops
  answering even a trivial probe, kill the headless chrome on its debug port and relaunch.
