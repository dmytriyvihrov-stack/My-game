# The tutorial benchmark - how five neighbours teach a fight and a world, and where RabbleBound's own layers sit

**Written 2026-08-14.** Companion to [COMBAT_BENCHMARK_2026-08-11.md](COMBAT_BENCHMARK_2026-08-11.md),
which measured the FIGHT. This one measures the TEACHING, which is the clarity pass's own subject.

**Why it exists, in the user's words:**

> *"сделай расширеный ресерч по туториалам, как работает, для похожих игр: bb, wartales, caves of
> qud, wildermyth, urtuk. How they engage in combat and world tutorials? Make a detaild comparison
> and check, how i did it"*

The second half is the half that makes this a document. A survey of five games is trivia. A survey
with **this build's own registers counted beside it** is an instrument, which is #88's rule
(⛔ *measure the box before you argue about the font*) applied to onboarding.

**Method and its limits.** Part one is read from developer blogs, official wikis, store pages,
critic reviews and Steam discussions; it is a read of recurring themes, not a counted sample, and
nothing in it should be quoted as a percentage. Part three is different: it is **counted in this
repository**, and every figure in it has a one-liner beside it that recounts it in the running
build.

---

# PART ONE - what each of the five actually does

## 1. BATTLE BROTHERS

**Shape: a scripted contract, in-fiction, skippable after a few minutes.**

The intro was rebuilt once, and the developers' own account of the problem is the most useful
paragraph in this whole document. Before the rebuild a new player got *"a big wall of text"*,
then an even larger tutorial contract description, and **many players missed the tutorial
entirely**: they attacked the nearest bandits without hiring anybody, died, and formed what the
devs called *"an odd first impression"*.

The replacement is a short story about how you come to command a company, *"presented as a short
contract involving several steps and a series of events and dialogs"*, containing a first battle.
It teaches basic combat, hiring, buying equipment, camping and repairing.

**The teaching voice is a person.** The devs are explicit: instruction arrives through
*"individual characters explaining things and giving their opinions"* rather than generic
tutorials. This is the same device as RabbleBound's Captain balloon, arrived at independently.

**What it covers today**: Hoggart's contract. Build a company of at least six, buy basic kit, win
one manageable fight. In the community's own summary of the tutorial's scope: *"That's it."*

**What it does not cover**, from the players who listed it: action points, surround bonuses,
morale, fatigue, initiative, armour, retreating; settlement trading, how to make money, loot;
hiring decisions, equipment priority, perks.

**The world layer's real teacher is not the tutorial, it is AMBITIONS.** A goal system, added
later, which the devs describe as small-scale and *"somewhat tutorial-esque"* at the start: get to
a dozen men, save for a battle standard, find a sergeant. It never explains a rule. It answers
*"what do I do now"*, which is a different question and the one the open world actually raises.

**The verdict, repeated across reviews**: the tutorials explain the bare minimum and the HUD
explains little more; the Switch review called the tutorial incompetent; the devs have conceded
the onboarding *"could definitely be smoother"*.

⚑ **And the single best line in the research, from a player in the tutorial-brainstorm thread:**
*"Players are not annoyed by the lack of tutorial. They are annoyed by the amount of [stuff] thrown
at them by the system."* That is the 2026-08-10 playtest complaint, said by somebody else about
another game, six years earlier.

## 2. WARTALES

**Shape: none. Popups on first use, tooltips everywhere, and trial and error.**

There is no guided opening. Pop-ups fire the first time you engage a given activity (the crafting
and gathering minigames, combat). Every skill has a tooltip. Complexity is gated behind unlocks:
classes and specialisations arrive over hours, so the game leans on **teaching by drip** rather
than teaching by lesson.

The complaint is consistent and it is about the first fifteen minutes: *"a bunch of options at the
start that have no context for a new player, then you're dropped on a map"* with one text box about
combat. Players call the opening *"aggressively barren/opaque"*. Load-bearing systems go unstated:
one commenter *"didn't know how morale and willpower were supposed to work, until I searched the
game's subreddit"*.

⚠ **It is a choice, not an accident.** The same studio's Northgard is repeatedly cited by the same
players as having *"did a great job orienting people"*. Wartales decided the tooltip was enough.

## 3. CAVES OF QUD

**Shape: fifteen years with no tutorial, then a separate tutorial mode shipped just before 1.0.**

The most instructive case in the set, because the fix arrived after the game was finished and the
developers had a decade of watching people bounce.

⚑ **The structural idea worth stealing is one sentence: the tutorial *"ends with your character
arriving in Joppa, just like in a standard game."*** It is a prologue that delivers you to the
normal starting position. Nothing is taught twice, nothing is skipped, and there is no seam where
the training wheels come off, because the training wheels ARE the first ten minutes of the run.

Two details from the beta patch notes are worth having: they fixed a **hotkey bypass exploit for
required selections**, and blocked **editing the tutorial preset**. A guided sequence needs its
doors locked or players walk out of the middle of it.

**The rest of the teaching is the world itself.** In a game where everything is procedural, Joppa
is hand-authored and constant: *"the layout and NPCs players encounter will always remain the
same, giving them a solid foundation."* The **water ritual** teaches the faction system by being
the thing you do there, not by explaining it.

**The permanent reference layer is a verb, not a page.** Qud's answer to "what is this" is
`look`/examine, available on literally everything on the screen. That is a different bet from a
rulebook and it scales to a game with ten thousand nouns in it.

The roadmap admits what the tutorial does not reach: character creation needed to be *"more
sensible and parseable by new players"*, with preset builds. **The character sheet was the other
wall**, and the tutorial did not solve it.

## 4. WILDERMYTH

**Shape: the tutorial is a campaign. The best combat teaching in the set, and a world layer that
players call confusing.**

Age of Ulstryx opens with an **Introduction** that the wiki calls *"the tutorial of Wildermyth"*,
followed by three chapters.

⚑ **The Introduction teaches by CASTING, and this is the cleverest thing any of the five does.**
The first hero picks up a tool mid-battle and is the Warrior. The second grabs a bow and is the
Hunter. The third finds the book and is the Mystic, testing the new power *"with a spoon or
stick"*. Each class arrives as the story reason it exists, so the lesson and the fiction are the
same event. The wiki's own words: *"The mechanics emerge organically from the unfolding events
rather than through dedicated tutorial prompts."*

The chapters then carry the world layer in order: Calamities (enemy upgrades), Opportunities (side
quests), overland map management.

**Permanent reference**: a *How to Play* page in the main menu, with links to the wiki and an
official Combat Basics video in its top-right corner. ⚠ **A game shipping a link to its own YouTube
video inside its own help screen is an admission**, and it is the one the devs made out loud:
*"Our tutorial could be a lot better."* Their offered fallbacks were lower difficulty and external
videos.

**The complaints are all about the overworld, never the fight**: *"Almost nothing is explained in
this game"*; *"The overworld section is just so confusing"*; a player naming a contradiction the
game never resolves (*"It first says you should secure tiles to ward against enemies, but securing
takes time"*); and the late discovery that the campaign runs on a timer, which reads as a betrayal
in a game sold on story.

⛔ **That split is the finding.** Best-in-set combat teaching, worst-in-set world teaching, in one
game, from one team. Whatever causes it is not talent.

## 5. URTUK: THE DESOLATION

**Shape: the thinnest. The first battle, then hover, then the difficulty curve.**

The first battle is where the combat basics are learned. The store page's own onboarding answer is
a video: *"For a quick video introduction of Urtuk, please head to the screenshot/video section and
select the second video."*

Everything else is mouse-over, and the UI took the criticism for it: the combat interface has *"a
lot of popup information that flashes over the screen as the player mouses around, sometimes
obscuring characters"*, and the traits screen *"is largely empty and requires mousing over traits
individually to get any information other than a name, which makes the game just a touch harder to
learn."*

⚠ **The real teacher is the difficulty curve, and everybody says so**: the first map is easy, the
second *"spikes hard"*, and *"players tend to learn by dying"*.

⚑ **The one device worth stealing: extraction zones.** Retreat is a PLACE on the board (pale tiles
with an escaping-figure icon) rather than a menu item. It teaches "you are allowed to leave, and
leaving costs less than an injury" without a sentence of tutorial. Terrain that is a rule.

---

# PART TWO - the nine devices, and who uses them

| device | BB | Wartales | Qud | Wildermyth | Urtuk |
|---|:--:|:--:|:--:|:--:|:--:|
| **scripted opening** (authored, not generated) | yes, a contract | no | yes, a mode | yes, a campaign chapter | partly, first battle |
| **in-fiction teacher** (a character says it) | yes | no | partly, Joppa NPCs | yes | no |
| **spotlight / cutout / arrow** | no | no | no | no | no |
| **first-bite popup** (once, when the rule bites) | no | yes, per activity | no | no | no |
| **hover tooltip / inspect verb** | yes | yes, the main layer | yes, `look` on everything | yes | yes, the only layer |
| **permanent reference page** | no | no | no | yes, How to Play | no |
| **goal-giver** ("what do I do now") | yes, Ambitions | no | yes, Joppa quests | yes, chapter objectives | no |
| **safe failure** | no, permadeath | no | reload modes | no | yes, extraction zones |
| **difficulty as onboarding** | yes, Beginner | no | yes, modes | yes, Adventurer | no |

**Five findings that hold across the whole set:**

1. ⛔ **Every one of the five teaches the fight better than it teaches the world, and every one of
   the five is criticised for the world.** Wildermyth proves it is not a resource problem: the same
   team shipped the best combat tutorial and the worst overworld in the group.
2. **Nobody spotlights.** All five teach with a text box beside the screen, a tooltip under the
   cursor, or nothing at all. Not one dims the screen and points at the thing.
3. **Two of five put the teaching in a person's mouth** (BB, Wildermyth), and those two are the
   two whose openings are described as pleasant rather than merely functional.
4. **Three of five ship a goal-giver**, and it is a different organ from a tutorial: it never
   explains a rule, it answers "what now". It is what stops an open world reading as a menu.
5. **Two of five ship a permanent reference** and one of those two links out to a video from
   inside it.

---

# PART THREE - RabbleBound measured

Counted in `prototype/grimtoll_slice.html` on 2026-08-14 (build 8f.183). Recount any figure in the
running build with the line beside it.

## The eight layers that exist

| # | layer | where | size | when it speaks |
|---|---|---|---|---|
| L0 | **the scripted opening** | Three Bells brawl, #108 | 4 waves | the first fight of every run |
| L1 | **the spotlight** | `TUTSTEPS` | **18** (14 battle, 4 road) | at the moment, over the real element |
| L2 | **the whisper** | `WHISPER` | **10** | once ever, when the rule first bites |
| L3 | **the Captain** | `CAPLINES` | **13** (8 learn, 4 call, 1 heart) | on the field, in his own voice |
| L4 | **the hover** | `RACEHELP` 3 · `CLASSHELP` 7 · `STATHELP` 4 · the hit breakdown · `choiceIco` titles | 14 authored + 2 computed | when asked |
| L5 | **the reference** | `HELP` behind `? RULES` | **5** sections, on every screen | when asked |
| L6 | **safe failure** | the practice field · *The tutorial fight* on the front door · "nobody dies in a fight" | 3 doors | always |
| L7 | **the intent glyph** | `CHOICE_ICO` 8 + `RACE_ICO` 3 | 11 marks | on every road door, before it is read |

```js
Object.keys(TUTSTEPS).length                                    // 18
Object.keys(TUTSTEPS).filter(k=>k.slice(0,2)==='w_').length     // 4   the road tour
Object.keys(WHISPER).length                                     // 10
Object.values(CAPLINES).filter(e=>e.tier==='learn').length      // 8
HELP.length                                                     // 5
Object.keys(CHOICE_ICO).length+Object.keys(RACE_ICO).length     // 11
```

## The same matrix row, for comparison

| device | RabbleBound |
|---|---|
| scripted opening | **yes, and it is the run** - the tap-room brawl is the first fight, not a mode |
| in-fiction teacher | **yes**, the Captain, with a written tier contract |
| spotlight / cutout / arrow | **yes**, and it is the only one in the set |
| first-bite popup | **yes**, 10 of them, once ever per PLAYER (`LEGACY.seen`) not per save |
| hover tooltip | yes, race, class, stat, the whole hit arithmetic |
| permanent reference | yes, `? RULES`, on every screen |
| goal-giver | **no** - the contract plate names a destination, nothing sets a goal |
| safe failure | **yes, three ways**, and one of them is a game rule rather than a setting |
| difficulty as onboarding | **no difficulty setting exists** |

## What this build does better than all five, with the reason

1. **The spotlight layer is unique in the set.** A dim sheet, a bright cutout over one REAL element,
   an arrow, two sentences. And ⚑ **the anchors are functions returning live elements**
   (`a:()=>$('bActions')`), so a step can never describe furniture that has moved, and a step whose
   anchor is missing skips itself rather than pointing at nothing.
2. **Teaching in waves inside one fight.** 1v1 with a drunk, then three carters through the door,
   then a knife and the barman, then your crew stands up. One system per wave, and each wave is a
   fiction event rather than a chapter break. Wildermyth does this with class casting; nobody in
   the set does it with the shape of the fight.
3. **Four teaching registers with an explicit conflict contract.** HEART outranks CALL outranks
   TEACH, a losing comment is dropped rather than queued, a LESSON queues rather than drops, and
   the whispers are muted during the brawl so their once-ever flags are not spent on a fight the
   spotlight is already teaching. ⛔ **None of the five documents a conflict rule, and Urtuk's UI
   criticism is exactly what that absence looks like.**
4. **Once-ever is per player, not per save.** `LEGACY.seen` means a veteran's second company is
   silent from turn one. BB's answer to the same problem is a skip button.
5. **Safe failure is a place, not a setting.** *The tutorial fight* sits on the front door: the
   taught brawl, replayable, nothing spent, `SIM` borrows `G` and gives it back. Urtuk's extraction
   zones are the nearest thing in the set and they are much narrower.
6. **"Nobody dies in a fight" is an onboarding device disguised as a rule.** It is stated plainly in
   `? RULES`, and it is what lets the first fight be genuinely dangerous. BB's permadeath is the
   direct cause of its brutal-early-game reputation and of how much its thin tutorial is asked to
   carry.
7. **The intent glyphs have no equivalent anywhere in the set.** BB, Wartales and Wildermyth all
   present event choices as plain text. Marking the CLASS of a decision before it is read is a
   teaching device none of them has.
8. **The teaching fight is tuned by measurement, not by taste.** Playtest #6: the enemies soak more
   and hit no harder, because the fight was ending in 2-3 rounds and the lessons had nowhere to
   bite. The ratkin branch was then measured at 67% win over 12 arena runs a branch, 7-16 rounds,
   median 12. Nothing in the set publishes a figure like that.

---

# PART FOUR - findings, in priority order

## 🔴 1. The road has one teaching layer where the fight has four

**The measurement.** Of the authored teaching beats in the build:

| | battle | road |
|---|---:|---:|
| `TUTSTEPS` | 14 | 4 |
| `WHISPER` | 9 | **1** (`prov`) |
| `CAPLINES`, learn tier | 8 | 0 |
| `HELP` sections | 3 | 2 |
| **total** | **34** | **7** |

```js
/* the whisper split, in the running build */
Object.keys(WHISPER).length                      // 10, and only `prov` is a road rule
```

The fight is taught four ways: a wave that forces the situation, a spotlight on the element, a
whisper the first time the rule bites, and a Captain line. **The road is taught exactly once, in a
four-step tour, in the first thirty seconds of a run, before anything has happened yet.** After
that tour, no road rule is ever taught again at the moment it bites.

**What the neighbours do.** All five have the same bias and all five are criticised for it. This is
not a place where the field is ahead; it is the field's shared hole, and it is the exact hole the
2026-08-10 playtest complaint fell into (*"too many options/systems from the start"* is a sentence
about the road screen, not the battle).

**The move, and it respects the pass's rule** (⛔ *nothing is added, the only moves are cut, delay
and merge*): the whisper layer already exists, is already once-ever, already persists per player,
and already has one road entry. **Delay four of the tour's facts out of the tour and into the
moment they first bite** rather than authoring new ones. The first payday, the first grievance, the
first scar, the first time salvage is worth more than crowns. Each is a `WHISPER` key and a call
site; the tour then gets shorter, which is a cut.

## 🔴 2. The road tour fires once per run and can never be recalled

`worldTut()` gates on `G.wTutDone`, which rides the save. A player who clicks through the four
steps in four seconds has spent them for that company, and `? RULES` does not cover the road
screen's furniture.

BB has no reference at all and is criticised for it. Wildermyth ships one and links a video out of
it. **RabbleBound has the reference and the tour, and they do not know about each other.**

**The move is a merge, not an addition.** The four `w_*` steps are already authored, already
anchored to live elements, and their text is already computed at show time (`w_res` reads
`dailyUpkeep()` live, so it can never go stale). Re-running them from `? RULES` costs one row and
one call to `worldTut()` with the gate lifted.

## 🟡 3. `? RULES` covers the fight three ways and everything else once

Sections: HOW A TURN WORKS · HOW A HIT WORKS · HOW NERVE WORKS · NOBODY DIES IN A FIGHT · WHAT THE
ROAD COSTS. Three of five are the battle.

Nothing in it covers the company sheet, gear and slots, scars and healing, the camp, how an event
choice is priced, or salvage against gems against crowns. ⛔ **The reference layer answers the half
of the game that was never the complaint.** Qud's roadmap names the identical mistake: the tutorial
was built and *character creation* was still the wall.

**The move is a merge.** #133 already wrote the company sheet's own explanations and #143 already
wrote the receipt's vocabulary. A sixth section is mostly a re-use, not new prose.

## 🟡 4. The intent glyphs have no legend

`choiceIco` attaches a `title` per glyph (name plus description), so the meaning exists **only on
hover**, on a surface where the player is reading and deciding rather than exploring. ⚠ **That is
the Urtuk failure mode exactly**, and Urtuk is the one game in the set whose UI is criticised by
name for it.

Eleven marks, one line each, or one `WHISPER` on the first road card of a run. Either is a cut
against the alternative, which is the player learning ⚔️🤝 by taking it once.

## ⚪ 5. There is no goal-giver, and I would not build one for a one-act slice

Three of five ship one. BB's Ambitions exist precisely because *"some [players] crave being
provided with more direction"*. RabbleBound's answer today is the contract plate: Skelbrook, the head
in the chair, ◉80 paid, the road east. For **one act with one destination that is honest**, and a
goal system would be an addition in a pass whose rule forbids additions.

⚑ **Written down so the decision is on the record rather than absent.** It becomes a real gap the
day act two exists and the map stops having one obvious direction.

## ⚪ 6. No difficulty setting, and the substitute is probably better

Four of five use difficulty as an onboarding aid. RabbleBound has none. What it has instead is three
doors of safe failure and a game rule (nobody dies in a fight) that makes the whole question
smaller. ⚠ **The gap is real for one player only: the one who is losing the first fight and has
nothing to turn down.** The practice field is where that player is sent, and nothing on the losing
screen tells them it exists.

---

## The one-paragraph answer to "how did I do it"

**The teaching architecture is ahead of all five games surveyed, and the coverage is not.** Nobody
else in the set has a spotlight, a wave-scripted teaching fight, four registers with a written
priority contract, or per-player once-ever persistence; those are genuine and they are the reason
the tap-room reads better than any of these five openings. But 34 of the 41 authored teaching beats
are about the fight, the road is taught once in the first thirty seconds and never again, and the
one screen that could fix that (`? RULES`) does not describe the road screen. **The instrument is
built. It is pointed almost entirely at the half of the game that was never the complaint.**

---

## Sources

Battle Brothers: [Dev Blog #72, the new introduction and tutorial](https://battlebrothersgame.com/dev-blog-72-progress-update-tutorial-music-experienced-mercs/) ·
[Dev Blog #89, Ambitions](https://battlebrothersgame.com/dev-blog-89-ambitions/) ·
[Better Tutorial brainstorm](https://steamcommunity.com/app/365360/discussions/0/3092263696191667314) ·
[RPGamer review](https://rpgamer.com/review/battle-brothers-review/) ·
[Finger Guns Switch review](https://fingerguns.net/reviews/2021/03/11/battle-brothers-review-switch-band-of-brothers/) ·
[TheSixthAxis review](https://www.thesixthaxis.com/2022/01/13/battle-brothers-ps4-xbox-review/)

Wartales: [Is there no tutorial?](https://steamcommunity.com/app/1527950/discussions/0/6169410373942429705) ·
[Beginner's guide](https://earlyguides.com/wartales/beginners-guide) ·
[Combat guide](https://earlyguides.com/wartales/combat)

Caves of Qud: [tutorial beta out now](https://freeholdgames.itch.io/cavesofqud/devlog/809524/tutorial-beta-out-now) ·
[beginner tutorial out now](https://freeholdgames.itch.io/cavesofqud/devlog/824513/beginner-tutorial-out-now-release-date-announced-and-dromad-deluxe-edition) ·
[roadmap](https://www.cavesofqud.com/roadmap/) ·
[Joppa, official wiki](https://wiki.cavesofqud.com/wiki/Joppa) ·
[beginner's guide](https://earlyguides.com/caves-of-qud/beginners-guide)

Wildermyth: [Age of Ulstryx, official wiki](https://wildermyth.com/wiki/Age_of_Ulstryx) ·
[I wish there was more of a tutorial](https://steamcommunity.com/app/763890/discussions/0/3077628901007335029/) ·
[Combat mechanics, official wiki](https://wildermyth.com/wiki/Combat_mechanics) ·
[Beginner's guide](https://steamcommunity.com/sharedfiles/filedetails/?id=1926567284)

Urtuk: [Steam store page](https://store.steampowered.com/app/1181830/Urtuk_The_Desolation/) ·
[Cthulhu's Critiques review](https://cthulhuscritiques.com/2021/03/10/urtuk-the-desolation-review/) ·
[Turn Based Lovers review](https://turnbasedlovers.com/review/urtuk-the-desolation-2/) ·
[Beginners' guide](https://steamah.com/urtuk-the-desolation-beginners-guide/)
