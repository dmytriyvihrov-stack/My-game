---
name: grimtoll-202-runthrough-player-build
description: "#202 (8f.224), 2026-08-19: the full-act run-through, five small fixes, and the PLAYTESTER BUILD with no dev mode - LANDED ON MAIN AND LIVE at /My-game/play/ (deploy.ps1 -Player / -Branch, play/index.html). Lessons: a check two rule files cite may not exist in LINT; the real typefaces (#189) broke boxes measured around the fallbacks; PowerShell params are case-insensitive with script vars; a branch deploy is not a live link and the user WILL try the URL"
metadata:
  type: project
  originSessionId: 5b2a5f55-13bd-49a9-afef-09fea4f268f0
  modified: 2026-08-19T12:58:20.703Z
---

**The ask (2026-08-19):** "run game, check how it works, what is in the backlog - what is actual.
If you find smaller bugs - fix it immideatly ... update all dox (also clean what to test) ...
prepare build and deploy in safe folder/place for my buddy platester - actual build without
dev.mode", then mid-turn: "do it with dev mode in the end after smaller things fixes and only for
tempr brunch". Read as: the dev-mode-stripping build is the LAST step, and everything goes on a
temporary branch, main untouched. ⚠ That second sentence is ambiguous ("with dev mode" could mean
keep it); the branch carries BOTH pages (root `index.html` with the cog, `play/index.html` without),
so either reading is served. **If he says he wanted the buddy build WITH the cog, the answer is the
root page, not a rebuild.**

## Where it is

- **ON MAIN AND LIVE.** Built on branch `work/playtest-build` (the user's "only for tempr brunch"),
  then merged fast-forward into `main` at `be9bea3` when he came back with *"link for a playtest
  doesnt work yet"*. Both pages verified by loading the real URLs:
  **`/My-game/`** = his build, cog present · **`/My-game/play/`** = the playtester build, marker
  present, cog absent, boots into the brawl.
- ⛔ **THE LESSON HE PAID FOR: A BRANCH DEPLOY IS NOT A LINK.** `deploy.ps1 -Branch` pushes the
  branch and says so in yellow, and I said so in the report, and he still tried the URL within the
  hour, because *"the build is ready"* and *"the build is reachable"* are the same sentence from
  the outside. **When the deliverable is a link, finish on main or say the link does not exist
  yet in the first line, not the last.**
- ⚠ **A byte-count difference between the local build and the served file is CRLF, not a stale
  deploy**: git `text=auto` normalises, so the live page is ~38 KB smaller on a 14 MB prototype.
  Check the marker, not the size.
- **Local safe copy** (outside Google Drive): `C:\Users\USER\grimtoll-playtest-build\` with
  `index.html` + `icons\` + `READ_ME.txt`, for sending as a file rather than a link.
- The prototype lock was released; the sweep took `8f.224` once it was on main. `#202` is still
  listed as held and that is harmless (the floor comes from the repo scan, so it cannot be
  re-issued).

## What the run found (all fixed on the branch)

⛔ **#189 put the real typefaces under boxes measured around the fallbacks, and #200 measured the
sheet before the faces landed.** JetBrains Mono is exactly 6px a glyph at 10px (canvas-measured,
Consolas was 5.5): `ROLE{}` had three 13-14 char entries cut mid-word on both the sheet and the
battle card (GUARDS ALLIES on the Captain's own HOLD THE LINE). Capped at 12 (`GUARD ALLIES` ·
`TURN IT AWAY` · `HIT ALL NEAR`), tracking 0, **LINT 14** holds it. Spectral at 12px is 16px of
content in a 14.4 box: the sheet's four stat tells and the battle nick lost their descenders; fixed
with `padding-bottom:var(--p1);margin-bottom:calc(var(--p1) * -1)` because `#iChar` is 678/678
with no slack (the pair is the right tool ONLY when the box may not grow).

⛔ **"LINT 6f" was cited by `.claude/rules/event-cards.md` AND a code comment and DID NOT EXIST in
`LINT()`.** Meanwhile the mercy screen shipped two rows typing their receipt plus the mood echo
("+5 salvage +30 crowns · quietly approved of"; the killing door paid −14 and wore the ±2 phrase)
and the cub screen three - neither table is EVENTS or CAMPS, so every sweep missed them. 6f is real
now (figures, the five mood phrases, "needs a ratkin" on a needRace door) over EVENTS + CAMPS +
`MERCY.opts`, and both pickers render `choiceNote(o)`; `takeMercy` pays found crowns through
`lootMul()`. ⚑ **A check a document says exists is a CLAIM about the build. Seed a bad row and
watch it fire before believing it.**

Five `needRace` doors said "needs a ratkin/ogre" beside a company that had one (filtered doors
cannot also say they need the race). `c:''`.

## The player build

`tools\build_site.ps1 -Player -Out play\index.html`: exactly two asserted replacements - `const
TEST={on:false};/*__PLAYER_BUILD__*/` for the `gt_test` read, and the `#testBtn` `<button>` deleted
(every handler is null-guarded; `syncTest` returns on a missing button). `deploy.ps1 -Player`
builds it beside the root page and `Check-Page` reads BOTH back (cues ≥11, art ≥100, the webp
ground, and marker/cog in OPPOSITE states). `deploy.ps1 -Branch` allows a work-branch deploy, pushes
that branch with `-u`, and prints in yellow that the live link is unchanged (Pages serves main/(root)
only). `play/index.html` is `merge=ours` + `-diff linguist-generated` like its sibling.

⚠ **PowerShell trap:** `[switch] $Branch` collided with the script's existing `$branch` variable -
variables are case-insensitive, so the string assignment threw a SwitchParameter conversion error.
Renamed the internal one `$curBranch`. **Read the existing variable names before adding a param.**

## Tooling notes worth keeping

- `javascript_tool` times out at 30s: drive long flows with a background ticker that writes
  `window.__res` and poll it. A driver that clicks `button[last]` on the aftermath opens the SHEET
  (the ✦ "spend it on the sheet" door) - match the button text.
- `WHAT_TO_TEST.md` third cut: keeps 2026-08-17 onward; everything earlier is
  `git show 1d2e1b3:docs/WHAT_TO_TEST.md`.
- An `EPERM rename` from the Edit tool on the prototype is Google Drive holding the file; retry once.

Related: [[grimtoll-share-link]] · [[grimtoll-parallel-sessions]] · [[grimtoll-200-company-sheet-round-four]] ·
[[grimtoll-189-fonts-and-scrolling]] · [[grimtoll-event-card-rules]].
