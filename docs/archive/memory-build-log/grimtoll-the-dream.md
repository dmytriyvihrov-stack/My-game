---
name: grimtoll-the-dream
description: "#85 THE DREAM shipped 2026-08-04 - the content request whose premise did not exist in the build; nothing in Grimtoll kills a roster member and lostSoul() is now the register of the three ways somebody is gone"
metadata: 
  node_type: memory
  type: project
  originSessionId: c33281b6-7227-48a9-a950-086962c46df1
  modified: 2026-08-04T14:07:23.185Z
---

**#85 THE DREAM, shipped 2026-08-04, build log 8f.114.** The user's own scene, written out whole in
Russian: somebody from your team is dead, comes into your sleep with the face fallen in and empty
sockets, says you could have saved them, and you cannot get a word out.

⚑ **THE LESSON IS THE ONE THAT COST THE MOST TIME: THE REQUEST'S PREMISE DID NOT EXIST IN THE
BUILD.** Nothing in Grimtoll kills anybody on the roster and it never has. `carryEverybodyOut()`
says *"nobody is lost"*, `afterBattle()` never splices a body, `toBeaten` scars rather than buries,
and WITHDRAW was changed at some point to carry everybody out. **Scars ARE the death system**
(`docs/README.md` §2 + backlog **#34**, the SCARRED → MAIMED chain, ruled by the user but NOT
BUILT). So the card had no corpse. **Check that a content request has a referent in the code before
writing a word of it** - it took reading four aftermath paths to establish, and it changed the
design rather than the prose.

**The answer, chosen by the user when asked:** *"whoever the run has actually lost"*. **`lostSoul()`**
is now the single register of the three states that mean gone, ranked by fault:

- **`cut`** - you cut a returning veteran down at a fire (`openReturner`'s third door). ⚑ **THE ONLY
  REAL CREW DEATH IN THE GAME, AND THE PLAYER COMMITS IT DELIBERATELY.** Nothing recorded it, because
  `done()` splices the record on all three doors; one line (`G.killedOwn=p`) made it a fact.
- **`hole`** - the sinkhole at THE GROUND OPENS still has them (`strandOne`).
- **`sent`** - dismissed and still out there (`G.dismissed`, unresolved only).

**When #34 ships, `lostSoul()` takes a fourth state that outranks all three.** Written into #34's
entry so it is picked up there.

⚑ **`castLost` is a fourth cast gate and the only one that asks about somebody who is NOT at the
fire.** `a` is therefore the one cast in `openCamp` not drawn from `G.party` - which works only
because every use of `pa` downstream was already behind `if(pa)`. **`b` must exclude the leader and
the gone person**, or a company dismissed to one body casts the Captain as the man on watch watching
himself wake up.

⚠ **THE DREAM IS THE ONLY THING THAT CLAIMS ANYBODY IS DEAD, AND NO NARRATION MAY EVER SAY IT FROM
OUTSIDE.** The sinkhole rolls 50% a leg to hand its man back, so a man walking out of the treeline
four days after you buried him in your sleep is the best thing the card can produce. Safe because
an incident id fires **once a run**.

**Shape:** camp incident, not a road node - a dream is not a place you can walk to. The scene has no
reply in it, so **the morning carries the ruling**: say it at the fire (−1 day) · put their share
back in the chest (−30 crowns) · march (free tonight, and **its price is in its own aftermath** -
it comes back on the fourth night - rather than in a sequel card).

⚠ **It also closed a pre-existing save bug of exactly #38's shape: `G.stranded` had never been
written to the save**, so closing the tab quietly killed anybody down the sinkhole. Same block,
found the same way. See [[grimtoll-game-project]], [[explain-and-mockup-before-building]],
[[grimtoll-text-style]].

**Open:** all 19 camp cards draw from one hardcoded `pickOne(['E4','E8','E9','E7'])`, four daylight
paintings, so the dream is illustrated with a sunlit rock.
