/* BATTLETEST 2026-09-02 - level ladder, the level-4 class pick, and artifacts.
   ⛔ THE UNIT IS ONE FIGHT, NOT ONE JOB. eyes.py's CDP socket dies at 120s on
   the socket itself, and on this build a job of 20 fights runs past that: the
   first cut lost two finished jobs to a TimeoutError and only got them back
   because the page kept running after the socket gave up. It now stops on a
   wall-clock budget mid-job and resumes where it stood.
   Knobs: window.BT_N, window.BT_MS (budget per call), window.BT_JOBS.  */
(() => {
  const N = window.BT_N || 20, MS = window.BT_MS || 70000;

  const PICK = {captain:['grandcmd','battlefury'], spear:['spearrun','bracewall'],
                warmage:['breaking','unmaking'],  archer:['pierceshot','longshot']};
  const mk = (lvl, opt) => () => {
    opt = opt || {};
    const P = makeParty();
    P.forEach(p => {
      simLevelTo(p, lvl);
      const want = opt.pick && opt.pick[p.cls];
      if (want && (p.perks||[]).indexOf(want) < 0 && clsLaneOpen(p).indexOf(want) >= 0) {
        p.perks.push(want); p.freePicks = Math.max(0, (p.freePicks||0) - 1);
      }
      if (opt.trinket) { const t = opt.trinket[p.cls] || opt.trinket['*']; if (t) p.eq.trinket = t; }
      if (opt.eq) { const e = opt.eq[p.cls] || opt.eq['*']; if (e) Object.assign(p.eq, e); }
    });
    return P;
  };
  const side = i => ({pick:{captain:PICK.captain[i], spear:PICK.spear[i],
                           warmage:PICK.warmage[i], archer:PICK.archer[i]}});
  const C = ARENA.COMPS;
  [1,2,3,4,5].forEach(l => C['L'+l] = mk(l));
  C.L4a = mk(4, side(0)); C.L4b = mk(4, side(1));
  Object.keys(PICK).forEach(cls => PICK[cls].forEach(k => C['L4_'+k] = mk(4, {pick:{[cls]:k}})));
  window.BT_MK = mk;                       /* so a later probe can add comps */

  const JOBS = window.BT_JOBS;
  if (!JOBS) return {err:'set window.BT_JOBS first'};
  const sig = JSON.stringify([N, JOBS]);
  if (!window.__BT || window.__BT.sig !== sig) window.__BT = {sig:sig, i:0, k:0, cur:[], res:{}};
  const M = window.__BT;
  const _t = window.TUT_SILENT; window.TUT_SILENT = true;
  const fresh = []; const t0 = Date.now();
  try {
    while (M.i < JOBS.length && Date.now() - t0 < MS) {
      const [comp, k] = JOBS[M.i];
      M.cur.push(ARENA.match(comp, k, 1).rows[0]);
      if (M.cur.length >= N) {
        const r = M.cur, w = r.filter(x => x.won === true || x.won === 'mercy').length;
        const row = {win: Math.round(100*w/N),
                     rd: +(r.reduce((s,x)=>s+x.rd,0)/N).toFixed(1),
                     down: +(r.reduce((s,x)=>s+x.down,0)/N).toFixed(2),
                     wipe: r.filter(x => x.down >= 4).length};
        M.res[comp + '|' + k] = row;
        fresh.push(Object.assign({job: comp + ' vs ' + k}, row));
        M.cur = []; M.i++;
      }
    }
  } finally {
    window.TUT_SILENT = _t;
    G.party.length = 0; makeParty().forEach(p => G.party.push(p));
  }
  const out = {done: M.i >= JOBS.length, at: M.i + '/' + JOBS.length + ' +' + M.cur.length,
               n: N, secs: Math.round((Date.now()-t0)/1000), fresh: fresh};
  if (out.done) out.all = M.res;
  return out;
})()
