/* every ranged damage act in the game, by range - #274's STANDOFF check */
(()=>{
  const seen={};
  const add=(who,a)=>{if(!a||!a.dmg)return;
    if(a.range)seen[(a.arcane?'arcane r':'r')+a.range]=
      (seen[(a.arcane?'arcane r':'r')+a.range]||[]).concat([who+'/'+a.k]);
    else if(a.arcane)seen['arcane no-range']=(seen['arcane no-range']||[]).concat([who+'/'+a.k]);};
  Object.keys(FOE_BUILD).forEach(k=>{
    let side;try{side=FOE_BUILD[k]();}catch(e){return;}
    side.forEach(u=>(u.acts||[]).forEach(a=>add(k+':'+u.name,a)));});
  ARENA.COMPS.prepared().forEach(p=>{const u=unitFrom(p,'you',0,0);
    (u.acts||[]).forEach(a=>add('you:'+p.name,a));});
  const out={};Object.keys(seen).sort().forEach(k=>out[k]=[...new Set(seen[k])].slice(0,8));
  return out;
})()
