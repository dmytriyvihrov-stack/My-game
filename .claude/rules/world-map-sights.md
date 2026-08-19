# World-map sights: the icon on a map node

Apply this rule whenever map-node icons are added, replaced, rebuilt, embedded or remapped. It is
the standing procedure behind #113, #114, #115, #116, #117 and #121. Read it before touching
`art/src/world-map-sites/`.

The art itself arrives from outside (GPT), with its brief in
`art/src/world-map-sites/CLAUDE_INSTRUCTIONS.md`. That file is the ART contract. This file is the
INTEGRATION contract, and where the two disagree about a number on screen, this one wins: the
brief cannot see the map's arithmetic.

## The governing rule the art must already obey

**A sight shows what the company notices from the road: a place, a creature, a landmark.** Never a
choice, an outcome, a reward or a pile of event nouns. One dominant mass, at most one supporting
shape, one colour accent. If a detail dies at icon size, it is deleted, not sharpened.

## The pipeline, in order. Never hand-paste base64

1. Sources land in `art/src/world-map-sites/` as `MAP-EV<NN>_<slug>-source.png`. Both native alpha
   and `#ff00ff` chroma are accepted; the script detects which.
2. `build_event_sites.py` writes a **128px master** and a **48px icon** per source, trimmed,
   grounded and padded, plus the contact sheets.
   ```powershell
   & 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
     'art\src\world-map-sites\build_event_sites.py'
   ```
3. `art\build_assets.ps1` embeds the **128px masters** as `MAP_ART`, verbatim PNG. The key is the
   filename prefix with hyphens removed: `MAP-EV04_drowned-chapel-128.png` -> `MAPEV04`.
4. `art\inject.ps1` puts the built block into the prototype. It gates on `tools\claim.ps1`, so take
   the lock first.

⛔ **Never send these through the stage-1/2 resize or JPEG path. A JPEG has no alpha and these are
cut-outs.** The pass asserts 128x128 on every file, which is how it refuses a contact sheet.

⛔ **Embed the 128px masters, not the 48px files.** The map draws a sight at 96px (#116), and a
48px file stretched to 96 is mush. The 48px exports stay on disk as the legibility proof and the
contact sheet; they are not what ships.

⚑ **`build_assets.ps1` zeroes alpha below 40 before embedding.** Most hazy masters carry a
near-invisible wash across the whole canvas, invisible at 48px, but at 96px the CSS silhouette ring
drop-shadows every non-zero pixel and the wash lights up as a coloured square. Do not remove this
pass, and do not "fix" a haze artifact in the renderer.

## Where an event key meets a picture

`MAP_SIGHT{}` in `prototype/grimtoll_slice.html` is the ONE place, and `sightFor(n)` is the ONE
gate. Add a key there and nowhere else. A key with no entry falls back to the abstract type mark,
which is a legitimate shipping state, not a bug.

- **A sight shows from the first screen** (#116, the user: *"he should be visible permanently"*).
  The NAME still hides behind `n.real` until arrival. Do not re-gate the picture; if a specific
  painting ever spoils something, pull that one key out of `MAP_SIGHT`.
- `armour` is painted and deliberately unmapped: it is an ambush, not a place.
- `cache` has no art on purpose: a buried bag is not visually strong at this scale.

## ⛔ What breaks every time, and it is never the art

**A sight is a ~96px object dropped onto a screen whose placement rules were written for a 33px
glyph.** Every round on this surface has been the same shape: a rule that was complete when it was
written, against a map that grew a second kind of object.

So after ANY change to which nodes are painted, run all three and expect zero:

```js
spacingViolations().length   // node against node
labelViolations().length     // road label against plate AND against painting
Object.entries(MAP_SIGHT).filter(([k,v])=>!MAP_ART[v])   // mappings with no art
```

`labelViolations()` walks every node as a stand, so it is the whole map, not the current screen.
Measure in the running build. The pane often will not composite frames, so the DOM and these
counters are the proof, not a screenshot.

⚠ **Painting a node changes its NAME PLATE too**, because a sighted node uses `NAME_DY_SIGHT` (54)
where an unsighted one uses `NAME_DY` (21). A node that gains art moves its own plate 33px down.
That is why adding an icon can break a neighbour that nobody touched.

## ⛔ ALL THREE COUNTERS CAN READ ZERO WHILE A ROAD RUNS THROUGH A PAINTING

*(#194, 2026-08-19, adding a node to the first corridor.)* `labelViolations()` scores a road's
**price LABEL** against plates and paintings. **Nothing scores the road CURVE itself.** So a node
can be placed, pass 0/0/0, and still have `drawMap`'s quadratic drawn straight across its 79px
painted core - and the counters will go on saying the map is clean, because none of them looks at
`drawCurve`.

⚑ **THE BUILD ALREADY KNEW THIS AND FIXED IT BY HAND, ONCE.** `EDGES` carries an optional sixth
element, a vertical bow, and its only user is `dead→snare` with the comment *"a straight line from
The Dead Company to The Snare passes through The Old Milestone's glyph"*. That is this fault,
found by eye, patched at one site, and never turned into a check.

⛔ **SO A NEW NODE IS CHECKED AGAINST EVERY EDGE BY HAND, AND THE ARITHMETIC IS THE CHECK.** For
each edge `a→b` that does not touch the new node, sample the same curve `drawMap` draws and take
the closest approach to the node point:

```js
/* every road, against every painted node it is not an endpoint of */
(()=>{const bad=[],pt=(a,b,t,bow)=>{const cx=(a.x+b.x)/2,cy=(a.y+b.y)/2-((b.y-a.y)*.14)+(bow||0),
    u=1-t;return{x:u*u*a.x+2*u*t*cx+t*t*b.x, y:u*u*a.y+2*u*t*cy+t*t*b.y};};
  EDGES.forEach(e=>{const a=NODES[e[0]],b=NODES[e[1]];
    Object.keys(NODES).forEach(k=>{ if(k===e[0]||k===e[1])return;
      const n=NODES[k],A=artBox(n); if(!A)return;
      for(let i=0;i<=40;i++){const p=pt(a,b,i/40,e[5]);
        if(Math.abs(p.x-A.x)<A.w/2 && Math.abs(p.y-A.y)<A.h/2){
          bad.push(e[0]+'->'+e[1]+' crosses '+n.n);break;}}});});
  return bad;})()                                            // expect []
```

⚠ **AND IT IS WHY A PLACEMENT CAN BE GEOMETRICALLY LEGAL AND STILL WRONG.** #194's solver found a
whole family of positions between the dogs and the muster that every counter passed, and all of
them sat under the muster-to-fen road. The fix was to place the node somewhere else, not to bow
the road: a bow is a patch for one edge, and it was already the only one in the file.

⛑ **THE COUNTER WAS PROVED BY MAKING IT FIRE, WHICH IS THE ONLY WAY A NEW CHECK IS WORTH
ANYTHING.** A check that has only ever returned `[]` is indistinguishable from one that is broken.
Run on the shipped map it returns `[]`; the wedding then moved to the rejected `(790,296)` with
`['hire','mother',...]` pushed back onto `EDGES`, and it returned exactly
**`hire->mother crosses The Clan Wedding`**; restored, `[]` again. Do the same to any check added
to this file - move a node into the fault on purpose, watch it report, put it back.

⚠ **`hasSight`/`sightFor` reach `MAP_SIGHT`, which is a `const` hundreds of lines below the boot
IIFEs.** Reading it from its temporal dead zone throws and aborts the whole script. Anything
called at boot must go through the `hasSight` try/catch. This file has shipped that crash once.

⚠ **`tools/dramaturge.html` hand-copies the node constants** and is the tool the map is edited in.
When `NODE_PLATE_H`, `NAME_H`, `NAME_DY` or the art box changes, change it there too or the editor
will approve layouts the game flags.

## ⛔ #197 · A CAPTION AT THE FOOT OF THE MAP, AND WHY THE NODE DOES NOT MOVE

*(2026-08-19. The user, arrows at the bottom edge: **"cant see down part of the map"**.)*

⛔ **THE MEASUREMENT HAS TO PIN THE CAMERA FIRST, AND TWO READINGS WERE WRONG BEFORE THE THIRD.**
At the DEFAULT stop (`WCAM.i` is **1**, NEAR, z 1.22) the map overflows by **121px** and six nodes
are cut, which is a fact about the ZOOM and not about the layout. And `b.style.top` is **camera
space** while `getBoundingClientRect` is **screen space**, so mixing them reports a node's own
caption as sitting 81px below itself. Pinned to ROAD, `WCAM.x=y=0`, `wcamApply()`, and **waited on**
(the transform is transitioned, so a `getComputedStyle` in the same tick still returns 1.22), the
real number is **22px and three captions**.

⛔ **AND THEN EVERY GLOBAL FIX IS ARITHMETICALLY CLOSED, WHICH IS THE PART WORTH KEEPING:**

- **the map cannot grow.** The stage is 720 and `#wBar` is 42 and `#wMap` is 678: exactly.
- **nothing can scale down.** `--fs1` is a 10px FLOOR (`.claude/rules/ui-scales.md` §1) and the
  name plate is already on it.
- **`vy()` cannot map into a shorter band.** The terrain canvas is stretched 638 → 678 by the same
  ratio and the nodes track the PAINTING (#190). Any change to `vy` drifts every node off the
  ground it was placed on, by up to 79px at the foot.
- **and the nodes may not move**, which is what #194 paid for: placement here is decided by roads,
  plates, spacing AND the picture underneath, and four authored positions do not slide.

⚑ **SO THE ONE THING WITH SLACK IS THE CAPTION, AND THE FIRST CUT USED ALL OF IT AND BROKE THE
MAP.** Hanging the plate off the painting's TOP edge instead of its bottom is a clean 122 design px
the other way, and the gate caught it at once: **`spacingViolations` 0 → 2 and `labelViolations`
0 → 1** against a `git show HEAD:` baseline driven to the same screen. Four plates had moved into a
row nobody had touched, which is this file's oldest finding arriving again.

⛔ **THE SHIPPED RULE IS THAT A CAPTION RISES BY ITS OWN OVERFLOW AND NOT ONE PIXEL MORE.**
`capLift(n)` is that arithmetic, `--lift` is it written onto the node, and **`plateBox` reads the
same function** - or `labelViolations()` goes on scoring road labels against a plate that is not
where it is drawn, and reports a clean map while a price sits on a name. Today it is 14 to 37px on
four nodes and 0 on the other 22. **It costs the bottom of those four paintings**, which is the
trade, and the alternative was measured: moving them up to y 555 leaves one spacing violation and
takes four nodes off the ground #190 painted for them.

⚠ **A NEW SIGHT AT THE FOOT OF THE MAP THEREFORE CHANGES ITS OWN PLATE**, the way #116's
`NAME_DY_SIGHT` already does. Both are functions of the node, and both are why `plateBox` is a
function rather than a rectangle.

## The picture that pays the gate

The eye check is a page under `shots/`, because the preview pane composites nothing. Draw the new
sights at their real 96px on the map's own ground (`#100c06`), with a few already-live sights beside
them as calibration. `art/src/world-map-sites/build_event_sites.py` writes a focused contact sheet
for the same purpose.

⚠ **`shots/121_new_sights.html`, which this rule used to name as the example, was deleted on
2026-08-14** with the rest of the pre-#133 captures, to get 179 MB back. `shots/` is gitignored
scratch, so it is gone rather than archived. **The surviving example of the shape is
`shots/143_event_chips.html`**: the build's own CSS, live captures, nothing composited by hand.

## Numbers that are load-bearing, with the reason attached

| Thing | Value | Why it is that and not bigger |
|---|---|---|
| embedded master | 128x128 | 96px display needs real pixels |
| display size | 96px | #116, down from #115's 120 at the user's "20% smaller" |
| art box (`ART_W`/`ART_H`) | 79 x 74 | the painted core the placement rules score against |
| name plate offset, sighted | `NAME_DY_SIGHT` 54 | the caption sits on the painting's bottom edge |
| name plate offset, unsighted | `NAME_DY` 21 | unchanged since the 33px glyph |

Do not enlarge a sight to make it prettier. #113 proved the ceiling with arithmetic rather than
taste, and every round since has been paid for in placement rules.
