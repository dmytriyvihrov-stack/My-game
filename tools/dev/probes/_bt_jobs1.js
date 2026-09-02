(() => {
  const COMPS = ['L1','L2','L3','L4'];
  const F = ['tavern','chase','clash','brigand','pack'];
  const J = []; COMPS.forEach(c => F.forEach(k => J.push([c,k])));
  window.BT_JOBS = J; window.BT_N = 20; window.BT_MS = 70000;
  if (window.__BT && !window.__BT.cur) { window.__BT.cur = []; window.__BT.sig = JSON.stringify([20, J]); }
  return {jobs:J.length, at: window.__BT ? window.__BT.i : 0};
})()
