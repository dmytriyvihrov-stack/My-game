---
name: grimtoll-210-chase-road
description: "#210 the chase on the wheel-rut road - LANDED on main 2026-08-20 (8f.233), NOT deployed: the deploy gate refused while another session held the prototype lock"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7d433a41-9eed-4a24-af21-e05b4b1a6dc0
  modified: 2026-08-20T14:53:18.447Z
---

The tap-room's friends follow you: two new nodes between the coin and Blood on the Road, and
Grausen Hold moves up. Landed and pushed to main 2026-08-20. **NOT DEPLOYED** - `deploy.ps1`'s
`claim.ps1 gate` correctly refused because session 22105e91 held `prototype\grimtoll_slice.html`
for #209 (event cards on style J), with part 2 still to come. The one command when it clears:
`powershell -NoProfile -ExecutionPolicy Bypass -File deploy.ps1`.

**⛔ THE ASK COULD NOT BE ANSWERED HONESTLY AND ONLY ASKING THE LABEL FOUND IT.** The card names
two faces from the tavern brawl, and `tavernAfter` had counted the dead and thrown the number away
(`void kills`) since #108 - **no run had ever recorded WHICH brawlers lived**, so naming Harl would
be a lie on any run that killed him. Same shape as #197's permanent injuries: the fact the content
needed did not exist, and no reading of the tables would have said so. It stores `u.variant` now
(the template key `build()` already stamps) and `chaseWho()` is the ONE reader for the prose and
the battlefield both, so they can never name different men. ⚠ Fled is not dead: `tavernFlee` leaves
`dead` false, which is exactly the man who comes back.

**⛑ AND ITS FIRST CUT COUNTED TWO SURVIVORS AS ONE.** The second name slot was reserved for Weft
alone, so a run where Brakk and Osper lived read *"One face was at the Three Bells"* over a company
that had beaten two of them. Found by RENDERING all six possible survivor lists, not by reading the
function. See [[grimtoll-invisible-feature-shape]].

**⛔ FIVE NODES IN 236px OF MAP, SO THE ROAD DIPS SOUTH.** The plate rule (110px across OR 79px
down) allows about three columns in the west end and `f1` at (330,452) owns the middle of what is
left; every layout keeping the road straight east fails on `f1`'s plate. New: `chase` (170,555)
*The Alder Cut* and `tree` (285,545) *The Hollow Tree*, pinned off `FLOATING` in the same edit or
#194's double-fire returns.

**⚑ GRAUSEN HOLD 330→276 AND 20px EAST, AND THE 20px IS THE PAINTING.** #190 put ground under the
map after the coordinates were placed and nobody re-read them against it: sampled off
`art/world-map-backgrounds/world-map-illustrated.webp`, (100,330) is **50% open water** and
(120,276) is 16%. **A node sitting in a river is a thing only the picture can tell you, and the
geometry counters never will.** Worth sampling wetness the next time any node moves.

**⚠ A BEATEN ROW IS NOT DECORATION.** `toBeaten` falls through to `toDefeat()` for any battle kind
with no `BEATEN` entry, so an optional roadside brawl would have ended the run at node two. New
`take:{crowns,food}` beside `takeAll` charges exactly the bill the other two doors quoted. Building
the bill off `pay()`'s return caught **"1 provisions"**, and the same defect in the Circle's
`takeAll` line two lines above it.

**Numbers, measured:** `ARENA.match('four',...,14)` - chase 14/14 · 5.9 rounds · 0.4 down, against
clash 14/14 · 7.1 · 2.2 and brigand 12/14 · 7.9 · 1.6. What the fight charges is BLOOD: the company
finishes at 82% of its hitpoints (worst body 44%) two days before the clash. All 20 first runs ended
in **mercy**, which is `noRout` being absent working as designed.

**⚠ Open, and his call:** the Alder Cut has no map painting and the card no `EVENTART` (both fall
back; MAP-EV32 / EV-32 is one art request) · losing scars the whole company because the row is not
`soft:true` (one word if it plays too hard) · the purse did NOT move at his ruling *"nope, don`t
increase purse"*, so the opening is two days poorer and reaches Blood on the Road with 86 crowns
instead of 107 - **107 is the constant to move if the muster stops being affordable, not the road.**

See [[grimtoll-event-card-rules]], [[grimtoll-194-map-clarity]], [[grimtoll-parallel-sessions]].
