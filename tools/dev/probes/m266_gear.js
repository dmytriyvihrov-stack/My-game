/* #266 - what an off-hand piece says, and what a find may hand over */
(()=>{
  const out={};
  /* the row's own receipt, through the sheet's builder. Driven, not re-typed:
     `shortGear` is local to drawInv, so read it off the DOM the sheet writes. */
  iSel='you';show('inv');
  const p=member('you');
  G.stash.length=0;
  ['shield','offhand','buckler','quiver','lid','focus','sword','jack','bone'].forEach(k=>G.stash.push(k));
  drawInv();
  out.rows=[...$('iStashBody').querySelectorAll('.item')].map(b=>{
    const n=b.querySelector('.in'),d=b.querySelector('.id');
    return (n?n.textContent.trim():'?')+'  ->  '+(d?d.textContent.trim():'');});
  /* and the slot face, with the dirk actually worn */
  p.eq.off='offhand';drawInv();
  out.offSlot=[...$('iChar').querySelectorAll('.slot')].map(b=>b.textContent.replace(/\s+/g,' ').trim())
    .filter(s=>/OFF/.test(s));
  p.eq.off='shield';drawInv();
  out.offSlot2=[...$('iChar').querySelectorAll('.slot')].map(b=>b.textContent.replace(/\s+/g,' ').trim())
    .filter(s=>/OFF/.test(s));
  p.eq.off=null;
  /* the hover */
  out.tipDirk=tipFor('offhand',p).replace(/<[^>]*>/g,'|').replace(/\|+/g,' | ').slice(0,420);
  out.tipShield=tipFor('shield',p).replace(/<[^>]*>/g,'|').replace(/\|+/g,' | ').slice(0,300);
  const w=s=>String(s||'').trim().split(/\s+/).length;
  out.dirkWords=w(GEAR.offhand.d);
  /* ask 7: 600 finds, and not one of them a common main-hand weapon */
  const tally={},bad=[];
  for(let i=0;i<600;i++){const k=rollFind('battle');
    if(!k)continue;tally[k]=(tally[k]||0)+1;
    if(GEAR[k].slot==='main'&&GEAR[k].rarity==='common')bad.push(k);}
  out.findBadCommonWeapons=bad.length;
  out.findTally=Object.keys(tally).sort((a,b)=>tally[b]-tally[a])
    .map(k=>k+'('+GEAR[k].rarity[0]+GEAR[k].slot[0]+') '+tally[k]).join(', ');
  /* and the LOOT tables, which are a different door and are NOT touched here */
  out.lootCommonMain=Object.keys(LOOT).flatMap(k=>LOOT[k].flatMap(l=>
    [].concat(l.gear||[],l.gear2||[]).filter(g=>GEAR[g]&&GEAR[g].slot==='main'&&
      GEAR[g].rarity==='common').map(g=>k+':'+g)));
  return out;})()
