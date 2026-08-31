/* #269 - hold/four dropped 30% -> 5% at n=20. WHICH of the two balance knobs
   did it. One reading each, everything else identical. */
(()=>{const N=20,_t=window.TUT_SILENT;window.TUT_SILENT=true;
  const cell=(c,k)=>{const r=ARENA.match(c,k,N).rows;
    return Math.round(100*r.filter(x=>x.won===true||x.won==='mercy').length/N)+'%';};
  const out={};
  out.shipped=cell('four','hold');
  /* the split is read live off ARMOUR_ON by splitFor, so this is a real swap */
  ARMOUR_ON.absorb=.60;ARMOUR_ON.through=.40;
  out.absorb60=cell('four','hold');
  ARMOUR_ON.absorb=.50;ARMOUR_ON.through=.50;
  out.absorb50=cell('four','hold');
  ARMOUR_ON.absorb=.70;ARMOUR_ON.through=.30;
  /* flankPow is baked at build, so the whole side is rebuilt by ARENA anyway */
  GIVEN.opening=15;
  out.opening15=cell('four','hold');
  GIVEN.opening=OPENING;
  window.TUT_SILENT=_t;G.party.length=0;makeParty().forEach(p=>G.party.push(p));
  return out;})()
