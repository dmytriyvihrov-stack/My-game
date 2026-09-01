#!/usr/bin/env python
# -*- coding: utf-8 -*-
u"""Build tools/artifacts.html from the gear probe.

    python tools/dev/gt.py launch
    python tools/dev/gt.py eval tools/dev/probes/gear.js > gear.raw
    python tools/dev/build_gear.py gear.raw

Nothing here AUTHORS an artifact. `tools/dev/probes/gear.js` derives every
figure off the running build - the row in GEAR{}, the price gearPrice() charges,
the break-down scrapPay() pays, the painting ITEM_ICON points at, and the cards
that hand the thing over - so a gear change moves this file by itself. All this
script does is lay it out and give the field keys words.

The gear twin of build_foedex.py, and it imports that file's FIGHT_NAME rather
than retyping twenty fight titles: one fact, one builder.
"""
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(ROOT, 'tools', 'artifacts.html')

sys.path.insert(0, HERE)
from build_foedex import FIGHT_NAME              # noqa: E402

# ⛔ A KEY WITH NO ROW HERE SHOWS THE KEY, which is the same contract FAMILY has
# in build_foedex.py. A field written onto a gear row next month appears in this
# tool untaught, wearing its raw name, instead of silently vanishing.
# The second element is 1 when the figure is a BONUS and reads better signed.
EFF_LABEL = {
    'armour': [u'armour', 0], 'dodge': [u'dodge', 1], 'hit': [u'to hit', 1],
    'str': [u'STR', 1], 'agi': [u'AGI', 1], 'int': [u'INT', 1], 'mor': [u'MOR', 1],
    'hp': [u'hitpoints', 1],
    'rangedDmg': [u'ranged damage', 1], 'meleeHit': [u'to hit up close', 1],
    'meleeDmg': [u'damage up close', 1],
    'windsCut': [u'a working costs less mood', 0],
    'spellRange': [u'a working reaches further', 1],
    'push': [u'pushes back', 0], 'pointBlank': [u'no penalty point-blank', 0],
    'reload': [u'reload', 0], 'emergency': [u'drawn in an emergency', 0],
    'heal': [u'heals', 0], 'uses': [u'uses a fight', 0],
    'company': [u'works from the baggage, takes no slot', 0],
    'coCrowns': [u'the company takes more coin', 0],
    'coMor': [u'the company keeps more heart', 0],
    'coFood': [u'the company eats less', 0],
    'hush': [u'says nothing about itself', 0],
    'forRace': [u'only for a', 0], 'forCls': [u'only for the', 0],
    'bonus': [u'and then', 0], 'bonusD': [u'', 0],
}

SLOT_NAME = {'main': u'MAIN HAND', 'off': u'OFF HAND', 'armour': u'ARMOUR',
             'trinket': u'TRINKET', 'bag': u'THE BAG'}
SLOT_ORDER = ['main', 'off', 'armour', 'trinket', 'bag']

# what a source row is called on screen. `code` is deliberately loud: it is a
# grant nothing on a table can see, and the reader wants to know that.
SOURCE_NAME = {
    'start': [u'DAY ONE', u'the four you begin with, and what is in the cart'],
    'hire': [u'A HIRE', u'what a trade arrives holding'],
    'loot': [u'THE FIELD', u'picked off the dead, per fight'],
    'road': [u'THE ROAD', u'a card in EVENTS hands it over'],
    'fire': [u'THE FIRE', u'a card in CAMPS hands it over'],
    'vignette': [u'THE ROAD, IN PASSING', u'a vignette hands it over'],
    'forge': [u'THE FORGE', u'made at the Old Camp for salvage and gems'],
    'code': [u'IN CODE', u'handed over by a function, not off a table'],
}
SOURCE_ORDER = ['start', 'hire', 'loot', 'road', 'fire', 'vignette', 'forge', 'code']


def load(path):
    raw = io.open(path, encoding='utf-8').read()
    raw = raw[raw.index('{'):]            # gt.py prints a "--- probe.js ---" header
    return json.loads(raw)


def build(d):
    d['effLabel'] = EFF_LABEL
    d['slotName'] = SLOT_NAME
    d['slotOrder'] = SLOT_ORDER
    d['sourceName'] = SOURCE_NAME
    d['sourceOrder'] = SOURCE_ORDER
    d['fightName'] = FIGHT_NAME
    # the one thing worth saying out loud on the console, because it is the row
    # a reader cannot explain: painted, priced, and nothing can hand it over
    dead = [i['key'] for i in d['items'] if not i['sources'] and not i['rollable']]
    for k in dead:
        print('  nothing in the game can hand over %r' % k)
    for s in d.get('stale', []):
        print('  %s says %s %s and the row pays %s (%s)'
              % (s['key'], s['says'], s['field'], s['pays'], s['where']))
    tpl = io.open(os.path.join(HERE, 'gear_template.html'), encoding='utf-8').read()
    js = json.dumps(d, ensure_ascii=False, separators=(',', ':'))
    return tpl.replace('/*__ARMOURY__*/null', js)


if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'gear.raw')
    html = build(load(src))
    io.open(OUT, 'w', encoding='utf-8', newline='\n').write(html)
    print('%s  %.0f KB' % (OUT, len(html.encode('utf-8')) / 1024.0))
