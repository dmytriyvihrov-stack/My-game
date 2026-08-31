# -*- coding: utf-8 -*-
u"""The one-line description of every body, keyed by name.

(User, 2026-08-31: "Make description short and clear (one senctence), that they
could be shown on hover in the battle screen".)

⛔ THIS IS THE ONE FILE IN THE FOE DEX PIPELINE THAT IS AUTHORED, and it is
authored because the thing it holds does not exist anywhere in the build. The
derived fallback was the bestiary `nature` line or the note on an act, and both
are two or three sentences written for a card the player is reading at rest. A
hover on a battle screen is read in a second, over a body somebody is about to
swing at, so it gets ONE sentence and it says what this thing DOES TO YOU.

⛔ IT IS KEYED ON THE NAME AND NOT ON THE VARIANT. Two tables use `spear` for
two different creatures ("Ratkin, spear" and "Marked, spear"); no two creatures
share a name.

⚠ A NAME WITH NO ROW HERE FALLS BACK TO THE DERIVED LINE rather than to nothing,
so a new statblock is never described by an empty box. `python
tools/dev/build_foedex.py` prints what is missing.

The nine voice rules in docs/README.md §4 bind here like anywhere else: no em
dash, no adjective doing a noun's job, and every line pays rent.
"""

DESC = {
    # ── beasts ────────────────────────────────────────────────────────────
    'The cub':            u'It will not fight, and it will not stop trying to be somewhere else.',
    'The Bitch':          u'The one the pack is watching; while she stands they will not scatter.',
    'Hold hound':         u'Off the leash-ring, and it bites the man at the end of your line.',
    'Lurcher':            u'It bites and it is two hexes away before you can answer.',
    'Runt':               u'The fastest thing on the field and the easiest to kill, in that order.',
    'Ash-drake':          u'Its breath goes through the first of you and finds the second.',
    'The Third Furnace':  u'Four hexes of animal, and the tail does not aim at one of you.',
    'Mirehare doe':       u'She only travels by a three-hex landing, and the blow lands where she does.',
    'Mirehare buck':      u'He only travels in a straight line, and he hits the first thing on it.',
    'Cinder salamander':  u'The bite is nothing; the ground it leaves burns through any armour.',
    'Slag-hide':          u'You do not see it until the tongue has already taken somebody.',
    'The Fen-Mother':     u'She does not out-damage you. She takes your line apart and drags it under.',
    'Something in armour': u'There is no behind: the sword goes all the way round, every turn.',

    # ── the deserters ─────────────────────────────────────────────────────
    'The broken captain': u'He held a company together once and is holding this one together now.',
    'Deserter, sword':    u'A soldier with nowhere to be, still swinging the way he was taught.',
    'Poacher':            u'He shoots the one furthest from help and moves before you look up.',

    # ── the tap-room, and what followed you out ───────────────────────────
    'Harl the carter':    u'Loud, drunk, and the reason the rest of them stood up.',
    'Brakk':              u'A big man with a cudgel and no idea what he has walked into.',
    'Tull':               u'He is swinging a stool, and he is not going to be quick about it.',
    'Weft':               u'The quiet one with the boning knife, and he is very hard to hit.',
    'Osper':              u'Fists, no armour, and second thoughts already arriving.',
    'The carter':         u'He started this in the tap-room and he has brought friends.',
    'The big one off the wharf': u'A cargo maul and the shoulders to swing it twice.',
    'The thin one':       u'Sober, unhurried, and holding the only knife that worries you.',
    'The small one':      u'He waits for somebody to turn their back, and he is patient.',

    # ── the Circle ────────────────────────────────────────────────────────
    'The one who talks':  u'He does the talking, and killing him changes nothing about the other nine.',
    'Marked, hatchet':    u'A hatchet through good armour, and he will not run from it.',
    'Marked, spear':      u'He holds the rank and reaches two hexes into yours.',
    'Marked, knife':      u'Quick, close, and impossible to pin down in a line.',
    'Marked, sling':      u'Standing still in the open is what he is counting on.',

    # ── the Hold ──────────────────────────────────────────────────────────
    'Hold serjeant':      u'The crest in the middle, and the reason the line does not break.',
    'Hold corporal':      u'A pole-axe in trained hands, which is the hardest melee outside an ogre.',
    'Hold billman':       u'He braces and holds two hexes of road, and he is paid to.',
    'Hold crossbow':      u'A windlass bow that punches plate, wound slowly and aimed well.',

    # ── the ogres ─────────────────────────────────────────────────────────
    'Ogre, club':         u'One swing takes everything standing next to it, so do not stand in a ring.',
    'Ogre, clan-hired':   u'Bought by the clans, and the answer to being surrounded is to sweep.',
    'Ogre, one-word':     u'He knows one working, he almost always misses, and when he lands it kills.',
    'Steading-elder':     u'The oldest thing on the wall, and the only one who gives orders.',
    'Ogre, long pike':    u'Four hexes of reach, so he never has to let you close.',
    'Ogre, stone maul':   u'A slow, wide swing that goes through the harness and the man in it.',
    'Ogre, stone-thrower': u'He throws whatever is on the ground, and the ground is a hillside.',

    # ── the clans ─────────────────────────────────────────────────────────
    'Ratkin chieftain':   u'The maul and the crest, and the rest of the Snare is watching him.',
    'Ratkin, cleaver':    u'Close, cheap, and there are always more of them coming.',
    'Ratkin, spear':      u'He jabs from the second rank and never has to be in the first.',
    'Ratkin, long spear': u'He sets the spear and makes walking into his hex expensive.',
    'Ratkin slinger':     u'Five hexes of sling, aimed at whoever is standing in the open.',
    'Sling-master':       u'He picks the target the whole line then shoots at.',
    'Warp-sniffer':       u'The light he throws goes straight through armour, and he is good at it.',
    'Ratkin warp-sniffer': u'The light he throws goes straight through armour, and he is good at it.',
    'Ratkin, hook-pole':  u'The pole drags one of yours out of the line, which is the whole point of it.',

    # ── the wedding ───────────────────────────────────────────────────────
    'The groom':          u'The only body here fighting at fighting speed, and he is standing in front of her.',
    'The bride':          u'The weakest thing in the game, and she does not leave.',
    'Wedding guest':      u'Drunk, unarmed, in festival clothes, and in your way.',
    'Guest, with a jug':  u'He has a jug, and he genuinely believes it is a weapon.',
    'The aunt with the roasting spit': u'She got to the fire first and she is holding the only long thing at the table.',
}
