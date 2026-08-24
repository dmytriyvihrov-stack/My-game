/* 8f.266 - CLOSE, camera shoved hard against the RIGHT rim, so the band that
   grew is what the picture is of. Self contained (no lib.js). */
(()=>{startBattle('brigand');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  if(i>=0){B.idx=i;beginTurn();}
  document.getElementById('bGround').style.transition='none';
  camSet(2);render();camApply(true);camNudge(-9e4,-3e4);
  return 'right rim';})()
