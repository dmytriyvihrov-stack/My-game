/* #267 - price the four new fights. Reads window.LZ = {kind, comp, n}.
   Kept to ONE fight-comp a call: eyes.py opens its CDP socket with
   timeout=120 on the socket ITSELF, so a long eval dies on recv whatever
   --timeout says, and stacking timed-out evals wedges the page. */
(()=>{
  const K=(window.LZ&&LZ.kind)||'warmstones',
        C=(window.LZ&&LZ.comp)||'four',
        N=(window.LZ&&LZ.n)||10;
  let won=0,rounds=[],errs=[],fatal=null,guards=0,downs=[];
  for(let i=0;i<N;i++){
    const r=runFight(K,{comp:C});
    if(r.fatal){fatal=r.fatal;break;}
    if(r.errs&&r.errs.length)errs=errs.concat(r.errs);
    if(r.guard&&/GUARD/.test(String(r.guard)))guards++;
    if(r.won==='you'||r.won===true)won++;
    rounds.push(r.rounds);
    if(typeof r.downed==='number')downs.push(r.downed);
  }
  rounds.sort((a,b)=>a-b);
  return {fight:K,comp:C,n:N,
    win:Math.round(100*won/(rounds.length||1))+'%',
    rounds:{min:rounds[0],med:rounds[rounds.length>>1],max:rounds[rounds.length-1]},
    guards:guards,
    errs:errs.slice(0,4),
    fatal:fatal};
})()
