---
name: batch
description: "Run a batch of numbered feedback asks off screenshots or a list. Triage each ask against the running build BEFORE building anything, because a large share of them turn out to be bug reports, already-shipped features nobody could see, or several asks with one cause. Use whenever the user hands over a numbered list of points, a set of screenshots with notes, another buch, or any multi-item round of feedback."
---

# Running a batch of asks

The dominant workflow here: the user plays, screenshots, and hands over a numbered list. Forty-two
such batches have shipped, from 2 asks to 25.

## ⛔ THE SIZE OF THE BATCH IS NOT THE VARIABLE. MEASURED.

Across all 42 batches, remainders left open per batch: **0.9 for batches of 14+ asks, 0.8 for
batches under 14.** No relationship. #240 shipped nineteen asks with zero remainders; #276 shipped
six and left five.

⚠ **AND SINGLE-SCREEN BATCHES HAVE THEIR OWN FAILURE MODE, WHICH THE RECORD SHOWS TWICE AS LOUDLY.**
The battle screen was batched by screen and took **nine rounds** (#91 through #105), the company
sheet four, the road screen six. The memory on that period says it in one line: *by round eight,
"taste" is often a wrong constant.* Batching by screen invites re-litigating the same surface
instead of finishing it.

⛑ **SO MIX FREELY, AND SPLIT ON DEPENDENCY RATHER THAN ON SCREEN.** Two asks belong in different
batches when one's answer changes the other's question, or when one needs a rules-and-a-picture pass
first. Everything else can ride together.

⛔ **THE ONE REAL LIMIT IS THE GATE, NOT THE COUNT**: a batch is too big when you can no longer run
the per-ask verification below on every item in it. That is usually well past twenty.

## ⛔ TRIAGE BEFORE YOU BUILD. MOST ASKS ARE NOT REQUESTS.

This is where batches actually go wrong, and it is the same finding every time:

| the record says | what it was |
|---|---|
| #247 | **three asks were shipped features nobody could SEE** |
| #245 | **three were built and unreachable**, one was a regression report |
| #243 | **two "show more clearly" asks were bug reports in disguise** |
| #274 | **three AI complaints were ONE predicate** |
| #197 | the missing ogre door **existed the whole time**: it failed after the click, not before |

⛑ **SO THE FIRST PASS IS REPRODUCTION, NOT DESIGN.** For each ask, drive the build (the `drive`
skill) and answer one question before writing any code: **is this absent, present-but-invisible,
present-but-broken, or several asks with one cause?**

- **absent** - build it.
- **present but invisible** - the fix is a readout, not a feature. Do not build it twice.
- **present but broken** - it is a bug report. Find the cause, which is often not where the ask
  points (#239: the ask named the bow, the fault was the spear's reach footprint).
- **one cause** - merge them and say so, or you will fix one symptom three ways.

⚠ **A user's words describe what they SAW, never where the fault is.** *"On the other battle they
were standing"* was a range constant; *"in the event it said 4 and there were 5"* was a card
counting out loud that the plan function had outgrown.

## ⛔ THE DEFECT THAT ACTUALLY COSTS THIS PROJECT IS THE ONE NOBODY DRIVES

Grep the record for `since #` and the pattern is overwhelming: **the expensive defects are promises
that shipped and were not paid, and they live for tens of entries before somebody trips over them.**

Coldharrow soft-locked on every visit **since #243** and was found at #269. The perk tree drew on
the stash tab **since #264**. Three readouts promised a DISENGAGE card most bodies had not carried
**since #224**. The mood bar drew ticks at rungs that did not exist **since #129**. The mirehares
were unreachable **since #193**. XP fell 3.5x and nobody noticed at all.

⛑ **None of those came from a batch being too big. Every one came from something being shipped
without being driven.** So the per-ask rule is absolute:

⛔ **AN ASK IS NOT DONE UNTIL IT HAS BEEN DRIVEN IN THE RUNNING BUILD.** Not read, not reasoned
about, not "the code clearly does this now". `.claude/rules/how-we-work.md` rule 2. A batch of
twenty driven asks is safer than a batch of three reasoned ones.

⛑ **AND RUN THE CENSUS AT THE END OF ANY BATCH THAT ADDED CONTENT** (a card, a statblock, art, an
item, a skill, a node):

```bash
python tools/dev/gt.py eval reach.js        # built but unreachable, in one round trip
python tools/dev/gt.py eval promises257.js  # a rung that prints a sentence the engine does not pay
```

⚠ **`reach.js` is a LIST TO READ, not a gate.** A legitimate shipping state is common. What you are
looking for is the row you cannot explain.

## The order

1. **Number every ask** in the user's own words, verbatim, before interpreting any of them. Their
   wording is the evidence, and a paraphrase loses the symptom.
2. **Triage each against the running build** (the table above). Report what you found, especially
   the asks that turned out to be something else, before building.
3. **Merge the ones with one cause.** Say which, so the user can disagree.
4. **Build**, loading the skill for each surface you touch (`how-we-work.md` has the routing table).
5. **Drive each ask** and keep the reading. One probe per ask where it is measurable.
6. **Run the row from the gate table**, plus the census above if content was added.
7. **Declare remainders honestly**: `⏳` for work left, `👤` for anything only the user can decide,
   which also goes in `docs/OPEN_QUESTIONS.md` the same session.
8. **The five writes**: `python tools/record.py new <N> "<title>"` opens all four holes.

⚠ **A batch's report is the asks, one line each, saying what happened to it.** The user handed over
a numbered list and is checking it off. Answer in their numbering, and name the ones you did not do.
