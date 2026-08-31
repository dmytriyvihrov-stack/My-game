# -*- coding: utf-8 -*-
u"""One creature, authored once, and a fight names only what differs.

(User, 2026-08-31: "to merge same units (ogre club and ogr clan-hired). It is
one unit in two contexts. Same with smaller rats. I prefere to handmade specific
characteristics in the specific battle, rather then havin multiple entieties".)

#263 put every statblock in one registry and #276 put them in one block. Both
left the same creature written out three times: RATKIN SLINGER is authored in
the snare, the clash AND the sling-line, and the clash's OGRE, CLUB and the
snare's OGRE, CLAN-HIRED are the same animal with two names. Change what a
ratkin slinger is and you have to find three rows.

`FOE_BASE` is the creature. A fight's row says `from:'<base>'` and then ONLY the
numbers that fight tunes, which is the ask in one line: hand-made characteristics
in the specific battle, one entity behind them.

⛔ NOT ONE FIGURE MOVES. Every delta is the number that row already carried; the
oracle over all twenty sides is what says so, run twice a build so the four
kinds that roll their own cast are told from a real change.

⚠ `acts` WINS WHOLE, which is `t.st`'s own rule. A fight that re-dices a weapon
restates the act; a half-inherited act list would be a second author. The bases
are chosen so exactly ONE member of each family has to.

⛔ AND THE ORACLE EARNED ITS KEEP ON THE FIRST RUN. The clash's slinger dodges 20
and the base (the sling-line's) dodges 22, and the delta list left `dodge` out -
so a merge advertised as changing nothing moved one number on one body. It is
the single failure mode of this whole shape: a field you FORGET to list silently
takes the base's value, and nothing but a field-by-field diff of both sides can
see it. Run the oracle twice a build, every time a row here changes.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import read, write            # noqa: E402

MARK = 'const FOE_BASE='

# ── the block, dropped in above the statblock region ─────────────────────
BASE = u"""/* ═══ ⛔ FOE_BASE · ONE CREATURE, AUTHORED ONCE ══════════════════
   (User, 2026-08-31: *"to merge same units (ogre club and ogr clan-hired). It is
   one unit in two contexts. Same with smaller rats. I prefere to handmade specific
   characteristics in the specific battle, rather then havin multiple entieties"*.)

   #263 put every statblock in one registry and the block below put them in one
   place. Neither stopped the same creature being written out three times: a
   RATKIN SLINGER was authored in the snare, the clash AND the sling-line, and the
   clash's OGRE, CLUB and the snare's OGRE, CLAN-HIRED are the same animal wearing
   two names. Changing what a ratkin slinger IS meant finding three rows and
   getting all three right.

   ⛑ A FIGHT'S ROW SAYS `from:'<base>'` AND THEN ONLY WHAT THAT FIGHT TUNES.
   The creature is here; the tuning is where the fight is, which is the ask
   exactly. `foeInherit()` below expands them once, at declaration time, so every
   reader downstream - `build`, `LINT`, the dev bench, the foe dex - goes on seeing
   a complete row and not one of them had to learn anything.

   ⛔ NOT ONE FIGURE MOVED IN THE MERGE. Every delta is the number that row
   already carried, and the oracle over all twenty sides is what says so.

   ⚠ `acts` WINS WHOLE, which is `t.st`'s own rule one field across: a fight
   that re-dices a weapon restates the act, because a half-inherited act list
   would be a second author. The bases below are chosen so exactly ONE member of
   each family has to do it.

   ⚠ AND A BASE IS NOT A FIGHT. Nothing in `FOE_BUILD` names one; a base with
   no `from:` pointing at it is dead weight, and `LINT` 8i says so.
   ═════════════════════════════════════════════════════════════════ */
const FOE_BASE={
  /* the clan spearman. The Snare's numbers are the base; Blood on the Road
     fields a tougher, quicker one (#8f.29's three-round problem). */
  ratspear:{kind:'ratkin',name:'Ratkin, spear',hp:36,armour:32,mor:58,skill:54,dodge:18,speed:4,
    acts:[{k:'jab',n:'JAB',cost:1,reach:2,dmg:[10,15],am:.60,ft:.30}]},
  /* the clan slinger. #135 gave every sling five hexes. ⚠ THE SLING-LINE IS THE
     BASE and the Snare is the one member that re-dices, because two of the three
     already agreed on 10-16 and the base that restates least is the right one. */
  ratsling:{kind:'ratkin',name:'Ratkin slinger',hp:28,armour:16,mor:50,skill:59,dodge:22,speed:5,
    bow:true,acts:[{k:'sling',n:'SLING',cost:1,range:5,dmg:[10,16],am:.50,ft:.40}]},
  /* the clan's caster. The Snare's is the base; the sling-line's reaches one
     hex further and is called by the short name. */
  ratsniffer:{kind:'ratkin',name:'Ratkin warp-sniffer',hp:32,armour:20,mor:48,skill:47,dodge:20,
    speed:4,caster:true,acts:[
      {k:'warp',n:'WARP-LIGHT',cost:2,strain:14,range:3,dmg:[15,23],am:0,ft:1,arcane:true},
      {k:'jab',n:'JAB',cost:1,reach:1,dmg:[7,11],am:.4,ft:.3}]},
  /* the ogre with a club, which is the user's own example of the fault. Blood
     on the Road's is the base - it is the first one the player meets - and the
     Snare's is the same animal, hired, wearing clan harness.
     ⚠ #46 - the throw is NOT written here. Every ogre on the field, either side,
     gets it from RACESKILL in the same place: the same synergy aimed at you, out
     of one definition. */
  ogreclub:{kind:'ogre',name:'Ogre, club',hp:124,armour:27,mor:96,skill:53,dodge:8,speed:3,
    acts:[{k:'club',n:'WARCLUB',cost:1,reach:1,dmg:[22,33],am:1.28,ft:.24},
          {k:'sweep',n:'SWEEP',cost:2,reach:1,sweep:true,dmg:[17,26],am:1.12,ft:.20}]},
  /* ⛑ THE FOUR DOGS ARE ONE DOG, AND THE BUILD SAID SO BEFORE ANYBODY ASKED:
     the Hold hound's own comment reads *"Same lurcher the deserters run, better
     fed"*, and #245 already merged the four captions on the grounds that they
     were one creature. The runt is a smaller one and the Bitch is not in here -
     she carries an aura and a crest, which is a different animal. */
  lurcher:{kind:'dog',name:'Lurcher',hp:26,armour:6,mor:44,skill:58,dodge:31,speed:5,
    /* #245 - the note is DERIVED from `bounce` (see `actNote`), so all four dogs
       say the same thing and every one of them says the ringed half. Two of the
       four carried the sentence and two carried nothing at all, which is the
       drift a hand-copied caption always has. */
    acts:[{k:'snap',n:'SNAP-AND-AWAY',cost:1,reach:1,dmg:[9,15],am:.35,ft:.55,bounce:2}]}
};
"""

RESOLVER = u"""/* ⛑ THE ONE EXPANSION, AT DECLARATION TIME AND NOWHERE ELSE. Every reader
   downstream - `build`, `LINT`, `devFoeCatalog`, the foe dex, the oracle - goes on
   seeing a complete row, so not one of them had to learn what `from:` is. A
   resolver called from `build()` instead would have to be called from six places
   and would be forgotten by the seventh.
   ⚠ IT WALKS `FOE_T` AND `FOE_T` SHARES TABLES (`hold` and `snarejoin` are one
   object, the five lizard fights are one object), so it is guarded against
   expanding the same table twice - which would be harmless today and is exactly
   the kind of thing that stops being harmless.
   ⚠ THE ACTS ARRAY IS SHALLOW-COPIED per inheriting row. `build()` already
   copies each act object before trimming its dice, so the objects are shared the
   way they always were; what this stops is a future in-place edit to one fight's
   act LIST reaching another fight. */
function foeInherit(){
  const done=[];
  Object.keys(FOE_T).forEach(f=>{
    const T=FOE_T[f];
    if(!T||done.indexOf(T)>=0)return;
    done.push(T);
    Object.keys(T).forEach(v=>{
      const t=T[v];
      if(!t||!t.from)return;
      const b=FOE_BASE[t.from];
      if(!b)throw new Error('FOE_BASE has no "'+t.from+'", asked for by '+f+'.'+v);
      const out=Object.assign({},b,t);
      delete out.from;
      out.acts=(t.acts||b.acts||[]).slice();
      T[v]=out;
    });
  });
}
foeInherit();
"""

# ── (old, new) for every row that becomes a delta ────────────────────────
ROWS = [
    # --- CLASH_T ---------------------------------------------------------
    (u"""  ratspear:{kind:'ratkin',name:'Ratkin, spear',hp:46,armour:34,mor:72,skill:53,dodge:18,speed:5,
    acts:[{k:'jab',n:'JAB',cost:1,reach:2,dmg:[10,15],am:.60,ft:.30}]},
  ratsling:{kind:'ratkin',name:'Ratkin slinger',hp:38,armour:22,mor:66,skill:57,dodge:20,speed:5,
    bow:true,acts:[{k:'sling',n:'SLING',cost:1,range:5,dmg:[10,16],am:.50,ft:.40}]},   /* #135 */""",
     u"""  /* the first fight has to LAST long enough to teach (playtest #6), so the two
     clan bodies here are the base creature with more meat and more nerve. */
  ratspear:{from:'ratspear',hp:46,armour:34,mor:72,skill:53,speed:5},
  ratsling:{from:'ratsling',hp:38,armour:22,mor:66,skill:57,dodge:20,speed:5},"""),

    (u"""  ogreclub:{kind:'ogre',name:'Ogre, club',hp:124,armour:27,mor:96,skill:53,dodge:8,speed:3,
    acts:[{k:'club',n:'WARCLUB',cost:1,reach:1,dmg:[22,33],am:1.28,ft:.24},
          {k:'sweep',n:'SWEEP',cost:2,reach:1,sweep:true,dmg:[17,26],am:1.12,ft:.20}]}
};""",
     u"""  /* the base animal, unchanged: this is the fight its numbers were tuned in */
  ogreclub:{from:'ogreclub'}
};"""),

    # --- HOLD_T ----------------------------------------------------------
    (u"""  hound:{kind:'dog',name:'Hold hound',hp:30,armour:10,mor:62,skill:60,dodge:30,speed:5,
    acts:[{k:'snap',n:'SNAP-AND-AWAY',cost:1,reach:1,dmg:[10,16],am:.40,ft:.55,bounce:2}]}
};""",
     u"""  /* off the leash-ring. The same lurcher the deserters run, better fed - which
     the comment here said in those words long before the base existed. */
  hound:{from:'lurcher',name:'Hold hound',hp:30,armour:10,mor:62,skill:60,dodge:30,
    acts:[{k:'snap',n:'SNAP-AND-AWAY',cost:1,reach:1,dmg:[10,16],am:.40,ft:.55,bounce:2}]}
};"""),

    # --- SNARE_T ---------------------------------------------------------
    (u"""    spear:{kind:'ratkin',name:'Ratkin, spear',hp:36,armour:32,mor:58,skill:54,dodge:18,speed:4,
      acts:[{k:'jab',n:'JAB',cost:1,reach:2,dmg:[10,15],am:.60,ft:.30}]},""",
     u"""    spear:{from:'ratspear'},"""),

    (u"""    slinger:{kind:'ratkin',name:'Ratkin slinger',hp:30,armour:22,mor:52,skill:59,dodge:20,speed:4,
      bow:true,acts:[{k:'sling',n:'SLING',cost:1,range:5,dmg:[11,17],am:.50,ft:.40}]},   /* #135 */
    sniffer:{kind:'ratkin',name:'Ratkin warp-sniffer',hp:32,armour:20,mor:48,skill:47,dodge:20,
      speed:4,caster:true,acts:[
      {k:'warp',n:'WARP-LIGHT',cost:2,strain:14,range:3,dmg:[15,23],am:0,ft:1,arcane:true},
      {k:'jab',n:'JAB',cost:1,reach:1,dmg:[7,11],am:.4,ft:.3}]},""",
     u"""    /* the Snare's slinger is a point heavier on every die than the sling-line's,
       which is the one place in this family that restates its weapon */
    slinger:{from:'ratsling',hp:30,armour:22,mor:52,dodge:20,speed:4,
      acts:[{k:'sling',n:'SLING',cost:1,range:5,dmg:[11,17],am:.50,ft:.40}]},
    sniffer:{from:'ratsniffer'},"""),

    (u"""    hired:{kind:'ogre',name:'Ogre, clan-hired',hp:92,armour:64,mor:80,skill:53,dodge:8,speed:3,
      /* #46 — the throw is no longer written here. Every ogre on the field,
         either side, gets it from RACESKILL in the same place: the same
         synergy aimed at you, out of one definition. */
      acts:[{k:'club',n:'WARCLUB',cost:1,reach:1,dmg:[23,34],am:1.28,ft:.24},
            {k:'sweep',n:'SWEEP',cost:2,reach:1,sweep:true,dmg:[18,27],am:1.12,ft:.20}]},""",
     u"""    /* THE USER'S OWN EXAMPLE: the same ogre as Blood on the Road's, hired by the
       clans and wearing clan harness. Less meat, more than twice the plate, and a
       point on every die. */
    hired:{from:'ogreclub',name:'Ogre, clan-hired',hp:92,armour:64,mor:80,
      acts:[{k:'club',n:'WARCLUB',cost:1,reach:1,dmg:[23,34],am:1.28,ft:.24},
            {k:'sweep',n:'SWEEP',cost:2,reach:1,sweep:true,dmg:[18,27],am:1.12,ft:.20}]},"""),

    # --- BRIG_T ----------------------------------------------------------
    (u"""    dog:{kind:'dog',name:'Lurcher',hp:26,armour:6,mor:44,skill:58,dodge:31,speed:5,
      /* #245 - the note is DERIVED from `bounce` now (see `actNote`), so all four
         dogs in the game say the same thing and every one of them says the
         ringed half. Two of the four carried this sentence and two carried
         nothing at all, which is the drift a hand-copied caption always has. */
      acts:[{k:'snap',n:'SNAP-AND-AWAY',cost:1,reach:1,dmg:[9,15],am:.35,ft:.55,
        bounce:2}]}
  };""",
     u"""    /* the base animal, unchanged */
    dog:{from:'lurcher'}
  };"""),

    # --- PACK_T ----------------------------------------------------------
    (u"""    lurch:{kind:'dog',name:'Lurcher',hp:26,armour:6,bare:true,mor:44,skill:58,dodge:31,speed:5,
      acts:[{k:'snap',n:'SNAP-AND-AWAY',cost:1,reach:1,dmg:[9,15],am:.35,ft:.55,bounce:2}]},
    runt:{kind:'dog',name:'Runt',hp:20,armour:4,bare:true,mor:38,skill:55,dodge:33,speed:6,
      acts:[{k:'snap',n:'SNAP-AND-AWAY',cost:1,reach:1,dmg:[7,12],am:.30,ft:.55,bounce:2}]}
  };""",
     u"""    /* #269 - `bare` at the fire: a dog is a dog, and the harness goes into the meat.
       The only thing separating the pack's lurcher from the deserters' one. */
    lurch:{from:'lurcher',bare:true},
    runt:{from:'lurcher',name:'Runt',hp:20,armour:4,bare:true,mor:38,skill:55,dodge:33,speed:6,
      acts:[{k:'snap',n:'SNAP-AND-AWAY',cost:1,reach:1,dmg:[7,12],am:.30,ft:.55,bounce:2}]}
  };"""),

    # --- SLING_T ---------------------------------------------------------
    (u"""    slinger:{kind:'ratkin',name:'Ratkin slinger',hp:28,armour:16,mor:50,skill:59,dodge:22,speed:5,
      bow:true,acts:[{k:'sling',n:'SLING',cost:1,range:5,dmg:[10,16],am:.50,ft:.40}]},   /* #135 */""",
     u"""    /* the base creature, unchanged: the sling-line is the fight it is named for */
    slinger:{from:'ratsling'},"""),
]

SNIFFER_OLD = u"""    sniffer:{kind:'ratkin',name:'Warp-sniffer',hp:30,armour:18,mor:48,skill:47,dodge:20,speed:4,
      caster:true,acts:["""
SNIFFER_NEW = u"""    /* one hex further than the Snare's, and known by the short name here */
    sniffer:{from:'ratsniffer',name:'Warp-sniffer',hp:30,armour:18,
      acts:["""


def main():
    s, crlf = read()
    if MARK in s:
        print('already merged; nothing to do')
        return
    if 'THE SEVEN THAT WERE STILL SCATTERED' not in s:
        raise SystemExit('REFUSED: run foegroup.py first')

    for old, new in ROWS:
        if s.count(old) != 1:
            raise SystemExit('REFUSED: a row anchor matched %d times:\n%s'
                             % (s.count(old), old[:90]))
        s = s.replace(old, new)

    # the sling-line's sniffer keeps its act list; only its head changes
    if s.count(SNIFFER_OLD) != 1:
        raise SystemExit('REFUSED: sniffer anchor matched %d' % s.count(SNIFFER_OLD))
    s = s.replace(SNIFFER_OLD, SNIFFER_NEW)

    # FOE_BASE goes above the statblock region, the resolver below FOE_BUILD
    head = u'/* ═══ ⛔ THE SEVEN THAT WERE STILL SCATTERED'
    i = s.index(head)
    s = s[:i] + BASE + s[i:]

    tail = u'const FOE_BUILD={mother:beasts,'
    j = s.index(tail)
    k = s.index(u'};\n', j) + 3
    s = s[:k] + RESOLVER + s[k:]

    write(s, crlf)
    print('merged %d rows onto %d bases' % (len(ROWS) + 1, 5))


if __name__ == '__main__':
    main()
