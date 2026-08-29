# -*- coding: utf-8 -*-
"""#266 asks 6 + 7 - an off-hand piece says what it does, and the find after a
   battle never hands over a common weapon."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = []

# ---- ask 6: the row's receipt is derived from every field, not from two -----
E.append((
 "  const shortGear=g=>g.dmg?(g.dmg[0]+'-'+g.dmg[1]+\n"
 "      (g.reach>1?' · reach '+g.reach:'')+(g.range?' · range '+g.range:''))\n"
 "    :(g.armour!=null?'stops '+g.armour+(g.agi?' · '+(g.agi>0?'+':'')+g.agi+' hands':''):'');",
 "  /* ⛔ #266 - AND EVERY OTHER KIND OF PIECE SAID NOTHING AT ALL. (User, arrows at\n"
 "     an OFF-HAND DIRK row, a ROUND SHIELD row and the dirk's own hover: *\"For\n"
 "     offhand dirk and shield show what they exactly do\"*.)\n"
 "     ⛑ THE TWO BRANCHES BELOW COVER WEAPONS AND COATS, AND THE SLOT THEY BOTH MISS\n"
 "     IS THE OFF HAND. A shield row read `RARE · OFF` and a dirk row `COMMON · OFF`\n"
 "     while the cook-pot beside them read `COMMON · ARMOUR · stops 12`, so the one\n"
 "     slot whose whole job is a modifier was the one slot with no figure on it -\n"
 "     which is why the ask arrives as two items and is really about a hole.\n"
 "     ⛔ DERIVED OFF THE SAME FIELDS `gearLine` READS AND NEVER A SECOND TABLE.\n"
 "     `gearLine` has printed all of these into the shop card since #200; this is the\n"
 "     SHORT form of the same walk, so a field added to a GEAR row appears on the row\n"
 "     and in the hover without a second edit, and the two mouths cannot disagree.\n"
 "     ⚠ `hush` IS OBEYED HERE TOO. A piece that declines to itemise itself (#141)\n"
 "     declines on every surface or it does not decline at all. */\n"
 "  const sgSign=v=>(v>0?'+':'−')+Math.abs(v);\n"
 "  const shortFx=g=>{\n"
 "    if(g.hush)return '';\n"
 "    const o=[];\n"
 "    if(g.dodge)o.push(sgSign(g.dodge)+' dodge');\n"
 "    if(g.hit)o.push(sgSign(g.hit)+' to hit');\n"
 "    /* #244's pair, which is the whole of what a dirk is in a swordsman's hand */\n"
 "    if(g.meleeHit)o.push(sgSign(g.meleeHit)+' to hit in melee');\n"
 "    if(g.meleeDmg)o.push(sgSign(g.meleeDmg)+' melee damage');\n"
 "    if(g.rangedDmg)o.push(sgSign(g.rangedDmg)+' bow damage');\n"
 "    if(g.windsCut)o.push('−'+g.windsCut+' mood a working');\n"
 "    if(g.spellRange)o.push('+'+g.spellRange+' working reach');\n"
 "    if(g.hp)o.push(sgSign(g.hp)+' hitpoints');\n"
 "    ['str','agi','int','mor'].forEach(s=>{if(g[s])o.push(sgSign(g[s])+' '+s.toUpperCase());});\n"
 "    /* the dirk's other half: a rule rather than a rung, and the one thing on this\n"
 "       row a figure cannot say. See `emergency` in the act builder. */\n"
 "    if(g.emergency)o.push('reaches what a bow cannot');\n"
 "    return o.join(' · ');};\n"
 "  const shortGear=g=>g.dmg?(g.dmg[0]+'-'+g.dmg[1]+\n"
 "      (g.reach>1?' · reach '+g.reach:'')+(g.range?' · range '+g.range:''))\n"
 "    :(g.armour!=null?'stops '+g.armour+(g.agi?' · '+(g.agi>0?'+':'')+g.agi+' hands':'')\n"
 "                    :shortFx(g));"))

# ---- and the hover, which had no row for either field ----------------------
E.append((
 "  if(g.hit)rows.push((g.hit>0?'Easier':'Harder')+' to land a blow (<b>'+\n"
 "    (g.hit>0?'+':'')+g.hit+'</b> to hit).');",
 "  if(g.hit)rows.push((g.hit>0?'Easier':'Harder')+' to land a blow (<b>'+\n"
 "    (g.hit>0?'+':'')+g.hit+'</b> to hit).');\n"
 "  /* ⛔ #266 - AND THE OFF-HAND DIRK'S TWO FIELDS, WHICH THIS BOX HAD NEVER READ.\n"
 "     `meleeHit`/`meleeDmg` went in with #244 and reached `gearLine` and not `tipFor`,\n"
 "     so the piece with the most conditional rule in the game opened a hover carrying\n"
 "     its flavour paragraph and not one number. The condition is in the words because\n"
 "     it is in the field name: these apply where the other hand is not a bow. */\n"
 "  if(g.meleeHit)rows.push('Easier to land the blow the OTHER hand is making (<b>'+\n"
 "    (g.meleeHit>0?'+':'')+g.meleeHit+'</b> to hit, in melee only).');\n"
 "  if(g.meleeDmg)rows.push('And it bites deeper (<b>'+(g.meleeDmg>0?'+':'')+\n"
 "    g.meleeDmg+'</b> melee damage, in melee only).');\n"
 "  if(g.emergency)rows.push('Behind a bow it is a card of its own: the one thing that '+\n"
 "    'still works with something already on top of them.');"))

# ---- and the prose is half what it was -------------------------------------
E.append((
 "           d:'Short, ugly, and drawn with the wrong hand. In the other hand it is the '+\n"
 "             'second half of a blow; behind a bow it is the only thing you own that still '+\n"
 "             'works when something is already on top of you.'},",
 "           /* ⚡ #266 - 39 WORDS TO 20 (*\"Shorten text for dirk twice\"*), AND IT IS\n"
 "              AFFORDABLE BECAUSE THE MECHANICS LEFT THE PROSE IN THE SAME EDIT. Both\n"
 "              halves of the old sentence were describing `meleeHit`/`meleeDmg` and\n"
 "              `emergency`, which the row and the hover now derive; what a `d` is for\n"
 "              is the thing no field carries, and that is the wrong hand. */\n"
 "           d:'Short, ugly, and drawn with the wrong hand. Behind a bow it is the only '+\n"
 "             'thing you own that still works up close.'},"))

# ---- ask 7: the step-down tier is never a weapon ---------------------------
E.append((
 "  const tiers=[tier,tier==='epic'?'rare':'common'];\n"
 "  const order=slotOrder();\n"
 "  for(const tr of tiers)for(const s of order){\n"
 "    const p=findPool(tr,s);if(p.length)return pickOne(p);}\n"
 "  /* the slot preference goes first, then the duplicate guard */\n"
 "  for(const tr of tiers){const p=findPool(tr);if(p.length)return pickOne(p);}\n"
 "  for(const tr of tiers){const p=findPool(tr,null,true);if(p.length)return pickOne(p);}\n"
 "  return null;",
 "  const tiers=[tier,tier==='epic'?'rare':'common'];\n"
 "  const order=slotOrder();\n"
 "  /* ⛔ #266 - THE COMMON TIER IS NEVER A MAIN-HAND WEAPON, AND THE RULE WAS\n"
 "     ALREADY WRITTEN DOWN ONE FUNCTION AWAY. (User: *\"For after battle don`t give a\n"
 "     common weapon as bonus\"*.)\n"
 "     `rollRack` calls `take('common',true)` and its note says in capitals: *THE\n"
 "     COMMON ROW IS NEVER A MAIN-HAND WEAPON, WHICH IS THE USER'S OWN PARENTHESIS AND\n"
 "     IS THE ROW'S WHOLE JOB. A cheap sword is the thing a company already has six\n"
 "     of.* That is the same sentence he has now said about the find, and the find is\n"
 "     where it never got applied - `common` is only ever reached here as the STEP\n"
 "     DOWN from an empty rare pool, which is exactly the roll that produces a cheap\n"
 "     sword nobody wanted, on the screen that has just announced a prize.\n"
 "     ⚠ IT IS A REFUSAL AND NOT A RE-ROLL: the walk simply skips `main` on that tier\n"
 "     and falls through to the next slot, the way `rollRack` does. `rare` and `epic`\n"
 "     are untouched, so the serjeant's sword is still a thing a fight can hand over.\n"
 "     ⚠ AND IT MAY LEAVE THE FIND EMPTY where a one-race company has bought the\n"
 "     common non-weapon pool out. `rollFind` has always been allowed to return null;\n"
 "     the caller (`consequences`) draws nothing extra and the haul is untouched. */\n"
 "  const noMain=(tr,list)=>tr==='common'?list.filter(k=>GEAR[k].slot!=='main'):list;\n"
 "  for(const tr of tiers)for(const s of order){\n"
 "    if(tr==='common'&&s==='main')continue;\n"
 "    const p=noMain(tr,findPool(tr,s));if(p.length)return pickOne(p);}\n"
 "  /* the slot preference goes first, then the duplicate guard */\n"
 "  for(const tr of tiers){const p=noMain(tr,findPool(tr));if(p.length)return pickOne(p);}\n"
 "  for(const tr of tiers){const p=noMain(tr,findPool(tr,null,true));\n"
 "    if(p.length)return pickOne(p);}\n"
 "  return null;"))

patch(E)
print('gear ok')
