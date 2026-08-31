G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
(()=>{openInv();iSel=G.party[1].id;drawInv();
  const t=document.querySelector('.itab[data-t="perks"]')||
    [].slice.call(document.querySelectorAll('.itab')).find(x=>/PERK/i.test(x.textContent));
  if(t)t.click();
  return t?'clicked':'no tab';})()
