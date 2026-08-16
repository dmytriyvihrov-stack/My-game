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
| `--fs1` | **10** | every label, chip, caption, counter and role line. **THE FLOOR.** |
| `--fs2` | 11 | a dense row that is read rather than glanced at |
| `--fs3` | 12 | body |
| `--fs4` | 13 | body, the size a paragraph wants |
| `--fs5` | 15 | a subhead, a name, the number on a chip that matters |
| `--fs6` | 17 | a head |
| `--fs7` | 20 | a big head, the action glyph |
| `--fs8` | 24 | the display line on a card |
| `--fsTitle` | 74 | GRIMTOLL on the front door, and nothing else |

⛔ **`--fs1` IS 10px AND NOTHING ON THIS SCREEN IS SMALLER.** (User, 2026-08-16: *"Minimum font i
feel, nice to be 10"*.) The build had **77 declarations at 9px or under, down to 7px**, and they
were not decoration: they were the whole label layer. The channel's own test is the one to use, and
it costs nothing:

> *"Try stepping away from the screen, how far away can you get and still read it?"*

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

⛔ **A PADDING OVER 24 IS NOT SPACING, IT IS GEOMETRY, AND IT KEEPS ITS LITERAL.** Exactly one
survives: `#wBar{padding:0 64px 0 var(--p5)}`, which reserves the run of bar the centred day plaque
swings through. A scale step substituted there is a bug. If a second one ever appears, it gets a
comment saying what it reserves, the way that one does.

⛔ **AND A PADDING PAIRED WITH A NEGATIVE MARGIN IS ONE NUMBER WEARING TWO NAMES.** Two sticky
footers on this build (`#wDlg #wChoices`, `.popts`) cancel their own bottom padding with a matching
negative margin and a matching sticky offset. They are written `calc(var(--pN) * -1)` so the three
cannot drift apart. **The `.pcard` phantom-scrollbar fix is the same thing and is now literally the
same token**: the card's bottom padding and the footer's bottom padding are both `--p7`, so
"matching" is a thing the file states instead of a thing somebody remembered.

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

## 5. Before the CSS ships

⛔ **THE PREVIEW PANE COMPOSITES NOTHING, SO A SCREENSHOT PROVES NOTHING AND `setInterval` FIRES
ZERO TIMES.** The DOM and these counters are the proof. Run them in the running build:

First, that the three scales are still closed. In the file, from a shell:

```bash
grep -o "font-size:[ ]*[0-9.]*px" prototype/grimtoll_slice.html | sort -u | wc -l   # 0
grep -o "padding[a-z-]*:[^;}\"']*" prototype/grimtoll_slice.html | grep -oE "[0-9.]+px" | sort -u  # 64px, alone
grep -o "border[a-z-]*:[^;}\"']*" prototype/grimtoll_slice.html | grep -icE "#(3d2f1d|4d3c22|6b5330|2c3d3f|35494c|33474a|3d5250)"  # 0
```

In the running build, per screen:

```js
/* nothing under the floor. Run it on EVERY screen, not the one that is open */
[...document.querySelectorAll('#stage *')].filter(e=>{const c=getComputedStyle(e);
  if(c.display==='none')return 0;const f=parseFloat(c.fontSize);
  return f>0&&f<10&&(e.textContent||'').trim();}).length                    // 0

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

**Known and pre-existing, on the shipped build, so do not chase them**: `#wMap` (the map is bigger
than its window), `#bField` and `#bLog` in the battle, and `#menu`/`#mTitle` on the front door. All
four are in the committed build before this pass; they were confirmed by running the same probe
against `git show HEAD:` in a second tab.

⚑ **THAT SECOND TAB IS THE TECHNIQUE, AND IT IS THE ONLY HONEST WAY TO READ AN OVERFLOW COUNT.**
`git show HEAD:prototype/grimtoll_slice.html > prototype/_head_baseline.html`, serve both, drive both
to the same screen, diff the probes, delete the copy. A raw count says 29 overflows and means
nothing; the diff against the baseline said 2 and 2, and the one real regression stood out at once.

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
