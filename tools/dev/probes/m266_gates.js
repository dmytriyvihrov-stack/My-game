/* #266 - the three ui-scales counters on every screen this entry touches,
   plus the battle card, which shares the bar block. */
(()=>{
  const out={};
  const R=e=>e.getBoundingClientRect();
  ['world','inv'].forEach(s=>{show(s);if(s==='inv'){iSel='you';drawInv();}
    out[s]={floor:GT.floor(),clip:GT.clip()};});
  out.inv.overlap=GT.overlap('iChar');
  out.inv.slack=GT.slack('iChar').slack;
  /* the battle card, which draws the same three rows off the same block */
  startBattle('brigand');GT.playerTurn();render();
  out.battle={floor:GT.floor(),clip:GT.clip()};
  const plq=document.getElementById('bPlq');
  out.plqBars=[...plq.querySelectorAll('.sbar .bar')].map(b=>{
    const a=getComputedStyle(b,'::after'),f=getComputedStyle(b,'::before');
    return b.className+' seg='+(b.parentNode.style.getPropertyValue('--seg')||
      b.style.getPropertyValue('--seg')||'-')+
      ' after='+a.display+' before='+f.display+' h='+R(b).height.toFixed(0);});
  out.plqState=document.getElementById('bState')?
    document.getElementById('bState').textContent.replace(/\s+/g,' ').trim():'-';
  /* the map counters, because the mood chip is on the world bar */
  show('world');
  out.map={spacing:spacingViolations().length,labels:labelViolations().length,
    orphans:Object.entries(MAP_SIGHT).concat(Object.entries(MAP_PLACE))
      .filter(([k,v])=>!MAP_ART[v]).length};
  return out;})()
