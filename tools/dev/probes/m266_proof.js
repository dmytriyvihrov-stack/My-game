/* #266 - the two new guards, proved by making them fire.
   ⚠ LINT() returns {findings:<count>, byCategory, items:[...]} - `findings` is a
   NUMBER, so `.filter` on it throws and `(x||[]).length` reads 0 forever. */
(()=>{
  const out={};
  const rows=()=>{const r=LINT();return r.items||[];};
  const say=f=>(f.cat||'?')+' '+(f.where||'?')+': '+(f.what||'');
  out.lintClean=rows().length;
  LOOT.clash[0].gear='spear';
  out.lintSeeded=rows().filter(f=>/common main-hand/.test(f.what||'')).map(say);
  delete LOOT.clash[0].gear;
  out.lintRestored=rows().length;

  /* ---- rollFind: force the step-down to `common` and see what comes back ---- */
  const keepOdds=FIND_ODDS.battle, keepStash=G.stash.slice();
  FIND_ODDS.battle={epic:0,rare:1};          /* always roll rare, so it must step down */
  Object.keys(GEAR).forEach(k=>{if(GEAR[k].rarity==='rare')G.stash.push(k);});
  out.rarePoolLeft=findPool('rare').length;
  out.commonMainsAvailable=findPool('common',null,true)
    .filter(k=>GEAR[k].slot==='main').map(k=>GEAR[k].n);
  const got={},bad=[];
  for(let i=0;i<300;i++){const k=rollFind('battle');if(!k)continue;
    got[k]=(got[k]||0)+1;
    if(GEAR[k].slot==='main'&&GEAR[k].rarity==='common')bad.push(k);}
  out.steppedDownTally=Object.keys(got).map(k=>k+'('+GEAR[k].rarity[0]+GEAR[k].slot[0]+')').join(', ');
  out.steppedDownBadWeapons=bad.length;
  FIND_ODDS.battle=keepOdds;G.stash.length=0;keepStash.forEach(k=>G.stash.push(k));

  /* ---- the mood bar drops the blows hatch and keeps the rung ticks ---- */
  iSel='you';show('inv');drawInv();
  const nrv=$('iChar').querySelector('.ibars .sbar .bar.nrv');
  out.nrvAfterDisplay=getComputedStyle(nrv,'::after').display;
  out.nrvBeforeDisplay=getComputedStyle(nrv,'::before').display;
  out.armAfterDisplay=getComputedStyle($('iChar').querySelector('.ibars .sbar .bar'),'::after').display;

  /* ---- and the content that moved ---- */
  const w=s=>String(s||'').trim().split(/\s+/).length;
  out.dirkWords=w(GEAR.offhand.d);
  out.lootCommonMain=Object.keys(LOOT).flatMap(k=>LOOT[k].flatMap(l=>
    [].concat(l.gear||[],l.gear2||[]).filter(g=>GEAR[g]&&GEAR[g].slot==='main'&&
      GEAR[g].rarity==='common').map(g=>k+':'+g)));
  return out;})()
