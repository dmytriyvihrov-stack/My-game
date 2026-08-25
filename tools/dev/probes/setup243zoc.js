(() => { startBattle('brigand'); const u=GT.playerTurn(); const f=GT.nearestFoe(u);
  GT.standNextTo(u,f); GT.moveInHand(u); camSet(1); render();
  return {zone:document.querySelectorAll('#bZoc path').length}; })()
