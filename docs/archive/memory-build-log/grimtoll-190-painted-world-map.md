---
name: grimtoll-190-painted-world-map
description: "#190 (8f.210) the world map's ground is a painting - SHIPPED + DEPLOYED 2026-08-18; the node layer was coloured for a dark ground, and a working fallback makes a missing asset silent"
metadata:
  type: project
---

The world map's terrain is a painted webp drawn inside `drawMap()` directly before
`EDGES.forEach`. `NODES`, `EDGES`, `drawNodes()`, `#wToken`, `WCAM` and the pan/zoom
are untouched. The procedural terrain stays as the fallback.

⛔ **A LAYER WITH A WORKING FALLBACK HAS A SILENT FAILURE MODE, AND THAT IS THE WHOLE
LESSON.** The brief said to load `art/world-map-backgrounds/*.webp` by path. The
published build is one `index.html` at the repo root, where `../art/...` resolves
ABOVE the repo: it loads at the desk over `serve.ps1` and 404s on the host - and
because the procedural ground draws instead, nothing looks broken. `build_assets.ps1`
now has a webp pass that **reads the wanted key out of the prototype** (`WORLD_BG.<key>`)
so the two cannot drift, throws if the folder or key is missing, and embeds ONLY the
ground in use. `deploy.ps1` asserts `data:image/webp;base64,` **by name**, because
every other missing picture leaves a hole somebody reports.

⚡ **THE CONTRAST COMPLAINT WAS A FACT ABOUT THE GROUND, NOT ABOUT THE PLATES.** The
node layer is plate text `201,185,143` on a 74% near-black wash, chosen against the
old dark map. Measured over the SAME 23 name plates in one run: old ground median
luminance **48**, painting **119**, 36.8% of it over 140. So the GROUND is corrected:
`WORLD_MAP_DIM=.45` lands it on 31/53/92 against the old map's 32/48/78. ⚑ **Pick the
dim by measuring the old ground, not by taste** - and a luminance curve buys nothing a
single alpha does not across this image's range.

⛔ **A LABEL CAN BE DRAWN CORRECTLY AND STILL BE NO LABEL.** `THE GRAUSEN VALLEY` had
594 pixels of its exact `#5f553e` on the canvas and was invisible: it is the dimmest of
the three region names *on purpose*, and a sunlit valley floor is the brightest part of
the map, so it sat at luminance 85 on a ground of 75. Fixed with **three stacked shadow
passes** (a canvas shadow is drawn per fill; one pass moved the ground only 75→68), which
keeps every authored colour and the whole ladder. See [[grimtoll-event-card-rules]] for
the same "derive it, do not re-author it" instinct.

⚠ **AN EXACT-COLOUR PIXEL PROBE UNDER-COUNTS ANTIALIASED TEXT AND WILL LIE TO YOU.** It
read 0 matching pixels for two labels that were plainly on screen; one pass of AA text
never reaches full glyph coverage. A manual second fill over the same text produced the
exact colour and proved the code was right. **Measure luminance ranges, not exact hits.**

⚠ Pre-existing, not from this entry: `#wCanvas` is a 1280x638 backing store in a 1280x678
box, so the whole canvas layer carries a **6.3% vertical stretch**. Roads and nodes live
in the same space so nothing misaligns, but a painted landscape shows it. Re-export at
1280x678 to remove it.

⚑ Landed together with #188 and #189 off three desks; the fonts merge had a **semantic
conflict git could not see** - this branch had authored a sixth copy of the exact canvas
font stack #189 was deleting five of. See [[grimtoll-parallel-sessions]].
