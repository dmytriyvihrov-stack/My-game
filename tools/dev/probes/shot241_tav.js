(()=>{startBattle('tavern');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  if(i>=0){B.idx=i;beginTurn();}
  document.getElementById('bGround').style.transition='none';
  camSet(0);render();camApply(true);
  return B.terrain+'/'+B.ground;})()
