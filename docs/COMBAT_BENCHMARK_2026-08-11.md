# The combat benchmark - what three neighbours are praised and hated for, and where RabbleBound's numbers sit

**Written 2026-08-11. Backlog entry [#89](00_PLAN_AND_BACKLOG.md).**

**Why it exists, in the user's words.** Two asks, one after the other:

> *"Can you make analysys of battle system rewiws of: wildermyth, wartales, battle brothers. What is
> people like and dislike, specifically about the battle? Gather list of them"*

> *"Add also avarage number of turns / action of units / time for battle / skills in avarage per unit
> - for these games. So we can compare longness and speed and skills easily between that games and
> mint. [...] I feel, this is important one"*

The second ask is the one that makes this a document and not a chat answer. **A list of opinions is
an argument. A table of measurements is an instrument.** RabbleBound already has one measured
instrument (`tools/harness.js`) and one shipped lesson that says to use it: #88's ⛔ **measure the
box before you argue about the font**. This is that lesson applied to the shape of a fight instead
of the size of a label.

---

# PART ONE - what players actually say

## Method and its limits

Aggregated from critic reviews, Metacritic user reviews, Steam discussions and the official Battle
Brothers developer forums. **This is a read of recurring themes, not a counted sample.** Weight was
given to complaints that appear repeatedly across independent sources. Nothing here is telemetry and
none of it should be quoted as a percentage.

---

## BATTLE BROTHERS

### Liked

1. **Positioning is the whole game.** Hex grid, zone of control, elevation, terrain penalties.
   Reviewers call it turn-based tactics at its most demanding and praise it for leaning on real
   battle-line tactics: hold a line, refuse a flank, use a chokepoint.
2. **Morale as a second health bar.** Enemies break and run when you kill their friends or flank
   them. Your men do too. The single most cited "nobody else does this" mechanic.
3. **Fatigue as a real budget.** You cannot spam your best attacks. Armour weight costs stamina.
   Reviewers like that the resource is physical and legible.
4. **Permadeath makes every hit matter.** Very consistent theme: the tension comes from one bad roll
   costing a named man you spent forty hours building.
5. **Weapons have distinct verbs, not just numbers.** Spear wall, shield split, hook, knockback,
   net. People talk about choosing a weapon for the situation, which is rare.
6. **Injuries and the aftermath.** A survivor with a broken arm is a different man. The cost lands
   after the fight, not only during.
7. **Every fight is a small unique puzzle**, because enemy compositions differ wildly. Nomads, orcs
   and undead each demand a different formation.

### Disliked

1. **RNG feels like a liar.** By far the loudest complaint. *"Three coin flips."* Players report
   missing at 60-75% repeatedly and believe the displayed number is fake. It is not fake. The game
   shows raw honest odds where XCOM quietly cheats in the player's favour. **The perception of
   unfairness is the actual bug.**
2. **Archers at 20-30% hit chance** even from a hill, so ranged play reads as wasted turns.
3. **The mop-up.** Routed enemies run and you chase them for ten to twenty minutes. *"Every battle
   with bandits ends the same way: chasing down archers."* One player: seven enemies in a swamp took
   an hour.
4. **The ranged chase dance.** Enemy archers step back when you approach and forward when you do
   not. You either eat arrows or waste turns. There is no good answer.
5. **Random deployment.** The AI gets a good position, you get scattered and sometimes half
   surrounded before turn one.
6. **The game teaches nothing.** Fatigue, initiative, the armour-versus-HP damage split and morale
   are all invisible until they kill you.
7. **Specific enemies feel like a different, worse game:** Alps, Lindwurms, Schrats, Krakens,
   Webknechts. The Kraken especially reads as "you win or lose on your spawn tiles."
8. **No surround bonus below four attackers.** Three men on one target get nothing. The
   "Overwhelmed" penalty exists but only at 4+, so it is invisible exactly when players expect it.
9. **Late-game battles get big and slow** without getting more interesting.

---

## WILDERMYTH

### Liked

1. **Interfusion is the standout mechanic.** Mages cannot cast into empty air. They bind to a tree, a
   pillar, a fire on the map and turn it into the spell. It makes the battlefield a scavenger hunt
   for material. Universally the most praised system in the game.
2. **Walling.** Stand next to an ally and both get damage resistance. It pulls you together while
   flanking pulls you apart. Reviewers love that two good ideas fight each other every turn.
3. **Swift action economy.** Many abilities cost a swift action, so you still move and attack. Turns
   feel generous instead of stingy.
4. **The characters carry the combat.** Injuries become permanent transformations, a stone arm, wolf
   legs. You do not remember the fight, you remember what it did to somebody.
5. **Readable and non-punishing by default**, with difficulty available for those who want it.

### Disliked

1. **It goes stale fast.** The loudest theme. *"Fun for the first eight hours, then monotonous."*
2. **One dominant strategy.** *"Move forward, kill everything in range."* Once found, the tactical
   layer stops asking questions.
3. **Too few abilities.** Not much to choose from, not much to upgrade.
4. **Ranged dominates, melee is a trap.** After Act 1 the reliable play is to give everyone a bow.
   Enemies walk past the Guardian and kill the hunter anyway. Players call it "janky ranged
   exploitation."
5. **Defence does not hold.** Open maps, diagonal movement, no zone of control, so nothing actually
   stops a body from getting through.
6. **Barebones presentation.** Almost no animation, so hits do not feel like hits.
7. **Inverted difficulty curve.** Either you outclass the enemy completely or you lose limbs.

---

## WARTALES

### Liked

1. **Engagement is easy to learn and hard to master.** Attack an unengaged enemy and you lock each
   other in place. Everything grows from that one rule: tanks pin, flankers slip past, disengaging
   costs you.
2. **Free action ordering.** Move, attack, move again, use a skill, retreat, in any order.
3. **Valor Points as a shared party resource**, so spending is a party-level decision.
4. **Pre-battle deployment and choosing who goes first.**
5. **Build experimentation.** Large parties allow odd compositions.
6. **Battlefield hazards** when they appear: poison clouds, insect swarms, mud, blizzards.

### Disliked

1. **Every fight feels the same.** The loudest complaint by a wide margin.
2. **Enemy variety is thin and cosmetic.** *"No matter bandit or law enforcer they all will have
   polearm, rogue, heavy infantry and archer."*
3. **One-size-fits-all strategy.** A single composition solves every encounter.
4. **Fights get longer, not harder.** Late game adds bodies, not problems.
5. **Volume.** Reports of fifty to sixty fights per level.
6. **Terrain barely exists** in the first region. Defenders point at later regions, which is itself
   an admission that the first ten hours look empty.
7. **Weak AI**, easy to outplay once the pattern is known.
8. **Level-scaling flattens everything**, so enemies never feel like a different tier of threat.

---

## The eight patterns that repeat across all three

These are the transferable findings. A complaint that appears in one game is that game's problem. A
complaint that appears in all three is a property of the genre.

| # | Pattern | Evidence |
|---|---|---|
| 1 | **Repetition kills tactics faster than shallowness does** | All three draw "repetitive". Wartales and Wildermyth draw it at eight to twenty hours. Battle Brothers survives longer only because its factions demand genuinely different formations. **Enemy composition variety is the anti-repetition mechanic, not map variety** |
| 2 | **A dominant strategy is a death sentence** | Wildermyth: everyone gets a bow. Wartales: one comp beats everything. Battle Brothers avoids it because spearwall against orcs and shieldwall against archers are different answers |
| 3 | **Honest RNG reads as dishonest** | Battle Brothers shows true odds and gets accused of cheating. XCOM cheats for the player and gets thanked. **If the number is visible, people judge the game on the streak, not the math** |
| 4 | **Length is not difficulty** | Wartales' loudest complaint is "longer, not harder". Battle Brothers' is the twenty-minute mop-up. **The end of a fight is where all three bleed players.** Once the outcome is decided, every remaining turn is a tax |
| 5 | **Cleanup after a rout must be free** | Nobody enjoys chasing a fleeing archer. Battle Brothers has this exact wound and never closed it |
| 6 | **Positioning systems need teeth** | Battle Brothers has zone of control, Wartales has engagement, both get credit. Wildermyth has neither and draws "defence does not work" |
| 7 | **Two rules pulling opposite ways beats ten rules** | Wildermyth's walling against flanking is its most praised design, and it is two lines of rules |
| 8 | **What people remember is the cost, not the tactic** | Permadeath in Battle Brothers, permanent transformations in Wildermyth. Wartales has neither and is the one called soulless |

---

# PART TWO - the numbers

## What was measured and what was estimated

**RabbleBound numbers in bold are measured.** Five runs of each of the eight canonical fights through
`tools/harness.js`, both brains at full disposition, render/fx/sfx/terrain stubbed. Method is in
`measure()` below. **The player-minutes figure is the one derived number** and its arithmetic is
shown so it can be argued with.

**The other three games:** AP budgets, party sizes and skill structures are documented mechanics.
Rounds and minutes are community-reported ranges, not developer telemetry. Treat them as the right
order of magnitude, not as decimals.

## The table

| | Battle Brothers | Wildermyth | Wartales | **RabbleBound** |
|---|---|---|---|---|
| Your units on field | up to 12 | 5 | 4-6 early, 12-16 late | **6** (8 in the opener) |
| Enemy units | 5-25+ | 4-10 | 5-15 | **1-10**, measured avg 5.8 |
| Turn budget per unit | 9 AP | 2 AP + 1 free swift | 1 action + movement pool | **2 actions** (captain 3, boss 5) |
| What that buys | 2 attacks, or 1 attack + 2 tiles | move + attack + 1 swift | 1 skill + free-order movement | **2 acts, any mix of move and strike** |
| Movement per turn | 4 tiles max (2 AP flat, 3 rough) | tiles = speed, per AP | metres, spendable in any order | **3-4 hexes**, second move costs 1 |
| Actions per unit-turn | ~2 | ~2.5 | ~1 | **1.61** |
| Rounds per battle | 10-20 typical, 30+ big | 5-10 | 5-8 early, 10-15 late | **8.45 avg**, range 4.8-13.6 |
| Unit-turns per battle | ~200-350 | ~60-90 | ~90-150 | **71.4** |
| Actions resolved per battle | ~400-600 | ~130-200 | ~100-160 | **115.0** |
| Active skills per unit | 4-8 (2-4 from weapon + perks) | 5-8 mid, 10+ late | 3-6 + shared valor skills | **4.6** (2.5 attack, 2.1 utility), plus MOVE |
| Enemy skills per unit | same pool as yours | 1-3 | 2-4 | **~2**, measured, including move |
| Minutes per battle | 10-15 medium, up to 30 large | 5-10 | 5-10 early, 15-30 late | **1.7 machine**, ~5-10 estimated player |

## RabbleBound, fight by fight

Five runs each, `window.FIGHTS`, comp `prepared`.

| Fight | Rounds | Unit-turns | Actions | Sides | Machine min |
|---|---|---|---|---|---|
| clash | 4.8 | 46.4 | 73.4 | 8 v 5 | 1.1 |
| **brigand** | **13.6** | **107.8** | **176.6** | 6 v 6 | **2.6** |
| pack | 5.4 | 57.6 | 105.8 | 6 v 10 | 1.5 |
| slingline | 6.2 | 67.2 | 111.0 | 6 v 8 | 1.6 |
| steading | 10.4 | 81.4 | 129.0 | 6 v 5 | 1.9 |
| snare | 10.2 | 96.6 | 149.8 | 6 v 9 | 2.2 |
| mother | 10.6 | 74.8 | 104.4 | 6 v 2 | 1.7 |
| armour | 6.4 | 39.4 | 70.4 | 6 v 1 | 1.2 |
| **average** | **8.45** | **71.4** | **115.0** | 6.3 v 5.8 | **1.7** |

## How the minutes were derived

⚠ **This is the one estimated RabbleBound column and it must not be quoted as measured.** A real
wall-clock timing was attempted and abandoned: the preview pane runs hidden, `setTimeout` is floored
at about a second there and `requestAnimationFrame` never fires, which is the exact reason
`tools/harness.js` exists. **A timed AUTO run in a hidden pane measures the throttle, not the game.**

So the minutes come from the clock instead of the stopwatch. AUTO steps on
`setInterval(autoStep, paced(240))`, which at the shipped `PACE 1.75` is **420ms**. Strike recoil is
340 which paces to 595ms, and the damage number is 1000 which paces to 1750ms. An action beat
therefore costs roughly **0.7s** and a turn handover roughly **0.3s**:

```
machine seconds = actions x 0.7 + unit-turns x 0.3
average fight   = 115.0 x 0.7 + 71.4 x 0.3 = 80.5 + 21.4 = 102s = 1.7 min
brigand         = 176.6 x 0.7 + 107.8 x 0.3 = 124 + 32   = 156s = 2.6 min
```

Player time adds human deliberation on your half of the turns. About 57 of the 115 actions are
yours. At five to eight seconds of thinking per action that is five to eight minutes, plus about
fifty seconds of enemy turns playing out at machine speed. **Hence five to ten minutes.**

⚑ **The honest next step is to replace this estimate with a real one.** A stopwatch on a visible
window, one human playing three of the eight fights, would settle it in twenty minutes and is worth
more than any refinement of the arithmetic above.

## The measurement code

Kept here so the numbers can be reproduced rather than trusted. Paste into a session that has
already loaded `tools/harness.js`. It is a copy of `runFight`'s loop with three counters added and
the acts snapshot taken before the first turn.

```js
window.measure=function(kind,comp){
  const _r=render,_f=fx,_s=say,_x=sfx,_p=paintTerrain;
  render=()=>{};fx=()=>{};sfx=()=>{};paintTerrain=()=>{};say=t=>{G.log.push(t);};
  let out={};
  try{
    G.party.length=0;ARENA.COMPS[comp||'prepared']().forEach(p=>G.party.push(p));
    G.morale=0;G.log.length=0;G.cub=false;G.run.food=8;
    const cap=member('you');if(cap)cap.pet=null;
    const FULL={ev:1,flank:1,pile:1,kite:1,fallback:1,cohere:1,hold:1};
    Object.assign(AIP.you,FULL);Object.assign(AIP.foe,FULL);
    startBattle(kind);
    const snap=s=>B.units.filter(u=>u.side===s).map(u=>({
      acts:(u.acts||[]).length,
      atk:(u.acts||[]).filter(a=>a.dmg).length,
      util:(u.acts||[]).filter(a=>!a.dmg&&!a.move).length,
      am:u.actionsMax, sp:u.speed}));
    out.you=snap('you'); out.foe=snap('foe');
    let g=0,turns=0,acts=0;
    while(B&&B.won===null&&g++<3000){
      if(checkEnd())break;
      const u=cur();if(!u)break;
      if(u.dead||u.downed||u.fled){B.busy=false;nextTurn();continue;}
      turns++;
      let s=0;
      while(B&&B.won===null&&cur()===u&&s++<8){
        const a0=u.actions;B.busy=false;
        try{aiTurn(u);}catch(e){out.err=e.message;g=1e9;break;}
        if(u.actions<a0)acts+=(a0-u.actions);
        if(!B||B.won!==null||cur()!==u||u.actions===a0)break;}
      if(B&&B.won===null&&cur()===u){B.busy=false;nextTurn();}
    }
    out.kind=kind;out.rounds=B?B.round:0;out.turns=turns;out.acts=acts;
    out.won=B?B.won:'-';
  }catch(e){out.fatal=e.message;}
  finally{render=_r;fx=_f;say=_s;sfx=_x;paintTerrain=_p;B=null;}
  return out;
};
```

⚠ **Two caveats on every RabbleBound number above.** It is **AI against AI**, both brains at full
disposition, which is not a careful human. And `acts` counts **MOVE as an act**, because it is one:
`{k:'move',n:'MOVE',cost:1,move:true}` sits in the same array as every skill. The "4.6 skills"
figure has MOVE removed, the raw array length is 5.6.

---

# PART THREE - the six readings

What the two halves say when read together. **None of these is a decision.** They are what the
instrument shows, written down so the next combat argument starts from a number.

### 1. RabbleBound has the shortest battle of the four, and that is a strength worth defending

8.45 rounds and 115 actions against Battle Brothers' roughly 15 rounds and 500 actions. **Battle
Brothers' loudest structural complaint is length. Wartales' loudest complaint is literally "longer,
not harder".** RabbleBound is not in that trap, and the way to stay out of it is to know the number
before the next thing that grows it. **The number to watch is unit-turns, not rounds**, because a
round means something different at each party size. Twelve units for fifteen rounds is 200-350
individual decisions. RabbleBound runs 71.

### 2. `brigand` is the outlier, and this measurement answers a question the docs left open

13.6 rounds and 176.6 actions for a 6 v 6. That is **2.4x the opener** and **1.5x the average**, and
it is not a boss fight. `mother`, which IS the boss, runs 10.6 rounds against two enemies.

⚑ **This was not a new discovery, and that is what makes it worth something.** `brigand` already has
a written history in #50's parking lot
([`BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md)):

| when | read | note |
|---|---|---|
| before #36 | **9-11 rounds** | the baseline |
| after #36 (line of fire) | **14 rounds** | *"the fight most exposed to it"*, with 10 OBSTRUCTED and 10 SCREENED shots in one game. Banked deliberately, not acted on |
| general tail | median 10, **excursions past 20 at about one run in ten** | banked beside the water-stride entry |
| after the morale rework | **unknown, and flagged as such** | *"any read below that was about fight LENGTH needs re-measuring before it is trusted - the brigand 14-round line especially"* |
| **2026-08-11, here** | **13.6 over five runs** | **the re-measure that line asked for** |

**So the answer is: the morale rework did not bring it back down.** It was 14 before and it is 13.6
after. The parking lot's own instruction was not to retune the line-of-fire penalties for it,
because #46 and #47 were about to change what a shooter's turn is worth. #46 has since shipped. #47
has not.

The question `brigand` still has to answer is the one Wartales failed: **is it harder, or is it only
slower to close?** Nothing measured here separates those. ⚑ **That is precisely why gap (a) below,
the mop-up tail, is the most valuable of the three open measurements, and why `brigand` is where to
run it.**

### 3. The action density is the lowest of the four, which cuts both ways

1.61 actions per unit-turn against Battle Brothers' ~2 and Wildermyth's ~2.5. **Cheap, readable
turns serve the clarity pass directly.** The risk is Wartales' problem: one action per body reads as
"move, hit, next" and gives the player little to combine. ⚑ Note what Wildermyth is most praised
for: **the swift action, a third thing for free.** That is the cheapest known fix for this exact
number and it costs no new system, only a cost change on acts that already exist. ⛔ **It is still an
addition and the clarity pass forbids additions.** Parked here deliberately.

### 4. The skill count sits correctly in the band

4.6 active per unit, between Wartales' 3-6 and Battle Brothers' 4-8. Attack-to-utility is 2.5 to
2.1, close to even. **This is healthy and needs nothing.** Wartales' complaint is that every unit is
an attack button. RabbleBound's units are not.

### 5. The enemy skill gap is the most interesting number in the document

Your units carry 4.6 acts. Enemies carry about 2. **Battle Brothers' enemies draw from the same
weapon pool the player does, and the single most-praised thing about its combat is that different
factions demand different formations.** A 2:1 skill gap in the player's favour is what "one strategy
beats everything" looks like from the inside, and that is the complaint that killed combat for
reviewers of both Wildermyth and Wartales at around hour ten.

⚠ **This must not be read as "give enemies more skills".** Pattern 1 says the anti-repetition
mechanic is **composition** variety, not per-unit skill count. Three enemy types that each demand a
different formation beat one enemy type with three more buttons. #47 (the spear becomes a zone) is
already the shape of the right answer: a rework that changes what a lane means, not an addition.

### 6. Nothing here contradicts the clarity pass, and one thing supports it

The clarity focus is the first fifteen minutes and the readability of the panel. Nothing in this
document argues for more system. **The one direct contribution is `clash`:** the opening fight runs
4.8 rounds, 46.4 unit-turns and 73.4 actions with **eight** friendly bodies on the board, the
largest friendly count of any fight. #86's finding is that the opening is crowded. **The opener is
also the fight with the most units to read.** That is a measurement the step-1 count did not have.

---

# PART FOUR - the unit of variety is not the race, it is the weapon

**Added 2026-08-18**, a week after parts one to three. A second research pass, run by the user with
GPT, aimed at the one question
part three left hanging: **reading 5 said the enemy skill gap was 2:1 and warned that the answer is
not "give enemies more skills". This part says what the answer is instead.** The user's framing,
translated from the Russian, with the argument kept whole and one fact corrected below.

## The claim

**In Battle Brothers the unit of variety is not the race. It is the combination of weapon,
equipment, formation and behaviour.** Ten humans there can pose completely different problems:

- ragged men with clubs surround you by numbers;
- raiders with shields hold a line;
- spearmen close off space;
- two-handers demand an immediate focus;
- shooters force you to advance;
- daggermen, nets and polearms each change what a safe distance is.

**And the enemies run on almost the same weapon rules the player does.** A spear is not a different
damage number, it is spearwall. A shield can be split. A hook drags a man out. A hammer breaks
armour. **That is what lets "one more man" be a new tactical object** rather than another body.

Four layers sit under it:

1. **Equipment reads visually.** You see a dangerous helmet, a two-handed hammer, good armour, and
   you change your priority before reading anything.
2. **Equipment is the reward.** Sometimes you want to stab a well-armoured enemy carefully so as not
   to ruin his armour. **The method of killing is wired to the company's progression.**
3. **Compositions are mixed procedurally.** One bandit fight is five ragged men and a shooter, the
   next is a shield line, two polearm men and a leader. **Same faction name, different problem.**
4. **The same blow carries different stakes.** Your levelled brother can die or take a permanent
   injury, so a similar fight in a bad company state feels like a different fight.

## What that says about RabbleBound

**On paper the variety is already good, and the fights were designed with exactly this in mind:**

| fight | what it forces |
|---|---|
| `pack` | gather up and catch dogs |
| `slingline` | advance under fire |
| `steading` | kite ogres |
| `mother` | your formation gets broken |
| `armour` | surrounding is punished |
| `snare` | swarm, hook, shooters and ogres at once |

**So the problem may not be a shortage of invented fights. It may be that the prototype does not
sell their differences hard enough.**

The benchmark already found one concrete cause in reading 5: **a player unit averages 4.6 acts and
an enemy about 2, movement included.** Many enemies therefore collapse to a single sentence:
**walked up, used its one attack, next.**

**The corrected conclusion.** RabbleBound does not urgently need new races or ten new monsters. **It is
worth more to make the humans, ratkin and ogres it already has force the player to change their
answer, and to make that visible without reading the panel.**

## ⛔ The test, and it is the most useful thing in this part

For every fight, one question:

> **"What was I forced to do here that I did not do in the previous fight?"**

**And the answer routes the diagnosis, which is why it is worth more than an opinion:**

- **Same answer across two fights → the problem is MECHANICAL.** The fights are not actually asking
  different questions, whatever the design document says.
- **Different answers, but the fights still feel the same → the problem is PRESENTATION**: art,
  animation, sound, and how legible an action is.

⚑ **This is a router, not a verdict.** It is the same shape as #88's ⛔ measure the box before you
argue about the font: it tells you which argument you are allowed to have next.

## ⚠ One fact in the research is out of date, and correcting it sharpens the conclusion

The research says *most of the full battle tokens are not drawn yet*, and that a spearman, a cutter
and a deserter *look and move too similarly on the field*. **That was true once. It is not true on
this build**, and the check is `paintedSpriteKey()` against `BATTLE_ART`:

**50 painted tokens are embedded, and every key the mapper can return has art behind it.** 41 of
them are units:

| | painted variants |
|---|---|
| human, yours | captain · archer · mage · spear · cutter (5) |
| human, foe | captain · poacher · spear · sword · cutter (5) |
| ratkin, yours | archer · mage · spear · veteran · cutter (5) |
| ratkin, foe | fenling · spitter · fen_slinger · chieftain · spear · cleaver · hooker · sniffer · slinger (9) |
| ogre, yours | mage · spear · maul · guardian · brute (5) |
| ogre, foe | mage · pike · maul · thrower · elder · club (6) |
| beasts | fenmother · fenmother_body · fen_cub · warden · dog_bitch · dog_runt · dog_lurcher (7) |

`paintedSpriteKey` ends on `return k&&BATTLE_ART[k]?k:null`, so a missing key would fall back to the
procedural silhouette. **Nothing falls back.** The `DIM{}` silhouette path in `sprite()` is dead code
for every race in the game.

⚑ **So the correction makes the research's own conclusion stronger, not weaker.** Run its test and
the "tokens are not drawn" branch is already closed. What is left is a sharper and **measurable**
question:

⛔ **The art is distinct as a file. Is it distinct as an object, at the size it is actually drawn?**
`TOKEN=1.13*0.90`, so a human draws at about **26x39 px** on a 37x42 hex. **A spearman and a
swordsman can be two different paintings and one shape at 26 pixels wide.** And the project already
owns the right instrument for exactly this question: the type floor in
[`.claude/rules/ui-scales.md`](../.claude/rules/ui-scales.md) was set by the Discord channel's own
distance test, *"how far away can you get and still read it"*. **The same test applies to a token,
and it has never been run on one.** ⚠ Note also that #163 took 10% off every body on the board for
hex navigation, which is the `*0.90` in that constant: **legibility and crowd-readability are
already pulling against each other here and nobody has measured the trade.**

## Related, parked

**The mole people** are saved as a deferred concept in
[`archive/MOLE_PEOPLE_PARKED_CONCEPT.md`](archive/MOLE_PEOPLE_PARKED_CONCEPT.md). ⛔ **They are not
canon and are not in the build.** ⚠ That file is untracked in git as of this writing.

---

# What this does not cover

Written down so the gaps are known rather than discovered later.

- **No real stopwatch.** See the derivation caveat above. This is the biggest hole.
- **No human-played measurement.** Everything is AI against AI.
- **No hit-rate or damage data.** Pattern 3 (honest RNG reads as dishonest) is the loudest complaint
  in the loudest of the three games and **RabbleBound's own hit numbers were not measured here at all.**
  #84 shipped a dodge-versus-miss regression that counted 51 dodges to 169 misses, which is the
  nearest existing data and was not gathered for this question.
- **No comparison of the mop-up.** Pattern 4 and 5 both point at the end of a fight, and no number
  above isolates "rounds after the outcome was decided". That is probably the single most valuable
  thing to measure next, and `brigand` is where to measure it.
- **Only the eight canonical fights.** Comp `prepared` only.
- **No token-legibility measurement**, added by part four. The 41 painted unit tokens are confirmed
  present and distinct as files; **nobody has checked whether they are distinct as objects at
  26x39 px**. The distance test in [`.claude/rules/ui-scales.md`](../.claude/rules/ui-scales.md) is
  the right instrument and has never been pointed at a token.
- **Part four's own test has not been run.** *"What was I forced to do here that I did not do in the
  previous fight?"* is written down and unanswered for all eight fights. It needs a human, not a
  harness.
