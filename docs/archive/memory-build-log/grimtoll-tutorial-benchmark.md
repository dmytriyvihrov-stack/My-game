---
name: grimtoll-tutorial-benchmark
description: "The 2026-08-14 tutorial benchmark - five neighbours' onboarding measured against Grimtoll's own eight teaching layers, and the 34:7 fight-to-road split it found"
metadata: 
  node_type: memory
  type: project
  originSessionId: ecf4891b-61f4-45fa-8ae8-82e80c531893
  modified: 2026-08-14T14:30:41.590Z
---

**#-less research, 2026-08-14, written to `docs/TUTORIAL_BENCHMARK_2026-08-14.md`.** The companion to
[[grimtoll-combat-benchmark]]: that one measured the FIGHT, this one measures the TEACHING. Asked
for by the user ("сделай расширеный ресерч по туториалам... How they engage in combat and world
tutorials? Make a detaild comparison and check, how i did it"). Artifact:
https://claude.ai/code/artifact/18dde79f-09b6-4850-aab7-ac2bb4093469

⛔ **THE FINDING THAT OUTLIVES THE DOCUMENT: all five neighbours teach the FIGHT well and the WORLD
badly, and every one of them is criticised for the world, not the fight.** Wildermyth proves it is
not a resource problem - the same team shipped the best combat tutorial in the set (classes are cast
by story: hero picks up a tool and IS the Warrior) and the worst overworld. **Grimtoll has the
identical bias and it is countable: of 41 authored teaching beats, 34 are the battle and 7 are the
road.** 9 of 10 `WHISPER` entries are combat rules; all 8 learn-tier `CAPLINES` are combat; the road
is taught once, in a 4-step tour, in the first thirty seconds, and never again at the moment a rule
bites. ⚑ **That is the 2026-08-10 playtest complaint ("too many options/systems from the start")
pointing at the road screen, and the teaching instrument is aimed at the other half.** See
[[grimtoll-clarity-pass]].

⚑ **The architecture is genuinely ahead of all five and the COVERAGE is not.** Nothing in the set
has a spotlight layer, a wave-scripted teaching fight, four registers with a written priority
contract (HEART > CALL > TEACH, lessons queue rather than drop), or once-ever flags that persist per
PLAYER rather than per save. Two ideas worth stealing that are NOT in the build: **Qud's tutorial
ends exactly where a normal game starts** (Grimtoll already does this - the tap-room brawl is the
run, not a mode, so this is a win rather than a gap) and **Urtuk's extraction zones**, retreat as a
place on the board rather than a menu item.

⚠ **The best line in the research is from a Battle Brothers player in 2019 and it is the project's
own thesis:** *"Players are not annoyed by the lack of tutorial. They are annoyed by the amount of
[stuff] thrown at them by the system."*

Open, in priority order and all obeying cut/delay/merge: **the road needs a first-bite layer** (move
4 tour facts into `WHISPER` at first payday / first grievance / first scar / first salvage decision,
which shortens the tour); **the tour cannot be recalled** (`G.wTutDone` rides the save - re-run the
four `w_*` steps from `? RULES`); **`? RULES` is 3 of 5 sections about the battle** and covers
nothing about the company sheet, gear, scars, camps or event pricing; **the #154 intent glyphs have
no legend** and live only on hover, which is the exact thing Urtuk's UI is criticised for.
