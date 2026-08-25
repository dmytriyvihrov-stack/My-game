(()=>{const sum=r=>{const w=r.rows.filter(x=>x.won===true).length;
  return (100*w/r.rows.length).toFixed(0)+'% ('+w+'/'+r.rows.length+') · '+
    (r.rows.reduce((s,x)=>s+x.rd,0)/r.rows.length).toFixed(1)+'rd';};
 return {snare_n30: sum(ARENA.match('prepared','snare',30))};})()
