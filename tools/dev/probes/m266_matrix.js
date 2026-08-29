/* #266 - the balance matrix, chunked small enough for the 120s socket.
   Same shape and same reasons as matrix263.js; PER is 2 because the lower
   opening mood makes some fights longer, and a timed-out eval wedges the page. */
(() => {
  const N = window.BAL_N || 15, PER = window.BAL_PER || 2;
  const ROAD = ['tavern','chase','clash','brigand','pack','slingline','mirehares',
                'wedding','circle','steading','armour','hold','mother','snare'];
  const JOBS = [];
  ['four','prepared'].forEach(c => ROAD.forEach(k => JOBS.push([c,k])));
  if (!window.__M266 || window.__M266.n !== N) window.__M266 = { n:N, i:0, four:{}, prepared:{} };
  const M = window.__M266;
  const _t = window.TUT_SILENT; window.TUT_SILENT = true;
  let did = 0;
  while (M.i < JOBS.length && did < PER) {
    const [comp,k] = JOBS[M.i];
    const r = ARENA.match(comp,k,N).rows;
    const w = r.filter(x=>x.won===true||x.won==='mercy').length;
    M[comp][k] = { pct: Math.round(100*w/N),
                   rd: +(r.reduce((s,x)=>s+x.rd,0)/N).toFixed(1),
                   down: +(r.reduce((s,x)=>s+x.down,0)/N).toFixed(1) };
    M.i++; did++;
  }
  window.TUT_SILENT = _t;
  G.party.length=0; makeParty().forEach(p=>G.party.push(p));
  return { done: M.i >= JOBS.length, at: M.i + '/' + JOBS.length,
           n: M.n, four: M.four, prepared: M.prepared };
})()
