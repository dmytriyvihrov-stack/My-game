---
name: grimtoll-230-stat-icons
description: "#230 the four stat icon families at 32px - LANDED on main + DEPLOYED 2026-08-21 (8f.253). The clip counter skips overflow:visible BY DESIGN, so a shrunk flex column PAINTS OVER its neighbour while every gate reads 0; and whose worst case a screen has is a per-AXIS fact"
metadata: 
  node_type: memory
  type: project
  originSessionId: ccbb21a8-b753-4f00-803e-be85f8373409
  modified: 2026-08-21T20:11:59.360Z
---

**2026-08-21. The user delivered a finished icon pack and asked for it in the build:** *"I got icons
for stats. Can you please add them to the build: prototype/assets/stat-icons-final-32px/CLAUDE-INSTRUCTIONS.md
9 things for each stat"*, then mid-turn *"size 32px - lets try to make it like that"*.

**What landed:** 36 paintings, HANDS/BOOTS/BRAINS/HEARTS on str/agi/int/mor, embedded verbatim at
native 32x32. #204 had left **two of four illustrated at 16px and agi/mor drawing nothing**. Two
render sites: the sheet's four tell rows, and the hover ladder's nine rungs (which is where the art
actually pays - see the picture in the session). `statIcoAt` is the one `<img>` builder now; the
ladder's own copy had already drifted.

⛔ **THE CLIP COUNTER IN `ui-scales.md` §5 CANNOT SEE THE COMMONEST WAY A FIXED COLUMN BREAKS, AND
THAT IS BY DESIGN RATHER THAN A BUG IN IT.** It skips `overflow:visible`, which is nearly every block
on this build. So when a flex column runs out of room and shrinks a child that has a **fixed-height
grandchild** inside it, nothing clips - the grandchild **paints over the next block** - and `LINT()`,
the clip counter and the stylesheet all look fine. The company sheet ships this on HEAD: `#iBody` was
`flex:0 1 auto;min-height:0` around a 196px `#iDollBox`, and a body wearing THE CIRCLE **with a
promotion point banked** lay 12.6px across the SKILLS caption, silently. The probe (now in §5)
compares one child's PAINTED bottom - walking its descendants, because the shrunk parent reports its
shrunk height honestly - against the next child's top. ⛑ The fix is `flex:0 0 auto`, i.e. stop the
shrink so the scroller does its job, never chase the overlap.

⛔ **AND WHOSE WORST CASE A SCREEN HAS IS A PER-AXIS FACT.** #200 established the Captain as this
sheet's worst case and every later measurement inherited that. For HEIGHT he is the **best** case: he
has no dismiss button, so his `iFoot` is 2px against every crew member's 25. Measured on him the
slack read 53px; the real number is 30. **The first cut of this work was sized against him and
overlapped on the other three bodies.**

⚠ **A PROBE THAT LEAVES STATE BEHIND FABRICATES A BASELINE.** The first reading said HEAD overlaps on
THE CIRCLE alone. It does not - the previous probe had left `statPoints=1` on the same body and
nothing reset it. That wrong number was already written into a code comment before the re-run caught
it. **Reset the body at the top of every case, and re-run any case that surprises you on its own.**

⚑ **THE ORDER IS THE ONE FACT THAT MUST NEVER DRIFT, AND THE PACK SHIPS IT BACKWARDS.**
`TELLS[k].s` is sorted DESCENDING (strongest first) because `tell()` reads it with
`.find(v>=threshold)`; the handoff lists `grade-minus-4` first. The generator reverses, every row
carries its grade as a comment, and `verify_order.py` reads the 36 rows back **out of the shipped
prototype** and matches each against the file on disk AND the word it stands beside. Do that after
any regeneration - it is thirty seconds and it is the only check that can catch a one-step slip.

⚠ **THREE OF THE FOUR FAMILIES WERE UPSCALED TO 32 FROM A 24px MASTER** (`export_final_stat_icons_32.ps1`,
NearestNeighbor; only BOOTS is native 32). So their pixel grid is already uneven and drawing one into
16 would be a 2:1 halving on top of a 4:3 stretch. **Never resample these.** ⚠ The negative margin is
`-1` and may not be `-2`: `Clear-OuterPixel` leaves EXACTLY one transparent pixel and the art reaches
it on HANDS and BOOTS.

⚠ **WHAT THE SIZE COST, AND IT IS THE OPEN QUESTION FOR HIM.** The row went 17.4 → 33; four of them
want +53.4 against 30px of slack. Paid in `--p` steps off `#iChar` (gap 6→4, padding 9→6), `.itl`
(padding-bottom 2→0) and `#iStats` (padding 6→4) = 32 raised against a 23.4 bill. **Two states now
scroll instead of fitting**: a banked promotion point (8px) and THE CIRCLE (21px). That is a real
cost against #133's *"one screen, no scroll"*, taken out loud. **26px removes all the pressure and
24px gives the old air back** if he dislikes the tighter sheet.

⚑ **A tip measured against the stage in a letterboxed driver lies.** The hover ladder read "32px past
the stage bottom" at the driver's 1280x800; at the true 1280x720 every tip clamps 8px inside. Same
family as #197's pin-the-camera lesson.

Related: [[grimtoll-200-company-sheet-round-four]], [[grimtoll-204-stat-ladders]],
[[grimtoll-measuring-the-running-build]], [[grimtoll-safe-file-patching]].
