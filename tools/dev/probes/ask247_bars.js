(()=>{
  const out={};
  window.TUT_SILENT=true;if(typeof learnSkip==='function')learnSkip();
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();if(typeof tutClose==='function')tutClose();
  render();
  const bar=u=>{const h=document.querySelector('#bGrid [data-k="'+K(u.col,u.row)+'"]');
    const d=h&&[].slice.call(h.querySelectorAll('.ubars>div')).filter(x=>!x.classList.contains('arm'))[0];
    return d?getComputedStyle(d.querySelector('i')).backgroundColor:'?';};
  const you=B.units.find(u=>u.side==='you'&&!u.dead&&!u.ally&&!u.pet);
  const foe=B.units.find(u=>u.side==='foe'&&!u.dead);
  out.tokenYouFull=bar(you); out.tokenFoeFull=bar(foe);
  /* hurt it and read both again: the ramp must still brighten */
  you.hp=Math.round(you.hpMax*0.2);render();
  out.tokenYouHurt=bar(you);
  out.cardHpHurt=(()=>{inspect(you,{currentTarget:GT.hexOf(you)});
    return getComputedStyle(document.getElementById('bHp')).backgroundColor;})();
  you.hp=you.hpMax;render();
  inspect(foe,{currentTarget:GT.hexOf(foe)});
  out.cardHpFoe=getComputedStyle(document.getElementById('bHp')).backgroundColor;
  inspect(you,{currentTarget:GT.hexOf(you)});
  out.cardHpYou=getComputedStyle(document.getElementById('bHp')).backgroundColor;
  return out;
})()
