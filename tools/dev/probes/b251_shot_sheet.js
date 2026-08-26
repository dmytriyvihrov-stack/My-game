/* the sheet on a crew member with something in the stash, for the eye check */
openInv();
{
  const crew = G.party.find(p => !p.leader);
  iSel = crew.id; ITAB = 'stash';
  G.stash.length = 0;
  ['sword', 'jack', 'shortsw', 'buckler', 'mace', 'roundshield'].forEach(k => {
    if (GEAR[k]) G.stash.push(k); });
  drawInv();
}
'sheet ready';
