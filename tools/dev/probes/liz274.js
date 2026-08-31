/* #274 - what the lizard line is doing, and why */
(()=>{
  startBattle('warmstones');
  const out={};
  const foes=()=>B.units.filter(x=>x.side==='foe'&&!x.dead);
  out.plan=foes().map(u=>u.name+'@'+u.col+','+u.row+' sp'+u.speed+
    ' acts['+u.acts.map(a=>a.k+(a.range?':r'+a.range:a.reach?':m'+a.reach:'')).join(' ')+']');
  out.you=B.units.filter(x=>x.side==='you'&&!x.dead)
    .map(u=>u.name+'@'+u.col+','+u.row);
  out.dispFoe=disposition('foe');
  out.dispYou=disposition('you');
  const shooters=arr=>arr.filter(x=>x.acts.some(a=>(a.range||a.arcane)&&a.dmg)).length;
  out.myShots=shooters(foes());
  out.theirShots=shooters(B.units.filter(x=>x.side==='you'&&!x.dead));
  out.doct=foes().map(u=>u.name+' band='+doctrine(u).band+' herd='+doctrine(u).herd);
  /* run 6 rounds of the whole fight and log every foe act + every position */
  const log=[];
  const oldSay=window.say;
  let rounds=0;
  B.auto=false;
  /* drive turns synchronously-ish: call aiTurn but it uses `later`. Instead
     just record what each foe WOULD decide by re-reading the gates. */
  foes().forEach(u=>{
    const T=B.units.filter(x=>x.side!==u.side&&!x.dead);
    const disp=B.disp&&B.disp[u.side]||{hold:false};
    const holds=disp.hold&&!u.ally;
    const iShoot=u.acts.some(a=>(a.range||a.arcane)&&a.dmg&&canUse(u,a));
    const canSwing=u.acts.some(a=>a.dmg&&!a.range&&!a.arcane&&
      T.some(t=>udist(u,t)<=(a.reach||1)));
    const shotInRange=u.acts.some(a=>(a.range||a.arcane)&&a.dmg&&canUse(u,a)&&
      T.some(t=>udist(u,t)<=(a.range||a.reach||0)));
    const rooted=holds&&aip(u).hold&&!canSwing&&!engaged(u)&&
      (u.acts.some(a=>(a.range||a.arcane)&&a.dmg));
    log.push(u.name+' holds='+holds+' iShoot='+iShoot+' canSwing='+canSwing+
      ' shotInRange='+shotInRange+' rooted='+rooted+
      ' nearest='+Math.min.apply(null,T.map(t=>udist(u,t))));
  });
  out.gates=log;
  out.Bdisp=B.disp;
  return out;
})()
