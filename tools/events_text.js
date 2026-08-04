/* ═══════════════════════════════════════════════════════════════════════
   EVERY WORD ON THE ROAD, AS PLAIN TEXT (2026-08-02)

   (User: "gather all text of events in google doc - so it would be easier
   for me to make correction, when i get offline on my travel.")

   The sibling of `events_book.js`. That one makes a rich HTML document with
   tags and dramaturgy scores for reading at a desk; this one makes FLAT
   TEXT, because flat text is what pastes into a Google Doc cleanly and what
   survives being edited on a phone with no signal.

   HOW TO RUN IT - with the local server up and the game open:

     fetch('/tools/events_text.js').then(r=>r.text()).then(eval)

   It writes `shots/events_text.txt` through the dev server's POST handler.
   Copy that to `content/events_text_for_editing.txt`, which is the version
   the round trip is diffed against.

   ⛔ SAME ONE RULE AS THE BOOK AND THE DRAMATURGE: there is NO SECOND COPY
   OF THE EVENT DATA. This reads `EVENTS`, `CAMPS` and `VIGNETTES` out of the
   running game. Nothing here is authored, so a card added to the game turns
   up here the next time this is run.

   ⚠ TWO THINGS THE FIRST CUT GOT WRONG, both worth keeping:
   · CAST PLACEHOLDERS MUST BE ONE WORD. The camp chain calls `fst()` on the
     cast string to get a first name, so a placeholder of "[first person]"
     came out of it as "[first" and the aunt chain read as broken markup all
     the way down. Single tokens, then substituted for the readable form on
     the way out.
   · A BODY MAY BE A FUNCTION, and two vignettes throw when nobody in the
     company has the mutation they are about. Both are caught and labelled
     rather than allowed to kill the run.
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
  const L=[],P=s=>L.push(s);
  const clean=s=>String(s||'').replace(/<[^>]+>/g,'').replace(/—/g,'-');
  const CAST={ANY:'[somebody]',OGRE:'[your ogre]',RATKIN:'[your ratkin]',
    MAGE:'[your mage]',TELLER:'[the ratkin at the fire]',
    TELLER1:'[the ratkin at the fire]'};
  const tok=s=>clean(s).replace(/\{(\w+)\}/g,(m,k)=>CAST[k]||('['+k.toLowerCase()+']'));
  /* one word each, so fst() cannot cut them in half */
  const A='PERSON_A',B='PERSON_B';
  const readable=s=>s.replace(/PERSON_A/g,'[A]').replace(/PERSON_B/g,'[B]');
  const txt=(v,a,b)=>{try{return readable(tok(typeof v==='function'?v(a,b,true):v));}
    catch(e){return '*** written live, and needs a company this generator has not got ***';}};
  const card=(title,body,choices)=>{
    P('');P('==================================================');
    P(title);P('==================================================');P('');
    P(body);P('');
    (choices||[]).forEach((c,i)=>{
      P('  ---- OPTION '+(i+1)+' ----');
      P('  BUTTON: '+readable(tok(c.t)));
      P('  COST LINE: '+readable(tok(c.c||'')));
      const aft=txt(c.after,A,B);
      if(aft)P('  RESULT: '+aft.split('\n').join('\n  '));
      P('');
    });
  };
  P('GRIMTOLL - EVERY WORD ON THE ROAD');
  P('Generated from the running build. Edit freely: this is the text, not the code.');
  P('Names in [square brackets] are filled in by the game with whoever is in the company.');
  P('');
  P('SECTION 1 - ROAD AND NODE EVENTS ('+Object.keys(EVENTS).length+' cards)');
  Object.keys(EVENTS).forEach(k=>
    card('EVENT: '+EVENTS[k].title+'   ['+k+']',txt(EVENTS[k].body),EVENTS[k].choices));
  P('');P('');P('SECTION 2 - CAMP AND FIRE CARDS ('+CAMPS.length+' cards)');
  CAMPS.forEach(c=>card('CAMP: '+c.t+'   ['+c.id+']',txt(c.body,A,B),c.choices));
  P('');P('');P('SECTION 3 - ROAD VIGNETTES ('+VIGNETTES.length+', no choices)');
  VIGNETTES.forEach(v=>{P('');P('---- '+v.t+' ----');P(txt(v.body,A,B));});
  const out=L.join('\n');
  return fetch('/__shot/events_text.txt',{method:'POST',body:out})
    .then(()=>{console.log('[GRIMTOLL] events_text.txt written, '+out.length+' chars');
      return out.length;})
    .catch(e=>{console.error('[GRIMTOLL] could not write - is the dev server up?',e);});
})();
