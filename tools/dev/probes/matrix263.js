/* #263 - the balance matrix, ACCUMULATED A FEW FIGHTS AT A TIME.

     python tools/dev/gt.py eval tools/dev/probes/matrix263.js   (repeat until done:true)

   ⛔ IT IS CHUNKED BECAUSE THE SOCKET, NOT THE PROBE, IS WHAT TIMES OUT.
   `eyes.py` opens its CDP connection with `timeout=120` on the socket itself,
   so ANY single eval over two minutes dies on `recv` no matter what
   `--timeout` says - and the re-stat made the long fights long enough to hit
   it. Each call does `PER` fight-comps and returns what it has; run it again
   until `done` is true.
   ⚠ TUT_SILENT is set by runFight and NOT by ARENA.match, so a driven page can
   stall a match on the tutorial's own lock (dev README, #248). Set it here. */
(() => {
  const N = window.BAL_N || 15, PER = window.BAL_PER || 6;
  const ROAD = ['tavern','chase','clash','brigand','pack','slingline','mirehares',
                'wedding','circle','steading','armour','hold','mother','snare'];
  const JOBS = [];
  ['four','prepared'].forEach(c => ROAD.forEach(k => JOBS.push([c,k])));
  if (!window.__M263 || window.__M263.n !== N) window.__M263 = { n:N, i:0, four:{}, prepared:{} };
  const M = window.__M263;
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
