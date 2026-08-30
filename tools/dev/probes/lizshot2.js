/* #267 - the boss on a real board, framed on HER. Returns the clip rect to
   pass to `gt.py shot --clip`, so the picture is aimed rather than guessed. */
(()=>{
  startBattle('furnace');
  GT.playerTurn();
  CAM.i=0;                     /* FULL: the whole 15x13 board */
  camApply(true);
  render();
  const her=alive().find(u=>u.kind==='furnace');
  const grid=document.getElementById('bGrid');
  const R=e=>e.getBoundingClientRect();
  /* the union of her four hexes, in page coordinates */
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  hexesOf(her).forEach(h=>{
    const cell=grid.querySelector('.hex[data-k="'+K(h[0],h[1])+'"]');
    if(!cell)return;
    const b=R(cell);
    x0=Math.min(x0,b.left);y0=Math.min(y0,b.top);
    x1=Math.max(x1,b.right);y1=Math.max(y1,b.bottom);
  });
  const pad=70;
  return {hexes:hexesOf(her).map(h=>h.join(',')),
    found:x0<1e9,
    clip:x0<1e9?[Math.round(x0-pad),Math.round(y0-pad*1.6),
                 Math.round(x1-x0+pad*2),Math.round(y1-y0+pad*3.2)]:null};
})()
