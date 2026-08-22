/* stand a swinger next to a foe, put the pointer on him, and hand back the
   screen box of the two hexes so a shot can be clipped to them. */
(() => {
  /* ⚠ ONCE PER PAGE. `startBattle` re-rolls the ground and the camera, so a
     `shot --setup` that restarts it clips a box measured against another board.
     That cost two wrong pictures. */
  if (!window.__gt236) { startBattle('brigand'); window.__gt236 = 1; }
  const u = GT.playerTurn();
  const f = GT.nearestFoe(u);
  /* pin the pair to fixed hexes so two runs clip the same box. The camera
     follows the CURRENT body, so the swinger's hex is what decides the frame. */
  u.col = 7; u.row = 4; f.col = 8; f.row = 4;
  f.hp = f.hpMax; f.armour = f.armourMax;
  GT.moveInHand(u);
  handOn(K(f.col, f.row));
  const r = GT.hexOf(f).getBoundingClientRect();
  const b = GT.hexOf(f).querySelector('.ubars').getBoundingClientRect();
  return { hex: [Math.round(r.left - 26), Math.round(r.top - 34),
                 Math.round(r.width + 52), Math.round(r.height + 44)],
           bars: [Math.round(b.left - 10), Math.round(b.top - 6),
                  Math.round(b.width + 20), Math.round(b.height + 12)],
           dmg: dmgPreview(u, f, mainAtk(u)),
           foe: f.name + ' ' + f.hp + '/' + f.hpMax + ' arm ' + f.armour + '/' + f.armourMax };
})()
