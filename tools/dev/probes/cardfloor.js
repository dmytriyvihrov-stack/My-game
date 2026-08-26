/* ⛔ ui-scales.md §5's two counters over a CARD, which `gates.js` has never
   opened. Both decks that carry a `.evstage`: a road card in `#wDlg` and the
   opening's contract card in `#prDlg`.

   ⚠ TAKE IT ON A SETTLED CARD. #218's `evCardIn` scales the box up over 0.18s
   and every column member has its own delayed entry, so a reading taken in the
   same tick measures a card still at 96.5% and reports every 10px label as
   9.65 - twenty false findings, which is how this probe was first written.
   #218's own rule - *a card is captured by PAUSING the timeline, not by racing
   it* - is true of a probe exactly as it is of a screenshot.

   ⚠ AND THE CARD HAS TO HAVE THE THING YOU ARE MEASURING ON IT. A card with no
   cast plate has no `.evname`, so `plates` is reported beside the counters: a
   `floor []` on a card with 0 plates says nothing about `.evname` at all.

   ⚠ AND 900 IS NOT A ROUND NUMBER. At 800ms this probe still read `.evname` at
   `scale(0.97)` and reported it as a floor violation, which went into three
   documents before it was re-run: that 0.97 is `evColIn`, the cast column's own
   delayed entry, and it is 1.000 by 900. A second reading that merely waited
   LONGER is not the same thing as pausing the timeline.

   ⚠ `flowScroll` IS REPORTED BUT IS NOT COMPARABLE FROM HERE. The opening's
   flow depends on the company it is drawn for, and this probe has already run a
   road card (and may follow `smoke.js`) by the time it reaches that deck. The
   fresh-page reading is `b251_flow.js`: 43 over on this build, 99 on HEAD.

   Expected on the shipped build: `floor []` and `evname 10px x 1.000` on both
   decks. Anything in these lists is the finding. */
(() => {
  const nap = ms => new Promise(r => setTimeout(r, ms));
  const R = () => { const e = document.querySelector('.evname'); if (!e) return null;
    const c = getComputedStyle(e);
    return c.fontSize + ' x ' + (GT.scaleOf(e) /
      GT.scaleOf(document.getElementById('stage'))).toFixed(3) + ' = ' +
      (parseFloat(c.fontSize) * GT.scaleOf(e) /
       GT.scaleOf(document.getElementById('stage'))).toFixed(2) + 'px'; };
  const o = {};
  show('world');
  openEvent('shrine');                       /* the heaviest card on the road */
  return nap(900).then(() => {
    const d = document.getElementById('wDlg');
    o.road = { key: 'shrine', plates: GT.$$('#wDlg .evname').length, evname: R(),
               floor: GT.floor(), clip: GT.clip(),
               cardOverflow: d.scrollHeight - d.clientHeight };
    d.classList.remove('on');
    show('prologue'); tavernContract(true, false);
    EVSTAGE.at = EVSTAGE.beats.length - 1; evFlow();
    return nap(900); })
  .then(() => {
    const d = document.getElementById('prDlg');
    const fl = d.querySelector('.evflow');
    o.opening = { plates: GT.$$('#prDlg .evname').length, evname: R(),
                  floor: GT.floor(), clip: GT.clip(),
                  cardOverflow: d.scrollHeight - d.clientHeight,
                  flowScroll: fl.scrollHeight - fl.clientHeight };
    return o; });
})()
