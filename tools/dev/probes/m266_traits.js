/* #266 - the sheet's personality line, over EVERY trait in the table.
   The filter must take a clause that is ONLY a stat restatement and must not
   touch a clause that says something else. One row a trait, both forms. */
(()=>Object.keys(TRAITS).map(k=>{
  const p={trait:k,race:'human'};
  const full=traitShort(p),cut=traitSheetShort(p);
  return (cut===full?'   ':'CUT')+' '+k.padEnd(12)+' | '+full+
    (cut===full?'':'   ->   '+(cut||'(name alone)'));}))()
