/* #267 - do the four bodies come out at the asked figures, and is she four hexes long? */
(()=>{
  const out={};
  const row=u=>({name:u.name,hp:u.hp,arm:u.armour,mor:u.moraleMax,skill:u.mskill,
    dodge:u.dodgeBase,speed:u.speed,acts:u.acts.filter(a=>!a.move)
      .map(a=>a.n+' '+(a.dmg?a.dmg[0]+'-'+a.dmg[1]:'-')),
    fireborn:!!u.fireborn,veiled:!!u.veiled,flier:!!u.flier,
    hexes:(typeof hexesOf==='function')?hexesOf(u).length:1});
  ['warmstones','glassroad','ashdrakes','furnace'].forEach(k=>{
    try{out[k]=FOE_BUILD[k]().map(row);}catch(e){out[k]='THREW: '+e.message;}
  });
  /* the one body per kind, deduped, so the table is readable */
  const seen={},kinds=[];
  Object.keys(out).forEach(k=>{ if(typeof out[k]==='string')return;
    out[k].forEach(u=>{ if(seen[u.name])return; seen[u.name]=1; kinds.push(u); }); });
  return {kinds:kinds,
    counts:Object.keys(out).map(k=>k+': '+(typeof out[k]==='string'?out[k]:out[k].length+' bodies')),
    lint:(()=>{try{const L=LINT();return L.findings.length?L.findings:0;}catch(e){return 'LINT THREW: '+e.message;}})()};
})()
