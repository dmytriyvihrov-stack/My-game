(()=>{const N=15,k='clash',out={build:(typeof outRanged!=='undefined')?'274':'HEAD'};
 ['four','prepared'].forEach(c=>{let w=0,r=0;for(let i=0;i<N;i++){const x=runFight(k,{comp:c});
   if(x.won===true||x.won==='mercy')w++;r+=x.rounds||0;}
  out[k+'/'+c]=Math.round(100*w/N)+'% · '+(r/N).toFixed(1)+'rd';});
 return out;})()
