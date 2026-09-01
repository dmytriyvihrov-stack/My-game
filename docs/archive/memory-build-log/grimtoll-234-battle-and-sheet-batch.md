---
name: grimtoll-234-battle-and-sheet-batch
description: "#234 the seventeen-ask batch - LANDED + DEPLOYED 2026-08-22 (8f.257). A caption set sideways was the tallest thing in a row and it was blocking every ask on that screen; and a family normalised on HEIGHT let its width cap make the four weakest pictures the four widest"
metadata: 
  node_type: memory
  type: project
  originSessionId: da36546c-7b54-4279-acc2-0b18d4787cf4
  modified: 2026-08-22T08:07:34.381Z
---

**#234 LANDED on main and DEPLOYED 2026-08-22 (8f.257)**, merged from desk `work/battlefeedback`
(`405a3d2`) with no conflict - it was the only unmerged branch. Seventeen asks in two messages,
opening with a screenshot with two red arrows on a target's health bar.

⚑ **AND THE SESSION'S SECOND HALF WAS THE USER ASKING WHY IT HAD TAKEN SO LONG**, which produced
`tools/dev/` and the `/drive` skill: see [[grimtoll-session-toolkit]]. The toolkit is the lasting
half of this entry.

## The two findings worth carrying

⛔ **A CAPTION SET SIDEWAYS IS THE TALLEST THING IN ITS ROW AND NOTHING ON SCREEN SAYS SO.** The
company sheet's `ON THE FIELD` label was `writing-mode:vertical-rl` at `--fs1` and measured **85.2px
tall against the 58px picture it labelled**, so the header row was 95.2 high to hold a LABEL. `#iChar`
had **3.8px of slack on its worst body**, which is why every ask to grow anything there had been
arithmetically impossible for as long as the caption existed - and nobody had looked, because a
caption is not what a height audit opens. Deleting it (it was furniture: a 26x38 painted body on a
sheet already carrying the portrait, name, class and weapon) paid for a bigger portrait AND
`#iChar{gap}` `--p2`->`--p3` **and still left every one of the sixteen body-and-state cases with more
slack than HEAD**. ⚑ **The general rule is in `.claude/rules/ui-scales.md` §4 now: when a fixed column
has no room, measure the things that are NOT the content** - a rotated label, a vertical rule, a
sticky footer's negative margin. A height that comes from `writing-mode` is a LENGTH OF TEXT wearing
the wrong axis, i.e. the one number in a layout that grows when somebody edits a string.

⛔ **A FAMILY NORMALISED ON ONE AXIS INVERTS ITS OWN LADDER ON THE OTHER.** #230 normalised the nine
BRAINS to a common content HEIGHT capped at 30px wide, and its note says the cap is what keeps the
flat lumps flat. It is also what made **the four weakest pictures the four WIDEST** (30x15/18/21/20
against the crowned at 29x26). Per-grade caps 18/21/24 fixed it. ⚠ Grade 1 came down though nobody
asked, because otherwise the bottom ran big-small-small-big. Written up in
`.claude/rules/static-event-art.md`, along with the fact that `STAT_ICON` rows are re-embedded from
the pack by matching their own `/* minus-2 */` grade comment - the rows are in TELLS order, STRONGEST
FIRST, and the pack ships the other way round, so that comment is load-bearing.

## What else the batch taught

⛑ **AN ASK CAN OVERRULE A RULE IN ITS OWN PARENTHESIS.** #231 hid the hit % behind a picked-or-hovered
card because *"an answer with no question in front of it is furniture"*. *"enemies who are in range of
my attack **(without movment)**"* is the counter-argument: that question stands all turn. And the fear
was never real - `udist(u,occ)<=range` is measured from the hex the body is ON, so a foe you would have
to walk to has never carried a figure. **Read what the old rule was actually protecting before
arguing with it.**

⛔ **DARK ALREADY MEANT `GONE` ON THAT ELEMENT, AND ONLY THE PICTURE SAID SO.** The damage preview's
first cut washed the doomed run of the health bar in near-black and it read as *a bar that is already
that short* - the empty track is `#2a1e1f`. A warm lift (`rgba(255,196,150,.45)` under a lit left
edge) is a mark nothing else on the bar wears, and ONE wash reads on all nine lightnesses `hpCol` can
return and on the pale grey shell, where a chosen hue would have needed one per row. **Two probes said
the geometry was right and the screenshot said the meaning was wrong.**

⚑ **ONE OF THE SEVENTEEN WAS ALREADY TRUE, AND SAYING SO NEEDED A MEASUREMENT RATHER THAN A READING.**
*"when enemy move - don't show your opportunity attack %"*: driven, on a foe's turn and again mid-walk
(`B.busy`), the grid reports `aiming` false, 0 `.zodds`, 0 `.hex.zhit`, 0 shown `.hodds`, 0 shown
bands. It cannot go stale because `paintHand()` runs at the foot of `render()`. Report it as verified,
never as "already fine".

⚠ **A COST-FREE TRAIT NEEDED A NAME FOR ITS EXEMPTION, NOT A SPECIAL CASE.** Dropping the Captain's
armour condition broke LINT 12 (*every rollable trait names what it pays*). `authored:true` joins
`foeOnly` in `traitFits` and in the linter: a line nobody can ever roll cannot unbalance a pool it is
not in. ⚑ `CLS_BY_RACE` has never contained `captain`, so that was already true and nothing said so.

⚠ **THE CHASE GOT SLIGHTLY EASIER AND THAT IS THE ASK LANDING, NOT A DRIFT.** Swapping the DOCK HOOK
for a SHORT KNIFE, n=40 a side: rounds unchanged (median 5, 4-8), bodies down **0.45 -> 0.25 mean**,
runs losing anybody **38% -> 23%**. The pull was what dragged somebody out of the line, so removing it
is exactly where the difference shows. n=40 is thin for that interval; the direction is the finding.

⚠ **AND THE RULE FILES LIVE IN THE DESK TOO.** A patch script written against
`.claude/rules/` under the MAIN path edits the shared tree, not the branch. Caught by
`git status` in main; the fix was to copy the two files into the desk and `git checkout --` them
in main. **Point every doc edit at the desk, the same as the prototype.**

Related: [[grimtoll-231-board-answers]], [[grimtoll-230-stat-icons]], [[grimtoll-232-mood-rename]],
[[grimtoll-measuring-the-running-build]], [[grimtoll-parallel-sessions]].
