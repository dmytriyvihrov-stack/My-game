# The XP benchmark - how the neighbours hand out levels, and where a Grimtoll experience system would sit

**Written 2026-08-17.** Third of the benchmarks, after
[COMBAT_BENCHMARK_2026-08-11.md](COMBAT_BENCHMARK_2026-08-11.md) (the fight) and
[TUTORIAL_BENCHMARK_2026-08-14.md](TUTORIAL_BENCHMARK_2026-08-14.md) (the teaching). This one is
about **growth**: what a character earns, how fast, from what, and who decides.

**Why it exists, in the user's words** (2026-08-17, verbatim, spelling kept):

> *"I want to explore idea of lvls. I think in my gane it would work better to give some
> expiriences, rather then 1 lvl per battle. I want my team to be able to grew strnger and give
> this stronfernes in 1st act already. I want 3-4 acts similar size. And characters to be able to
> get to 8-9 th lvls with battles, and extra events - items. I think around 9-10 lvls. Exp probably
> could be handled in smaller numbers, first lvl 100. I think, it could be also nice have 0 lvl,
> where character doesnt even have a class. So it gives option to a playr to oick himself. I think
> +-50% of expirience shared between party. And other for individual actions (damage deat and
> kills get). Also you will need it to add to charcter screen. First - just explore and see, how
> other similar projects deal with it"*

So the brief has eight parts, and this document checks each against the neighbours and against
the build: **(1)** XP instead of one level per battle · **(2)** growth felt inside act 1 ·
**(3)** 3-4 acts of similar size · **(4)** level 8-9 reached, cap 9-10 · **(5)** small numbers,
first level at 100 · **(6)** a level 0 with no class, the player picks · **(7)** about half shared,
half individual (damage, kills) · **(8)** on the character screen.

⚠ **This is a research document, not a decision.** Nothing here is built and no backlog number is
claimed. Part four ends in a first cut to argue with and a list of decisions that are the user's.

**Method and its limits.** Part one is read from official and fan wikis, developer posts and Steam
discussions, with the URL beside each number. Where a fetch was blocked and the figure comes from
memory it says so. Part two is **counted in this repository** and every figure has its anchor.
Fandom wikis refused direct fetches during the survey, so several Battle Brothers and Wartales
numbers came through a text proxy and should be spot-checked in game before anything is tuned
against them.

---

# PART ONE - what the neighbours do

## 1. The one table

| Game | Campaign | Cap | Reached | Earned by | Shared : individual | Class at start? | Catch-up for a late recruit |
|---|---|---|---|---|---|---|---|
| **Battle Brothers** | 60-100 h, 100+ days | 11 (+ veteran levels to 33) | 11 on the core | kills only, per enemy XP value | **80 : 20** (killer gets 20%, the rest split evenly over the combat party) | no classes at all, backgrounds | none by XP; military backgrounds are **hired pre-levelled** (Swordmaster 3-5) |
| **Wartales** | 60-100 h | 15 (companions 13) | 11-13 | end-of-combat award only, plus a camp training dummy; **kills and damage give nothing** | **100 : 0**, and fewer companions = more each | class fixed at recruit; specialisation at 2/3/5/8/10/12 | everyone present or not gets the share |
| **Wildermyth** | 5 chapters, 10-20 h | **7** | 6-7 founders, ~5 late recruits | 5 XP per monster card per mission, plot missions fixed | shared, split **only among heroes below cap** | picked at recruit | the below-cap filter is the catch-up |
| **Darkest Dungeon 1** | 40-60 h | resolve 6 | 5-6 on the A-team | quest completion only, by tier and length | same award to all four present | fixed | none; the roster is wide on purpose |
| **XCOM: Enemy Unknown** | 30-40 h | 7 ranks | Colonel on a handful | 30 per kill, 60 per mission to everyone (120 story) | roughly **60 mission : 30 per kill** | **Rookie, no class**; class assigned at first promotion (90 XP) | reward soldiers arrive one rank under your best |
| **XCOM 2** | 30-40 h, ~25 missions | 7 ranks | Colonel on 3-5 | kills, some XP to all present per kill | mostly individual, XP number hidden | **Rookie**; 1 kill = Squaddie with a class; GTS lets you **choose** the class for 5 days | GTS |
| **The Banner Saga** | 10-12 h | 5 (10, 15 in sequels) | 4-5 on the six | **kills only**, plus renown spent | **0 : 100** | fixed (Factions: rank 0 → pick at rank 1) | training tent kills count |
| **Fire Emblem** | 25-40 h | 20 per tier | varies | per action, formula scaled by level gap; staves pay | **0 : 100** | FE3H: everyone Commoner/Noble, exams at 5/10/20/30 | the formula itself: a low unit takes 100 from a boss |
| **Wesnoth** | 20-30 scenarios | unit level 3 | most 1-2 | 8 XP × level of the unit killed; ~1 for a fight | **0 : 100** | **level-0 units exist** (Peasant 23 XP to advance) | none |
| **Baldur's Gate 3** | 60-100 h | 12 | 12 in act 3 | kills, quests, locks, talk, discovery | **100 : 0**, undivided | chosen at creation | recruits arrive at party level |
| **Into the Breach** | 1-1.5 h | 2 pilot skills | 2 | 1 XP per Vek HP killed | individual | n/a | n/a |
| **FTL** | 1.5-2 h | 2 per skill | 2 in a few skills | the action itself (fly, fire, repair, fight) | individual per crew | n/a | n/a |
| **Urtuk** | 20-30 h | ~20 | | per action (first attack 20, heal 25, kill ×2) | individual + a big underdog top-up | fixed | 2+ levels under the party average = "tons of bonus XP" for being present |
| **King Arthur: Knight's Tale** | 40 h | 30 | | same base per mission (~150) to everyone | 100 : 0 with a **level-difference scaler** | fixed | higher level = less from the same mission |
| **Tactics Ogre Reborn** | 60 h | 50, gated by Union Level | | pooled, split among units **below the Union cap** | 100 : 0 with a hard filter | fixed | all XP funnels into the new body |

Sources: [BB Level and Experience](https://battlebrothers.fandom.com/wiki/Level_and_Experience) ·
[Wartales Level and Experience](https://wartales.fandom.com/wiki/Level_and_Experience) ·
[Wildermyth Hero](https://wildermyth.com/wiki/Hero) · [DD Resolve Level](https://darkestdungeon.wiki.gg/wiki/Resolve_Level) ·
[UFOpaedia Soldiers (EU2012)](https://www.ufopaedia.org/index.php/Soldiers_(EU2012)) ·
[XCOM 2 Soldier](https://xcom2.wiki.fextralife.com/Soldier) · [XCOM 2 GTS](https://strategywiki.org/wiki/XCOM_2/Guerrilla_Tactics_School) ·
[Banner Saga Leveling](https://bannersaga.fandom.com/wiki/Leveling) · [FE Experience](https://fireemblemwiki.org/wiki/Experience) ·
[Wesnoth BasicStrategy](https://wiki.wesnoth.org/BasicStrategy) · [BG3 XP](https://www.gamerguides.com/baldurs-gate-3/guide/gameplay/getting-started/experience-and-leveling-up-stat-gains-per-level-in-baldurs-gate-3) ·
[Into the Breach pilots](https://gamefaqs.gamespot.com/pc/205477-into-the-breach/faqs/76363/pilots) · [FTL crew skills](https://ftl.fandom.com/wiki/Crew_skills) ·
[Urtuk XP](https://steamcommunity.com/app/1181830/discussions/0/1749024519680746697/) · [King Arthur RPG elements](https://neocoregames.com/en/games/king-arthur-knights-tale/legend/this-builds-character-rpg-elements) ·
[Tactics Ogre union level](https://steamcommunity.com/app/1451090/discussions/0/6462188978481808367/)

**The clean rule that falls out of the table: the shorter the run, the lower the cap and the flatter
the curve.** Under two hours (Slay the Spire, Into the Breach, FTL) there are no levels or a two-step
ceiling. Ten to twenty hours (Wildermyth, Darkest Dungeon) sit at 6-7. Forty-hour campaigns sit at
11-15. Only the sixty-hour RPGs go exponential, and they pay for it with fully shared XP so nobody is
left behind. **The brief's 9-10 over 3-4 acts sits between Wildermyth and Battle Brothers, which is
where a 15-25 hour, 25-40 battle campaign belongs.**

## 2. The curves, with the real numbers

**Wildermyth** (cumulative, per class, [wiki](https://wildermyth.com/wiki/Level)) - the closest
structural neighbour: five chapters, cap 7, tiny numbers.

| Level | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|
| Warrior | 20 | 50 | 90 | 140 | 200 | 270 |
| Hunter | 30 | 76 | 138 | 216 | 310 | 420 |
| Mystic | 36 | 90 | 162 | 252 | 360 | 486 |

Warrior deltas 20/30/40/50/60/70: **a pure triangular curve, `10 × n`**, and the other two classes are
the same shape scaled ×1.55 and ×1.8. That is one shape doing three pacings, and it is the most
directly reusable table in this document.

**Battle Brothers** (cumulative, [wiki](https://battlebrothers.fandom.com/wiki/Level_and_Experience)):
200 · 500 · 1 000 · 2 000 · 3 500 · 5 000 · 7 000 · 9 000 · 12 000 · 15 000 for levels 2-11. Deltas
200/300/500/1000/1500/1500/2000/2000/3000/3000: doubles early, then a gentle staircase. Above 11 a
level costs `4000 + 1000 × (level − 11)`, gives no perk and only +1 to three stats: **a deliberately
dead tail so the cap feels like 11.**

**XCOM 2** (cumulative kill-equivalents, Rookie difficulty, [fextralife](https://xcom2.wiki.fextralife.com/Soldier)):
1 · 5 · 12 · 24 · 38 · 57 · 81. **The first step is one kill**, and that step is where the class lands.
XCOM EU in XP: 90 · 300 · 510 · 745 · 1100 · 1560 · 2150, near-linear +200-400 a rank.

**Darkest Dungeon** (cumulative resolve XP): 2 · 8 · 14 · 24 · 36 · 48. Award per quest: apprentice
1/2/3/4 (short/medium/long/boss), veteran 2/4/6/8, champion 4/8/12/16. **A ×2 per dungeon tier**, so
a hero must climb tiers to keep levelling.

**Fire Emblem**: **100 flat per level, every level**; all the pacing lives in the award formula (a
level-1 unit takes a full 100 from a boss, an over-levelled one gets the minimum). Three Houses is
the exception at `100 × 1.1^(level−1)`.

**Banner Saga 1**: renown 5/10/15/20 and kills 2/3/4/5 for ranks 2-5. Linear.

**Into the Breach**: 25 then 50 more, hard stop at 75. **FTL**: two levels a skill, same cost each,
piloting and engines 15 points a rank.

**Wartales** (per level, bar resets): 200 · 260 · 580 · 980 · 1440 · 1820 · 2080 · 2400 · 2640 ·
2940 · 3380 · 3840 for 1→2 up to 12→13. Steep early then +300-400 a level - against ~30-50 XP a
battle early and ~50 late, which is the grind complaint in numbers.

**Why each shape**

| Shape | Who | Reason |
|---|---|---|
| flat / linear | Fire Emblem, Banner Saga, FTL | every level is the same distance, the player can count; pacing moves into the award |
| triangular | Wildermyth | the gentlest slow-down; the cap lands at the finale, not before |
| geometric | BG3 early, DOS2 | early levels fly, late ones are events; wrong for a run that ends in 15 hours |
| hand table | Battle Brothers, XCOM, DD | a threshold placed against a specific act, mission or tier; XCOM's one-kill Squaddie and DD's ×2 a tier are decisions no formula makes |
| ceiling + dead tail | BB veterans, ItB's 75 | says "you are done growing" out loud |

## 3. Shared against individual - what actually happens

**Battle Brothers is the only cleanly documented split, and it is 80 : 20**: the killing blow earns
20% of that enemy's XP, the other 80% is split evenly over everyone who stood in the fight
([wiki](https://battlebrothers.fandom.com/wiki/Level_and_Experience)). Every other neighbour is at
an extreme: 100 : 0 (Wartales, BG3, DOS2, Pillars, Tactics Ogre) or 0 : 100 (Fire Emblem, Wesnoth,
Banner Saga, Mordheim). XCOM EU is roughly 60 mission : 30 a kill, so a soldier with two kills sits
near 50 : 50.

**⚑ The brief's 50 : 50 is therefore more individual than any split neighbour except XCOM.** That is
not wrong, but it is where the four documented failure modes live, in the order they recur:

1. **Kill-stealing and babying.** Banner Saga's own guide tells players to *skip turns so another
   character can land the kill* ([gamepressure](https://www.gamepressure.com/thebannersaga/ranks/z15d17));
   Wesnoth's wiki *recommends* concentrating kills on a few units; Fire Emblem's metagame is
   chipping to 1 HP for the favourite; XCOM hides the XP number precisely so nobody farms it (and a
   mod exists to un-hide it). ⛔ **The finishing blow, priced as a percentage, distorts the tactics
   it is meant to reward.**
2. **The support body starves.** If the individual half is damage and kills, whoever holds the line,
   commands, buffs or carries earns the shared half only. Fire Emblem's answer is to pay for the
   action itself (staff use gives EXP); Urtuk pays 25 for a heal and 40 for a regen. **Contribution
   is measured, not inferred from damage.**
3. **The late recruit is dead weight.** Battle Brothers (*"one level 11 brother = three level 1
   brothers"*, [Steam](https://steamcommunity.com/app/365360/discussions/0/4706830261930289323))
   and Wesnoth have the loudest threads and no catch-up; BG3, Wildermyth, Tactics Ogre and Urtuk
   have catch-up and essentially never generate the thread. The four working shapes: **exclude
   capped units from the pool** (Wildermyth, TO Reborn), **scale by level difference** (King
   Arthur, FE), **a flat underdog bonus** (Urtuk), **recruits arrive pre-levelled** (BB military
   backgrounds, XCOM council soldiers, BG3).
4. **The grind wall in the back half.** Wartales: ~50 XP a battle against 2 600-5 000 XP levels
   and XP barely scaling by enemy strength, so farming weak groups is optimal. Wildermyth's inverse
   complaint: cap 7 hits before chapter 5 and the top mods are cap raisers.

The mainstream compromise in design threads
([GameDev.net](https://gamedev.net/forums/topic/254147-party-based-rpg-experience-distribution/2536010/),
[RPG Maker forums](https://forums.rpgmakerweb.com/threads/party-exp-vs-individual-exp.90440/)) is
**contribution share**: a body that did 30% of the work takes 30% of the individual pool, with heals,
absorbed damage and control counted as work, and the killing blow a modest flat bonus rather than a
share. Under ten characters individual XP is defensible; over ten, share evenly including the bench.
**Grimtoll's 4-8 sits at the boundary, which is the argument for a hybrid.**

## 4. Level 0 and the deferred class

| Game | Starts as | Pick triggered by | Chosen or assigned |
|---|---|---|---|
| **XCOM EU / 2** | Rookie, no class, no perks | first promotion (90 XP; **1 kill** in XCOM 2) | random in EU; XCOM 2's GTS trains a Rookie into **the class you choose** in 5 days |
| **Banner Saga: Factions** | rank 0 base unit | 20 renown + 5 kills | player picks the promoted class and its ability |
| **Fire Emblem: Three Houses** | Commoner / Noble | level 5 + a seal, a certification exam that can fail | player |
| **Fire Emblem trainees** | Villager / Trainee | level 10 + seal | player picks a branch |
| **Final Fantasy Tactics** | Squire | job levels bought with JP per action | player, tree |
| **Wesnoth** | real level-0 units (Peasant, 23 XP) | the unit's XP number | player picks the advancement |
| **Symphony of War** | tier-1 Fighter/Bowman/Militia/Medic | class mastery (CP) + stats + resources | player |
| **Wildermyth** | farmer | **at recruit, no deferral** | player |
| **Battle Brothers** | a background, never a class | never | no class exists |
| **Wartales** | class fixed at recruit | specialisation at 2/3/5/8/10/12 | player picks a branch, not a class |

**The pattern: the pick is never free-floating.** It sits on the first promotion (XCOM, Factions),
on a threshold plus a token (FE3H's seal), or on a separate currency (JP, CP). The purpose is the
same each time: **keep the first one to three fights identity-free so the player commits after
seeing the body survive, then make the commitment feel earned.** And every game that defers the
pick makes the first step **cheap** - XCOM 2's is one kill, XCOM EU's 90 XP is ~4% of the ladder -
because a recruit without a kit is a recruit nobody wants to field for long.

## 5. XP from outside the battle

The brief asks for *"extra events - items"*. Precedents:

- **Expeditions: Rome**: raising a milestone in a region gives every companion a flat 50 XP; story
  missions carry the bulk ([wiki](https://expeditions-viking.fandom.com/wiki/Experience_points_(Rome))).
- **BG3**: locks, persuasion, discovery, story beats all pay; combat is optional. **Pillars of
  Eternity** pays *only* for objectives, explicitly *"to reward players who invest in Stealth and
  avoid combat"* ([wiki](https://pillarsofeternity.fandom.com/wiki/Experience_and_advancement)).
- **Battle Brothers**: no event XP, but paid multipliers - Training Hall +50% next battle, +35% next
  three, +20% next five; Potion of Knowledge +100% for three; a permanent +20% potion.
- **Wartales**: the training dummy at camp is passive XP, and by level 6-7 it is the main source,
  which is the tell that the battle award was too flat.
- **Wasteland 3**: skill checks pay only the body that made them - a clean model for *"the one who
  did the thing"* on an event door.
- **Grimtoll's own concept doc** already names the camp verb: *"Train - convert time into XP or a
  skill pick"* (`01_GAME_CONCEPT.md:1157`), unbuilt.

## 6. Where the screen says it

| Game | Level number | XP bar | Pending level-up |
|---|---|---|---|
| Battle Brothers | sheet header and roster row | thin bar under the level | **yellow arrow on the portrait**; players ask for it to flash because it is missed ([forum](https://battlebrothersgame.com/forums/topic/only-just-discoverd-this/)) |
| XCOM 2 | rank insignia + name, no number | **no bar, XP hidden** | PROMOTE tag in the barracks and after the mission |
| Darkest Dungeon | resolve pips on the card | small bar under the roster portrait *(memory)* | flourish on the Hamlet portrait *(memory)* |
| Wildermyth | horn title + number | on the hero card *(memory)* | none: the pick is an interstitial after the mission, blocking |
| Wartales | "Lv N" on the portrait | bar under the portrait | "!" on the portrait |
| Banner Saga | rank number on the portrait | **no bar; a kill counter in a skull box** | promotable in the tent |
| Fire Emblem | Lv + class on the panel, EXP 0-99 | number and an animated bar | none, immediate |
| BG3 | on the sheet and the tray *(memory)* | bar with current/next on hover *(memory)* | gold flare on the tray portrait |

Four things worth stealing: **(a) two-tier readout** - a compact level plus a thin bar on the
roster, the exact `340 / 500` only on the sheet; **(b) the pending badge lives on the portrait**,
never only on the sheet, and BB's is still called too subtle; **(c) badge the map too**, because BB
and Wartales both get "I missed the level-up" threads and neither marks the campaign layer well;
**(d) hiding the number is a legitimate tool** - XCOM hides it to kill farming, Banner Saga shows a
kill counter and got farming.

---

# PART TWO - what the build does today, counted

*(All anchors in `prototype/grimtoll_slice.html` at 2026-08-17; the file was being edited by another
session during the survey and line numbers drift, so the symbol names are the durable pointers.)*

- **There is no XP.** No field, no counter, no award. `grep -c '\bxp\b'` finds comments and an
  unrelated `exp` local in the AI scorer.
- **A level is one thing in one place**: `consequences()` in the aftermath does
  `const hero=pickOne(G.party); hero.level++;` after every won fight, alternating a perk point and a
  stat point (`nextIsPerk`), perk first. `pickOne` is unfiltered: a downed body can be the one
  promoted. No event, camp or shop grants a level.
- **The tree caps at 5.** `PERKTIERS=5`, eight perks a class in tiers 2/3/4/5, `perksLeft` converts
  an empty-tree perk level into a stat point. `p.level` itself is uncapped; level 6+ is a number with
  nothing behind it.
- **A stat level is +1 to one of `str/agi/int/mor`**, and everything else is derived from those four
  through `D{}` (`hp = 25 + str×3.5`, `hit = 48 + agi×1.2`, `dodge = 6 + agi`, `moral = 60 + mor×3`).
  One promotion is ~3.5 hitpoints or ~1.2 to hit. There is no growth table because the level system
  has no numbers of its own.
- **Class is stamped at creation and never changes.** `rollRecruit` picks from `CLS_BY_RACE`;
  `finishRecruit` stamps `level=1` on everyone. No classless body exists. Class supplies the
  signature act, the perk tree, the starting kit and the spell-school count; the weapon supplies the
  attack (concept §8: *"there is no separate class weapon rule"*), which is what would make a body
  without a class fieldable at all.
- **One act, six to nine fights, 18-22 days.** 25 map nodes: 6 `battle`, 10 `event`, 3 `camp`, 2
  towns, 2 musters, 1 shop, the Fen. Roughly six forced fights (tavern, clash, the choke, the Fen, the
  armour ambush, the Snare) and three the company can talk out of. Act 2 is parked by the user
  (2026-08-01). **So today a run hands out ~8 promotions across 4-8 people and the average body ends
  at level 2-3; the tier-4/5 perks are practically unreachable in one run.**
- **The receipt slot already exists and is hidden.** The aftermath crew card prints
  `☠ kills · ⚔ dealt · 🩸 taken · ✦ 0`, and `.abx{display:none}` carries the comment *"the XP slot
  exists on every card and is HIDDEN until XP exists (user: 'i will add it in the futrue')"*. Flip
  it and the layout is already right. `afterBattle()` already accumulates `killsMen`, `killsBeasts`,
  `hpLoss` and **`p.fights`**, the closest thing to an experience counter in the build.
- **The sheet already prints the level** as an `.ichip` (`LEVEL <b>N</b>`) in `#iChips`, and the
  green *N LEVELS TO SPEND* label sits exactly where a bar would go; `.bar` (7px, `--p` scale) is
  the shipped primitive, used three times in `.ibars`. The road bar's ★ chip (`levelsWaiting()`)
  already badges an unspent level and `goParty()` jumps to the debtor.
- **The save carries `G.party` verbatim**, so a new `p.xp` rides `gt_run_v4` with no stamp bump.
- **The canon this reverses**, `01_GAME_CONCEPT.md:1113`: *"Promotions, not XP bars. After each
  battle one random surviving character is promoted"* and *"Randomising who gets promoted is the
  point: you do not build the party you planned, you build the party you were given."* Also
  `:248-332`, the argument against Battle Brothers' numeric progression for *"a compact run, four
  to eight people, random promotions"*, and README §5's *"show a state, hide the number"*.

---

# PART THREE - what the neighbours mean for the brief, point by point

**(1) XP instead of one random level a battle.** Every neighbour with a company does it, and the
build's own comment says the slot is waiting. But be honest about what is being traded: the random
promotion was the design's answer to *"you build the party you were given"*, and merit-weighted XP
is the opposite instrument. **The doc has to be rewritten, not amended.** The thing that survives
is the perk/stat alternation and *"a reward never evaporates"*.

**(2) Growth in act 1.** Today ~8 levels over 4-8 bodies. With shared XP the same fights would put
**everyone** at level 3-4 by the Snare instead of a lucky two at 4 and the rest at 1-2, which is the
brief's ask exactly, and it needs no new content. Wildermyth's number for a five-chapter run is 1.2-1.5
levels a chapter; the brief's 8-9 over 3-4 acts is 2-3 an act, a little faster, well under XCOM's
rank every 2-3 missions.

**(3) 3-4 acts of similar size.** ⚠ **Only act 1 exists.** An XP curve to 9-10 is a curve for a
campaign that is three to four times the current build, and every level past ~4 is a promise about
content that is not authored: acts 2-4, their maps, their fights, and **enemy tiers that rise with
the company** (Darkest Dungeon's ×2 a tier; the Wartales complaint that scaling flattens the tiers is
the failure to avoid). This is the biggest thing the brief implies and it is not an XP problem.

**(4) Cap 9-10, reach 8-9.** Right for the length. Take BB's lesson and **make the last level cost a
lot and pay a little** (or stop, like ItB) so 8-9 is the honest expectation and 10 is the trophy.
Perk tiers today stop at 5: the tree either grows to 8 tiers or the levels above 5 pay stats and the
tree spaces its tiers out (2/4/6/8, say). Either is a build decision, not a research one.

**(5) Small numbers, first level 100.** Fine, and Fire Emblem's flat 100 shows the number can be
tiny and still carry a whole genre. The peers say two more things: **the first step must be cheap**
(XCOM: one kill; BB: 200 of 15 000) so a recruit is contributing within a fight, and a **triangular
table** (Wildermyth's `10n`) is the shape that lands the cap at the finale. Worked example, purely
to argue with: deltas 100 · 150 · 200 · 250 · 300 · 350 · 400 · 450 · 500 → cumulative to level 9 =
2 700, level 10 = 3 250. Over ~30 battles that is ~90 XP a battle a body on average, ~50 in the
tavern brawl and ~150 at the Fen. (A steeper 100 · 200 · ... · 900 lands level 9 at 4 500 and wants
~150 a battle; both are the same shape.)

**(6) Level 0, no class.** Strong precedent (XCOM, Factions, FE3H, Wesnoth's Peasant), and the
build's weapon-defines-the-attack rule makes a classless body fieldable. Three things the peers
insist on: the pick lands **on the first level and the first level is cheap** (one fight, two at
most); the pick is **chosen** (XCOM 2 built a whole facility to turn its random roll into a choice);
and the body needs **something to do at level 0** - in Grimtoll that is the weapon in hand and the
race, which is already most of what the sheet describes. ⚠ **The founding four are a problem for
this**: the tavern brawl teaches SPEAR WALL through Vesna's class and the prologue is written
around a Captain, a spearwoman, a warmage and an archer. The likely reading is that **level 0 is
for recruits** (Muster Field, Pell, the wedding guest) and the four arrive at level 1 as *"already a
company"*, which is exactly Battle Brothers hiring a Swordmaster at 3. That is a decision for the
user, below.

**(7) Half shared, half individual.** The peers say the shared half is right (nobody in the set with
a small named company goes 0 : 100 without generating a babying thread) and the individual half
needs three guards: **measure contribution, not just damage** (damage dealt AND taken AND the
class's own verb: a COMMAND, a spear wall held, a body carried); **price the killing blow flat and
small** (BB's 20% is the top of what reads as fair); and **exclude the capped and top up the
under-levelled** (Wildermyth's filter is one `if`). ⚑ And the pillar has a say: *"show a state, hide
the number"* argues for a bar and a `?`-free hover, not a `✦ +37` floating over every kill on the
field, which is the Banner-Saga-counter road to kill-farming.

**(8) The character screen.** Two-tier readout, per §6: a thin bar under `#iChips` on the sheet with
`340 / 500` on hover, the level in the roster row where `L{level}` already prints, and the pending
badge where the ★ already is (portrait row and road bar). The aftermath crew card's hidden ✦ is the
per-battle receipt, and an XP chip would join `EVFX_ROWS` for the event doors that pay it, built
beside `pay()` like every other chip (`.claude/rules/event-cards.md`).

---

# PART FOUR - a first cut to argue with, and the decisions that are the user's

**A first cut** (numbers to be replaced by measurement, shape to be argued):

- `p.xp` on the roster object; `XP_TABLE` cumulative, triangular, ten entries; level 0 is a body with
  a weapon and no `cls`, and reaching 100 opens the class pick on the sheet (the perks tab, which
  already knows how to offer a choice); the four founders start at level 1 with their classes.
- After a won fight: a **fight value** (sum of enemy values, the same table the LOOT rows key on) →
  half split evenly among everyone who stood in it and is below cap → half split by **contribution
  share** (damage dealt + damage taken + the class verb, kill = flat bonus) → an under-levelled body
  gets Urtuk's top-up. Printed on the ✦ slot of the crew card, level-up = the gold `.abcrew.up`
  frame that already exists.
- Event doors may pay `xp` in their `fx` (whole company, shared half only) and print it as a chip;
  the camp's *Train* verb pays it for a day; one or two items multiply it (BB's potions), never add
  a level directly.
- The sheet: bar + hover; roster `L{level}` unchanged; ★ unchanged.
- The tree: perk on odd levels, stat on even, tiers spaced 2/4/6/8 with two new tiers, or stats
  only past 5. Level 10 pays a stat and costs the most.

**Decisions only the user can make**

1. **Founders at 0 or at 1?** (Level 0 for recruits only is the reading that keeps the tavern brawl.)
2. **Is the random promotion really gone**, or does one *bonus* random promotion a battle survive
   as flavour on top of XP? (Two systems for one thing is the clarity pass's own enemy; the peers
   have none that do both.)
3. **How much of the number is shown**: bar only · bar + hover number · number on the field per kill.
4. **The individual half's ingredients**: damage + kills as briefed, or contribution share with the
   class verb counted. (The brief says damage and kills; the peers say that starves the Captain and
   the spearwoman.)
5. **What a level pays past 5**: a longer tree or stats only.
6. **Acts 2-4**: this curve is a promise about them. When does their content start, and does the
   enemy tier rise per act (the peers say it must)?

**✅ RULED THE SAME DAY, 2026-08-17** (verbatim, spelling his): *"1) founders in a tavern already
lvl 1 · 2) When you hire someone, 1 our of 3 has lvl 0 and a bit cheaper price. So you can choose
his class later · 3) random promotions goe · 4) On the battlfield none - it shows only after and then
in the inventory · 5) Not that sharp climb to hire lvl, I expect not that sharp power raise for
characters · 6) I think also intelect have a modifier to xp. Also i am thinking a bit different
amount needed for a rat (0.8) and human (1) and ogr (1.2) · 7) bar progression could be shown
circle as in total war"*. **The rules are written as backlog #174** (`archive/BACKLOG_ENTRY_SPECS.md`
§174) and the picture is `shots/174_xp_ring.html`; concept §8 is rewritten to match. Two of the six
calls stay open there: what the hand half counts (damage + kills as briefed, or contribution with
the class verb), and acts 2-4.

**✅ AND BUILT THE SAME DAY (8f.202)** on his *"sounds good - do it"*. The dial came out of the
harness, not this document: the worked example above said 2 XP a hitpoint and n=20 × eight fights
said that puts a six-body company's founders at **4.7** by the Snare; **1.5** shipped (~4.0 / ~4.6
for four). ⚑ **The peers' warning in §3 arrived on schedule**: on damage + kills the archer
finishes about a level ahead of the spearwoman over the act. Record: `CHANGELOG.md` 8f.202,
`WHAT_TO_TEST.md` #174, `shots/174_after.html`.

**Gaps in the survey, so nobody re-treads them**: Wesnoth per-unit XP-to-advance beyond two
examples; FTL thresholds beyond piloting/engines; DOS2 and Pathfinder tables; Symphony of War CP
thresholds; the UI rows marked *(memory)* in §6. Fandom refused direct fetches; Battle Brothers and
Wartales numbers came through a proxy and should be checked in game before tuning against them.
