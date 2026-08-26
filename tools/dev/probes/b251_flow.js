/* the contract card's flow, settled, on a page that has done nothing else. */
(() => {
  const nap = ms => new Promise(r => setTimeout(r, ms));
  show('prologue'); tavernContract(true, false);
  EVSTAGE.at = EVSTAGE.beats.length - 1; evFlow();
  return nap(1200).then(() => {
    const d = document.getElementById('prDlg'), fl = d.querySelector('.evflow');
    const tvr = d.querySelector('.tvr');
    return { party: G.party.length,
             flowH: +fl.getBoundingClientRect().height.toFixed(1),
             flowScrollH: fl.scrollHeight, flowClientH: fl.clientHeight,
             over: fl.scrollHeight - fl.clientHeight,
             cut: fl.classList.contains('cut'),
             tvrH: tvr ? +tvr.getBoundingClientRect().height.toFixed(1) : null,
             cardOverflow: d.scrollHeight - d.clientHeight,
             evname: (() => { const e = document.querySelector('.evname');
               return e ? getComputedStyle(e).fontSize + ' scale ' +
                 (GT.scaleOf(e) / GT.scaleOf(document.getElementById('stage'))).toFixed(3) : null; })(),
             floor: GT.floor() }; });
})()
