(()=>{const N=30,out={build:(typeof outRanged!=='undefined')?'274':'HEAD'};
  [['ashdrakes','prepared'],['glassroad','prepared']].forEach(p=>{
    let w=0,r=0;for(let i=0;i<N;i++){const x=runFight(p[0],{comp:p[1]});
      if(x.won===true||x.won==='mercy')w++;r+=x.rounds||0;}
    out[p[0]+'/'+p[1]]=Math.round(100*w/N)+'% · '+(r/N).toFixed(1)+'rd';});
  return out;})()
