(()=>{
  const distToCurve=(a,b,bow,x,y)=>{let m=1e9;
    for(let i=0;i<=200;i++){const p=edgePt(a,b,bow,i/200);
      m=Math.min(m,Math.hypot(p.x-x,p.y-y));}return m;};
  /* which pass answered: re-run pass zero alone and see if it returns clean */
  const plates=Object.keys(NODES).map(k=>plateBox(NODES[k]));
  const arts=Object.keys(NODES).map(k=>artBox(NODES[k])).filter(Boolean);
  const cost=(x,y,W,H,taken)=>{let worst=0;
    const bump=(q,wgt)=>{const ox=(W+q.w)/2-Math.abs(x-q.x),oy=(H+q.h)/2-Math.abs(y-q.y);
      if(ox>1&&oy>1)worst=Math.max(worst,Math.min(ox,oy)*(wgt||1));};
    plates.forEach(q=>bump(q,1));arts.forEach(q=>bump(q,0.75));
    (taken||[]).forEach(q=>bump(q,1));return worst;};
  const rows=[];
  Object.keys(NODES).forEach(at=>{
    const es=EDGES.filter(e=>e[0]===at); if(!es.length)return;
    const seen=[];
    es.forEach(e=>{const a=NODES[e[0]],b=NODES[e[1]];
      const s=labelSpot(a,b,false,seen,e[5]);
      const d=+distToCurve(a,b,e[5],s[0],s[1]).toFixed(1);
      /* how close COULD a clean box get, if we swept a fine near-ladder */
      let bestNear=1e9;
      for(let i=0;i<=40;i++){const t=0.20+0.60*i/40;
        const p=edgePt(a,b,e[5],t),tg=edgeTan(a,b,e[5],t),nx=-tg.y,ny=tg.x;
        for(const off of [15,21,28,36,44]) for(const sg of [-1,1]){
          const x=Math.round(p.x+nx*off*sg),y=Math.round(p.y+ny*off*sg);
          if(x<70||x>1210||y<46||y>596)continue;
          if(cost(x,y,ELAB_W,ELAB_H,seen)===0)bestNear=Math.min(bestNear,off);}}
      seen.push({x:s[0],y:s[1],w:s[2],h:s[3]});
      rows.push({road:e[0]+'->'+e[1],d:d,cleanNearAt:bestNear===1e9?null:bestNear});});
  });
  const ds=rows.map(r=>r.d).sort((x,y)=>x-y);
  return {n:rows.length,min:ds[0],median:ds[ds.length>>1],
    mean:+(ds.reduce((s,v)=>s+v,0)/ds.length).toFixed(1),max:ds[ds.length-1],
    over30:rows.filter(r=>r.d>30).length,
    far:rows.filter(r=>r.d>30).map(r=>r.road+' d='+r.d+' cleanNear='+r.cleanNearAt),
    labelViolations:labelViolations().length};
})()
