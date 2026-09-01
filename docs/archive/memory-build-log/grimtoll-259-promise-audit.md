---
name: grimtoll-259-promise-audit
description: "#259 + #260 (8f.284, 8f.285) LANDED in prototype 2026-08-27, uncommitted; the perk/stat audit came back clean, the class PICKER lied; luck-type perks must go in effStats not unitFrom"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0986b7da-60bb-419a-9d48-a718241e6a2e
  modified: 2026-08-27T13:12:55.295Z
---

#259 / 8f.284 and #260 / 8f.285, 2026-08-27, in the prototype, **not committed**.

**The audit (user: "double check that stats and skills actually give what they promise").**
Came back clean where the numbers live: all 26 perks are READ by the engine, every build-time
figure matches its own text to the digit, and `STATLADDER` pays exactly what it prints on all
nine rungs (0 mismatches, `thews` == ladder, `D.hit` == GIVEN+ladder).

⛔ **What lied was `CLASSES[k].sig`, the one player-facing string describing a body's acts that
is not derived from them.** Captain sold RALLY THE LINE (act is HOLD THE LINE), archer sold
AIMED SHOT, cutter sold BACKSTAB; the last two were deleted long ago in favour of CRIPPLING SHOT
and DISTRACT. Printed on the class PICKER, i.e. the one screen where the choice is made.
Held now by **LINT 6h** against `unitFrom()`, off a **declared `sigActs`** array.

## How to apply

- ⛔ **A perk that changes a STAT goes in `effStats(p)`, never in `unitFrom`.** `bodyHp(p)`
  re-derives from the roster body, so a rung added at `unitFrom` moves to-hit/dodge/flank/spell
  and leaves HITPOINTS untouched. Measured: right door 66 -> 75 hp, wrong door 66 -> 66 with the
  sheet still claiming the stat rose. This is [[grimtoll-252-stat-is-a-sum]]'s one-sum rule.
- ⛔ **Never parse a promise out of prose.** LINT 6h's first cut read capitalised runs out of
  `sig` and was wrong within the hour: "HOLD THE LINE, AND COMMAND FROM LEVEL 4" yields the
  fragment "AND COMMAND FROM LEVEL". A card may say more than its acts, so no regex can tell a
  promise from a sentence. Declare the claim (`sigActs`).
- ⚠ **`LINT()` RETURNS AN OBJECT** `{findings, byCategory, items}`, not an array. A probe reading
  `.length` off it scores 0 every time: the first attempt to prove 6h reported 0 three times
  running and the INSTRUMENT was the bug, not the check. Read `.findings` / `.items`.
- ⚠ **The prototype is CRLF**: a patch script matching multi-line LF patterns silently MISSes.
  Convert patterns before matching and abort without writing if any hunk misses.
- ⛔ **A perk no class lists is unreachable**: `perkPool` concatenates `CLASSES[cls].perks[tier]`.
  #260's three generals are joined onto every class's tiers 2/4/6 in one loop.
- Only ONE of 20 "spearwoman" occurrences was player-facing (the class name, now **SPEAR**); the
  rest are comments about a PERSON and stay.

## #261 (8f.286) the teardown, same session

The old perk tree is OUT: **25 perks retired to `docs/archive/RETIRED_SKILLS.md`**, generated
from the table with each one's wording, class tier and paying line. Four remain: `luck`,
`disengage`, `shieldwork`, `duelist` (+10 hit / +5 dodge, one adjacent). DISENGAGE is a tier-2
perk, no longer a basic act. Every perk row carries `kind` and the card draws a DERIVED mark
(class glyph via `cIcon`, 👥 for general).

- ⛔ **`threatsAt` READS `B.units`, AND `dodgeOf` IS CALLED BY THE COMPANY SHEET OUTSIDE ANY
  BATTLE.** An unguarded `threatsAt` in `dodgeOf` crashes the sheet. Guard with `B&&`. This is
  the SAME trap as `wallBlocked` one entry earlier, and the page booted clean with `LINT()` 0
  while the crash sat one click away: **drive the screen, do not read the function.**
- ⚠ **`makeParty()` RETURNS an array and does NOT assign `G.party`.** And a failed
  `ARENA.match(comp,kind,...)` leaves `G.party` EMPTY (it does `G.party.length=0` first), so a
  later probe silently reads no bodies. Restore with
  `G.party.length=0; makeParty().forEach(p=>G.party.push(p))`.
- ⚠ `ARENA.match` takes a **COMPS key first** (`four|prepared|swarm|wall|bows`), then the fight.
- ⚠ Retiring a perk needs the roster readers guarded: `p.perks.map(k=>PERKS[k].n)` throws on a
  stale save holding a retired key. Filter first.
- ⏳ Class tiers 6 and 8 are EMPTY until the tree lands; points bank with nothing to buy.

## #262 (8f.287) the tree lands: 28 skills, three lanes

**11 class · 5 race · 12 general**, each row carrying `kind` (drives both the card's mark and the
pool's gate). Eleven were RESTORED from `docs/archive/RETIRED_SKILLS.md` onto engine lines #261
deliberately left standing - a row and a tier each.

- ⛔ **TEACHING THE POOL IS NOT TEACHING THE SHEET.** `perkPool` learned all three lanes and was
  measured correct (ogre spear offered 17); the CARD RENDERER walks `CLASSES[p.cls].perks`
  directly and drew **2**. `perksAt(p,l)` / `tiersFor(p)` are the ONE reader now, called by
  `perkPool`, the card renderer and the class-tree hover.
- ⛔ **A RACE LANE WAS STRUCTURALLY IMPOSSIBLE** before this: `perkPool` only asked about a class,
  so a race skill could never be reached. `RACEPERKS` / `GENPERKS` are the other two lanes.
- ⚠ **`PERKTIERS` is a real ceiling**: a skill authored above it is silently unbuyable. It rose to
  8 for BERSERK.
- ⛑ **A defence that shows in a PREVIEW and pays in a BLOW goes in the shared function.**
  THICK MUSCLES lives inside `arcOn`, not at its two call sites, or `hitBreakdown` and `strike`
  disagree. Swept all six facings: plain +5/+15/+30, perked 0.
- ⛑ Integration check that actually exercises the kill site / wound hook: monkey-patch
  `ARENA.COMPS.prepared` to give every body every perk, then `ARENA.match('prepared','tavern',6)`.
  6/6 at 6.5 rounds vs a 7.0 baseline, no throw.
- ⏳ **Seven lab skills still need new ACTS** and are deliberately absent rather than listed dead:
  ROTATION, TAUNT, MAGIC POTION, SECOND WIND, UNNOTICEABLE, TWO WEAPONS HANDLER, FAR HAND.
- ⚠ **My own repeated slip, three times in one session**: a doc-insert helper that puts text BEFORE
  an anchor must not have that anchor at the END of the inserted text, or the row splices
  (`| **261** || **261** |`). `record.py check` caught it every time.

## #264 (8f.289) race lanes 4/4/4, two columns, and a double-paid perk

Race skills went **1/1/3 to 4/4/4** with **no new engine code**: seven keys whose lines have been
standing since #261 retired only the ROWS (human `standfast`/`fieldmedic`/`waiter`, ratkin
`quickfoot`/`opportune`/`footwork`, ogre `stoneskin`). 35 skills total: 11 class / 12 race / 12 general.

- ⛔ **RESTORING A RETIRED PERK MEANS RESTORING ITS ROW AND NOTHING ELSE.** `armourMax` already read
  `stoneskin` (that is an ENGINE line, and #261 left every engine line alone); I wired it a second
  time and it paid **+20 on a card that says 10**. Caught only by differential (34 -> 54 where 44 was
  wanted) - nothing threw and `LINT()` read 0 with the bug in. **Check whether the line exists before
  wiring one.**
- ⛑ **The name is the race's, the key is the engine's.** `quickfoot` pays a hex whatever it is called;
  renaming the KEY would have thrown the tested line away.
- ⛔ **THE GAME HAS NO THROWABLE.** `slot:'bag'` is a deliberately empty promise (the code says so) and
  the only throw is the ogre's racial PICK UP AND THROW. A throwables-only GOOD HAND would pay nothing
  to anybody but an ogre, so it was NOT changed and the ruling is the user's.
- Two-column perk list = a grid on the CONTAINER (`.pk2`), not `column-count`, which would break a
  card across the fold; headings `grid-column:1/-1`.
- ⛑ A doc-insert helper that inserts BEFORE an anchor now REFUSES when the text ends with that anchor:
  that splice cost three repeats in one session.

**Still lab-only:** the skill tree itself ([[grimtoll-208-skill-groundwork]],
`tools/skilltree_lab.html`). #260 landed its first three general skills (Everchanging Luck,
Break Away, Shieldwork); the doors, the 4/7 grants and the weapon-trained abilities are not built.
