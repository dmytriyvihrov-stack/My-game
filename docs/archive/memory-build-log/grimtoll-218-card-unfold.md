---
name: grimtoll-218-card-unfold
description: "#218 (8f.241), 2026-08-21: the event card unfolds from a lit seam, and a door's 2px left rail is derived from its intent glyph. COMMITTED on desk `work/card-unfold`, NOT landed - main's tree is dirty with another session's uncommitted .hirestage work. An animated transform outranks a declared one, so a `forwards` fill silently kills :hover; and a two-glyph door is resolved by the STYLESHEET's row order, not by JS."
metadata: 
  node_type: memory
  type: project
  originSessionId: 4b1c5f8f-028c-4bdf-b73e-7040a5a80afc
  modified: 2026-08-21T10:10:34.861Z
---

Two asks on the event stage: *"i also want when event unfolds - add some animation to the screen
(like unfolding) - similar as choices where in frostpank"* and *"improwe a bit design of butons on
the choices sreen (i like icons and placment) - maybe some borders more thematic and coreleated to
choice"*. The standing rules are in `.claude/rules/event-cards.md` under #218; this is what is worth
carrying forward.

⛔ **`backwards`, NEVER `both`, AND IT NEARLY SHIPPED SILENTLY.** An animated transform outranks a
declared one, so a `forwards` fill keeps the animation's final `transform:none` in force after it
ends - and `both` on the staggered doors killed `.choice:hover{transform:translateX(4px)}`, the one
piece of feedback a door has, with nothing in the console and nothing in the stylesheet looking
wrong. ⚑ **The test needs no pointer: write the hover's transform INLINE and read it back.** If the
declaration wins, the fill is right. ⚠ Read it at t=0 and you get the identity matrix, which looks
exactly like a broken fill - `.choice` has its own 140ms transform transition and it has to be
waited out. That cost one wrong conclusion.

⛔ **A CARD CLOSES WITHOUT CLEARING ITS OWN HTML**, which is why the box's gate is
`.on:has(.evstage)` and not the `:has` alone. Every close in the file is `classList.remove('on')`
and nothing else, so `#wDlg` goes on matching `:has(.evstage)` for the rest of the session and an
animation hung on the `:has` would have fired **once**, on the first road card of the run, and never
again. ⚑ The two things that re-arm by themselves and cannot go stale: `.evstage` is a brand new
element on every open, and `.on` already comes and goes. **No class to remember to clear** - which
is [[grimtoll-209-event-stage]]'s own rule arriving on motion.

⛑ **THE DURATION IS READ OFF THE ANIMATION TIMELINE, NOT OFF A SAMPLING LOOP.** A loop polling
`getAnimations()` every 35ms reported **725ms** for a choreography whose exact end is **470** -
it was measuring its own latency plus finished-but-not-yet-collected effects. `a.startTime` plus
`a.effect.getComputedTiming().endTime` is exact. ⚠ And the first cut really was 600ms, because the
two longest members are a DELAY plus a DURATION and nobody had added them up.

⚑ **A CARD IS CAPTURED BY PAUSING THE TIMELINE, NOT BY RACING IT.** `document.getAnimations()`
returns CSS animations like any other: `a.pause()`, set `a.currentTime = T`, screenshot. Exact
frames at 0/60/130/220/330/470ms, which is how the gate picture for this entry was made.

⛔ **THE OUTLINE IS STATE AND THE RAIL IS INTENT.** The door's four-sided border is a readout and has
been since #137; `ui-scales.md` §2 forbids flattening an accent edge. The 2px LEFT rail was the empty
channel and is now `iv-<key>` off the door's own `ico`. ⚠ **A pseudo and not `border-left-color`**,
because `:hover` sets the `border-color` SHORTHAND and would erase the rail at the moment it is being
read.

⛔ **A TWO-GLYPH DOOR IS RESOLVED BY THE STYLESHEET'S ROW ORDER, NOT BY JS.** The first cut read
`ico.slice(-1)` on the reasoning that the moral colour is authored second, and THE WARM SPRING broke
it inside an hour: its `['take','leave']` door is two VERBS, so "last wins" handed the null rail to a
door that takes something. Writing every intent as a class and listing the five verbs first, then
`help` and `evil`, moves the whole question into the cascade - and deletes the second table JS was
about to grow. ⚑ **Proved by making it FIRE**: appending an `.iv-fight` row after the block flipped
`fight,evil` from blood to blood-lit, removing it flipped it home.

⚑ **`leave` GETS NO ROW, AND NOTHING LINTS THAT, AND IT CANNOT.** It is 28 of the 158 doors and it is
the null option; a rail on it would tint a third of every card to say *nothing happens here*. The 19
bare CAMPS rulings fall to the same default untold. **An intent with no row is indistinguishable from
an oversight, because `leave` deliberately is one** - so a ninth intent would ship quiet, and that is
written down rather than guarded.

⚠ **A STRIP BUILT TO PHOTOGRAPH THE RAILS CAME BACK UNSTYLED** because it was hung off
`document.body`. Not a bug: every rule is `#wDlg .evchoices .choice`, so it was the scoping working.

**Where it stands.** Committed on desk `work/card-unfold` (`b08ef4e` the build, `acc5729` the
record), **2 ahead of main, 0 behind**, NOT landed: main's tree carries another live session's
uncommitted `.hirestage` work in the prototype, and `merge.ps1` correctly refuses to overwrite it.
⚠ That work touches the same `#wDlg:has(.evstage)` / `.evstage .evback` selector lists, so expect a
small conflict there when both land - my edits only ADD rules beside them rather than editing them,
which is what keeps it small. See [[grimtoll-parallel-sessions]] and `branch.ps1 land`.

**Open for the user's call** (all three in the sheet published this session): `honor` on `--ore` and
`rest` on `--gem` are the two palette hexes most likely to be wrong; 470ms is the pace; and the
unfold is scoped to the painted stage, so the muster wall, the shop and the withdraw screen still
appear instantly.

Related: [[grimtoll-209-event-stage]], [[grimtoll-event-card-rules]],
[[grimtoll-measuring-the-running-build]], [[grimtoll-safe-file-patching]].
