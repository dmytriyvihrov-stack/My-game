# Events

**FIXED** events are structural — the act needs them, they always appear.
**FLOATING** events are sampled and shuffled each run, so the same road is never the same twice.

Party members are substituted via the token layer — `{ANY}` `{ANY2}` `{RATKIN}` `{OGRE}` `{HUMAN}`
`{MAGE}` `{ARCHER}` `{CAPTAIN}` — resolved against the **living** roster at display time, with
fallback phrases when nobody fits. `{ANY}` never picks the Captain (his name is literally "You").

> ⚠ **The costs below are written in the OLD vocabulary** (`food`, `wood`, `iron`) and in the old
> receipt style. The engine still accepts them, but new and rewritten content must use
> **provisions / salvage / party room** and state costs as intent — see `README.md`, which also
> carries the six costing rules of the *"you cannot afford to be good to everyone"* pillar. Bringing
> these lines over is the open **8g** task in `docs/00_PLAN_AND_BACKLOG.md`.

> ⚠ **And the prose below is HISTORICAL since 2026-08-01.** The live event text lives in
> `prototype/grimtoll_slice.html` and nowhere else (the dramaturge rule: there must never be a
> second copy of the event data), and the world facts it now quotes are canon in
> [`docs/03_WORLD_LORE.md`](../docs/03_WORLD_LORE.md), the lore book. The 8f.75 lore pass rewrote
> 26 map events and 2 camp cards in the prototype only; nothing here was updated, and some shapes
> below are already stale (the armour card has one answer now, the muster stands in front of the
> Fen). Read this file for the DESIGN of an event, its job and its shape. Never copy prose, costs
> or structure from it.

---

# FIXED — the spine of the act

| key | Place | Job it does |
|---|---|---|
| `toll` | The Hanged Toll-Man | The reference event. Teaches: costs are intent, not receipts; consequences land on a named person (the boots). |
| `mother` | The Fen-Mother | The monster fight. Teaches scars. Choke point — every road passes it. |
| `hire` | The Muster Field | Recruitment. Placed *after* the monster so reputation earns it. |
| `deadco` | The Dead Company | The gear handover. Forces the inventory open before the final fight. |
| `snare` | The Ratkin Snare | The act's final battle. No withdrawal — life or death. |
| `wynn` | The Woman in the Cage | The closing dialog. Pays out the whole run. |
| `armour` | *(no node — it catches you on the road)* | The Thing in Armour. Fires once per run **on arrival**, framed as having happened on the last stretch, at the first ordinary road node past the first Muster Field. Takes precedence over that node's own event, which is still waiting when the fight is done. |

**`armour` — SOMETHING IN ARMOUR** *(FIXED, and the only event with no node of its own)*
It has been behind you since the middle of the afternoon. Not following, exactly. Coming the same
way, at a walk, and the walk does not change when yours does. Plate from the throat down, a helm
with the visor shut, and a sword that would be two-handed on anybody else carried in one, point
down, so that the tip draws a line in the road behind it the whole way. `{ANY}` hails it once and
gets nothing — not a refusal, not a turn of the head.

**All three answers lead to the same fight.** What changes is where your people are standing when
it arrives. The card must never hint that one of them is wrong.
- Run for the broken ground → you get there, and you get there strung out
- Form up on the road → shoulder to shoulder, which is the formation its sword was built for
- Somebody goes wide and pulls it off the road → the rest get spacing and the length of the
  field; **that person starts the fight downed and takes a scar for it**, and gets its harness
  half open before it finishes with them

**On death it melts.** No corpse, no race, no loot table beyond one object, and nothing anywhere
— not the run summary, not the kill tally — ever says what it was. *Do not answer it in this act.*

---

# FLOATING — sampled per run

## Road & ruin

**`chapel` — THE DROWNED CHAPEL**
The roof went first, then the floor. Pews stand in four inches of brown water like a
congregation that never learned to leave. Something under the altar is still dry.
- Wade in and take what the water left → +6 iron, −1 day
- Pry the lead from the roof, all of it → +6 iron +2 wood, **somebody falls** (injury)
- Say the words and go → saint's fingerbone, morale +5

**`wain` — THE SUNKEN WAIN**
A merchant wagon to its axles in the fen, four days abandoned. The strongbox is not gone. The
strongbox is simply heavy.
- {A} lifts, everyone else pretends to help → +2 gems +40 crowns, **strain injury**
- Take the wheels and the iron banding → +3 iron +3 wood
- Take the guard's maul from the seat → a two-hand maul

**`pedlar` — PEDLAR ON THE RIDGE**
One mule, a folding table, three miles from anywhere. He has seen your ogre and has decided to
be extremely friendly about it. He is alone. Everyone has noticed that he is alone.
- Buy food and iron, pay him properly → −85 crowns, +7 food +4 iron, a charm
- Buy the shield and the barrel-lid → −70 crowns, two shields
- Trade two gems → +10 food +6 iron +40 crowns
- **Take the cart. He is one man.** → +150 crowns +8 food +5 iron, morale −22, he had a knife (injury)

**`camp` — BONEPICKER'S CAMP**
Six tents, a cook-fire, and a man who buys teeth.
- Buy food, haggle badly → −60 crowns +9 food
- Buy the stitched hides (ogre-sized) → −55 crowns
- Sell him a gem → +90 crowns
- Rest a day → −1 day −2 food, morale +14

**`bloom` — UNDER THE BLOOM**
The light is the wrong colour and there is no source for it. Moss goes black.
- Push straight through → −2 food, morale −10
- Cut a bloom-stem and bag it → a bloom-stem, morale −14
- Camp at the edge and watch all night → −1 day +1 gem, **bloom-touched** (injury)

**`broken` — THE BROKEN MEN** *(also a battle)*
Five human deserters. Half a uniform each, a season of hunger, a captain who still stands like
one. They are what your company becomes after one bad winter.
- "No." → BATTLE (human brigands)
- Give them four days of food → −4 food, morale +6, **Pell joins the company**
- Hand over the coin they can see → −40 crowns, morale −8

### NEW FLOATING EVENTS

**`toldman` — THE MILESTONE**
A ratkin milestone, carved with a distance and a clan-mark, and somebody has been at it with a
chisel to change the number. Recently. The new number would send a company four days wrong.
- Re-cut it correctly. It costs you the evening → −1 day, morale +6, *"Vess would have done the same"*
- Change it again, worse, and go → morale −6, +1 trinket *(a chisel somebody left)*
- Leave it. Not your road, not your milestone → no cost

**`saltwives` — THE SALT-WIVES**
Four human women boiling brine on the shingle, in a place with no village behind it. They have
been here since before your lord came and will be here after. They will sell salt, and they will
ask, without seeming to, exactly how many of you there are.
- Buy salt properly → −45 crowns, +6 food, morale +4
- Ask what they have heard → −20 crowns, **reveals the next leg's event before you take it**
- Take the salt and the pot → +4 food, morale −18, *the island is small and word travels*

**`ratcart` — THE CLAN CART**
A ratkin trade-cart, wheel-broken, four ratkin sitting on it looking at you with the specific
resignation of people who have already decided how this goes. The cargo is crossbows. Eleven
hundred crossbows, each of which will fire perhaps eleven times.
- Fix the wheel. It takes an ogre and an hour → −1 day, morale +8, **a clan owes you a small favour**
- Buy fifty crossbows for scrap value → −60 crowns, +5 iron
- Take the cart → +120 crowns +8 iron, morale −20, **and a ratkin clan now knows your banner**

**`hollow` — THE HOLLOW TREE**
Something has been living in the trunk. Not recently. It left behind a bedroll, a good knife, and
forty-one tally-marks cut into the inner wall, and then a gap, and then no more marks.
- Take the knife and go → an off-hand dirk
- Count the marks properly and bury the bedroll → morale +8
- Sleep in it. It is dry and it is free → −0 food, morale −10, *nobody sleeps well*

**`ogrestone` — THE SITTING STONE**
An ogre is sitting on a rock beside the road. He has been sitting there, by his own account, for
two winters. He is not hostile. He is not anything. He would like to know if you have any bread,
and whether the war is over, and which war you mean.
- Give him bread and sit a while → −2 food, morale +12, *he tells you what is up the road*
- Ask him to come with you → **an ogre may join** (if charisma allows)
- Leave him to it → no cost, morale −2

**`taxman` — THE COLLECTOR**
A human in a good coat with a ledger and no escort, collecting a toll on behalf of a kingdom that
fell forty years ago. He is entirely serious. He has a stamped writ. The writ is genuine and
worthless and he has been doing this for eleven years.
- Pay the toll. It is four crowns → −4 crowns, morale +10, *the whole company enjoys this enormously*
- Explain, kindly, about the kingdom → morale −6, *he does not take it well*
- Rob the tax collector → +25 crowns, morale −12, *even Skree thinks this is beneath you*

**`bogbody` — WHAT THE PEAT KEPT**
The cutting has opened a face. Ratkin, tanned brown, perfectly preserved, with a ratkin blade
still in its ribs — so this is an old clan-war grave, and a good one, and there will be others.
- Dig properly. There is metal down there → −1 day, +7 iron +1 gem, morale −8
- Take the blade only → a gut-knife, morale −2
- Cover it back over → morale +10, *Skree does the covering, and does not explain*

**`fever` — THE SHAKES**
{A} has been quiet for two days and is now not quiet at all. It might be fen-fever, which passes,
or it might be the other thing, which does not.
- Stop three days and let it break → −3 days −4 food, morale +6
- Push on and hope → morale −8, 50/50: nothing, or **an injury**
- Buy what the pedlars call medicine → −70 crowns, morale +4

**`wedding` — A WEDDING ON THE ROAD**
A ratkin clan-wedding has spilled across the road and shows no sign of moving. They are drunk,
they are enormously friendly, and they have decided your ogre is the best thing that has ever
happened to them.
- Stay for one drink. Only one → −1 day, morale +16
- Push politely through → morale −2
- Trade with the wedding party → −30 crowns, +5 food +1 trinket

**`aqueduct` — THE RATKIN WATERWORKS**
A stone aqueduct running forty feet overhead, beautifully engineered, catastrophically built. It
has been leaking for a century and will stand for another one. Somebody has scratched a clan-mark
and a rude word at the base.
- Camp under it. It is shelter of a sort → morale +4
- Strip the lead jointing → +6 iron, *and the leak becomes a flood, and a village downstream will notice*, morale −10
- Copy the joint design for the forge → **+1 wood +1 iron, and the Old Camp learns something**

**`shipwreck` — THE LAST SHIP**
A human vessel, sixty years up the shingle, too far from any water it could have floated in. This
is one of the ships. Somebody has lived in it since. Somebody has died in it since.
- Search it properly → −1 day, +40 crowns +3 iron, morale −6
- Take the ship's bell → +1 trinket *(a bell that rings wrong)*
- Stand and look at it a while → morale +8, *you came over on one of these*

---

## Camp incidents (fire between two places)

These already shuffle. Current set: **The Argument**, **Something in the Pork**, **The Fiddler**,
**The Found Thing**, **The Good Night**.

### New camp incidents to add

**THE DEBT** — {A} owes {B} money and it has stopped being funny.
- Pay it out of the chest → −35 crowns, morale +10
- Make them settle it themselves → morale −4, 50/50 an injury
- Rule that debts do not exist in this company → morale +6, *and it will come back*

**WHAT {A} DID BEFORE** — Somebody recognises {A} from another life, and does not say from where.
- Ask → morale −6, *you learn something you cannot unlearn*
- Do not ask → morale +4
- Ask privately, later → morale +8, **and {A} is loyal about it**

**THE WRONG FIRE** — You have camped where somebody else camped, recently, and left in a hurry.
- Move on in the dark → −1 day, morale +4
- Stay and set a double watch → morale −6, no sleep
- Stay and take what they left → +25 crowns, morale −4
