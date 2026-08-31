#!/usr/bin/env python
# -*- coding: utf-8 -*-
u"""Build tools/enemies.html from the foedex and orphan probes.

    python tools/dev/gt.py launch
    python tools/dev/gt.py eval tools/dev/probes/foedex.js    > foedex.raw
    python tools/dev/gt.py eval tools/dev/probes/orphanart.js > orphan.raw
    python tools/dev/build_foedex.py foedex.raw orphan.raw

Nothing here AUTHORS an enemy. The probes derive every figure off the running
build (.claude/rules/enemy-stats.md: FOE_T is the one home); this script only
lays it out and joins the one authored thing in the pipeline, the hover line in
`foedex_desc.py`. Re-run all three after any statblock change.
"""
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(ROOT, 'tools', 'enemies.html')

sys.path.insert(0, HERE)
from foedex_desc import DESC              # noqa: E402

FIGHT_NAME = {
    'snare': 'The Ratkin Snare', 'brigand': 'The Broken Men', 'circle': 'The Circle',
    'pack': 'The Pack at the Fire', 'slingline': 'The Sling-line',
    'steading': 'The Steading-line', 'mother': 'The Fen-Mother',
    'mirehares': 'The Mirehares', 'warmstones': 'The Warm Stones',
    'glassroad': 'The Glass Road', 'ashdrakes': 'The Ash-drakes',
    'furnace': 'The Third Furnace', 'emberpatch': 'The Ember Patch',
    'clash': 'Blood on the Road', 'wedding': 'The Clan Wedding',
    'tavern': 'The Tap-room Brawl', 'chase': 'The Chase', 'hold': "The Hold's Men",
    'snarejoin': 'The Snare, joined', 'armour': 'Something in Armour'}

# ⛔ THE SUBGROUP IS A DISPLAY NAME FOR A DERIVED KEY, NEVER A SECOND CENSUS.
# The probe emits `fam` as `mon:<bestiary row>` for a beast (a beast IS its
# bestiary row, which is a fact the game already keeps) or `fight:<kind>` for
# everybody else (a person belongs to the side that fields them). All this table
# does is give those keys words. A key with no row here shows the key.
FAMILY = {
    'mon:wyrm': 'Great beasts of the fen', 'mon:cub': 'Great beasts of the fen',
    'mon:dog': 'Dogs', 'mon:mirehare': 'Mirehares',
    'mon:salamander': 'Ashmoor lizards', 'mon:slaghide': 'Ashmoor lizards',
    'mon:drake': 'Ashmoor lizards', 'mon:furnace': 'Ashmoor lizards',
    'mon:armour': 'Whatever it is',
    'fight:brigand': 'The Broken Men', 'fight:circle': 'The Circle',
    'fight:hold': "Grausen Hold", 'fight:snarejoin': "Grausen Hold",
    'fight:tavern': 'Tap-room and road', 'fight:chase': 'Tap-room and road',
    'fight:snare': 'The Snare clan', 'fight:slingline': 'The sling-line',
    'fight:clash': 'The road-clash', 'fight:wedding': 'The wedding party',
    'fight:steading': 'The hill steading', 'fight:reinforcements': 'The ring-eyed',
}
# the order the groups are listed in: up the road, roughly
FAMILY_ORDER = ['Tap-room and road', 'The Broken Men', 'Dogs', 'The road-clash',
                'The Snare clan', 'The sling-line', 'The wedding party',
                'The Circle', 'Grausen Hold', 'The hill steading',
                'Mirehares', 'Ashmoor lizards', 'Great beasts of the fen',
                'Whatever it is']


def load(path):
    raw = io.open(path, encoding='utf-8').read()
    raw = raw[raw.index('{'):]            # gt.py prints a "--- probe.js ---" header
    return json.loads(raw)


def derived_desc(f):
    """the fallback: the bestiary nature, else the note on the act this body is
    actually dangerous with. Longer than a hover wants, which is why DESC exists."""
    if f.get('nature'):
        return f['nature']
    acts = [a for a in f['acts'] if a.get('note') and not a.get('move')]
    if acts:
        acts.sort(key=lambda a: -(sum(a['dmg']) if a.get('dmg') else 0))
        return acts[0]['note']
    return ''


def build(d, orphans=None):
    spr, foes, missing = {}, [], []
    for f in d['foes']:
        s = f.pop('sprite', None)
        if s:
            spr[s['key']] = {'src': s['src'], 'w': s['w'], 'h': s['h']}
            f['spr'] = s['key']
        else:
            f['spr'] = ''
        f['fam'] = FAMILY.get(f['fam'], f['fam'])
        f['long'] = derived_desc(f)
        if f['name'] in DESC:
            f['desc'] = DESC[f['name']]
        else:
            f['desc'] = f['long']
            missing.append(f['name'])
        foes.append(f)
    foes.sort(key=lambda f: -f['pts'])
    for name in sorted(set(missing)):
        print('  no hover line authored for %r (using the derived one)' % name)

    data = {'built': d['built'], 'scale': d['scale'], 'hdaCut': d['hdaCut'],
            'you': d['you'], 'comps': d.get('comps', {}), 'foes': foes,
            'fights': d['fights'], 'fightName': FIGHT_NAME,
            'famOrder': FAMILY_ORDER, 'spr': spr, 'orphans': orphans}
    tpl = io.open(os.path.join(HERE, 'foedex_template.html'), encoding='utf-8').read()
    js = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    return tpl.replace('/*__FOEDEX__*/null', js)


if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'foedex.raw')
    orp = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, 'orphan.raw')
    html = build(load(src), load(orp) if os.path.exists(orp) else None)
    io.open(OUT, 'w', encoding='utf-8', newline='\n').write(html)
    print('%s  %.0f KB' % (OUT, len(html.encode('utf-8')) / 1024.0))
