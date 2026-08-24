/* #241 - CLOSE, with the acting body on the bottom rank: the case the cards
   used to sit on. Self contained (no lib.js). */
(()=>{startBattle('brigand');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  if(i>=0){B.idx=i;beginTurn();}
  const u=cur(),o=at(7,ROWS-1);
  if(o&&o!==u){o.col=7;o.row=5;}
  u.col=7;u.row=ROWS-1;B.reach=null;
  document.getElementById('bGround').style.transition='none';
  camSet(2);render();camApply(true);
  return u.name+' at 7,'+(ROWS-1);})()
