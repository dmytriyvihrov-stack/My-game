---
name: ui-scales
description: "The three closed vocabularies for CSS in the prototype (font-size, structural border colour, padding), the pool-bar spec, and the floor, clip, overlap and overflow probes that gate them. Use whenever CSS is written or edited in prototype/grimtoll_slice.html, including inline styles built inside JS strings, and before reporting any layout or type change as done."
---

# The three scales: type, edge, spacing

Apply this rule whenever CSS is written or edited in `prototype/grimtoll_slice.html`, including the inline styles built inside JS strings.

> **The reasoning, the measurements and every user quote behind these rules are in
> [`docs/archive/rules-history/ui-scales.md`](../../../docs/archive/rules-history/ui-scales.md).**
> Read it when a rule looks arbitrary, when you are about to argue with one, or when you need the
> entry number. Nothing was cut, only moved: this file is the same rules with the story taken out.

## The one sentence

**Three properties are a closed vocabulary now: `font-size`, the colour of a structural border, and
`padding`. A new literal px in any of the three is the bug**, not a decision.

This file governs LENGTH, EDGE and AIR. What a surface SAYS is `.claude/rules/event-cards.md`; what a
readout MEANS is #102's wrong-unit rule. ⚑ The scales exist because every game gets the same three
notes (inconsistent outlines, too many font sizes, inconsistent padding), and because of the mechanism
under them: **a build polished screen by screen converges on locally-perfect and globally-unrelated,
and the author is the one person who cannot see it.**

## 1. Type: nine steps, and the first one is a floor

| token | px | what lives there |
|---|---|---|
| `--fs0` | 8 | **a SCALED surface only.** The two figures on a battle hex, and nothing else |
| `--fs1` | **10** | every label, chip, caption, counter and role line. **THE FLOOR.** |
| `--fs2` | 11 | a dense row that is read rather than glanced at |
| `--fs3` | 12 | body |
| `--fs4` | 13 | body, the size a paragraph wants |
| `--fs5` | 15 | a subhead, a name, the number on a chip that matters |
| `--fs6` | 17 | a head |
| `--fs7` | 20 | a big head, the action glyph |
| `--fs8` | 24 | the display line on a card |
| `--fsTitle` | 74 | RABBLEBOUND on the front door, and nothing else |

⛔ **`--fs1` IS 10px AND NOTHING ON THIS SCREEN IS SMALLER.** The test: how far can you step back and
still read it.
⛔ **`--fs0` IS FOR A MAGNIFIED SURFACE AND FOR NOTHING ELSE** *(#231)*. `#bGrid` sits inside a camera,
so `--fs0` renders 13.1 / 17.6 / 20 real px at the three `CAMS` stops. ONE reader today, `.hodds`.
§5's floor probe measures the transform chain, so a `--fs0` anywhere unscaled is reported.
⚠ There is no `--fs-1`. If a readout shouts, the answer is **dimmer or narrower, never smaller**.
⚑ A line-height written as a RATIO survives a raised size by itself; one written in px does not.

## 2. Edge: five colours, and only for structure

| token | hex | what it is |
|---|---|---|
| `--e1` | `#3d2f1d` | gold, dim. The default panel edge |
| `--e2` | `#4d3c22` | gold, mid. A raised or hovered edge |
| `--e3` | `#6b5330` | gold, lit. A selected or important edge |
| `--e4` | `#2c3d3f` | teal, dim. The battle chrome |
| `--e5` | `#35494c` | teal, lit. The battle chrome, raised |

⛔ **AN ACCENT EDGE IS NOT ON THIS SCALE AND MUST NOT BE COLLAPSED INTO IT.** `border-color` carries
MEANING: `var(--gold)` selects, `var(--blood-lit)` warns, `#8ca35a` approves, `#c15d55` is the unpaid
red. Flattening those is #102's wrong-unit bug arriving through a tidy-up. **The scale is for the edge
that draws a box, never for the edge that says something.**
⚠ Thickness is 1px, or 2px when a thing is picked. `border:Npx solid transparent` at 2.5/3/7/9 is a
CSS triangle, not an edge, and is off the scale on purpose.

## 3. Spacing: seven steps

`--p1:2px` · `--p2:4px` · `--p3:6px` · `--p4:9px` · `--p5:12px` · `--p6:16px` · `--p7:24px`

⛔ **A PADDING THAT IS GEOMETRY RATHER THAN SPACING KEEPS ITS LITERAL AND CARRIES ITS ARITHMETIC IN A
COMMENT.** Two survive, and §5's grep must return `86px` alone:

| | what it reserves |
|---|---|
| `#wBar{padding:0 86px 0 var(--p5)}` | the run of bar the top-right button group stands in |
| `#iBar{padding:0 86px 0 var(--p6)}` | the same run on the second bar that carries ☰ MENU. The button is `right:10` and 71px wide |

A scale step substituted at either is a bug. ⚠ A `0` fallback (`var(--aprT,0px)`) is NOT a geometry
literal and must not join that table: those rows are lengths somebody has to justify, a zero is the
absence of one. Write it `0`. ⛑ The table is a list of things somebody has to justify again, never a
licence: a geometry literal that outlives its geometry is what it guards against.
⛔ **A PADDING PAIRED WITH A NEGATIVE MARGIN IS ONE NUMBER WEARING TWO NAMES.** Write it
`calc(var(--pN) * -1)` so the padding, the margin and any sticky offset cannot drift apart.

## 3b. A shared box height is geometry, and it is on none of the three scales

⛔ **A HEIGHT IS NOT A `--p` STEP AND MUST NOT BE MADE ONE.** `--barChip:30px` sits in `:root` on the
same footing as the 86px reservation and carries its arithmetic for the same reason.
⚑ **30 IS NOT A TASTE, IT IS THE ONE LOAD-BEARING CHIP**: a 24px bust, that image's own 1px border,
`--p1`, and the chip's border top and bottom. The bar is 42, so 30 leaves 6px of air either side.
⚠ **If the bust ever changes size this number moves with it.** ⛔ And it is SCOPED
(`:is(#wBar,#iBar)`): an unscoped height follows the first chip ever reused elsewhere.

## 3c. A pool is a mark and a bar with the figure in it, and `--sbh` is its height

**A pool is one row: `.sbar` = a 17px mark column, then a bar with the figures inside it.** Armour,
hitpoints and mood on the battle card (`#bPlq`) and the company sheet (`.ibars`) are the same three
rows off the same block. A fourth surface copies `.sbar`; it does not write a second one.

| | |
|---|---|
| the mark | ⛨ `SLOT_ICON.armour` · ♥ blood · `MOOD_MARK`, one glyph, `U+263A︎` |
| inside, left | the WORD that is a fact: the armour class, the mood rung. Nothing on hitpoints |
| inside, **the middle** | the figure, **`--fs5` on both** |
| the height | `--sbh`, **20 on both** |
| the frame | a `box-shadow` on `.sbt`, never on `.sbb` |
| the dividers | **`::after` on the `.bar`**, on all three rows, derived from `LADDER` via `--nrvticks` |
| the figure's place | grid `1fr auto 1fr`, never `justify-content:center` (two rows carry a word too) |

⛔ **A BAR'S HEIGHT IS A FUNCTION OF THE NUMERAL'S SIZE AND OF NOTHING ELSE**: the display face's
content area is ~1.27em whatever `line-height` says, and Chrome counts it as scrollable overflow.

| numeral | `--fs` | smallest bar it fits in |
|---|---|---|
| 11px | - | 15 |
| 12px | `--fs3` | 16 |
| 13px | `--fs4` | 17 |
| 14px | - | 18 |
| 15px | `--fs5` | **21** |
| 16px | - | 22 |
| 17px | `--fs6` | 23 |

⚠ §5's clip counter gates on `> 1`, so the shipped 20/15 pair is 1 over on both hosts. **Two is a
finding, one is the house state.** ⛔ A bar cannot be made shorter without taking the numeral down
with it. ⛔ `--sbh` is declared on `.sbar`, not in `:root`; a host may override it, today neither does.

⛔ **THE FRAME IS AN `outline` OR A `box-shadow` AND NEVER A `border`.** A border on a border-box
element eats the content box, so a 1px frame costs 2px of type room. On `.sbt`, not `.sbb`: on the
trough it paints in the trough's layer and the `<i>` fill covers it.
⛔ **`::after` AND NEVER `::before` FOR ANYTHING DRAWN OVER A FILL.** A `::before` is the FIRST child
and the `<i>` fill is a real one, so ticks drawn there paint UNDER the fill. ⚠ **No probe in this
project can tell the two apart** - only a screenshot.
⛔ **A NUMBER A STYLESHEET COPIES OUT OF A JS TABLE GOES STALE SILENTLY**: the mood ticks are built
beside `LADDER` and set on `:root`, never typed as CSS literals.
⛑ The fill's light is a `::after` on the `<i>`: `setBar`/`drawInv` write `background:` INLINE there
and an inline shorthand outranks the stylesheet, so the pseudo is the one place a gradient can live
**without touching the colour that is carrying the meaning**.
⛑ **TEXT ON A FILLED BAR TAKES AN OUTLINE, NOT A DROP SHADOW** (four hard 1px offsets plus a blur):
two of the three fills are light, so a soft shadow is a smudge on them.
⛔ **AND THE FIGURE IS NOT PAINTED IN THE FILL'S OWN COLOUR.** The bar carries the hue, the text is
cream, the fact is said once.
⚠ **THE SPECIFICITY TRAP:** `.ibars .bar` is 0-2-0, exactly what `.sbar>.sbb` is, and a tie is decided
by which block was written later, which is not a design. `.ibars .sbar .bar` settles it.

## 4. What a size or a width breaks, and it is never the text

- ⛔ **A raised font size does not break the text. It breaks the BOX measured around the old one.** A
  font-FAMILY change breaks it identically, and is found the same way: by the probe, on every screen.
- ⛔ **A narrowed COLUMN breaks the ROW measured for the old one, and the damage does not stay where
  the change was.** One horizontal number can come back wrong as a clipped figure three blocks down.
- ⛔ **A COLUMN WIDTH IS SET BY THE WIDEST FIXED-CELL ROW IT CARRIES**, found before the number is
  picked. ⚠ The widest row is not the one on screen: drive every member.
- ⚠ **MEASURE THE WORST BODY, NOT THE ONE THE SCREEN OPENS ON, AND WHOSE WORST CASE IT IS IS A
  PER-AXIS FACT.** The Captain is the sheet's worst case for WIDTH (six ability cards) and its BEST
  case for HEIGHT (no dismiss button: `iFoot` 2px against a crew member's 25).
- ⛔ **WHEN A FIXED COLUMN HAS NO ROOM, MEASURE THE THINGS THAT ARE NOT THE CONTENT.** A rotated
  label, a vertical rule, a sticky footer's negative margin: each is a box with a height, and a height
  from `writing-mode` is a LENGTH OF TEXT wearing the wrong axis, the one number in a layout that
  grows when somebody edits a string. Check whether the thing setting the height says anything at all
  before hunting pixels elsewhere.
- ⚑ **`padding-bottom:var(--p1); margin-bottom:calc(var(--p1) * -1)`** is the right tool ONLY when the
  box is forbidden to grow. Where there is slack, raise the line-height.
- ⛑ **FORCE THE COMPANY BEFORE COMPARING A SHEET ACROSS TWO BUILDS.** `makeParty()` rolls names per
  page load and a longer one wraps the header. Use `ARENA.COMPS.prepared()` on both.
- ⚑ **A comment that carries its arithmetic pays for itself the first time somebody changes the
  input.** Write the sum, not the answer.
- ⛔ **A CUT MADE ON SOMEBODY'S WORD GETS A SWITCH.** `SHEET_STAT_WORDS` is one `const` and one
  ternary, and it is why the correction hours later cost one line instead of a re-argument. Shipped
  `true`, label three letters wide, from `k.toUpperCase()` and never a fifth table.

## 4b. A card with a hard ceiling does not clip, it crushes the thing beside it

`#wDlg` is `max-height:658px; overflow-y:hidden` and `#wChoices` is sticky, so enough buttons squeeze
`.bd` to a height of ZERO while the clip counter, the overlap probe and `LINT()` all read 0.

```js
/* any card in #wDlg. Expect 0 overflow and a .bd with height in it. */
(()=>{const d=$('wDlg'),b=d.querySelector('.bd');
  return {cardOverflow:d.scrollHeight-d.clientHeight,
          bdHeight:b?+b.getBoundingClientRect().height.toFixed(0):null,
          lastRowInMap:(r=>r&&r.bottom<=$('wMap').getBoundingClientRect().bottom+.5)
            ((d.querySelector('#wChoices .choice:last-child')||{}).getBoundingClientRect
              ?d.querySelector('#wChoices .choice:last-child').getBoundingClientRect():null)};})()
```

⚠ **`replaceDlg()` FIRST, OR THE FIRST TWO READINGS ARE BOTH WRONG.** A card placed while its screen
was hidden measures every `offsetHeight` as zero. **Pin the card before you believe a pixel.**

## 4c. A rule that must reach two hosts uses `:is()`

⛔ **`:is()` AND NEVER A SHARED CLASS.** `:is()` takes the specificity of its most specific argument,
so the rule keeps exactly the weight it had; a class drops it under whatever rule sits above. That is
what lets `#wCompany`/`#wRes` be MOVED onto `#iBar` for two selectors becoming `:is(#wBar,#iBar)`.
⚠ **MOVED, never copied**: both are written by id by `worldTick`, so a duplicate would never update.

## 4d. Chrome that grows sideways is measured against what is under it

⛔ **THE ELEMENT GREW AND THE THING UNDERNEATH IT WAS NEVER ASKED** is the same fault as a raised font
breaking its old box. `#audioBox` is what the three position rules place and the pair inside lays
itself out: a column on the battle screen (`column-reverse` from `top:50`, which is 74 minus the
button's height and the gap), a row on the world screen, **each because of what is under it**.
⛔ And the state stays a WORD: `♪ ON` / `♪ OFF`, never a dimmed glyph.

```js
/* the corner, on every screen it can be seen on. Expect 0 hexes and no buttons. */
(()=>{const b=document.getElementById('audioBox'),R=e=>e.getBoundingClientRect();
  return ['world','inv','battle'].map(s=>{show(s);const r=R(b);
    return s+': '+[...document.querySelectorAll('#bGrid .hex')].filter(h=>{const a=R(h);
      return a.right>r.left+1&&a.left<r.right-1&&a.bottom>r.top+1&&a.top<r.bottom-1;}).length;});})()
```

## 5. Before the CSS ships

⛔ **THE PREVIEW PANE COMPOSITES NOTHING, SO A SCREENSHOT PROVES NOTHING AND `setInterval` FIRES ZERO
TIMES.** The DOM and these counters are the proof. First, that the three scales are still closed:

```bash
grep -o "font-size:[ ]*[0-9.]*px" prototype/grimtoll_slice.html | sort -u | wc -l   # 0
grep -o "padding[a-z-]*:[^;}\"']*" prototype/grimtoll_slice.html | grep -oE "[0-9.]+px" | sort -u  # 86px
grep -o "border[a-z-]*:[^;}\"']*" prototype/grimtoll_slice.html | grep -icE "#(3d2f1d|4d3c22|6b5330|2c3d3f|35494c|33474a|3d5250)"  # 0
```

In the running build, per screen:

```js
/* nothing under the floor. Run it on EVERY screen, not the one that is open.
   ⛔ #231 - IT MEASURES WHAT THE EYE GETS, NOT WHAT THE DECLARATION SAYS. `#bGrid` is inside a
   camera; a raw `fontSize<10` reports its --fs0 figure as a violation while it renders at
   13-20 real px, and would go on passing a 10px label on a surface scaled DOWN. The scale is
   taken against #stage, so every unscaled screen reads exactly what it always did.
   ⚠ THREE FALSE POSITIVES WERE FOUND BUILDING IT AND ALL THREE ARE IN THE CODE BELOW:
     · a `display:none` SCREEN does not make its children compute `display:none`, so the old
       guard let twelve hidden screens report at once - `offsetParent` is the real test;
     · `matrix.a` alone is **-1.00** on a mirrored element, which reads as "smaller than zero";
     · and `matrix.a` is **0** under the portrait `rotate(90deg)`, which reads as "infinitely
       small". `Math.hypot(a,b)` is the length of the transformed x unit vector and is right for
       all three. */
(()=>{const sc=el=>{let s=1,e=el;while(e&&e!==document.documentElement){
    const m=new DOMMatrixReadOnly(getComputedStyle(e).transform);
    s*=Math.hypot(m.a,m.b)||1;e=e.parentElement;}return s;};
  const S=sc($('stage'))||1;
  return [...document.querySelectorAll('#stage *')].filter(e=>{const c=getComputedStyle(e);
    if(c.display==='none'||c.visibility==='hidden')return 0;
    if(!e.offsetParent&&c.position!=='fixed')return 0;
    const f=parseFloat(c.fontSize);
    return f>0&&f*(sc(e)/S)<10&&(e.textContent||'').trim();}).length;})()      // 0

/* ⛑ AND PROVE IT BY MAKING IT FIRE, which is this file's own condition for a new check:
   `$('buildTag').style.fontSize='9.5px'` and it must report `buildTag`; clear it and it must
   return to 0. A floor check that has only ever returned 0 is indistinguishable from a broken one. */

/* nothing CLIPPED. ⚠ skip overflow:visible and overflow:auto or you get noise:
   a hex is visible by design (#157) and a scroller is auto by design */
(()=>{const bad=[];for(const e of document.querySelectorAll('#stage *')){
  const c=getComputedStyle(e); if(c.display==='none'||c.visibility==='hidden')continue;
  if(!e.offsetParent&&c.position!=='fixed')continue;
  if(c.overflow==='visible'&&c.overflowX==='visible'&&c.overflowY==='visible')continue;
  if(c.overflow==='auto'||c.overflowY==='auto')continue;
  if(e.scrollWidth-e.clientWidth>1||e.scrollHeight-e.clientHeight>1)
    bad.push(e.tagName+'.'+e.className+'#'+e.id);} return bad;})()
```

⛔ **A THIRD COUNTER, BECAUSE THE ONE ABOVE IS BLIND TO THE COMMONEST WAY A FIXED COLUMN BREAKS**
*(#230)*. The clip counter skips `overflow:visible` by design, so when a flex column runs out of room
and shrinks a child holding a fixed-height thing, the thing does not clip, **it paints over its
neighbour**, and every gate here reads 0 while it happens. Run it on any fixed-height column:

```js
/* one child's PAINTED bottom against the next child's top. Expect [] */
(()=>{const box=document.getElementById('iChar'),kids=[...box.children],bad=[];
  for(let i=1;i<kids.length;i++){
    const pr=kids[i-1].getBoundingClientRect(),cr=kids[i].getBoundingClientRect();
    const pb=Math.max(pr.bottom,...[...kids[i-1].querySelectorAll('*')]
      .map(e=>e.getBoundingClientRect().bottom).concat([pr.bottom]));
    if(pb-cr.top>0.5)bad.push((kids[i-1].id||kids[i-1].className)+' over '+
      (kids[i].id||kids[i].className)+' by '+(pb-cr.top).toFixed(1));}
  return bad;})()
```

⚠ **THE CHILD'S OWN RECT IS NOT ENOUGH AND THAT IS WHY THE PROBE WALKS ITS DESCENDANTS.** The shrunk
parent reports its shrunk height honestly; the fixed-height GRANDCHILD is what hangs out of it.
☑ **THE FIX IS TO STOP THE SHRINK, NOT TO CHASE THE OVERLAP.** `flex:0 0 auto` makes the column exceed
its window and the scroller do its job. ⚠ Where a screen has promised not to scroll that is a real
cost: a decision taken out loud and written down, never a silent one.

⛔ **AND BOTH COUNTERS WALK `#stage *`, SO THE HOVER TIP IS INVISIBLE TO THEM.** `TIP` is appended to
`document.body` (it must be, or `moveTip` could not clamp it against the window), so `#gtTip` is not
inside `#stage`. **Measure a hover by hand, on every state that opens one:**

```js
/* the stat tip, on all four stats and on a body carrying a scar and a banked level */
(()=>{const t=document.getElementById('gtTip');return ['str','agi','int','mor'].map(k=>{
  const el=$('iChar').querySelector('[data-tell="'+k+'"]');
  el.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true,clientX:400,clientY:300}));
  const r=t.getBoundingClientRect();
  return k+' '+Math.round(r.width)+'x'+Math.round(r.height)+
    ' over '+(t.scrollWidth-t.clientWidth)+','+(t.scrollHeight-t.clientHeight)+
    ' offscreen '+(r.right>innerWidth||r.bottom>innerHeight);});})()   // expect 0,0 and false
```

⚠ **`offscreen` IS THE HALF THE OVERFLOW NUMBER CANNOT SAY.** `moveTip` clamps against `innerHeight`
and not against `#stage`, so a tip that fits and is in the wrong place reads the same to both counters.

**Known and pre-existing, so do not chase them**: `#wMap` (the map is bigger than its window),
`#bField` and `#bLog` in the battle, `#menu`/`#mTitle` on the front door. ⚠ **A fifth that crops on
purpose: `#bTrait`**, a `-webkit-line-clamp:2` box whose truncation is what the battle rail's 223px
reservation is computed FROM: 1-2px of overflow on every body that HAS a trait. **It earns its place
by being a DOCUMENTED intentional clamp with a measurement.**

⛑ **THE SECOND TAB IS THE TECHNIQUE, AND IT IS THE ONLY HONEST WAY TO READ AN OVERFLOW COUNT.**
`git show HEAD:prototype/grimtoll_slice.html > prototype/_head_baseline.html`, serve both, drive both
to the same screen, diff the probes, delete the copy. **A raw count means nothing**: 29 overflows read
as noise, the diff against the baseline said 2 and 2 and the one real regression stood out at once.

⛔ **THE COUNTER CANNOT TELL A CROPPED DECORATION FROM CLIPPED TEXT, SO DO NOT BUILD ONE. NEVER ADD A
SIXTH ENTRY TO THE LIST ABOVE TO MAKE A NEW DECORATION FIT** - the day it absorbs whatever was drawn
last week, the counter stops meaning anything and the next real clipping ships behind it. Four facts
measured while giving up on a corner ribbon:

- **`overflow:clip` does not dodge it.** Chrome reports the scrollable overflow region either way.
- **`clip-path:inset(0)` DOES dodge it and eats the element's own outer box-shadow with it.**
- **Overflow to the LEFT and the TOP is free** in an LTR box: neither is scrollable.
- **Sizing a band flush to two edges is arithmetic, not a ribbon.** A strip `W` long and `t` thick
  turned by θ has a bounding box `W·cosθ + t·sinθ` by `W·sinθ + t·cosθ`; pin that into the corner and
  nothing crops it.

Then `LINT()` for 0 findings, and on the map the three counters from
`.claude/rules/world-map-sights.md`: `spacingViolations().length`, `labelViolations().length` and the
`MAP_SIGHT` orphan check, all 0. Type sizes move name plates, so the map counters are part of this gate
and not somebody else's.

## 6. Adding to the scale

Do not, first. 153 of the 316 type sites landed on one step, which says the vocabulary is wide enough
rather than too narrow. If a screen genuinely needs a step that does not exist, add it to `:root`
**with a comment naming the surface that needed it**, and take the whole build through §5 again.
**A one-off literal is the thing this rule exists to stop.**
