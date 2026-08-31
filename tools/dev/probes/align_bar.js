/* the top bar's spare room on a REAL run, both hosts */
(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  enterWorld();
  const R=e=>e&&e.getBoundingClientRect();
  const read=(host)=>{
    const wb=$(host);if(!wb)return null;
    const kids=[...wb.children].filter(c=>R(c).width>0);
    let l=1e9,r=-1e9;kids.forEach(c=>{const b=R(c);l=Math.min(l,b.left);r=Math.max(r,b.right);});
    return {w:Math.round(R(wb).width),usedLeft:Math.round(l),usedRight:Math.round(r),
      kids:kids.map(c=>(c.id||c.className)+' '+Math.round(R(c).left)+'..'+Math.round(R(c).right)),
      chips:[...wb.querySelectorAll('.cchip,.rseg,.tchip')]
        .map(e=>(e.dataset.w||e.className.replace(/ .*/,''))+' '+Math.round(R(e).width))};
  };
  const world=read('wBar');
  show('inv');const inv=read('iBar');show('world');
  return {world,inv,
    gapMidBar:world?Math.round(1280-86-world.usedRight):null,
    deeds:G.deeds,sins:(G.sins||[]).length};
})()
