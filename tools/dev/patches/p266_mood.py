# -*- coding: utf-8 -*-
"""#266 asks 4 + 5 - the pool is 100, and STEADY is the band your people open in."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = []

# ---- ask 4: the pool a body's mood is measured against is 100, not 90 -------
E.append((
 "const GIVEN={hp:60,hit:70,dodge:14,land:69,nerve:90,climb:8,opening:15,frail:.90};",
 "/* ⛔ #266 - NERVE IS 100 AND IT WAS 90. (User: *\"For morale - basic start is\n"
 "   100% (I don`t know, why some of my people have 90)\"*.) 90 was never a decision\n"
 "   anybody defends: it is the figure the ladder's ±10-a-rung was authored around,\n"
 "   so an ordinary human carried 90 and the Captain 110, and the one number on the\n"
 "   sheet a player can read without arithmetic was the odd one out.\n"
 "   ⚠ IT IS YOUR SIDE ONLY. A foe's pool is `t.mor` off its own statblock and has\n"
 "   never come through `GIVEN` (`.claude/rules/enemy-stats.md`: there is no\n"
 "   `FOE_GIVEN` and there must not be one), so this widens the measured gap rather\n"
 "   than moving both lines. It is priced with ARENA below.\n"
 "   ⚠ AND IT SOFTENS EVERY MORALE EVENT BY 11%, because `MORALE`'s figures are\n"
 "   POINTS against this pool. That is paid back by the lower opening fraction in\n"
 "   the same edit: 57 of 100 sits 15 points over SHAKEN where 64 of 90 sat 17. */\n"
 "const GIVEN={hp:60,hit:70,dodge:14,land:69,nerve:100,climb:8,opening:15,frail:.90};"))

# ---- ask 5: a sixth band, and it is where a fight opens ---------------------
E.append((
 "const NERVE_RUNGS=[['steady',.52],['shaken',.34],['breaking',.15],['routed',0]];\n"
 "const START_NERVE=0.78;   /* the neutral, as a fraction of the ceiling */",
 "/* ⛔ #266 - THE CUT-OFFS MOVED WITH `LADDER` AND THAT IS NOT OPTIONAL. The\n"
 "   comment in `restate` says these two are one fact in two places; STEADY going in\n"
 "   between Happy and Shaken moves the free band's floor .52 -> .42 and Shaken's\n"
 "   .34 -> .30. The floor and the top are untouched, which is #129's own rule. */\n"
 "const NERVE_RUNGS=[['steady',.42],['shaken',.30],['breaking',.15],['routed',0]];\n"
 "/* ⛔ #266 - AND BOTH SIDES OPEN IN THE MIDDLE OF STEADY. (User: *\"your guys\n"
 "   basic start on the middle of stead (aprox 55-60)\"*.) STEADY runs .42 to .72, so\n"
 "   its middle is .57 and that is what your side takes. The gap #244 measured\n"
 "   between the two sides is preserved exactly - .07 - which puts the foe at .64 and\n"
 "   BOTH of them inside the same band, so the note under `mor0` (*\"the enemy starts\n"
 "   on the same rung you do\"*) is true again after two entries of drift.\n"
 "   ⚡ AND ±15 IS EXACTLY HALF THE BAND, WHICH IS WHY THESE NUMBERS ARE THE ONES.\n"
 "   `moodFx().start` runs -15 to +15, so a company at HIGH SPIRITS opens on the top\n"
 "   edge of STEADY and one ON THE BRINK on its bottom edge: the company's own mood\n"
 "   is worth precisely one band and cannot be worth two. */\n"
 "const START_NERVE=0.64;   /* the neutral, as a fraction of the ceiling */"))

E.append(("const START_NERVE_YOU=0.71;", "const START_NERVE_YOU=0.57;"))

E.append((
 "  ⚠ 7% AND NOT 10: the band he named is 5-10, and the clamp under this figure",
 "  ⚡ #266 MOVED BOTH FIGURES AND KEPT THE 7 POINTS BETWEEN THEM. See the note on\n"
 "  `START_NERVE` above: the pair is .64 / .57 now, both inside the new STEADY band.\n"
 "  ⚠ 7% AND NOT 10: the band he named is 5-10, and the clamp under this figure"))

# ---- the ladder itself -----------------------------------------------------
E.append((
 "  {at:.52,n:'Happy',       ic:'\U0001f642',col:'#a3bd6c',bg:'rgba(163,189,108,.20)',\n"
 "   d:'No penalties. Full skill, full dodge.'},",
 "  /* ⛔ #266 - AND THE BAND IS SPLIT AGAIN, WHICH OVERRULES #228 WITHOUT\n"
 "     CONTRADICTING IT. (User: *\"Add intermediate more (steady) to inventory screen\n"
 "     and connected battle. And your guys basic start on the middle of stead (aprox\n"
 "     55-60)\"*.)\n"
 "     #228 merged Ok into Happy on the argument that neither should cost anything,\n"
 "     and that is KEPT: both of these are free, and both are mechanically `steady`.\n"
 "     What #228 also did, without being asked, was leave the game with no name for\n"
 "     where a body actually STANDS - a fight opened in the middle of a 38-point band\n"
 "     called Happy, so the word every player read first was the second-best rung in\n"
 "     the game and there was nothing under it but bad news.\n"
 "     ⛑ SO THE TWO FREE RUNGS SAY DIFFERENT THINGS RATHER THAN THE SAME THING\n"
 "     TWICE. Neither costs anything; what separates them is which way they are one\n"
 "     step from, and that IS information - the rule this file already allows for the\n"
 "     top band, which the engine does not act on either. A `d` reading *no penalties*\n"
 "     on both would be the furniture `.claude/rules/event-cards.md` keeps deleting.\n"
 "     ⚠ `STATES.wavering` STAYS UNREACHABLE. This is a DISPLAY band over the same\n"
 "     `steady` state, not the old rung coming back: nothing here costs a point of\n"
 "     hit or dodge, and `NERVE_RUNGS` gained no row. */\n"
 "  {at:.72,n:'Happy',       ic:'\U0001f642',col:'#a3bd6c',bg:'rgba(163,189,108,.20)',\n"
 "   d:'No penalties, and one good turn from the top rung.'},\n"
 "  /* ⛑ THE COLOUR AND THE FACE ARE `MOODSTATES`' OWN NEUTRAL (AT EASE), not a\n"
 "     seventh hue invented for this row: the company ladder and the body ladder are\n"
 "     two readouts of one idea, and the cream that means *neither glad nor sorry*\n"
 "     already exists on the map's mood chip. */\n"
 "  {at:.42,n:'Steady',      ic:'\U0001f610',col:'#c9b98a',bg:'rgba(201,185,138,.18)',\n"
 "   d:'No penalties. Where a body walks onto the field.'},"))

E.append((
 "  {at:.34,n:'Shaken',      ic:'\U0001f615',col:'#c2a86a',bg:'rgba(194,168,106,.22)',",
 "  {at:.30,n:'Shaken',      ic:'\U0001f615',col:'#c2a86a',bg:'rgba(194,168,106,.22)',"))

# ---- the one table indexed by literal position ------------------------------
E.append((
 "const FLAG_BY_RUNG=['rock',null,'low','breaking','broken'];",
 "/* ⚠ #266 - SIX ROWS NOW, AND THIS IS THE ONE TABLE HERE THAT IS INDEXED BY\n"
 "   POSITION rather than derived off the ends. STEADY carries no flag, the way Happy\n"
 "   does not: a mark that is up on the band every fight opens in marks nothing,\n"
 "   which is #228's own argument about the banner. `FLAG_SHOWN` and `FLAG_FAINT`\n"
 "   needed nothing - both count from the ENDS, which is exactly why. */\n"
 "const FLAG_BY_RUNG=['rock',null,null,'low','breaking','broken'];"))

patch(E)
print('mood ok')
