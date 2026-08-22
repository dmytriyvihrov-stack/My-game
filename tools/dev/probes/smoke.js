/* a screen-by-screen smoke walk: open everything a player crosses in the first
   ten minutes and report anything that THREW. #236's technical sweep.
   ⚠ A screen sweep cannot find a seam bug (the QA memory) - this is the cheap
   half, and its value is that a thrown error anywhere is a hard finding. */
(() => {
  const errs = [], note = [];
  const T = (what, fn) => { try { const r = fn(); note.push(what + ' ok' + (r === undefined ? '' : ' ' + r)); }
                            catch (e) { errs.push(what + ' THREW ' + e.message); } };

  T('LINT', () => LINT().findings + ' findings');
  T('newRun', () => { if (typeof newRun === 'function') newRun(); return G.day; });
  T('world', () => { show('world'); drawMap(); drawNodes(); return Object.keys(NODES).length + ' nodes'; });
  T('inventory', () => { openInv(); return G.party.length + ' bodies'; });
  T('each body sheet', () => { G.party.forEach(p => { iSel = p.id; drawInv(); }); iSel = 'you'; drawInv(); return 'all'; });
  T('stash tab', () => { G.stash.push('mail', 'maul', 'focus'); drawInv(); return G.stash.length + ' in cart'; });
  T('every gear hover', () => { let n = 0; Object.keys(GEAR).forEach(k => { const h = tipFor(k, G.party[0]);
      if (!h || h.indexOf('margin-bottom:4px') < 0) throw new Error('no tier/slot line on ' + k); n++; }); return n + ' tips'; });
  T('every road card', () => { let n = 0; Object.keys(EVENTS).forEach(k => { openEvent(k); n++; }); 
      const d = document.getElementById('wDlg'); if (d) d.classList.remove('on'); return n + ' cards'; });
  T('every camp card', () => { let n = 0; Object.keys(CAMPS).forEach(k => { const c = CAMPS[k];
      const b = typeof c.body === 'function' ? c.body() : c.body; if (!b) throw new Error('empty body ' + k); n++; }); return n; });
  T('shop', () => { if (typeof openShop === 'function') { openShop('rest'); 
      const d = document.getElementById('wDlg'); if (d) d.classList.remove('on'); return 'open'; } return 'no openShop'; });
  T('muster', () => { if (typeof openHire === 'function') { openHire();
      const d = document.getElementById('wDlg'); if (d) d.classList.remove('on'); return 'open'; } return 'no openHire'; });
  T('battle + render', () => { startBattle('brigand'); GT.playerTurn(); render(); return B.units.length + ' units'; });
  T('every foe hovered', () => { let n = 0; B.units.filter(u => u.side === 'foe' && !u.dead).forEach(f => {
      handOn(K(f.col, f.row)); render(); n++; }); return n + ' foes'; });
  T('aftermath', () => { if (typeof consequences === 'function') return 'present'; return 'missing'; });

  return { errors: errs, walked: note };
})()
