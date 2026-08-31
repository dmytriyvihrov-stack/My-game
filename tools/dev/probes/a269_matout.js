/* the accumulated matrix, as one line a fight */
(()=>{const M=window.__M263;if(!M)return 'no matrix';
  const ks=Object.keys(M.four);
  return ks.map(k=>k.padEnd(11)+' four '+String(M.four[k].pct).padStart(3)+'% rd '+
    M.four[k].rd+' | prepared '+String((M.prepared[k]||{}).pct).padStart(3)+'% rd '+
    (M.prepared[k]||{}).rd);})()
