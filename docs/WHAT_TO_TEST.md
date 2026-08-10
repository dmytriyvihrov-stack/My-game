# What to test - the new things, and what they are supposed to do

> **This file is yours, not a session's.** It exists so that after a build session you can open the
> game, go straight to the new thing, and know what it is *supposed* to do before you judge whether
> it does. Set up on 2026-07-31 at your request: *"create independent file for me - new features and
> what to test and how it is supposed to work, so I would go for a test and check all newly added
> things with precise feedback."*
>
> **The rule that keeps it alive:** every feature that ships gets a section here in the same
> session that builds it - what it is, **how to reach it in three steps**, what should happen, and
> what would be a bug. Newest at the top. When you have been through one, move it down to
> **[Checked](#checked)** with whatever you thought.
>
> **⚑ Cut down on 2026-08-10.** This file had grown to 3,822 lines, which is longer than anybody is
> going to read with a game running. **Everything from 2026-08-02 and earlier moved to
> [`archive/WHAT_TO_TEST_OLDER.md`](archive/WHAT_TO_TEST_OLDER.md)**, unedited. What is left below is
> the recent work, and it is short enough to get to the bottom of.
>
> **The other docs are unaffected.** [`README.md`](README.md) is orientation ·
> [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md) is the work ·
> [`CHANGELOG.md`](CHANGELOG.md) is the record. This is the **test bench**, and it is the only one
> written to be read *while playing*.

---

## 💥 EVERY SKILL HAS ITS OWN ANIMATION NOW  *(#87 · 2026-08-10 · build log 8f.116)*

**What it is.** Your request: *"proper animation for all skill moves... small but distinct. If push
or kick - kind of wind in that direction. If sweep or scare - to show that it has impact."*

Before this there were **three** animations for **thirty** verbs. The attacker leaned in, the
defender reeled, there was a flash. That is it. So a KICK looked exactly like a sword, a SWEEP
played *one sword-swing per neighbour* (four separate lunges in four directions, for what is one
action), and **six verbs put nothing on the board at all** - ROAR, COMMAND, HOLD THE LINE, SPEAR
WALL, THE FEN ANSWERS and SHE CALLS THEM IN only ever printed a line of text.

**Eight shapes now, and each one means something:**

| the shape | what it says | where you will see it |
|---|---|---|
| **GUST** - chevrons blowing along the line of the blow | somebody else decided where you are standing | KICK · BRACE AND SHOVE · HOOK-POLE *(blows the other way)* · DRAG UNDER · CRIPPLING SHOT *(low, at the feet)* |
| **ARC** - a crescent all the way round the swinger | one swing, everybody in reach | SWEEP · TAIL-LASH · STONE MAUL · THE SWORD COMES ROUND · DISTRACT *(small, on the target)* |
| **RING** - expands to the **real reach in hexes** | a radius, spoken out loud | ROAR · THE SOUND SHE MAKES · COMMAND · HOLD THE LINE · SHE CALLS THEM IN · THE FEN ANSWERS · BLIGHT-WIND |
| **TETHER** - a line snapping taut between two bodies | one body has hold of another | ROOTING GRASP · DRAG UNDER · UNPICK · a caster starting WITHER or BLIGHT-WIND |
| **MOTES** - drops that fall and settle | something landed on them and stayed | POISON THE BLADE · UNPICK's armour coming off |
| **PLATE** - a ring that snaps **inward** | something closed over you | IRON-OATH · SPEAR WALL · HOLD THE LINE |
| **SHUDDER** - the body shakes without moving | it reached you where you stand | anybody caught by ROAR or THE SOUND SHE MAKES |
| **GHOST** - the sprite left behind, fading | the body was here and is not | SINK BELOW · DISENGAGE · SNAP-AND-AWAY · a thrown body |

**Two of those are a matched pair on purpose, and it is the bit I would most like your read on.**
A **ring travels outward** and means *this went out from me*. A **plate snaps inward** and means
*this closed over you*. That is the only difference between **COMMAND** (a gold ring, nothing else)
and **HOLD THE LINE** (a green ring, and then a plate on each person it reached) - two captain
orders that used to look identical because neither of them looked like anything.

**How to reach it in three steps.** ① Menu → **the practice field**. ② Pick **Blood on the Road**
against any company. ③ Take a body with a race verb or a signature and use it. The fastest tour is
a **brute** (SWEEP, then ROAR) and a **human** (KICK) in the same fight.

*(For the boss shapes: practice field → **The Fen-Mother**. She has four of the eight - TAIL-LASH,
DRAG UNDER, THE FEN ANSWERS and THE SOUND SHE MAKES - and she uses them unprompted.)*

**⚑ There is also a sheet of all 23 side by side**, looping, with a speed switch:
[`shots/87_skill_animations.html`](../shots/87_skill_animations.html). Open it in a browser. It
holds the same CSS the game uses, so if something looks wrong there it is wrong in the game too,
and it is far quicker to judge than hunting the verb down in a fight.

**What should happen.**

- **A SWEEP is now ONE picture.** One crescent going round, and every body it caught reels. It used
  to be four sword-swings.
- **The ring is the actual reach.** ROAR's ring is 2 hexes across the radius, the Fen-Mother's
  scream is 5, and they should look obviously different. **This is meant to teach the reach without
  you reading the note** - tell me if it does not.
- **The gust reverses for a pull.** A KICK blows away from you, a HOOK-POLE blows back toward the
  man with the pole. Same three chevrons, opposite direction.
- **Everything is on the ⏱ PACE clock**, so it all slows down together if you change the speed.
- **Nothing new makes a sound.** This pass did not touch audio.

**What would be a bug.**

- **An animation still playing when the next body acts.** That is the one thing the pace clock
  exists to prevent, and it is what I would watch for at **×2.50**.
- **A shape on the wrong body.** DISTRACT's arc belongs on the *target* (something spun them round),
  not on the cutter, who never swung. Same for the ring on BLIGHT-WIND: it goes off where it lands.
- **A ring the wrong size at a different camera stop.** Switch FULL / FIELD / CLOSE and roar again;
  the ring should still cover exactly 2 hexes. I could not test this in my environment.
- **A mirrored body flipping** for the length of an animation and flipping back.
- **The old three still doing their job**: a normal sword swing should look exactly as it did
  yesterday. If a plain attack grew a new effect, that is a bug.

**Feedback I want, in order of how much it would change.**

1. **Is it too much?** Your playtesters said *too many systems from the start*, and this is one more
   thing moving. **A brute's turn can now be a ring, a shudder on three bodies and an arc.** If a
   round reads as busy, the fix is a cap on how many of these can play at once, and I would rather
   hear it than guess.
2. **Is any one of them illegible at the shipped x1.75?** They are tuned small on purpose.
3. **Does the ring/plate pair actually read** as *outward = an order* and *inward = a guard*, or is
   it a distinction only I can see because I wrote it?

**Two things I deliberately did not build**, both named in
[`SHIPPED.md`](SHIPPED.md): a **held** spell does not keep its tether drawn for the whole round (it
flashes once), and **ROAR's 2, COMMAND's 3 and HOLD THE LINE's 2** are written into the animation by
hand because those numbers only exist as literals inside their own handlers - so if you retune one,
tell me, or the ring will keep drawing the old size.

---

## 💀 THE DREAM - the road event about somebody you lost  *(#85 · 2026-08-04 · build log 8f.114)*

**What it is.** Your event, built as you wrote it. On a night between two places, somebody this
company no longer has walks into your sleep with their face fallen in and two empty sockets, tells
you flatly that you could have saved them and did not, and waits for an answer you cannot give.
You wake soaked through. Whoever has the watch has been watching you and says nothing about it.

**⛔ First, the thing you should know before you test it, because it changed the design.** I went
looking for the dead man and there is no such person: **nothing in this build kills anybody on your
roster.** Downed in a battle → a scar and back at 30% health. Withdraw → the same. Lose a fight at
THE CIRCLE → the same. `carryEverybodyOut()` literally says *"nobody is lost."* Scars are the death
system. So the card is about the three ways somebody genuinely leaves for good, and it ranks them
by how much of it was your doing:

| how you lost them | where it comes from | the one sentence the dream adds |
|---|---|---|
| **you cut them down** | a dismissed veteran of 3+ fights walks back to your fire and you take the third door - *"They know the roads, the watch-words, the strongbox"* | *"There is not a mark on them. Not where you put it, not anywhere, and you cannot stop checking."* |
| **the ground took them** | THE GROUND OPENS, the sinkhole, and they have not walked back out yet | *"There is no dirt on them. Nothing under the nails."* |
| **you sent them away** | you dismissed them and the road has not finished with them | *"They still have the bundle on their shoulder, roped the way it was roped the morning you sent them off with it."* |

The **cut-down** one is the real one. It is the only place in the whole game where a member of your
company actually dies, and you are the one holding the knife.

**How to reach it in three steps.** ① Open the company screen and **dismiss** somebody who has been
in three or more fights with you. ② Keep travelling - two days later they turn up at a fire asking
for their place back. ③ Take the **third** door and cut them down. The dream is now in the deck and
will come up at some fire on the road. *(Faster if you are only checking the words: open the
console and run* `G.killedOwn=G.party[1]; G.party.splice(1,1); G.campSeen={}; CAMPS.forEach(c=>{if(c.id!=='dream')G.campSeen[c.id]=true}); openCamp({x:620,y:330},()=>{})` *.)*

**What should happen.**

- **On a clean run you never see it.** A company that has lost nobody is not offered the card at
  all. It also fires **once a run**, like every camp incident.
- **The dream itself has no answer in it**, on purpose - that is your text. It plays, it ends, and
  the decision is what you do in the morning. Three doors:

| | costs | what you are buying |
|---|---|---|
| **Say their name at the fire. Say what you dreamed.** | **−1 day**, mood +10 | nobody marches; nobody tells you it was not your fault, because that would be a lie; by midday somebody has told a story about them you had never heard |
| **Count out their share and put it back in the chest.** | **−30 crowns**, mood +6 | a bag with their name on it in charcoal and nowhere for it to go. That is the whole of what it is |
| **Nothing. Kick the fire out and march.** | free tonight, mood −7 | **it comes back on the fourth night**, you know exactly what is coming, and it makes no difference at all |

- **The free door is the expensive one**, and its price is in its own aftermath rather than in a
  later card. That is the thing I most want your read on.
- Under 30 crowns the middle door greys out and says **cannot afford**; the other two stay live.

**What would be a bug.**

- The dead person **also being the one on watch** at the end of the card, or being named as though
  they were still in the company. They should appear in exactly one place: the far side of the fire.
- The card turning up on a run where you have lost nobody.
- The dream naming somebody who then turns out to be sitting in your inventory screen.
- **One case that is NOT a bug and I want to say so plainly:** the sinkhole rolls 50% every leg to
  hand its man back. So you can dream someone dead and then watch them walk out of the treeline
  four days later. That is deliberate. **The dream is a dream, and nothing outside it ever states
  that anybody died.**

**Known and not fixed.** The picture on the card is wrong for it - a sunlit rock. All 19 camp
incidents draw from one hardcoded pool of four daylight paintings, so this is not specific to the
dream and fixing it properly means deciding whether camp cards get their own art. Say the word and
it becomes an entry.

**Also fixed on the way past, and it was a real bug older than this card.** `G.stranded` - the
person the sinkhole swallows - **was never written to the save**. Close the tab while somebody is
down that hole and they were gone for good; the roll that walks them back out had nobody left to
walk. It is saved now, along with the one you cut down.

---

## ⚔ A dodge and a miss are different things now  *(#84 · 2026-08-04 · build log 8f.113)*

**What it is.** Until today every attack that failed printed *"Ilka Renn misses."* and floated a
green **DODGE** over the target, at the same time, for the same roll. Those two statements
contradict each other and only one of them can be true per swing. Now the game decides which.

**How to reach it in three steps.** ⚙ TEST → any fight → attack something. Watch the log strip and
the word that floats over the target.

**What should happen.**

| | the log says | the floater says |
|---|---|---|
| **You swung badly** | *"Ilka Renn swings wide."* / *"shoots wide."* / *"her working comes apart."* | **MISS**, dull grey-green |
| **They got out of the way** | *"Lurcher leans back out of it."* / *"twists, and the shot goes past."* / *"is not where it lands."* | **DODGE**, green |

The rule is the honest one and it costs no extra dice: **it is a DODGE only if the blow would have
landed on a target that never moved.** If it would have missed a fence post, it is a MISS and the
defender gets no credit for standing there. A target with no dodge to speak of can never produce a
dodge line.

**The board says it too, without the log.** On a dodge the defender's figure gets out of the way,
the way it always did. On a plain miss **it does not move at all** now, because nothing happened to
it. That difference is the fastest read on the field.

**What is worth judging.** The split is not even, on purpose: an ogre has 3 dodge against your ~55
skill and a lurcher has 26, so **the ogre fights should now read as "I keep swinging badly" and the
dog and ratkin fights as "they will not stand still"**. Across a full regression it came out 51
dodges to 169 misses, with 10-12 dodges in the fast fights and **2 in the whole steading fight and 0
against the Fen-Mother**. That is the stat block finally being visible. Tell me if it reads as
flavour instead of information.

**What would be a bug.** An ogre or the Fen-Mother dodging often · a lurcher or a slinger never
dodging · the word MISS over a figure that visibly ducks · *"swings wide"* on a bow or a working ·
the same failed swing printing both words. **Nothing about the odds changed** - if a fight feels
harder or easier than yesterday, that is not this.

**Not built, and say if you want it:** the hover odds still show one number. A player who wants to
know how much of their 45% failure is *the target moving* has to read the dodge row and work it out.
A split preview (*"55 fails: 12 of them it dodges"*) is a separate job.

---

## 🔗 The link you send to friends  *(2026-08-04 · build log 8f.111 · **four clicks left, and they are yours**)*

**The repo exists, the build is committed, and for the first time the shareable file HAS SOUND IN
IT.** That is the part worth saying twice. Every version anyone outside this machine has ever heard
was silent, because the music lived in an `audio/` folder that never travelled with the page. It
travels now: the eleven approved cues are inside `index.html` as AAC, 79MB of WAV squeezed to 3.7MB,
and the whole page is 10.3MB with nothing to fetch and nothing to install.

**What is done:** git repo created, `.gitignore` written, everything committed on `main`, and
`index.html` built and checked in a real browser. **What is not done: the repo is only on this
laptop.** GitHub does not exist yet, so there is no link yet.

### The four clicks

1. Go to **github.com/new**. Name it `grimtoll`. **Public.** Do **not** tick "add a README", the
   repo already has one.
2. Copy the URL it shows you and hand it back to this chat, or run the two lines GitHub prints
   under *"push an existing repository"*.
3. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**
4. Wait about a minute. The link is **`https://<your-name>.github.io/grimtoll/`**.

Send that link. It works on a phone, it needs no account, and closing the tab does not lose the run.

### What to listen for, since this has never been heard by anybody but you

- **Sound starts on the FIRST CLICK, never on load.** Every browser blocks autoplay. If the menu is
  silent until you touch something, that is correct.
- The **main menu** has its own track. The **road** has two that alternate. **Battle** and **boss**
  are separate. Speaker button is bottom right.
- **This is a 64k AAC copy, not the master.** It should be indistinguishable through a phone or a
  laptop speaker. If something sounds thin or swirly on good headphones, say which cue and it gets
  re-encoded higher; that is one number in one script.
- ⚠ **A bug worth watching for: sound that works here and not there.** That failure is the entire
  reason this entry exists, so if a friend says "no music", ask what they clicked first.

### Updating it later: one command

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File deploy.ps1
```

Builds the page, **refuses to push it if the sound did not make it in**, commits, pushes, prints
the URL. About twenty seconds. **The link never changes**, so one you sent last week is the build
you pushed a minute ago; if a friend sees the old one, that is their cache, Ctrl+F5.

Add `-Audio` only on a day something in `audio/` changed. Full card in
[`DEPLOY.md`](DEPLOY.md).

*The old artifact links still hold an older, silent build:
[the original](https://claude.ai/code/artifact/0263fef0-f753-477e-a90e-ed329f724226) ·
[backup](https://claude.ai/code/artifact/a76483cd-cc32-48fe-ac43-d1bce1ae0338). They are private, and
they are no longer the thing you send.* **On a real host the `window.claude` ban evaporates**, so the
save-as-a-file row that 8f.104 cost you can come back whenever you want it.

---

## How to get to anything fast

**The practice field is the way to test a fight without spending a road to reach it.**

1. Boot the game → **THE PRACTICE FIELD** on the menu.
2. Pick the fight and the company. *(A copy of your live company is one of the choices.)*
3. Play it.

**Nothing in a practice fight touches your run** - no scars, no spoils, no day passing, and the
save is never written. It is the right place for everything below unless a section says otherwise.

`⚙ TEST` (top right) turns on the tester tools: **✓ WIN NOW** ends a fight instantly, **☰ LINT**
reads every content table and reports. Neither is needed for anything below, but WIN NOW is handy
for skipping to the end of a fight you have already seen what you wanted from.

---

## 🌲 HOW TALL IS IT - a spear stops reaching through trees, an arrow crosses a fire  *(#82, 2026-08-04 · build log 8f.108)*

**What it is.** Your note: *"Spearmen can't hit through the tall objects (tree, group o rocks).
Independent rock medium-small. But archers can shoot through smaller objects (like fire)."* Both
halves were true and both were wrong in the build: **every obstacle stopped an arrow dead, including
a campfire**, and **nothing at all stopped a spear**, so a spearwoman could put a boar spear through
an oak. Obstacles now have a **height**, and it is a separate thing from whether you can walk on
them. You still cannot walk into a fire. You can now shoot over it.

| how tall | what it is | an arrow | a spear thrust over it |
|---|---|---|---|
| **tall** | a tree, a big tree, a palisade or hut wall, **and a rock with another rock beside it** | no shot at all | refused |
| **medium** | **a boulder standing on its own** | offered, and it costs **−14** (a new state, **COVER**) | fine, no penalty |
| **low** | a fire, a bloom flower | nothing at all, same as open ground | fine, no penalty |

**The thing to look at is the middle row.** A boulder on its own is now **cover**, which the game
has never had: standing behind one makes you harder to shoot. A rock with a neighbour is a spine,
and a spine is a wall.

**How to reach it in three steps.**

1. Practice field → any fight on wooded or rocky ground (**the clash** is the quickest, and rocks
   and trees are generated on most boards).
2. Take **Ilka** (bow) and select HUNTING BOW. Look at every enemy in range and read the word on
   the hex: **CLEAR · COVER · LONG · FAR · SCREENED · OBSTRUCTED · BLOCKED**.
3. Take **Vesna** (boar spear, reach 2) and select BOAR SPEAR. Look at enemies two hexes away with
   something in between.

**What should happen.**

- **An enemy across a fire is a normal shot.** Same number as open ground, no penalty line.
- **An enemy across one boulder says COVER**, the hex edge goes bronze, and the hit readout carries
  a line reading **"over a boulder −14"**.
- **An enemy across a tree, a wall, or two touching rocks says BLOCKED** and shows no number at all.
  There is no shot, so there is no percentage.
- **A spear target with a tree or a rock group in between is not offered.** The hex is not lit and
  carries no odds. This is the same behaviour as trying to kick an ogre: the offer is simply not
  there, rather than being there and refusing you.
- **A spear target across a fire or a lone boulder is offered exactly as before.** No penalty.
- **A body in the way still never stops a spear.** Vesna fighting over the person in front of her is
  the entire class, and that has not changed.
- **The enemy plays by the same rule.** Their pikes and long spears, and the Fen-Mother's reach-2
  attacks, are refused by an oak the same way yours are.
- **The spear wall too.** Something walking into reach round the far side of a tree should not be
  caught by the wall.

**What would be a bug.**

- A hex that lights up for a spear and then refuses the click with a line in the log. It should
  never have been lit.
- Two penalties added together on one shot. A boulder **and** a body in the same lane should charge
  **−22** (the worse of the two), not −36.
- A rock that changes what it does mid-fight without anything happening to it. **Except one case,
  which is correct:** if an ogre picks up one boulder of a touching pair, the other one is a lone
  rock afterwards, so a lane that was BLOCKED becomes COVER. That is the rule, not a bug.
- The ogre's PICK UP AND THROW offering you a rock that is part of a group. It may only ever lift
  one standing on its own.

**What I want to know.** **Is −14 the right price for a boulder?** It sits between shooting past
your own braced man (−8) and shooting past an enemy body (−22), which is where it belongs in the
order, but the size of it is a guess and you are the one who will feel it. And **is cover worth
using** - do you find yourself putting the archer behind a rock, or does it never come up because
the boards do not have rocks in the right places?

---

## 📱 A BIT MOBILE FRIENDLY - the game turns itself on a phone  *(#83, 2026-08-03 · build log 8f.106)*

**What it is.** You asked for a bit of mobile friendliness, not full. This is the bit: the game now
fills a phone screen instead of sitting in the middle of one. **Nothing about the game changed** -
no rule, no screen, no text. Only how much of your phone it gets.

**The one thing you will notice, and it is deliberate: in portrait, the game turns sideways.** Held
upright, a phone gave the game a third of its screen (a board 393 pixels wide with 74% of the phone
black). Turned, it gets 55% - the board is **78% bigger** and the screen is full. So rather than ask
you to rotate the phone, the game rotates itself, and you hold the phone however you like. You chose
this over a "please turn your phone" message, because rotation lock would have left somebody stuck.

**How to reach it in three steps.**

1. Open the shared link on your phone (or on a laptop, narrow the browser window - see the note
   below about why a laptop will *not* turn).
2. Hold it upright. The game should be sideways and filling the screen.
3. Turn the phone sideways. The game should turn back upright, the same size, without reloading.

**What should happen.**

- **Portrait:** the game lies across the screen, top-of-game to the right, and fills it corner to
  corner. **Landscape:** the game is upright and fills it. Both are the same size.
- **Turning the phone swaps between them smoothly**, mid-battle, mid-card, mid-anything, with no
  reload and nothing lost.
- **Taps land where you aim**, in both orientations. No 300ms lag before a hex responds, and no grey
  box flashing over the thing you just touched.
- **Pinch to zoom still works.** This is on purpose: the small mono labels are genuinely small on a
  phone and pinch is the only way to read them. Double-tap-to-zoom is off, so pinching does not
  fight you while you play.
- **Dragging on the board does not pull the page down into a refresh.**
- **Damage numbers, the hover readout, the Captain's balloons and the impact lines all sit exactly
  where they belong** in both orientations. This is the part most likely to have gone wrong, so it
  is worth a deliberate look: put somebody down and watch where the red figure appears.
- **On a laptop or desktop, nothing at all should change**, however you drag the window. The turn
  needs a touch screen, on purpose - a window dragged tall and narrow would otherwise flip the game
  sideways on a monitor.
- **A tablet held upright stays upright**, also on purpose: it is already readable, and a sideways
  game in two hands is wrong.

**What would be a bug.**

- A damage figure, the hover card or a Captain's balloon appearing **at a right angle** to where it
  belongs, or far off the board. *(Measured to 0.0001px in both orientations, but this is the seam.)*
- A tap that lands on the wrong hex, or a button that will not take a tap.
- The game turning on your **laptop**.
- A black screen, or the game shrinking to nothing, after turning the phone or after the address bar
  slides away.
- The game **not** turning in portrait on a phone. If that happens, tell me the phone and browser.

**What is honestly still bad, and I want to know whether it matters.**

1. **Everything is small.** At 55%, the small grey mono labels render at about 5px. Zoom reads them,
   but nothing was made *bigger* - that is a separate job and it is the one that decides whether a
   friend can really play this on a phone or only look at it. **Tell me if it is unreadable rather
   than merely small.**
2. **Hover does not exist on a finger.** The hit-chance breakdown, the gear tooltips and the nerve
   ladder all open on hover. A tap usually raises them on a phone and nothing guarantees it. **If
   tapping an enemy does not show you the readout, say so** - that is the next thing to fix.
3. **The small chrome** (⚙ TEST, ☰ MENU, the ★▲▼ bar) was sized for a mouse, not a thumb.

*Everything here was measured in a 393x852 window on a desktop with the turn forced on. **It has
never run on a real phone.** You are the first.*

---

## 📜 YOUR DOC PASS IS IN THE GAME - eleven road events re-cut  *(2026-08-03 · build log 8f.103)*

**What it is.** Everything you changed in the Google Doc (Part 1, the road and node events) is now
in the build, including the quiet cuts you made without a star: every event was diffed word against
word, so Bonepicker's lost "Nobody asks twice", the Long Fire lost the feast paragraph, the shrine
woman lost her "Bells that way" line, and so on. The starred items were polished in your style
rules (simple words, concrete details, every line pays rent). Twenty-one events you did not touch
were verified word-identical and left alone.

**The two things that are more than wording:**

- **THE STEADING-LINE pays in people now.** Both peaceful doors (pay the 120 toll, or send your
  ogre for 40) end with a young ogre, **Osk**, asking to walk with you: **90 crowns, only if there
  is room in the company.** You priced the toll door at 90 and left the parley door blank, so 90 is
  on both for now - one word from you moves it.
- **The pedlar sells one shield, not two.** 40 crowns. The barrel lid stays on his table as a joke
  instead of a purchase. His pay-properly door is gone (your maximum-four rule), so the card is:
  shield · gems · rob · walk away.

**How to reach it in three steps.**

1. Boot the game → new company (or continue) → walk the road. THE STEADING-LINE sits on the road
   to the Muster Field; the pedlar, chapel, toll-man and the rest deal from the road deck.
2. On the Steading-Line, pay the toll (or send your ogre) with 200+ crowns in the chest and room
   in the company.
3. Read the card end to end: the ask ("Ninety crowns, if there is room in the company"), then the
   receipt line naming what actually happened.

**What should happen.**

- Osk joins with his own rolled trait, a club, and the receipt says **"joins the company for 90
  crowns"**. With a full company he refuses by room; with under 90 in the chest after the toll he
  refuses by coin, and each refusal says which it was.
- SOMETHING IN ARMOUR now ends: *you stop, because stopping is the only thing left. **It does
  not.*** The old forty-paces-waiting beat is gone. FACE IT is still the only button.
- THE CIRCLE: more than ten shadows move wide of the fire in the intro, the mark option reads
  "Take the mark now", and the needle line is in the result. The fight door says plainly:
  **you will not win**.
- UNDER THE BLOOM opens on concrete things: pink light off the ground, black moss, a deer nothing
  will eat, a map four years old.
- Pedlar, chapel, Bonepicker's and the Warm Spring all show **four options at most**.

**What would be a bug.** Any card still showing a deleted option (pay-properly, the lead roof, the
rest day, "It is water. We have a road."). Osk joining without the 90 leaving the chest, or the
join charging 90 and NOT adding him. A receipt for the shield naming two items. Any of the six
quiet cuts still on screen (the feast paragraph is the easiest to spot-check).

**Feedback wanted.** Two of your rules are half-applied and wait on you: THE SITTING STONE and
A WEDDING ON THE ROAD still hold **five** options each (race-gated, so most companies see four or
fewer) - do the gated ones count against your maximum of four? And is 90 right for the parley-door
join, or should the courtesy discount it?

---

## 🖼 THE EVENT CARD - wider box, taller picture  *(2026-08-03 · build log 8f.102)*

**What it is.** Your note: *"for events texts - for texts itslef - can you make box a bit wider, so
it took les space. And make a picturre space 20-30% taller - so I ee more fully picture."* The event
card is now **620px wide instead of 560**, and the painting on it is **586x212 instead of 528x176**.

**The one thing worth knowing before you look at it,** because it decides whether you think the
numbers are right. The painting is *cropped to fit* its window, not squeezed into it. So how much of
the scene you get is set by the window's **shape**, not its height - and making the card wider makes
the window wider too. Widening the card and leaving the picture at 176px would have shown you
**less** of the painting than before, not more. **196px was break-even.** It shipped at **212px**,
so the real gain is the 16px above break-even: you now see **64% of each painting instead of 59%**,
in a box that is a fifth taller on screen.

**How to reach it in three steps.**

1. Boot the game → start a run → walk to any node with a ⬥ event on it.
2. Read the card. The picture is the strip under the title.
3. Compare against `shots/event_card_wider_2026-08-03.html` (open it in a browser) - it holds three
   events side by side, before and after, at real size.

**What should happen.**

- The painting should be **sharp**, not stretched or squashed. Faces, wheels and barrels are the
  giveaway - a wheel that reads as an oval is a bug. This was checked on all 32 events, the road
  camp and Coldharrow, but you have a better eye for it than a measurement does.
- The card should still sit **on** the node it belongs to and never hang off the edge of the map.
- Long events should still scroll their **prose only** - the choice buttons stay pinned in view.

**The judgement call I want your reading on, because it is a trade and not a bug.**

The card has a hard **618px** of height to spend and the picture just took 36 more of them. On most
events that changed nothing - the middle card shows the same 7 lines of prose it always did. But on
the crowded cards it costs a line or two before you have to scroll. **The two worst are the pedlar
and the road camp** (five options each, 283px of buttons) and **Coldharrow is the worst in the
game** - it opened on about 2.5 lines of its 9 before this change and opens on about 2.2 now.

So: **look at Coldharrow and the pedlar specifically, and tell me if the prose window feels too
thin.** Three ways out, and I did not pick one for you:

- **Leave it.** Those cards already scrolled; this made them slightly worse, not newly broken.
- **Give the picture back 16px** (212 → 196). You keep the wider box and the same slice of painting
  you had before, and the crowded cards go back to roughly where they were.
- **Fix the real cause instead,** which is not the picture: a five-option card spends **297px of the
  618** on buttons. Tightening the choice rows would buy every card back a line or two and cost the
  painting nothing. Nobody has picked this up; say the word and it becomes a backlog entry.

There is one number for the first two: `DLGART_H` in the slice, right under `DLGW`, with the
measured table of what each value buys sitting in the comment above it.

---

## ⏱ THE BATTLE CLOCK - the board plays 75% slower, and you can change it mid-fight  *(#81, 2026-08-03 · build log 8f.100)*

**What it is.** Your note: *"make actions on battlfild 50-100% slower. so player have more info to
understend what have happened."* Everything on the battlefield that takes time now runs through one
multiplier, shipped at **×1.75** - the middle of the range you asked for. That is the pause between
one enemy acting and the next, the lunge and the recoil, the flash and the sparks, and how long a
damage number hangs in the air. **Nothing about the fight itself changed** - not a hit chance, not a
number, not an AI decision. Only how long you get to watch it.

**A button under WITHDRAW cycles it**: ×1 → ×1.25 → ×1.5 → **×1.75** → ×2 → ×2.5 and back round.
It goes gold whenever it is off the default, it changes the fight you are already in on the next
blow, and it is remembered.

**How to reach it in three steps.**

1. Boot the game → **THE PRACTICE FIELD** on the menu → any fight (the pack or the sling-line show
   it best - they have the most bodies acting per round).
2. Watch one full enemy round without touching anything.
3. Press **⏱ PACE** at the bottom left until it says ×1, watch another round, then put it back.

**What should happen.**

- At ×1.75 an enemy round should feel like a sequence of separate events. You should be able to
  say, after the fact, *who* moved, *who* swung at *whom*, and what it cost - without reading the
  log to find out.
- The blow and the number should still land together. **A hit that flashes before the animation, or
  a number that vanishes while the body is still reeling, is a bug** - every duration is supposed to
  stretch by the same amount, so the pieces of one blow stay glued together at every setting.
- ×1 should be exactly the old game. If ×1 feels different from how it used to feel, that is a bug.
- The setting should survive closing the tab.

**Two things I want your reading on, because they are judgement calls and not bugs.**

1. **Is ×1.75 the right default, or is it now too slow?** Measured across the eight fights, the
   scheduled pauses in a fight go from 43-113 seconds to 75-198. The long ones are the Snare and the
   Fen-Mother: the Snare's pauses go from about **1:53 to 3:18**. That is real time added to a fight
   you are already losing patience with, and if it drags, ×1.5 is one press away and I will move the
   default to whatever you land on.
2. **The archer's shot was deliberately left at its old speed.** The game resolves a shot the
   instant it is loosed, so the arrow is still crossing the ground while the damage is already on
   the target. At the old speed the arrow arrived *after* the target had finished flinching, which
   was backwards; leaving it alone while everything else slowed puts it back inside the flinch. It
   is a patch over a real defect - **the impact should wait for the arrow to land** - and that is
   named as the open remainder on this entry rather than fixed here.

**Known and deliberate:** the Captain's balloons still hold for 2.2s (a comment) and 4.5s (a
lesson). Those are reading time, not action time, and they were tuned on their own.

---

## ✉ SEND THE RUN, re-cut for the ten friends  *(your changes, 2026-08-03 · build log 8f.99)*

**What it is.** The questionnaire and the notes screen #76 built, with your edits to the questions
and a re-ordered send screen. Shot of all three states: `shots/80_send_the_run_recut.html`.

**How to reach it in three steps.**

1. Boot the game and play a little, or just open the menu (☰ top left).
2. **SEND THE RUN** on the menu → the seven questions.
3. **Done - send it** → the notes screen.

**What should happen.**

- **The questions are these seven, in this order:** where did you stop · name or describe someone
  from the team · which decision did you remember · a moment in a fight you did not understand ·
  **what did you like** · **what did you dislike** · anything else. *"What did you want and not be
  able to pay for?"* and *"What would you cut?"* are gone.
- **The bottom row is `Back` on the left and a green `Done - send it` on the right**, and Done is
  wider, bordered heavier and faintly glowing. It is the only coloured thing on the card.
- **The notes screen opens with SEND IT BACK, not with your statistics.** In order: the line about
  how many questions you answered, then a big green **✉ SEND IT TO ME**, then the fallback text and
  the copy box - and only then **WHAT IS IN IT** with the run tallies and every decision.
- **`Clear my journal` and `Read somebody else's` are not on the screen at all.** Turn `⚙ TEST` on
  (top right) and a **⚙ TESTER TOOLS** section appears low down, above `Back`, holding both. Turn it
  off again and it disappears while you are looking at it. `Back` is on its own, centred, at the
  bottom either way.
- **Pressing ✉ SEND IT TO ME** opens your mail client addressed to `dmytriyvihrov@gmail.com` with
  the answers already written, and puts the full journal on your clipboard in the same click. The
  button's own subtitle changes to say so.

**What would be a bug.**

- The old `afford` or `cut` questions showing up anywhere, including in the mail.
- `Clear my journal` visible with `⚙ TEST` off - **that one matters most**, it is the button that
  destroys the thing the screen is collecting.
- The screen not re-drawing when you flip `⚙ TEST` while it is open.
- Anything on this screen changing anything in the game. It has never been allowed to and still is
  not; it only watches.

> ⚠ **One thing I chose, so overrule it if you disagree:** I fixed the grammar in your two new
> question lines ("someone from the team. Who was it?" / "built some connection with"), because a
> stranger reading the form should not be reading through a typo. The meaning is untouched.

---

## Everything older

**Everything that shipped on 2026-08-02 and before now lives in
[`archive/WHAT_TO_TEST_OLDER.md`](archive/WHAT_TO_TEST_OLDER.md)** - 3,294 lines of it, unedited.
Most of it has already been through the QA playthrough or through your own runs.

It was moved on 2026-08-10 for the same reason the backlog was cut down that day: **a test bench
nobody can get to the bottom of is not a test bench.** If something down there still bothers you,
it reads exactly as it did.

---

## Checked

*Move a section here when you have played it, with what you thought. That is what stops the same
thing being re-tested every session.*
