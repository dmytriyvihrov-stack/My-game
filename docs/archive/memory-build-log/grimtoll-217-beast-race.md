---
name: grimtoll-217-beast-race
description: "#217 (8f.240): a beast is a race of its own, dogs stop being ratkin. COMMITTED on desk work/beast-race, stacked on work/mirror-battle, NOT landed"
metadata: 
  node_type: memory
  type: project
  originSessionId: 17f399e3-091f-421f-a3cd-557fd0d909c9
  modified: 2026-08-21T10:26:02.121Z
---

**#217 / 8f.240, 2026-08-21. Committed as `a6a2fdb` on desk `work/beast-race`, which is STACKED
on `work/mirror-battle` (#215) at the user's call, NOT on main.** It lands only after #215 does.
Worktree: `.claude/worktrees/strange-jennings-b10f17` (a `.claude/worktrees` desk, which
[[grimtoll-land-blind-spots]] says `branch.ps1 land` cannot see - enumerate `git worktree list`).

## The lesson: the last branch of a derived field is a DEFAULT, so it catches whatever nobody named

`build()` derived a unit's race with `... :t.kind==='wyrm'||t.kind==='cub'?'beast':'ratkin'`.
Everything unnamed fell into 'ratkin', so **every dog in the game shipped as ratkin**. #215 fixed
the DISPLAY and left the data, reporting three readers (swarm, AI weights, barks). **There were
five, and the two nobody counted were STATS:**

- **stride**: `speed:RACESTEP[rc]||Math.max(2,t.speed)`, so the Runt's authored **6** was clipped
  to **5** - under a comment three lines above that says *"Monsters are not a race and keep their
  authored speeds."* The comment stated the rule and the code did the opposite.
- **dodge**: `raceKey` returned 'ratkin', so every dog drew a silent **+5** off `RACEDODGE`.

⚑ **The fix was one word: read `BEAST_KIND`**, the array #215 had already hoisted out of that same
function for "who gets a personality". One list, three readers now. See [[grimtoll-215-mirror-battle]].

⛔ **And two of the three reported readers needed NOTHING, which only reading the branch could
say.** `bark()` gates on `u.monster`, never race. `doctrine()` returns EARLY on `u.kind==='dog'`
and every use of `const rat=u.race==='ratkin'` sits behind `on&&`, so `rat` is computed for a dog
and applied on neither path. A grep says "three readers"; the branch says one.

## What was decided, and the numbers

- **swarm KEPT**, moved to `FORM.swarmRaces=['ratkin','beast']`. It had been **two hardcoded
  `'ratkin'` literals** - the rule in `hitBreakdown` and the **≋ badge the hex draws** - which is
  #102's wrong-unit bug waiting to happen.
- **dodge points MOVED, not deleted**: +5 onto each dog's authored `dodge` (24->29, 26->31,
  28->33, 25->30), so the shipped number did not change. A blanket `RACEDODGE.beast:+5` was
  refused: it would have handed 5 points to the Fen-Mother, the cub and both mirehares.
- **Measured, 200 seeded `runFight('pack')` runs: 200/200 won before and after.** Forcing the Runt
  back to 5 reproduces the baseline EXACTLY (5.79 rounds, 1.02 down, same swarm count to the
  strike), which isolates the entire behavioural delta to that one number: **+0.3 rounds, 200-run
  worst case 3 bodies down instead of 2.**

⚠ **The first probe reported the swarm at 0% on a build where it was firing normally**, because
the measuring script hardcoded `'ratkin'` in exactly the way the two call sites did. **The
instrument had the same bug as the thing it was measuring.**

⚑ **`sfxStrike` was dragged in and it was already broken.** Its body picker named `cub` and leaned
on dogs arriving as 'ratkin', so an honest race would have dropped a dog onto **`hit_human`**. It
reads `isBeast` now - which also caught that **the mirehares have been landing on `hit_human`
since #193**. ⚠ The Thing in Armour is `race:'unknown'` and still sounds `hit_human`, deliberately:
a sample saying *beast* would answer the question that card exists to refuse.

## The gate that actually earns its keep here

The eight-fight `regress()` list **had never once built a Hold hound** - it is fielded by `chase`
and `hold`, and the mirehares by their own key. **Sweep all fifteen keys `startBattle` dispatches
on**, not the harness's eight: `armour brigand chase circle clash hold mirehares mother pack
slingline snare snarejoin steading tavern wedding`. 55 enemy bodies, 0 warnings.

## Roster tables are roster tables, and 'beast' is in none of them

The user's framing: *"we can put independent race 'monters' - with differnt stats"* and *"but
monsters doesnt have 'class' like humanoids"*. `RACESTEP`, `WAGE`, `COST`, `XP_RACE`,
`RACEPORTRAIT`, `DOLLBODY`, `RACESKILL` are all roster tables. **A monster's numbers live on its
own statblock** - that is what makes per-creature variety possible, and it is why the dodge points
went onto the rows rather than into a table.
