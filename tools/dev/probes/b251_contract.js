/* #251 - the contract card, driven to its LAST beat, which is where the
   receipt, the name picker and the one door live. */
(() => {
  const R = GT.R, o = {};
  show('prologue');
  tavernContract(true, false);
  EVSTAGE.at = EVSTAGE.beats.length - 1;
  evFlow();
  const dlg = document.getElementById('prDlg');
  o.card = R(dlg);
  o.cardOverflow = dlg.scrollHeight - dlg.clientHeight;
  const flow = dlg.querySelector('.evflow');
  o.flow = { r: R(flow), scroll: flow.scrollHeight - flow.clientHeight,
             cut: flow.classList.contains('cut') };
  o.chips = GT.$$('#prDlg .tvr .fxc').map(c => (c.textContent || '').trim());
  o.sep = GT.$$('#prDlg .tvrsep').length;
  const tvr = dlg.querySelector('.tvr');
  o.tvr = tvr ? { r: R(tvr), txt: (tvr.textContent || '').trim().slice(0, 90) } : null;
  o.who = GT.$$('#prDlg .tvrp').map(x => (x.textContent || '').trim());
  o.doors = GT.$$('#prDlg .evchoices .choice').map(b => ({
    txt: (b.textContent || '').trim().slice(0, 80),
    cls: b.className,
    rail: getComputedStyle(b, '::before').backgroundColor,
    ico: (b.querySelector('.evico') || b).textContent.trim().slice(0, 6) }));
  o.picker = !!document.getElementById('nmCols');
  o.gates = { floor: GT.floor(), clip: GT.clip() };
  return o;
})()
