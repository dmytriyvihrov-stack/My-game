/* #244 ask 6 - the bloodied sprites are asynchronous, so wait for them. */
(() => new Promise(res=>{
  startBattle('brigand');
  const foes=B.units.filter(x=>x.side==='foe');
  foes.forEach((x,i)=>{x.hp=Math.round(x.hpMax*[1,.5,.25,.08][i%4]);});
  render();
  setTimeout(()=>{
    render();
    setTimeout(()=>{
      const byName={};
      [...document.querySelectorAll('#bGrid img.usp')].forEach(i=>{
        (byName[i.alt]=byName[i.alt]||[]).push(i.src.length);});
      res({tiers:foes.map(f=>f.name+' '+Math.round(100*f.hp/f.hpMax)+'% -> tier '+woundTier(f)),
           built:Object.keys(SPRHURT).map(k=>k+' : '+(SPRHURT[k]==='pending'?'pending':'built')),
           srcLenByName:byName,
           cleanVsHurt:(()=>{const k=Object.keys(SPRHURT).find(x=>SPRHURT[x]!=='pending');
             if(!k)return '-';
             const base=k.replace(/\|w\d$/,'');
             return {clean:(SPR[base]||{src:''}).src.length, hurt:SPRHURT[k].src.length};})()});
    },400);
  },400);
}))()
