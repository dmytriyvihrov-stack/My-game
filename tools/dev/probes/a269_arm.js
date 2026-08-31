/* #269 asks 1 + 12 + 21 - the one band, the hp ledger, the step cell. */
(function(){
  const out={};
  out.absorb=ARMOUR_ABSORB;
  out.bandWorn=bandOf({armourMax:40}).n+'|'+bandOf({armourMax:40}).absorb;
  out.bandBare=bandOf({armourMax:0}).n+'|'+bandOf({armourMax:0}).absorb;
  out.split=JSON.stringify(splitFor({armourMax:40},{}));
  const p=G.party[0];
  const W=[];out.hp=bodyHp(p,W);
  out.hpWhy=W.map(r=>r[0]+' '+(r[1]>0?'+':'')+r[1]); out.hpSum=bodyHp(p);
  const u=unitFrom(p);
  out.morWhy=(u.morWhy||[]).map(r=>r[0]+' '+r[1]);
  out.morale0=u.morale0; out.moraleMax=u.moraleMax;
  out.dodgeNoBand=(function(){const V=[];const d=dodgeOf(u,V);
    return d+' :: '+V.map(r=>r[0]+' '+r[1]).join(' | ');})();
  startBattle('brigand');GT.playerTurn();render();
  out.stepCell=(document.getElementById('bStepNum')||{}).textContent;
  out.armWord=(document.getElementById('bArmK')||{}).textContent;
  return out;
})()
