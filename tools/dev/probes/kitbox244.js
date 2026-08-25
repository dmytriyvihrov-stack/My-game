/* #244 - the kit panel against the board, at every camera stop and on the two
   widest fields. ui-scales.md 4d: chrome that grows sideways over a board is a
   fault, and the check is what hexes are under it. */
(() => {
  TEST.on=true;
  const R=e=>e.getBoundingClientRect();
  const out=[];
  ['brigand','pack'].forEach(kind=>{
    startBattle(kind);SIM.on=true;syncBrush();
    CAMS.forEach((cam,i)=>{camSet(i);render();
      ['brushBox','kitBox'].forEach(id=>{
        const e=$(id),r=R(e);
        out.push(kind+' '+cam.k+' '+id+': hexes '+
          [...document.querySelectorAll('#bGrid .hex')].filter(h=>{const a=R(h);
            return a.right>r.left+1&&a.left<r.right-1&&a.bottom>r.top+1&&a.top<r.bottom-1;}).length+
          ' box '+[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]);});});
  });
  TEST.on=false;SIM.on=false;syncBrush();
  return out;
})()
