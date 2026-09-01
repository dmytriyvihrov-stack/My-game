---
name: grimtoll-243-eighteen-ask-batch
description: "#243 the eighteen-ask batch - LANDED + DEPLOYED 2026-08-25 (8f.267). Two 'show it more clearly' asks were BUG REPORTS: the company's mood reached the field as Math.min(0,G.morale) and could only ever subtract, and the camera was framed against a board render() had not built yet. And a baseline diff that says 'byte-identical' may be one browser measured twice - gt.py's --port goes AFTER the verb"
metadata: 
  node_type: memory
  type: project
  originSessionId: 816b1e09-c346-4ed2-826a-9b43bb2cc2fc
  modified: 2026-08-25T09:23:53.921Z
---

**The ask** (2026-08-25): eighteen items across four screens, plus two clarifications mid-session
(*"for morale one - i meant morale on global map"* and ask 17 arriving after 16). Landed on main as
`b537c15`, deployed as `7a0e288`, build stamp **8f.267**.

## ⛔ TWO "SHOW IT MORE CLEARLY" ASKS WERE BUG REPORTS, AND ONLY DRIVING THE BUILD SAID SO

⛑ **THE MOOD.** *"On global map - show more clear what does mood do"* could not be answered,
because `unitFrom` carried the company's mood onto the field as **`Math.min(0,G.morale)`**: a
company at HIGH SPIRITS was worth **exactly what a company at AT EASE was worth**. The two happy
rungs of `MOODSTATES`, their faces, their descriptions and the whole feast economy behind them paid
nothing at all. There was nothing to show. The user's own second sentence - *"and mood should
really make influence to a party mood"* - is the bug report, and it had to be built before the
display ask had an answer. **Every rung carries an `fx` block now** (start / hit / dodge / xp /
leave) and four surfaces read it.

⛑ **THE CAMERA.** *"proper centering at the start"* was `startBattle` calling `camApply(true)` and
THEN `render()` - and `render()` is what puts `#bGrid` inside `#bGround`. On the **first fight of a
page session** that element is its own padding and nothing else: an apron round a PLAY BOX OF ZERO.
Measured after a reload, **tx 515.4 / ty 319.5 against the correct 33.2 / -21.6**, and then it
STICKS, because at FULL neither axis pans and render's own `camApply()` takes the `!snap` early
return. ⚠ **It reads as intermittent for exactly the reason #108's tutorial bug did, and the
comment saying so is twenty lines from the call**: every later fight of a page session measures the
PREVIOUS fight's grid and is correct. **I could not reproduce it for an hour** because every probe
had already driven a battle.
⛔ **The `||596` / `||416` fallbacks in `camApply` were #241's pre-apron ground size** and could
only ever have framed the wrong board quietly. A measurement that cannot be trusted is refused now,
not defaulted.

## ⛔ A BASELINE DIFF THAT SAYS "IDENTICAL" MAY BE ONE BROWSER MEASURED TWICE

`gt.py` declares `--port`/`--url` on the top level AND on each sub-parser, so
`gt.py --port 9999 eval x.js` parses fine and the sub-parser's `None` wins: **the call lands on this
worktree's own browser instead of the one named**. Two runs, byte-identical numbers, read as *"the
change had no effect"* - and a correct edit was nearly reverted on the strength of it. It is
`gt.py eval --port 9999 --url ... x.js`. Written into `tools/dev/README.md`.
⚑ **The free tell**: put a string only ONE build has in the probe and read `location.href` back off
both ports before believing any comparison. See [[grimtoll-measuring-the-running-build]].

## ⚠ AND A MEAN ALONG A DASHED CURVE MEASURES THE GAPS

The roads you have not walked were 1/3 ink and 2/3 ground, so averaging the centre line reported the
new build and HEAD as identical; a MAX over the curve reports the brightest tree within two pixels of
it. **The top third of the samples against the median beside them** is the figure
(`tools/dev/probes/road243i.js`), and it reproduced #226's own recorded 1.29 on HEAD, which is what
made it trustworthy.
⛑ **#226's table had gone stale under it**: that entry recorded live 3.93 / walked 1.79 / ahead 1.29,
fixed the walked road and left the bottom row - then #233 repainted the world map. Re-measured, the
road ahead was **1.13 to 1.39, and on two of four edges the SAME LUMA AS THE GROUND OR DARKER**. Now
1.35-1.59 against walked 1.46-1.93 and live 2.20-2.92.

## The rest, and the two design calls worth re-opening

- **`warmage` is `MAGE` with the globe alone.** ⛔ Two classes cannot wear one word - the stranger's
  class picker deduped `CLS_BY_RACE.human` and would have drawn **two identical MAGE buttons**. The
  glass cannon is off the wall behind `MAGE_GLASS=false`; its row, its perks and its lore box are all
  still there, and its lore box is now unreachable. **One `const` to re-open.**
- **The zone of control is an outline** (`drawZoc`, 14 hexes -> 44 segments of a possible 84, in
  `#bGround` so the camera is not a question). ⚑ #171 wrote *"it stays an EDGE and never becomes a
  FILL"* and then wrote `edge='rgba(150,40,45,.44)'`, which `render()` hands to
  `hedge.style.background` - **the variable was called `edge` and had been a fill for 200 entries**.
  ⚠ **The glow on the bodies that will swing was KEPT**: #205 and #234 asked for it and an outline
  cannot say WHO. If the user wanted that gone too, it is two CSS rules.
- **`camBand()`** is one interval from the resting frame to the ground's far edge: identical to the
  old pan clamp at FIELD and CLOSE, and **91x120px of hand camera at FULL where there was none**.
  Driven into all four corners at all three stops: 0px of empty ground on every side.
- provisions **-30% at `pay()`**, the one food door, with `evPaidOf` running the same cut ·
  **double rations mend the temporary INJURY clock too** (`MEND_DOUBLE` had only ever halved
  hitpoints) · a **second secondary objective** off a `GOALS` table · **+3 HEADS** on the contract ·
  the sheet's MOOD bar was **the literal `78%` on every body in the game** · the tutorial fight off
  the front door, which is #119 deleted by its own argument.
- ⚠ **The mood's `+10 dodge` is stated PRE-CAP**, the way every other +dodge in the game is:
  `softDodge` makes it about +6 on a body already carrying a shield, exactly as the Round Shield's
  printed `+9` does.

⚠ **The clash reported one `DRAW/STALL HIT GUARD` twice, both times when `regress` was the first
arena call on a page where `gates.js` had left a live brigand battle standing.** On a freshly
launched page: three clean sweeps, plus 30/30 clean `clashrun`. It is the stall
[[grimtoll-236-hex-readouts]] already recorded as a backlog row.

Related: [[grimtoll-241-board-apron]], [[grimtoll-session-toolkit]], [[grimtoll-232-mood-rename]].
