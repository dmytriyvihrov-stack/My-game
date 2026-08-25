/* the three roads side by side, on the same four edges, ink against ground. */
(() => {
  const keep=JSON.parse(JSON.stringify(G.visited||{})), at=G.at;
  const cv=$('wCanvas'),c=cv.getContext('2d');
  const sx=cv.width/MAPW, sy=cv.height/MAPH;
  const lum=(x,y)=>{const d=c.getImageData(Math.round(x*sx),Math.round(y*sy),1,1).data;
    return .2126*d[0]+.7152*d[1]+.0722*d[2];};
  const EDG=[['coin','chase'],['tree','clash'],['oasis','steadn'],['dead','bonfir']];
  const score=k=>{const e=EDGES.find(x=>x[0]===k[0]&&x[1]===k[1]);
    const a=NODES[e[0]],b=NODES[e[1]];
    const pt=t=>{const cx=(a.x+b.x)/2,cy=(a.y+b.y)/2-((b.y-a.y)*.14)+(e[5]||0),u=1-t;
      return {x:u*u*a.x+2*u*t*cx+t*t*b.x, y:u*u*a.y+2*u*t*cy+t*t*b.y};};
    const on=[],off=[];
    for(let i=30;i<=370;i++){const p=pt(i/400);
      on.push(Math.max(lum(p.x,p.y),lum(p.x-.5,p.y),lum(p.x+.5,p.y)));
      off.push((lum(p.x-16,p.y)+lum(p.x+16,p.y))/2);}
    /* the INK is the top third of the samples - the dash duty cycle - and the
       ground is the median beside it. Averaging the gaps in reports a third of
       the line and is what made two builds look identical. */
    const s=on.slice().sort((x,y)=>y-x), g=off.slice().sort((x,y)=>x-y);
    const ink=s.slice(0,Math.floor(s.length/3)).reduce((p,v)=>p+v,0)/Math.floor(s.length/3);
    const gnd=g[Math.floor(g.length/2)];
    return +(ink/gnd).toFixed(2)+' ('+ink.toFixed(0)+' on '+gnd.toFixed(0)+')';};
  const out={};
  /* ahead */
  G.visited={};G.at='hold';drawMap();
  out.ahead=EDG.map(k=>k.join('->')+' '+score(k));
  /* walked */
  EDG.forEach(k=>{G.visited[k[0]]=true;G.visited[k[1]]=true;});
  G.at='nowhere';drawMap();
  out.walked=EDG.map(k=>k.join('->')+' '+score(k));
  /* live */
  out.live=EDG.map(k=>{G.visited={};G.at=k[0];drawMap();return k.join('->')+' '+score(k);});
  G.visited=keep;G.at=at;drawMap();
  return out;
})()
