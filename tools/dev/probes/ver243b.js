/* #243 - ask 2 (the contract receipt), ask 16 (the roads ahead), the mood
   chip's hover, and the sheet's MOOD bar. */
(() => {
  const o = {};

  /* ask 2 */
  o.a2 = (()=>{const h=tavernReceipt();
    const d=document.createElement('div');d.innerHTML=h;
    const chips=[...d.querySelectorAll('.abfx .fxc')].map(c=>({
      icon:(c.querySelector('.fxi img')?'IMG:'+c.querySelector('.fxi img').className
            :c.querySelector('.fxi').textContent),
      n:c.querySelector('.fxn').textContent, lab:c.querySelector('.fxl').textContent}));
    return {party:G.party.length, joined:G.party.filter(p=>!p.leader).length, chips:chips};})();

  /* the mood chip's hover, and that the ladder is in it */
  o.moodTip = (()=>{show('world');worldTick();
    const el=document.querySelector('#wCompany [data-w="mood"]');
    if(!el)return 'no chip';
    el.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true}));
    const t=document.getElementById('gtTip');
    const rows=t?[...t.querySelectorAll('.ladfull .lrung')].map(r=>
      r.querySelector('.lnm').textContent+' | '+r.querySelector('.lds').textContent):[];
    const box=t?t.getBoundingClientRect():null;
    if(el.onmouseleave)el.onmouseleave();
    return {rows:rows, tipW:box?+box.width.toFixed(0):null, tipH:box?+box.height.toFixed(0):null};})();

  /* the sheet's MOOD bar tracks the real starting nerve */
  o.moodBar = (()=>{const keep=G.morale,out=[];
    [0,60].forEach(v=>{G.morale=v;openInv();iSel='you';drawInv();
      const b=document.querySelector('#iNerve + .bar > i');
      out.push({morale:v, width:b?b.style.width:'-',
                rung:(document.querySelector('#iNerve .pv')||{}).textContent});});
    G.morale=keep;drawInv();return out;})();

  /* ask 16 - the three roads, luma of the stroke against the ground beside it */
  o.a16 = (()=>{
    show('world');drawMap();
    const cv=$('wCanvas'),c=cv.getContext('2d');
    const sx=cv.width/MAPW, sy=cv.height/MAPH;
    const lum=(x,y)=>{const d=c.getImageData(Math.round(x*sx),Math.round(y*sy),1,1).data;
      return .2126*d[0]+.7152*d[1]+.0722*d[2];};
    const pt=(a,b,t,bow)=>{const cx=(a.x+b.x)/2,cy=(a.y+b.y)/2-((b.y-a.y)*.14)+(bow||0),u=1-t;
      return {x:u*u*a.x+2*u*t*cx+t*t*b.x, y:u*u*a.y+2*u*t*cy+t*t*b.y};};
    const score=e=>{const a=NODES[e[0]],b=NODES[e[1]];
      let best=0,ground=0,n=0;
      for(let i=8;i<=32;i++){const p=pt(a,b,i/40,e[5]);
        let mx=0;for(let dy=-3;dy<=3;dy+=.5)mx=Math.max(mx,lum(p.x,p.y+dy));
        best+=mx; ground+=(lum(p.x,p.y-14)+lum(p.x,p.y+14))/2; n++;}
      return {stroke:+(best/n).toFixed(1), ground:+(ground/n).toFixed(1),
              ratio:+((best/n)/(ground/n)).toFixed(2)};};
    const live=EDGES.find(e=>e[0]===G.at);
    const walked=EDGES.find(e=>G.visited[e[0]]&&G.visited[e[1]]);
    const ahead=EDGES.find(e=>e[0]!==G.at&&!(G.visited[e[0]]&&G.visited[e[1]]));
    return {live:live?score(live):null, walked:walked?'none walked yet':null,
            ahead:ahead?[ahead[0]+'->'+ahead[1],score(ahead)]:null};})();
  return o;
})()
