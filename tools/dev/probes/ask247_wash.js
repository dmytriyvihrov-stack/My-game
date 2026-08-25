(()=>{
  const out={};
  window.TUT_SILENT=true;if(typeof learnSkip==='function')learnSkip();
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();if(typeof tutClose==='function')tutClose();render();
  const u=cur();
  const nearK=Object.keys(B.reach.dist),
        farK=Object.keys(B.reach2.dist).filter(k=>B.reach.dist[k]===undefined);
  out.counts={near:nearK.length,farOnly:farK.length,
    lit:document.querySelectorAll('#bGrid .hex.lit').length,
    lit2:document.querySelectorAll('#bGrid .hex.lit2').length};
  const one=k=>{const h=document.querySelector('#bGrid [data-k="'+k+'"]');
    return {cls:h.className,fill:getComputedStyle(h.querySelector('.hfill')).backgroundColor};};
  out.near=one(nearK[8]); out.far=one(farK[8]);
  const ring=k=>{const h=document.querySelector('#bGrid [data-k="'+k+'"]');
    return getComputedStyle(h.querySelector('.hedge'),'::after').boxShadow;};
  out.farRing=ring(farK[8]); out.nearRing=ring(nearK[8]);
  out.pips={near:payPips(nearK[8]),far:payPips(farK[8])};
  return out;
})()
