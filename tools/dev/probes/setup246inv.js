(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.stash=['pilum','mail','draught'];
  show('inv');openInv();iSel=G.party[3].id;drawInv();
  const R=e=>{const r=e.getBoundingClientRect();
    return Math.round(r.width)+'x'+Math.round(r.height);};
  return {tiles:[...document.querySelectorAll('.rmem')].map(e=>R(e)),
    chipImgs:[...document.querySelectorAll('#iChips .ichip img')].map(e=>R(e)),
    chips:[...document.querySelectorAll('#iChips .ichip')].map(e=>R(e))};
})()
