/* #266 - the eye check: the sheet's header, its three socketed+divided bars,
   and the STRENGTH ledger with the total as the headline. Driven, then held
   still - the stat tip is opened by hand so the capture has it in it. */
(()=>{
  G.party.length=0;makeParty().forEach(p=>G.party.push(p));
  iSel='you';show('inv');drawInv();
  const el=$('iChar').querySelector('[data-tell="str"]');
  el.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true,clientX:520,clientY:300}));
  const tip=document.getElementById('gtTip');
  tip.style.left='612px';tip.style.top='150px';tip.style.display='block';
  return {tip:[Math.round(tip.getBoundingClientRect().width),
               Math.round(tip.getBoundingClientRect().height)]};})()
