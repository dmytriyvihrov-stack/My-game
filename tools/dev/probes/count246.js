(()=>{
  const out={};
  const _rm=reachMap, _mb=moveBudget, _mb2=(typeof moveBudget2==='function')?moveBudget2:null;
  let rm=0, mb=0, mb2=0;
  reachMap=function(){rm++;return _rm.apply(null,arguments);};
  moveBudget=function(){mb++;return _mb.apply(null,arguments);};
  if(_mb2)moveBudget2=function(){mb2++;return _mb2.apply(null,arguments);};
  try{
    const r=runFight('brigand',{comp:'prepared'});
    out.fight=r.rounds+'rd '+r.won+' '+r.guard;
  }finally{
    reachMap=_rm;moveBudget=_mb;if(_mb2)moveBudget2=_mb2;
  }
  out.reachMapCalls=rm; out.moveBudgetCalls=mb; out.moveBudget2Calls=mb2;
  out.hasNew=(typeof zocLive==='function');
  return out;
})()
