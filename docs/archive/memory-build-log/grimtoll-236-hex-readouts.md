---
name: grimtoll-236-hex-readouts
description: "#236 (8f.259) + #237 (8f.260) - LANDED + DEPLOYED 2026-08-22. The damage figure off the body, the bar's min/max band, the new world map and a SECOND map art table for permanent places. An ask can make a PREVIOUS entry's stated trade-off wrong; and the parallel session was real, the user just could not see it"
metadata: 
  node_type: memory
  type: project
  originSessionId: c4dfe134-ab6c-4102-b50f-704fcd6861ae
  modified: 2026-08-22T10:33:05.723Z
---

**LANDED + DEPLOYED 2026-08-22, head `1196d68`**, live at
`https://dmytriyvihrov-stack.github.io/My-game/` and `/play/`. Two entries: **#236 (8f.259)** off
desk `work/hitodds`, and **#237 (8f.260)**, the world map and the painted places.

## ⛔ THE PARALLEL SESSION WAS REAL AND THE USER COULD NOT SEE IT, AND THAT IS THE PROCEDURE NOTE

Half of this session's asks (the new global map, the four missing map icons) were ALREADY being
built, uncommitted, in the MAIN desk by `battle-rothers-taletop-e3` - found by `git status` before
touching anything, not by anybody saying so. I dropped those two asks and messaged the session.
**The user's answer was `"i actually don't see that session. I could be old gpt... So i take it and
do yourself"`** - and `ListAgents` went on listing it, and it went on writing marketing art for
another twenty minutes.

⛑ **So the rule is not "ask the user whether another session is live", it is `git status` plus
`ListAgents`, and then take the work over CAREFULLY.** What made the takeover safe:

- **the hunk ranges were compared before merging** (`git diff -U0` on both sides, closest approach
  **124 lines**), so the clean merge was predicted rather than hoped for;
- **their work was DRIVEN in the running build before it was committed**, not taken on trust - which
  is how the unpainted Last Muster was found, one abstract glyph among 27 paintings;
- **their marketing files went into their own labelled commits**, because `deploy.ps1` runs
  `git add -A` and would otherwise have swept a half-written folder into a game commit.

See [[grimtoll-parallel-sessions]] and [[grimtoll-225-landing-live-lock]].

## What shipped on the branch

Seven asks in one session: `.hdmg` deleted and `.hodds` moved into its slot (y 6.5 -> **16.5**,
over the chest not the head) on every foe in reach; the bar's damage band split into a **solid
minimum + a hatched window up to the maximum**; the gear hover gained `TIER · WHERE IT BELONGS`
(TWO HANDS included); no epic armour and no `spellRange` stave can be FOUND until the road is past
`clash`; Marrow starts with an empty off hand.

## ⛔ THE ONE THAT IS WORTH CARRYING: AN ASK CAN MAKE A PREVIOUS ENTRY'S STATED TRADE WRONG

#234 drew the MAX alone on the bar **and wrote its reason down**: *"at 26px a two-shade min/max
split is 1px a shade, i.e. a smudge; the exact pair is on the hex two rows above."* Ask 1 of this
session deleted the thing the second half of that sentence pointed at. **So the trade did not go
stale quietly - it was inverted by an unrelated ask one day later**, and the only reason anybody
noticed is that #234's comment named its own dependency instead of just asserting the conclusion.

⚑ **The general rule: when an ask deletes a readout, grep the comments of whatever ELSE says the
same fact.** A comment that says *"the exact figure is over there"* is a load-bearing reference,
and deleting "over there" is a silent regression everywhere that sentence is true.

⚠ **And the fix was a TEXTURE rather than a second shade, which is #234's own measurement turned
round**: two brightnesses 1px apart are unreadable, 45deg stripes at 1px of row height are not.
⛔ **The period is 2px and the first cut was 3, and ONLY THE PICTURE SAID SO.** The window is the
width of one die - 5 hitpoints of a 23-point bar, 5.6 design px - so a 3px period held ONE stripe
and read as a smudge with a diagonal edge. Two probes said the geometry was exact. Same shape as
#234's own damage band being drawn in the wrong direction: see [[grimtoll-session-toolkit]].

## ⚠ A STALL FOUND ONCE IN 32 RUNS IS A BACKLOG ENTRY, NOT A FIX

The eight-fight regression returned `clash: 1rd DRAW/STALL HIT GUARD` on its first pass. n=15 on
this build and n=15 on a `git show HEAD:` baseline in a second browser came back **30/30 clean,
mean 4.2 rounds**. So: not a regression, not this entry's, and **not nothing** - a one-round draw
in BLOOD ON THE ROAD is a soft lock in the fourth node of the game. It is in
`00_PLAN_AND_BACKLOG.md` with the instrument named (`runFight` already returns `guard`; it wants a
seeded n>=200 loop with `B.order` dumped on the failing run).

⚑ **The technique that made that call cheap is the second browser**, and it is three commands:
`git show HEAD:prototype/grimtoll_slice.html > prototype/_head_baseline.html`, then
`gt.py launch --url prototype/_head_baseline.html --port 9899`, then the same probe with
`--port 9899 --url prototype/_head_baseline.html`. ⚠ **`--url` is a path relative to the worktree,
never a `file://` URL** - passing a full URL builds `file:///<root>/file:/C:/...` and the connection
refuses with a message that reads like the browser died.

## Two traps that cost time and will again

- ⚠ **`gt.py shot --setup` does NOT prepend `probes/lib.js`**, so a setup probe using `GT` throws
  `GT is not defined` on a freshly launched page. Run the same probe through `gt.py eval` once
  first, then shoot.
- ⚠ **A setup that calls `startBattle` re-rolls the ground and the camera**, so the clip box
  measured on run 1 frames something else on run 2. Guard it: `if(!window.__gt236){startBattle(...)}`.
  That cost two wrong pictures. `probes/handshot.js` carries the fix.
- ⚠ **`"\ud83e\uddf0"` in a Python patch anchor is two lone surrogates, not the emoji**, so the
  anchor matches nothing and `safeedit` refuses the whole file. Anchor on the WORDS beside an emoji,
  never on the emoji. Same family as #191's lost prototype - see [[grimtoll-safe-file-patching]].

Related: [[grimtoll-234-battle-and-sheet-batch]], [[grimtoll-event-card-rules]],
[[grimtoll-measuring-the-running-build]].
