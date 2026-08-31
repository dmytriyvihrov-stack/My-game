# Game Concept - "RabbleBound"

> **The name is settled (2026-08-18, #191): the game is RabbleBound.** It was chosen out of
> Grimtoll, The Crooked Company, Vagrant Banners and Mudcrown, and it is what every player-facing
> surface says now.
>
> ⛔ **The ISLAND is still called Grimtoll**, and that is deliberate rather than an oversight.
> [`03_WORLD_LORE.md`](03_WORLD_LORE.md) has it *"named twice in one word"* and the toll runs
> through the content - THE HANGED TOLL-MAN, the tolls, *"everything here charges for passage"*.
> A game called RabbleBound set on an island called Grimtoll is two names doing two jobs.

## 1. One-line pitch

**A dark medieval tactical roguelike where you lead a small ugly band of sellswords across a node-based world map - Slay the Spire's structure with Battle Brothers' combat, Wartales' progression, and Caves of Qud's strangeness.**

> **World lore lives in `docs/03_WORLD_LORE.md`, deliberately separate and deliberately soft.**
> One island; ratkin (clever, numerous, shoddy manufacture) and ogres (huge, slow, left alone)
> have contested it for centuries; humans arrived two generations ago on ships, overreached, and
> now survive by being the best farmers on the island and no threat to anyone. You are a human
> captain whose lord started a war he couldn't win - you got out with a purse, good armour and
> a head full of contacts. The game opens in a tavern.

## 2. Fantasy the player lives

You are not heroes, and you are not a mercenary company either *(the user's ruling, 2026-08-01: "heroes not merceneries, they just start with a contract. But rather forced together random crew")*. You are five (or fewer) scarred, crooked-toothed strangers who happened to be in the same tavern when a coin hit a table, walking a dying road under one contract through a pre-gunpowder world where magic is rare, feared, and usually bad news. The island calls you mercenaries; nobody in the crew has earned the professional courtesy of the word. Every run is one contract-season: survive it, get paid, and maybe, just maybe, one of you becomes a legend worth a song.

## 3. Design pillars (every decision checks against these)

1. **Compact battles, heavy decisions.** 6-12 player turns is the ideal length for a standard encounter - with a 4-7 character party each turn is fast, so this still feels much quicker than Battle Brothers' 12-man fights. Skirmishes can run shorter (~4-5 turns), bosses longer (~15), but if a routine fight drags past 12 turns, the encounter is misdesigned.
2. **The map is a story machine.** Nodes are not only fights - shrines, hermits, ruins, courts, quest chains that span the whole act.
3. **Characters are people, not stat blocks.** Faces, flaws, inventory you dress them with, and scars that stick. *(Their stats are never shown as numbers - see §"The four stats exist. The player never sees them as numbers.")*
4. **Low magic, high weirdness.** No fireballs from vendors. But a talking wound, a saint's fingerbone that hums, gills after the fen nearly kept you, a rat that follows you for three regions - yes.
5. **Runs end, the world remembers.** Metaprogression through the world's memory, not raw power inflation.
6. **You cannot afford to be good to everyone.** The economy is what makes a decent person do bad things for understandable reasons - and the honest path always exists, it just never gets you everything. **No karma meter; the company is the conscience.** *(Full rules in §"PILLAR: You cannot afford to be good to everyone" - this is the yardstick every event is costed against.)*

## 4. Setting & tone

- **Dark medieval, medium-low magic, pre-gunpowder.** Mud, rust, taxes, plague-carts. Think Battle Brothers' cynicism + Banner Saga's melancholy + a thin vein of Qud strangeness.
- **"Maybe we are the bad guys." (Helldivers 2 lens)** The game never says it. It arranges the evidence and lets the player convict themselves. The island calls you a mercenary company, and on the evidence it is right: you take coin to do violence, you rob pedlars when payday is short, you loot the dead who took the contract before you, and the broken men on the road are what *you* become after one bad winter. The rules for keeping this honest:
  - **No karma meter, no judgment UI.** The world reacts (morale, reputation, who trades with you) but the game itself never scores your soul.
  - **The other side is legible.** Ratkin beg for mercy in broken speech, deserters have a captain who still stands like one, the Fen-Mother is a mother. Every enemy gets one line that makes killing them a choice rather than a chore.
  - **Your own company is the conscience.** Vesna not speaking to you for two days *is* the moral system.
- **Dark humor, Qud-flavored.** The grimness is undercut by absurdity: a tax collector for a kingdom that fell 40 years ago, a shrine where pilgrims worship a very ordinary door, an ogre who insists he is a vegetarian between bites. Event text and NPC dialog carry most of the humor - deadpan, never wacky, the world plays it straight.
- **Humans are a bit ugly** - bad teeth, broken noses, lopsided faces. Beauty is suspicious here.
- **Magical creatures exist but are rare and wrong** - encountering one is an event, not an encounter table entry.
- **Other playable races** (v1 set, expandable):
  - **Humans** - baseline, most classes available.
  - **Ratkin** - small, cheap, fast, cowardly-brave in numbers.
  - **Ogres** - huge, expensive, slow, walls of meat.
  - (Later: hollow-men, marsh-born, etc.)
- **No race is an enemy race.** Every species has friendly and hostile factions - ratkin clans that trade with you and ratkin clans that swarm you, ogre mercenary camps and ogre raider warbands. The player learns to read *banners and camps*, not species. Party composition talks back to the world: your ratkin opens doors at one camp and gets you spat at in another.
- **Battlefield allegiance is a large colour mass, not a species cue.** Allies carry one clearly
  visible blue or teal garment layer; hostile people carry one rust or red layer. The marked layer
  may be a cloak, tabard, scarf, sash or coat panel and can differ by unit. Never encode allegiance
  only through a tiny badge, trim, outline or eye colour. Unique ununiformed beasts keep their
  natural colour and must read through silhouette and placement.

## 5. Core loop

```
Overworld node map (choose path)
   → Node event: battle / place / NPC / merchant / quest beat
      → Battle: tactical turn-based, small grid
         → Aftermath: loot, injuries, dialog choices (Slay-the-Spire-style post-fight events)
   → Camp/level-up between nodes
→ Act boss → next act (or death → metaprogression → new run)
```

### What the loop is really selling (design conversation, 2026-08-12)

The node diagram above is the plumbing. The loop the player actually lives is:

> **Choose → Fight → Suffer → Adapt → Choose.**

Or spelled out: DIRECTION (where am I taking these people) → SITUATION (what am I doing here) →
BATTLE (how do I get out of this) → CONSEQUENCE (what happened to us) → ADAPTATION (how do we
live with it now) → new DIRECTION. The interesting part of this game is the **Suffer → Adapt**
half, which none of the reference games own:

| Game | Core loop | What it rewards |
|---|---|---|
| Battle Brothers | contract → fight → loot → repair/recruit | an efficient, replaceable company |
| Wartales | explore → gather → craft → upgrade | opening up the world; lots of maintenance play |
| Urtuk | fight → mutate → build → harder fight | buildcraft: mutations as synergy pieces |
| **RabbleBound** | **choose → fight → suffer → adapt** | **a company you had to remake out of what happened to it** |

The axis runs world management → company management → character buildcraft → **character
consequences**. RabbleBound sits at the far end and must not drift left: adding Wartales-style
systems (professions, crafting, cooking, more resources) makes it a small poor Wartales. The
2026-08-10 playtest said the opposite is needed anyway.

> **The principle: do not give the player more things to manage. Give fewer things more
> consequences.** In Urtuk a mutation is a build choice; here it is the residue of a story.
> Not "−2 AGI, drink a potion" but "he lost the hand three fights ago, and he is still my best
> frontliner. What do I do with him now?" The player optimises a working company out of what
> went wrong, not an ideal build. That is also why the arithmetic stays hidden: the optimisation
> the game wants is narrative, not spreadsheet.

### The choice economy: a decision has a weight, and the road has a rhythm

The risk on a node map is not the number of events. It is **constant, uniform decision
density**: if every node asks for a considered choice, the player is clicking on autopilot
within the hour, and then the choices that matter get the autopilot too. **If everything is
important, nothing is.** The rules:

1. **Every event card carries one of three weights, and the road mixes them.**
   - **LIGHT, a pickup.** "A broken wain. Strip it for parts." One or two doors, no real
     tension, answered in two seconds. These are not failed events; they are the rhythm section,
     and roughly a third of the road should be them.
   - **MEDIUM, a look at the ledger.** Route picks, shops, rest-or-push. Answered by checking
     the company's state, ten seconds or so.
   - **HEAVY, a decision the player retells later.** A named person, a moral cost, no clean
     answer. Thirty seconds of sitting still. **These only work if they are rare**; the space
     between them is what makes them land.
2. **The route choice is already a decision.** Picking the cave over the village spent the
   player's judgement; a card behind the click that asks "enter / scout / camp / leave" asks the
   same question twice. The card a route leads to should mostly *happen*, not re-negotiate.
3. **The fight is the climax of a small chapter, not another node.** The shape to aim at:
   route pick → one or two quick nodes → the significant encounter → battle → consequences →
   a short management beat → new route pick.
4. **Two to four options is the right band; the count was never the problem.** A card fatigues
   through bookkeeping, not breadth: four doors that each read as an intent ("Intervene." /
   "Walk past." / "[RATKIN] I know him.") scan instantly, while two doors written as receipts
   (−20 crowns +5 morale vs +10 supplies −3 health) are accounting homework. This is §7's
   intent-not-receipt rule again, doing pacing work.
5. **Cut the door that is not a decision.** A duplicate of another door with different flavour,
   a "nothing happens" door with a fee on it, a second button onto the identical battle: each
   is a door the player must read and never needed. (The Thing in Armour going from three
   answers to one is the precedent; the 2026-08-12 #123 pass applied it road-wide.)
6. **The playtest measurement that decides all of this:** find the event at which the player
   stops reading options and starts clicking the first acceptable one. That event, not the
   event count, is where fatigue begins. If the first thirty minutes are deliberate and the
   second hour is autopilot, the fix is demoting cards to LIGHT, not deleting events.
7. **A card's LENGTH is part of its weight, and it is a measured number.** *(2026-08-13, the
   user: "reduce them 30-70% each... easier to read, eseier to make choices.")* A light card
   written at heavy length is a heavy card wearing a pickup's clothes: the player pays the
   reading cost of a decision and gets a two-second one. The road was cut a third on that
   argument, and the bands it now sits in are **LIGHT 45-90 words · MEDIUM 90-140 · HEAVY
   140-175**, counting the body and every outcome together. **175 is the ceiling for the whole
   road**, because the three heaviest cards in the game land there. ⚠ **A percentage is not the
   goal.** Four cards finished under the asked 30% because their remaining lines were
   load-bearing, and cutting to a quota costs the joke or the fact, which are the reasons the
   card exists.
8. **A card with one live door is a pickup, and a pickup may show what it gives.** The
   hide-the-score rule protects a decision; with one door there is no decision to protect, so
   hiding the outcome only costs a click to learn what the player had no say in. The coin is
   the shape: three lines, the loot on the card, one button. **A card with two or more doors
   still shows nothing before the pick.**

### The road's rhythm and the demo's shape (rulings, 2026-08-31)

*(Design conversation, 2026-08-31. Five rulings that extend the choice economy above; each was
argued against the shipped build's numbers before it was taken.)*

1. **The demo is all of Act 1 plus a tail of Act 2, never a longer Act 1.** Act 1 already runs
   1.5-2 hours against a 45-90 minute demo norm, and each of its eight fights teaches something
   different; a ninth would teach nothing. The tail is **2-4 nodes of the next region** - new
   ground visible on the map, one or two LIGHT/MEDIUM cards, a new enemy's silhouette - closed
   by the Act 1 stinger (backlog #28, which is exactly this). The player crosses the border,
   sees the world is bigger, and is cut off on the inhale. *20-30% of Act 2 in the demo* was
   weighed and rejected: Act 2 is parked as "deeper beats longer", so a third of it is months of
   content for a demo that would then end mid-rough instead of on the threshold. Nothing in the
   tail is throwaway - it becomes Act 2's real opening.

2. **The road's resting ratio is 1.5-2 events per fight.** Measured in minutes, not in counts: a
   fight is 5-10 minutes of tactics, a dieted event is 30-90 seconds of reading, so the band
   costs 2-4 minutes of story per fight and does not fatigue. It holds only while the rules
   above hold: a third of the road LIGHT, HEAVY rare and spaced, the chapter shape kept. On
   repeat runs the player skims, so **novelty at the second and third run comes from the
   floating deck and the gated doors, never from more fixed cards.**

3. **No second global text diet. The picture earns the cut, card by card.** The first diet's own
   finding stands: what survived it is load-bearing, and cutting to a quota costs the joke or
   the fact. As a card gains its wide 1672x941 master it is re-read once and loses only the
   sentences the painting now says (the place, who stands in it, the light) - the "prose and
   receipt never say the same thing" rule, with the painting as a third voice. New cards author
   to the lower half of their bands (LIGHT toward 45-60, MEDIUM toward 90-110).

4. **The map says the category; the painting stays.** #116 stands: sights are visible from the
   first minute. What an unvisited node gains is a small **category pip** beside it - derived
   from `fightAt` (sure / choice / none), never authored - so a new player plans routes by
   category while a veteran reads the paintings, and both channels stay honest. The armour
   ambush carries no node and stays a surprise; the fork card stays hearsay.

5. **Most fights ask nothing: 60-70% of non-boss battles open with no doors, by classification
   and not by quota.** The classification: **when they come at you, the fight simply starts; a
   door remains only where you choose to be the aggressor or to pass by.** On the shipped
   census that lands at ~6 of 9 non-boss fights forced (the tutorial, the Pack, the armour, the
   chase, the mirehares, the Sling-Line - the last one still an open call), which is the band
   asked for. The doors that stay are the ones that ARE the card: the Broken Men's "No.", the
   Steading-Line's three doors before the fourth (the hardest fight on the road; its doors are
   the survival valve), the wedding's massacre. Doors that only change how you ENTER one
   unavoidable fight (the tutorial's three, the armour's three) are a different species and stay
   on set-pieces. Two bills come with the ruling: **a forced fight must be winnable by the worst
   company that can legally reach it** (`ARENA.match`, n>=15, per flipped fight - a refusal door
   was hidden balance, and deleting it moves that balance into the tuning), and the refusal
   decision moves up to the route pick, which is what the category pip in ruling 4 exists for.

## 6. You, the Captain - and the party

**You are a character, not a cursor.** The player is the company's Captain: a unit on the battlefield who fights, bleeds, and can die, but who is marked as the leader everywhere - a banner crest on the sprite, a gold edge on the turn-order card, his own line in the roster. This gives the whole design a spine it was missing:

- **Being on the field makes leadership a risk.** The Captain's aura steadies everyone within three hexes and his COMMAND action pulls a wavering line back together - but to do either he has to be *near* the fighting, which is exactly where he can be killed. If he falls, the entire company takes a morale shock, not just the people who saw it.
- **He is the reason the world talks to you.** NPCs address the Captain. Contracts are made with him.
- **He is the source of Charisma** (below), so the roster is an expression of *him*, not of an abstract budget.

### Crew size is Charisma, not a muster budget

The old 100-point Muster budget was replaced: it was a number with no fiction behind it. **Charisma is the Captain's stat, and it is the only cap on how many people will follow you.** Each recruit costs Charisma by race:

| Race | Charisma | Wage a day |
|------|----------|-------------|
| Ratkin | 1 | 1 |
| Human | 2 | 2 |
| Ogre | 3 | 2 |

*(#152, 2026-08-14, two re-tunes by the user's order: the **Captain draws 1 a day whatever his
race** ("cost of main hero costs 1 in day / instead of 2") - the chest is his problem, the coin is
bookkeeping - and the **ogre is paid 2, a human's wage** ("And ogr a day 2 instead of 1"), which
ends the old one-crown joke: somebody finally told him what the humans get. This table had also
drifted: it said 3 while the build said 1.)*

**Target squad size: 4–8.** At Charisma 12 that is six mixed companions - or eight if you lean ratkin, or four if you collect ogres. Charisma grows slowly through the campaign, so "I can finally afford the ogre" stays a real moment.

### Wages - the soft pressure that pushes you toward bad decisions

The wage figures are **run up daily and paid every FOURTH day** - the PAYDAY. *(Re-ruled by #152,
2026-08-14, reversing the "erosion rather than payday shock" line that stood here. The user: "i
need payments for crew... once in 4-5 days +-. So it ads some pressure, but also you don't need
to calculate every day." The comparison that decided it: daily wages are Battle Brothers' and
Bannerlord's cadence, and both run campaigns hundreds of days long, where erosion has time to be
felt; a ~22-day run needs the Wartales shape, a dated bill the player can see coming.)*

How it lands on screen: the bill accrues silently, days × crowns/day, into one owed figure. The
**PAYDAY chip** on the road bar counts down to the due day and names the coming bill; on the day,
the chest opens **loudly** - the chip and the purse flash gold, the coin sound plays, the road
line says it - but never as a screen or a card ("Make payment laude... some local thing that
highlight that it was paid"). And because the money now lands at the payday, **the road cards and
labels stopped printing crown prices entirely** ("if we do so, we can delete crowns from each
road and crosroad decigion - which is good"): a road costs DAYS, a longer road runs up a bigger
bill, and the fork stays honest without a single ◉ on it.

Wages are deliberately **not punishing enough to lose a run on their own.** Their job is narrative pressure. When payday lands and the chest is short, the company doesn't mutiny - they take it quietly, morale drops, and *the options start looking different*. The pedlar alone on the ridge who was a trade opportunity last week is now one man with a cart. **Wages exist so that robbery becomes tempting**, and so that the player, not the game, is the one who decides what the company is.

## 7. Combat (Step 3 will detail this)

- Tactical turn-based on a **hexagonal** grid of **15×13 hexes**, Battle Brothers / Wildermyth scale - smaller and faster than XCOM. *(Grown 13×8 → 15×10 → 15×13. Each time for the same reason: more ground to cross and more rows to go round is what turns flanking, screening and the archer's sweet spot from geometry-nobody-had-room-for into actual decisions. Hexes shrink to keep the whole board on the stage - the CSS size, `HEXW/HEXH/HEXOFF` and `TOKEN` must always change together.)* Six-direction facing; flanking and encirclement are the core positional language. (See §14 for why hex.)
- **Facing, and the six arcs around a body.** Every unit looks somewhere. A **dark red arc** on the hex marks its *back* - the side to stand on - and while a move is selected, every reachable hex that would land in somebody's back arc is flagged. *(A direction wedge was tried alongside it and removed: two marks for one fact was clutter, and the arc is the one you act on.)* Where you stand relative to that gaze decides the attack:

  | Arc | Hexes | Effect |
  |---|---|---|
  | **Front** | the one it is looking at | nothing |
  | **Shoulder** | the two either side of front | +5 to hit |
  | **Flank** | the two either side of rear | +15 to hit, ×1.10 damage |
  | **Back** | the hex directly behind it | **+30 to hit, ×1.25 damage - backstab** |

  Units turn to face where they walked, then turn again toward the nearest threat at the end of a move - so nobody is ever caught staring at a wall by accident, and getting behind something takes deliberate footwork rather than luck. **This is the payoff of the hex decision**: six clean arcs, no diagonal ambiguity, and "flank step" becomes a real move you plan two turns ahead.

  It stacks with **surrounding**: every extra body already on a target adds its own bonus for everyone attacking it, so a pinned enemy gets rapidly easier to kill and the ratkin swarm's whole plan becomes legible.

- **Engagement, not zone-of-control.** The earlier ZoC rule (leaving forfeits your swing) was cut - it was invisible and punished you for a decision you'd already made. The replacement is physical and readable: **walk away from someone and they get a free swing at you. Spend an action on DISENGAGE and they don't.** Entering a fight costs nothing. So retreating is always *possible* and always *costs* - either blood or a third of your turn - and every unit carries DISENGAGE, which makes it a real tactical option rather than a penalty.
  - **Each enemy gets ONE parting swing, and not another until it has taken its own turn.** Without that cap, one move through a crowded line ate four free hits and movement stopped being something anyone could afford - which quietly deleted the positional game the hex grid exists for.
- **A bow is a bad weapon at both ends of its own range.** *(Playtest #3.)* Point blank (1 hex) is −40 on top of the −35 for shooting inside a scrum - an archer with someone in their face should not be shooting. At maximum range it is −18, one short of it −8. The sweet spot is 2–4 hexes, which is a position you have to *hold*, so screening the archer becomes the front line's actual job rather than a nice idea.
- **The cutter's signature is DISTRACT, not BACKSTAB.** *(Playtest #3 - the old one "works badly".)* BACKSTAB demanded he already be standing in the one hex where *everybody's* ordinary backstab works, so it added nothing the positional rules did not already do and was mostly unusable. DISTRACT costs **one action, deals no damage**, and turns the target to face *away* from him - its back is now open to him **and to everyone else in the line**. That makes the cutter a setup piece who creates openings for the company instead of a damage dealer who needs the company to create openings for him. (Great beasts cannot be fooled.) *Shadow-Step* now makes his own follow-up free.
- **Roles beyond swords.** The company fields an **archer** (range 6, heavily penalised at both ends of that range - so she must be screened *and* positioned, which is what makes the front line matter) and **two kinds of caster**.
- **The archer's signature is CRIPPLING SHOT, not AIMED SHOT.** Aimed Shot was "your normal attack but better for two actions" - a tax, not a signature. Crippling Shot costs **one** action, deals **half** damage, and takes the target's legs: **half movement and −10 dodge until it next acts.** It does not kill the thing running at your line; it stops the thing running at your line from arriving. A signature should change the shape of a fight, not the size of a number.
- **Two casting classes, because "the mage" was doing two incompatible jobs.**

| | Schools | Casting | Otherwise |
|---|---|---|---|
| **Battle-Mage** | 2 of 4 | one spell a turn | Decent stats, a short sword, padded jack. A mediocre swordsman who occasionally does something appalling - the low-magic setting written as a class |
| **Mage** | 3 of 4 | one at full strength, **plus a second at half** | Almost nothing. Bad with a blade, thin, slow. A glass cannon the line exists to keep alive |

  EMBER is a cantrip and never counts against the per-turn limit, so a caster too shaken for a real school always has *something* to do.
- **Range is part of the spell.** They used to all sit at 3–4, so distance never entered a casting decision. Now **BLIGHT-WIND reaches 6** (throw it into a press from somewhere safe), **UNPICK 5**, **WITHER 4**, and **IRON-OATH only 2** - the blessing has the shortest reach of all, so giving it means standing *in* the line. Where the caster has to stand is now the decision.
- **A caster carries a ladder, not one spell**, and the choice between them *is* the magic system:
  - **Ember** - 5 mood, cheap, mostly ignores armour, and never counts against the per-turn cap. Always available.
  - **Unpick** - 9 mood, no damage at all: strips 25 armour and 14 morale off one enemy. A setup spell that makes somebody else's turn better.
  - **Iron-Oath** - 12 mood, and range **2**, so giving it means standing in the line.
  - **Blight-Wind** - 14 mood, range **6**, crowd damage through armour.
  - **Wither** - 16 mood, ignores armour entirely. The one you save for.
- **Captains on both sides.** Enemy forces have a captain marked with a gold crest. Killing a captain deals a *much* larger morale shock to its whole side than an ordinary death - so "cut the head off" is a real strategy, and it is symmetrical: your Captain is the same target for them. ⚑ **#156 took the third action off them** *(user: "give only 2 everywhere")*: **every body on the field gets two, and the only exceptions are the two set-piece monsters that declare their own count** (the Thing in Armour 3, the Fen-Mother 5). A crest now means a morale shock and an aura, never a longer turn. Measured with ARENA at n=16 across the five captain fights: **53 wins of 80 before, 59 of 80 after**, almost all of it the Ruined Steading.
- **A boss does not out-damage you - it takes your line apart.** The Fen-Mother has **morale 260** (nothing routs her; a boss that can be worn down by mood is not a boss) and **THE SOUND SHE MAKES**: no damage at all, 2 actions, and everyone of yours within 4 hexes tests their own mood. Whoever fails drops below the rout line and runs for the edge. The check is against the morale you have *left*, so the second scream is far worse than the first - the fight itself has already softened everyone. The Captain gets a bonus to hold; anyone who cannot rout at all (*Stand Fast*, *Does not run*) takes the shock and stays, and the log calls that moment out, because it is exactly what those two things are for.
  - **And then her eye finds one of the strong.** After the scream, the **nearest of yours still standing is TRANSFIXED** - held by her gaze, feet planted, unable to move or disengage for a full turn (swinging and casting still work; it is the legs she takes). The scream punishes the shaken and the eye punishes the brave, so there is no formation answer that dodges both: standing your ground against her is exactly how you get picked. A 👁 badge sits on the pinned unit so the field keeps saying it.
- **Great beasts occupy more than one hex.** The Fen-Mother is a lindwurm: head and body on two hexes, the body following the head as she moves, reach 2 on the skull, a tail-lash around the whole of her. Her cub **circles at three hexes and will not engage** while she stands - wound it or kill her and it stops being shy. Multi-hex monsters + behaviour states (skittish → enraged) are now a proven pattern for every future beast.
- **Two ways out of any fight you don't want:** AUTO (the company fights itself, competently but not cleverly - toggle it back off any time) and WITHDRAW - **available almost everywhere, and priced by what you are leaving.** The downed are carried out and take a scar for it (*"you go back for people. It is slower, it costs you the field, and it is the only rule this company has."*), and the cost scales: walking out on four deserters is −14 mood and they do not chase; walking out on the Fen-Mother is −30 and two days, *because you have to come back this way and everyone beside you has worked that out*. **Only two fights refuse**: the Snare (bells behind you) and the camp ambush (surrounded inside your own wall in the dark) - and they **say so on the button**, which reads ~~NO WAY OUT~~ struck through rather than sitting there greyed and live-looking.
  - **Withdrawing resolves the node.** It used to leave the place live, so the player paid the whole price - no spoils, −20 mood - and was then handed the identical decision again with nothing changed. Paying twice for one retreat is not a hard choice, it is a broken one. You went round it; whatever was back there stays back there.
- **Broken units raise a white flag** and run for the edge. If every surviving enemy has broken, the battle stops and **they beg for mercy** - and the player chooses whether to let them go, strip them, or finish it. That choice is a character statement with real loot attached, and it is where the company's reputation is actually written.
  - **Only people beg** *(2026-08-02)*. A beast breaks and scatters and the fight simply ends on the win: there is no plea, no prisoners and no question. It is read off the body rather than off the fight, so the dog pack, the Fen-Mother and the Thing in Armour are all silent without any of them being named, and anything monstrous added later is silent for free. **And the plea is spoken by whoever is actually kneeling**: the fen-ratkin, a deserter who is somebody's son, an ogre who has simply sat down. One paragraph written for the fen was being read over all three.
- **Enemy AI targets the weak throat**: it ranks targets by softness and threat, so archers and the mage get hunted first, wounded and wavering units get finished, and the Captain is a priority. Standing your ogre in front of your mage is a decision the AI will punish you for skipping.
- **The AI spends its turns the way a veteran does** *(playtest #4 - modelled on what people actually praise in Battle Brothers' AI)*:
  - **Expected damage, not biggest dice.** Every attack-and-target pair in reach is scored by hit-chance × average damage × the arc it lands through, with a 1.6× bonus when the blow would likely finish the target. Under ~15% to hit, a unit that can still move **repositions for a better arc instead of swinging at air** - the 5% haymaker the player gets to laugh at is gone.
  - **It walks into your flanks on purpose.** Movement scoring pays real bonuses for ending in a target's BACK (+16) or FLANK (+9) arc, and for joining a fight its own side has already started (+5 per body already on the target, up to two) - which also means ratkin complete their own Swarm rings without being told to.
  - **Shooters kite.** A shooter with somebody two hexes away shoots first, then spends its spare action opening the ground back up - the skirmisher loop that makes Battle Brothers' goblin fights what they are.
  - **The hurt pull back.** Under a third of hitpoints, shaken, unengaged and with no swing to make, a unit steps out of the line and becomes a problem for later instead of a kill for now. Feeding wounded bodies forward one at a time is what bad AI does.
  - **Captains do not lead the charge in person.** An enemy captain always carries a cohesion weight, so it arrives with its line, not ahead of it.
- **The AI fights as a side, not as a crowd of individuals.** *(Playtest #3 - "one ratkin in front will almost certainly die, circled by enemies. Make AI smarter.")* Each side re-reads the field once a round and forms a **disposition**:
  - **Cohesion.** A unit that has run ahead of its own line takes a growing penalty for hexes further from that line's centre, so the fast ones wait for the slow ones instead of arriving alone and being surrounded. Melee units care about this; shooters do not, because their job is to be somewhere else.
  - **The shooting line.** A side with **real ranged strength and an edge in it will refuse the melee entirely** - it holds its ground, keeps shooting, and makes *you* cross the open field into its arrows. Which is what anybody with bows and no particular hurry would do. Bring your own archers or accept the walk.

### The four stats exist. The player never sees them as numbers.

**"Very strong. Clumsy. Slow-witted. Fairly brave."** *(User's call, and the reasoning is theirs:
fewer hard numbers, less min-maxing, more focus on the person, the race and the kit.)* STR / AGI /
INT / MOR still drive every calculation - they just stop being printed.

Showing them as integers pulls this game back toward Battle Brothers. **Battle Brothers earns
that:** a long campaign, dozens of candidates, big companies, many levels, exact thresholds, and
the deliberate pleasure of hunting the perfect brother. Personnel selection *is* part of that game.
This one is a compact run, four to eight people, **random** promotions, and its interesting
decisions all live in positioning, personality, race and strange equipment. Precise base numbers
here don't add depth in proportion to the attention they demand - they make a **false promise**
that the game is solved by finding ideal rolls.

So a person reads as:

```
Bruht "Ate-The-Cart" — ogre, brute
  BUILD   Very strong
  HANDS   Clumsy
  WITS    Slow-witted
  MOOD   Fairly brave
  Kind — steadies everyone nearby, including them.

  WARCLUB  24–31
  ARMOUR   68
  STEP     2 hex
  SPIRIT   Fairly brave
```

**The numbers that stay numbers are the ones that are a decision on the field** - what the swing
does, what the armour stops, how far the legs go. Everything else folds away under **THE
ARITHMETIC** for anybody who wants it.

Four places carry the words: the character sheet, the battle panel, the hover readout, and - most
importantly - **the Muster Field**, where hiring used to be four integers per candidate laid side by
side. That is a spreadsheet comparison, not meeting somebody.

**The promotion screen is the one place a stat is genuinely a choice**, so it keeps a full
explanation - but phrased as a change in the person (*"GETS STRONGER"*), and it always names what
it is moving them toward (`Strong enough → Strong`, or `Strong enough · closer to Strong`) so no
option ever reads as "nothing happens".

### How the references handle stats - and what RabbleBound takes from each

Four different answers to "does the player see the numbers", and where we land:

**1. Battle Brothers / Wartales / Caves of Qud - optimisation IS the game.** BB says openly:
here's a candidate, here are his exact stats and talents, decide if he's worth the money. The fun
is spotting the good roll, firing the bad one, not wasting armour on a dud. People become memorable
*despite* the table, by surviving improbable things - but they are first evaluated as investments.
That fits a 40-hour campaign with a 12–20 roster. **For RabbleBound it's dangerous: with 4–8 people, a
bad starting roll doesn't read as a personnel decision - it reads as a ruined character.** Qud's
lesson for us is its strange items and systemic interactions, not its character sheet.

**2. Banner Saga / Wildermyth - few base values, exact action results.** Banner Saga has ~5 combat
numbers and each answers one concrete question (how much I take, how much I deal, what I break).
It removes optimisation *of the person* while keeping the tactical decision precise: "this attack
deals 5." Wildermyth goes further - a character is remembered as *"the cowardly poet who lost an
arm, became half-wolf and fell in love with the mystic"*, not as "hunter with good dodge" - yet at
the moment of attack the game still shows exact chances. **This is the target: the person is
described in words, the action in numbers.** You don't need to know her internal agility; you need
to know she is clumsy, and that right now her chance to hit is 61%.

**3. RimWorld - deep numbers exist, the game never makes you stare at them.** Skills 0–20 are
there, but a colonist can't be reduced to them: passions, traits, missing organs, moods,
relationships, work refusals. Crucially, **you don't hand-allocate points - skills grow from what
the person actually does**, so a colonist feels like somebody you work around ("great doctor,
faints at blood") rather than a build. Take from it: deep info available to the curious, no
mandatory micro-allocation, growth through what happened, and quality combinations that can't be
sorted into good and bad - that's where the stories come from.

**4. Slay the Spire - no base stats at all.** No strength, no accuracy, no levels. Everything is
cards, relics, current HP. The player optimises the set of available actions, not the person.
Lesson: **if a parameter doesn't create an interesting decision of its own, it doesn't have to be
shown - maybe doesn't have to exist as a separate system.** RabbleBound's kit, skills, personalities,
races and positioning already make enough combinations; visible STR/AGI/INT/MOR was a fifth layer
on top of four that already work.

**The hybrid:** Wildermyth for how to present a person · Banner Saga for how to present a fight ·
RimWorld for unexpected combinations · Slay the Spire for ruthlessly deleting the spare layer. Not
Battle Brothers for recruit stats.

**One guard-rail (ours, not the references'):** the words must have teeth. If one person is
"strong" and another "very strong", the player must *feel* it - 18–24 against 23–31, or a weapon
one of them can barely lift. Words without a visible mechanical difference are decoration, and the
player will conclude that personality beats stats only in the text.

> **The rule in one line: qualities in words · equipment in simple numbers · action results exact
> · internal formulas hidden.**

### PILLAR: You cannot afford to be good to everyone

*(User's observation about their own economy, promoted to a pillar - it connects the money, the
hiring, the personalities, the events and the settlements into one machine.)*

**The economy is why a normal person does bad things for understandable reasons.** You don't rob
the pedlar because you picked the evil route. You rob him because Gudd can only be hired *now*,
seven wages fall due tomorrow, Vesna has no armour, there are 23 crowns in the chest - and the
pedlar really is alone. And the game never answers with `−10 karma`. It answers with the company
going quiet, the Kind one avoiding the Captain, the Light-fingered one finding it all very
sensible, and - later - somebody on the road who knew him.

**The rules that keep it honest:**

1. **The good path must exist - and must not get you everything.** Never "to hire, you must
   murder"; if there's no alternative, the player says *the game made me do it* and feels nothing.
   There is always another way: sell the gem meant for the village, take the dangerous contract,
   walk the long road, skip the healing, do without the ogre. The robbery has to be *chosen* over
   those. A player can stay almost a saint - with a smaller company, worse kit, more risk, and
   maybe a grave that honesty dug. *Was it right not to rob the apothecary, if that is why your
   man died?*
2. **No universal optimal route.** The failure mode of other games: play well enough and you save
   everyone, loot everything, keep max reputation, get the best ending - morality exists only in
   the text. RabbleBound runs several **incompatible kinds of success** (keep your people · keep your
   conscience · get rich · build the settlement · field a strong company · fulfil the contract ·
   bank the future), and one run cannot have them all. **Design rule: every act must make the
   player leave at least one important thing on the road** - wealth, a principle, an opportunity,
   a friendship, a building, a person.
3. **Bad deeds must actually pay.** "Steal from the beggar: +10 gold, everyone hates you" is not
   temptation, it is an idiot button. The wain you seize is food to the act's end, a recruit's
   wage, and no dangerous road. Real price, real relief.
4. **Good deeds must not secretly pay better.** No returned purse that turns out to belong to a
   king. If virtue reliably out-earns sin, the player optimises virtue and the dilemma dies.
   Sometimes honesty just costs money. Sometimes the person you saved never appears again.
5. **Consequences are personal, never global.** Not `company morality −15` - one person approves,
   another stops talking to you, the ogre thinks the pedlar was weak and that settles it, the
   ratkin concludes the rules are off and steals too. The company is the conscience; there is no
   meter.
6. **A deed changes the future options, not a bar.** After the first robbery: a choice reading
   *"We have done this before"* exists now; it is easier for some of the company and harder for
   others; some recruits come easier; honest traders want payment up front; the robbed man turns
   up later - maybe not as an enemy, maybe as a beggar.

> **The pillar in one line: you can be a good captain - you cannot be good to everyone. Even the
> saint chooses who pays.**

### The road's state is not a karma meter

*(User, 2026-08-31: "I want system of good and evil in the world. That world have states (as in
deamon sols (evil, neutral, good)) ... So far just track it and show, don`t make any active changes
in the events around it." Built as #272, build log 8f.296.)*

**The pillar above refuses a meter three times, and it is untouched.** Every one of those three
lines is about scoring a COMPANY: *"no karma meter; the company is the conscience"*, *"consequences
are personal, never global"*, *"a deed changes the future options, not a bar"*. The arc that shipped
scores a **PLACE**. Things happened here, and the people on this road have heard about them. That is
Demon's Souls world tendency, and **road** is the user's own word for it.

**The line between the two is a real line and not a relabelling:**

| what the pillar forbids | what shipped |
|---|---|
| a number that answers for your soul | the arc carries **no figure**, ever. It shows a state and a position, the way the mood row does |
| a global consequence (`company morality -15`) | it has **no consequence at all**: it pays nothing, gates nothing, and changes no door, no price and no fight |
| a bar standing in for changed future options | those options are still the mechanism - #160's sin ledger, the serjeant on the road, what the Snare Clan makes of you - and **not one of them reads this arc** |

⛔ **THE DAY IT PAYS, THE PILLAR HAS TO BE ARGUED AGAIN, AND THIS SECTION IS THE RECEIPT.** A road
state that opens a door or moves a price is a karma meter with a different word on it. If that is
ever wanted it is a decision taken out loud against rules 5 and 6 above, never a small extension of
a readout that happens to already be on screen.

**What it reads.** `G.deeds` - #224's tally, derived from every door's own intent glyph and already
in the save blob, so nothing is authored and nothing new is stored. `evil` -2, `help` +1, `honor` +1,
clamped to ±5. The five VERBS weigh nothing (`fight`, `take`, `trade`, `rest`, `leave`), because the
door vocabulary already puts the verb first and the moral colour second, and fighting is not a sin
any more than walking away is a virtue. **Two doors either way turns the road**: BLACK at -3 or
below, WHITE at +2 or above, QUIET between. A cruelty moves twice as far as a kindness, so three of
each still reads BLACK - which is rule 3 above, *bad deeds must actually pay*, arriving on the one
readout that watches them.

### Synergies come from smart use, not from menus

The model *(user's framing)*: mostly they are not new code - they are two existing rules meeting.
The ogre's **HURL A RATKIN** (throw an adjacent ratkin up to 4 hexes; it keeps its own turn and
takes a small knock) is one action that buys a position nobody could walk to - and everything else
is what the ratkin *brought with it*: a **spear wall** that lands as a spike inside their line ·
the **back arc a cutter just opened** · **marsh, if it has gills**, so it can SINK BELOW again the
same fight. Enemy ogres throw their clan ratkin onto your archer, so the trick never reads as a
player-only toy. Two more built the same way: a **braced spear beside an archer** keeps the scrum
off the bow (−35 → −18), and the camp's **fire-pit is a weapon** - anything pinned against it
bleeds 8 morale a turn and pathfinds away from it, so holding the gap makes the ground fight for
you.

**Cooldowns are what make synergies matter.** Everything strong now waits (COMMAND 3 turns, SPEAR
WALL 2, DISTRACT 2, WITHER 2…). Before that, the correct turn was almost always "do the best thing,
twice" - a cooldown makes a turn a *sequence*, and a sequence is where combinations live.

### The road does not announce itself

A place you have not stood in shows a **hint by kind, in the road's own voice** - *"Something on the
road"*, *"A wrong light over the trees"*, *"Smoke, and a fire kept lit"* - and the hover says only
that nobody you have asked can tell you more. The real name goes up when you arrive, and stays.
Printing "A WEDDING ON THE ROAD" over an unvisited node turned exploration into a menu.

### Wages are the pressure the pillar runs on

An empty pay-chest used to cost a flat −4 company mood. Now it is **a grievance held by named
people**, and since #152 it opens on a **payday**: wages fall due every fourth day, and the first
short day is the fourth, not the first. From there it runs as before: every unpaid day accrues on
each of them, costs them **mood on the battlefield** - so the
empty chest reaches the fight - and after five days somebody is simply **not at the fire in the
morning**. They go into the same returner arc as anyone dismissed; the road may bring them back.

**The personalities disagree about it**, which is the point. *Light-fingered* barely minds - they
were taking a cut off the top anyway, and are the one character better off when the company is
broke. *Ambition* minds most: they came here to get on, and not being paid is the opposite of
getting on.

This is what makes the pedlar start looking like a target, and that is the pillar working: **you
cannot afford to be good to everyone**, and now the arithmetic says so on a specific person's sheet.

*(Deliberately rare - one departure in a fortnight of insolvency, never the Captain, never below
three bodies. One person leaving is a story; three is a spreadsheet emptying itself.)*

### A promise the game keeps

Free Wynn Aldreth without taking a fee and the game tells you that at **Ashmoor** they will know
your banner before you reach the gate. That was tracked, printed in the run summary, and never came
to anything - a promise the epilogue broke. It now closes the slice both ways and **persists to the
wagon**: not a stat, not an item, a *name that knows you*. That is the shape of legacy the
settlement design asks for - possibility crossing runs, not power.

### Supplies are what the wounded eat

Wages buy the company bread; supplies are everything better than bread, and the sink that makes
them a decision is **the hurt**. Every day anybody is mending costs one, and on an empty barrel the
mending halves and the mood drops. So the barrels drain exactly when the company is worst off -
which is when *spend it or save it* is worth asking. A full act had previously ended with the
starting eight untouched.

> ## ☠ MORTALITY - CHANGED 2026-08-01, AND IT IS THE OLDEST RULE IN THE PROJECT
>
> **The user's ruling, verbatim: *"Mortality - yes - after get scars and maimed."*** Everywhere this
> document says *nobody on the roster dies*, read it as **nobody dies from a roll**. The chain is:
>
> **SCARRED** - permanent, stacking, removable once a run. Still always carried off the field.
> **MAIMED** - a part is *gone*, not damaged. Changes a role, not a stat line.
> **DEAD** - only from the maimed rung. A maimed body that goes down does not get carried off.
>
> **Why this does not reopen what permadeath broke.** No-death shipped for an arithmetic reason: a
> 12% chance of deleting a character forces every encounter to be balanced against the worst
> possible roll. **A chain is not a roll** - the rung is on the sheet in words, the player is warned
> before deploying somebody on their last one, and they can leave that person behind. A death is
> therefore always something the player **spent**, which is the pillar applied to a body instead of a
> purse. **The failure mode to measure is people who stop forming attachments.**
>
> Full spec, the rules it has to hold, and what it waits on:
> [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md) **#34** - it waits on **#4**, because a maiming
> has to be a real, drawn thing before it can be a rung on a ladder.

> **Neither counted resource can go below zero** *(build 8f.51)*. Crowns and supplies have exactly
> one mutation path - `pay()` - which clamps at 0 and returns what actually moved, so a ruling that
> costs more than the chest holds takes what is there and stops. **Morale is deliberately not
> clamped**: mood is signed by design and going negative is a state the game wants. Being *broke* is
> a legitimate way for a run to go; being *overdrawn* was a display bug that made every later
> "can I afford this" test lie.

### A choice label states an intent, not a receipt

**No choice prints a morale number.** It used to - 48 of 90 did - and that is the pillar
contradicting itself: the design says the world reacts but never scores you, and the label was
scoring you *before you chose*. Weighing "150 crowns against −22 morale" is arithmetic; deciding
whether to rob a man is not.

What a label shows now is **what the company will do about it**:

> *nobody will look at you for a while* · *the clans will hear, and so will your own* ·
> *word travels, and it travels ahead of you* · *they think better of you* ·
> *the company stands taller for it* · *barely worth a word*

**Prices stay.** Crowns, supplies, gems and days are things you knowingly agree to - a merchant
tells you his price, and a road tells you how long it is. And the money robbery pays must stay
legible, because **the economy is the moral system**: hiding what the cruelty is worth would break
the mechanism the pillar runs on. What is hidden is the *score*, not the *stake*.

*(A linter enforces this. `LINT()` reads every content table and fails on any label that prints a
morale number - along with literal tokens, impossible race gates, hardcoded names in floating
events, reward keys nothing consumes, and fights with no aftermath.)*

### And the receipt is a row of chips, in one language, game-wide

*(2026-08-13, the user: "If resurses are consiquences of the choise - make them more vissually
readeble (like when they are after battle loot)". Built as #143.)*

A label states an intent **before**; the outcome states a fact **after**, and it states it the way
the battle screen already does: **a row of icon chips**: ◉ crowns, ❦ supplies, ▤ salvage,
◈ gems, plus ♥ morale (signed, and this is the one place a morale number is legitimate, because
the choice is already made) and ◐ days. A piece of kit arrives as a loot strip with its own glyph.
Events, camp incidents and vignettes all use it, because **two receipt vocabularies on one road is
the same defect as two priority systems in one document.**

Two rules hold it together, and both have been paid for:

1. **The chip is built beside the payment, never off the label.** The label is hand-written and
   the payment is code; when they disagree, only the chip is guaranteed right. Six content rows
   were once caught printing a price the game did not charge.
2. **The prose then stops saying the number.** *"Thirty-eight crowns."* under a chip reading
   ◉ +38 is a second receipt, and the day a multiplier touches one of them it is a wrong one.
   This is what makes the receipt a length saving as well as a clarity one.

### What a person is

> **Race body + Class job + Trait exception + Gear + Scars + History = Person**

Race is not a class. Class is not a species destiny. **The trait is what makes an unusual
combination legible** - an ogre archer is not a mistake, it is a specific thing that behaves a
specific way. And the history is what makes them worth keeping when the arithmetic says replace
them.

Every unusual race/class combination must be **viable and legible, never secretly optimal**. If the
weird build is the best build, the choice is fake in the other direction.

### The promise, in three lines

> **Every body keeps the receipt.**
> **Every relationship remembers who paid.**
> **Every Rabble is different.**

*(Positioning, not a feature list. The company is legally a mercenary outfit and socially dismissed
as rabble - `Rabblebound` is the standing title candidate.)*

### The filter for new ideas

Accept when it strengthens at least one of these:

1. named characters accumulate **specific** history;
2. tactical choices **reveal** race, class, trait or relationship;
3. consequences return later **through mechanics**, not a morality score;
4. the player can read **why** a system produced its result;
5. it can be tested **without destabilising** unrelated systems.

Reject or park when it adds a second source of truth · adds a control language with no clear job ·
hides an irreversible choice inside AUTO · replaces an authored character moment with generic
generation · needs several unstable foundations at once · or is spectacle with no reusable
encounter contract behind it.

### The states a body can be in

**None of these may silently count as another** - that rule is what B03 was really about:

> temporary battle damage · **downed** in a battle · post-battle hitpoint loss · a **condition**
> with a timer or a cure · a permanent **scar** · a transformed or prosthetic part · a **mutation** ·
> a dead record

And the outcomes a battle can have:

> victory by elimination · victory by **rout** · victory by **objective** · defeat ·
> player **withdrawal** · enemy **escape** · a negotiated or special resolution

*The aftermath must use the actual one. A living escaped boss is not described as dead and does not
unlock corpse-dependent rewards - which is exactly what the Fen-Mother was doing.*

### What a class owes the player

Every class must be able to state, in one line each: **its promise · its job · the strength it can
rely on · a real weakness · where it wants to stand · how it visibly fails · and one measure of
whether it did its job.** And its race collisions must preserve the job while changing the
execution.

The anti-overlap rules that follow from that: the front-line class must not also be the best crowd
control; the mage must not have both the best damage and the best escape; the shooter must not get
perfect value on every map.

> **An unusual combination must have a real tactical use, a readable survival plan, and a visible
> personality hook - and must not be secretly optimal.** The game should not quietly make the weird
> build the best build merely to justify allowing it.

### The interface rule: show a state, hide the number

**Every measure in the game is a named state on the surface and a full scale on hover.** Nothing
prints a raw stat any more - *the ARITHMETIC drawer was deleted outright*, and with it the last
place a player could go to optimise against coefficients.

| Measure | On the sheet | On hover |
|---|---|---|
| The four stats | one word each (*Strong enough*) | the whole **seven-step** scale, current step lit |
| Mood | one rung (🙂 *Happy*) | all five rungs, their % thresholds and what each costs |
| A person's history | the **latest** thing that happened to them | everything else, behind one click |
| Gear | what it does in a sentence | the same, plus the conditional clause |

The principle: *a scale you have to read every time is a scale you stop reading.* One line answers
"how are they", and the whole ladder is one hover away for the moment you actually want it.

**On the battle token** this becomes one **mood emoji** and one **hitpoint bar** - two thin bars
under a 37px hex were two things you had to measure; a face is read instantly, and the bar that
stays is the one that decides whether they are about to stop existing.

### The Captain calls the fight

**He is the only voice on the battlefield.** At named moments the Captain - your own body on the
board - speaks in a balloon over his head: a rule the first time it ever bites, a state that just
changed, or the fact that it has cost you somebody. Two and a bit seconds, no pause, nothing to
click, and **never a number in it** - the interface rule above is not suspended because a person
is saying it.

**It carries his face and his name, not his job.** The balloon shows the same painted bust as the
character sheet and reads `YOU “TALLOW”` - the nickname this run rolled him. *"THE CAPTAIN"* would
have been the one place in the whole game where a person is named by their function, on the screen
where it matters most. And the balloon takes a **speaker**, so when somebody else in the company
earns the right to say something, they arrive with their own face and their own name.

It is deliberately **thin**: one balloon a round, five a battle, and no line twice in a run. When
every way of saying a thing has been used, she says nothing rather than repeat herself.

**Hints are tactical only.** *"Behind them, that is where a fight gets cheap"* is a rule the player
could not otherwise discover except by losing to it. *"Spare him"* would be a karma meter with a
face on it, and the pillar forbids it - the game never tells you what a decision is worth before
you make it.

> **And when the Captain goes down, the voice stops for the rest of the fight.** No substitute
> speaker, no handover, and it does not come back if he is helped up. Losing him costs you the
> read on your own battle, which is the only mechanical consequence the design needs to state.

### Magic can miss

A working is aimed with the **wits**, not the hands: a caster's chance to land one runs off INT
rather than weapon skill, and the target's dodge counts for about a third (you do not sidestep a
blight-wind, you just fail to be where it lands). This is what makes **the Ogre, One-Word** in the
Snare work - INT 3, so he lands roughly one working in three, and when he does it takes a person
apart. The best joke in the act and a real threat a third of the time.

### A set-piece ends when it is down

**The Fen-Mother cannot rout.** She could break at roughly 180 of 470 hitpoints and leave the
field - and the aftermath then announced she was dead and offered you her cub. That is not a text
mismatch: it turns *"we drove her off"* into *"we killed her and took her child"*, which is a
different moral event and a different reward.

Her mood still grinds down - it drives her states and everything that reads them - but it can no
longer end the encounter. The rule generalises: **anything the act treats as a set-piece ends when
it is physically down, never by walking away.** And the branch where she leaves alive is written
anyway, so no aftermath in the game can announce a death that did not happen.

### Mood is a ladder, not a bar

*(User's design, from their own mock.)* Morale reads as **five named rungs** - 😄 It rocks · 🙂
Happy · 😐 Ok · 😟 Depressed · 💀 Broken - with the current one boxed and the rest as thin coloured
strips, so you see both **where they are** and **how far there is to fall**. Hovering opens the whole
scale with what each step costs. A bar said "43/93": a number you cannot act on, wearing the same
clothes as the damage numbers. A ladder says *"Ok, and one step from Depressed"*, which is a thing
you can decide about.

*(Five display rungs over four mechanical states on purpose - a great deal of code asks
`state==='steady'`, and a real fifth state would have made a surging unit read as shaken and route
it into the fall-back branch meant for the frightened.)*

**The top rung pays: +5 to hit and +5% damage.** It is the only rung that gives anything, because a
scale whose best outcome is "no penalty" is not something a player will ever push for. And **fights
now start at 78% - Happy, not exalted** - for both sides, so It Rocks is earned in the fight rather
than handed out at deployment. **Breaking** was softened to −12/−5 with no action lock: at −18/−7
plus no heavy actions that rung was effectively out of the fight, and the ladder bottomed out a step
early.

**Morale changes float as faces, not numbers** - ◡▲▲ / ◠▼▼▼, green up, amber-red down, sized by
how much moved. And **proximity decides how much reaches you**: somebody going down beside you
costs full mood, the same death across the field about a third. A tight line is now a morale
liability as well as a tactical asset.

**Being hit is a flinch, not most of a morale bar.** Taking a blow costs −11, and **diminishes
within the round** - full, half, quarter. Before this it was a flat −16 every time, so a body being
focused by seven attackers lost its entire mood in the round the lines met and routed at 72%
health. Every fight was therefore decided by a morale collapse in round two or three, and the
cooldowns, the ladder, repositioning and the personalities never had turns to exist in. The whole
situational block below is also **capped at ±14 a turn**: those rules are pressure, not a
guillotine. Recovery sits outside the cap, so a shaken line can climb back out.

**Every turn reads the situation** (Battle Brothers' model): surrounded −6 per extra attacker ·
standing alone −9 · shoulder-to-shoulder +5 · badly hurt −7 · **the Captain still up and within
three hexes +6** · heavily outnumbered −8 · clearly winning +6 · a quiet turn +14. The Captain's
presence is the single biggest steadying effect in the game, and it is the reason putting him *on*
the field is a risk worth taking - leadership that costs nothing is not leadership.

### Forced movement - deciding where they stand

**Push and pull.** The cheapest way to attack everything the hex layer already cares about, because
it adds no new numbers - it aims the board you already have. Shove somebody into **marsh** (two
movement, −10 to hit), into a **fire's** reach (−8 morale a turn), past you so their **back** is to
your line, or **out of their own formation** so the *standing on its own* penalty lands. Being
shoved is not a choice they made, so it draws **no parting swings**; great beasts do not move; and a
shove that runs into a wall deals the unspent distance as damage.

**The halberd brought the first weapon-defined signature.** Same class, two different jobs, chosen
in the inventory rather than at character creation: with a **boar spear** the spearwoman braces
(SPEAR WALL), with a **halberd** she shoves (BRACE AND SHOVE, two hexes). That pattern should
spread - a class is what somebody trained for, but the thing in their hands decides what they do
with it today.

### One hand or two

Spears, mauls, warclubs and the Weeping Hammer take **both hands** - equip one and the shield in
your off-hand stops counting. It is the cheapest real decision in the inventory: reach and damage,
or the thing in your other hand.

**The bow is deliberately one-handed.** Physically it wants two, but the decision the second slot
exists to create is the archer's: **more arrows, or a blade for when something is already inside
your range** (the off-hand dirk grants a reach-1 action a bow cannot answer with). Making the bow
two-handed would have deleted that choice instead of creating it.

This is also what the **Blooming Hand** collides with - the hand that grew cannot hold one end of
anything, so the mutation quietly rewrites its owner's whole kit.

### Battlefields are places

Obstacles are **clumps you go around**, not scattered gravel - two or three stands of trees or
boulders per field, never so dense the lines cannot meet (the first cut silted the middle of the
board and produced a 22-round fight of nobody closing; connectivity is now guaranteed by
flood-fill). And one battlefield is **built, not rolled**: the pack is fought in the ogres' own
camp - a palisade ring with two gaps, a fire burning in the middle, lean-tos inside. A pack that
fights by leaving, met in a place with only two ways through: the gap is the fight. The pattern
generalises - authored layouts for authored encounters, rolled clumps for the road.

### Movement belongs to the race

**First move of a turn: ratkin 5 · human 4 · ogre 3. Second move: one less, for everybody.**
*(User's call.)* The stride is a fact about the body, not a derivative of agility - so the
difference between the races is felt every single turn instead of hiding inside a formula. The
first burst being longer than the second is what makes an opening move matter. The **cutter** gets
**+1 on the first move only** - reading the ground is his job. Enemies use the same numbers by
race; monsters keep their authored speeds. AGI no longer touches movement at all.

**Giving ground is finite - three fall-backs each, then they stand.** Once ratkin stepped 5 against
your 4, a shooting line could retreat one hex further than you could advance every turn, forever
(the Sling-Line went from 9 rounds to 15–18 of nobody catching anybody). A body can back off; it
cannot retreat off the edge of a battle it came to fight.

### Incidents chain. They never repeat.

An incident id fires **once per run**, full stop - the playtest hit THE DEBT twice with different
names, and the second time you can see the generator. Better than not repeating: **what you decided
unlocks a sequel.** Pay the debt out of the chest and somebody starts manufacturing debts. Rule that
debts do not exist and somebody applies your ruling to a knife they took. Let them fight it out and
the grudge comes back with a bedroll moved to the far side of the fire. Feed the fiddler and the
tune comes back - with words nobody learned. Sequels reuse the same two people, wait two days of
road so the consequence *arrives* rather than queues, and outrank fresh cards when both are
available. **Eight incidents produce more stories than twenty independent cards.**

### Two human decisions, then one screen

The Snare used to end in six screens - loot, mercy plea, butcher's bill, promotion, the woman in
the cage, run summary. Every screen was fine; the *sequence* was the bug, and the climax of the act
dissolved into an administrative queue. Now: **they beg for mercy → the woman in the cage → one
consequences card** carrying the field, the hurt, the promotion and the books, with one button at
the bottom that unlocks when both picks are made. Decisions about people come first, paperwork
comes once.

### The sheet is the company's album

Each person carries **2–4 remembered things** with no bonuses attached - *"Carried off the field at
The Snare with a bad knee." "Went back for Vesna at The Hill Steading." "Hired off the wall at The
Muster Field for 51 crowns."* Older entries compress to a bare list of place-names. And instead of
friendship bars (explicitly **not** Darkest Dungeon 2), a pair gets **one shared fact**: *"You
dragged Skree out of the Snare."* A fact provides context and sometimes an option; it never blocks
a skill or applies a random debuff.

Beside the tells there is a **paper doll** - head, body, two arms, two legs, deliberately crude,
a tin-soldier diagram rather than a portrait. Every scar is marked on the part it happened to
(eye→head, knee→leg, fingers→arm), a mutation glows teal on the part it took, and the body fills
with what is left of their hitpoints. A veteran's outline slowly fills up.

### Mutations - what the strange parts of the world do to particular people

Full design in [08_MUTATIONS.md](08_MUTATIONS.md). The short version: **race** is what they were
born as, **class** what they learned, **personality** how they behave, a **scar** what violence
did - a **mutation** is what the strange changed them into, and a **condition** is what is
happening to them right now. A mutation never comes from a level-up or a shop; it has an origin
you can point at, grants a *rule* instead of a number, carries a cost physically inseparable from
its gift, shows on the token (the one saturated colour on a muddy figure), and matters on the
road. Rare on purpose: one or two chances per run, and many runs end with none.

The pipeline is **condition → time to decide → recovery, scar, or mutation.** The slice ships one
complete chain: dragged under by the Fen-Mother → *Fen-Water in the Lungs* (four days of coughing
something grey, curable at Coldharrow's bone-setter) → left alone, it usually becomes **Gills of
the Fen** - marsh costs nothing, SINK BELOW once a fight (vanish into the water, surface from any
marsh hex within five, no parting swings), teal folds on the token's neck, a flooded crypt only
they can loot - and dry country is ground they are half-absent from (−12 morale on fields with
almost no water). Sometimes it just becomes ruined lungs, an ordinary scar, and nobody is sure
whether to be relieved. The player is never told the odds.

The test for every future mutation: **after the run, does the player remember who received it and
how it happened?** If they remember the bonus but not the person, it failed.

### Supplies - a store, not a tax

Food used to drain every travel leg, which made it bookkeeping: a number that falls on a timer is
not a decision. Now **the road's price is days, and the days become money at the payday** - wages
accrue per day and fall due every fourth (#152) - and **SUPPLIES are the good barrels**: not
eaten daily, spent on purpose. Click
the chip: **lay out a proper meal** (−4, −3 with the Cook-Fire, the mood lifts, once a day), or
**double rations for the hurt** (−3, wounds mend twice as fast for three days). Events still ask
for them at the road's hungry moments. They start low (6) and every source of more is a real
find - rarely spent, increasingly wanted, which is the opposite shape of a tax.

**And supplies still reach the battlefield.** Wages buy bread and nothing else, so a company that
has eaten only bread fights like one: **2 or fewer supplies and the whole line starts a fight 6
morale down; 0 and it starts 14 down.** That is what makes laying out a proper meal before a hard
fight a real decision rather than a nicety - food matters without ever being a per-day tax.

Every resource on the world bar now explains itself on hover - what it is, what it buys, and
where it goes when the run ends. A bar of unexplained numbers is homework.

### Party size, not charisma

Renamed. It was never a social stat - it is how many bodies the wagon and the pay-chest can carry,
and everybody takes room by size (ratkin 1, human 2, ogre 3). *(This also fixed a real bug: the
wheelwright's wagon-bed upgrade rebuilt the total from a base of 12 while the real base was 13, so
buying the first widening moved 13 → 13 and visibly did nothing.)*

**Letting somebody go costs nothing.** Paying them off was never the point - the point is the seat
and the wage you get back, and what the road does with them afterwards.

### Letting somebody go is not deletion

Any non-Captain can be **dismissed** - paid off from their sheet, walking away with whatever they
are wearing. The world keeps your leavers (RimWorld), and what it does with them depends on what
you were to each other:

- **Under three fights together** - they owed you nothing. They can turn up in the next deserter
  line, in your old colours, under the name *"…, who you paid off."* And they can die there,
  because they are not yours any more.
- **Three or more fights together** - that does not just stop. A few days later they are standing
  at the edge of your firelight: *"Wherever I went, it was worse."* Three answers, and the whole
  company hears which one you give: a place at the fire (if the party size holds), a meal and a
  purse and the goodbye the first one should have been, or a knife - for a bundle that turns out
  to hold eight crowns, a spare shirt, and a wooden spoon with your company's mark scratched on it.

### The road mostly just happens

More than half of what the road serves up is now a **vignette** - a one-card, no-choice beat that
already happened by the time you read it: somebody found a horseshoe, the bread went into the bog,
a crow followed the wagon and got named, which everyone agrees was a mistake. Tiny effects, one
button, the column keeps moving. **Why:** a full decision card for every found boot made travel
feel like a questionnaire, and it spent the player's decision-attention on things that were not
decisions. The big incidents (the Debt, the Argument, the Fiddler) still come - they just stopped
being the only register the road speaks in, which is also what makes them land when they do.

### The company remembers who did its killing

Every roster member carries a tally - **people and beasts counted apart**, because *"has killed
eleven dogs"* and *"has killed eleven men"* are different facts about somebody you eat beside. It
reads in words on the sheet, under the personality, quiet as a scar: *"Has put two men and one
beast in the ground."*

### Nobody on the roster dies in a fight

**Going down is a scar, not a funeral.** *(User's call, and it is the right one: "with dead it
requires much more careful balancing.")* It used to be 88% downed / 12% dead, and that 12% forced
every encounter to be balanced against the worst possible roll - one bad round could delete a
character the player had spent an hour making theirs, so the numbers had to stay timid everywhere
to compensate. **Removing permadeath is what lets the fights actually be dangerous.**

The stake is **scars**: permanent, stacking, and removable exactly once a run at the Medicine
Chest. Somebody is carried off the field and comes back worse. That is a cost you feel without a
cost you cannot undo - and it is the §11a "people are consumable" dilemma with the arithmetic
intact, because a veteran with four scars still costs full upkeep and fights worse than a fresh
hire.

**Withdrawing no longer abandons anybody either.** The downed are carried out and take a scar for
it: *"You go back for people. It is slower, it costs you the field, and it is the only rule this
company has."*

**Allied NPCs and enemies still die.** They are not yours, and something in a fight has to be
final. A run can still END - if every one of yours is down, the company is finished - so defeat
remains real without any single blow being unrecoverable.

### Monsters do not have classes

**Classes are a human idea** - a trade somebody chose, trained at, and can be promoted in. A wyrm
chose nothing. Monsters therefore carry a **bestiary entry** instead of a class: a kind and a
nature, in a different register on purpose. The Fen-Mother reads *"⬢ GREAT BEAST - LINDWURM"*, not
"captain"; the cub reads *"☙ WHELP"*.

This started as a UI bug - she was printing "CAPTAIN" because she borrowed the captain flag to get
extra actions - and the fix is the better design: a great beast's death now causes the same morale
shock a captain's does through its own flag (`bigkill`), without pretending it holds a rank.

**Every monster is melee.** Nothing in the bestiary shoots, because a thing that can kill you from
six hexes is a soldier; these are animals with opinions. What distinguishes them is their **skill
set**, which is per-creature and named - the wyrm drags you out of your line and drowns the ground,
the dog bites and leaves, the whelp will not fight at all.

### Enemies are people too, and it shows in how they move

**Roughly two in three enemy humans, ratkin and ogres carry a personality** - the same register
the company draws from - and it changes their *behaviour*, not just their numbers. *Cautious*
raises their aversion to being surrounded and makes them break off at 45% hitpoints instead of
30%; *Courageous* and *Does not run* never break off at all; *Feral* actively wants the middle of
the press. All of it reads on hover, because a tell the player cannot see is not a tell.

**Animals get none.** A dog is a dog. The distinction is the point: personalities are what make
the *people* on the other side legible, which is the §4 rule about the other side always being
legible, expressed as movement.

### Act 1 has eight fights, and each one teaches something different

*(Map labels name the ground, never what is waiting on it - the slow reveal. The player sees
The Black Fen, The Hill Steading, The Stone Field; the fight names below are ours.)*

| Fight | Map node | The problem it sets |
|---|---|---|
| **Blood on the Road** | Blood on the Road | the tutorial, with allies dying beside you |
| **The Broken Men** | The Broken Men | people who break like people |
| **The Pack** | The Ruined Steading | **unavoidable - every road runs through it.** You are inside the palisade; the dogs come at the two gaps out of the dark. Nothing to hold a line against, so hold the gap instead. No choices: it is an ambush |
| **The Sling-Line** | The Stone Field | cross open ground under fire; your shooters matter |
| **The Steading-Line** | The Hill Steading | four ogres who will not chase - kite them |
| **The Snare** | The Snare | the act finale: ratkin numbers, a hired ogre who throws them at you, and the **Ogre, One-Word** - a battle-mage with an INT of 3 who misses three castings in four and removes somebody when he doesn't |
| **The Fen-Mother** | The Black Fen | a boss that dismantles your formation, not your hitpoints |
| **The Thing in Armour** | *no node - it catches you on the road* | **do not engage it.** Pin it with one body, shoot it with the rest, and pay for the one you pinned it with |

#### The Thing in Armour - the fight you are supposed to run from

The one lesson the set was missing, and the first fight whose correct play is **a sacrifice** -
the pillar expressed as a tactical decision instead of an event choice. **Four rules, and they
only mean anything together:**

- **`noArc` - there is no wrong side of it.** No back arc, no flank bonus, and (this is the part
  that decides the fight) **no "three of you on it" bonus either**. Flanking penalties are a
  numbers rule as much as a facing rule; leaving the surrounded bonus in place would have made
  ringing it pay +30 a head and the ring would have been correct after all.
- **Its sword sweeps** - one swing, everything adjacent. So the ring does not merely fail to
  help, it is charged for.
- **`soak:4`** - a flat amount off the *body* damage of every blow, after the armour split,
  floored at 1. Armour is a pool you can empty; soak never empties. It costs a heavy swing a
  tenth and a light one a fifth: it is the rule that says *this is not a thing you chip down.*
- **Step 5** - faster than anybody in the company. Running is buying time, not escaping.

It fires **once per run, on arrival**, framed as having happened on the last stretch, at the first
ordinary road node past the first Muster Field (on the current map, The Dead Company - a choke
every route passes). It **takes precedence over the node's own event, which is still standing
there when the fight is done.** Three answers, one fight; what changes is the state you enter it
in - strung out, shoulder to shoulder (the obvious one, and the one its sword was built for), or
one of yours sent wide to pull it off the road, who **starts the fight downed, takes a scar for
it, and gets its harness half open before it finishes with them.**

When it dies it **melts**: no corpse, no race, no line in the run summary, and the kill tally
records nothing - the company cannot say what it killed, so the company does not write it down.
The aftermath gives you a smell and **The Cold Thing**, and answers nothing. A hook for a later
act, deliberately left as one.

### Formations - what a race is *for*

Race leans on the character sheet are deliberately tiny (±1, ±2), which is right: a race should
not be a different game. But that leaves nothing that makes a ratkin company *feel* like a ratkin
company. **Formations carry that instead** - collective, positional, and free of stat inflation,
so the difference shows up in how you *place* people rather than in their numbers.

| Formation | Condition | Effect |
|---|---|---|
| **The Swarm** | 3+ ratkin engaging one enemy | that enemy is **−14 to hit** - too many small bodies on it to swing at any one of them |
| **The Weight** | 3+ ogres within 2 hexes of you | **−9 morale every turn** - the mood simply goes out of you |
| **The Line** | 3+ of one side in a row on any hex axis | **+4 morale and +5 dodge** to everyone in it |

**The Line is deliberately race-agnostic.** Humans get no special trick, so the trick they get is
the one anybody can learn - which is also the one that rewards discipline over biology, and is
therefore the most human thing in the list.
- **Target length: 6-12 player turns** for a standard fight (skirmish ~4-5, boss ~15). Fast because the party is small, not because fights are trivial.
- **Enemy design axis:** swarm ↔ elite. Ratkin/vermin challenge with numbers and flanking; ogres/cyclopes challenge with threat zones and burst damage you must play around.
- **Threat budget - enemies use the same point logic as the party.** Every enemy type has a threat cost derived from its health, armor, damage and abilities (e.g. rat swarmling 6, rat cutthroat 10, brigand 18, ogre bruiser 45, cyclops 70). An encounter is generated/designed against a budget: a 90-point fight can be 15 swarmlings, or 2 ogres, or a mixed pack. This keeps difficulty tunable and makes swarm-vs-elite a real dial. (Exact numbers in Step 3.)
- **Armour and hitpoints are independent pools** (Battle Brothers style). Armour is equipment that soaks and degrades; hitpoints are the body underneath. Weapons differentiate along this axis - maces crush through armour, blades butcher unarmoured flesh - which creates targeting decisions every turn.
### The four core stats - everything else is derived

The character sheet is **four numbers**. Every other value on the unit is computed from them, so there is exactly one place to invest and no dead stats.

| Stat | What it buys | Race |
|------|--------------|------|
| **Strength** | Melee damage and hitpoints | **Ogres +2**, and −1 Agility with it |
| **Agility** | Chance to hit, movement, dodge | **Ratkin +1**, −1 Strength |
| **Intellect** | Magic power, flanking and backstab damage, out-of-battle resolutions | **Humans +2** |
| **Morale** | Bonus damage of *every* kind - melee, bow, spell - plus how long they stay in the fight, and out-of-battle resolutions | - |

Derived from them: hitpoints `25 + STR×3.5`, chance to hit `48 + AGI×1.2`, dodge `6 + AGI`, movement, flanking bonus `8 + INT`, spell power `1 + INT×0.05`, morale pool `60 + MOR×3`, and a flat damage bonus of `MOR×1.2%` on everything. *(Hitpoints and weapon dice were both shaved ~10% in playtest #3: the bigger board added two rounds of approach, and the old totals made fights outstay their welcome. Enemies take the same trim through a single multiplier where they are built, so nothing drifted apart.)*

**Strength and agility are MULTIPLIERS on damage, not additions.** *(Changed in playtest #3 - as flat bonuses they were swamped by weapon dice and a strong arm barely showed.)* The flat part is now small (`STR×0.3`); the real work is `(stat − 8) × 5.5%`, capped at −30%/+55%, where **strength swings a melee weapon and agility draws a bow**. Spells ignore both - they run on INT.

The pivot at 8 means an ordinary arm is ×1.00, a weak one ×0.88, a very strong one ×1.48. That difference is felt on *every blow* rather than being lost inside a `+6`.

**Consequence, and the reason race spreads keep shrinking:** a multiplier compounds what a flat bonus merely added. Race leans were cut to **ogre +2 STR / −1 AGI** and **ratkin −1 STR / +1 AGI** because at ±3 an ogre was hitting for half again what a ratkin managed with the same weapon. A race is a lean, not a different game.

**Morale being a damage stat is the interesting one.** It means the archer and the mage want it as much as the ogre does, and it ties the mood system directly to output rather than leaving it as a pure survival stat.

- Remaining derived values follow Battle Brothers: **Hitpoints, Armour, Initiative, Skill, Dodge, Speed.**
- **Two actions a turn** *(revised down from three after playtest #1)*. With parting shots and reactions in play, three actions made every turn a puzzle and made balance nearly impossible to reason about. Two is *move + strike* or *strike + strike*, and it reads instantly. Rabble also get two; captains and great beasts get three or four, so the asymmetry now lives in stats and quality rather than in tempo.
- **Stat spreads are compressed, and keep being compressed.** A ratkin used to out-dodge an ogre by nineteen points on a 5–95 scale (playtest #1); the leans were halved again when strength and agility became damage *multipliers* (playtest #3), because a multiplier compounds what a flat bonus merely added. The standing rule: **every time damage scaling gets steeper, race leans get flatter.** A race is a lean, not a different game.
- *(Superseded)* ~~Three actions a turn, never more than two the same.~~ This replaced an earlier AP-plus-fatigue model. Fatigue is a *campaign-attrition* system; in a 6–12 round fight all it did was grey out buttons. The two-alike cap does the same job honestly: it forces variety inside a turn without bookkeeping. A turn is *move + strike + strike*, or *strike + strike + brace*, or *move + move + strike*. Heavy abilities cost 2 of the 3.
- **Veterans act three times; rabble acts twice.** Enemy trash gets 2 actions to your 3. This is the swarm-vs-elite dial made structural - a swarm's threat is its *numbers*, not its tempo - and it means being outnumbered 2:1 is dangerous without being an instant loss.
- **Morale - Battle Brothers, not Total War.** An earlier version had morale reacting to six different situations with a resolve-scaled formula. It was replaced with something far simpler and more readable: **four events, flat numbers.**

  | Event | Morale |
  |---|---|
  | You killed something | **+30** - big |
  | An ally killed something | **+10** - small |
  | You were hit at all | **−16** - big |
  | An ally died | **−22** - bigger (−32 if it was a captain) |
  | You are below a third of hitpoints | **−26** - bigger still |
  | A quiet turn | **+14**, so one or two turns puts you back |

  Four states, set as a *fraction* of the unit's own pool: **Steady (≥70%) → Wavering (≥40%) → Breaking (≥15%) → Routed.** Wavering and Breaking erode aim and dodge; Breaking units cannot commit to 2-action abilities; Routed units raise a white flag, stop fighting, and run for the edge.

  **The recovery number is the whole design.** Because a quiet turn gives back 14, morale is a *pressure* system rather than a death spiral: pull someone out of the line for a turn and they come back. That is what makes DISENGAGE and the Captain's COMMAND worth spending actions on.
- **~~Winds of Magic~~ - CUT.** *(User's call: "delete the Winds of Magic system entirely. I don't like it here. Wizards have their own problems.")*

  The Winds were a per-side pool that ebbed and surged every round outside anyone's control. The intent - magic as unreliable weather rather than a resource bar you own - was right for a low-magic world. The execution put a **weather system between the player and their own character**: you could not plan, and the reason you could not cast had nothing to do with the person casting.

  **What replaced it: casting costs the caster their own mood.** Every spell spends the caster's morale - Ember 5, Unpick 9, Iron-Oath 12, Blight-Wind 14, Wither 16 - and **the second working of a turn costs 1.6× the first**. Combined with the per-turn casting cap, that is limit enough, and it is *personal*: a caster at the back of a winning fight can work all day; one in a losing fight is spending the exact resource they need to stay standing. A wizard's problems are their own.

  *Wind-touched* (−4 mood per spell) and *Cold Hands* (−5) survive as the ways a particular person is better at bearing it.
- Positioning, facing/flanking, and 2-3 meaningful abilities per character per turn - no 15-button bloat.
- Injuries persist between battles (Battle Brothers style); death is permanent within a run.

## 8. Characters & progression

### What a person is made of, in four words

> **Race defines the body. Class defines the tactical job. Trait bends expectation.
> History makes the combination belong to one person.**

That ordering is the whole character system, and it is also the rule for how to *balance* one.
An unusual combination - an ogre mage, a ratkin who insists on holding the front - should have
**one real tactical use and a readable survival plan, without secretly being optimal.** An ogre mage
is not a mage with more hitpoints: the class wants time and an angle, the body gives durability and
takes away precision and footwork. A ratkin warrior asks the race to stand where it normally would
not, does not need to be efficient, and becomes a *person* through a courageous streak, shared
fights and visible scars - the small front-liner who keeps taking the first hit.

**Never balance a race×class by multiplying the final stats.** Budget the result across seven axes
and let one of them be genuinely bad: durability · reliable damage · movement · reach · control ·
action economy · special utility.

And the sheet should **explain the collision in five parts** - what the class promises, what the
race tends to do, which trait is the exception, what the scars have taken, and one sentence naming
the role this actually produces on a battlefield.

### The chronicle gives evidence, never a verdict

The record of what somebody has done answers two questions, in this order: *who is this person*,
then *what have they actually done for the company*. Story first, numbers second, collapsed by
default. Contribution that is not damage has to be visible - people carried out, morale breaks
prevented, ground denied - because **kill count flatters finishers, damage flatters area attacks,
and damage taken can mean bravery or bad play equally.**

So the presentation rules are prohibitions:

> **No single power score. No damage-per-turn as the default sort. No class letter grades. No "most
> valuable" line derived from kills. No red-and-green comparison that makes a support character look
> like it is failing.**

Cadence: one new notable record surfaces in the aftermath (*"Bruht has now carried three people off
a field"*), and at the end of a run **three authored superlatives - not a spreadsheet.** Everything
else stays available to whoever expands it.

The same fact can also be *presented* by culture without changing what it means: one stored number
for kills, rendered as a plain tally for a human, as trophy fingers for a ratkin, as heads for an
ogre - grouped into bundles past ten, with the exact number always available in words. **Never store
fingers or heads as extra counters**, and never fork the underlying data by race, or every save
migration and every validation pass forks with it.

### Inventory - four slots, and armour has a size

A shared company stash plus **four slots per character: Armour, Main weapon, Second weapon, Trinket** - and a fifth, **Pet, on the Captain alone** (see §11b). Deliberately small - enough that gear is a decision, not a spreadsheet. Weapons *define the character's actions*: equip a bow and the unit's attack becomes a ranged one, equip a spear and it gains reach 2. There is no separate "class weapon" rule.

**Armour comes in three sizes - human, ogre, ratkin - and wearing the wrong one is legal.** This is the comedy valve the world needs:

- Wrong-size armour still works, at **55% of its value**, plus **−2 Agility and −6 Morale**.
- Each mismatch has its own line. An ogre in ratkin scrap is *"fastened to him with rope and optimism. Half the plates do not meet. He knows how he looks, and so does everyone else."* A ratkin in human mail *"is entirely inside it. When he stops moving it stands up on its own and he has to be found."*
- So it is never a hard block - it is a bad idea you are allowed to have, and the morale penalty is the joke landing mechanically.

**Trinkets come in two kinds, and the game says which.** *(Added after playtest #2 - the question "who does this actually help?" was going unanswered.)*
- **PERSONAL AMULETS** occupy one character's trinket slot and help only the person wearing them. Most trinkets are these.
- **COMPANY RELICS** need no wearer and no slot - they work for the whole company from the baggage. The Brass Token (+10% crowns from every event), the Company Banner (+6 starting morale to everyone), the Marching Drum (+2 mood every leg of road - the column arrives in better heart than it left).

Hovering any trinket now states its kind in a coloured header before anything else, then its numbers, then what it is.

**Injuries from the road are not scars.** *(Also playtest #2.)* An accident on the world map - a beam falling, a bad landing, the pedlar's knife - costs **hitpoints that mend over days of travel**, not permanent stats. **Only being put down in a battle leaves a permanent scar.** That keeps scars meaningful and stops the roster rotting from bad luck rather than bad decisions. Individual events can still opt into permanence with a `lasting` flag; almost none do.

**Trinkets are real gear, not a counter.** The fingerbone, the bloom-stem, the glass apple, the Fen-Mother's tooth - each is a named object with a stat line. Hovering one says exactly what it does and *for whom*. **Personal amulets display on the character that carries them** (inventory already shows equipped gear per-character, so a second aggregated world-bar list was redundant and cut); **company relics**, needing no wearer, still show as chips along the top of the world map since they belong to no one character.

**Most trinkets carry a conditional clause** - a small flat bonus for anyone, plus a bigger one that only fires for the right race or class. The Fen-Mother's Tooth gives +2 STR and +6 HP to anybody, and +2 STR and +8 HP *more* if an ogre wears it. The Rat-King's Knuckle is nearly worthless on a human and excellent on a ratkin. This turns the stash into a small assignment puzzle rather than a strict power ranking, and it gives the racially mixed party a reason to exist beyond flavour.

**Events may never name somebody who is not in the company.** Event prose writes a *token* - `{ANY}`, `{RATKIN}`, `{OGRE}`, `{MAGE}`, `{CAPTAIN}` - which resolves against the living roster at display time, with a fallback phrase ("the smallest of you") when nobody fits. Hardcoding Skree or Bruht into a floating event is a bug: the player may never recruit them, or may have buried them, and the moment the road reports on somebody who is not there, the one thing this game actually sells - *that happened to **my** company* - quietly breaks.

### A good thing you carry takes something away

*(Accepted 2026-08-02, from the user. Specced as [backlog #78](00_PLAN_AND_BACKLOG.md); the three items in it are not built yet, but the principle is settled and everything added to `GEAR{}` from here is written against it.)*

**The pillar says you cannot afford to be good to everyone. On a body it says you cannot afford to be good at everything.** A gear slot is another purse. The stash keeps offering capability the character cannot pay for, and the interesting item is never the one that is simply better: it is the one that is better at something and worse at something else, where the two things are **not the same thing**.

Two-sided gear has been here since the first pass (the Toll-Man's Boots, The Cold Thing, foundry plate, the wardrobe), and nearly all of it charges the same currency: a little morale, on the same sheet as the benefit. That is a tax with a plus sign next to it, and a player works it out by the second run. Four rules fix it:

1. **The cost is paid on a different axis from the benefit.** Damage for damage can be computed, and a computable trade has one right answer. Hitting harder for **being hit harder**, tempo **now** for tempo **next turn**, precision for **footing**: those cannot be computed without knowing the fight, so the player has to decide instead of the arithmetic.
2. **The cost bites at a moment, it does not sit on a sheet.** If nobody can point at the price when it is paid, it was not a price, it was a smaller bonus. This is "show a state, hide the number" pointed at gear: you should learn what an item costs by paying it.
3. **If you can name the best one, they are upgrades again.** The personalities rule, unchanged. Every side-effect item has to come with a written sentence naming the company where taking it is a **mistake**. If that sentence cannot be written, the item is not ready.
4. **A side effect is never a curse.** All of it comes off in the stash, for free, between fights. A consequence the player chose with their eyes open is the game; a slot they can no longer use is a punishment for having experimented.

The three that arrived with the rule, as worked examples: an **Overfull Quiver** that costs two agility (which is hit, step and dodge at once: one number, three costs) and buys an exemption from the rule that makes a second shot weaker. The **Ground-Glass Eyes**, which hit +9 and make every blow that lands on the wearer land 20% harder, because the item's own description has always said *"can count the rivets on a man at forty paces and cannot find their own feet"* and the numbers were charging morale instead. And the **Red-Warg Bottle**, which is not a price at all but a **debt**: once a battle, one extra action now and one fewer next turn. Nothing in the game can tell the player whether this is the round worth borrowing against, which is the entire point of it.

**The gear list is allowed to be funny.** A wardrobe with the doors off and arm-holes cut is legitimate ogre armour (96, −3 AGI). A bucket is 12 armour and there is no rest of the armour. A broom has reach 2 and is humiliating for everyone involved. The Mirrored Sphere - a hanging ball of a thousand mirror-shards, found in a ruin nobody can explain - is a perfectly good trinket. **The joke only works because the numbers are real**: the wardrobe genuinely protects him, which is exactly why he keeps wearing it.

### Classes, levels and promotions

- Six classes in the slice: **Captain, Spearwoman, Archer, Battle-Mage, Cutter, Brute.** A class supplies one signature action and a pool of five perks.
- **Every character also has a trait** - always a trade, never a straight bonus. *Insists he is a vegetarian*: −10% damage, +8 Morale. *Twitchy*: +2 Agility, −4 Morale. *Wind-touched*: spells cost 5 less, −3 Morale.
- **The level is earned, half by the company and half by the hand.** *(Ruled by the user 2026-08-17 and specced as [backlog #174](00_PLAN_AND_BACKLOG.md); not built yet. It replaces the rule that stood here from the first slice, "Promotions, not XP bars: after each battle one random surviving character is promoted", and the reason that rule gave, "randomising who gets promoted is the point, you build the party you were given". Both are kept in the spec as the rejected half.)* Every body carries experience. A won fight is worth what the enemy brought onto the field, and it is paid **half to everyone who stood in it, split evenly, and half by the hand: damage dealt and kills.** Ten levels, on a gentle triangle (100 · 250 · 450 · 700 · 1000 · 1350 · 1750 · 2200 · 2700 · 3300 for a human; a ratkin needs ×0.8, an ogre ×1.2, and intellect is the learning rate). Level 4 is act one's honest expectation, 8-9 the campaign's, 10 the trophy. **The founders start at level 1. Nothing about experience is shown on the battlefield**: the number exists on the aftermath's crew card and on the sheet, where the level is a ring around the person, and nowhere else. The research it stands on is [`XP_BENCHMARK_2026-08-17.md`](XP_BENCHMARK_2026-08-17.md).
- **Promotions still alternate: a perk first, then a stat, then a perk again**, and the alternation is what survives from the old rule unchanged. The order used to start on the stat, which meant a level-2 character sat looking at an open tier-2 tree with no point to spend on it and could not actually *choose* anything until level 3. The first promotion is the one that should feel like a decision.
- **A stranger may arrive with no trade at all.** One of the three on any muster wall is **level 0**: no class, no signature, a cudgel, and a lower price *because* he brings no tool and no trade. His first level, inside his first fight or two, is the moment the player picks his class on the sheet, and the trade's tool arrives with it. XCOM's rookie, chosen rather than rolled.
- **Eight perks per class, in four tiers of two** (levels 2/4/6/8 once #174 lands; 2/3/4/5 in the shipped build). The original four-per-class tree ran dry after about two promotions, and - worse - a perk promotion with an empty tree still *granted* a point and then silently skipped its own screen, so the point could never be spent and the promotion was simply eaten. **If there is nothing left to learn, the promotion becomes a stat point instead.** A reward must never evaporate. Over ten levels that is four perks and five stat points, and a level stays a small step on purpose: the user's word for the power curve was *"not that sharp"*.
- **Perk points are spent wherever you like** - at the promotion screen, or later from the character sheet, where the full perk tree is laid out and anything affordable says CLICK TO TAKE. (Added after playtest #1: choosing only at the promotion screen felt like being unable to choose at all.)
- **Recruitment isn't only the Muster Field.** Some events hand you a person: feed the broken men and a young pikeman named Pell stays behind and joins - if you have the party room. People are rewards, on the same footing as loot.
- **Casters roll two of the four spell schools** (crowd / single-target / buff / debuff) when they're created, plus the Ember cantrip everyone has - so no two mages play alike, and a recruited mage is a genuine roll of the dice.
  - *(Superseded 2026-08-17 by #174, kept so the reasoning is not lost:)* the old rule randomised *who* got promoted, on the argument that you do not build the party you planned, you build the party you were given, and the roster becomes a history rather than an optimisation. That job is now carried by the **line half** of experience (everyone who stood in the fight grows, whatever they did) and by scars; the hand half is the player's expression.
- Perks are small and legible: *Sure Shot* (ranged penalty while engaged drops from −35 to −15), *Stand Fast* (cannot rout), *Killing Zone* (your parting swings deal full damage), *Bulwark* (+8 dodge if you have not moved).

### Four progression tracks inside a single run

The party gets stronger along four separate axes, and the map constantly asks which one you want to feed:

| Track | What grows | How you feed it |
|-------|-----------|------------------|
| **Levels** | Character skills and stats | Winning fights, resolving events |
| **Gear** | Armor, weapons, trinkets | Merchants, loot, crafting |
| **Charisma** | Party size / composition | The village wheelwright widens the wagon bed: +1 now and on every later run |
| **Condition** | Injuries healed, fatigue, morale | Rest and camp choices |

Charisma growth is deliberately rare and chunky (+1 at a time, from a wheelwright with your salvage in his hand), so gaining a point is an event you remember: it might mean finally affording the ogre.

## 9. The run economy - camps, resources, and the choice that hurts

This is the Slay-the-Spire-shaped layer, but the currency is not just gold.

**The five things the world map tracks:**

| Resource | Role |
|---|---|
| Resource | Band | Role |
|---|---|---|
| **Crowns** | THIS RUN | Trade, healing, hiring, bribes - **and the road itself**: wages accrue by the day and fall due every fourth day, at the PAYDAY (#152). Runs out fast. |
| **Supplies** | THIS RUN | The good barrels - *not* spent per day. A proper meal for the mood, double rations for the wounded, and the road's hungry moments. Empty barrels reach the battlefield (≤2 = −6 morale to the line, 0 = −14). See §"Supplies - a store, not a tax". |
| **Salvage** | BETWEEN RUNS | Whatever a company can prise off a battlefield and fit in a cart. Rebuilding the wagon and forging. |
| **Gems** | BOTH | Rare. High-tier forging and long-term unlocks - but sellable for good coin when the run is going badly, which is the point. |

**Wood and iron were merged into SALVAGE.** They were two names for one decision: nothing ever wanted wood but not iron, so carrying both only made the player do arithmetic to reach the same conclusion. *(Internally `wood` and `iron` survive as write-through aliases onto the single pool so existing event data keeps working; new content should say `salvage`.)*

**The bands are shown separately in the UI on purpose.** THIS RUN resources are spent on staying alive today; salvage is useless today and decisive next run. That split is what makes the core choice bite, and **gems are the deliberate bridge** - the one you can always cash in, and always regret cashing in. Trinkets are gear now, not a resource (see §8).

**Company morale is named, not numbered - "Blessings & Curses."** This is the *campaign-level*, out-of-battle mood the whole company carries between nodes (distinct from the in-battle Steady/Wavering/Breaking/Routed states in §7, which stay flat-number-driven on purpose). Company morale reads as a Total War-style named band - a hover-able state like *Bolstered* or *Grim* rather than a raw number - because at the world-map layer the player should feel the company's temperature at a glance, not do arithmetic on it. This is the one place in the design that deliberately *does* borrow the Total War naming convention the in-battle system explicitly avoided.

**Camp / rest nodes offer a choice of one:**
- **Rest** - heal injuries, reduce fatigue
- **Train** - convert time into XP or a skill pick
- **Work the fire** - spend materials to craft or upgrade a piece of gear
- **Scout ahead** - reveal upcoming nodes, sometimes reroll one

**The core tension we want:** materials serve two masters. Spend them now for this run's gear, or bank them into the between-run forge (§11). Meanwhile gold competes with them at merchants. A typical dilemma the map should produce:

> *You've escorted a merchant safely to town. He offers you his stock at a discount - good armor, right now, gold only. But the road east has a collapsed foundry full of iron you could haul back to camp instead. One helps you survive tomorrow. One helps every company you will ever lead.*

That's the choice we design events around: **immediate power vs. permanent capability.**

## 10. Overworld

- Node map per act, branching like Slay the Spire but **wider node vocabulary**: battle, elite, merchant, shrine, settlement, mystery place, quest node, camp.
- **Quest-lines**: 2-3 multi-node chains per act - accepting one changes which nodes appear ahead of you.
- **NPCs and dialogs** at settlements and after battles; choices feed injuries, loot, reputation, and quest state.
- **Merchants** with regional stock; gear matters as much as levels.
- **Race-specific event choices.** Many events - especially the ones involving a specific race - get an extra choice that only appears if the party contains the right member (a `needRace` gate on the choice, evaluated alongside the existing resource-cost gate). A ratkin in the party can talk a ratkin clan around in a way a human can't; an ogre can vouch for another ogre. This is the mechanism that now carries the "party composition talks back to the world" pillar from §4, since it isn't routed through a numeric faction system anymore (cut, see `03_WORLD_LORE.md` §4b) - the payoff is per-event and immediate rather than accumulated.

## 11. Metaprogression - The Wagon

**No card unlocks.** Progress between runs is *material*: you haul resources home and build things that persist.

**Renamed and reframed from "The Old Camp."** *(User's call: "I feel it is wagon more type, as Battle Brothers."; the earlier waystation implied a fixed, half-magical place that survived a wiped-out company for no stated reason.)* Between runs you return to **The Wagon** - a physical cart, not a location. It follows the company because someone is pulling it, and its opening text says exactly how you got it, with **no cross-run magic, only object continuity**:

- **Fresh start, or a run that ended in victory:** your retired cousin gifted you the wagon and 80 crowns before you set out - *"and don't,"* was the entire message. She is out of this life and staying out.
- **A run that ended in the company's death:** the new company finds the *same physical wagon*, abandoned on the roadside - wheels sound, mule still tied, forge cold - and takes it over with 40 crowns still in the strongbox. Nobody explains how it got there beyond the obvious: whoever pulled it last did not come back for it.

This is tracked by a single boolean (`LEGACY.priorDied`, set in `toDefeat()`/cleared on the victory walk-home button) that picks the boot narration. Materials you banked during a run stay with the wagon regardless of which opening you got. You spend them on:

- **The Travel-Forge - for the NEXT RUN ONLY.** You spend banked materials, the piece goes into the next company's stash, and it is gone with them. *(Changed from permanent unlocks: a one-off forge is a power spike you stop thinking about after run three. A per-run forge is a place you come back to every single time, which lets the artifacts be genuinely good without being run-defining - and makes banking materials matter continuously rather than once.)*
- **What is bolted into the wagon - THREE SLOTS, FOUR FITTINGS.** This is the metaprogression that actually persists, and none of it raises a number in a fight. Each fitting removes a different kind of grind, so a wagon is a statement about what the last company kept dying of:

| Fitting | Cost | What it removes |
|---|---|---|
| **The Bed** | 6 wood, 2 iron | On every leg of road the worst-hurt person recovers **half** of what they are missing, instead of a few hitpoints a day |
| **The Medicine Chest** | 5 iron, 2 gems | **Once per run**, take one permanent scar off anybody. The only way to undo a scar that exists |
| **The Cook-Fire** | 8 salvage | **+3 morale** every time the company stops, and a proper meal costs **one less supply** to lay out |
| **The Reliquary** | 3 wood, 3 iron, 2 gems | **+10 maximum morale** for everyone, in every battle, forever |

  Four into three is the whole design: you cannot have all of it, and the one you leave out is the thing you have decided to keep suffering.
- **The Board** - unlocked professions, starting companions, and regions that appear on future maps. *(Not built.)*
- **The Codex** - Qud-style lore entries for every creature and artifact you've encountered. *(Not built.)*

Compared to Tabletop RPG's version: same idea of a persistent home base you invest into, but the currency is **stuff you physically carried out of the world**, not abstract meta-points. Every material has a visible chain: event → backpack → wagon → forge → a specific item on a specific character.

**Demo/MVP scope for this system: 2-3 craftable pieces of equipment only.** Enough to prove the loop and the choice, not enough to become a spreadsheet. Suggested trio, one per race, so the choice is also a party-composition statement:
1. **Foundry-plate cuirass** - the ogre's wall of metal
2. **Rat-silk shroud** - light armour for a ratkin, dodge over soak
3. **Weeping hammer** - armour-crushing two-hander for a human

*(Costs are in **salvage** - wood and iron were folded into one pool. They survive only as
write-through aliases for old saved data and must never be used for arithmetic again; doing so is
what made the wagon bank every haul twice.)*

## 11a. People are consumable - and that is the point

> Added after the RimWorld conversation. The user has 1000+ hours in RimWorld and named the
> reason: *"stories, world, interaction - each time unpredictable development."* That is the
> target feeling, and it does not come from a balanced party. It comes from a company that
> keeps changing shape underneath you.

**A mercenary is a resource, not a save file.** The design should make it genuinely reasonable - sometimes optimal - to let someone die, or to leave them scarred and use them as a body that soaks damage while the people you actually care about do the work.

- **Replacing is often cheaper than repairing.** A fresh ratkin costs a little coin and 1 of party room. A veteran with three scars costs the same upkeep and fights worse. The player should feel that arithmetic and then have to decide whether they can go through with it.
- **The tension is deliberate:** the systems say *replace him*, and the nickname, the trait, the perks he picked and the two battles he survived say *don't*. A game where the sentimental choice is also the correct choice has no dilemma in it.
- **This is why promotions are random** (§8) - you cannot plan a roster, only inherit one.
- **Corollary for the scars system (§11b):** scars must be mild individually and painful in accumulation, so that the "is he still worth feeding?" question arrives gradually rather than at the first injury.

### The front door - a menu, a practice field, and the rules written down

**The game opens on a menu, not in the tavern.** Continue the road · a new company · the practice
field · **? RULES** · the wagon. That is not housekeeping: booting straight into the prologue meant
a saved company could only be picked up by *reloading the page*, there was nowhere to read the
rules, and the only way to see a fight was to spend a road getting to it.

**The practice field** is the piece worth defending. It is any of the eight fights, against any of
six companies - including a copy of the one you have out on the road - with **nothing riding on
it**: nobody is scarred, nothing is looted, no day passes and the save is never written. It exists
because this game asks a newcomer to hold eight rules in their head at once and then charges them a
run to get one wrong.

*It is also the parked Battle Lab, reframed.* The outside review proposed the same machinery as a
**tool for the builder**, and that is exactly why it stayed parked. A place in the game where you
can lose for free is a different feature with the same code - and the reframing is the whole
difference between a dev menu and content.

**? RULES** is the third onboarding layer. Layer 1 names the screen on arrival, layer 2 whispers
the rule at the moment it first bites, and layer 3 is for somebody who wants to go and look: how a
turn works · how a hit works · how mood works · **nobody dies in a fight** · what the road costs.
Written once, shown only when asked. The fourth of those is the rule players least expect and the
reason the fights are allowed to be dangerous, and until now nothing in the game said it out loud.

### The opening - a coin, an insult, and a world that is not what it looks like

**The campaign opens in a tavern, and the whole scene is human, poor and ordinary on purpose.** A man in a good coat drops a coin on a table, names a job east of Grausen Hold, and the Captain plus two others stand up. He then calls them scum to their faces, pleasantly, in front of the room.

Three answers, and none of them is the "correct" one:

| Answer | What it costs | What it pays |
|---|---|---|
| **Say nothing** | −9 company morale | the advance in full, 60 crowns |
| **Make a joke** | a coin-flip: a cudgel in the ribs, or nothing | 40 crowns and a bruise, or 90 crowns and a laugh |
| **Put him on the floor** | **~half the company's hitpoints** | 30 crowns, +26 morale, and a story that travels |

**The punch is a written outcome, not a playable fight.** It was briefly built as a real battle against ten guards; that was wrong twice over - ten-on-three is not a tactical problem, it is a foregone conclusion, and making the player push buttons through a loss they cannot affect is worse than simply telling them what happened. The cost is **hitpoints**, which mend on the road, so a brand-new company with no metaprogression behind it can still afford to find out what happens. That is the KCD2-opening shape: a consequence you can see coming, that you may want anyway.

**The tone note this scene exists to establish: the Captain does not like most other humans either.** The cynicism is not "humans vs. the other races" - the nobleman is his own kind, and he is the worst person in the room. Human NPCs across the game should mostly be tiresome, grasping or cowardly, and the ones who are not should be the exception that gets remembered.

### The reveal - the world is stranger than the tavern implied

Nothing in the prologue mentions ratkin or ogres. **The player is meant to walk out of that room believing this is an ordinary low-magic country with one people in it.** The map does not correct them either - the act's final node reads only *The Snare* until they arrive.

The correction is the **second node, and it is a battle**: a ratkin foraging party and an ogre steading-line have found each other on the road over a dead deer.

### Recruitment - Blood on the Road, then the Muster Field

You start **small, human, and badly equipped**: the Captain, a spearwoman, a battle-mage and an archer - four humans, most in rags. Four covers the roles the first fight needs to teach (line, reach, bow, spell), and the archer carries **Ambition**, so the personality that reads differently on every race is in the party from the first minute.

**Charisma starts at 13.** Four humans cost 8, leaving five - enough for an ogre *and* a ratkin, or a fistful of ratkin. Recruiting is a decision from the first road rather than an arithmetic problem.

**Blood on the Road is the first real battle, and you pick a side inside it.** **The allies are AI-driven and are not yours to command** - they are on your side of the board, they take hits, they go down, and you never spend their turns. That is most of the point of standing next to them.

| Choice | The fight | Who joins |
|---|---|---|
| **Wade in for the ratkin** | three fight beside you, two ogres against you | **two** of them - Skree and Nib |
| **Wade in for the ogres** | two fight beside you, four ratkin against you | **one** - Bruht |
| **Do nothing. Watch.** | the ogres win, then come for you - **nobody beside you** | one half-dead ratkin out of the ditch |

**Standing back is not an exit.** It is the same fight arrived at alone, and the option says so. That keeps neutrality a real position with a real price instead of a free skip, and it means every version of this node ends with the company having killed somebody it had no word for that morning.

**This is the tutorial fight, so the two helping branches are deliberately easy** - autobattled at 0% damage taken. The risk lives entirely in the branch the player chose with a warning on it.

**Why this is a battle and not a paragraph:** "no race is an enemy race" (§14) is the pillar the whole world rests on, and the only way to make a player *believe* it is to have them spend a fight watching a ratkin die covering their Captain. Faction standing plays no part in it (see `03_WORLD_LORE.md` §4b, cut) - it is simply who you helped.

- A recruitment node offers **three randomly rolled strangers** - race, class, stats, trait and nickname all generated. Prices are tuned to sit inside the purse most of the time, so the choice is "which one", not "can I afford any".
- **The second hire in one visit costs half again** - not double. Doubling made the second body a non-decision; the point is that it should be a tempting bad idea, not an obvious no.
- **A ratkin cuts its own price by a fifth to be the second hire.** It has just watched somebody else get picked first and it cannot stand it. This is not generosity, and the game should never call it that - it is the cheapest possible characterisation of a people whose entire history is glorious wars against each other.
- Every hire costs **party room** (permanent roster space) *and* **daily upkeep**, so a big company is a running cost, not a one-off purchase.
- Placing recruitment **after the first monster fight** is deliberate: you meet the Fen-Mother short-handed, survive it, and *then* the strangers on the wall have heard the story. Reputation earns you the option.

### Camp incidents - the RimWorld beat between places

Travelling between two nodes rolls a **camp incident** about half the time - **once per day of the
leg, capped at three** *(changed 2026-07-31, build 8f.51)*: not a fight, not a merchant, just the
company being a group of people.

> **A longer road has to be more road.** It used to roll **once per leg whatever its length**, so a
> four-day road charged four times the wages of a one-day road and offered the same single chance of
> anything happening on it - the long option at every fork was strictly dominated. Beyond the first
> stop the deck leans to the small **vignettes** rather than full incidents, because the incident
> deck is finite and once-per-run, and because the vignettes are where the small finds live: a long
> road should pay some of its own wages.
 Two of them have stopped speaking. The salt pork has gone green. A shoeless fiddler has attached himself to the fire and asks for nothing. Somebody has come back from the treeline with a knuckle-bone that has a crown scratched into it.

Each one is **named characters doing specific things** - the text pulls real party members in by nickname - and each resolves into resources, morale, an injury, or a trinket. This is where the "unpredictable development" actually lives: the map gives you *places*, the camp gives you *a company*.

## 11b. Three systems that make the company *yours* - POST-MVP

> **None of these are in the MVP.** They are recorded here because they all attach to the
> same place - the character - and designing them now stops the MVP from making choices
> that block them later. Each has one "do not forget this" hook noted for the MVP build.

### Personalities - NOW BUILT, and the naming matters

> **Promoted out of post-MVP.** The user's rule, verbatim: *"there are no good or bad
> traits - there are personalities."*

The distinction is not cosmetic. **A trait is a modifier with a sign, and players can rank
them. A personality is a way of behaving that costs something, and the cost is the point.**
If a player can name the best one, they are traits again and the roster stops being people.
So every entry must answer *"what does this person DO that nobody else does"*, not *"how much
is this person worth"* - and some of them are, on paper, bad deals. Those are the interesting ones.

### Not every personality fits every body

**Each personality declares who can carry it** - allowed classes, allowed races, or the
inverse. *Insists he is a vegetarian* is an ogre joke and only ogres get it. *Wind-touched*
and *Magpie-minded* are caster things. *Twitchy* is not a word that describes an ogre. A
personality with no gate goes anywhere.

This is not tidiness. It is what stops a personality being a second stat block: when
*Magpie-minded* could land on a spearman it did nothing at all, which made it a dud roll
rather than a character.

### The same word means different things in different bodies

**`byRace` overrides any field of a personality for that race**, so one personality can be
three creatures. Ambition is the worked example, and it is worth reading as a design pattern:

> **Ambition** (archers only - it is a personality about wanting to be *seen* doing it, and
> the bow is where that shows). Everyone who has it **shoots worse up close** - nerves - and
> is **lifted by landing one**. What that lift *turns into* is the race:
>
> | | Up close | Per hit | What it becomes |
> |---|---|---|---|
> | **Ratkin** | −7 to hit | +12 morale | loud about it - from the **third hit**, +10% damage for the rest of the fight |
> | **Ogre** | −7 to hit | +6 morale | counts its own **misses**. On the third it stops trying to look good: **+22% damage, and it will never disengage again** |
> | **Human** | −5 to hit | +7 morale | +4% damage per hit, capped at 12%. It never becomes anything more dramatic, which is the human problem |
>
> **Why this is the good version.** One word - *ambition* - produces three different units.
> The ratkin's ambition is social and needs an audience; the ogre's is a grudge with
> arithmetic in it and is triggered by *failure* rather than success; the human's is the
> ordinary kind that never quite arrives. None of them is strictly best: the ogre is the
> most dangerous but only after it has already missed three times, and by then it has also
> lost the ability to retreat. The player learns to read *"an ogre archer with Ambition"* as
> a specific, nameable thing that behaves a specific way - which is exactly the RimWorld
> target of §11a, reached through mechanics rather than prose.
>
> It also gives the roster a reason to care about race beyond stat leans: recruiting a
> **ratkin** archer with Ambition and an **ogre** archer with Ambition are two different
> tactical decisions with the same words on the tin.

Built and working in the slice:

| Personality | Who | What they do |
|---|---|---|
| **Ambition** | archers | see above - three race expressions |
| **Does not run** | not ogres | cannot rout at any morale. −2 STR - there is not much of them |
| **Has no stomach for it** | not brutes | takes 18 morale of their *own* on every kill instead of the usual lift, −7% damage per kill for the rest of the battle. +8 MOR to start: calm right up until it matters |
| **Big** | humans, ogres | +16 hitpoints and more of them to hit: −2 AGI |
| **Courageous** | melee classes | +14% melee damage, and **DISENGAGE is not on their sheet** - not greyed out, absent |
| **Kind** | anyone | +6 morale to *everyone* within 2 hexes at the start - **yours and theirs alike** |
| **Magpie-minded** | casters | forgets their spells every round and remembers different ones |
| **Light-fingered** | anyone | +15% crowns from every event, −4 MOR - nobody trusts them |

**Kind is the clearest statement of the rule**: steadying the people currently trying to kill
you is a genuine cost, inseparable from what makes them worth having.

**On screen, a personality is one line.** The character sheet and the battle panel show the name
plus a short clause - *"Ambition - shaky up close, lifted by landing one."* The full text, with
the numbers and the race variant, is on **hover only**. A roster screen that opens with a
paragraph per person is a wall, not a cast.

**Light-fingered is the model for a *good* personality** *(the user's own verdict)*: the
benefit is real and constant, the cost is social and lands on everyone else, and the reason
for both is the same single fact about the person. Numbers to be polished; the shape is right.

### The original design note (RimWorld approach)

Every character carries a **personality trait** that is not a stat bonus but a *behavioural lens*. It does three things:

1. **One unique battle action.** Each personality grants exactly one ability nobody else has. *Vengeful* unlocks a free strike when an ally drops beside them. *Craven* unlocks a genuinely good disengage. *Devout* can steady a routing ally once per battle. This is how a personality earns its place on the character sheet - it is a *tactical* fact, not just flavour.
2. **Reactions to events and quests.** Choices at nodes are commented on, approved of, or refused. A *Greedy* character resents you handing back the purse; a *Kind* one loses morale when you strip the chapel roof. Reactions feed morale, and repeated clashes should eventually make someone leave.
3. **Interaction with the other two systems below** - see the cross-links.

**Author's note (recorded from the user):** personalities will be **trained on film characters** as an authoring method - a personality is written by pointing at a recognisable screen character and extracting their behavioural rules. That is a *writing* technique, not a runtime feature: the game ships hand-authored personalities, and no player-facing text should name a real film or actor.

**Design guardrail:** personalities must never be strictly ranked. If players can name the "best" personality, they are traits, not people. Each one should be a genuine trade - the *Brave* character who never routs also never retreats when they should.

### Scars (Battle Brothers / Mewgenics, dialled down)

When a character is **downed but survives**, they take a **permanent scar** - a small, permanent debuff plus a permanent piece of identity.

- **Deliberately less severe than Battle Brothers.** A scar should be a story you tell, not a reason to fire someone. Target magnitude: −3 to −6 on one stat, or one narrow situational penalty - never a build-ender.
- **Every scar is legible and named**: *Ruined Eye* (−5 melee skill), *Bad Knee* (−1 speed), *Rat-Bite Fever* (−8 max hitpoints), *The Shakes* (−6 resolve).
- **Scars can carry a compensation.** A character who survived being downed by ogres might take *Ogre-Marked*: −4 resolve generally, but immune to fear from the thing that did it. This keeps a scarred veteran interesting rather than merely worse.
- **Cross-link:** scars should interact with [personalities](#) - a *Proud* character reacts badly to a disfiguring scar; a *Grim* one is barely troubled by it.
- **MVP hook:** the MVP must already track *downed vs. dead* as distinct outcomes even though it does nothing with the difference yet.

### Pets

> **A first, deliberately narrow slice of this shipped in the prototype**, ahead of the rest
> of §11b: the Captain (only) has a single pet slot. The pet does not fight - it stays near
> the Captain, gives a small passive morale/dodge aura "from the back," and can be lost by
> unequipping it (with a confirm, since it does not come back). The cub from the Fen-Mother
> encounter is the first fillable pet. Everything below this note - muster cost, camp-level
> effects, quest-key pets, per-personality bonding - is still unbuilt future scope; the
> shipped slice proves only that a pet occupying a non-combat support role is fun before the
> rest of the system gets built out.

Animals that travel with the company. They are **not a fourth party member** - they are cheap, fragile, and useful in a different dimension.

- **In battle:** a pet occupies a hex and acts, but with a small action budget (1–2) and a narrow role - a war-dog that pins a target's zone of control, a carrion-crow that reveals the field, a fen-lizard that tanks one hit. They should feel like an *asset you can lose*, not a unit you optimise.
- **Muster cost:** pets cost muster points, but far fewer than a person (2–6 against a human's 20). The real question is whether a pet is worth the points a third of a ratkin would cost.
- **At camp:** each pet gives a camp-level effect - a dog improves scouting, a mule raises carry capacity (more materials home), a goat converts fodder into food.
- **On quests:** pets are **event keys**. Some nodes only open, or only resolve well, if you have the right animal - a tracking dog finds the trail, a crow follows the smoke.
- **Cross-link:** pets bond with a *specific* character, and that character's [personality](#) determines the bond. A *Cold* character never bonds; a *Kind* one takes a real morale hit when the animal dies - which is precisely the intended cost of letting a player love something fragile.

### Why these three go in together

They share a single design goal: **make the loss of a specific character hurt.** Personalities make people distinct, scars make survival visible, pets give a character something to lose that is not themselves. Individually each is a nice feature; together they are the reason a player restarts a run instead of accepting a death.

## 12. MVP definition (locked in Step 5, sketched here)

**MVP = playable Act 1:** one node map (~30-40 nodes, 3 regions), 5 playable characters from 3 races, 6 professions, 12-15 enemy types, 1 act boss, 10 events, 2 quest-lines, 1 merchant type, camp/rest choices, 4 resource types, and 2-3 craftable items at The Wagon. Single save slot, PAINTED art (see the addendum in 02), no voice, synthesised music.

**Explicitly NOT in MVP:** acts 2-3, extra races, weather/seasons, full base-building (The Wagon stays a menu with 3-4 stations, not a buildable settlement), romance/relationships, faction standing (§4b in `03_WORLD_LORE.md`, cut), and most of the §11b systems - **scars and personalities in full, and everything about pets beyond the single Captain-pet slice already shipped** (see the note at the top of the Pets subsection above). The MVP's only obligation to scars/personalities is to track *downed vs. dead* separately so scars can be added without a save-breaking change.

## 13. Art direction (detailed in `02_ART_DIRECTION.md`)

- **Painted low-fantasy art:** large scenes and portraits carry material weight; small battlefield
  models retain the same design language through simplified shapes.
- **Line before noise:** silhouette first, then one gesture line, then connected value masses.
  Texture is selective and must follow form, material, light or motion. Random dots, all-over
  scratches, fur-by-fur marks and uniform micro-detail are not finish. A unit suggests a person or
  creature instead of fully describing one, so the player's imagination keeps working.
- **Side before ornament:** on ordinary people and faction creatures, one major clothing layer makes
  allegiance readable at a glance: blue or teal for allies, rust or red for enemies. It must survive
  at live size and may not depend on small trim or icons.
- **Size roughly signals danger:** dogs read smaller than ratkin, ratkin smaller than humans, and
  humans smaller than ogres and major armoured threats. A misleading exception must be deliberate.
- Palette: desaturated Banner Saga earth tones; magic and weirdness get the only saturated colours
  on screen.
- Character presentation: painted **bust portraits** for dialogs plus small painted **battle
  models** on the grid. Species, weapon, posture and one emotion must read at the live size.

## 13b. Sound and music

Everything is synthesised at runtime in WebAudio - the published build cannot load audio files,
and it turns out not to need them.

**The score is a journey, not a loop - and not a wander either.**

**Thirteen chords**, and four of them are outside A minor on purpose: the borrowed **V** (with the
G# that pulls hard for home), the **Neapolitan bII**, a **diminished seventh**, and a Phrygian
**iv** with a flattened sixth sitting on it. The key stays home; the visitors are what make
leaving it mean something.

**The harmony travels to a destination.** An earlier version used a transition map - each chord
asking "where next?" - and that can only ever wander, however many chords you give it, because it
has no memory and nowhere to be. Instead a whole **route** is planned in tiers of rising tension:

> home → one step out → wandering → strange country → **THE GOAL** (the borrowed dominant, or the
> diminished seventh - the two chords nobody can live in) → a cadence → reprise

Seven or eight stations at ~7.4 seconds each is a journey of **52–59 seconds**, which is about the
longest span an ear holds as a single thought. Then a fresh route is planned, so the destination
is never the same twice and the reprise never lands the same way. The lowpass filter opens as the
route climbs and shuts on the way home, so the arc is audible as brightness as well as harmony.

**Dissonance lives in the suspensions.** Every chord carries a *tension set* - ninths, flat
ninths, sharp elevenths - notes deliberately **not** in the chord underneath. One is played
occasionally as a **long note landing off the beat**, held past the bar line so the next chord
change resolves it. Never on a strong beat, never short, never loud, rarely more than one at a
time. That single gesture is what makes generated harmony sound written, and it is also the thing
most likely to become noise if overused - this is background music, and the restraint is the
craft.

> **The Ab in the VI chord is a mistake and must never be corrected.** It does not belong in A
> minor at all. It was a typo. It sounds better than the correct note and it is now the one
> moment in the loop that catches the ear. This is written down because it looks exactly like a
> bug, and somebody will eventually try to fix it.

**The road and the battlefield are different pieces**, not the same piece at two speeds:
- **The road** has no pulse at all. A bell wandering the mode, an answering octave, distant low
  notes, wind. Nothing keeps time, because nothing out there is in a hurry. It can reach III,
  the only bright chord.
- **The battlefield** is percussion-led: a war-drum on the beat, a rattle offbeat, a sawtooth
  stab, a low horn on the turn of the phrase. It **refuses III entirely** and keeps falling back
  onto i, so it never resolves anywhere pleasant. The bell is never heard here - the bell is the
  road, and sharing it would make the two places sound like one.

**Blows are voiced by the body they land in.** An ogre is a slow heavy thud at 320 Hz, a ratkin
is small and dry and high, a great beast is hide over something enormous, a human is the
baseline. And **taking a hit sounds different from landing one** - closer, duller, with a wince
on it - so the player can tell whose blood it is without looking.

## 14. Decisions log

### ✅ Combinations are rewarded; repetition is not punished (decided 2026-07-31)

The outside review proposed **the second use of the same action is worth 50%**. Rejected on the
user's call, and the reasoning is worth keeping because it generalises:

> **A penalty taxes the player who has not learned the system yet. A bonus pays the player who
> has.** Both push toward the same behaviour - stop pressing one button - but the penalty makes
> your second action feel worse, while the bonus makes your *first* action feel load-bearing.

So repeated actions stay at full strength, and what pays is **one unit acting on a mark another
unit made**: a displaced target, a poisoned target, a target already busy with somebody else, an
enemy shoved into ground they did not choose. **One follow-up bonus per target per round**, and the
log names the combination the first time it fires, because a combination the player cannot name is
a combination they cannot plan.

**The consequence to respect from here on:** every new ability is judged on *what mark it leaves for
somebody else*, not on its own damage. An ability that only helps its own user is a worse ability
than one that is worthless alone and strong in sequence. See backlog #45–#48.

> **⏸ The marks *rule* is deferred; this design principle is not.** The user parked #45's
> implementation on 2026-07-31 - it is a rule everything plugs into, and the things plugging into it
> (race skills, the spear, mutations, losable parts) have not arrived yet; it returns inside **#50,
> the balance pass**. **Keep designing to the paragraph above regardless.** Every verb written
> between now and then should already be worth more in sequence than alone - that is what makes
> the rule a payout to switch on later rather than a system to retrofit. What is deferred is *the
> bonus*, not *the shape of the abilities*.

**The combat batch that follows from it.** Each race has **one signature verb and none of them is a
damage button** - humans **KICK** (one hex straight back, away from you, cooldown 1, an ogre is not
moved by it), ogres **PICK UP AND THROW** (anything on an adjacent tile: one of yours, one of
theirs, or **a boulder standing on its own** - range 3 for a stone against 4 for a body, and **it
comes back down on the ground**, so an ogre is the one body that can change what the map is),
ratkin **POISON** (**+15% damage taken** per cut, two rounds, stacking, limited by the action cost
rather than a cap). **✅ BUILT 2026-07-31 - #46**, with `sizeOf`/`maxSize` as the one new word:
*an ogre is never moved by anything, and only a great beast could lift one.*

**Still unbuilt from that batch** *(specs in the backlog; the gate applies - rules + a picture
before code)*: the **spear** gains its missing weakness - one accuracy band lost against an
adjacent target, *"too close for the spear"* - making it strong at reach 2, weak at reach 1, and
the owner of the tool that converts one back into the other. *(**Bodies stay where they fall** also
shipped, #48: purely a picture, and by round eight the board tells you where the fight has been.)*
(~~#46~~ · #47 · ~~#48~~)

### ✅ Combat grid: **HEXAGONAL** (decided)

Six neighbors instead of eight, no diagonal-distance problem, and every tile touches its neighbors evenly - which is exactly what melee wants. Flanking, encirclement and shield-wall positioning all become clean and honest on hex: surrounding an ogre takes exactly 6 bodies, and "am I flanked?" has an unambiguous answer.

Worth noting: **Battle Brothers itself uses a hex grid**, so our closest combat reference is already validating this. Square grids suit games where the interesting math is line-of-fire and cover (shooters, XCOM); ours is a sword-fighting game where the interesting math is adjacency and facing.

**Consequences to respect from here on:**
- Facing has 6 directions; flanking bonuses derive from which of the 6 arcs the attack comes from. **On screen this is a wedge showing where they look and a red arc marking their back**, because a mechanic worth +30 to hit has to be readable at a glance.
- ~~Zone-of-control (an ogre threatening all 6 adjacent tiles) becomes a core tactical language.~~ **CUT** - replaced by **engagement + parting swings**: walking away from an adjacent enemy gives them one free swing (one per enemy per turn), and DISENGAGE prevents it. Same tactical language, no invisible aura.
- Art must be authored for hex: terrain tiles need to be hex-shaped or hex-masked, and sprite feet must sit on the hex center. *(This changes the tile spec in `02_ART_DIRECTION.md` - noted there.)* **Tokens deliberately overflow their hex** - the hexagon stopped clipping them, because the person mattered more than the tile.

### ✅ Ratkin: **one race, many clans** (decided)

Player ratkin and enemy ratkin are **the same race** - no "outcast" exception. Morality here is *factional, not racial*, which is much more in keeping with the world's cynicism.

- You will meet **friendly ratkin camps** (trade, recruitment, rumors, quest-givers) and **hostile ratkin camps** (the swarm fights) in the same act, sometimes on adjacent nodes.
- Having a ratkin in your party should *matter* at these nodes: dialog options, better prices, safe passage - or a clan that considers your ratkin a traitor and hates you specifically for it.
- This applies as a general principle: **most species have both friendly and hostile factions.** Ogre mercenary camps and ogre raider warbands both exist. The player learns to read banners and camp markers, not species.
- Design bonus: it lets us reuse enemy art and stat blocks as allies and NPCs, which is real MVP savings.

### ✅ Engine: **Godot 4** (decided)

Chosen for this project specifically:
- **Free forever, no royalties, no licensing surprises.**
- **Best-in-class 2D** - this is a 2D game (**painted, not pixel** - decided later; see §13), and Godot treats 2D as a first-class citizen rather than a flattened 3D layer.
- **Built-in hex tilemap support** - Godot's TileMap handles hexagonal layouts natively, which we now need.
- **GDScript is quick to learn** and fast to iterate in, which matters more than raw performance for a turn-based game.
- **One-click Windows export** - you'll be able to build and play it on your laptop from day one.
- Strong fit for solo/small-team scope; large asset store and community for turn-based and grid tooling.

*Rejected:* Unity (heavier, licensing history, overkill for 2D), Unreal (wrong tool for pixel 2D), GameMaker (weaker for the data-heavy systems we need - inventories, professions, crafting).

### ✅ Art direction: **PAINTED** (decided)

The user's call after seeing both directions: *"more painted, I feel."* Painted illustration is the primary direction - the style bible's four atmosphere keys (Fogbound Teal, Dust & Gold, The Bloom, Stolen Daylight) become painting prompt keys, portraits and event art are painted, and the battle board follows the painted look. The pixel-art specs in `02_ART_DIRECTION.md` Part 1 are **superseded** for portraits and scenes; units on the hex board should read as painted tokens/busts (Battle Brothers' own solution). Consequence accepted: the whole hex layer follows the painted look.

### ✅ No healers (decided)

Wounds carry between battles and **mend slowly with time** (~6 hp/day on the road). There is no healer NPC and no scar repair - a healer would turn the repair-or-replace dilemma into a gold tax. Scars are permanent; hitpoints are merely slow.

### ✅ One backstab, not two (decided)

The facing system's rear arc IS the backstab. The cutter's BACKSTAB ability requires the same rear hex as everyone else's positional bonus - his just cuts far deeper. One mental model: get behind them.

### ✅ Decisions have weights, and a third of the road is deliberately light (decided 2026-08-12)

From the user's design conversation on decision fatigue, written into §5 as "The choice economy".
The loop is **Choose → Fight → Suffer → Adapt**; events carry a LIGHT / MEDIUM / HEAVY weight and
the road mixes them; heavy choices stay rare so they are remembered; a door that is not a decision
(a duplicate, a fee-bearing nothing, a second button onto the same battle) is cut. Applied to the
build the same day as **#123**, in two rounds: **fourteen road events simplified (48% of the
multi-choice ones), sixteen doors removed or merged.** The user's own examples set the tone: the
sling-line is "fight or go around", the Drowned Chapel is a salvage pickup, the Fen-Mother lost
her duplicate battle door. Round two added camp, saltwives (intel merged into the honest
purchase), ratcart, shrine and bogbody, all 4→3. The sixth round-two candidate was refused on
purpose: everything left on the remaining cards is a distinct decision class, and cutting one
would have taken a real decision with it.

### ✅ A card's length is a measured number, and the receipt is chips (decided 2026-08-13)

The user's own brief, executed as **#143**: *"check all events texts - and reduce them 30-70%
each. Feel free to cut. Idea - easier to read, eseier to make choices"*, and *"If resurses are
consiquences of the choise - make them more vissually readeble (like when they are after battle
loot)."* Written into §5 as choice-economy rules 7 and 8, and into §7 under the intent-not-receipt
section.

**Measured, not felt: 5,474 words of card prose became 3,652 across all 34 road cards**, and the
bands the road now runs in are LIGHT 45-90 · MEDIUM 90-140 · HEAVY 140-175. The outcome's numbers
left the prose entirely and became the aftermath's own chip row, built beside the payment rather
than off the label, so the two can never disagree. **The pillar found its boundary in the same
pass**: a multi-door card still shows nothing before the pick, and a one-door pickup wears its
loot on the card, because there is no score to hide where there is no decision.

⚑ **The general lesson, and it is why this is a decision rather than a cleanup: reading cost is
part of a card's weight, and it was the half nobody was measuring.** The choice-economy rules from
#123 counted doors; a two-door card written at 259 words was still charging the player a heavy
card's attention for a light card's decision. Procedure:
[`.claude/rules/event-cards.md`](../.claude/rules/event-cards.md).

### ⏳ Still open

1. **Final title** - ~~deferred~~ **decided 2026-08-18: RabbleBound** (#191). This entry predicted the name would fall out of the lore once the vocabulary settled, and roughly that is what happened: the company is a rabble, bound by one contract, and the word says what the game is about in a way the island's name never did. The island keeps *Grimtoll*.
2. **Battle length band vs morale-break endings** - parked as its own balance topic, by the user's call.
