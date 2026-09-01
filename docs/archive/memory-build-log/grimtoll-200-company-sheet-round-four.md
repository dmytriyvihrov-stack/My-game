---
name: grimtoll-200-company-sheet-round-four
description: "#200 the company sheet round four - a narrowed COLUMN breaks a ROW and the damage lands on a different axis three blocks away; a gear slot had two mouths"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0d99b84d-dc78-47cc-937c-5071aa6a3d58
  modified: 2026-08-19T11:03:44.625Z
---

**#200 (8f.222), 2026-08-19. Committed on `work/sheet-round-two` (f894d6a) and NOT merged to main**,
because the em-dash sweep session held the main-desk lock on `prototype/grimtoll_slice.html` and a
1,338-site sweep is a whole-file rewrite. Land with
`tools\branch.ps1 done sheet-round-two` from the main folder once that lock clears.

Nine numbered notes from the user over four screenshots with the faults boxed in red. Three things
worth keeping:

⛔ **A NARROWED COLUMN BREAKS A ROW, AND THE BREAK DOES NOT STAY ON THE AXIS YOU TOUCHED.** `#iStash`
450 to 560 passed the doll's own arithmetic (two 150px slot columns plus a 130px figure need 436)
and then wrapped the Captain's six 78px ability cards onto a second row. That row costs 83px in a
column that measures **exactly 678 into a 678px window**, so the flex column gave the height up and
`#iDollBox` rendered **166 instead of its declared 196: the figure was clipped**. So a column width
is set by the widest fixed-cell row it carries, and ⚠ **the widest row is not the one on screen** -
the sheet opens on whoever was selected last, and the six-card body is the Captain. Drive every
member before believing a width. 530 is the number that row allows. Written into
`.claude/rules/ui-scales.md` §4 as the horizontal half of the rule that file only had vertically.

⛔ **A GEAR SLOT HAD TWO MOUTHS AND ONE OF THEM PRINTED THE DESCRIPTION TWICE INSIDE ITSELF.** A
filled slot drew its CSS `.pop` AND `bindTip`'s `#gtTip`; `popBody` was `g.d + gearLine(g,p)` and
`gearLine` ends on `<i>g.d</i>`. 173 words in two overlapping boxes, now 50 in one. ⚑ **The repair
found a field that existed only in prose**: `spellRange:2` is the working stave's whole reason to
exist and NEITHER renderer read it, so the fact was the last sentence of a flavour paragraph. It is
derived in both now and the sentence is deleted, which is #176's rule arriving on `GEAR`. See
[[grimtoll-event-card-rules]].

⚠ **A HOVER ON A ROW THAT REBUILDS ITSELF USES `title=`, NEVER `tipOn`.** Clicking a roster row calls
`drawInv`, which destroys the element under the cursor, and a `#gtTip` whose anchor is removed never
fires `mouseleave` and hangs on screen for ever. That is the 2026-08-02 map-node bug in
[[grimtoll-qa-workflow]] and the roster is exactly its shape.

⚑ **The baseline tab is what made the report honest.** `git show HEAD: > prototype/_head_baseline.html`,
served from the same server, same party, same probe: `SPAN.tv 0x2` x4 and `SPAN.role 4x1` on BOTH
builds, plus one finding on HEAD alone (`SPAN.tv 6x2`, a stat word clipped in the shipped game).
Raw counts mean nothing; the diff does. See [[grimtoll-invisible-feature-shape]].

⚠ **Open and deliberately not in this entry: `drawInv()` takes ~4.4s on a seven-body roster.** Same
on the build before it. It is [[grimtoll-192-item-pack-01]]'s 128px item paintings being decoded on
every draw and it wants its own number.

Before/after captures (the build's own CSS, live DOM, canvases flattened to data URIs):
`shots/200_before.html` and `shots/200_after.html` on the desk. `shots/` is gitignored scratch.
