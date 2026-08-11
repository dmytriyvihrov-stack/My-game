/* ═══════════════════════════════════════════════════════════════════════
   GRIMTOLL TEST HARNESS — loaded into the running page, never shipped.

     fetch('/tools/harness.js').then(r=>r.text()).then(eval)

   WHY IT EXISTS AS A FILE: the preview pane runs HIDDEN. Two things break
   there and both look like game bugs when they are not:

     · requestAnimationFrame never fires, so travel animations stop dead;
     · setTimeout is floored at ~1s, so a rendered battle takes ten minutes.

   Routing timers through a MessageChannel port is NOT clamped, which is what
   makes a real, rendered, AUTO-driven fight run at full speed in a pane
   nobody is looking at. Re-pasting all of that into the console every time
   was costing more than the tests were.

   Nothing here is loaded by the game. It is fetched by hand, from a session.
   ═══════════════════════════════════════════════════════════════════════ */
(function(){

/* ---- 1. a scheduler the hidden pane does not throttle ------------------ */
if(!window.__mcShim){
  window.__mcShim=true;
  const q=[],mc=new MessageChannel(),live=new Map();let id=1;
  mc.port1.onmessage=()=>{const j=q.shift();
    if(j&&!j.cancelled)try{j.fn()}catch(e){window.__errs.push('timer: '+e.message)}};
  const _ct=window.clearTimeout;
  /* FIFO, so the game's sequential later() chain keeps its order */
  window.setTimeout=function(fn,ms,...a){
    const j={fn:()=>fn(...a),cancelled:false,id:id++};
    live.set(j.id,j);q.push(j);mc.port2.postMessage(0);return j.id;};
  window.clearTimeout=function(h){const j=live.get(h);if(j)j.cancelled=true;else _ct(h);};
  /* animations finish instantly rather than never */
  window.requestAnimationFrame=fn=>setTimeout(()=>fn(performance.now()+1e7),0);
}

/* ---- 2. anything thrown is a test failure, not a log line -------------- */
window.__errs=[];
window.onerror=(m,s,l)=>{window.__errs.push(m+' @'+l);};

/* ---- 3. the eight fights, run head-to-head by both AI brains ----------- */
window.FIGHTS=['clash','brigand','pack','slingline','steading','snare','mother','armour'];

/* Counts every attack at the ONE place they all resolve, so the enemy brain
   and AUTO are measured by the same instrument. `probe` lets a caller add a
   per-strike assertion without rewriting the loop. */
window.runFight=function(kind,opts){
  opts=opts||{};
  const _r=render,_f=fx,_s=say,_x=sfx,_p=paintTerrain,_strike=strike;
  const errs=[],notes=[],tally={};
  render=()=>{};fx=()=>{};sfx=()=>{};paintTerrain=()=>{};say=t=>{G.log.push(t);};
  strike=function(a,d,act,mul){
    try{if(opts.probe)opts.probe(a,d,act,tally,notes);}catch(e){errs.push('probe: '+e.message);}
    return _strike(a,d,act,mul);};
  let res;
  try{
    G.party.length=0;ARENA.COMPS[opts.comp||'prepared']().forEach(p=>G.party.push(p));
    G.morale=0;G.log.length=0;G.cub=false;G.run.food=8;
    const cap=member('you');if(cap)cap.pet=null;
    const FULL={ev:1,flank:1,pile:1,kite:1,fallback:1,cohere:1,hold:1};
    Object.assign(AIP.you,FULL);Object.assign(AIP.foe,FULL);
    startBattle(kind);
    if(opts.setup)opts.setup(B);
    let g=0;
    while(B&&B.won===null&&g++<3000){
      /* README: the harness must call checkEnd() between turns, or a
         hold-disposition fight reads several rounds long */
      if(checkEnd())break;
      const u=cur();if(!u)break;
      if(u.dead||u.downed||u.fled){B.busy=false;nextTurn();continue;}
      let s=0;
      while(B&&B.won===null&&cur()===u&&s++<8){
        const a0=u.actions;B.busy=false;
        try{aiTurn(u);}catch(e){errs.push(kind+': '+e.message);g=1e9;break;}
        if(!B||B.won!==null||cur()!==u||u.actions===a0)break;}
      if(B&&B.won===null&&cur()===u){B.busy=false;nextTurn();}
    }
    res={kind,won:B?(B.won===null?'DRAW/STALL':B.won):'-',rounds:B?B.round:0,
         guard:g>=3000?'HIT GUARD':'ok',
         down:B?B.units.filter(x=>x.side==='you'&&(x.dead||x.downed)).length:0,
         tally,notes,errs};
  }catch(e){res={kind,fatal:e.message,stack:(e.stack||'').split('\n')[1]};}
  finally{render=_r;fx=_f;say=_s;sfx=_x;paintTerrain=_p;strike=_strike;B=null;}
  return res;
};
/* the whole regression, compactly enough to read in one glance */
window.regress=function(opts,only){
  return (only||FIGHTS).map(k=>{
    const r=runFight(k,opts);
    return r.kind+': '+r.rounds+'rd '+r.won+' '+r.guard+
      (Object.keys(r.tally).length?' '+JSON.stringify(r.tally):'')+
      (r.notes&&r.notes.length?' ⚠'+r.notes.length:'')+
      (r.errs&&r.errs.length?' ERR '+r.errs.join('; '):'')+
      (r.fatal?' FATAL '+r.fatal:'');
  });
};

/* ---- 4. the gate picture ---------------------------------------------- */
/* The pane never composites, so a screenshot is impossible. The board
   serialises ITSELF instead — style block, the terrain canvas as a data URL,
   the live hex DOM, and the #bFx overlay at its measured offset — and POSTs
   it to the dev server (see the __shot handler in tools/serve.ps1). */
window.shotBoard=async function(name,caption,note){
  const style=[...document.querySelectorAll('style')].map(s=>s.textContent).join('\n');
  const terr=document.getElementById('bTerrain').toDataURL('image/png');
  const grid=document.getElementById('bGrid').outerHTML;
  const fx=document.getElementById('bFx');
  const fb=document.getElementById('bField').getBoundingClientRect();
  /* ⚠ #66 — LAYOUT OFFSET, NOT THE RECT. #bGround now carries the camera's
     transform, so its bounding rect moves with the zoom while the grid we
     serialise below is unzoomed. offsetLeft/offsetTop are the untransformed
     position, which is the only one this photograph is drawn against. */
  const G=document.getElementById('bGround');
  const dx=G.offsetLeft,dy=G.offsetTop;
  const html='<style>'+style+
    '\nbody{margin:0;background:#0e1414;color:#d8d5cc}.shotwrap{padding:18px}'+
    '.shotcap{font-family:var(--display);font-size:19px;color:#d9bd7e;margin:0 0 4px}'+
    '.shotnote{font-family:var(--mono);font-size:11px;color:#8a9a5c;margin:0 0 14px;'+
      'line-height:1.7;max-width:940px}.shotnote b{color:#d9bd7e}'+
    '.shotnote i{color:#c07a2c;font-style:normal}'+
    '.board{position:relative;width:600px;height:440px;overflow:hidden;'+
      'border:1px solid #2c3d3f;background:#16201f}'+
    '.board>img.terr{position:absolute;left:0;top:0;width:600px;height:440px}'+
    '.board>.gridholder{position:absolute;left:0;top:0}'+
    '.board>.fxholder{position:absolute;left:'+(-dx)+'px;top:'+(-dy)+'px;'+
      'width:'+Math.round(fb.width)+'px;height:'+Math.round(fb.height)+
      'px;pointer-events:none}</style>'+
    '<div class="shotwrap"><h1 class="shotcap">'+caption+'</h1>'+
    '<p class="shotnote">'+note+'</p><div class="board">'+
    '<img class="terr" src="'+terr+'"><div class="gridholder">'+grid+'</div>'+
    '<div class="fxholder">'+(fx?fx.innerHTML:'')+'</div></div></div>';
  return (await fetch('/__shot/'+name,{method:'POST',body:html})).text();
};

/* shotStage — THE WHOLE SCREEN, at its real geometry. Added for #100, whose
   fourteen points are all about WHERE THINGS SIT on a 1280x720 battle screen:
   shotBoard() photographs the field with none of the chrome on it, and
   shotUI() photographs three chrome boxes with none of their positions. A
   layout entry needs the one picture neither of them takes.

   ⚠ THE STAGE CARRIES fit()'s SCALE, so the clone is pinned to transform:none
   at 1280x720. Everything inside is absolutely positioned against the stage,
   so it all lands exactly where the running game puts it.
   ⚠ EVERY <canvas> BECOMES AN <img>. outerHTML copies the element, not its
   pixels: the terrain and the portrait serialise as empty boxes otherwise.
   That trap has cost this project four wrong gate pictures already.
   ⚠ AND A TRANSITIONED PROPERTY IS STUCK AT ITS START VALUE IN THIS PANE.
   No frames are composited, so a `transition:width` never advances - the log
   opened to its full height (untransitioned) and kept its shut width for as
   long as anybody watched. Kill the transition, toggle, then shoot. */
window.grabStage=function(label){
  const src=document.getElementById('stage');
  const c=src.cloneNode(true);
  const sc=[...src.querySelectorAll('canvas')],dc=[...c.querySelectorAll('canvas')];
  dc.forEach((cv,i)=>{
    const im=document.createElement('img');
    try{im.src=sc[i].toDataURL('image/png');}catch(e){}
    im.width=sc[i].width;im.height=sc[i].height;
    im.style.cssText=sc[i].style.cssText;
    if(cv.id)im.id=cv.id;
    cv.parentNode.replaceChild(im,cv);});
  c.removeAttribute('id');c.className='stagecap';
  c.style.cssText='transform:none;position:relative;width:1280px;height:720px;flex:none';
  return '<div class="stagewrap">'+(label?'<div class="caplbl">'+label+'</div>':'')+
    c.outerHTML+'</div>';
};
window.shotStage=async function(name,caption,note,panels){
  const style=[...document.querySelectorAll('style')].map(s=>s.textContent).join('\n');
  const body=(panels||[]).map(p=>
    '<div class="shotpanel"><h2 class="shotsub">'+(p.cap||'')+'</h2>'+
    (p.note?'<p class="shotnote">'+p.note+'</p>':'')+(p.html||'')+'</div>').join('');
  const html='<meta charset="utf-8"><title>Grimtoll · '+caption+'</title><style>'+style+
    '\nbody{margin:0;background:#0e1414;color:#d8d5cc;display:block}.shotwrap{padding:18px}'+
    '.shotcap{font-family:var(--display);font-size:21px;color:#d9bd7e;margin:0 0 6px}'+
    '.shotsub{font-family:var(--display);font-size:16px;color:#c9c6bb;margin:26px 0 4px;'+
      'border-top:1px solid #2c3d3f;padding-top:14px}'+
    '.shotnote{font-family:var(--mono);font-size:11px;color:#8a9a5c;margin:0 0 12px;'+
      'line-height:1.7;max-width:1180px}.shotnote b{color:#d9bd7e}'+
    '.shotnote i{color:#c07a2c;font-style:normal}'+
    '.caplbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;color:#d9bd7e;'+
      'background:#0e1414;padding:5px 8px;border:1px solid #2c3d3f;border-bottom:none}'+
    '.stagewrap{width:1282px}.stagecap{border:1px solid #2c3d3f}</style>'+
    '<div class="shotwrap"><h1 class="shotcap">'+caption+'</h1>'+
    '<p class="shotnote">'+note+'</p>'+body+'</div>';
  return (await fetch('/__shot/'+name,{method:'POST',body:html})).text();
};

/* shotUI — the LEFT PANEL beside the board, for gates about a control.
   shotBoard() photographs the field and nothing else, which is right for a
   rule you read off a hex (#36, #48) and useless for a rule you read off a
   BUTTON: #46's whole gate question is "three new acts with cooldown states,
   where do they sit and what do they look like unavailable."

   ⚠ EVERY <canvas> IS REPLACED WITH AN <img>. `outerHTML` copies the element
   and not its pixels, so the portrait serialises as an empty square while the
   running game draws the face perfectly — the exact trap that made #51's
   first four gate pictures wrong. Done here once so no caller has to know. */
window.shotUI=async function(name,caption,note,panels){
  const style=[...document.querySelectorAll('style')].map(s=>s.textContent).join('\n');
  const flat=node=>{
    const c=node.cloneNode(true);
    const src=[...node.querySelectorAll('canvas')],dst=[...c.querySelectorAll('canvas')];
    dst.forEach((cv,i)=>{
      const im=document.createElement('img');
      try{im.src=src[i].toDataURL('image/png');}catch(e){}
      im.width=src[i].width;im.height=src[i].height;
      im.style.cssText=src[i].style.cssText;
      cv.parentNode.replaceChild(im,cv);});
    return c.outerHTML;
  };
  /* each panel is {cap, note, left:<html>, board:<html>} captured by the caller
     at the moment it was true — so one file can hold a before and an after */
  const body=(panels||[]).map(p=>
    '<div class="shotpanel"><h2 class="shotsub">'+(p.cap||'')+'</h2>'+
    (p.note?'<p class="shotnote">'+p.note+'</p>':'')+
    /* left and board are inserted RAW so a panel can hold several of either —
       three action rows side by side, or a before and an after */
    '<div class="shotrow">'+(p.left||'')+(p.board||'')+'</div></div>').join('');
  const html='<meta charset="utf-8"><title>Grimtoll · '+caption+'</title><style>'+style+
    '\nbody{margin:0;background:#0e1414;color:#d8d5cc}.shotwrap{padding:18px}'+
    '.shotcap{font-family:var(--display);font-size:21px;color:#d9bd7e;margin:0 0 6px}'+
    '.shotsub{font-family:var(--display);font-size:16px;color:#c9c6bb;margin:26px 0 4px;'+
      'border-top:1px solid #2c3d3f;padding-top:14px}'+
    '.shotnote{font-family:var(--mono);font-size:11px;color:#8a9a5c;margin:0 0 12px;'+
      'line-height:1.7;max-width:1000px}.shotnote b{color:#d9bd7e}'+
    '.shotnote i{color:#c07a2c;font-style:normal}'+
    '.shotrow{display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap}'+
    '.leftcap{width:270px;background:var(--panel);border:1px solid #2c3d3f;padding:0;flex:none}'+
    '.caplbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;color:#d9bd7e;'+
      'background:#0e1414;padding:5px 8px;border-bottom:1px solid #2c3d3f}'+
    /* #91 - #bLeft is gone; the chrome pieces come through as-is, unpinned */
    '.leftcap #bPlq,.leftcap #bActions,.leftcap #bLogWrap{position:static;transform:none;'+
      'width:auto;margin:6px}'+
    '.board{position:relative;width:600px;height:440px;overflow:hidden;'+
      'border:1px solid #2c3d3f;background:#16201f;flex:none}'+
    '.board>img.terr{position:absolute;left:0;top:0;width:600px;height:440px}'+
    '.board>.gridholder{position:absolute;left:0;top:0}</style>'+
    '<div class="shotwrap"><h1 class="shotcap">'+caption+'</h1>'+
    '<p class="shotnote">'+note+'</p>'+body+'</div>';
  return (await fetch('/__shot/'+name,{method:'POST',body:html})).text();
};
/* grab the two halves as they stand RIGHT NOW — call between arrangements */
window.grabUI=function(label){
  const flatten=node=>{
    const c=node.cloneNode(true);
    const src=[...node.querySelectorAll('canvas')],dst=[...c.querySelectorAll('canvas')];
    dst.forEach((cv,i)=>{const im=document.createElement('img');
      try{im.src=src[i].toDataURL('image/png');}catch(e){}
      im.width=src[i].width;im.height=src[i].height;
      im.style.cssText=src[i].style.cssText;
      cv.parentNode.replaceChild(im,cv);});
    return c.outerHTML;};
  const fxn=document.getElementById('bFx');
  const fb=document.getElementById('bField').getBoundingClientRect();
  /* ⚠ #66 — layout offset, not the rect: see the note in shotBoard */
  const Gn=document.getElementById('bGround');
  const dx=Gn.offsetLeft,dy=Gn.offsetTop;
  const tag=label?'<div class="caplbl">'+label+'</div>':'';
  /* #91 - the 300px column is gone. The "left half" of a UI shot is now the
     plaque and the card row, which is everything the old panel said. */
  const chrome=['bPlq','bActions','bLogWrap'].map(id=>{
    const e=document.getElementById(id);return e?flatten(e):'';}).join('');
  return {left:'<div class="leftcap">'+tag+chrome+'</div>',
          board:'<div class="board"><img class="terr" src="'+document.getElementById('bTerrain').toDataURL('image/png')+
                '"><div class="gridholder">'+document.getElementById('bGrid').outerHTML+'</div>'+
                '<div class="fxholder" style="position:absolute;left:'+(-dx)+'px;top:'+(-dy)+
                'px;width:'+Math.round(fb.width)+'px;height:'+Math.round(fb.height)+
                'px;pointer-events:none">'+(fxn?fxn.innerHTML:'')+'</div></div>'};
};

/* ---- 5. stand a fight up without playing it --------------------------- */
/* Practice-field battles, so nothing here can reach a run or a save. */
window.stage=function(fight,comp){
  openSim();SIM.fight=fight;SIM.comp=comp||'prepared';simStart();
  const b=[...document.querySelectorAll('#askOpts button')];
  if(b.length)b[0].click();                 /* fights that ask a question first */
  return new Promise(r=>setTimeout(()=>r(B),300));
};
window.clearRocks=()=>Object.keys(B.terr).forEach(k=>{if(BLOCKED[B.terr[k]])B.terr[k]='field';});
window.park=()=>B.units.forEach((u,i)=>{u.col=(u.side==='you'?0:14);u.row=12;});
window.put=(u,c,r)=>{if(u){u.col=c;u.row=r;}return u;};
window.look=(u,t)=>{if(u&&t)u.facing=sectorOf([u.col,u.row],[t.col,t.row]);};

return 'harness ready';
})();
