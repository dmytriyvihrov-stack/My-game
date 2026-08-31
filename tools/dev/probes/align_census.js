/* WHAT THE WORLD COULD EVER WEIGH: every door in every deck, by intent. */
(()=>{
  const decks={EVENTS:typeof EVENTS!=='undefined'?EVENTS:{},
               CAMPS:typeof CAMPS!=='undefined'?CAMPS:{},
               VIGNETTES:typeof VIGNETTES!=='undefined'?VIGNETTES:{}};
  const tally={},per={},pairs={};
  Object.entries(decks).forEach(([dn,d])=>{
    per[dn]={doors:0,cards:0};
    Object.values(d||{}).forEach(e=>{
      const ch=(e&&e.choices)||[];if(!ch.length)return;per[dn].cards++;
      ch.forEach(c=>{per[dn].doors++;
        const ic=(c.ico||[]).filter(k=>CHOICE_ICO[k]);
        if(!ic.length){tally['(bare)']=(tally['(bare)']||0)+1;return;}
        ic.forEach(k=>{tally[k]=(tally[k]||0)+1;});
        if(ic.length>1){const key=ic.slice().sort().join('+');pairs[key]=(pairs[key]||0)+1;}
      });});
  });
  /* doors that could ever be taken in ONE run: cards are dealt, so this is a
     ceiling not a route. How many cards does a run actually open? */
  return {tally,per,pairs,
    mercy:(typeof MERCY!=='undefined'&&MERCY.opts)?MERCY.opts.length:null,
    deedsNow:(typeof G!=='undefined')?G.deeds:null,
    sinsNow:(typeof G!=='undefined')?(G.sins||[]).length:null};
})()
