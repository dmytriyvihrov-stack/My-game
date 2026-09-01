---
name: grimtoll-194-map-clarity
description: "#194 (8f.216) the four world-map asks - LANDED on main and DEPLOYED 2026-08-19 with #192 and #193; walked nodes lit, legend deleted, clan wedding made a node, day hover off"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6a996f9b-38a9-409c-9c0a-e7a13fa99f4e
  modified: 2026-08-19T08:19:08.856Z
---

Four asks in one batch, 2026-08-19. **LANDED on main (`23368ea`) and DEPLOYED
(`35227a4`)** in the same day's landing pass, together with #192 and #193. Live
build verified at the share link: 26 nodes, `wed` present, 56 item icons, `LINT`
0, map counters 0/0/0. All four desks retired, no worktrees left.

⛔ **THE LANDING PASS FOUND THE REAL DEADLOCK IN THE CLAIM STORE, AND IT IS
WORTH KNOWING BEFORE IT BITES AGAIN.** #193 shipped WITHOUT its `docs/
CHANGELOG.md` row. `Sweep-SpentClaims` reads `git show main:docs/CHANGELOG.md`,
so a claim only clears itself once its row is COMMITTED - and the pre-commit
guard refuses any commit whose diff cites a number another session holds. So the
commit that would free the claim is the commit the claim blocks. `release` only
touches your OWN claims (by design) and `-Steal` is locks-only. ⚡ **The way out
is the sweep's own convention**: move `.grimtoll/claims/<n>.claim` to
`.grimtoll/freed/<n>.claim.stale-shipped`, which is exactly what the sweep does
and is recoverable. Only do it when the work really has shipped and the holding
session is gone. ⚑ **And write the missing row first** - #194's own claims swept
themselves automatically at deploy, which is the mechanism working.
See [[grimtoll-parallel-sessions]].

**What shipped**

1. **A walked node stays lit.** `.node.done` .45 -> **opacity 1**, ring in the
   walked road's own `#8a7d63`, `filter:saturate(.45) brightness(1.05)`, no
   glow, no `nodebeat`. `.node.mark.done` follows.
2. **`.mlegend` deleted** (build + CSS). `.mlegend` deliberately KEPT in
   drawNodes' sweep selector - it is the only thing that can remove a strip left
   by a stale DOM.
3. **The clan wedding is a node**, `wed` at **(806,310)**, `hire -> wed ->
   mother`, out of `FLOATING`, added to LINT 8a's spine list. Runs went 19-23
   days to **20-24**.
4. **`WTIPS.day` deleted from the table** (not just unbound) + `cursor:help` off
   `#wPlaque`.

**⛔ The map's three counters can all read ZERO while a road runs through a
painting.** `labelViolations()` scores a road's price LABEL against plates and
art; **nothing scores the CURVE**. The build already knew - `EDGES`' sixth
element is a vertical bow whose only user is `dead->snare`, patched by eye and
never turned into a check. The check is now written into
`.claude/rules/world-map-sights.md` and was **proved by making it fire** on the
rejected layout, then restored. A check that has only ever returned `[]` is
indistinguishable from a broken one.

**⛔ The first corridor cannot take a node between the dogs and the muster, and
it is arithmetic.** `camp1`(668,322) to `hire`(782,200) is 167px against
`MAP_MIN_GAP` 90, so anything between lands 83px from each. The plate rule needs
**dx>=110 OR dy>=79** per pair, and there are only 114px of x to spend, so one
hop uses it and the other must find 79px of y in a 122px drop. Every solution
sits under the muster-to-fen road unless The Muster Field moves ~80px. The three
options went to the user with those numbers; he chose "nothing else moves".

**⛔ The preview server on 8777 was ANOTHER SESSION'S, serving the main repo, and
reported my own edits missing.** `preview_start` said "started successfully on
8777" while their listener already had it. Caught by md5-ing the served bytes
against both trees, not by reading the page. ⚑ **A desk session should drive the
build over `file://` in eyes.py's headless Chrome** (`tools/playtest/eyes.py
launch --port N --profile DIR --url file:///...`) - own profile, own origin, real
screenshots, and it cannot be confused about which tree it is looking at. See
[[grimtoll-qa-workflow]].

⚠ **The wedding shows 3 doors, not 4, to a company with a ratkin or an ogre** -
the walk-away is gone. That is `dropDeadExits` working as written (a free race
door dominates a walk-away, and this card is that rule's named worked example);
proved byte-identical against a `git show HEAD:` baseline. Making the card
mandatory only means everybody now meets it.
