/* #266 - is a fight on the merged build failing to TERMINATE, or was that the
   instrument? Runs the two jobs the loop wedged on, ONE fight at a time, and
   reports the guard's own verdict per run rather than an average.
   ⚠ `ARENA.match` stalls are what #248 traced to the tutorial lock; TUT_SILENT
   is set here because the harness does not set it (dev README). */
(()=>{
  const N=window.ST_N||4;
  const JOBS=window.ST_JOBS||[['four','clash'],['four','brigand']];
  if(!window.__ST)window.__ST={i:0,out:[]};
  const M=window.__ST;
  const _t=window.TUT_SILENT;window.TUT_SILENT=true;
  const t0=Date.now();
  if(M.i<JOBS.length){
    const [c,k]=JOBS[M.i];
    const r=ARENA.match(c,k,N).rows;
    M.out.push(c+'/'+k+'  '+r.map(x=>x.won+'@'+x.rd+'rd').join(' ')+
      '   maxRounds '+Math.max.apply(null,r.map(x=>x.rd))+
      '   '+(Date.now()-t0)+'ms');
    M.i++;}
  window.TUT_SILENT=_t;
  G.party.length=0;makeParty().forEach(p=>G.party.push(p));
  return {done:M.i>=JOBS.length,at:M.i+'/'+JOBS.length,n:N,out:M.out};})()
