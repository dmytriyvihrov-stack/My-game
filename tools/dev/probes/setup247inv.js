(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.stash=['oddcoin','mail','draught'];
  G.party[1].hpLoss=9;
  show('inv');openInv();iSel=G.party[1].id;drawInv();
  return {ok:1};
})()
