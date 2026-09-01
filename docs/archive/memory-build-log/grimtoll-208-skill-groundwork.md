---
name: grimtoll-208-skill-groundwork
description: "#208 (8f.231) skill groundwork LANDED in prototype 2026-08-20, not committed; the skill-tree design bench is tools/skilltree_lab.html; DISENGAGE may not leave the basic set until the tree ships"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0986b7da-60bb-419a-9d48-a718241e6a2e
  modified: 2026-08-20T13:49:45.227Z
---

#208 / build 8f.231, 2026-08-20. Three battle changes landed in the prototype (uncommitted, this
session holds the claim.ps1 lock): captain's HOLD THE LINE costs 1 and is his starter; COMMAND
gates on `(p.level||1)>=3` inside `unitFrom()` and unlocks itself at level 3; SPEAR WALL cannot be
RAISED in a scrum via `wallBlocked()` beside `wallLive()`, refused in `canUse()`, reason painted in
the card receipt ("NO ROOM: SOMETHING IS ALREADY INSIDE YOUR REACH"), bracewall exempt.

**Why:** the user is designing the SKILL TREE in `tools/skilltree_lab.html` (two tabs: reference
trees fetched from wikis, and the Grimtoll draft). These three rulings were the subset the battle
could already express.

**How to apply:**
- ⛔ **DISENGAGE stays a basic action until the general-skill tree exists in the game.** The user's
  ruling moves it to the tree (drafted as GEN18, 2-hex step); pulling it from the basic set first
  soft-locks every scrum ([[grimtoll-battle-clock]] era ZoC economy: #72, #111, #137).
- The lab's skill codes are AUTHORED and stable (CAP1, GEN18...); deletions leave gaps (GEN3
  PATHFINDER, GEN6 TACTICIAN deleted by ruling). Never renumber.
- Tree shape as ruled: level-0 class door IS the weapon mastery (brute = club and axe) and grants
  the starter active; class skills granted FREE at 3 and 6; level-9 class skill is bought and
  carries a downside; armor mastery one-of-three at 5; capstone at 10 (multiclass or mastery);
  battle-mage and bard locked at 9; class skills work only with the class weapon in hand (grey +
  hover reason, mechanic demoed in the lab).
- ⚠ `wallLive()` never threw outside battle only because `u.spearwall` early-outs before `alive()`
  reads `B.units`; B is NULL between fights. Any new predicate touching `alive()` guards `!B`.
- ⚠ **claim.ps1 cannot see a number that never landed in committed docs**: it issued #207 twice
  though [[grimtoll-207-event-and-hover-books]] spent it (that session's docs never landed). This
  session holds #207 as a FENCE and shipped as #208. If a claim collides with delivered-but-
  unlanded work, fence the number and take the next.
