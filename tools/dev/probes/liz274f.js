/* #274 ask 5 - the tongue's blow, drawn where the body LANDS. */
(()=>{
  const out=[];
  for(let try_=0;try_<8&&out.length<1;try_++){
    startBattle('warmstones');
    G.log.length=0;
    const hide=B.units.find(x=>x.side==='foe'&&x.kind==='slaghide');
    const you=B.units.filter(x=>x.side==='you'&&!x.dead)[0];
    const ring=[];
    for(let c=0;c<COLS;c++)for(let r=0;r<ROWS;r++)
      if(B.terr[K(c,r)]!==undefined&&!at(c,r)&&hdist([c,r],[hide.col,hide.row])===2)ring.push([c,r]);
    you.col=ring[0][0];you.row=ring[0][1];
    hide.mskill=400;you.dodgeBase=0;
    B.idx=B.order.indexOf(hide);beginTurn();
    const u=cur();if(u!==hide)continue;
    const pB=hexPt(you);
    B.busy=false;
    try{aiTurn(u);}catch(e){return {threw:e.message};}
    const pA=hexPt(you);
    const flashes=[].slice.call(document.querySelectorAll('#bFx .hitflash'))
      .map(e=>Math.round(parseFloat(e.style.left))+','+Math.round(parseFloat(e.style.top)));
    const nums=[].slice.call(document.querySelectorAll('#bFx>div.fx'))
      .map(e=>'"'+e.textContent+'"@'+Math.round(parseFloat(e.style.left||0))+','+
        Math.round(parseFloat(e.style.top||0)));
    if(!flashes.length&&!/hp\./.test(G.log.join(' ')))continue;
    out.push({moved:pB&&pA&&(pB.x!==pA.x||pB.y!==pA.y),
      from:pB&&Math.round(pB.x)+','+Math.round(pB.y),
      to:pA&&Math.round(pA.x)+','+Math.round(pA.y),
      flashes:flashes,nums:nums,log:G.log.slice()});
  }
  return out;
})()
