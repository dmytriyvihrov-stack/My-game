/* the eight tier-4 class cards, one class at a time, with a TALLY on strike():
   a win rate at n=20 cannot separate one perk on one body from noise, but how
   often the card is played and what it pays can. */
(() => {
  if (!window.__TALLY) {
    window.__TALLY = {}; const _s = strike;
    strike = function(a,d,act,mult){
      const h0 = d.hp, r = _s.apply(this, arguments);
      const k = (a.side||'?') + ':' + ((act&&act.k)||'?');
      const t = window.__TALLY[k] = window.__TALLY[k] || {n:0, dmg:0};
      t.n++; t.dmg += Math.max(0, h0 - d.hp); return r;
    };
  }
  const P = ['grandcmd','battlefury','spearrun','bracewall','breaking','unmaking',
             'pierceshot','longshot'];
  const F = ['brigand','pack'], J = [];
  P.forEach(p => F.forEach(k => J.push(['L4_'+p, k])));
  window.BT_JOBS = J; window.BT_N = 20; window.BT_MS = 60000;
  return {jobs:J.length, tally:'on'};
})()
