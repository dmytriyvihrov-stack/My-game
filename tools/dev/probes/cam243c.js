/* #243 - the first fight of a page session, at every stop, plus the hand band. */
(() => {
  const out = {};
  camSet(0);
  startBattle('chase');
  out.firstFight = {tx:+CAM.tx.toFixed(1), ty:+CAM.ty.toFixed(1), want:'33.2 / -21.6'};
  out.stops = CAMS.map((c,i)=>{ camSet(i);
    const b = camBands();
    return {stop:c.k, tx:+CAM.tx.toFixed(1), ty:+CAM.ty.toFixed(1),
            pans:camPans(), grab:camGrab(),
            bandX:[+b.x.lo.toFixed(1),+b.x.hi.toFixed(1)],
            bandY:[+b.y.lo.toFixed(1),+b.y.hi.toFixed(1)]};});
  /* drag hard in every direction at each stop and check the ground still covers */
  out.dragged = CAMS.map((c,i)=>{ camSet(i);
    const el=$('bGround'),F=$('bField'),z=c.z;
    const BW=el.offsetWidth,BH=el.offsetHeight,VW=F.offsetWidth,VH=F.offsetHeight;
    const r=[];
    [[-9999,-9999],[9999,9999],[9999,-9999],[-9999,9999]].forEach(d=>{
      camNudge(d[0],d[1]);
      const gl=CAM.tx, gt=CAM.ty, gr=CAM.tx+BW*z, gb=CAM.ty+BH*z;
      r.push({tx:+CAM.tx.toFixed(1),ty:+CAM.ty.toFixed(1),
              emptyL:+Math.max(0,gl).toFixed(1), emptyT:+Math.max(0,gt).toFixed(1),
              emptyR:+Math.max(0,VW-gr).toFixed(1), emptyB:+Math.max(0,VH-gb).toFixed(1)});});
    camApply(true);
    return {stop:c.k, corners:r};});
  camSet(0);
  return out;
})()
