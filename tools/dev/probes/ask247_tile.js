/* what the roster tile measures, on the worst body it can have: mending, a
   wound on the clock, two scars and armour that does not fit. Then again at
   two narrower column widths, because the ask was for it to be smaller and the
   only thing that can give is the width. */
(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  const p=G.party[1];
  p.hpLoss=9;p.hurt={days:2,lasting:false};p.injuries=[{d:'a'},{d:'b'}];
  p.perkPoints=1;
  show('inv');openInv();iSel=G.party[0].id;drawInv();
  const R=()=>{const t=document.querySelectorAll('.rmem');
    return {tiles:[].slice.call(t).map(e=>Math.round(e.getBoundingClientRect().width)+'x'+
      Math.round(e.getBoundingClientRect().height)),
      worst:Math.round(t[1].getBoundingClientRect().height),
      wear:(t[1].querySelector('.rc')||{}).textContent};};
  const out={at176:R()};
  const ros=document.getElementById('iRoster');
  [156,140,120].forEach(w=>{ros.style.width=w+'px';drawInv();out['at'+w]=R();});
  ros.style.width='';drawInv();
  return out;
})()
