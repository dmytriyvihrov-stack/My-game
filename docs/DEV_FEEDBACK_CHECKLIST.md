# #164: the designers' checklist, and RabbleBound run through it

Where it comes from: **The Turn-Based Games Discord, `#dev-feedback`**, the channel described as
*"A place for developers to ask for feedback"*. It is the right room for this game specifically:
everyone in it ships turn-based tactics, so the notes are about turn order, grid readability and
capsules rather than about shooters.

**What was actually read**, because the sample decides how much the checklist is worth: about
**70 messages verbatim**, two windows, `2026-07-08` to `2026-07-15` and `2026-08-13` to
`2026-08-15`, plus a partial sweep of the ~440 messages back to 2026-07-08. Discord rate-limits
history, so this is a sample and not the channel. It is enough to see what repeats, which is the
only thing a checklist needs; it is not enough to claim "these are the top ten complaints ever".

⚑ **The value of this channel is not the individual notes, it is that the SAME notes arrive on
every game.** Four different developers got told to standardise their fonts in one week. That is
what makes it a checklist rather than a transcript.

---

## The checklist

Fourteen items, in the order a stranger meets them. Each carries the line that produced it, so
that a future disagreement is with a named designer rather than with this file.

### A. Before anyone plays: the capsule and the page

**A1. The capsule composition must lead the eye to the logo, and only there.**
> *"You've got a lot of eye-lines, movement, and other elements all leading in different
> directions that don't really converge on anything. ... you'd have a nice triangle of wizard ->
> logo <- player characters."*

Test: draw an arrow along every eye-line, limb and diagonal in the image. If the arrows do not
meet, the composition is not finished. The character designs are usually not the problem.

**A2. The capsule's job is the click, not the summary.**
> *"the purpose of the capsule art isn't to be able to wholly represent the game by itself as a
> standalone asset. It's to grab attention to get people to investigate further. The screenshots
> of the game will do their own work."*

Test: does it stop a thumb, at thumbnail size, against the eight capsules next to it.

**A3. It must survive 184x69.**
> *"Here's the glitched mirror capsule at 184x69, and yours for comparison. good news is the text
> does appear to be legible - but for some reason your artwork doesn't fit the aspect ratio?"*

Test: export at 184x69 and look at it, not at 100%. Check the aspect ratio is native and not a
crop of something else.

**A4. Proofread the blurb.**
> *"it's a good idea to proofread your marketing materials. Your blurb has a lot of typos, and
> that might make people think your game is low-effort or a scam."*

**A5. Do not wear the AI palette.**
> *"the purple, dark blue and gold, I see that in a lot of AI generated games. So changing the
> colour scheme could help make the game stand out."*

⚠ The harshest thread in the whole sample was this one. A tester wrote *"the lack of care / AI
generated assets make me not want to try it for myself"*, and a second developer refused to
believe a game existed at all: *"I'm not convinced this game actually exists, given the AI-gen key
art."* This is a credibility gate, not a taste note.

### B. Readability: the distance test

**B1. Step away from the screen.**
> *"Try stepping away from the screen, how far away can you get and still read it? If I step away
> far enough for this card to look actual card size, I wouldn't be able to say that there's a
> number there at all."*

This is the single most reusable test in the channel. It costs nothing and it does not care about
your opinion of your own font.

**B2. Numbers get contrast and an outline, always.**
> *"the purple is too hard to read. the red is slightly too hard ... those numbers should be
> highly readable."*
> *"the '3' and '5' ... is somewhat borderline hard to read, especially 3 vs 5. i would suggest
> adding a black text border around the numbers."*

⚑ The **3-vs-5 pair** is the specific one to check in your own font, along with 8/6 and 1/7.

**B3. Colour coding is a cost, so make it earn its place.**
> *"do u think this color coding is necessary / good?"* was answered with *"i fear that if i
> insert too many colors and icons it will lose immersion. Dont want to overdo it"* and, from the
> other side, *"i get what u mean but to my eyes it seems busier, too many colors and icons now."*

Test: remove the colour. If nothing is lost, it was decoration. The same argument is why one glyph
may not mean two things.

### C. UI consistency: the boring things, and they come first

**C1. One set of outline colours and one set of thicknesses.**
> *"the UI elements all seem to have different outline colors and thicknesses. standardizing these
> would help."*

The developer's own answer is the reason this is item one: *"I think it's one of those things I
stopped noticing because I stared at them for so long."*

**C2. Few font styles, few sizes, used consistently.**
> *"i count quite a few diff fonts, font sizes, and colors. having fewer variants and using them
> more consistently would help."*
> *"coming up with consistent font styles + sizes for your different types of typography. Think
> Header / Label / Body, then different sizes for each (S/M/L/XL). The consistency takes the
> guesswork out of it and also helps players more quickly digest what you show them."*

**C3. Consistent margins and padding, and real whitespace.**
> *"The biggest thing your UI needs ... is consistent margins and padding. Whitespace is really
> important to help separate things visually and help your brain process everything. Try adding
> some top/bottom/left/right padding of like 24 between the edges of your panels and the content
> and see how it feels."*

**C4. Every panel size must be a decision you can defend.**
> *"the size of various panels also feels arbitrary. why is the rewards panel the size that it is?
> what was the decision behind leaving the space above and below it?"*
> *"how is each section related to other sections and what is it anchored to?"*

**C5. Information architecture: list, then rank, then size.**
> *"first list out every piece of information the player needs to get from your UI ... The next
> step is to prioritize the information you listed in order of importance to the player ... The
> relative priority dictates how large/small the elements are relative to one another."*

⚑ **The order is argued about and that argument is itself useful.** The advice given was
margins first, then IA. The developer who received it pushed back: *"I don't know if 'you do
margins, then do information ordering' is necessarily the order in which things go."* Both were
right about their own game. What is not optional is that both get done.

### D. Combat legibility: the turn-based specific ones

These come from the three questions a developer asked the room on 2026-08-15, and the answers.
The questions themselves are a good self-interview:

> *"Is it immediately clear whose turn it is and what's happening? Are the abilities/UI readable,
> or does the screen feel too busy? Does the combat look interesting enough that you'd want to try
> it yourself?"*

**D1. Whose turn it is must be answerable in one glance, with no memory of the previous frame.**

**D2. Movement is animated with easing, over roughly 200ms.**
> *"animate the characters with easing over something like 200ms so that we can see their
> movement."*

**D3. A projectile must be slow enough and big enough to show its direction and where it lands.**
> *"slow down projectile movement and make it much larger so we can see what direction things are
> firing from and landing."*

**D4. A hit needs a hit spark.**
> *"add hit spark / juice on damage hit to see better what is going on."*

**D5. It must be clear who is attacking whom.**
> *"characters don't make it clear who they're attacking or what they're doing. They're just kind
> of leaning at each other."*
> *"I don't know enough of what is happening in combat because things are just happening back and
> forth."*

⚠ **The screen going grey is a named failure.** *"The entire UI and screen is very unreadable,
everything is the same shade of grey."* A single-value palette is read as an absence of design,
not as a mood.

### E. The trailer

**E1. Gameplay in the first five seconds.**
> *"your trailer does a not so great job of displaying the actual gameplay, especially early. Most
> of the first third of the trailer is just a character intro."*
> *"it'd be even better to have a faster cut sizzle reel for the first 5ish seconds with 1 second
> per clip of the most energetic gameplay moments, after which ... people will already be primed
> with gameplay."*

**E2. Any text on screen must be readable at its own pace.**
> *"the dialogue near the start kinda went by fast for me, i wasn't quite able to finish reading
> it in time."*

**E3. The viewer must know who they are playing, early.**
> *"only a few mins into watching it ... did i realize the audience/player is meant to be Envy."*

**E4. A repeating micro-structure is a feature, keep it.**
> *"the repeating mini-structure of quickly showing 'character portrait -> their corporate title
> -> their units -> their units in action' is good, def keep that."*

---

## RabbleBound run through the checklist

⚠ **How this audit was made, so its weight is known.** The build was measured in the source, not
played this session: the browser was closed at your instruction before a live pass. So every
verdict below is either **measured** (a count out of `prototype/grimtoll_slice.html`, reproducible
by the command shown) or **read** (from a shipped doc). Three items need eyes on a running screen
and are marked as such rather than guessed.

| | item | verdict | evidence |
|---|---|---|---|
| A1 | capsule leads the eye | **n/a yet** | there is no capsule. `art/src/` has 8 portraits, 16 event scenes, map sights, and no key art of any kind |
| A2 | capsule sells the click | **n/a yet** | same |
| A3 | survives 184x69 | **n/a yet** | same |
| A4 | blurb proofread | **not audited** | no store blurb exists yet. `docs/MARKETING_VENUES.md` sets the gates for writing one |
| A5 | not the AI palette | **PASS** | the palette is `#100c06` ground with browns and desaturated greens. Not purple/blue/gold. The art is a hand-directed stage pipeline with a written brief, not prompt output dropped in |
| B1 | the distance test | ✅ **FIXED, #164** | was: **77 declarations at 9px or smaller**, down to 7px, across the whole label layer. Now a **10px floor** (`--fs1`), measured in the running build: elements rendering under 10px went **58 to 0** on the battle screen and **43 to 0** on the skirmish setup |
| B2 | numbers get contrast + outline | **not audited** | needs a screen. Worth checking 3-vs-5 in the mono face specifically, since damage figures and hex counts both use it |
| B3 | colour coding earns its place | **PASS** | this is `.claude/skills/event-cards/SKILL.md` already: *"one glyph may not mean two things on one screen"*, ☠️ vs 💀 fixed in #150, and the receipt/intent split holds the line |
| C1 | one set of outlines | ✅ **FIXED, #164** | was 7 near-identical hexes hand-written at 88 sites, two pairs indistinguishable on screen. Now **5 named edge tokens** (`--e1`..`--e5`). ⚠ The 47 `border-color` accents were deliberately NOT collapsed: those carry meaning, and flattening them would be #102's wrong-unit bug arriving through a tidy-up |
| C2 | few font sizes | ✅ **FIXED, #164** | was **29 sizes** in half-pixel steps including a `7.6px`. Now **9 tokens**, `--fs1`..`--fs8` plus `--fsTitle`, and **zero literal `font-size` px left in the file**. Font families already passed: three, all tokens |
| C3 | consistent padding | ✅ **FIXED, #164** | was **72 distinct values**, none used often enough to be a system. Now **7 steps**, `--p1`..`--p7`, with exactly **one literal left in the whole file** (`#wBar`'s 64px plaque gutter, which is geometry and says so) |
| C4 | panel sizes defensible | **PARTIAL, better** | the good side was already real: #133 cut the company sheet from 1241px to 678px with a reason per block, #113 proved the map sight ceiling with arithmetic. #164 put the *inside furniture* of every panel on a shared scale, so the reasoning is no longer only in per-entry docs. Panel OUTER sizes are still argued one at a time |
| C5 | information architecture | **PASS** | this is the strongest area. #133 put stats first because *"the order was the bug"*, #102 is the wrong-unit rule, #143 split prose from receipt so a number never appears twice. This is IA discipline by the channel's own definition |
| D1 | whose turn, one glance | **PASS** | the counts capsule carries standing bodies per side, the round, and whose turn; the active ring IS whose turn it is and the plaque under it is who they are |
| D2 | eased movement ~200ms | **PASS** | 7 hand-tuned `cubic-bezier` curves, 24 `ease-in/out` uses, and #81 put every duration through one `paced()` multiplier |
| D3 | readable projectiles | **PARTIAL** | #87 gives the loose and the flight their own primitives, but the open item recorded in memory is that `strike()` resolves a shot in the tick it is loosed. The channel's note is exactly this one: slower and larger |
| D4 | hit spark | **PASS** | 57 spark/shake/flash/impact sites, and #87 keys the animation on what the act DOES |
| D5 | who is attacking whom | **PASS, recently** | #156 fixed the enemy-reach hover that was drawn everywhere except the overlap; #157 moved the bars to the head so they survive being surrounded; #163 is claimed for another pass |
| E1-E4 | the trailer | **n/a yet** | no trailer exists |

**Score at the first run, 2026-08-16 morning: 8 pass, 2 partial, 4 fail, 6 not yet applicable.**
**Score after #164 the same day: 12 pass, 2 partial, 0 fail, 6 not yet applicable.** The four fails
were one finding and they were fixed in one pass; see `.claude/skills/ui-scales/SKILL.md` for the standing
rule and §4 there for the five boxes the 10px floor broke on the way.

---

## What the run actually found

⛔ **One finding, and it is a single finding wearing four numbers.** B1, C1, C2 and C3 are not four
problems. They are one: **the build has no design tokens for size, spacing and edge, so every rule
was decided locally and correctly, thirty times.** 560 distinct hex colours sit against 34 CSS
variables. 29 font sizes against 3 font families. The families are tokens and they are consistent;
everything that is not a token is not.

⚑ **This is the same shape as every finding in the channel**, and the developer there named it
better than this file can: *"I think it's one of those things I stopped noticing because I stared
at them for so long."* A build that has been polished screen by screen for months converges on
locally-perfect, globally-inconsistent. That is what a stranger sees first and what the author
cannot see at all.

⚑ **It is also, exactly, the clarity pass.** The standing rule is cut, delay, merge, and nothing is
added. A size scale, a spacing scale and one edge palette are a **merge**: 29 sizes become maybe
6, 72 paddings become maybe 5, 42 borders become maybe 4. Nothing new arrives on screen.

### The order, and what happened to it

The plan was five steps. Steps 1 to 4 were done the same day as **#164 / build 8f.192**, in that
order, and the reason the order held is that each one made the next cheaper.

1. ✅ **The label floor.** 10px, at the user's word (*"Minimum font i feel, nice to be 10"*). 153
   declarations raised.
2. ✅ **The edge palette.** Seven near-identical browns and greens became `--e1`..`--e5`. Exactly as
   predicted: a grep-and-replace with no layout risk, and it was the only step that broke nothing.
3. ✅ **The size scale.** 29 sizes to 9 tokens. The half-pixel steps and the `7.6px` are gone.
4. ✅ **The spacing scale.** 72 paddings to 7 steps. It moved boxes, as predicted, and it is where
   the two sticky-footer couplings turned up.
5. ⏳ **D3, the projectile.** Not done. Still the open item from #81, still with an outside voice
   asking for the same thing.

⚑ **The prediction that was wrong.** Step 4 was called the riskiest because it moves boxes. It was
not: **step 1 was**, and by a distance. All five broken boxes came from the floor, none from the
spacing. A padding shifts a box by two pixels; a font size changes what fits inside one, and a
`text-overflow:clip` then eats the end of a word without telling anybody.

### What this run could not answer

**Now answered, in the running build:** the live read of B1. Sub-10px elements went 58 to 0 on the
battle screen, 43 to 0 on the skirmish setup, 0 on the menu, the map, the prologue and all three
tabs of the company sheet. Clipping overflow held at its pre-existing 2 (`#bField`, `#bLog`), proved
against a second tab serving `git show HEAD:`. `LINT()` 0 findings; the map's three counters 0.

**Still open:** B2, the 3-vs-5 contrast read, which needs an eye rather than a counter and the
preview pane composites no frames. The road event card and the camp were not reached, because the
travel animation between map nodes never completes in that pane. A1 to A5 and E1 to E4 need
artifacts that do not exist yet, and this channel is where they should be shown when they do.
`docs/MARKETING_VENUES.md` Gate A is the same gate this channel implies: a stranger finishes fifteen
minutes without asking anything.
