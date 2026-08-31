# -*- coding: utf-8 -*-
# #275 - three readouts promised a DISENGAGE card most bodies do not carry.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

# 1. the one predicate, beside hideAct - which is the other function in the file
#    that asks the same question about the same card.
OLD_HIDE = """function hideAct(u,a){return a.k==='dis'&&!held(u);}"""
NEW_HIDE = """function hideAct(u,a){return a.k==='dis'&&!held(u);}
/* \u2550\u2550\u2550 \u26d4 #275 \u00b7 DOES THIS BODY ACTUALLY HAVE THE CARD \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   DISENGAGE stopped being a thing every body has when it became a PERK, and
   THREE readouts went on telling the player to spend it: the brawl's CIRCLED
   lesson (which is the first fight in the game, on a Captain who has not got
   it), the HELD GROUND note on any hex in a zone of control, and the title on
   the \u2694 chip that prices a step off. All three were written when the sentence
   was true of everybody.
   \u26d1 ONE PREDICATE, ASKED OF THE ACT ROW ITSELF and not of `perks`: the act is
   built by `unitFrom` behind a `courage` clause as well as the perk, and a foe
   has neither - so the row is the fact and the perk list is a description of
   it. Same reason `canUse` reads the act. */
function hasDis(u){return !!(u&&u.acts&&u.acts.some(a=>a.k==='dis'));}"""

# 2. the brawl lesson
OLD_TUT = r"""  circled:{h:'CIRCLED',
    /* #137 - teaches the rule the game HAS. The hex is this turn's now, so
       the spotlight had to move with it or the brawl would be teaching a
       promise the build no longer keeps. */
    t:'Moving while they touch you pays a free swing to each of them. '+
      'DISENGAGE first: it gives you an extra hex right now and the rest of '+
      'this turn\'s moving is clean. Then go where they come one at a time.',"""
NEW_TUT = r"""  circled:{h:'CIRCLED',
    /* #137 - teaches the rule the game HAS. The hex is this turn's now, so
       the spotlight had to move with it or the brawl would be teaching a
       promise the build no longer keeps.
       \u26d4 #275 - AND FOR TWO WEEKS IT HAD STOPPED BEING THE RULE THE GAME HAS.
       #224 made DISENGAGE a perk, so the first lesson in the game was pointing
       at a card the Captain does not carry and the spotlight was falling
       through to the whole action row. `hasDis` is the fact; the lesson reads
       it, the same way its own anchor already did. */
    t:()=>'Moving while they touch you pays a free swing to each of them. '+
      (hasDis(cur())
        ?'DISENGAGE first: it gives you an extra hex right now and the rest of '+
          'this turn\'s moving is clean. '
        :'Nobody here has learned to step out of a grip yet, so there is no clean '+
          'way through them. ')+
      'Then go where they come one at a time.',"""

# 3. the HELD GROUND note
OLD_ZOC = """    return {n:'HELD GROUND',
      d:'<b>'+who+'</b> '+(zc.length===1?'has':'have')+' the front of '+
        (zc.length===1?'its':'their')+' hex on this one, so this is inside a ZONE OF '+
        'CONTROL. Step out of it and everyone holding you gets a free swing at your '+
        'back as you go. Three ways out and no fourth: kill them, walk round to a hex '+
        'they are not facing, or spend DISENGAGE - which is the step itself, costs one '+
        'action, and nobody swings.'};"""
NEW_ZOC = """    /* #275 - the third door is only there for a body that carries the card. */
    return {n:'HELD GROUND',
      d:'<b>'+who+'</b> '+(zc.length===1?'has':'have')+' the front of '+
        (zc.length===1?'its':'their')+' hex on this one, so this is inside a ZONE OF '+
        'CONTROL. Step out of it and everyone holding you gets a free swing at your '+
        'back as you go. '+(hasDis(u)
          ?'Three ways out and no fourth: kill them, walk round to a hex they are not '+
           'facing, or spend DISENGAGE - which is the step itself, costs one action, '+
           'and nobody swings.'
          :'Two ways out and no third: kill them, or walk round to a hex they are not '+
           'facing.')};"""

# 4. the price chip on the hex a step is aimed at
OLD_CHIP = """        ' That is what stepping off costs. DISENGAGE first and the step is clean.';"""
NEW_CHIP = """        ' That is what stepping off costs.'+       /* #275 - and the card, only if there is one */
        (hasDis(cur())?' DISENGAGE first and the step is clean.':'');"""

patch([(OLD_HIDE, NEW_HIDE), (OLD_TUT, NEW_TUT), (OLD_ZOC, NEW_ZOC), (OLD_CHIP, NEW_CHIP)])
