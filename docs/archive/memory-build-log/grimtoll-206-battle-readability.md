---
name: grimtoll-206-battle-readability
description: "#206 five on battle readability - BUILT on main 2026-08-20 (8f.228), not deployed: no hex had a :hover rule at all, the board cannot clear the floating chrome, the map's wheel ate the road card, and an auto-applying act has no selected state to draw"
metadata: 
  node_type: memory
  type: project
  originSessionId: 625c8e05-3f62-4e4a-806e-76294e446345
  modified: 2026-08-20T07:45:18.425Z
---

Five items from the 2026-08-20 feedback round, all in `prototype/grimtoll_slice.html` on **main**.
Built and gated, **not deployed**. Follows [[grimtoll-205-feedback-three]].

⛔ **THE BOARD CANNOT BE MOVED OUT FROM UNDER THE CHROME, AND THE ARITHMETIC IS THE ANSWER.** The
board is 588x416; at the FULL stop (z 1.64) it draws **964x682 in 1280x720**. `#bPlq` reaches x 272
at the bottom-left and `#bEnd` starts at x 1046, so the bottom band offers **774px of clear ground
to a 964px board**, and spending the 38px of vertical slack upward crops the top row's heads under
`#bCap`. The two closer stops PAN, so their overlap moves every turn anyway. **So the chrome yields
instead** (`veilChrome()`, 8% of a body → half opacity, full on hover). It fires on four fights in
five, which is a measurement of how crowded the board really is.

⛔ **`wpanInit`'s WHEEL LISTENER ATE EVERY NOTCH OVER THE ROAD CARD.** `#wDlg` is a CHILD of `#wMap`
and the handler `preventDefault()`s to step the camera: measured, one notch over the card's own
heading came back `defaultPrevented` true with `WCAM.i` 1→0. Its own `pointerdown` two lines below
had excluded `#wZoom,#wDlg` since it was written. ⚑ **The other half is the platform**: macOS paints
an OVERLAY scrollbar and hides it until something scrolls, so with the wheel dead there was nothing
to grab either. ⚑ And the card had **two nested scrollers**; measured on ten cards, the outer one had
**never scrolled** (`scrollHeight === clientHeight` on all ten). It is `overflow:hidden` now, not
`visible`, because `#wChoices` is `position:sticky` and needs a scroll container.

⛔ **AN ACT THAT APPLIES AUTOMATICALLY HAS NO SELECTED STATE TO DRAW.** COMMAND, HOLD THE LINE and
ROAR resolve inside `selectAct` (spend, apply, `autoEnd`), so **clicking the COMMAND card leaves
`B.sel` as the standing MOVE and hands the turn on**. The first cut hung the radius preview off
`B.sel` and it could never appear. It rides the card's **hover** through `paintPeek` now, and paints
OCCUPIED hexes: a swing asks where it can LAND, an order asks WHO it reaches.

⚠ **AND A MEASUREMENT TRAP THAT WILL COME BACK: A CSS TRANSITION IN A NON-COMPOSITING PANE NEVER
ADVANCES.** The veil read `opacity: 1` with the class provably on the element and the rule provably
the only match, because `.veiled` carries a `.18s` transition and the hidden preview pane freezes its
clock at the value it is *leaving*. `el.getAnimations().forEach(a=>a.finish())` before the read
reported 0.5 at once. Same family as the map camera's transitioned transform.
See [[grimtoll-measuring-the-running-build]].

⚑ Smaller: **no hex had a `:hover` rule on any state anywhere in the file** (`.hex.lit:hover` now
draws the ivory ring `.hex.acting` already used); **`aura:` is one field read by four sites** where
the radius used to be typed three times per act; **`.hlos` is deleted** at the user's ruling and the
lane is still named in words by `hitBreakdown` on the readout.

Gates: `LINT()` 0 · nothing under the 10px floor · overflow `#bField`/`#bTrait`/`#bLog` only ·
map counters 0/0/0 · the #194 road check 0.
