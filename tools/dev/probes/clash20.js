/* the clash, twenty times, because one stall in five is not a measurement and
   the baseline read 3/3 clean. `.claude` memory: n=6 cannot tell 0% from 20%. */
(()=>{
  const out=[];
  for(let i=0;i<20;i++)out.push(regress({comp:'prepared'},['clash'])[0]);
  const stalls=out.filter(s=>/GUARD|ERR|FATAL/.test(s)).length;
  return {stalls:stalls, of:20, rows:out};
})()
