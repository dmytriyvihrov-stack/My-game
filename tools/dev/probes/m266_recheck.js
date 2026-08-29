/* #266 - the three fight-comps the n=15 sweep flagged, re-run at n=30.
   ⚠ A 20-point swing at n=15 is three fights, which is inside the noise this
   repo has written down twice (*n=6 cannot tell 0% from 20%*). Anything that
   survives n=30 on both builds is the finding; anything that does not was the
   sample. */
(() => {
  const JOBS=window.RC_JOBS||[['four','tavern'],['four','slingline'],['prepared','mother']];
  const N=window.RC_N||30, PER=window.RC_PER||1;
  if(!window.__RC||window.__RC.n!==N)window.__RC={n:N,i:0,r:{}};
  const M=window.__RC;
  const _t=window.TUT_SILENT;window.TUT_SILENT=true;
  let did=0;
  while(M.i<JOBS.length&&did<PER){
    const [c,k]=JOBS[M.i];
    const r=ARENA.match(c,k,N).rows;
    const w=r.filter(x=>x.won===true||x.won==='mercy').length;
    M.r[c+'/'+k]={pct:Math.round(100*w/N),won:w,of:N,
      rd:+(r.reduce((s,x)=>s+x.rd,0)/N).toFixed(1)};
    M.i++;did++;}
  window.TUT_SILENT=_t;
  G.party.length=0;makeParty().forEach(p=>G.party.push(p));
  return {done:M.i>=JOBS.length,at:M.i+'/'+JOBS.length,n:N,r:M.r};
})()
