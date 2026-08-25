(()=>{
  const out={},R=e=>e.getBoundingClientRect();
  window.TUT_SILENT=true;if(typeof learnSkip==='function')learnSkip();
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();if(typeof tutClose==='function')tutClose();
  const d=document.getElementById('tutDim');if(d)d.classList.remove('on');
  const cd=document.getElementById('tutCard');if(cd)cd.style.display='none';
  render();
  const mb=document.getElementById('menuBtn'),r=R(mb);
  out.menuBtn={x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)};
  out.onTop=(t=>t?t.tagName+'#'+t.id:'')(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2));
  /* #240's own counter: what chrome is standing on */
  out.hexesUnder=[].slice.call(document.querySelectorAll('#bGrid .hex')).filter(h=>{const a=R(h);
    return a.right>r.left+1&&a.left<r.right-1&&a.bottom>r.top+1&&a.top<r.bottom-1;}).length;
  ['bZoom','bPace','audioBox'].forEach(id=>{const e=document.getElementById(id);
    if(e){const q=R(e);out[id]={y:Math.round(q.top),b:Math.round(q.bottom),
      disp:getComputedStyle(e).display};}});
  /* the user's note: the over-head bars must not move */
  const you=B.units.find(u=>u.side==='you'&&!u.dead),foe=B.units.find(u=>u.side==='foe'&&!u.dead);
  const bar=u=>{const h=document.querySelector('#bGrid [data-k="'+K(u.col,u.row)+'"]');
    const b=h&&h.querySelector('.ubars i,.hpb i,.ubar i,.stbar i');
    return b?getComputedStyle(b).backgroundColor:'?';};
  out.tokenYou=bar(you);out.tokenFoe=bar(foe);
  out.cardHp=getComputedStyle(document.getElementById('bHp')).backgroundColor;
  return out;
})()
