/* #269 - "all armor 70% - do it everywhere", proved rather than asserted:
   every body FOE_BUILD can make, plus every roster body, plus every armour row
   in GEAR, asked what fraction of a blow its harness stops. Expect one number. */
(function(){
  const seen={},odd=[];
  const note=(who,sp)=>{const k=sp?sp.arm.toFixed(2)+'/'+sp.body.toFixed(2):'ignores';
    seen[k]=(seen[k]||0)+1;
    if(sp&&Math.abs(sp.arm-ARMOUR_ABSORB)>1e-9)odd.push(who+' '+k);};
  const plain={},sh={};                       /* an ordinary blow, and one that ignores */
  /* every foe the game can build */
  Object.keys(FOE_BUILD).forEach(k=>{
    let side;try{side=FOE_BUILD[k]();}catch(e){odd.push(k+' threw '+e.message);return;}
    (side||[]).forEach(u=>note(k+'/'+u.name,splitFor(u,plain)));
  });
  /* and your own */
  G.party.forEach(p=>note('you/'+p.name,splitFor(unitFrom(p),plain)));
  /* and every harness in the game, worn by each race, through bandOfGear */
  Object.keys(GEAR).filter(k=>GEAR[k].slot==='armour').forEach(k=>{
    ['human','ratkin','ogre'].forEach(r=>{
      const b=bandOfGear(GEAR[k],{race:r});
      if(b&&Math.abs(b.absorb-ARMOUR_ABSORB)>1e-9)odd.push('GEAR.'+k+' on '+r+' '+b.absorb);});
  });
  /* the one deliberate exception, named so it is never mistaken for a band */
  const ig=splitFor({armourMax:40},{am:0});
  return {absorb:ARMOUR_ABSORB, splitsSeen:seen, notSeventy:odd,
          ignoresArmour:ig===null?'null (a working goes through the plates entirely)':ig,
          bandOfWorn:bandOf({armourMax:40}).n||'(no word)',
          bandOfBare:bandOf({armourMax:0}).n};
})()
