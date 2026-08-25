(()=>{
  show('world');
  G.at='clash';G.pending=null;G.moving=false;G.visited={hold:1,clash:1};
  drawMap();drawNodes();
  WCAM.i=0;WCAM.x=0;WCAM.y=0;wcamApply();
  return new Promise(r=>setTimeout(()=>r(
    [...document.querySelectorAll('.elab')].map(e=>{const b=e.getBoundingClientRect();
      return e.textContent+' @'+Math.round(b.left)+','+Math.round(b.top)+
             ' '+Math.round(b.width)+'x'+Math.round(b.height);})),500));
})()
