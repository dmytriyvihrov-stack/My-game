/* ═══════════════════════════════════════════════════════════════════════
   THE EVENT BOOK — every authored word in the game, in one editable document
   (backlog #77, user 2026-08-02: "Собери мне тексты ивентов в удобный гугл
   док... подпись ивента вверху, текст, выборы, результаты... Я пройдусь по
   всему вручную. Вырежу вставлю или добавлю комментов. Ты съешь док,
   посмотришь что я поправил и подготовишь." Plus: "Можна там то-же показать
   теги и оценку этих событий, чтобы если что я понимал куда править".)

   HOW TO RUN IT — with the game open on the local server:

     fetch('/tools/events_book.js').then(r=>r.text()).then(eval)

   That prints the byte count and writes `shots/events_book.html` through the
   dev server's POST handler. Copy it to `content/events_book.html`, which is
   the version the round-trip is diffed against.

   ⛔ THE ONE RULE, and it is the same one the Dramaturge lives under: THERE IS
   NO SECOND COPY OF THE EVENT DATA. This reads `EVENTS`, `CAMPS`, `VIGNETTES`
   and `NODES` out of the RUNNING GAME, and the rubric out of
   `tools/dramaturge.html` at run time. If a beat is added to the game it turns
   up here the next time this is run, and if it is scored in the Dramaturge the
   score turns up with it. Nothing here is authored.

   ⚠ WHAT MADE THIS HARDER THAN IT LOOKS, kept because the next person will hit
   it: **eighteen camp bodies and twelve result texts are FUNCTIONS**, not
   strings — `(a,b,both)=>'...'` — because those cards are about two named
   people and read differently depending on whether both are still alive. The
   first cut of this file rendered them with `String()` and quietly put
   JavaScript source into the middle of the document. `txt()` below is the one
   resolver every authored string goes through; anything that forgets it will
   ship code to the writer. Two more of the same shape: a choice's `rep` is an
   object (`{ratkin:-30}`) and some `tag`s are objects, and both stringified to
   "[object Object]" before they were given renderers.
   ═══════════════════════════════════════════════════════════════════════ */
(async function(){
  'use strict';

  /* ── the rubric, read live out of the Dramaturge so the two cannot drift ── */
  let SHIPPED = {};
  try{
    const t = await fetch('/tools/dramaturge.html').then(r=>r.text());
    const i = t.indexOf('const SHIPPED = {');
    const j = t.indexOf('\n};', i);
    SHIPPED = eval('(' + t.slice(i + 'const SHIPPED = '.length, j + 2) + ')');
  }catch(e){ console.warn('no rubric available:', e.message); }

  const esc  = s => String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const sgn  = n => (n>0?'+':'') + n;
  const para = s => esc(s).split(/\n\n+/).map(p=>'<p>'+p.replace(/\n/g,'<br>')+'</p>').join('\n');

  /* THE RESOLVER. See the warning at the top of this file: a body or a result
     may be a function of the two people the card is about. Called with {A} and
     {B} so the prose comes out and the placeholders stay obviously
     placeholders, and both branches are printed whenever the `both` flag
     actually changes the words. */
  const txt = v => {
    if(typeof v !== 'function') return v;
    try{
      const both = v('{A}','{B}',true), one = v('{A}','{B}',false);
      return both===one ? both
        : 'IF THEY ARE BOTH STILL WITH YOU:\n'+both+'\n\nIF ONLY ONE OF THEM IS:\n'+one;
    }catch(e){
      try{ return v('{A}','{B}'); }catch(e2){ return '(written as code, not rendered here)'; }
    }
  };

  const CAT = {battle:'FIGHT',story:'STORY',camp:'CAMP',mystery:'MYSTERY',
               merchant:'TRADE',loot:'LOOT',travel:'ROAD',social:'PEOPLE'};

  /* the score strip, straight out of the Dramaturge's shipped rubric */
  function strip(id){
    const s = SHIPPED[id];
    if(!s) return '<p><i>not scored in the Dramaturge yet</i></p>';
    const x = s[7] || {};
    const b = ['<b>'+(CAT[s[0]]||String(s[0]).toUpperCase())+'</b>',
               'drama '+sgn(s[1]), 'swing '+s[2], 'erosion '+s[6],
               'lore '+s[3], 'character '+s[4]];
    if(s[5])   b.push('thread '+s[5]);
    if(x.tier) b.push('battle tier '+x.tier);
    if(x.cre)  b.push('creates &laquo;'+x.cre+'&raquo;');
    if(x.req)  b.push('needs &laquo;'+x.req+'&raquo;');
    return '<p><i>'+b.join(' &middot; ')+'</i></p>';
  }

  /* WHAT A CHOICE ACTUALLY DOES, in words. This is the half that makes the
     document worth editing from: the prose can be judged against its own
     mechanics without opening the game file. */
  function does(c){
    const out = [], f = c.fx || {}, m = [];
    if(f.crowns)  m.push(sgn(f.crowns)+' crowns');
    if(f.food)    m.push(sgn(f.food)+' provisions');
    if(f.salvage) m.push(sgn(f.salvage)+' salvage');
    if(f.gems)    m.push(sgn(f.gems)+' gems');
    if(m.length)  out.push(m.join(', '));
    if(f.morale)  out.push(sgn(f.morale)+' company mood');
    if(f.days)    out.push('costs '+f.days+' day'+(f.days>1?'s':''));
    if(c.battle)  out.push('<b>starts a fight</b>'+(c.battle===true?'':' ('+c.battle+')')+
                           (c.ambush?', you strike first':''));
    if(c.hurt)    out.push('<b>injures somebody</b>'+
                           (c.hideHurt?' (deliberately NOT announced on the button)':''));
    if(c.hurtAll)    out.push('<b>injures everybody</b>');
    if(c.healAll)    out.push('heals the whole company');
    if(c.blessAll)   out.push('blesses the whole company');
    if(c.gear)       out.push('gives gear: '+c.gear+(c.gear2?' and '+c.gear2:''));
    if(c.dropGear)   out.push('takes gear away');
    if(c.recruit)    out.push('<b>somebody joins the company</b>');
    if(c.strandOne)  out.push('<b>somebody is left behind</b>');
    if(c.cond)       out.push('gives a strange condition: '+c.cond);
    if(c.markCircle) out.push('cuts the ring into the Captain&rsquo;s face');
    if(c.endTie)     out.push('<b>ends a tie between two people</b>');
    if(c.rep)        out.push('reputation: '+Object.keys(c.rep).map(k=>k+' '+sgn(c.rep[k])).join(', '));
    if(c.contact)    out.push('makes a lasting contact');
    if(c.opensRoad)  out.push('opens a road');
    if(c.scout)      out.push('scouts the road ahead');
    if(c.tag)        out.push('the run remembers this ('+(typeof c.tag==='string'?c.tag
                       :Object.keys(c.tag).map(k=>k+'&rarr;'+c.tag[k]).join(', '))+')');
    if(c.last)       out.push('a last-choice variant');
    if(c.need)       out.push('<i>needs '+Object.keys(c.need).map(k=>c.need[k]+' '+k).join(', ')+
                       ', or the button greys out</i>');
    const g = [];
    if(c.needRace)   g.push('only shown with a '+c.needRace+' in the company');
    if(c.needMut)    g.push('only shown when somebody carries a mutation');
    if(c.needHurt)   g.push('only shown when somebody is wounded');
    if(c.needUnpaid) g.push('only shown when wages are owed');
    if(g.length)     out.push('<i>'+g.join('; ')+'</i>');
    return out.length ? '<p>&#9656; '+out.join(' &middot; ')+'</p>\n' : '';
  }

  function card(id,key,title,body,choices,where){
    let h = '\n<h2>['+key+'] '+esc(txt(title))+'</h2>\n';
    if(where) h += '<p><i>'+esc(where)+'</i></p>\n';
    h += strip(id)+'\n<h3>TEXT</h3>\n'+para(txt(body))+'\n<h3>CHOICES</h3>\n';
    (choices||[]).forEach((c,i)=>{
      h += '<p><b>'+(i+1)+'. '+esc(txt(c.t))+'</b>'+
           (c.danger?' &nbsp;<i>(drawn in red)</i>':'')+'</p>\n';
      if(c.c) h += '<p><i>button subtitle: '+esc(txt(c.c))+'</i></p>\n';
      h += does(c);
      const a = txt(c.after);
      h += a ? '<p><b>RESULT &mdash;</b> '+esc(a).replace(/\n/g,'<br>')+'</p>\n'
             : '<p><i>no result text &mdash; this choice goes straight to a fight</i></p>\n';
    });
    return h+'<hr>\n';
  }

  window.buildBook = function(){
    const nodeOf = {};
    Object.keys(NODES).forEach(k=>{ if(NODES[k].ev) nodeOf[NODES[k].ev] = NODES[k].n; });

    /* the summary table: "where to look first" — the whole point of the tags
       and scores being in here at all */
    let rows = '';
    const line = (id,key,title,kind,nch)=>{
      const s = SHIPPED[id];
      rows += '<tr><td>'+kind+'</td><td>'+key+'</td><td>'+esc(txt(title))+'</td>'+
        (s ? '<td>'+(CAT[s[0]]||s[0])+'</td><td>'+sgn(s[1])+'</td><td>'+s[2]+'</td><td>'+s[6]+'</td>'
           : '<td>&mdash;</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td>')+
        '<td>'+nch+'</td></tr>\n';
    };
    Object.keys(EVENTS).forEach(k=>line('ev:'+k,k,EVENTS[k].title,'event',(EVENTS[k].choices||[]).length));
    CAMPS.forEach(c=>line('camp:'+c.id,c.id,c.t,'camp',(c.choices||[]).length));

    const nCh = Object.values(EVENTS).reduce((a,e)=>a+(e.choices||[]).length,0)
              + CAMPS.reduce((a,e)=>a+(e.choices||[]).length,0);

    let out =
     '<h1>RABBLEBOUND &mdash; THE EVENT BOOK</h1>\n'+
     '<p><i>Every word the road says to the player, in one place. Generated from the running '+
     'game: '+Object.keys(EVENTS).length+' road and story events, '+CAMPS.length+' camp cards, '+
     VIGNETTES.length+' road vignettes, '+nCh+' choices between them.</i></p>\n'+
     '<h2>HOW TO USE THIS DOC</h2>\n'+
     '<p><b>Edit anything. Cut, rewrite, comment.</b> Three rules only, so the edits can be read '+
     'back into the game afterwards:</p>\n'+
     '<p>1. <b>Do not change the [key] in a heading.</b> That is how a block is matched back to '+
     'the game. Everything after it is yours.<br>\n'+
     '2. <b>To delete a choice, say so in a comment</b> rather than only deleting it. A missing '+
     'block and a block you meant to cut look the same from here.<br>\n'+
     '3. <b>Keep the {TOKENS} in curly braces.</b> They are not typos: the game swaps in a real '+
     'name from your company when the card is drawn, which is why the same event never reads '+
     'twice the same. {ANY} is anybody, {MAGE} {OGRE} {RATKIN} pick that kind of person, '+
     '{TELLER} is the one telling it, and {A} and {B} are the two people a card is about. Move '+
     'them, but do not spell them out.</p>\n'+
     '<p>The italic line under each heading is the <b>rubric</b>, straight out of the Dramaturge '+
     'tool so the two cannot disagree. <b>Drama</b> is a signed move: positive winds tension up, '+
     'negative discharges it, and a story that only climbs numbs an audience as fast as one that '+
     'never moves. <b>Swing</b> is how far the player&rsquo;s choice can move it. <b>Erosion</b> '+
     'is how hard the cruel option pays &mdash; the pillar made checkable. The &#9656; line under '+
     'a choice is what it actually DOES in the game, so the words can be judged against the '+
     'mechanics.</p>\n'+
     '<h2>WHERE TO LOOK FIRST</h2>\n'+
     '<p><i>High drama with low swing is a beat that happens TO the player. High erosion is where '+
     'the pillar is doing its work. One choice is not a decision, and that is only a problem '+
     'where it was meant to be one.</i></p>\n'+
     '<table border="1" cellpadding="4">\n<tr><th>kind</th><th>key</th><th>title</th><th>tag</th>'+
     '<th>drama</th><th>swing</th><th>erosion</th><th>choices</th></tr>\n'+rows+'</table>\n<hr>\n'+
     '<h1>PART ONE &mdash; ROAD AND STORY EVENTS</h1>\n';

    Object.keys(EVENTS).forEach(k=>{
      out += card('ev:'+k, k, EVENTS[k].title, EVENTS[k].body, EVENTS[k].choices,
        nodeOf[k] ? 'on the map at: '+nodeOf[k] : 'a floating road card');
    });

    out += '<h1>PART TWO &mdash; CAMP CARDS</h1>\n'+
      '<p><i>These fire between stops, at the fire, and they name real people in your company. '+
      'Several are chains: the second card only exists because of what you chose on the '+
      'first.</i></p>\n';
    CAMPS.forEach(c=>{
      out += card('camp:'+c.id, c.id, c.t, c.body, c.choices,
        c.needs ? 'only appears after: '+JSON.stringify(c.needs) : '');
    });

    out += '<h1>PART THREE &mdash; ROAD VIGNETTES</h1>\n'+
      '<p><i>One line each, no choice, no result. Texture between the real beats.</i></p>\n<ul>\n'+
      VIGNETTES.map((v,i)=>'<li><b>[vig:'+i+']</b> '+esc(txt(v.t))+
        (v.fx&&v.fx.morale?' <i>('+sgn(v.fx.morale)+' mood)</i>':'')+'</li>').join('\n')+
      '\n</ul>\n';

    return '<html><head><meta charset="utf-8"><title>RabbleBound - The Event Book</title></head>\n'+
           '<body>\n'+out+'</body></html>';
  };

  const html = window.buildBook();
  const res  = await fetch('/__shot/events_book.html', {method:'POST', body:html});
  const msg  = 'event book: '+html.length+' bytes, '+html.split('\n').length+
               ' lines -> shots/events_book.html ('+await res.text()+')';
  console.log(msg);
  return msg;
})();
