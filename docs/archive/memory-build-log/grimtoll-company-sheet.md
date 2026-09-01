---
name: grimtoll-company-sheet
description: "#133 the company sheet reshaped to one screen, 2026-08-13: stats first, the doll as the gear map, skills as the battle's cards, perks in a tab"
metadata: 
  node_type: memory
  type: project
  originSessionId: f2551fa4-04a3-460c-8934-5eaecb1f36e8
  modified: 2026-08-13T07:04:36.713Z
---

**#133, SHIPPED 2026-08-13 (8f.161)**, the 🎒 company surface of [[grimtoll-clarity-pass]]. The
user's brief was a voice note over five reference screenshots (Urtuk, Battle Brothers, Caves of
Qud, Wartales, Wildermyth), opening *"too much information and not clear whic one is important and
what means what"*.

⚑ **The finding that decided the design, and it came from measuring rather than from taste:** a
level-4 body with two scars, a change and banked points rendered **1241px of sheet in a 678px
window, 564 words**, with the SKILLS block alone spending 230 re-typing what the battle's hover
already says and the four stats sitting ~520px down, UNDER the prose. **The complaint was not that
the sheet was ugly. It was that the sheet's ORDER argued the history mattered most and the numbers
least.** Shipped at **678px, no scroll, 242 words**.

**What each reference actually bought** (worth keeping, because he picks references precisely):
Urtuk = one screen, no scroll · Battle Brothers = compactness and TABS instead of a longer column ·
Caves of Qud = the doll IS the gear map, slots beside the part they hang on and wired to it ·
Wartales = the attributes as one banded block · **Wildermyth = a piece of kit states what it
CHANGES (▲▼), which is the literal answer to "which one is important"**.

**Load-bearing implementation facts:** `drawDoll` is parametric (`DOLLBODY{}`, one anatomy with a
per-race row, so `partOf`'s keys exist for every race) and **exports `cv._anchor`, the joints it
actually drew** - a leader pointing at a hardcoded coordinate lies the moment the ogre is wider
than the human. `.iact` is `.act` re-cut for parchment, NOT the class itself. `ITAB` lives outside
`drawInv` because buying a perk redraws the sheet.

⏸ **The bags are PARKED on his ruling**: he floated one or two bag slots for throwables, and the
game has no throwable and no mid-fight swap rule, so a bag today is furniture. It returns WITH its
rule or not at all. ⚠ **Open remainder**: the fold rule (`#iBody{height:232px}` plus a `.pv`
colour) is unapplied, so a body carrying every kind of mark at once still scrolls 65px - see
[[grimtoll-expired-lock-is-not-free]] for why it was left.

Pictures: `shots/133_company_sheet.html` is the design template that was approved, and
`shots/133_company_sheet_built.html` is the shipped screen with both tabs.
