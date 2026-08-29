# -*- coding: utf-8 -*-
"""#266 ask 7, the other door - the two authored hauls that hand over a common
   weapon, and the check that stops a third being written."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = []

# ---- the dirk's prose, the rest of the way down -----------------------------
E.append((
 "           d:'Short, ugly, and drawn with the wrong hand. Behind a bow it is the only '+\n"
 "             'thing you own that still works up close.'},",
 "           d:'Short, ugly, and drawn with the wrong hand. Behind a bow it is the only '+\n"
 "             'thing that works up close.'},"))

# ---- the clash's spear ------------------------------------------------------
E.append((
 "  clash:[\n"
 "    {t:'Their spears and whatever the slings were made of.',c:'a boar spear · +3 salvage',\n"
 "     fx:{salvage:3},gear:'spear'},",
 "  /* ⛔ #266 - AND THE BOAR SPEAR COMES OFF THIS ROW. (User: *\"For after battle\n"
 "     don`t give a common weapon as bonus\"*.) `rollFind` is the other door and it is\n"
 "     shut in the same edit; this is the one the player actually meets, because the\n"
 "     find only ever steps down to `common` on an emptied pool and a LOOT row is\n"
 "     dealt every fight. A BOAR SPEAR is `rarity:'common'` and Vesna is holding one\n"
 "     on the screen where this lands, which is the whole of what makes it read as\n"
 "     junk rather than as a prize.\n"
 "     ⚠ THE SALVAGE IS 8 AND THE ROW PAYS 4: #239's `salvageCut` halves anything\n"
 "     over three, so an authored figure is an amount of STUFF and never an amount of\n"
 "     pay. It was 3 paid 3; it is 4 now, which is the spear's weight in iron and not\n"
 "     a replacement for it. */\n"
 "  clash:[\n"
 "    {t:'Their spears and whatever the slings were made of, broken down for the iron.',\n"
 "     c:'+4 salvage',fx:{salvage:8}},"))

# ---- and the Snare's ---------------------------------------------------------
E.append((
 "    {t:'Take the slinger’s kit and the good spear.',c:'a full quiver and a boar spear',gear2:['quiver','spear']},",
 "    /* #266 - the same cut. The quiver is the kit and it is the thing worth taking;\n"
 "       the spear was a second common weapon on a row that already had one prize. */\n"
 "    {t:'Take the slinger’s kit, and every stone left in the bags.',\n"
 "     c:'a full quiver · +2 salvage',fx:{salvage:4},gear:'quiver'},"))

# ---- and the rule is checked, not remembered --------------------------------
E.append((
 "      if(!Object.keys(FIELDS).some(f=>FIELDS[f].t===k))\n"
 "        hit('structure','TERRAIN.'+k,'carries the pit dial and no FIELDS row is '+\n"
 "          'fought on it, so nothing in the act can ever have a hole in it');\n"
 "    });\n"
 "  })();",
 "      if(!Object.keys(FIELDS).some(f=>FIELDS[f].t===k))\n"
 "        hit('structure','TERRAIN.'+k,'carries the pit dial and no FIELDS row is '+\n"
 "          'fought on it, so nothing in the act can ever have a hole in it');\n"
 "    });\n"
 "  })();\n"
 "  /* ═══ ⛔ 8j (#266) - A HAUL MAY NOT HAND OVER A COMMON WEAPON ════════════\n"
 "     (User: *\"For after battle don`t give a common weapon as bonus\"*.)\n"
 "     There are two doors out of a battle and the rule has to hold on both.\n"
 "     `rollFind` refuses it in code, where the pool is rolled; a LOOT row is\n"
 "     AUTHORED, so nothing in the build can stop the next one being written that way\n"
 "     - and this is the shape `rollRack`'s own note has carried since #248 without\n"
 "     anything ever asserting it. A cheap sword is the thing a company already has\n"
 "     six of, and a prize screen that hands one over reads as the game having\n"
 "     nothing to give.\n"
 "     ⛑ PROVED BY MAKING IT FIRE: `gear:'spear'` put back on the clash's first row\n"
 "     reported *clash hands over a common main-hand weapon (Boar spear)*; taken off\n"
 "     again the linter is silent. ⚠ `gear2` counts, and the row that shipped this\n"
 "     defect the second time was a `gear2` - a check that reads only `gear` would\n"
 "     have passed the Snare. */\n"
 "  (function commonWeaponHaul(){\n"
 "    Object.keys(LOOT).forEach(k=>LOOT[k].forEach(l=>{\n"
 "      [].concat(l.gear||[],l.gear2||[]).forEach(g=>{const G2=GEAR[g];\n"
 "        if(G2&&G2.slot==='main'&&(G2.rarity||'common')==='common')\n"
 "          hit('content','LOOT.'+k,'hands over a common main-hand weapon ('+G2.n+\n"
 "            ') - see rollFind and rollRack, which both refuse one');});}));\n"
 "  })();"))

patch(E)
print('loot ok')
