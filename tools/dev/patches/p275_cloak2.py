# -*- coding: utf-8 -*-
# #275 - the Disguise Cloak: the row, the card, the badge, the turn.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

# ------------------------------------------------------------------ the row
OLD_GEAR = """  timecube:{rarity:'epic',n:'The Time-Cube',slot:'bag',g:'⧉',"""
NEW_GEAR = """  /* ═══ ⛔ #275 · THE DISGUISE CLOAK ═════════════════════════════════
     ⛑ *"Uncommon"* IS `rare`, which is the same vocabulary fact the draught's
     own note records: `RARITY{}` has three tiers and the stash's break-down
     table calls the middle one uncommon. Green is the tier the ask means.
     ⛑ AND IT IS A `use` ROW AND NOT A NEW SHAPE. The bag already builds a card
     off `use:{}` (the cube), `canUse` already holds `uses` to once a fight, and
     `hideAct`'s note already refuses to take a spent card off the sheet - so
     what is new here is the RULE (see `hiddenLive`), not the wiring.
     ⚠ `▒` AND NOT `▨`, which is already RAGS in `MAT_ICON`. Checked against the
     whole file at 0 occurrences, as `.claude/rules/event-cards.md` requires. */
  cloak   :{rarity:'rare',n:'Disguise Cloak',slot:'bag',g:'▒',
            use:{n:'PULL IT OVER YOU',uses:1,hide:2},
            d:'A hooded thing of stitched sacking and dead grass, heavy with the smell '+
              'of whatever ditch it was cut from. One action, once a fight: you stop '+
              'being a man and start being a heap somebody has walked past all week. '+
              'It lasts two rounds. It does not last one swing.'},
  timecube:{rarity:'epic',n:'The Time-Cube',slot:'bag',g:'⧉',"""

# ----------------------------------------------------------------- the card
OLD_ACT = """  if(bagG&&bagG.use)acts.push(Object.assign({k:'baguse',cost:1,self:true,bag:true},bagG.use,
    {note:bagG.use.slowFoes
      ? 'Every enemy on the field takes half its actions for '+bagG.use.slowFoes+
        ' rounds. Once, and then it is gone for good.'
      : 'Once a fight.'}));"""
NEW_ACT = """  if(bagG&&bagG.use)acts.push(Object.assign({k:'baguse',cost:1,self:true,bag:true},bagG.use,
    {note:bagG.use.slowFoes
      ? 'Every enemy on the field takes half its actions for '+bagG.use.slowFoes+
        ' rounds. Once, and then it is gone for good.'
      /* #275 - and the cloak says all four of its exits, because every one of
         them is a thing the player can choose not to do. */
      : bagG.use.hide
      ? 'Once a fight. Nothing on the other side can aim at you for '+bagG.use.hide+
        ' rounds. It comes off the moment you swing, the moment anything lands on '+
        'you, if something clever ends up beside you, or if something walks into '+
        'the ground you are standing on.'
      : 'Once a fight.'}));"""

# -------------------------------------------------------------- the handler
OLD_USE = """    if(a.burn){const m=member(u.id);
      if(m&&m.eq)m.eq.bag=null;
      say('The cube is not in anybody’s hand any more.');}
    render();return;"""
NEW_USE = """    if(a.burn){const m=member(u.id);
      if(m&&m.eq)m.eq.bag=null;
      say('The cube is not in anybody’s hand any more.');}
    /* ⛔ #275 - THE CLOAK. `B.round+hide` and not a tick count, for the reason
       the rules block gives; and the card is NOT taken off the sheet, because
       `canUse` is already refusing it on the counter and a row that vanished
       would be the hidden-act fault `hideAct` spends a paragraph on. */
    if(a.hide){u.hideUntil=B.round+a.hide;
      fx(u,'GONE','#5a7a6a',true);sfx('cast');
      say(u.name+' pulls the cloak over their head and goes down against the '+
        'ground, and there is nothing there but a heap of wet sacking.');}
    render();return;"""

# --------------------------------------------------------------- the badge
OLD_ST = """  hurt:{n:'Injured',g:'✚',col:'#c9a227',on:u=>!!u.injured&&u.lastFall!=='dead',"""
NEW_ST = """  /* ⛔ #275 - THIRD IN THE REGISTER, and for `hurt`'s own reason: `.stbar`
     prints four badges and slices the rest, and a body that cannot be aimed at
     may not lose the one mark that says so to a poison stack. The glyph is the
     GEAR row's own, which is the same fact wearing the same mark. */
  hidden:{n:'Under the cloak',g:'▒',col:'#5a7a6a',on:u=>hiddenLive(u),
    d:u=>'Nothing on the other side can aim at this body until the end of round '+
      ((u.hideUntil||1)-1)+'. It comes off on a swing, on a blow landing, on '+
      'anything clever ending its move beside them, or on anything at all trying '+
      'to walk onto this hex.'},
  hurt:{n:'Injured',g:'✚',col:'#c9a227',on:u=>!!u.injured&&u.lastFall!=='dead',"""

# ----------------------------------------------------------------- the turn
OLD_TICK = """  if(u.veiled&&!u.dead&&!u.downed&&!u.fled){
    const lit=onEmber(u)||nbrs(u.col,u.row).some(p=>{
      const t=B.terr[K(p[0],p[1])];return t==='ember'||t==='fire';});
    if(lit){if(u.veil){u.veil=false;fx(u,'SEEN','#e07a28',true);}}
    else if(!u.veil){u.veil=true;fx(u,'GONE','#5a7a6a',true);}
  }"""
NEW_TICK = """  if(u.veiled&&!u.dead&&!u.downed&&!u.fled){
    const lit=onEmber(u)||nbrs(u.col,u.row).some(p=>{
      const t=B.terr[K(p[0],p[1])];return t==='ember'||t==='fire';});
    if(lit){if(u.veil){u.veil=false;fx(u,'SEEN','#e07a28',true);}}
    else if(!u.veil){u.veil=true;fx(u,'GONE','#5a7a6a',true);}
  }
  /* ⛔ #275 - THE CLOAK'S TWO TURN-TOP FACTS. It looks around at whatever it is
     standing beside (the body that was already there when its turn came, which
     `walkTo` cannot see), and a cloak that has run out says so out loud rather
     than simply stopping being true - a state that ends silently is a state the
     player finds out about by being shot. */
  spotAround(u);
  if(u.hideUntil&&!hiddenLive(u)){u.hideUntil=0;
    fx(u,'SEEN','#e07a28',true);
    say('The cloak has been on '+u.name+' long enough. They are a man again.');}"""

patch([(OLD_GEAR, NEW_GEAR), (OLD_ACT, NEW_ACT), (OLD_USE, NEW_USE),
       (OLD_ST, NEW_ST), (OLD_TICK, NEW_TICK)])
