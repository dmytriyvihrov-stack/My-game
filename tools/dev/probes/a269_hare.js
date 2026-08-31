/* #269 - the one cell that moved more than noise: mirehares/prepared.
   n=20, and with the pass-through switched off inside the same build, so the
   two readings differ in ONE thing. */
(()=>{
  const N=20,_t=window.TUT_SILENT;window.TUT_SILENT=true;
  const run=()=>{const r=ARENA.match('prepared','mirehares',N).rows;
    return Math.round(100*r.filter(x=>x.won===true||x.won==='mercy').length/N)+'% rd '+
      (r.reduce((s,x)=>s+x.rd,0)/N).toFixed(1);};
  const out={};
  out.asShipped=run();
  /* switch the pass-through off: chargeLanes only steps over a same-side body
     when it is handed a side, so blanking u.side inside moveEnvelope is not
     enough - monkey-patch the function instead. */
  const real=window.chargeLanes;
  window.chargeLanes=(f,l,ig)=>real(f,l,ig);          /* side dropped */
  out.noPassThrough=run();
  window.chargeLanes=real;
  out.four=(()=>{const r=ARENA.match('four','mirehares',N).rows;
    return Math.round(100*r.filter(x=>x.won===true||x.won==='mercy').length/N)+'%';})();
  window.TUT_SILENT=_t;
  G.party.length=0;makeParty().forEach(p=>G.party.push(p));
  return out;})()
