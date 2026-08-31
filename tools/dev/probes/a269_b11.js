/* #269 batch 10 + 11 */
(function(){
  const out={};
  out.rarity=Object.keys(RARITY).map(k=>k+'='+RARITY[k].n);
  out.legendary=['woodstick','stoneshield','oddcoin','roll'].map(k=>k+':'+GEAR[k].rarity);
  out.drum=GEAR.drum.rarity+' '+gearPrice('drum');
  out.adjustable=Object.keys(GEAR).filter(k=>GEAR[k].slot==='armour'&&GEAR[k].size==='any');
  /* 7/19 - the bare bodies */
  startBattle('pack');
  out.dogs=B.units.filter(u=>u.side==='foe').map(u=>u.name+' hp '+u.hpMax+' arm '+u.armourMax);
  startBattle('mirehares');
  out.hares=B.units.filter(u=>u.side==='foe').map(u=>u.name+' hp '+u.hpMax+' arm '+u.armourMax);
  /* 6 - crippled shortens the hop */
  const buck=B.units.find(u=>u.acts.some(a=>a.dash));
  const doe=B.units.find(u=>u.acts.some(a=>a.leap));
  if(buck){const a=buck.acts.find(x=>x.dash);
    out.buck='dash '+hopLen(buck,a);buck.crippled=2;out.buckCrippled='dash '+hopLen(buck,a);buck.crippled=0;}
  if(doe){const a=doe.acts.find(x=>x.leap);
    out.doe='leap '+hopLen(doe,a);doe.crippled=2;out.doeCrippled='leap '+hopLen(doe,a);doe.crippled=0;}
  /* 8 - a stripped archer has no signature */
  const p=G.party.find(x=>x.cls==='archer')||G.party[0];
  const keep=p.eq.main,kc=p.cls;
  p.cls='archer';p.eq.main='bow';out.archerArmed=unitFrom(p).acts.map(a=>a.n).join(' | ');
  p.eq.main=null;out.archerBare=unitFrom(p).acts.map(a=>a.n).join(' | ');
  p.cls='brute';out.bruteBare=unitFrom(p).acts.map(a=>a.n).join(' | ');
  p.cls='spear';p.eq.main='sword';out.spearSword=unitFrom(p).acts.map(a=>a.n).join(' | ');
  p.eq.main='spear';out.spearSpear=unitFrom(p).acts.map(a=>a.n).join(' | ');
  p.eq.main=keep;p.cls=kc;
  return out;
})()
