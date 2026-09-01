---
name: grimtoll-204-stat-ladders
description: "#204 (8f.226) STR/AGI become nine signed rungs −4..+4 where the rung says what it gives or costs, hp = BASE_HP[size] x (1 + sum of STR rungs); PROPOSED 2026-08-19, NOT BUILT, waiting for the user's ruling on five numbers; the next iteration is INT and MOR"
metadata:
  type: project
  originSessionId: 5860cf8e-5501-44e3-a786-00a139d7ed83
  modified: 2026-08-19T15:20:16.234Z
---

**2026-08-19 the user opened a new workstream after the clarity pass: the four stats, starting
with STRENGTH and AGILITY, prototype only.** His model, verbatim in the spec: a rung is a number
beside the word (*"Базовый уровень - условно средний для человека и обозначен 1"*), every rung
gives a named change (*"2 +10% здоровья / 3 +20% урона мечем, 10% луком / 4 +15% здоровья"*),
rungs ADD, and body size MULTIPLIES hitpoints (*"здоровье огра большое - потому-что он большой и
много силы"*). AGI is *"% удара и % уворота только"*. INT and MOR are explicitly the next iteration.

**Where it is:** `docs/archive/BACKLOG_ENTRY_SPECS.md` §204 (full spec: ladders, seven-body
before/after, migration list, five open questions), the NEXT row in `00_PLAN_AND_BACKLOG.md`,
`tools/stat_ladder_calc.js` (the arithmetic, `node tools/stat_ladder_calc.js`), `shots/204_ladders.html`
(the mockup; also published as an artifact "The Two Ladders"). ⚠ **The docs landed in main inside
another session's #203 deploy commit** (`67436bd`, `git add -A` swept them) - the content is
complete, only the commit message is wrong.

**The numbers proposed:** `BASE_HP` small 42 / medium 56 / large 70; STR 0..5 = −10%hp −10%melee ·
base · +10%hp · +20%melee +10%bow · +15%hp · +20%melee +10%bow; AGI 0..5 = −5/−5 · base(68 hit,
14 dodge) · +5 hit · +5 dodge · +5 hit · +5 dodge; one flat +2 on every body's dice (the enemy's
already is). Founders authored at 1/1 (Captain, Vesna, Marrow), Ilka 1/2, Skree 0/3+twitchy,
Ash 0/3, Bruht 3/0. Result vs today: hp/hit/dodge within 1-2 everywhere; swing −8% founders,
+20% ratkin knives, −12% bow, −11% Bruht.

**Round two, same day (his seven points):** size multiplies melee too (×0.9/×1/×1.1, TAKEN) and
to-be-hit folds into ONE BODY TABLE (small −5 / large +10, replacing RACEDODGE ±5 and SIZEHIT +6);
rung 0 prints RED with its minus; **rung 5 of every ladder is a CAPSTONE** (STR STANDS: 1 hp once a
fight · AGI FLEET: +1 hex · INT TWICE-TAUGHT: 2 perk points · MOR STANDARD: +5 nerve to adjacent
allies at their turn start), rungs 2-4 stay numbers; INT sketched as reach and growth (XP ±10%,
the opening +5/extra body, +1 range on workings and shots, workings %), MOR as tempo and the line
(nerve capacity, loss/gain rate ×0.75/×1.25, his 10% "a strike costs no action" at rung 4 = the ONE
random rung). ⛔ MOR today silently adds up to +14% damage (`D.bonus`); the sketch moves that onto
the nerve LADDER (HAPPY +5%, ROCKS +10%) but only at the MOR iteration. Flank: side/back stays a
ground rule with no stat; "surrounded" (`flankPow = 8+INT`) becomes base 15 + INT rung 3. Eight
open rulings listed in the spec.

**Round three, same day, SUPERSEDES the 0-5 numbers:** his screenshot of the nine-word hover -
*"вот стоко значений - нужно просчитать их все тоже"*. **Nine signed rungs −4..+4, 0 = the ordinary
human** (the one departure from "1 = база", flagged, his call); every TELLS word keeps its place and
gains a digit; negatives are real debuffs, softer than the buffs. **The RACE table carries the body**
(hp 56/42/70 multiplies; melee 0/−10/+10%, to-be-hit 0/−5/+10, step, lean in rungs - replaces
RACEMOD + RACEDODGE + SIZEHIT); **damage is ONE bracket with NO flat**, the old +round(0.3×STR)
baked into every weapon/act row (+2 both ends). STR: −1 −5%hp · −2 −15%melee −8%bow · −3 −10%hp ·
−4 −15%melee; +1 +10%hp · +2 +20%melee +10%bow · +3 +15%hp · +4 +20%melee + STANDS. AGI: −3 a rung
down (hit/dodge alternating), +4 a rung up, FLEET at +4. Founders read off today's WORDS: Captain
0/−1, Vesna 0/0, Marrow −1/−1, Ilka −1/+1, Skree −3/+3, Ash −3/+2, Bruht +2/−3; both knives and
the club land on today's numbers exactly. Rulings taken on his "judge based on here": armour
untouched, all nine words, flat into the row (−8% founders / −12% bow accepted pending harness),
capstones on ±4. ⚑ **His mid-turn note: the system "encourages specialisation more" than Battle
Brothers - that is the lever (rungs unequal, curve bends up, a stat at +4 REFUSES a point).**

**Round four, same day:** STR/AGI "work quite decent" (accepted). INT and MOR ladders built off the
engine's OWN dials (INT: the opening 8+INT, spell ×(1+.05 INT), spell aim 38+3.4 INT, D.learn; MOR:
capacity 60+3 MOR, 78% start, MORALE{} events, climb 8, and the silent D.bonus damage → moves to the
nerve rung HAPPY +5% / ROCKS +10%). Class leans one rung each (captain MOR, spear STR, archer AGI,
mage INT, warmage INT+MOR, cutter AGI, brute STR; the stranger's arrives with the pick). Race leans
on all four (ratkin INT +1 MOR −1 added). The givens listed (56/68/14/step/2 actions/90 nerve/xp ×1/
opening 15/dice/arc). Full sheet per founder: final = born + race + class + trait, founders authored
so born lands today's word. ⛔ NO CRIT STAT: the back-stab IS the crit (+30/×1.25, on the card before
the swing); if bigger moments, BACK ×1.5. His note "make this thing differentiable / freshness": the
stat as a SENTENCE is the thing nobody in the genre does - protect it: a rung that needs a formula to
explain is wrong; capstones are moments, words are titles the road can speak, enemies in the same
sentence.

**Round five, same day - THE PAGE IS NOW FIXED vs OPEN, at his order** (*"зафиксить вещи которые
точно да (сила и аджилити) и идеи / наброски и опции по другим"*, *"удали оттуда отработанное"*).
Part I fixed: STR, AGI, race body table, the four class leans touching them, the givens, the
founders. Part II open: INT, MOR, the mood chip, resistances, the heavy blow, jack of all trades,
the backstory. ⛔ Settled arguments are DELETED from the page and live in the spec - a decision page
that keeps its own history stops being one. Also: **the battle-mage is renamed `mage` and the old
`mage` row is DELETED** (sweep CLASSES, CLS_BY_RACE, KIND_BY_CLS, START_GEAR, isCaster, the
windtouched gate, saves); **the Captain is born STR +1 AGI +1** (his backstory paying: 62 hp, 72 to
hit); BACK +30 joins the sheet's fixed row; **resistance = the stat that aims a thing shrugs it off**
(INT +2 workings against them −5, MOR +2's ×0.75 IS mind resistance); **the heavy blow = STR +3
"once a fight, one blow ×1.5, chosen"** (a button, not a roll); **the map's mood becomes symmetric
and printed** (today only a NEGATIVE mood reaches the fight, silently, via Math.min(0,G.morale)).

**Round six, same day - THE PIXEL ARMS.** GPT delivered `prototype/assets/strength-biceps-pixel-v7/`
the same evening and it was ALREADY keyed to this entry's rungs: nine icons at 16px and nine at 24px,
RGBA, plus `strength-levels.json` mapping level -4..+4 to the nine STRENGTH words. Nothing to slice or
re-key. Wired into `shots/204_ladders.html` as data URIs. ⚑ The set works because it is a SEQUENCE
(silhouette grows, colour climbs skin -> orange -> red), so negatives read as "less arm". ⛔ Build
arrangement **A**: the icon in its own COLUMN before the value, the same `.sart`/`.scol` pattern the
item pictures use; **B** (16px inline) is the fallback, and the measurement to take first is that the
sheet's stat rows are 16px in a column measuring exactly 678/678, so 24px adds ~32px over four rows;
**C** (picture instead of the digit) is a trap - the eye tells -3 from +2, never -3 from -4.
⛔ **Either all four stats get a nine-icon set or none does** (a hand for AGI, an eye for INT, a heart
for MOR); one illustrated stat beside three bare words is the wrong-unit bug in pictures. ⚠ The icons
are decoration for the number, never the source, and keyed BY RUNG not by body.

**Round seven, 2026-08-21 - THE ICONS ARE IN THE PROTOTYPE (prototype only, index.html untouched).**
`prototype/assets/stat-icons-pixel-v3/` supersedes v7 and adds a BRAIN set: nine arms + nine brains,
16/24px, `manifest.json`. ⚠ Its exporter `prototype/export_stat_icons_v3.ps1` CANNOT be re-run
(absolute paths into ~/.codex, output root gitignored), so **the eighteen PNGs are the only copy and
are not in git** - they now also live embedded in the prototype as data URIs.
⛔ **The icon is keyed on `tellIdx`, the SAME index `tell()` reads for the word** (`STAT_ICON{str,int}`
in TELLS order, `statIco()`, and the ladder asks by POSITION). Proved by byte fingerprint at both
ends, which is the only check that proves ORDER: str[0]=451B=grade-plus-4 = "Monstrously strong",
str[8]=519B=grade-minus-4.
⛔ **The illustrated row grew 3.9px and the negative margin was not the fix.** `.itl` is
`align-items:baseline` and A FLEX CONTAINER TAKES ITS BASELINE FROM ITS FIRST ITEM, now an image
whose baseline is its bottom edge. margin alone 20.8, align-self alone 18.5, **both 16.9 = the bare
row**. Never set width/height to 14 - that resamples a 16px painting.
⚠ **The measurement nearly happened on another session's build**: serve.ps1 on 8791 failed to bind,
**exited 0 while printing the serving line**, and another server answered - the file "did not have"
STAT_ICON. The tell is arithmetic: 28,679,857 bytes served against 28,838,803 on disk. **Fetch what
the server serves and compare LENGTH before believing a measurement.**
⛔ **V3 IS A COLOUR SEQUENCE, NOT A SIZE ONE** (v7's arms grew monotonically). Ink out of 256,
weakest to strongest: strength 93,70,63,64,93,90,87,94,102; brain 60,83,88,88,52,67,119,55,108 -
**brain +3 (55) is SMALLER than +2 (119)**, so the silhouette reverses near the top. Legible on a
card, weaker in a list.
Gates all clean on localhost:8834: LINT 0, overflow probe [], under-floor 0, `#iChar` 678/678, four
rows identical at 17.4, no clipping over 9 bands x 4 stats, agi/mor emit no `<img>` at all.
Gate picture `shots/204_stat_icons.html`. ⏳ Open: the sheet is now two illustrated stats beside two
bare ones (AGI and MOR have no art) - deliberately shipped that way to be looked at.

**Round nine, 2026-08-21 - the doc (`shots/204_ladders.html`), prototype untouched.**
⛔ **His "there was something strange about the magic" was right, and the strange thing was that the
sketch had CRUSHED the aim.** Measured: today a spell lands at `38+3.4*INT` = **41..69..99, a 57-point
spread**; the sketch gave +-10 total, deleting the engine's own stated rule ("a stupid caster is
unreliable, the whole point of the ogre battle-mage"). Damage was fine (-28%..+31% today vs -25%..+30%).
⛑ **Fix: the aim is INT's THROUGH-LINE, +-7 on EVERY rung** (+28/-28 vs today's +31/-27), derived off
the curve. The opening deliberately does NOT follow the engine (9..26 a body today) and flattens to
15 +-5, because that swing is why nobody can see INT drives it.
⚑ **THE TOP RUNG COSTS TWO POINTS** (his idea): a capstone is a rule, not a bigger number, so one
point for it and one for +10% hp was the one dishonest step. Receipt = two small empty 6px squares
under the +4 digit, in the rung's number column; no other rung shows squares.
**Capstone options laid out, 3 each, one picked:** INT - TWICE-TAUGHT (pick) / THE LONG VIEW / THE
TEACHER; MOR - THE STANDARD (pick) / NOBODY RUNS / THE RALLY.
⚠ **The workings->magic rename is DOC ONLY and the build sweep is not a sed:** "working" appears 31x
outside comments, only ~22 are the game's word; the other nine are ordinary English ("the working
file reads dev", "stops working", "has been working on you"). Read every hit.
Doc pictures now come off the build: all 32 v7 arms swapped grade-for-grade to v3 **matched by data
URI, not by position** (they sit in four places in different orders), + 9 brains on INT. 41 images,
0 broken.

**Round ten, 2026-08-26 - the baseline raised and INT/MOR rebuilt to his spec (doc only).**
Human hp **56 -> 60** (ratkin 45, ogre 75 at the same x0.75/x1.25), to hit **68 -> 70**, dodge 14.
⚑ His "(at least for my man)" needs no exception: `build()` takes every foe's hp/skill/dodge off its
template, so a raised roster baseline is structurally roster-only.
⛔ **INT = land a spell (+-7 a rung, the through-line) + magic damage + experience, and +1 reach at
+3. The opening LEAVES the stat** (flat 15 for all; deletes the invisible 9..26 swing of
`flankPow=8+INT`). **The dodge against a spell goes to ZERO** (`dodgeOf(d)*0.35` at two sites) - a
spell lands or it does not. **Capstone is fixed, not chosen: UNREPEATABLE** (no enemy strikes this
body twice in one turn; a second enemy can) - a per-turn flag on the DEFENDER read where a target is
chosen, so both AI brains obey it once.
⛔ **MOR:** +1 +10 nerve/climb 12 · +2 loses x0.75 · +3 **mends twice as fast (12 a day, not 6 -
`MEND_BASE`, the same dial DOUBLE RATIONS turns)** · +4 **+1 rung on a chosen stat + two perks**.
Softened bottom: -4 was "never climbs back", now "starts one rung lower".
⛔ **The MOR capstone needs the system's ONE non-rung guard: the granted rung may reach +3 at most**,
or two points buy a second capstone free.
⚠ **Bruht lands at 98 hp** (race 75 + rung +2 + `big` 16) = 14 over today. If too much, **cut the
trait, not the race row**.
⚑ **The doc went 88KB -> 45KB by deleting its own history** at his order (the round blocks, the arm
strip, the three-arrangement comparison, every icon-sizing measurement). A decision page that keeps
its own minutes stops being one; the minutes are these spec entries.

**Round eleven, 2026-08-26 - two carelessness findings, both his catch (doc only).**
⛔ **"You didn't calculate race properly" was a CAPTION lie**: the founders' dodge column was
`14 + AGI` with no race, while the note said "dodge includes the race". In this model **the race body
is a modifier on the ATTACKER's roll, not the defender's dodge** - Skree dodges 18 AND everyone
rolling at him takes −5, where the old build folded +5 into his dodge and printed 27. Table now has
an eighth column `the attacker adds` (0/−5/+10) and the note names which columns carry the race.
⛔ **INJURY vs SCAR, his second correction, and the build already distinguishes them** (`hurt.lasting`
prints *permanent/temporary injury* on road doors, #197): **injury = `hpLoss`, heals 6 a day
(`MEND_BASE`, the dial DOUBLE RATIONS doubles); scar = `p.injuries[]`, the sheet labels it *scar*,
NEVER heals, medicine chest once a run.** So MOR +3 doubles injuries only, scars untouched - nothing
new to build. ⚑ **My first two readings each proposed BUILDING something (a second chest use, a clock
on scars) and both were answered by getting his two words right.**
**MOR trimmed:** +4 just two perks (the "+1 rung on a chosen stat" is gone, and so is the guard it
needed - no rule left that is not on a rung); +3 injuries heal x2; rest unchanged.
⚠ **MOR and AGI have no icon set** (only STR arms + INT brains exist) - that was his "incorrect icon".
**AGI negatives, his numbers:** −1 −3 dodge · −2 −3 hit · −3 −4 dodge · −4 −3 hit and −3 dodge →
held −6 hit / −10 dodge against +8/+8 up. Deliberately asymmetric on dodge.
**INT:** reach is "+1 on spells and skills", not shots.
Founders after: Marrow 70/11, Bruht 67/7 with +10 for the attacker, others unchanged.

**What to know before building it:**
- ⚑ **The enemy never reads a stat** (`build()` hardcodes str 6 agi 6; only `thews` uses it, ×0.89),
  so the ladder is a roster change and the foe just stands on rung 0 (×0.90).
- ⚑ **Body size does nothing to hp today**; the ogre is big only via `big` +16 and STR 13.
- ⚑ **The flat `round(0.3×STR)` was a second STR receipt**; one constant +2 replaces it, and that is
  the whole source of the founders' −8%.
- ⚑ **Recommended but his call: size also multiplies melee ×0.9/×1/×1.1** - closes the ratkin and
  ogre deltas at once, humans unmoved.
- ⛔ **A rung is worth ~2 old STR points and ~4 old AGI points**, so every raw-point modifier must
  be re-said: RACEMOD, rollRecruit (6-10 → roll 0/1/2 at 25/50/25 + lean), traits (twitchy +2 AGI,
  big −2 AGI, vet −1, two STR traits), trinkets (tooth +2/+4, cubtooth +1 all), five armour `agi`
  penalties (the harness band already charges dodge for weight - propose dropping them), six
  injuries (−1 = a whole rung, which is what #197's "permanent injury" was promising), the stat
  click in `drawInv`, and a one-shot load map (≤6→0, 7-10→1, 11-12→2, 13-14→3, 15-16→4, 17+→5).
- The gate: `ARENA.match()` eight fights n=50 a side before/after, read as win rate AND the fraction
  of runs under a threshold (#145's tail rule), plus the sheet overflow probe (the digit widens
  `.itl .tv`, which is exactly full on the Captain).
