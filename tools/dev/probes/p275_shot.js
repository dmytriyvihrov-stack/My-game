/* #275 - the board with a body under the cloak, for the eye check. */
(() => {
  window.TUT_SILENT = true;
  startBattle('brigand');
  GT.playerTurn();
  const u = cur();
  u.hideUntil = B.round + 2;
  const a = u.acts[0];
  u.used[a.k] = 1;                    /* so the tally shows on the card too */
  render();
  const badge = document.querySelector('[data-k="' + K(u.col, u.row) + '"] .stbar');
  return { who: u.name, hidden: hiddenLive(u), badge: badge ? badge.textContent : null,
           card: /OF 2 THIS TURN/i.test($('bActions').innerHTML) };
})()
