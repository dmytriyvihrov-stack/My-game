---
name: grimtoll-189-fonts-and-scrolling
description: "#189 (8f.209) the three typefaces were never in the build, and no card screen scrolls - COMMITTED on work/fonts 2026-08-18, NOT landed"
metadata: 
  node_type: memory
  type: project
  originSessionId: 54a12711-11fa-45c1-9454-2afa70a2bd89
  modified: 2026-08-18T13:16:45.734Z
---

**#189 / 8f.209, committed on `work/fonts` (31c318d), NOT merged** - `branch.ps1 done fonts`
refused because session 30ce8845 had uncommitted prototype work on the main desk. A
`git merge-tree` dry run against main was **clean, no conflicts**, so it lands as soon as their
tree is committed.

**⛔ THE THREE TYPEFACES WERE NEVER IN THE BUILD.** `:root` has named Cinzel, Spectral and
JetBrains Mono since the first slice; measured 2026-08-18, all three fell straight through to
**Palatino Linotype, Georgia and Consolas**. Every screenshot this project has ever taken is of
the fallbacks, and that is what the user was praising when he asked for the fonts to be
"connected". ⚠ **`document.fonts.check()` is useless for this** - it answers `true` for any family
name that has a fallback. Use a canvas width probe: measure `"X",serif` against `serif` AND
`"X",monospace` against `monospace`; if both match their base, the family is absent.

- ⚑ **The face list is measured, not counted.** `font-weight:` in the stylesheet argues for twelve
  faces; walking the ten screens and recording each element's computed (family, weight, style)
  gives **eight triples**. 860KB → 648KB. `art/fonts/build_fonts.py --fetch` + `art/inject_fonts.ps1`
  on the `/*__FONT_DATA__*/` markers, same shape as the paintings. ⛔ Never a `<link>`/`@import`.
- ⚠ **The bill is metrics**: real Cinzel is **16% wider** than Palatino, real JetBrains Mono **9%**
  wider than Consolas, Spectral vs Georgia is a wash. Re-measure any box comment that was written
  against the old fallback - #187's role-line tracking had to be redone within a day.
- ⚠ **`font-display:swap` means anything measuring its own text measures the FALLBACK.** Re-run
  after `document.fonts.ready`.

**⛔ #150's PHANTOM SCROLLBAR WAS SCOPED TO `#prologue` AND LEFT EVERYWHERE ELSE FOR FIVE MONTHS.**
`.popts` bottom padding is `--p7` and `.pcard`'s was `--p6`: 8px of overflow that does not exist.
⚑ **Invisible on overlay scrollbars (including every headless measurement this project takes) and
a full-height thumb plus 15px of stolen width on classic Windows chrome** - which is why five
months of probing never saw it and the user photographed it immediately. **The invariant is
`scrollHeight - clientHeight === 0`, never "can I see a scrollbar".**

**⛔ A FLEX ITEM GIVEN `overflow:auto` HAS `min-height:auto` OF ZERO.** Capping the aftermath's
prose box let the card's own overflow shrink a 165px story to 0px silently. `.abtop` is
`flex:0 0 auto` now. Related: [[grimtoll-187-aftermath-screen]], [[grimtoll-parallel-sessions]].
