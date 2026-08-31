# -*- coding: utf-8 -*-
# #275 - the teaching sheet owns the screen; the twice-a-turn tally says what it
#        is; the brawl's first swing lands.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

# ---- 1. a hover box may not sit on top of the lesson -----------------------
OLD_TIP = """  const r=tutRect(anchor);
  if(!r||r.w<2||r.h<2)return false;        /* hidden pane, missing anchor */
  const d=tutEl(),pad=6;"""
NEW_TIP = """  const r=tutRect(anchor);
  if(!r||r.w<2||r.h<2)return false;        /* hidden pane, missing anchor */
  /* \u26d4 #275 - AND THE HOVER BOX GOES DOWN WITH IT, WHICH IS A Z-INDEX FACT
     RATHER THAN A TASTE ONE. `#tutDim` is 61 and `#gtTip` is 99, and the tip
     lives on `document.body` (it has to: `moveTip` clamps it against the
     window, not against the stage) - so a HELD GROUND or PALISADE box opened a
     second before a lesson fires goes on painting over the dimmed sheet, on the
     one screen in the game whose whole job is to have exactly one thing on it.
     Reported as *"HELD GROUND repeatedly covered the central battlefield while
     tutorial cards were also active"*.
     \u26d1 HERE AND NOWHERE ELSE, because this is the ONE function that puts the
     sheet up and writes `B.tutLock` - its own note two paragraphs above says so,
     and that is what makes one line cover every teacher in the file.
     \u26a0 BY ID AND NOT THE `TIP` CONST, which is declared 22,000 lines below. */
  {const tp=document.getElementById('gtTip');if(tp)tp.style.display='none';}
  const d=tutEl(),pad=6;"""

# ---- 2. what the tally on a card actually means ----------------------------
OLD_LESSON = """  learn_twice:{tier:'learn',l:[
    'Two actions a turn. The second move is a hex shorter, and the strong things need a '+
    'round before you can use them again.',
    'Doing the same thing twice in one turn is always the weaker half of it. Move, then '+
    'swing.']},"""
NEW_LESSON = """  /* \u26d4 #275 - THE SECOND LINE PROMISED A DIMINISHING RETURN NOTHING PAYS.
     *"Doing the same thing twice in one turn is always the weaker half of it"*
     is true of MOVE, whose second is a hex shorter, and of nothing else in the
     game: `spend()` writes `u.used[k]` and it is read by `canUse` as a CEILING
     and by `moveBudget` for the shorter stride. So a player swinging twice was
     watching a card count 1/2 then 2/2 with the damage and the odds unchanged
     and being told by the Captain that something had got worse. The register's
     own note above defends this lesson on exactly the claim that turned out to
     be the false one, which is why the note is corrected here too. */
  learn_twice:{tier:'learn',l:[
    'Two actions a turn. The second move is a hex shorter, and the strong things need a '+
    'round before you can use them again.',
    'Twice a turn is the ceiling on any one card, and the small number on it is that '+
    'tally. Only walking gets worse the second time.']},"""

# ...and the register's own note, which asserts the promise the lesson made
OLD_NOTE = """     WRONG. `learn_twice` reads like a duplicate of TUTSTEPS.act and is not:
     `act` says "Two actions a turn" and stops, while the lesson teaches the
     DIMINISHING RETURN on the second one, which nothing else in the game
     says anywhere."""
NEW_NOTE = """     WRONG. `learn_twice` reads like a duplicate of TUTSTEPS.act and is not:
     `act` says "Two actions a turn" and stops, while the lesson teaches the
     TWICE-A-TURN CEILING and the shorter second stride, which nothing else in
     the game says anywhere. (#275: it said DIMINISHING RETURN until then, and
     there is no such return on anything but MOVE. A note that defends a lesson
     on a claim the build does not keep is how the lesson survived a year.)"""

# ---- 3. the tally says so in words on the hover ----------------------------
OLD_RECEIPT = """          :(sub+(a.strain?' \u00b7 '+strainCost(u,a)+' mood':'')+
            (a.cool?' \u00b7 '+a.cool+'-turn cooldown':'')+
            (gathers(a)?' \u00b7 lands next turn':'')).toUpperCase();"""
NEW_RECEIPT = """          /* #275 - and what the corner tally is counting, in words, on the one
             line that already carries this card's prices. The `<u>1/2</u>` is a
             CEILING and it was being read as a penalty; a number with no unit is
             the readout fault this file keeps paying for. */
          :(sub+(a.strain?' \u00b7 '+strainCost(u,a)+' mood':'')+
            (a.cool?' \u00b7 '+a.cool+'-turn cooldown':'')+
            (used?' \u00b7 '+used+' of 2 this turn':'')+
            (gathers(a)?' \u00b7 lands next turn':'')).toUpperCase();"""

# ---- 4. the brawl's first swing lands --------------------------------------
OLD_SURE = """  const sure=!!act.impact||(SURE_AFTER&&a.side==='you'&&(a.missRun||0)>=SURE_AFTER);"""
NEW_SURE = """  /* \u2550\u2550\u2550 \u26d4 #275 \u00b7 AND THE VERY FIRST SWING OF THE GAME LANDS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     A playthrough report: *"I missed an approximately 82% opening sword attack,
     after which the drunk enemy landed two attacks before my next activation.
     It remained survivable, but for the tutorial battle it may make the system
     feel harsher than intended."* SURE_AFTER already exists for exactly this
     reason and it is written down as the player's frustration - it simply
     cannot reach the FIRST swing, because two misses have to happen first.
     \u26d1 THE BRAWL ONLY, AND ONE BODY'S FIRST BLOW ONLY. `B.tut` is the tavern
     and nothing else, and the test is that this body has neither hit nor missed
     yet, so it is one swing in one fight in a whole run.
     \u26d4 AND IT IS DECIDED HERE FOR SURE_AFTER's OWN REASON: this function is
     what the hover prints, what strike() rolls against and what both AI brains
     score with, so the card reads 100%, the roll cannot miss and AUTO spends it
     knowing. One place, three readers, nothing to teach.
     \u26a0 `TUT_FIRST_SURE` is one word to switch it off, which is what a taste
     call somebody else may want back gets in this file. */
  const firstBlow=TUT_FIRST_SURE&&B&&B.tut&&a.side==='you'&&!a.ally&&!a.pet&&
    !!act.dmg&&!(a.hits||0)&&!(a.misses||0);
  const sure=!!act.impact||firstBlow||
    (SURE_AFTER&&a.side==='you'&&(a.missRun||0)>=SURE_AFTER);"""

OLD_SUREC = """const SURE_AFTER=2;"""
NEW_SUREC = """const SURE_AFTER=2;
/* #275 - and the brawl's opening blow. See the note in hitBreakdown. */
const TUT_FIRST_SURE=true;"""

OLD_SAY = """  if(act.impact)po('movement becomes the hit');
  else if(sure)po('two wide, this one lands');"""
NEW_SAY = """  if(act.impact)po('movement becomes the hit');
  else if(firstBlow)po('the first one always lands');
  else if(sure)po('two wide, this one lands');"""

patch([(OLD_TIP, NEW_TIP), (OLD_LESSON, NEW_LESSON), (OLD_NOTE, NEW_NOTE),
       (OLD_RECEIPT, NEW_RECEIPT), (OLD_SUREC, NEW_SUREC),
       (OLD_SURE, NEW_SURE), (OLD_SAY, NEW_SAY)])
