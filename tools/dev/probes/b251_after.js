/* #251 after - the crew member's doll (no pet: two boxes centred), a stash
   with several things in it, and the perks tab still a column. */
(() => {
  const R = GT.R, o = {};
  openInv();
  const crew = G.party.find(p => !p.leader);
  iSel = crew.id; ITAB = 'stash';
  const keep = G.stash.slice();
  G.stash.length = 0;
  ['sword', 'jack', 'shortsw', 'buckler', 'boarspear'].forEach(k => { if (GEAR[k]) G.stash.push(k); });
  o.stashKeys = G.stash.slice();
  drawInv();
  const box = document.getElementById('iDollBox');
  o.doll = { box: R(box), rows: GT.$$('#iDollBox .drow').map(r => ({
    cls: r.className, r: R(r),
    kids: [].slice.call(r.children).map(k => (k.querySelector('.sl') || {}).textContent +
      '@' + R(k).l + ' w' + R(k).w + ' t' + R(k).t) })) };
  const sb = document.getElementById('iStashBody');
  o.stash = { disp: getComputedStyle(sb).display, w: R(sb).w,
              rows: GT.$$('#iStashBody .item').map(x => R(x).l + '/' + R(x).t + ' w' + R(x).w + ' h' + R(x).h),
              lbl: R(sb.querySelector('.lbl')).w,
              scrap: R(document.getElementById('iScrapBtn')) };
  o.stashScroll = sb.scrollHeight - sb.clientHeight;
  /* the perks tab must still be a column, and the stash must be hidden on it */
  ITAB = 'perks'; drawInv();
  o.perks = { stashDisp: getComputedStyle(document.getElementById('iStashBody')).display,
              perkDisp: getComputedStyle(document.getElementById('iPerkBody')).display };
  ITAB = 'stash';
  /* an empty stash still draws the caption and the door across both columns */
  G.stash.length = 0; drawInv();
  o.empty = { emptyLine: !!document.querySelector('#iStashBody .iempty'),
              emptyW: document.querySelector('#iStashBody .iempty')
                ? R(document.querySelector('#iStashBody .iempty')).w : null,
              scrapW: R(document.getElementById('iScrapBtn')).w };
  G.stash.length = 0; keep.forEach(k => G.stash.push(k));
  iSel = 'you'; drawInv();
  o.gates = { floor: GT.floor(), clip: GT.clip(), overlap: GT.overlap('iChar') };
  return o;
})()
