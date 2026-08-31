/* #269 - the three other cells that moved 20+ points at n=15, re-read at n=20.
   n=15 cannot tell 27% from 0%; this can. */
(()=>{const N=20,_t=window.TUT_SILENT;window.TUT_SILENT=true;
  const cell=(c,k)=>{const r=ARENA.match(c,k,N).rows;
    return Math.round(100*r.filter(x=>x.won===true||x.won==='mercy').length/N)+'% rd '+
      (r.reduce((s,x)=>s+x.rd,0)/N).toFixed(1);};
  const out={holdFour:cell('four','hold'),circlePrep:cell('prepared','circle'),
             snarePrep:cell('prepared','snare')};
  window.TUT_SILENT=_t;G.party.length=0;makeParty().forEach(p=>G.party.push(p));
  return out;})()
