/* the two rings, proved by making them fire: the `:hover` gate is the shipped
   `.lit` rule's own and is not what #247 changed - what is new is whether
   `.hex.lit.lit2` overrides `.hex.lit`, which is source order and specificity and
   is exactly the kind of thing that is right in the head and wrong in the file. */
(()=>{
  const out={};
  window.TUT_SILENT=true;if(typeof learnSkip==='function')learnSkip();
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();if(typeof tutClose==='function')tutClose();render();
  const nearK=Object.keys(B.reach.dist),
        farK=Object.keys(B.reach2.dist).filter(k=>B.reach.dist[k]===undefined);
  const st=document.createElement('style');
  st.textContent='#bGrid:not(.mirror) .hex.lit .hedge::after{content:"";position:absolute;'+
    'left:0;top:0;right:0;bottom:0;background:rgba(240,230,192,.20);'+
    'box-shadow:inset 0 0 0 2px rgba(240,230,192,.92)}'+
    '#bGrid:not(.mirror) .hex.lit.lit2 .hedge::after{background:rgba(240,230,192,.11);'+
    'box-shadow:inset 0 0 0 2px rgba(240,230,192,.52)}';
  document.head.appendChild(st);
  const ring=k=>{const h=document.querySelector('#bGrid [data-k="'+k+'"]');
    const c=getComputedStyle(h.querySelector('.hedge'),'::after');
    return {shadow:c.boxShadow,bg:c.backgroundColor};};
  out.nearForced=ring(nearK[8]); out.farForced=ring(farK[8]);
  st.remove();
  out.nearAfter=ring(nearK[8]).shadow;
  /* and what the hand says the step costs */
  out.pipsNear=(typeof payPips==='function')?payPips(nearK[8]):'no payPips';
  out.pipsFar =(typeof payPips==='function')?payPips(farK[8]):'no payPips';
  return out;
})()
