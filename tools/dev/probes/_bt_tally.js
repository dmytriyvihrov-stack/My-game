(() => { const t = window.__TALLY||{}; const rows = Object.keys(t).map(k=>({k:k,n:t[k].n,
  dmg:Math.round(t[k].dmg), per:+(t[k].dmg/Math.max(1,t[k].n)).toFixed(1)}));
  rows.sort((a,b)=>b.dmg-a.dmg); return rows; })()
