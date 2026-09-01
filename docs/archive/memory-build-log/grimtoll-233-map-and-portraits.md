---
name: grimtoll-233-map-and-portraits
description: "#233 the new world map + seven repainted portraits - LANDED + DEPLOYED 2026-08-22 (8f.256). New art was the ONLY fix for a blur #223 had already measured and given up on; and a deploy that runs `git add -A` will sweep an unbuilt asset into the commit"
metadata:
  type: project
---

**#233 landed and deployed 2026-08-22 (8f.256, `1f918bc`).** A new world map
(`art/world-map-backgrounds/world-map-illustrated.webp`) and seven repainted portraits from
`art/src/stage-2/portrait-refresh-2026-08-22/`.

⛑ **THE MAP IS 2560x1276 AND THAT NUMBER IS THE WHOLE ENTRY.** #223 measured the "blurry" complaint,
found the sources were 1280x638 against a 2x canvas store, and wrote down that it could not be fixed
in code: *"only new art moves that number."* This is that art, and it is a **1:1 pixel match to the
backing store**, so the NEAR camera stop is a downscale for the first time. ⚑ **`build_assets.ps1`
needed no change at all** - the world-map path embeds the chosen file **verbatim** and reads which
key to take **out of the prototype**, so a 4x-larger source just goes in. **A pipeline written to
be indifferent to size paid for itself two entries later.**

⛔ **A DEPLOY THAT RUNS `git add -A` WILL SWEEP AN UNBUILT ASSET INTO THE COMMIT.** The new map was
sitting in the working tree, modified, embedded nowhere - source 1.27MB, embedded payload still the
old 307KB. `deploy.ps1` step 4 is `git add -A`, so deploying #232 would have committed a source that
disagreed with the shipped page and said nothing. **`git stash push -- <path>` before the deploy and
`git stash pop` after** is the whole fix. ⚑ **The way to catch it is to decode the embedded payload
and compare it to the file on disk**, which is [[grimtoll-230-stat-icons]]'s rule on a second
surface: `re.search` the base64 out of the built page, `base64.b64decode`, byte-compare. 12 of 12.

⚑ **RE-MEASURE A TUNED CONSTANT WHEN THE THING IT WAS TUNED AGAINST IS REPLACED.** `WORLD_MAP_DIM`
was fitted by #223 to the OLD painting. The new one under the same filter reads **p10 22 / median 46
/ p90 84, spread 62** against that entry's recorded 27 / 61 / 96 - darker at every quantile, and
**closer to the median 48 the name plates were designed against** ([[grimtoll-190-painted-world-map]]).
So the filter STANDS, and that is a finding rather than an omission. ⚠ **What the number cannot see
is business**: the new painting is far more detailed and the plates now sit over trees rather than a
wash. Flagged to him; the lever there is the plate backing, not the dim.

⚑ **AN ART HANDOFF WITH HARD GUARDS IS CHECKED, NOT TRUSTED.** The brief named Asha (`POR-10`) and
two retired portraits as untouchable, so their built `.jpg`s were md5-hashed **before** the rebuild
and compared after: byte-identical. All seven new outputs asserted at exactly 220x220. **The brief
also asked for a visual check at the small crop** - a contact sheet of the seven at 220 / 94 / 48 on
the sheet's own ground answers it in one picture.

⚠ `art/src` is **gitignored**, so the portrait MASTERS are not in the repo - only the base64 in the
prototype and the two built pages. `art/world-map-backgrounds/` is NOT under `art/src` and the webp
does get committed. See [[grimtoll-share-link]].
