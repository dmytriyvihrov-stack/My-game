/* the standing gates, plus the two new dev panels on screen at once. */
(() => {
  const o={lint:LINT().findings};
  openInv();o.sheet={floor:GT.floor(),clip:GT.clip()};o.sheetOverlap=GT.overlap('iChar');
  TEST.on=true;startBattle('brigand');SIM.on=true;syncBrush();GT.playerTurn();render();
  o.battle={floor:GT.floor(),clip:GT.clip()};
  o.devPanels=(()=>{const R=e=>e.getBoundingClientRect();
    return ['brushBox','kitBox'].map(id=>{const e=$(id);const r=R(e);
      return id+' '+(e.classList.contains('on')?'shown':'hidden')+
        ' hexesUnder '+[...document.querySelectorAll('#bGrid .hex')].filter(h=>{const a=R(h);
          return a.right>r.left+1&&a.left<r.right-1&&a.bottom>r.top+1&&a.top<r.bottom-1;}).length+
        ' bottom '+Math.round(r.bottom-R($('stage')).top);});})();
  TEST.on=false;SIM.on=false;syncBrush();
  show('world');if(typeof drawMap==='function')drawMap();
  o.map={spacing:spacingViolations().length,label:labelViolations().length,
         orphans:Object.entries(MAP_SIGHT).concat(Object.entries(MAP_PLACE))
           .filter(([k,v])=>!MAP_ART[v]).length};
  o.cards={emdash:/—/.test(JSON.stringify(EVENTS)),
           noIco:Object.values(EVENTS).flatMap(e=>e.choices).filter(c=>!c.ico||!c.ico.length).length,
           mystery:Object.values(EVENTS).flatMap(e=>e.choices).filter(c=>c.mystery).length};
  /* the mood hover's new rate line */
  o.moodX=(()=>{const keep=G.morale,out=[];
    [70,20,0,-20,-70].forEach(v=>{G.morale=v;worldTick();
      const el=document.querySelector('#wCompany [data-w="mood"]');
      const r=el.getBoundingClientRect();
      el.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true,clientX:r.left+5,clientY:r.top+5}));
      const t=$('gtTip');
      out.push(moodState(v).n+' -> '+(t.querySelector('.tx')||t).textContent.slice(-120));});
    G.morale=keep;worldTick();return out;})();
  return o;
})()
