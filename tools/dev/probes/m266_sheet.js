/* #266 - the sheet: the header, the ledger, the three bars, and the counters */
(()=>{
  const out={};
  iSel='you';show('inv');drawInv();
  const R=e=>e.getBoundingClientRect();
  out.trait=$('iChar').querySelector('#iTrait').textContent;
  const chip=$('iChar').querySelector('.ichip.xplv');
  out.xpchip=chip?chip.textContent.trim()+' | title='+chip.title:'MISSING';
  /* the three bars: dividers and the mood tick */
  out.bars=[...$('iChar').querySelectorAll('.ibars .sbar .bar')].map(b=>{
    const cs=getComputedStyle(b,'::after'),be=getComputedStyle(b,'::before');
    return {cls:b.className,seg:b.style.getPropertyValue('--seg')||'-',
      afterBg:(cs.backgroundImage||'none').slice(0,34),
      beforeBg:(be.backgroundImage||'none').slice(0,34),
      h:+R(b).height.toFixed(1)};});
  /* ui-scales gates, on this screen */
  out.floor=GT.floor();out.clip=GT.clip();out.overlap=GT.overlap('iChar');
  out.slack=GT.slack('iChar');
  /* the stat hover, driven rather than read */
  const tell=$('iChar').querySelector('[data-tell="str"]');
  tell.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true}));
  const tip=document.getElementById('gtTip');
  out.tipText=tip.textContent.replace(/\s+/g,' ').slice(0,300);
  out.tipBox=[Math.round(R(tip).width),Math.round(R(tip).height)];
  out.totFs=getComputedStyle(tip.querySelector('.ssr.tot .ssv')).fontSize;
  const gv=tip.querySelector('.ssgv');
  out.gvFs=gv?getComputedStyle(gv).fontSize+' '+getComputedStyle(gv).color:'none';
  out.hasBorn=/born/i.test(tip.textContent);
  tip.style.display='none';
  /* the four founders' ledgers, so nothing is left carrying a residual */
  out.ledgers=G.party.map(p=>p.name+': '+STATK.map(k=>k+'['+
    statParts(p)[k].map(r=>r.n+(r.v>0?'+':'')+r.v).join(',')+']').join(' '));
  return out;})()
