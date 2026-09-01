---
name: world-map-sights
description: "The integration contract for the icon on a map node: the build pipeline and its sizes, MAP_SIGHT against MAP_PLACE, the three placement counters, the road-crossing probe and the caption arithmetic. Use whenever a map node icon is added, replaced, rebuilt, embedded or remapped, and whenever a node is placed or moved."
---

# World-map sights: the icon on a map node

Apply this rule whenever map-node icons are added, replaced, rebuilt, embedded or remapped.

> **The reasoning, the measurements and every user quote behind these rules are in
> [`docs/archive/rules-history/world-map-sights.md`](../../../docs/archive/rules-history/world-map-sights.md).**
> Read it when a rule looks arbitrary, when you are about to argue with one, or when you need the
> entry number. Nothing was cut, only moved: this file is the same rules with the story taken out.

`art/src/world-map-sites/CLAUDE_INSTRUCTIONS.md` is the ART contract; this file is the INTEGRATION
contract. **Where they disagree about a number on screen, this one wins**: the brief cannot see the
map's arithmetic.

## The governing rule the art must already obey

**A sight shows what the company notices from the road: a place, a creature, a landmark.** Never a
choice, an outcome, a reward or a pile of event nouns. One dominant mass, at most one supporting
shape, one colour accent. If a detail dies at icon size, it is deleted, not sharpened.

## The pipeline, in order. Never hand-paste base64

1. Sources land in `art/src/world-map-sites/` as `MAP-EV<NN>_<slug>-source.png`. Native alpha and
   `#ff00ff` chroma both accepted; the script detects which.
2. `build_event_sites.py` writes a **128px master** and a **48px icon** per source, trimmed,
   grounded and padded, plus the contact sheets.
   ```powershell
   & 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
     'art\src\world-map-sites\build_event_sites.py'
   ```
3. `art\build_assets.ps1` embeds the **128px masters** as `MAP_ART`, verbatim PNG. Key = filename
   prefix with hyphens removed: `MAP-EV04_drowned-chapel-128.png` -> `MAPEV04`.
4. `art\inject.ps1` puts the block into the prototype. It gates on `tools\claim.ps1`: take the lock.

⛔ **Never the stage-1/2 resize or JPEG path: a JPEG has no alpha and these are cut-outs.** The pass
asserts 128x128 on every file, which is how it refuses a contact sheet.

⛔ **Embed the 128 masters, not the 48s.** The map draws at 96px; a 48 stretched to 96 is mush. The
48s stay on disk as the legibility proof and the contact sheet.

⛔ **`build_assets.ps1` filters `MAP-*-128.png`, NOT `MAP-EV*`** *(#237)*, so a new filename family
needs nothing from the build script. The event prefix once left four `MAP-LOC` sources unembedded.

⚑ **It zeroes alpha below 40 before embedding**, because at 96px the CSS silhouette ring
drop-shadows every non-zero pixel and a master's near-invisible wash lights up as a coloured square.
Do not remove the pass, and do not "fix" haze in the renderer.

## The two tables: an event, and a permanent place

`sightFor` opens `if(!n||!n.ev)return null` and `hold` has no `ev`, so a place that is not an
encounter was structurally unpaintable. A fake `ev` is worse: `ev` decides which CARD is dealt.

| | events | permanent places |
|---|---|---|
| the row says | `ev:'<event key>'` | `site:'<place key>'` |
| the table | `MAP_SIGHT{}` | `MAP_PLACE{}` |
| the gate | `sightFor(n)` | `placeFor(n)` |
| the files | `MAP-EV<NN>_<slug>-128.png` | `MAP-LOC<NN>_<slug>-128.png` |
| drawn at | **96px**, `.sighted` | **64px**, `.place-sighted` |
| the caption | `NAME_DY_SIGHT` (54) | `NAME_DY_PLACE` (41) |

Each table is the ONE place its kind of key meets a picture. Add a key there and nowhere else. **A
key with no entry falls back to the abstract type mark: a legitimate shipping state, not a bug.**

⛑ **64 and not 96** *(#237)*: a place you pass through is not a thing that happens to you, and five
at an event's size would make the road read as thirty-two encounters. One constant if judged wrong.

⛔ **A place is keyed on the NODE, never on `t:'hire'` or `t:'town'`** - #137's derivation rule
deliberately not applied, because *what a place looks like* is particular to that place; deriving
off the type hands the next town Coldharrow's farmstead, silently. ⚡ **The cost is that somebody
must LOOK at the map after obeying it** (the last muster was left the one abstract glyph among 27
paintings). **The answer is a second explicit key, never a fall-through.**

- **A sight shows from the first screen**; the NAME hides behind `n.real` until arrival. Do not
  re-gate the picture; if one painting spoils something, pull that key out of `MAP_SIGHT`.
- `armour`: painted, deliberately unmapped. An ambush, not a place.
- `cache`: no art on purpose. A buried bag is not visually strong at this scale.
- `wynn`: painted, deliberately unmapped. Opened by `afterBattle` inside the Snare, so no node has
  ever carried `ev:'wynn'` and none can. `MAPEV28` stays embedded.

## ⛔ The counters, after ANY change to which nodes are painted

**A sight is a ~96px object on a screen whose placement rules were written for a 33px glyph.** Run
these in the running build and expect zero:

```js
spacingViolations().length   // node against node
labelViolations().length     // road label against plate AND against painting
```
```js
Object.entries(MAP_SIGHT).concat(Object.entries(MAP_PLACE))
  .filter(([k,v])=>!MAP_ART[v])                                  // expect []
/* and the census: every node either sighted or placed */
Object.keys(NODES).filter(k=>!sightFor(NODES[k])&&!placeFor(NODES[k]))   // expect []
```

`labelViolations()` walks every node as a stand, so it is the whole map, not the current screen. The
pane often will not composite frames: the DOM and these counters are the proof, never a screenshot.

⚠ **Painting a node moves its own plate 33px down** (`NAME_DY_SIGHT` 54 against `NAME_DY` 21), so
adding an icon can break a neighbour nobody touched. The counters are part of that edit.

## ⛔ All three counters read zero while a road runs through a painting

*(#194.)* `labelViolations()` scores a road's price LABEL. **Nothing scores the road CURVE.** A node
can pass 0/0/0 with `drawMap`'s quadratic drawn across its 79px painted core, so a new node is
checked against every edge by hand and the arithmetic is the check:

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

⛔ **THE FIX IS TO MOVE THE NODE, NOT TO BOW THE ROAD.** `EDGES` carries an optional sixth element,
a vertical bow, whose only user is `dead→snare`: **a bow is a patch for one edge and was already the
only one in the file.** A placement can be geometrically legal and still wrong.

## ⛔ The curve has ONE description

*(#245.)* `drawMap` drew a quadratic while `labelSpot` placed against the straight chord: two
descriptions of one line, the HEXOFF shape this prototype spent two hundred entries paying for.
**`edgeCtl` is the control point, written once; `edgePt` and `edgeTan` read it, and so does the
road-crossing probe above.**

⛑ **A nearer family is tried first and nothing was deleted.** Pass ZERO offsets along the curve's own
normal; pass one's vertical lifts and #121's sideways family survive underneath, so a normal landing
on a plate loses to the next candidate.

⛔ **THE OFFSET IS THE OUTER LOOP.** t-outer takes the first clean box at the midpoint, even 44px
out, over a 15px one further along the same road, and adding far rungs makes the map WORSE.
Offset-outer asks the right question: **how close to this road can a chip stand ANYWHERE along it.**

## ⛔ A caption rises by its own overflow and not one pixel more

*(#197.)* `capLift(n)` is that arithmetic, `--lift` is it written onto the node, and **`plateBox`
MUST read the same function** - or `labelViolations()` scores against a plate that is not where it
is drawn and reports a clean map while a price sits on a name. It costs the bottom of the lifted
paintings; that is the trade. ⚠ A new sight at the foot of the map changes its own plate, which is
why `plateBox` is a function rather than a rectangle.

⛔ **EVERY GLOBAL ALTERNATIVE IS ARITHMETICALLY CLOSED. DO NOT RE-ATTEMPT:**

- **the map cannot grow.** Stage 720, `#wBar` 42, `#wMap` 678: exactly.
- **nothing can scale down.** `--fs1` is a 10px FLOOR (`.claude/rules/ui-scales.md` §1) and the name
  plate is already on it.
- **`vy()` cannot re-map into a shorter band.** The terrain canvas is stretched 638 → 678 by the
  same ratio and the nodes track the PAINTING (#190); any change drifts every node off the ground it
  was placed on, up to 79px at the foot.
- **the nodes may not move**: placement is decided by roads, plates, spacing AND the picture
  underneath, and four authored positions do not slide.

## ⛔ LINT 8h · a key with a picture is not a key a node can hold

*(#245.)* The orphan check asks whether a key has ART, never whether a node can CARRY it, and a key
no node can hold is a picture that can never be drawn. **LINT 8h** asks:

- authored on a node, **or** in `FLOATING` (dealt to a slot) - otherwise dead;
- ⛔ **and never authored on a node that is ALSO in `SLOTS_ON_MAP`**: `dealEvents()` runs once at the
  top of every run and overwrites the authored key before the player takes a step.

**A dead row is not harmless**: it makes this file's own gate read 0 while an encounter is
unreachable.

## ⛔ The goal fades with the map and its trophy does not

*(#239.)* **`opacity` IS A GROUP AND NO CHILD CAN CLIMB OUT OF ONE.** A parent at .38 composites its
whole subtree at .38. The pip lives INSIDE `.glyph`, so the only way to fade the picture and not the
pip is to fade **what is beside the pip** rather than the box around it:

```css
.node.goal{opacity:1}
.node.goal.far>.glyph>*:not(.gmark),.node.goal.far>.nm{opacity:.38}
.node.goal.locked>.glyph>*:not(.gmark),.node.goal.locked>.nm{opacity:.28}
```

⚠ **The chip's own border and ground are not in those rules, and today that is exactly nothing**:
`snare` is in `MAP_SIGHT`, so the goal is `.sighted` and its `.glyph` is already
`border:none;background:transparent`. **If the contract ever ends somewhere unpainted, the 40px
chip's edge and ground join the list - and they may NOT simply take `opacity`.**

⛑ Proved by MEASURING each part, never by looking: the trophy carries `goalbeat` and a screenshot
samples it at whatever phase it is in.

```js
/* the goal's painting and plate must equal any other `far` node's; its pip must not */
(()=>{const eff=el=>{let o=1,e=el;while(e&&e.id!=='wCam'){o*=parseFloat(getComputedStyle(e).opacity);
    e=e.parentElement;}return +o.toFixed(3);};
  const n=document.querySelector('.node.goal'),f=document.querySelector('.node.far:not(.goal)');
  return {picture:eff(n.querySelector('.glyph img')),plate:eff(n.querySelector('.nm')),
          trophy:eff(n.querySelector('.gmark')),neighbour:eff(f.querySelector('.glyph img'))};})()
/* shipped: picture .38 · plate .38 · neighbour .38 · trophy .72 (its own resting beat) */
```

## Two traps

⚠ **`hasSight`/`sightFor` reach `MAP_SIGHT`, a `const` hundreds of lines below the boot IIFEs**, and
reading it from its temporal dead zone throws and aborts the whole script. **Anything called at boot
goes through the `hasSight` try/catch.** This file has shipped that crash once.

⚠ **`tools/dramaturge.html` hand-copies the node constants** and is the tool the map is edited in.
When `NODE_PLATE_H`, `NAME_H`, `NAME_DY` or the art box changes, change it there too or the editor
approves layouts the game flags.

## Standing conditions

⛑ **A NEW CHECK IS PROVED BY MAKING IT FIRE**, because one that has only ever returned `[]` is
indistinguishable from a broken one: move a node into the fault on purpose, watch it report the
exact string, put it back, watch it go silent. Same for a linter row.

⛑ **THE EYE CHECK IS A PAGE UNDER `shots/`**, because the preview pane composites nothing: the new
sights at their real 96px on the map's own ground (`#100c06`), with live sights beside them as
calibration. `build_event_sites.py` writes a focused contact sheet for the same purpose. The
surviving example of the shape is `shots/143_event_chips.html`: the build's own CSS, live captures,
nothing composited by hand.

⏳ **WHAT HAS NO COUNTER.** `spacingViolations` and `labelViolations` score against `artBox`, so the
plates are checked, but **nothing checks a 64px PLACE painting for crowding** the way the 79x74
event core is checked, and `EDGES` is checked against paintings only by the hand-run curve probe.
**A place crowded by a neighbour passes all three counters.** The day one is placed fresh, measure
it by eye against the picture that pays this file's gate.

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
