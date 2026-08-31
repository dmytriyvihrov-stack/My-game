/* what the chip now floats over, at all three camera stops. #240's own
   audioBox check, one element across: a corner widget that covers a node or
   a name plate is the fault that probe exists to catch. */
(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  enterWorld();['tutDim','tutCard'].forEach(id=>{const e=$(id);if(e)e.remove();});
  const R=e=>e.getBoundingClientRect();
  return WCAMS.map((c,i)=>{
    WCAM.i=i;WCAM.free=false;wcamApply();
    const r=R($('wRoad'));
    const hit=s=>[...document.querySelectorAll(s)].filter(e=>{const a=R(e);
      return a.width&&a.right>r.left+1&&a.left<r.right-1&&
             a.bottom>r.top+1&&a.top<r.bottom-1;})
      .map(e=>(e.className||e.id).toString().slice(0,28));
    return c.n+': nodes '+JSON.stringify(hit('#wCam .node'))+
           ' plates '+JSON.stringify(hit('#wCam .nm'));
  });
})()
