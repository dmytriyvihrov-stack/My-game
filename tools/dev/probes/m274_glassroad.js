(()=>{const N=15,k='glassroad',out={build:(typeof outRanged!=='undefined')?'274':'HEAD'};
  ["four","prepared"].forEach(c=>{let w=0,r=0,g=0;
    for(let i=0;i<N;i++){const x=runFight(k,{comp:c});
      if(x.guard==='HIT GUARD'){g++;continue;}
      if(x.won===true||x.won==='mercy')w++;r+=x.rounds;}
    out[k+'/'+c]=Math.round(100*w/N)+'% · '+(r/Math.max(1,N-g)).toFixed(1)+'rd'+(g?' · '+g+' GUARD':'');});
  return out;})()
