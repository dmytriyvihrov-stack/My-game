---
name: grimtoll-187-aftermath-screen
description: "#187 (8f.207) the after-battle screen re-dressed on the approved hybrid, 2026-08-18, SHIPPED to main and NOT deployed"
metadata: 
  node_type: memory
  type: project
  originSessionId: 54a12711-11fa-45c1-9454-2afa70a2bd89
  modified: 2026-08-18T10:26:16.229Z
---

**#187 / 8f.207, landed on `main` 2026-08-18, hosted build NOT rebuilt** (the brief said rebuild
only if the user asks, and `deploy.ps1` pushes). Emblem + CSS rays + one meta line, four crew
cards across, injury keeps #122's blood and gains a red strip, the haul comes on one tray with the
flavour line BESIDE the chips. Nothing underneath moved: no payment, number or line of prose.

**Why it matters later:**

- ⛔ **A cropped corner ribbon cannot exist on a card the overflow counter watches.** Cropping IS
  layout overflow; `overflow:clip` does not dodge it (Chrome reports the region anyway) and
  `clip-path` dodges it by eating the element's outer box-shadow. Only LEFT/TOP overflow is free.
  The promotion mark is a corner PLATE for this reason, and the user may overrule it. Full working
  in `.claude/rules/ui-scales.md` §5.
- ⛔ **The chip furniture is shared by three callers** (aftermath, road `evFxChips`, tavern
  receipt), so restyling it must be scoped to `#spoils` and PROVEN by measuring a road card against
  `git show HEAD:` in a second tab. See [[grimtoll-event-card-rules]].
- ⚠ **None of the three typography tokens resolves.** Cinzel, Spectral and JetBrains Mono are named
  in `:root` and are neither installed nor embedded, so the whole build renders in Georgia and
  Consolas. Measured, not guessed. Embedding them is global, needs the font binaries, and the
  user's brief calls it a separate job. **Any mockup comparison has to account for this** or the
  screen will look "wrong" for a reason that is not the screen's.
- ⚑ **The header costs ~130px of card height**, which put the Snare (longest aftermath prose, #180)
  exactly on the 684 ceiling. `#spoils .pcard{gap:var(--p3)}` bought it back.

**How to apply:** driving the aftermath needs `stage()` then a 700ms wait for the practice field to
finish its OWN end screen, then `SIM.on=false` before `afterBattle()`, or `simResult` renders over
the top of it. See [[grimtoll-parallel-sessions]] for the desk this was built on.
