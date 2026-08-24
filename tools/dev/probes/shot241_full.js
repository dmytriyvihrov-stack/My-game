/* #241 - the whole board at FULL, so the apron can be looked at. Self
   contained: `gt.py shot --setup` evals this WITHOUT lib.js in front of it. */
(()=>{startBattle('brigand');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  if(i>=0){B.idx=i;beginTurn();}
  document.getElementById('bGround').style.transition='none';
  camSet(0);render();camApply(true);
  return 'full';})()
