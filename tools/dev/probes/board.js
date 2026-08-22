/* what the board is SAYING, with a step in hand and a foe under the pointer.

     python tools/dev/gt.py eval board.js

   Every readout the battle screen carries about a swing, in one round trip:
   the hit odds, the damage figure, the damage bands on the target's two bars,
   the parting-swing price, and whether the bodies holding you are pulsing.
   ⚠ IT SETS UP THE STATE IT MEASURES, which is the point: a fresh archer has
   nobody in contact, so `.zodds` is never built and reading zero proves
   nothing. See the note in `.claude/rules/event-cards.md` about verifying a
   CSS contract rather than a played fight.

   WHAT TO EXPECT, so nothing here is read as a regression:
     oddsShown        one figure per foe within reach FROM THE HEX HE STANDS ON
     bandsBuilt       two per in-reach foe; `bandsShownBefore` 0, `After` 2
     zocWhileAiming   `aiming` true, anim `zocpulse`, one price
     zocAtRest / PointerOff   the steady glow, anim `none`, no price
     onFoeTurn        every field 0 or false. This is #234's ask 6.
   ⚠ `midWalk.oddsShown` IS NOT ZERO AND THAT IS NOT THE SAME QUESTION. The
   zone-of-control readouts are gated on `!B.busy` and go dark while anybody
   moves; the hit odds are gated on it being YOUR turn, and your own walk is
   still your turn. They are recomputed on every render as the body crosses.
   Blanking them would flicker the board on every step. */
(() => {
  startBattle('brigand');
  const u = GT.playerTurn();
  const f = GT.nearestFoe(u);
  GT.standNextTo(u, f);
  GT.moveInHand(u);
  const g = document.getElementById('bGrid'), cs = e => getComputedStyle(e);
  const o = { who: u.name, foe: f.name + ' hp ' + f.hp + '/' + f.hpMax +
                             ' arm ' + f.armour + '/' + f.armourMax };

  /* the odds: printed on whatever is in reach FROM WHERE HE STANDS */
  o.oddsClass = g.classList.contains('odds');
  o.oddsShown = GT.shown('#bGrid .hodds').map(e => e.textContent + '@' + e.closest('.hex').dataset.k);
  o.oddsBuilt = g.querySelectorAll('.hodds').length;

  /* the blow: one body at a time, built on all of them */
  o.bandsBuilt = g.querySelectorAll('.ubars b.dpv').length;
  o.bandsShownBefore = GT.shown('#bGrid .ubars b.dpv').length;
  handOn(K(f.col, f.row));
  o.preview = dmgPreview(u, f, mainAtk(u));
  o.bandsOnTarget = [].slice.call(GT.hexOf(f).querySelectorAll('.ubars b.dpv')).map(b => ({
    row: b.parentElement.className || 'hp', display: cs(b).display,
    left: b.style.left, width: b.style.width,
    bg: cs(b).backgroundColor, edge: cs(b).borderLeftColor }));
  o.hdmg = [].slice.call(GT.hexOf(f).querySelectorAll('.hdmg'))
    .map(e => e.textContent + ' ' + cs(e).display);
  o.bandsShownAfter = GT.shown('#bGrid .ubars b.dpv').length;

  /* the parting swing: at rest, then with the pointer on ground it is paid for */
  const sp = () => { const h = g.querySelector('.hex.zhit'); return h && h.querySelector('img.usp'); };
  o.zocAtRest = { zhit: g.querySelectorAll('.hex.zhit').length,
                  anim: sp() ? cs(sp()).animationName : '-',
                  zodds: g.querySelectorAll('.zodds').length };
  o.litHex = GT.aimAtLit();
  o.zocWhileAiming = { aiming: g.classList.contains('aiming'),
                       anim: sp() ? cs(sp()).animationName : '-',
                       zodds: [].slice.call(g.querySelectorAll('.zodds')).map(e => e.textContent) };
  handOn(null);
  o.zocPointerOff = { aiming: g.classList.contains('aiming'),
                      anim: sp() ? cs(sp()).animationName : '-',
                      zodds: g.querySelectorAll('.zodds').length };

  /* and none of it may survive somebody else's turn, or a walk in progress */
  handOn(o.litHex);
  B.busy = true; render();
  o.midWalk = { aiming: g.classList.contains('aiming'), zhit: g.querySelectorAll('.hex.zhit').length,
                zodds: g.querySelectorAll('.zodds').length, zrisk: (B.zrisk || []).length,
                oddsShown: GT.shown('#bGrid .hodds').length,
                bandsShown: GT.shown('#bGrid .ubars b.dpv').length };
  B.busy = false;
  const j = B.order.findIndex(x => x.side === 'foe' && !x.dead);
  B.idx = j; beginTurn(); render();
  o.onFoeTurn = { cur: cur().name + '/' + cur().side,
                  aiming: g.classList.contains('aiming'), zoc: g.classList.contains('zoc'),
                  zhit: g.querySelectorAll('.hex.zhit').length,
                  zodds: g.querySelectorAll('.zodds').length,
                  oddsShown: GT.shown('#bGrid .hodds').length,
                  bandsShown: GT.shown('#bGrid .ubars b.dpv').length };
  return o;
})()
