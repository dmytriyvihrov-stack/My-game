# QA playthrough report, 2026-08-02

**What this is.** One long session of playing the build as a user, hunting for soft locks and big bugs
before the friends playtest. Five campaign runs were played end to end in the real UI (clicks on real
buttons, no console cheats on game state): two ended in company wipes at the dog pack, one at the Thing
in Armour, one at the Snare itself, plus one economy-run that reached the last stretch. Fights were
played by hand early, then through the shipped `⚙ TEST` AUTO tool (which is also what exercised the
`autoStep` brain). Side screens swept: rules, practice field, playtest notes and journal, send the run,
the wagon, inventory, provisions.

**The headline: NO SOFT LOCKS FOUND.** Every way a run can end was hit at least once and every one of
them exits cleanly: full wipe (three times, at three different fights), company withdrawal carrying the
downed out (twice), mercy pleas, a skipped boss, a fled mandatory road fight, defeat epilogue, the wagon,
and a fresh run after each. The end-of-battle state machine held every time. `window.__errs` stayed empty
for the whole session: not one uncaught exception in roughly five hours of play.

> ⚠ **That headline was wrong, and here is the one it missed** (added 2026-08-02, after the user
> found it in ordinary play): **opening the INVENTORY, or `? RULES`, while a card was up dismissed
> the card for good.** On the road that ate the walk itself, and the run locked hard: greyed map,
> refusing menu, no way on but a reload. This session swept the inventory *screen* thoroughly and
> never once opened it *from underneath a card*, which is the shape of the miss: the sweep went
> screen by screen, and the bug lived in the seam BETWEEN two screens. Fixed in build log 8f.98.
> **Anything that reads this report should read that row too before trusting the word "none".**

**The user's save was backed up before testing and restored after** (menu again reads
"day 1 · 4 in the company · Something on the road · 140 crowns"). Backup copy kept at the session
scratchpad as `localStorage_backup.json`.

**One path is still unverified: the Snare VICTORY epilogue** (the cage, the woman, the run summary after
a won finale). Four runs died before it; the fifth was stopped by the user mid-way, at the Broken Men.
Everything up to the Snare fight itself is verified, and the DEFEAT epilogue is verified three times.
Recommended: one deliberate win-path check (or a staged snare win) before strangers get the build.

Categories below: **BUG** (it is wrong in the code), **BALANCE** (numbers and pressure), **FEATURE**
(small additions that fell out of watching the game), **LORE / TEXT** (words). Each entry carries a
severity and, where known, the code pointer. Local ids QA-1.. so nothing collides with the backlog
numbering registry; the user triages what becomes a numbered entry.

---

## BUG

**QA-1 · Mercy never pays its salvage · CONFIRMED IN CODE, one-line fix.**
`payFx()` (~line 15693) pays only crowns and food. `takeMercy()` (~12255) adds `f.iron` and `f.gems`
explicitly but never `f.salvage`, while both paying MERCY rows advertise it: "Strip them" is
`fx:{salvage:5,crowns:30}` and "Finish it" is `fx:{salvage:9,crowns:60,gems:1}` (~12244). Reproduced
live: sling-line mercy, chose Strip, crowns 7 to 37, salvage stayed 0. This is the same dead-receipt
class 8f.54 fixed for loot rows, on a different applier. It also quietly worsens the salvage drought
(see QA-14): the Coldharrow wheelwright at 7 salvage was never reachable in any run.
*Fix: `if(f.salvage)G.camp.salvage+=f.salvage;` in takeMercy, then grep every payFx caller for the
same hole. LINT idea in QA-20.*

**QA-2 · "You is down" - the Captain-pronoun trap is live in at least five registers · small fix, big visibility.**
The README already documents this trap (the one person whose roster name is a pronoun) and capName
exists, but these sites bypass it. Seen on screen this session (dashes normalised):
- combat miss line: "You misses."
- down line: "You is down - dragged out of the line, still breathing."
- morale lines: "You is breaking - it watched one of its own drop."
- the Warm Spring stay receipt (the user's own #71 beat): "and You does not offer."
- THE SECOND DEBT camp card: "You ... is being very patient and very public about it."
*Fix: route these through capName or a tiny verb helper. Grep the file for `+' is '` and
`+' misses'`-shaped concatenations. The springStay one hurts most because it is the newest content.*

**QA-3 · "ON THE ROAD - ON THE ROAD" doubled card header · cosmetic, frequent.**
Untitled vignettes (the milestone bet, the rain vignette) render the wrapper prefix plus a title that
is also ON THE ROAD. Seen twice in five runs, so most testers will see it.
*Fix: give vignettes a real title or drop the prefix when the vignette has none.*

**QA-4 · The battle report prints a race for monsters · the derived-race trap again.**
Pack fight report, AGAINST YOU column: "The Bitch - 1 down - ratkin". A dog, listed as ratkin, because
`build()` derives race with a ratkin fallback and the report row prints it for any single unit. The
mercy gate was fixed for this in 8f.78 (`!u.monster`); the report row was not.
*Fix: suppress the race line when `u.monster`.*

**QA-5 · Literal "word4" in the mercy card · source typo.**
The third mercy option's receipt string ends `barely worth a word4` in the source itself (~12247).
On screen it reads exactly like that.

**QA-6 · Coldharrow's exit says "the muster field is one day east" · stale since #71.**
The reshape moved the Muster Field WEST of the Black Fen; east of Coldharrow is the Stone Field fork.
This is the "rule anchored to run order breaks on a reorder" trap in label form, and it actively
misinforms (a player short on bodies may walk east expecting hires).

**QA-7 · Fled the Thing in Armour: the queued node scene may be dropped · VERIFY.**
`travel()` queues the arrival node's own event as `G.queuedEv` when the armour ambush fires (~16390).
After ending that fight by withdrawal, `G.queuedEv` read null and no Dead Company card ever appeared.
If the queued beat is only consumed on a win, the fled path silently deletes one of the eleven
no-skip beats. Needs a code read; not proven live (I clicked through fast).

**QA-8 · Disabled choices are inconsistent about saying why · UX.**
At 0 provisions: THE LONG FIRE greys its two feast options with no reason text at all, THE WARM SPRING
leaves its "-1 day -2 provisions" option fully clickable (the purse floor clamps it, so no corruption,
but two screens carry two rules), while the muster and the provisions panel both append "cannot afford"
or "not enough in the barrels". One rule wanted, and the reason text is the right rule.

**QA-9 · Aftermath "Back to the road" is a silent no-op while a promotion is pending · UX.**
Only the button subtitle changes ("there is still something to settle"). A player who does not read
subtitles gets a dead-feeling click. Flash the unsettled block instead of ignoring the click.

**QA-10 · The under-hill road to a visited node paints as dead · UX seam.**
THE GROUND OPENS in the back half adds an edge to the already-visited Black Fen. The road IS walkable
(the fork card lists it), but the destination node keeps its "done" paint: no glow, no onclick, so on
the map itself the brand-new road looks like nothing happened.

**QA-11 · Blood on the Road promises two ogres, fields three.**
The card fiction says "Two ogres with clubs" and the ratkin door says "two ogres against you"; the
battle spawns three Ogre, club foes every time. Same family: THE BROKEN MEN says "Five of them step
out" and fields six units (unless the captain is meant to be uncounted, in which case say so).
Filed as bug rather than lore because the door text is a player-facing promise about the fight.

---

## BALANCE

**QA-12 · The dog pack is the wall of the act for a sloppy first-timer.**
Two manual runs died there (rounds 9 and 10), both to the same spiral: dogs dodge 31 against starting
skill ~58, swarmed is -14, every downed body stacks "watched one of its own drop", and the hit chance
floors at 5%, at which point nothing dies and the cascade finishes the company. The counter-play exists
(tight knot, COMMAND, spear walls) and AUTO with the same seven bodies won it twice (rounds 5 and 7,
two down). So it is winnable but the punishment curve for scattering is very steep for the second
battle node of the run. Watch it closely in the friends playtest; candidate softenings if it proves a
churn point: cap the grief stack per round, or have the Captain teach the knot the first time two
people are downed (a lesson, not a stat change).

**QA-13 · The nerve cascade is the real difficulty everywhere, not hitpoints.**
All three wipes were morale-shaped, none were hitpoint-shaped: the company that dies is a company that
stopped hitting because it was breaking. That is the design working, but it means COMMAND is the most
important button in the game and nothing teaches it. The #60 lesson set covers rules that bite; a
lesson for "your people are wavering, this is the button" would do more than any number change.

**QA-14 · The mid-act economy starves a mercy-playing company to zero.**
Two runs arrived at Coldharrow with 19 and 30 crowns; every single purchase there (45 bone-setter,
55 market, 260 plate, 7-salvage wheelwright) and at Bonepicker's (60, 55) and every hire at both
musters was unaffordable; wages went unpaid from around day 15 in every run that got that far.
Contributing facts: upkeep 10 to 13 a day, fights pay almost no coin (loot is salvage and trinkets),
the one reliable combat coin is the mercy strip (+30), and QA-1 means its salvage half never lands.
The pillar wants scarcity and the horizon line exists, but "every shop greyed for the whole back half"
was the norm across my runs, not the exception. Worth one deliberate look at where the act WANTS the
purse to sit at Coldharrow, then tune the front-half payouts to hit it.

**QA-15 · Hunger plus the Fen-Mother is a stacked fight with no counterplay past the muster.**
The muster field sells no food, and the first food PAST the fen is Coldharrow's market. A company that
spent provisions on mercies (Broken Men) and rations fights the boss at -14 morale for the whole line,
which against her DESPERATE phase produced a six-scar withdrawal. Consider a small provisions row at
the Muster Field ("the last wall before the water" should sell bread), or a warning clause on the fen
door when the barrels are empty.

**QA-16 · The Snare assumes the Last Muster could sell you bodies; the purse says otherwise.**
Broke arrival (0 crowns) at the finale gave a round-7 wipe. The code comment already knows this
("arrives at both Muster Fields with every candidate greyed out"). QA-14 is the root; this is where
it lands hardest.

**QA-17 · The sinkhole shortcut can skip a third of the front half.**
THE GROUND OPENS at crossroad-A range opens a 1-day tunnel to the Black Fen that legitimately skips
The Broken Men, The Roadside Fire, the dog ambush and the Muster Field, four of the eleven no-skip
beats, including the armourer the reshape moved in front of the boss on purpose. If that is an
intended secret, it is a lovely one; if not, gate `opensRoad` on the legs where the bypass is harmless.

---

## FEATURE (small, fell out of play)

**QA-18 · One shared "reason on a disabled choice" rule** (from QA-8): every gated choice appends why,
in the same words everywhere: "cannot afford", "not enough in the barrels", "needs a ratkin".

**QA-19 · Provisions at the Muster Field** (from QA-15): even three barrels at a bad price keeps the
fen fight honest without softening it.

**QA-20 · A LINT rule for fx keys.** Every `fx:{...}` key that appears anywhere in a content table must
be applied by that table's applier. It would have caught QA-1 the day the mercy rows were lifted out,
and it re-catches the whole 8f.54 dead-receipt class forever.

**QA-21 · A "wavering" lesson for COMMAND** (from QA-13): fires once, the first time two of yours are
off steady in one fight. Uses the existing lesson machinery, no new system.

---

## LORE / TEXT

**QA-22 · Ogre recruit with a small man's cost line.** Hoom (and the preset "Does not run" personality
generally) prints "-2 STR - there is not much of them" on an ogre brute. The trait sentence already
has race variants (the ratkin one is lovely); the cost sentence needs an ogre variant or neutral wording.

**QA-23 · "Vesna sleeps beside the wagon, and the wagon does not survive."** Bonepicker's rest receipt.
If this is a joke it does not land as one; if it is a truncated line it needs its second half. Flagging
for the author, not for a session to rewrite.

**QA-24 · THE SECOND DEBT reads backwards.** "You ... is owed money again. By two different people"
while every choice has the Captain PAYING, and the first card in the chain had the Captain owing Ilka.
Either "owes ... to two different people" or the subject is wrong. (Also carries two "You is" hits,
see QA-2.)

**QA-25 · Blood on the Road's ending contradicts a full kill.** The AFTER text "The ogres give ground
rather than lose one of their own" prints even when all three ogres are dead on the field and the
report above says so. It reads perfectly when the fight ends in rout or mercy; it needs a second
sentence for the kill ending, or a neutral one.

**QA-26 · The Roadside Fire deals cards titled "ON THE ROAD - ..." to a company that has arrived.**
The arrived flag already fixes the button (8f.53 note in openEvent); the card TITLE still promises a
road. Cosmetic.

**QA-27 · The defeat epilogue opens with "The bells are still ringing" wherever the company dies**,
including inside the Ruined Steading palisade half a map from Grausen. Reads odd mid-map; one clause
keyed on distance-to-bells would fix it, or a more placeless first line.

---

## Tech insights (for whoever opens the code next)

1. **The applier-hole class is alive.** 8f.54 fixed dead receipts in takeLoot; QA-1 is the same defect
   in takeMercy. The durable fix is structural: one shared fx applier, or the QA-20 LINT rule. When a
   content table gains a reward key, grep the applier the same hour.
2. **capName is a rule, not a function that exists.** Five separate registers concatenate a roster name
   with third-person verbs. Any new line with `name + verb` must go through one door.
3. **The battle outcome state machine is solid.** won:true / false / 'mercy' / 'fled' all reached their
   screens across twelve fights, three wipes, two withdrawals, with zero uncaught errors and zero stuck
   states. The soft-lock fear that motivated this session did not materialise anywhere.
4. **AUTO as a tester tool earns its keep** and also quietly regression-tests autoStep. One seam: the
   TEST toggle does not survive a page reload, so post-reload sessions silently lose the AUTO button
   until re-toggled (nearly cost this session a false "AUTO is broken" finding).
5. **Session environment notes** (not game bugs): "A new company" and "Take the road again" reload the
   page, which drops the harness mcShim; re-fetch harness.js after either. The ask() modal lives in
   #askWrap, and a text-slice of body.innerText can miss it entirely, which cost twenty minutes on a
   phantom "map is dead" diagnosis. Check askWrap.classList first, then wDlg, then the map.

## Sense insights (how it plays, one tester's read)

1. **The pillar works in the hands, not just on paper.** My mercies (fed the Broken Men, bought salt
   properly, paid the debts) directly produced the hungry boss fight and the unpayable bone-setter two
   nodes later. The regret was real and traceable, which is exactly the promised loop. The caveat is
   QA-14/15: the FIRST run cannot know food stops being buyable after the muster, so the first taste of
   the pillar can read as a gotcha instead of a consequence. The friends playtest will say which.
2. **The camp chains are the best thing on the road.** THE DEBT escalated because I paid it ("now it is
   a system" is a brilliant receipt), THE FIDDLER came back as a tune three days later, THE AUNT needed
   two ratkin and had them, THE LONG FIRE knew the company had fled the Thing in Armour. A stranger's
   run surfaced all six links without me hunting for them.
3. **Difficulty lives in nerve, and nobody tells you.** Watch first-timers at the dog pack: if they
   scatter, they will be wiped by round 10 and may not understand why (the hit floor makes their clicks
   feel broken rather than their morale). QA-12/13/21 are one finding wearing three ids.
4. **Withdrawal is the design paying rent.** Both times the company fled I kept playing the same run
   rather than restarting, and the six-scar bill FELT fair. No-death is doing what the mortality ruling
   hoped: losses read as spent, not deleted.
5. **The race gates read beautifully in play.** The ratkin waiting at Coldharrow's gate, the clan toast
   at the wedding, the ogre asked to come along: nobody needs a codex, the world states its rules by
   who is allowed through which door.

## Coverage

Verified this session: tavern (all three doors across runs) · map travel, forks, corridors ·
Blood on the Road (both outcome shapes) · Broken Men (fight and feed) · Roadside Fire (two camp cards) ·
dog pack (two manual losses, two AUTO wins) · double rations door · Muster Field (hire, cart, prices-up
beat, walk-away) · Fen-Mother (fought and withdrawn; backed away) · Coldharrow (broke visits) ·
Stone Field and sling-line (mercy plea, all three answers over two runs) · Bonepicker's · THE GROUND
OPENS both halves · Thing in Armour (fled twice, wiped once) · Long Fire (refusal branch, disabled
feasts) · Warm Spring (the stay-a-day beat) · wedding · Door-Shrine (rest) · Last Muster (broke) ·
Snare (marsh door, lost) · defeat epilogue and wagon, three times · practice field (steading-line win,
SIM isolation held) · rules · playtest notes, reactions, journal, read-a-friend textarea · send the run ·
inventory and provisions panels · mid-run save and continue after reload · LINT clean at session start.

NOT covered: the Snare victory epilogue and run summary · Wynn / the cage beat · Hill Steading as a
campaign arrival · The Circle practice fight · journal read-back with a real foreign blob · the forge
purchases (never enough banked) · mutation full bloom (the fen-water clock never ran out) · TWO SHADOWS
and tie mechanics in battle · the mailto send from a published artifact (8f.86 shipped mid-session).

## Fix status (updated same day, after 8f.88 and 8f.89)

DONE by the parallel fix session (8f.90): QA-1 takeMercy salvage ·
QA-2 capName, fixed structurally (unitName at the unit build, one door for every log line, and
proseName for the camp cards) · QA-4 monster race in the report (bestiary tag) · QA-5 word4 ·
QA-6 Coldharrow subtitle, now DERIVED from the map · QA-8 one reason-text rule (needTag) ·
QA-9 the exit points at what is unanswered instead of ignoring the click · QA-10 live outranks
done on the map · QA-24 SECOND DEBT rewritten · QA-25 the clash AFTER text has a kill ending ·
QA-26 arrived cards say AT THE FIRE.

DONE in 8f.89: QA-3 five vignettes retitled (THE MULE, THE BET, AN HOUR OF RAIN,
SORE HEELS, THE CROW) · QA-11 clash text says three ogres · QA-22 root-fixed: event recruits
re-roll their trait after the race overwrite, so a race-gated trait can never land on a race its
own gate forbids.

⚠ **QA-7 IS NOT FIXED, AND THE EARLIER LINE HERE SAYING IT WAS IS WITHDRAWN.** Read in code
2026-08-02: the queued scene comes back ONLY on a win (`afterPromotion`). Both `toBattleLost` and
`toRetreat` set `G.queuedEv=null` **on purpose**, with a comment saying so - *"running from a ROAD
ambush means going round the whole stretch, so the place it caught you at goes with it."* So the
finding is real and the behaviour is deliberate, which makes it **a ruling for the author, not a
bug to fix**: fleeing the Thing in Armour deletes the Dead Company, one of the eleven no-skip
beats, and THE LONG FIRE one node later then talks about *"nine men in a ditch three miles back"*
that this player never met. Three ways out, all one line: fire it anyway on the fled path; keep
dropping it and gate the Long Fire's clause on having seen it; or accept the seam. Nothing was
changed either way.

THE USER'S RULINGS, same day (chat, then built in 8f.91): **QA-17 the tunnel is an intended
SECRET**, stays as is · **QA-12 the dog pack stays** - it is the keep-your-ground skill check ·
**QA-14 softened one turn**: the noble's advance is up ~30% across all four tavern doors
(40/80/50/120, prose updated; the wagon strongbox untouched) · **QA-15/19 rejected**: provisions
are heal-only fuel, not a daily tax - arriving at the fen hungry is the price of generosity,
working as designed · **QA-23/25 ruled bugs**: the clash kill ending was already written (8f.90)
and the Bonepicker rest line now lands its joke (8f.91).

STILL OPEN: QA-7 above (author's ruling: fire the beat on the fled path, gate the Long Fire's
clause, or accept the seam) · QA-27 the bells line (flavour call) · QA-13/16/21 nerve legibility
and the broke-finale arrival, which the advance bump may or may not cover - the friends playtest
decides.

FOUND WHILE FIXING, not in the original 27 (all fixed in 8f.90, details in the CHANGELOG):
the Warm Spring's full-company heal was **free** on an empty barrel · **nine more** content rows
spent provisions or crowns without ever checking for them · Bonepicker's Camp was **one gate away
from a real soft lock** (four costed options, no exit) · walking back down the re-opened under-hill
road would have **re-opened the Fen-Mother** · the ogre door promises four ratkin and fields five ·
THE BROKEN MEN's count (QA-11's second half) said five men for four men and two dogs.
