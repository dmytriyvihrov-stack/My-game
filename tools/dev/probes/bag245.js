(()=>{
  const out={};
  const turnTo=u=>{const i=B.order.indexOf(u);if(i<0)return false;B.idx=i;return true;};
  const R=runFight('brigand',{setup:(BB)=>{try{
    const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
    B.idx=i;beginTurn();const me=cur();
    const m=member(me.id);
    const equip=k=>{m.eq.bag=k;const u2=unitFrom(m);
      me.acts=u2.acts;me.bag=u2.bag;me.bagUsed={};me.actions=2;turnTo(me);
      return me.acts.filter(a=>a.bag);};

    /* ── the draught ── */
    let cards=equip('draught');
    out.draught_card=cards.map(a=>a.n+' cost'+a.cost+' uses'+(a.uses||1));
    const dr=me.acts.find(a=>a.k==='draught');
    me.hp=me.hpMax-25;
    out.draught_before={hp:me.hp,canUse:canUse(me,dr)};
    selectAct(me.acts.indexOf(dr));
    out.draught_after={hp:me.hp,healed:me.hp-(me.hpMax-25),
      spent:JSON.stringify(me.bagUsed),canUseAgain:canUse(me,dr),
      hidden:hideAct(me,dr)};
    me.hp=me.hpMax-25;
    out.draught_refusedWhenSpent=!canUse(me,dr);
    me.bagUsed={};me.hp=me.hpMax;
    out.draught_refusedAtFullHp=!canUse(me,dr);
    /* it may not overheal */
    me.bagUsed={};me.hp=me.hpMax-4;me.actions=2;
    selectAct(me.acts.indexOf(dr));
    out.draught_noOverheal={hp:me.hp,max:me.hpMax};

    /* ── the shuriken ── */
    cards=equip('shuriken');
    out.shuriken_card=cards.map(a=>a.n+' range'+a.range+' uses'+a.uses+' slow'+a.slow);
    const th=me.acts.find(a=>a.k==='bagthrow');
    const foe=BB.units.filter(u=>u.side==='foe'&&!u.dead)[0];
    foe.hp=foe.hpMax;foe.armour=0;foe.slowed=0;me.mskill=999;
    strike(me,foe,th);           out.shuriken_slowedAfter1=foe.slowed;
    strike(me,foe,th);           out.shuriken_refreshNotStack=foe.slowed;
    out.shuriken_badge=statusesOn(foe).map(s=>s.n);
    foe.actionsMax=2;foe.banked=0;foe.hp=foe.hpMax;
    turnTo(foe);beginTurn();
    out.shuriken_foeActionsNextTurn=foe.actions;
    out.shuriken_clearedAfter=foe.slowed||0;
    turnTo(foe);beginTurn();
    out.shuriken_turnAfterThat=foe.actions;
    /* two throws a fight, and no third */
    turnTo(me);me.bagUsed={};me.actions=2;
    out.shuriken_uses=[canUse(me,th)];
    me.bagUsed={bagthrow:1};out.shuriken_uses.push(canUse(me,th));
    me.bagUsed={bagthrow:2};out.shuriken_uses.push(canUse(me,th));

    /* ── the pilum ── */
    cards=equip('pilum');
    out.pilum_card=cards.map(a=>a.n+' range'+a.range+' dmg'+JSON.stringify(a.dmg)+
      ' am'+a.am+' uses'+a.uses);
    const pi=me.acts.find(a=>a.k==='bagthrow');
    me.bagUsed={};out.pilum_first=canUse(me,pi);
    me.bagUsed={bagthrow:1};out.pilum_second=canUse(me,pi);

    /* ── the cube ── */
    cards=equip('timecube');
    out.cube_card=cards.map(a=>a.n+' uses'+a.uses);
    const cu=me.acts.find(a=>a.k==='baguse');
    B.round=3;B.cubeUntil=0;
    selectAct(me.acts.indexOf(cu));
    out.cube={until:B.cubeUntil,round:B.round,consumed:m.eq.bag===null,
      spent:JSON.stringify(me.bagUsed),
      greysNotHides:(!canUse(me,cu)&&!hideAct(me,cu))};
    const f2=BB.units.filter(u=>u.side==='foe'&&!u.dead)[1]||foe;
    f2.slowed=0;f2.hp=f2.hpMax;f2.banked=0;
    out.cube_badge=statusesOn(f2).map(s=>s.n);
    f2.actionsMax=2;turnTo(f2);beginTurn();  out.cube_foeActions=f2.actions;
    f2.actionsMax=1;turnTo(f2);beginTurn();  out.cube_oneActionKeepsOne=f2.actions;
    /* and YOUR side is untouched */
    me.actionsMax=2;me.banked=0;turnTo(me);beginTurn(); out.cube_yourActions=me.actions;
    B.round=B.cubeUntil+1;
    f2.actionsMax=2;turnTo(f2);beginTurn();  out.cube_afterExpiry=f2.actions;
    out.cube_badgeAfter=statusesOn(f2).map(s=>s.n);
  }catch(e){out.THREW=String(e.message);}
  }});
  out.fatal=R&&R.fatal;
  return out;
})()
