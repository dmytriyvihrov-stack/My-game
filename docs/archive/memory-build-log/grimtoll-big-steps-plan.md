---
name: grimtoll-big-steps-plan
description: "Grimtoll now has a human-scale roadmap ABOVE the backlog - two playtest gates, 13 steps to the first - and it is where \"what next\" gets decided"
metadata: 
  node_type: memory
  type: project
  originSessionId: d4391c58-d4a4-40e3-b41e-eb030821c03b
  modified: 2026-08-01T13:57:09.239Z
---

**Added 2026-08-01 at the user's request** to `docs/00_PLAN_AND_BACKLOG.md`, as a new section
**"The big steps: the road out of the prototype"**, sitting between *Where the build stands* and
*The plan*. Their ask: *"more human bigger steps plan, that should be done. To see dynamic… at some
moment we will use this high lvl plan to choose which ones to pick from the backlog."*

**The shape.** Two gates. **G1 = ten friends**, thirteen steps `G1-1 … G1-13` (their twelve, plus
one I put in front). **G2 = 20-30 independent people**, frame only, content is the user's. G3 left
blank on purpose. Each step has a **done-test** and a **consumes from the backlog** column, plus
**status** (`☐ ◐ ☑ ? ⏸`) and **MOVED** (the date the status last changed). **The MOVED column is the
feature** - it is what "to see dynamic" asked for, and it is the data source when they ask to see
progress visually. Update it in the same edit as a status change, never backdate.

**The brief, in the user's words, and it is not a feature request:** *"if it is too raw for people
to get… everything is 'prototype', it is harder to trust the world and get engaged."* So **gate 1
adds no systems** - every step makes a thing legible, fair, or finished.

**The one step that is mine and not theirs: G1-1, the arena (#13), goes first.** Three of their own
bullets are the word *balance*, and this project's own standing rule is that a balance pass is
measured with #13 or it is somebody's opinion repeated four times. Their own ordering
(classes → races → fights) is right and worth keeping: a fight is *composed of* the other two.

**⚖ Two open decisions the section creates, both the user's to rule, both written into the file:**
1. **#50 is marked "deliberately last" and gate 1 wants it fourth.** Recommendation on the page:
   treat G1-2/3/4 as #50's parking lot drawn down to *playtest grade*, keep the number, keep the
   terminal pass for the deferred pieces it holds (#45, #29, #30). No renumbering.
2. **Nothing in the existing "Now, in this order" plan is inside gate 1** (settlements MVP, #24,
   #32) **except #13**, which is next either way. A pointer block at the top of *The plan* says so;
   the old order stays authoritative until they rule.

**Honest estimate given back to them:** their *"3-4-5 days"* holds only if the balance steps are
timeboxed and the three `?` steps (art / sprites / audio) run in parallel as their own work.
**G1-4 is the runaway risk** - a balance pass with no stop condition eats a week.

**★ THE BACKLOG IS BUCKETED BY DATE NOW, AND IT OUTRANKS THE TIER STRIP (user, 2026-08-01):**
*"divede all backlog for: need to be done before first play test / needs to be done before second
playtest / could be done later"* plus *"bigger conceptual quastion (like sckills synergies) put to
second one. same metaprogression."* Ask in order, stop at the first yes: **Ⅰ** does a friend need it
to understand the game or be treated fairly (nothing here may add a system) · **Ⅱ** does the depth
pass need it before strangers arrive (**and the conceptual work by their ruling: #45 the synergy
rule, plus #59 and the settlements MVP as the metaprogression**) · **Ⅲ** later, and say out loud it
is not a demotion. **Ⅰ = #13 #50 #27 #12 #39, and the short length is the finding**: gate 1 is mostly
unnumbered polish. ⚑ **THREE CRITICAL GATES and the word means exactly one thing, something else
cannot start**: #13, #24, #4+17. Never mark a row critical because it is *important*.
⚖ **#47 is the one placement that is a judgement** (a rework, but it touches enemy AI in both brains
the week before the build goes out) and its reversal trigger is written down: if the class pass finds
the spearwoman unsayable in one sentence, it comes forward.

**The visual view is the `master-board` skill** (`.claude/skills/master-board/`, page published at
`claude.ai/code/artifact/a6203c02-2946-4272-b3e5-83f7d5e691c2`). ⛔ **It is a VIEW, never a source**:
if it disagrees with the docs, the docs win. **The user chose the light theme by name** ("I love
white one") so the page deliberately ignores `prefers-color-scheme`; do not "fix" that.

**⚑ The transferable find, added on the second pass (2026-08-01).** The gate's question list did not
have to be invented: **the open remainders of shipped entries ARE the playtest questionnaire.** Nine
of them already said some version of *"the harness structurally cannot answer this"* (#18 #64 x2
#63 #56 #8 #60 #55 #66). They are now collected into one table at the foot of the gate-1 section.
**So when an entry ships with a human-only question, it is not a loose end, it is playtest
content**, and it is the first place to look the next time a run needs a script.

Related: [[grimtoll-game-project]] · [[grimtoll-session-pacing]] ·
[[explain-and-mockup-before-building]] · [[capture-all-task-context]]
