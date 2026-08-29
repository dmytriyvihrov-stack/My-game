# The three scales: type, edge, spacing

Apply this rule whenever CSS is written or edited in `prototype/grimtoll_slice.html`, including the
inline styles built inside JS strings. It is the standing version of #164 (8f.192) and it exists so
that the next screen is written on the scale instead of the diet being run again in six months.

It governs LENGTH, EDGE and AIR. What a surface SAYS is `.claude/rules/event-cards.md` and the nine
voice rules in `docs/README.md` §4; what a readout MEANS is #102's wrong-unit rule. This file is
only about the three vocabularies every screen shares.

## The one sentence

**Three properties are a closed vocabulary now: `font-size`, the colour of a structural border, and
`padding`. A new literal px in any of the three is the bug**, not a decision.

## Where it came from, so the reason survives the rule

The Turn-Based Games Discord `#dev-feedback` gives the same three notes to every game that posts
there, and in July 2026 four different developers were told to standardise their fonts inside one
week. The notes, verbatim:

> *"the UI elements all seem to have different outline colors and thicknesses. standardizing these
> would help."*
> *"i count quite a few diff fonts, font sizes, and colors. having fewer variants and using them
> more consistently would help."*
> *"The biggest thing your UI needs is consistent margins and padding."*

⚑ **And the answer that made it a rule rather than a chore.** The developer being told this replied:
*"I think it's one of those things I stopped noticing because I stared at them for so long."* That
is the whole mechanism. A build polished screen by screen for months converges on locally-perfect
and globally-unrelated, and the author is the one person who cannot see it.

**Measured on the shipped build before the pass: 29 font sizes, 42 border declarations across 7
near-identical hexes, 72 paddings, and 560 distinct hex colours against 34 variables.** Nothing was
wrong. Everything was decided thirty separate times.

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

⛔ **`--fs1` IS 10px AND NOTHING ON THIS SCREEN IS SMALLER.** (User, 2026-08-16: *"Minimum font i
feel, nice to be 10"*.) The build had **77 declarations at 9px or under, down to 7px**, and they
were not decoration: they were the whole label layer. The channel's own test is the one to use, and
it costs nothing:

> *"Try stepping away from the screen, how far away can you get and still read it?"*

⛔ **AND `--fs0` IS THAT TEST TAKEN LITERALLY, WHICH IS WHY IT IS NOT A HOLE IN THE FLOOR**
*(#231, 2026-08-21, the user: "damage and chance to hit 20% smaller", about `.hodds` and `.hdmg`)*.
The floor is a rule about what an EYE gets. `#bGrid` is drawn inside a camera, so a design pixel
there has never been a screen pixel: measured on the running board at the three `CAMS` stops,
`.hodds` at `--fs1` renders at **16.4 / 22 / 25 real px**, and at `--fs0` at **13.1 / 17.6 / 20**.
The smallest of those, at the stop that shows the most ground, is three points OVER the floor.

⛔ **SO THE STEP IS FOR A MAGNIFIED SURFACE AND FOR NOTHING ELSE, AND §5's PROBE IS WHAT KEEPS
THAT TRUE.** The check divides by nothing and multiplies by the element's own transform chain
measured against `#stage`, so on every unscaled screen it reads exactly what it read before and a
`--fs0` there is reported as the bug it would be. **ONE reader today, `.hodds`, on a hex** - it was
two until #236 deleted `.hdmg` and moved the odds into its slot. **If a second appears somewhere the
camera does not magnify, the probe is what says so, not this paragraph.**

⚠ **AND #111's OLD RULING IS BACK IN FORCE, NOT OVERTURNED.** *"If the pair shouts again at the
close stop, the answer is dimmer or narrower, never smaller"* - that is still the answer, and there
is no `--fs-1`. This step exists because 20% of 10 is a number the camera can afford; a second cut
is not, and would be argued against the same three measurements rather than against taste.

⚠ **THE FLOOR RAISED 153 DECLARATIONS AND THAT IS THE MAJORITY OF THE FILE.** Everything from 7px
to 10.5px collapsed into `--fs1`. That is the point (nine of the old sizes were doing one job) and
it is also where every regression will come from. See §4.

⚑ **A line-height written as a RATIO survives the floor by itself; a line-height written in px does
not.** Most of the build was already ratios, which is why 153 raises cost five box fixes and not
fifty.

## 2. Edge: five colours, and only for structure

| token | hex | what it is |
|---|---|---|
| `--e1` | `#3d2f1d` | gold, dim. The default panel edge, 29 sites |
| `--e2` | `#4d3c22` | gold, mid. A raised or hovered edge |
| `--e3` | `#6b5330` | gold, lit. A selected or important edge |
| `--e4` | `#2c3d3f` | teal, dim. The battle chrome |
| `--e5` | `#35494c` | teal, lit. The battle chrome, raised |

The seven hexes that became these five included `#3d2f1d` against `#4d3c22` and `#35494c` against
`#33474a`. **Two of those pairs are indistinguishable on screen and were three separate decisions in
the file.** `--g1` and `--g2` already held two of the values and 25 sites hardcoded them anyway.

⛔ **AN ACCENT EDGE IS NOT ON THIS SCALE AND MUST NOT BE COLLAPSED INTO IT.** `border-color` carries
MEANING on this build: `var(--gold)` selects, `var(--blood-lit)` warns, `#8ca35a` approves,
`#c15d55` is the unpaid red. Those 47 `border-color` values are a readout, and flattening them would
be #102's wrong-unit bug arriving through a tidy-up. **The scale is for the edge that draws a box,
never for the edge that says something.**

⚠ **Thickness is 1px, or 2px when a thing is picked.** `border:Npx solid transparent` at 2.5, 3, 7
and 9 is not an edge at all, it is a CSS triangle, and it is off the scale on purpose.

## 3. Spacing: seven steps

`--p1:2px` · `--p2:4px` · `--p3:6px` · `--p4:9px` · `--p5:12px` · `--p6:16px` · `--p7:24px`

The channel's suggested resting value was 24. **That number was not copied**, because it was given
to a game with room; this one is a fixed 1280x720 stage carrying a battle, a map and a company
sheet. The scale is fitted to the build and 24 is its ceiling rather than its body.

⛔ **A PADDING THAT IS GEOMETRY RATHER THAN SPACING KEEPS ITS LITERAL.** Two survive, and both
carry the comment this paragraph asks for:

| | what it reserves |
|---|---|
| `#wBar{padding:0 86px 0 var(--p5)}` | the run of bar the top-right button group stands in |
| `#iBar{padding:0 86px 0 var(--p6)}` | **the same run on the second bar that carries ☰ MENU** *(#249)*. The button is `right:10` and 71px wide, so 86 is one number and the file's grep still returns `86px` alone. ⚡ It was affordable because the wagon door became a picture in the same edit: 103px of button went to 34 |

⚡ **AND THE SECOND ROW WAS DELETED BY #231, WHICH IS THE HEALTHY DIRECTION FOR THIS TABLE.**
`.hin>.zodds{padding:1px 2px}` reserved the one free band of a 37x42 hex for an opaque PLATE, and
the plate existed because the chip had to survive a body standing on its hex. #231 moved that
readout under the body that pays it and made it text with a halo, so the geometry it was reserving
stopped existing and the literal went with it. **The file's own grep now returns `86px` alone.**

⚡ **AND IT DRIFTED BACK WITHIN FOUR DAYS, WHICH IS THE ARGUMENT FOR THE COUNTER RATHER THAN AGAINST
IT** *(#248, 2026-08-25)*. The grep returned `0px 1px 3px 86px`. Two arrivals, and neither was a
decision anybody defends: `.rmem .rlv` - the roster tile's level plate, shipped by #246 - carried a
hand-typed `padding:1px 3px`, and `#bGround` wrote its apron fallbacks as `var(--aprT,0px)`, where
`0` is the identical length and `0px` is only a habit. **Both were written by sessions that had this
file open**, which is exactly §2's own Discord finding (*"I stopped noticing them because I stared at
them for so long"*) arriving on the person who wrote the rule.
⛑ **THE PLATE WENT ON THE SCALE AND NOTHING MOVED**, which is the usual answer: `var(--p1)
var(--p2)` measured on all four roster rows leaves the tile **69px tall and the column 148 wide,
both unchanged**, the plate 21.2x14 -> 23.2x16 with its bottom at 142 in a row that ends at 151.
⚠ **A `0` FALLBACK IS NOT A GEOMETRY LITERAL AND MUST NOT BE ADDED TO THE TABLE ABOVE.** The two rows
here are lengths somebody has to justify; a zero is the absence of one.
⛑ A geometry literal that outlives the geometry is the thing this table is really guarding
against: it is not a licence, it is a list of things somebody has to justify again.

A scale step substituted at either is a bug. ⚑ **THE SECOND ONE ARRIVED ON 2026-08-21 AND IS WHY
THIS PARAGRAPH IS A TABLE.** #213's zone-of-control odds plate is the only chip on a hex with an
opaque ground and a border, which is what makes it survive a body standing there where its two
neighbours, `.hodds` and `.hdmg`, are text with a shadow and carry no padding at all. Its entry
records the arithmetic: `.hodds` is y 7-17, `.hdmg` y 19-29, the sprite y -12-33 and the row in
front paints from y 32, so **there is no uncontested slot, only the cheapest collision**. `--p1`
grows the plate 2px into that collision and `0` puts the red edge flush against the digits. ⚠ It
shipped off-scale and undocumented in #213 and was found by this counter during the 2026-08-21
landing; the fix was the comment the rule already demanded, not a different number.

⛔ **AND A PADDING PAIRED WITH A NEGATIVE MARGIN IS ONE NUMBER WEARING TWO NAMES.** Two sticky
footers on this build (`#wDlg #wChoices`, `.popts`) cancel their own bottom padding with a matching
negative margin and a matching sticky offset. They are written `calc(var(--pN) * -1)` so the three
cannot drift apart. **The `.pcard` phantom-scrollbar fix is the same thing and is now literally the
same token**: the card's bottom padding and the footer's bottom padding are both `--p7`, so
"matching" is a thing the file states instead of a thing somebody remembered.

## 3b. ⛔ #197 · A SHARED BOX HEIGHT IS GEOMETRY, AND IT IS NOT ON ANY OF THE THREE SCALES

*(2026-08-19. The user, red box round the world bar's left group: **"Make heights same size, so it
looks nicer"**.)*

**Measured before anything moved.** The left group ran **30 / 22 / 26 / 20 / 20** and the four
resource segments on the right were **26**. ⚑ **Nothing was misconfigured**: all of them share
`padding:var(--p1) var(--p4)`, a 1px border and `border-box`, and each was sized by its own
CONTENT - a 24px painted bust, an emoji at `--fs1`, a figure at `--fs5`. That is this file's own
Discord note (*"the UI elements all seem to have different outline colors and thicknesses;
standardizing these would help"*) arriving on **height** instead of on edge, and it is the same
mechanism: nobody decided it, so it was decided nine times.

⛔ **A HEIGHT IS NOT A `--p` STEP AND MUST NOT BE MADE ONE.** This file governs `font-size`, a
structural `border-color` and `padding`; a shared box size is none of the three, and substituting a
spacing token for it would be the wrong-unit bug the file spends §2 forbidding. `--barChip:30px`
sits in `:root` on the same footing as `#wBar`'s 86px reservation, and it carries its arithmetic
for the same reason.

⚑ **30 IS NOT A TASTE, IT IS THE ONE LOAD-BEARING CHIP.** The party chip holds a 24px bust plus
that image's own 1px border, plus `--p1` and the chip's border top and bottom. Everything else was
shorter only because a 10px word is shorter than a portrait. The bar is 42, so 30 leaves 6px of air
either side. ⚠ **If the bust ever changes size this number moves with it.**

⛔ **AND IT IS SCOPED TO `#wBar`**, which is #187's rule about shared furniture: `.cchip`,
`.bcchip`, `.rseg` and `.tchip` are drawn only inside `#wCompany` and `#wRes` **today**, and an
unscoped height would follow the first one of them that is ever reused on another screen.

## 3c. ⛔ #247 · A POOL IS A MARK AND A BAR WITH THE FIGURE IN IT, AND `--sbh` IS ITS HEIGHT

*(2026-08-25. The user, red arrows down all three rows of the battle card: **"Both for health armor
and mood make this bars a little bit higher, and write stats exactly in them. As BB. Also add 1 icon
to each of these 3 stats"**, then **"Same change in the inventory"** and **"For mood use space"**.)*

**A pool is one row: `.sbar` = a 17px mark column, then a bar with the figures inside it.** Armour,
hitpoints and mood on the battle card (`#bPlq`) and on the company sheet (`.ibars`) are the same
three rows off the same stylesheet block. A fourth surface that wants a pool copies `.sbar`; it does
not write a second one.

| | |
|---|---|
| the mark | ⛨ `SLOT_ICON.armour` · ♥ blood · **`MOOD_MARK`, one glyph, `U+263A\uFE0E`** *(#249)* |
| inside, left | the WORD that is a fact: the armour class, the mood rung. Nothing on hitpoints |
| inside, **the middle** | the figure, **`--fs5` on both** *(#251)* |
| the height | `--sbh`, **20 on both** *(#251)* |
| the frame | a `box-shadow` on `.sbt`, never on `.sbb` *(#249, and see below)* |
| **the dividers** | **`::after` on the `.bar`, on all three rows** *(#266)* |

⛔ **#266 · A POOL IS DIVIDED, AND THE THREE ROWS DIVIDE IN ONE LAYER.** (User: *"Bars with
health do more in style of the game - and feel free to add some dividers (like in battle)"*.)
Armour and hitpoints are sectioned in BLOWS (`--seg`, off `SEG()` and the plaque's own `SEG_HP` /
`SEG_ARM` - #94's rule, and a renderer owes them nothing but the count); the mood bar is ticked at
**the ladder's own gates**, because its scale is not even and an evenly sectioned bar would draw a
ladder this game does not have. All three rules are `:is(#bPlq,.ibars)`, which is #219's arithmetic:
`:is()` takes the specificity of its most specific argument, so they keep the 1-1-0 they had and
`.ibars .sbar .bar` still wins on height and border.
⛔ **AND THE TICKS ARE DERIVED FROM `LADDER`, BECAUSE FOR TWO ENTRIES THEY WERE NOT.** The rule
read `15 / 40 / 70 / 90` as CSS literals and the gates have been `15 / 34 / 52 / 90` since #129
inserted SHAKEN and #228 merged Ok into Happy - so the battle card drew dividers at rungs that do
not exist, out by up to 18% of the pool, and nothing said so because a stylesheet cannot ask a JS
table anything. `--nrvticks` is built beside `LADDER` and set on `:root`. **A number a stylesheet
copies out of a table is a number that goes stale silently.**
⛔ **`::after` AND NEVER `::before`, AND ONLY A SCREENSHOT COULD HAVE FOUND IT.** A generated
`::before` is the FIRST child and the `<i>` fill is a real one, so ticks drawn there paint UNDER the
fill while the blows hatch paints over it - three bars in one column, two divided end to end and the
third divided only in its empty half. ⚠ **No probe in this project can tell the two apart**: both
are `background:<a gradient>` on a `pointer-events:none` pseudo covering the same box, with the same
computed `display`. `shots/266_bars.png` is what said so, which is #234's own lesson (*two probes
said the geometry was right and the screenshot said the meaning was wrong*) on a third surface.

⛔ **`--sbh` IS A BOX HEIGHT, WHICH §3b ALREADY ESTABLISHED IS NOT ON ANY OF THE THREE SCALES.**
Unlike `--barChip` it is **not** in `:root`: there is no one right height, because the card is read
mid-fight at arm's length and the sheet is read at a desk. It is declared on `.sbar` and each host
overrides it, which is one number in two places rather than a literal in six.

⛔ **THE HEIGHT IS DECIDED BY THE NUMERAL'S SIZE AND BY NOTHING ELSE, AND #247's REASON FOR IT WAS
WRONG** *(#249, 2026-08-26)*. That entry read the floor as *"two FACES on one baseline - the display
numeral at `--fs6` beside the `/max` in mono at `--fs1` - whose combined line box is taller than
either"*. **Swept at every size from 11 to 17px with the `/max` at `line-height:0`, at
`line-height:1`, and DELETED ENTIRELY: the three sweeps are identical.** The `/max` never voted.

⛑ **What sets the floor is the DISPLAY face's own content area**, which is ~1.27em whatever
`line-height` says and which Chrome counts as scrollable overflow. So a bar's height is a function of
one number:

| numeral | `--fs` | the smallest bar it fits in |
|---|---|---|
| 11px | - | 15 |
| 12px | `--fs3` | 16 |
| 13px | `--fs4` | 17 |
| 14px | - | 18 |
| 15px | `--fs5` | **21** |
| 16px | - | 22 |
| 17px | `--fs6` | 23 |

⚠ **AND THE GATE IS `> 1`, WHICH IS THE ONLY REASON 22/17 EVER PASSED.** §5's clip counter ignores a
single pixel of overflow; 22 under a 17px numeral is 1 over and always was. **The shipped pair is
20/15, on BOTH hosts** *(#251)*, which is 1 over. Two is a finding, one is the house state.

⛔ **AND #249's TWO PAIRS BECAME ONE, WHICH OVERRULES THE `--sbh` PARAGRAPH ABOVE WITHOUT
CONTRADICTING IT** *(#251, 2026-08-26, the user, a red box round all three rows on the sheet:
*"design better this bar with health, more like in the battle"*)*. #247 gave the sheet 16/`--fs3`
on the argument that *"the card is read mid-fight at arm's length and the sheet is read at a
desk"*. That is a reasonable guess and it is not a measurement, and the ask is: **the surface the
player STUDIES was the one drawn smallest.** So the two hosts agree again and `--sbh` keeps its
point - a host may still override it, and today neither needs to.
⛑ **IT WAS GRANTABLE BECAUSE `#iStatTop` IS A FLEX ROW AND ITS HEIGHT IS THE TALLER OF TWO
COLUMNS, WHICH IS THE ARITHMETIC TO RE-RUN BEFORE THE NEXT +4.** Measured over all 16 body x state
cases: the three pools stack to **127** against the four tells' **124** on a clean crew member, and
to **141** the moment a level is banked - and that banked state is the one that owns the worst
slack in the game. So +12 costs 12 where there is 107px of slack and **0 where there is 38**. The
sheet's worst body went 38 to 29, `scroll 0` and `overlap []` on every case. ⚠ **A column's cost is
not its own height, it is its height MINUS its neighbour's**, and a change that reads as free on
the state the screen opens in can be the whole bill on the state nobody drives.
⛔ **So a bar cannot be made shorter without taking the numeral down with it**, and that is a trade
against #105's *"almost double size of amount hitpoints and armor left"*, not a free win.

⛔ **THE FRAME IS AN `outline` OR A `box-shadow` AND NEVER A `border`.** A border on a border-box
element eats the content box, so a 1px frame costs 2px of type room - measured, it took `--fs6` from a
22px bar to a 24px one. `.claude/rules/static-event-art.md` records the same finding about the road
card's canvas. ⚠ **And it has to be drawn on `.sbt`, not on `.sbb`**: an outline or an inset shadow on
the trough paints in the trough's own layer and the `<i>` fill paints over it, so the first cut of
#249 had a hairline round the EMPTY half of every bar and nowhere else.

⛑ **THE FILL'S LIGHT IS A `::after` ON THE `<i>`, FOR A REASON THAT IS NOT STYLE** *(#249)*.
`setBar` and `drawInv` write `background:` INLINE on that element - the armour steel, `hpCol`'s ramp,
the rung's own colour - and an inline shorthand resets `background-image` to none and outranks the
stylesheet. A pseudo over the fill is the one place a gradient can live **without touching the colour
that is carrying the meaning**, which is the rule under it: the mood fill IS the rung and the health
fill IS the ramp, so repainting either would be a readout printing something other than what it reads.

⛑ **AND THE FIGURE STANDS ON THE BAR'S OWN MIDLINE, BY A GRID** *(#249, the user: "write the curent
point of that in the midle of that bar")*. `1fr auto 1fr`, never `justify-content:center`: two of the
three rows carry a WORD as well, so centring a flex row centres the PAIR and `45/45` alone would sit
dead centre while `LIGHT 6/6` sat off to one side. The mood row has no figure - its value IS the word -
so `.sbt:not(:has(.sbR)) .sbL` moves that word into the middle column. **One rule, asking about the
row it is on, which cannot drift from the other two.**

⛑ **TEXT ON A FILLED BAR TAKES AN OUTLINE, NOT A DROP SHADOW.** Two of the three fills are LIGHT -
`--steel` #96a1a5 on the armour row, the top two rungs' greens on the mood row - so cream type with a
soft shadow under it is legible on the red bar and a smudge on the other two. Four hard 1px offsets
plus a blur is a stroke round the glyph and it reads on any fill this game can put behind it.

⛔ **AND THE FIGURE IS NOT PAINTED IN THE FILL'S OWN COLOUR.** #105's *"a body that is bleeding says
so in the number and in the bar at once"* was written when the number stood BESIDE the bar; standing
ON it, `color:hc` is dark red on dark red. The bar carries the hue, the text is cream, and the fact
is still said once.

⚠ **THE SPECIFICITY TRAP THIS SHIPPED THROUGH, BECAUSE IT WILL HAPPEN AGAIN.** `.ibars .bar{height:7px}`
is 0-2-0, exactly what `.sbar>.sbb` is, and it sits LATER in the stylesheet - so on the sheet alone
the old 7px won and the three rows landed on top of each other, while the battle card (whose height
comes off the bare `.bar` at 0-1-0) was correct. **A tie on specificity is decided by which entry
wrote which block, which is not a design.** `.ibars .sbar .bar` is the row that settles it.

## 4. ⛔ What the floor breaks, and it is never the text

**A raised font size does not break the text. It breaks the box that was measured around the old
one.** Every regression in this pass had that shape, and only the running build found them.

| what broke | why | what it cost |
|---|---|---|
| `.act .role` clipped mid-word | the card was 72px wide with `overflow:hidden;text-overflow:clip`. "GUARDS ALLIES" at 10px wanted 79 | `.act` 72 -> **80** wide, 86 -> **90** tall |
| `.hdmg` printed through `.hodds` | odds at `top:4` `line-height:1` ended at 11.6 and the damage started at 13. At 10px the odds end at 14 | `.hdmg` `top:13` -> **16** |
| `.cbadge`, `.itab .tbadge` | a 10px digit in a 14px disc | disc 14 -> **16**, radius 7 -> 8 |
| `.nrow b` | a `flex:none` label column at 78px does not stretch | 78 -> **86** |
| `.ccall .who` | a 214px clamp measured at 7.5px with `.14em` tracking | tracking -> `.1em`, clamp -> **224** (the bubble's real width) |

⛔ **AND THE SAME TABLE GREW THREE ROWS WHEN THE REAL TYPEFACES LANDED, NOT WHEN THE SIZE MOVED**
*(#202, 2026-08-19)*. #189 embedded Cinzel, Spectral and JetBrains Mono under boxes that had been
measured around Palatino, Georgia and Consolas, and #200 measured the sheet before the faces were
in. **A font change breaks the box the same way a size change does, and it is found the same way:
by the probe, on every screen.**

| what broke | why | what it cost |
|---|---|---|
| `.act .role` and `.iact .role` cut mid-word | real JetBrains Mono is **6px a glyph at 10px** (canvas-measured; Consolas was 5.5). `GUARDS ALLIES` wanted 81 in a 74px battle box and 76 on the sheet; `OPENS ITS BACK` 84 | the card does not grow a second time: `ROLE{}` capped at **12** (72px), tracking 0 on both rules, **LINT 14** holds it |
| `.itl .tv` (the four stat tells) | real Spectral at 12px is **16px of content** in a 14.4px `line-height:1.2` box with `overflow:hidden` for the ellipsis: descenders cut. The column is exactly full on the Captain, so the line box may not grow | `padding-bottom:var(--p1); margin-bottom:calc(var(--p1) * -1)`: the tail paints, the 2px goes back, rows still 16, `#iChar` still 678/678 |
| `#bName .nick` (the battle plaque) | same: 10px Spectral italic, 13px of content in an 11.5px line | same pair |

⚑ **The padding-plus-negative-margin pair is the right tool ONLY when the box is forbidden to grow.**
Where there is slack, raise the line-height. Here there was none: #200 left `#iChar` at 678 into
678 with `iFoot` already squeezed to 1px, and the plaque's row height is the rail's reservation.


⛔ **AND A THIRD SHAPE, WHICH IS NEITHER A SIZE NOR A WIDTH: A CAPTION SET SIDEWAYS IS THE
TALLEST THING IN ITS ROW AND NOTHING ON SCREEN SAYS SO** *(#234, 2026-08-22)*. The company
sheet's header carried `ON THE FIELD` beside the battle token in `writing-mode:vertical-rl` at
`--fs1`. Measured: **85.2px tall, against the 58px picture it was labelling.** So the row was
95.2px high to hold a LABEL, on every body in the game, and the two pictures the row exists for
were both shorter than it. `#iChar` had **3.8px of slack on its worst body**, so every ask to
grow anything in that header had been arithmetically impossible for as long as the caption was
there, and nobody had looked because a caption is not the sort of thing a height audit opens.
⚑ **THE GENERAL RULE: WHEN A FIXED COLUMN HAS NO ROOM, MEASURE THE THINGS THAT ARE NOT THE
CONTENT.** A rotated label, a vertical rule, a sticky footer's own negative margin: each is a
box with a height, and a height that comes from `writing-mode` is a LENGTH OF TEXT wearing the
wrong axis - the one number in a layout that grows when somebody edits a string.
⚠ **AND THE FIX WAS TO DELETE IT, WHICH IS ONLY AVAILABLE BECAUSE IT WAS FURNITURE.** A 26x38
painted body, on a sheet already carrying this person's portrait, name, class and weapon, is
not ambiguous; the sentence saying it is what they look like on the field is `.claude/rules/
event-cards.md`'s own furniture cut arriving on a layout problem. **Check whether the thing
setting the height is saying anything before you go looking for pixels elsewhere.**

⚑ **AND THE SAME RULE ON THE OTHER AXIS, WHICH IS WORSE BECAUSE THE BREAK MOVES** *(#200,
2026-08-19)*. A raised font size breaks the box measured around the old one; **a narrowed COLUMN
breaks the ROW measured for the old one, and the damage does not stay where the change was.** The
company sheet's right pane went 450 to 560 at the user's ask, which passed the doll's own
arithmetic (two 150px slot columns and a 130px figure need a 436px box, and 470 was left). It then
wrapped the Captain's six 78px ability cards onto a second row. That row costs 83px in a column
that measures **exactly 678 into a 678px window**, so the flex column gave the height up where it
was allowed to, and what came back wrong was `#iDollBox`: **196px tall, rendering at 166, the
FIGURE clipped**. One horizontal number moved and the fault was vertical, three blocks down, on an
element with a fixed height and `flex:none`.

⛔ **SO A COLUMN WIDTH IS SET BY THE WIDEST FIXED-CELL ROW IT CARRIES, AND THAT ROW HAS TO BE
FOUND BEFORE THE NUMBER IS PICKED.** Here: `6 × 78 + 5 × 5 = 493`, plus the column's 24px of padding
and 2px of border is 519, and the stage's 1054 usable pixels minus 519 is **535**. 530 was taken.
⚠ **The widest row is not the one on screen** - the sheet opens on whoever was last selected, and
the six-card body is the Captain. Drive every member before believing a width.

⚡ **AND THE NARROWING PAID FOR ITSELF ONCE THE CELLS WERE ASKED WHAT THEY WANTED.** The four stat
tells were a two-column grid at 144px a cell; measured, the label column is 66px at its widest and
the longest value wants 102, so they were **already clipping before anything moved** and 102px
cells would have clipped all four. One column of four rows is the same height as the three pools
beside it and gives each tell 259px. **The overflow probe against a `git show HEAD:` baseline
reports one finding on HEAD that the new build does not have.** A layout change that removes a
shipped clip is the shape to aim for; the way to know is the second tab.

⚑ **`.act` is the one worth reading twice**, because the file had already written the arithmetic
down. #105 recorded *"a 9px name is 1.2px taller per line and there are two lines of it, so 86"* and
*"Nine cards at 72+5 is 688px in a 1280 band"*. #164 ran the same two sums at 10px and got 80 and
90, with nine cards at 765 in the same band. **A comment that carries its arithmetic pays for itself
the first time somebody changes the input.**

⚠ **AND ONE PLACE WHERE THE FLOOR OVERRULES AN EARLIER USER NOTE, ON PURPOSE.** #111 took the hex
odds and damage down *"a fifth smaller at the user's word: at the CLOSE camera stop the pair was
shouting over the bodies they describe"*, which is how they reached 7.6px. The floor puts them back
to 10. **This is a real trade and it was made knowingly**, on the newer instruction and on the
distance test. If the pair shouts again at the close stop, the answer is dimmer or narrower, never
smaller.

## 4b. ⛔ #239 · A CARD WITH A HARD CEILING DOES NOT CLIP, IT CRUSHES THE THING BESIDE IT

*(2026-08-24. Coldharrow's rack went from one pictured row to three.)*

§5's clip counter and §5's overlap probe both read **0** while this happened, and so did `LINT()`.
`#wDlg` is `max-height:658px; overflow-y:hidden`, and `#wChoices` inside it is `position:sticky`. Add
322px of buttons and the buttons **win**: the card overflowed its own box by **165px** and `.bd` - the
card's prose - was squeezed to a height of **ZERO**. The whole Coldharrow paragraph was on the card, in
the DOM, measurable, and invisible.

⛔ **SO THE MEASUREMENT FOR A `#wDlg` CARD IS `scrollHeight - clientHeight` ON THE CARD ITSELF, AND THE
HEIGHT OF `.bd`.** Neither counter in §5 asks either question: the clip counter skips `overflow:auto`
(and `.bd` IS auto, by design), and #230's overlap probe walks a column's CHILDREN, which are all
exactly where they should be. This is a third failure mode beside those two and it belongs beside them:

```js
/* any card in #wDlg. Expect 0 overflow and a .bd with height in it. */
(()=>{const d=$('wDlg'),b=d.querySelector('.bd');
  return {cardOverflow:d.scrollHeight-d.clientHeight,
          bdHeight:b?+b.getBoundingClientRect().height.toFixed(0):null,
          lastRowInMap:(r=>r&&r.bottom<=$('wMap').getBoundingClientRect().bottom+.5)
            ((d.querySelector('#wChoices .choice:last-child')||{}).getBoundingClientRect
              ?d.querySelector('#wChoices .choice:last-child').getBoundingClientRect():null)};})()
```

⚠ **AND `replaceDlg()` FIRST, OR THE FIRST TWO READINGS ARE BOTH WRONG.** #197 wrote this down for the
map and it bites here identically: a card placed while its screen was hidden measures every
`offsetHeight` as zero, so the box lands somewhere it will never be again. Measured before
`replaceDlg`, Coldharrow's road-out button read **y 811 on a stage that ends at 760** - a soft lock that
was not there. Measured after, 683..737 and fine. **Pin the card before you believe a pixel.**

⛑ **THE ANSWER WAS THE PICTURE, WHICH IS #238'S RULING ON THE WAGON ONE CARD LATER**: a price list in
this column does not get a painting, because 212px is exactly the room three pictured rows need. With
it gone the card measures **0 overflow** and the prose gets 77px back. ⚑ The picture was also an
orphan - `artFor('E5')`, the retired first-generation Ratkin Snare plate, which no card maps to since
the stage-4 pack re-pointed `snare` at `EV27`.

## 4c. ⛔ #239 · A BAR'S CHIPS MAY LIVE ON TWO SCREENS, AND `:is()` IS WHY THAT COSTS NOTHING

*(The user: **"keep showing the top bar (count, size, resources etc.) with the global menu on the
inventory page."**)*

⛔ **A SECOND 42px BAR ON THE COMPANY SHEET IS ARITHMETICALLY CLOSED.** The stage is 720, `#iBar` is
already 42, and §5's own note records `#iChar` at **678 into 678 with 3.8px of slack on its worst
body**. There is nowhere to put a bar. There is room in the bar that is already there.

⛑ **SO `#wCompany` AND `#wRes` ARE MOVED, NOT COPIED**, by `show()`, exactly the way `helpBtn` is
reparented twelve lines above it. A copy is a dead box: both are written BY ID by `worldTick`, so a
duplicate would never update. **Ids, handlers and hovers all survive a move**; what does not survive is
a selector that names one parent, and there were two - `#wBar .cchip,...{min-height:var(--barChip)}`
and `worldTick`'s `querySelectorAll('#wBar [data-w]')`. Both are `:is(#wBar,#iBar)` now.

⛔ **`:is()` AND NEVER A SHARED CLASS**, which is #219's arithmetic on a second surface: `:is()` takes
the specificity of its most specific argument, so the rule keeps exactly the weight it had. A class
would drop it under whatever `#iBar` rule happens to sit above.
⚠ **THE MEASUREMENT THAT SAYS IT FITS**: 1176 of 1280 used, seven chips all at `--barChip` 30,
`#iChar` unchanged at 678, `GT.clip()` `[]` on the sheet. ⚠ **The day the company name or either button
grows, re-run it** - the slack is about 30px.
⚠ **AND THE WAGON CHIP AND THE DAY PLAQUE STAY ON THE MAP**: the sheet already has a THE WAGON button,
and `#wPlaque` is absolutely centred on its own bar, so on this one it lands across the company name.

## 4d. ⛔ #240 · A SETTING THAT BECOMES TWO SETTINGS IS A WIDTH PROBLEM, AND THE BOARD PAYS IT

*(2026-08-24. The user: **"Отдельно музіка, отдельно звуки в настройках (два вкл выкл, вместо
одного)"**.)*

`#audioBtn` was ONE button in THREE places: `bottom:44` by default, `top:82` on the world screen,
`top:74` on the battle screen, each with its own comment recording why. Two switches is therefore
not a second button, it is **a second set of three rules to keep in step** - unless the thing that
moves stops being the button.

⛑ **SO `#audioBox` IS WHAT THE THREE RULES PLACE AND THE PAIR INSIDE IT LAYS ITSELF OUT.** Every
position comment (♪ at 74, the tester stack starting at 134) still names the number it always did,
because the box's first child is still where the button was.

⛔ **AND THE WIDTH IS WHERE IT WENT WRONG, MEASURED RATHER THAN NOTICED.** Side by side the box is
**95.7px against one button's 45.9**, and on the battle screen `#bGrid` is underneath it: driven on
the brigand field, the wide box sat over **2 playable hexes** where the single button covered
**none**. Chrome growing sideways over a board is the same class of fault as §4's raised font
breaking the box that was measured around the old one - **the element grew and the thing underneath
it was never asked.**

⛑ **THE FIX IS A COLUMN, AND THE ROOM WAS ALREADY THERE.** `#bZoom` ends at design y 31 and
`#bPace` starts at 102, so that band held one 20px button and **51px of nothing**.
`flex-direction:column-reverse` from `top:50` puts the FIRST child at the bottom, so ♪ keeps exactly
the 74 its own comment records and the new switch takes 50..70 above it. **Nothing else on the
screen moves.**

⚠ **50 IS DERIVED AND NOT ROUND**: it is 74 minus the button's own height and the gap (20 + `--p2`).
Change either and this has to be re-derived, which is what writing the arithmetic down is for.

⚠ **THE WORLD SCREEN KEEPS THE PAIR SIDE BY SIDE, AND THAT IS A MEASUREMENT TOO**: `wZoom` sits at
design 52..75, directly where a column would grow, and the horizontal box covers **no node and no
plate** (`nodesUnder: []`). Same widget, two layouts, each because of what is under it.

⛔ **AND THE STATE STAYS A WORD.** #102 point 3 records the ⏱ SPEED lesson in full: a control whose
press only changed *"a `title` attribute and a border tint"* could not say what it had done, and the
face got the number. `♪ ON` / `♪ OFF` is the same rule; a glyph dimmed to mean OFF would be
repeating a mistake this file has already paid for.

```js
/* the corner, on every screen it can be seen on. Expect 0 hexes and no buttons. */
(()=>{const b=document.getElementById('audioBox'),R=e=>e.getBoundingClientRect();
  return ['world','inv','battle'].map(s=>{show(s);const r=R(b);
    return s+': '+[...document.querySelectorAll('#bGrid .hex')].filter(h=>{const a=R(h);
      return a.right>r.left+1&&a.left<r.right-1&&a.bottom>r.top+1&&a.top<r.bottom-1;}).length;});})()
```

## 4e. ⛔ #240 · A LABEL BESIDE A PICTURE OF THE SAME THING IS THE THING TO CUT

*(The user: **"Из инвентаря где статы - выпилить слова 'STrength', Intelect, etc. Оставить токо
значения (ну и соответсвенно у них будет больше спейса). (но оставить возможность их вернуть, если
будет віглядить плохо)"**.)*

`.itl` was `[label 78px][32px picture][the tell, right-aligned, ellipsis-clipped]`. §4's own table
records the clip: *"real Spectral at 12px is 16px of content in a 14.4px line ... the column is
EXACTLY full on the Captain, so the line box may not grow"*. That entry solved the DESCENDERS and
left the WIDTH, because the width was not the ask that day.

⛑ **THE PICTURE IS WHAT IDENTIFIES THE STAT AND IT HAS BEEN SINCE #204/#230.** That is what the four
families were drawn for; the 78px mono column was saying it a second time in words. Cutting it hands
the whole 78 to the value, and **the two bodies that were clipping stop**: measured across all 16
body x state cases, HEAD clips 8 rows (Skree and Bruht, every state) and the new build clips **0**,
with `#iChar`'s slack unchanged.

⛔ **THE WAY BACK IS PART OF THE ASK AND IS NOT DECORATION.** `SHEET_STAT_WORDS` is one `const` and
one ternary. *"но оставить возможность их вернуть, если будет виглядить плохо"* is a request for a
switch, not a hedge, and a rule file that records the cut without recording the switch loses it.

⚡ **AND HE LOOKED AT IT AND USED THE SWITCH THE SAME DAY**: *"Returned it, just shorten: STR. INT
..."*. So the shipped answer is **`true`, with the label three letters wide** - which is the reading
the whole entry was circling: **the 78px column was the fault and the NAME was not.** Three letters
cost 30px and give the other 48 to the value, and Skree and Bruht still do not clip.
⛔ **THE SHORT FORM IS `k.toUpperCase()` AND NEVER A FIFTH TABLE.** `str`/`agi`/`int`/`mor` are
already the three letters; `TELLS[k].lbl` stays the long word for every other surface that wants one.
⛑ **THE SWITCH IS WHY THE SECOND ANSWER COST ONE LINE.** That is the argument for writing one every
time something is cut on somebody's word: the ask and the correction were hours apart, and without it
the second would have been a re-argument instead of a `true`.
⚠ **30 IS MEASURED, NOT PICKED**: three glyphs of real JetBrains Mono at `--fs2` plus .13em of
tracking is **24.1px** on the canvas, identical for all four words, and 30 is that plus the trailing
letter-space and a pixel of air. Driven on all 16 body x state cases: 0 labels clipped, 0 tells
clipped.
⛑ **AND FORCE THE COMPANY BEFORE COMPARING A SHEET ACROSS TWO BUILDS.** The first reading of this
said the worst slack had gone -5 to **-24** and named a 19px growth in `#iHead` - a block this change
cannot reach. `makeParty()` rolls names per page load and a longer one wraps that header. On an
IDENTICAL company (`ARENA.COMPS.prepared()`) the two builds are byte-identical: worst `vesna/both` at
-5, the same eight child heights, both ways.

⚠ **AND THE SAME PICTURES WENT THE OTHER WAY ON THE MUSTER WALL IN THE SAME EDIT**, which is worth
reading beside this: #197 HID the four adjectives there for the opposite reason (they were the
longest line on the row and nobody could compare them by eye) and said in capitals that hiding them
makes hiring blind unless the numbers reach the row another way. Four 32px marks are that way. **The
word is too long to compare and the picture is not - that is one finding, and it cuts a label on one
screen and adds four icons on another.**
⚠ **32 AND NOT 24.** `statIcoAt` takes a size because each caller reserves its own box, but #230's
note is the constraint: these are pixel paintings and 24 is a 3:4 resample that smears the grid.

## 5. Before the CSS ships

⛔ **THE PREVIEW PANE COMPOSITES NOTHING, SO A SCREENSHOT PROVES NOTHING AND `setInterval` FIRES
ZERO TIMES.** The DOM and these counters are the proof. Run them in the running build:

First, that the three scales are still closed. In the file, from a shell:

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

⛔ **AND A THIRD COUNTER, BECAUSE THE ONE ABOVE IS BLIND TO THE COMMONEST WAY A FIXED COLUMN
BREAKS** *(#230, 2026-08-21)*. The clip counter skips `overflow:visible` **by design** - a hex is
visible on purpose, and so is nearly every block on this build. So when a flex column runs out of
room and shrinks a child that has a fixed-height thing inside it, the thing does not clip, **it
paints over its neighbour**, and every gate in this file reads 0 while it happens. The company
sheet shipped exactly that: `#iBody` was `flex:0 1 auto;min-height:0` around a 196px `#iDollBox`,
and on a body wearing THE CIRCLE with a promotion point banked the figure lay **12.6px across the
SKILLS caption** on HEAD, with `LINT()` 0, the clip counter 0 and nothing in the stylesheet looking
wrong. Run this on any screen whose column is fixed-height:

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

⚠ **THE CHILD'S OWN RECT IS NOT ENOUGH AND THAT IS WHY THE PROBE WALKS ITS DESCENDANTS.** The
shrunk parent reports its shrunk height honestly; it is the fixed-height GRANDCHILD that hangs out
of it, so a check on the parent's rect alone sees a tidy column.

☑ **THE FIX IS TO STOP THE SHRINK, NOT TO CHASE THE OVERLAP.** `flex:0 0 auto` on the box makes the
column exceed its window and the scroller do its job, which is a visible, honest degradation. ⚠ It
is a real cost where a screen has promised not to scroll (#133 promised it for this one), so it is
a decision to take out loud and write down, never a silent one.

⚠ **AND MEASURE THE WORST BODY, NOT THE ONE THE SCREEN OPENS ON.** #200 established the Captain as
this sheet's worst case FOR WIDTH (six ability cards). For HEIGHT he is the *best* case: he has no
dismiss button, so his `iFoot` is 2px against every crew member's 25. A slack measured on him reads
53px and the real number is 30. **Whose worst case a screen has is a per-AXIS fact.**

⛔ **AND BOTH COUNTERS WALK `#stage *`, SO THE HOVER TIP IS INVISIBLE TO THEM** *(#266,
2026-08-29)*. `TIP` is appended to `document.body` - it has to be, or `moveTip` could not clamp it
against the window - so **`#gtTip` is not inside `#stage` and never has been.** #266 raised the stat
ledger's total from `--fs4` to `--fs6` and widened its column, i.e. it made bigger the one box in
the build that neither gate can see. **Measure a hover by hand, on every state that opens one:**

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

⚠ **`offscreen` IS THE HALF THE OVERFLOW NUMBER CANNOT SAY.** #252 records this box hanging off the
bottom of the board with 0 overflow inside it, because `moveTip` clamps against `innerHeight` and not
against `#stage`. A tip that fits and is in the wrong place reads the same to both counters.

**Known and pre-existing, on the shipped build, so do not chase them**: `#wMap` (the map is bigger
than its window), `#bField` and `#bLog` in the battle, and `#menu`/`#mTitle` on the front door. All
four are in the committed build before this pass; they were confirmed by running the same probe
against `git show HEAD:` in a second tab.

⚠ **AND A FIFTH THAT IS CROPPING ON PURPOSE: `#bTrait`.** It is a `-webkit-line-clamp:2` box - the
truncation is what the battle rail's 223px reservation is computed FROM, and the full text is on its
hover - so it reports 1-2px of overflow on every body that HAS a trait, and 0 on a body with none.
It is listed here because #191 measured it against an `e284b06` baseline and found both builds
identical, i.e. two separate sessions have now spent time proving the same non-bug. **This entry is
the exception the paragraph below forbids, and it earns it by being a DOCUMENTED intentional clamp
with a measurement, not a decoration that was drawn last week.** See `8f.209` in the changelog.

⚑ **THAT SECOND TAB IS THE TECHNIQUE, AND IT IS THE ONLY HONEST WAY TO READ AN OVERFLOW COUNT.**
`git show HEAD:prototype/grimtoll_slice.html > prototype/_head_baseline.html`, serve both, drive both
to the same screen, diff the probes, delete the copy. A raw count says 29 overflows and means
nothing; the diff against the baseline said 2 and 2, and the one real regression stood out at once.

⛔ **AND THE COUNTER CANNOT TELL A CROPPED DECORATION FROM CLIPPED TEXT, SO DO NOT BUILD ONE**
*(#187, 2026-08-18)*. The after-battle card was given the approved mockup's promotion ribbon: a
gold band hung 30px past the card's right edge with `overflow:hidden` cutting it, which is how
every corner ribbon on the web is built. It measures **`.abcrew w23` on every promoted body**,
permanently, on the one card in the game whose job is to be checked for clipped names. Four things
were measured before it was given up, and all four are worth knowing:

- **`overflow:clip` does not dodge it.** It creates no scroll container, so `scrollWidth` ought to
  be the box - Chrome reports the scrollable overflow region either way. Measured, not assumed.
- **`clip-path:inset(0)` DOES dodge it** (the element's `overflow` stays `visible`, so the probe
  skips it) **and eats the element's own outer box-shadow with it.** A card that needs depth
  cannot pay that.
- **Overflow to the LEFT and the TOP is free**, in an LTR box: neither is scrollable, so neither
  reaches `scrollWidth`/`scrollHeight`. A top-left corner ribbon is therefore probe-clean - and on
  this card it would have sat across the portrait's face.
- **Sizing the band flush to the two edges is arithmetic and is not a ribbon.** A strip `W` long
  and `t` thick turned by θ has a bounding box `W·cosθ + t·sinθ` by `W·sinθ + t·cosθ`; pin that
  into the corner and the ends land ON the edges. Nothing crops it, so it reads as a stick lying
  on the card.

**So the decoration changed instead of the counter.** ⛔ **Never add a fifth entry to the
known-and-pre-existing list above to make a new decoration fit.** That list is four items long
because it is four genuine facts about the build's geometry; the day it grows to absorb whatever
was drawn last week, the counter stops meaning anything and the next real clipping ships behind
it.

Then `LINT()` for 0 findings, and on the map the three counters from
`.claude/rules/world-map-sights.md`: `spacingViolations().length`, `labelViolations().length`, and
the `MAP_SIGHT` orphan check, all 0. Type sizes move name plates, so the map counters are part of
this gate and not somebody else's.

## 6. Adding to the scale

Do not, first. 153 of the 316 type sites landed on one step, which says the vocabulary is wide
enough rather than too narrow.

If a screen genuinely needs a step that does not exist, add it to `:root` with a comment naming the
surface that needed it, and take the whole build through §5 again. **A one-off literal is the thing
this rule exists to stop**, and the file it was written against had twenty-nine of them.
