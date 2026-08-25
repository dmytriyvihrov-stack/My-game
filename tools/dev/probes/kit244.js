/* #244 - the kit bench, the strain readout, ask 1 and ask 2. */
(() => {
  const o={};
  /* ask 1 - a lower start for your side only */
  o.a1=(()=>{const keep=G.morale;const out=[];
    [-60,0,60].forEach(v=>{G.morale=v;const u=unitFrom(member('you'));
      out.push({morale:v,rung:moodState(v).n,start:u.morale0,max:u.moraleMax,
                frac:+(u.morale0/u.moraleMax).toFixed(2),
                rungInFight:LADDER[ladderAt({morale:u.morale0,moraleMax:u.moraleMax})].n});});
    G.morale=keep;
    return {you:out,START_NERVE:START_NERVE,START_NERVE_YOU:START_NERVE_YOU};})();

  /* ask 2 - the road's own normalisation, driven a week */
  o.a2=(()=>{const snap=JSON.parse(JSON.stringify(G));const out=[];
    [70,30,-30,-70].forEach(v=>{G.morale=v;const walk=[v];
      for(let i=0;i<4;i++){const rung=moodRung(G.morale);
        if(rung!==MOOD_NORM)G.morale+=(rung<MOOD_NORM?1:-1)*(Math.abs(rung-MOOD_NORM)>1?2:1);
        walk.push(G.morale);}
      out.push({from:v,rung:moodState(v).n,fourDays:walk});});
    Object.keys(G).forEach(k=>delete G[k]);Object.keys(snap).forEach(k=>G[k]=snap[k]);
    return out;})();

  /* the kit bench */
  TEST.on=true;
  startBattle('brigand');SIM.on=true;
  syncBrush();
  const bx=$('kitBox');
  o.kit={box:!!bx, shown:bx&&bx.classList.contains('on'),
         gearOptions:bx?bx.querySelector('[data-kt="gear"]').options.length:0,
         actOptions:bx?bx.querySelector('[data-kt="act"]').options.length:0,
         someActs:devActCatalog().slice(0,6).map(a=>a.n+' ('+a.from+')')};
  /* arm a skill and give it to a foe */
  const foe=B.units.find(x=>x.side==='foe'&&!x.dead);
  const skill=devActCatalog().find(a=>a.n==='BLIGHT-WIND')||devActCatalog()[0];
  SIM.kit={t:'act',k:skill.n};
  const before=(foe.acts||[]).map(a=>a.n);
  devKitAt(foe.col,foe.row);
  o.giveSkill={who:foe.name,before:before,after:(foe.acts||[]).map(a=>a.n),
               shared:(()=>{const other=B.units.find(x=>x.side==='foe'&&x!==foe);
                 return other?(other.acts||[]).map(a=>a.n).indexOf(skill.n)>=0:'-';})()};
  /* arm an item and give it to one of yours */
  const you=B.units.find(x=>x.side==='you'&&!x.dead&&member(x.id));
  you.hp=Math.round(you.hpMax*0.4);
  const b2={hp:you.hp,hpMax:you.hpMax,acts:(you.acts||[]).map(a=>a.n),
            col:you.col,row:you.row,dmgBonus:you.dmgBonus};
  SIM.kit={t:'gear',k:'maul'};
  devKitAt(you.col,you.row);
  o.giveGear={who:you.name,before:b2,
              after:{hp:you.hp,hpMax:you.hpMax,acts:(you.acts||[]).map(a=>a.n),
                     col:you.col,row:you.row,dmgBonus:you.dmgBonus,
                     eq:member(you.id).eq.main}};
  SIM.kit=null;
  /* the panel must not sit over playable ground */
  o.chrome=(()=>{const R=e=>e.getBoundingClientRect();
    const r=R(bx);
    return {rect:[+r.left.toFixed(0),+r.top.toFixed(0),+r.width.toFixed(0),+r.height.toFixed(0)],
      hexesUnder:[...document.querySelectorAll('#bGrid .hex')].filter(h=>{const a=R(h);
        return a.right>r.left+1&&a.left<r.right-1&&a.bottom>r.top+1&&a.top<r.bottom-1;}).length,
      overButtons:['bEnd','bUndo','reactBar','testBtn'].filter(id=>{const e=$(id);
        if(!e)return false;const a=R(e);
        return a.right>r.left&&a.left<r.right&&a.bottom>r.top&&a.top<r.bottom;})};})();

  /* ask 7 - one float, and the plaque answers */
  o.a7=(()=>{const u=B.units.find(x=>x.side==='you'&&x.caster);
    if(!u)return 'no caster on this field';
    B.idx=B.order.indexOf(u);beginTurn();
    const a=(u.acts||[]).find(x=>x.strain);
    document.querySelectorAll('#bFx .fx').forEach(e=>e.remove());
    const before=u.morale;
    payStrain(u,a);
    const now=[...document.querySelectorAll('#bFx .fx')].map(e=>e.textContent+
      ' size:'+getComputedStyle(e).fontSize);
    return {cost:strainCost(u,a),from:before,to:u.morale,floats:now,
            flash:$('bState').className,
            anim:getComputedStyle($('bState')).animationName};})();
  TEST.on=false;SIM.on=false;
  return o;
})()
