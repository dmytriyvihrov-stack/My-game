(()=>{
  const t0=Date.now?0:0;   /* Date.now is fine in the page */
  const out={hasNew:typeof GEAR!=='undefined'&&!!GEAR.pilum,guard:0,n:0,bad:[],ms:0};
  const start=performance.now();
  for(let i=0;i<24;i++){
    const r=runFight('brigand',{comp:'prepared'});out.n++;
    if(r.guard!=='ok'||(r.errs&&r.errs.length)||r.fatal)
      {out.guard++;out.bad.push(r.rounds+'rd '+r.won+' '+r.guard+' '+(r.fatal||''));}
  }
  out.ms=Math.round(performance.now()-start);
  return out;
})()
