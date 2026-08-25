/* #243 - every ask that is not the camera or the ZOC, in one round trip. */
(() => {
  const o = {};

  /* ask 1 - one MAGE */
  o.a1 = {name: CLASSES.warmage.n, icon: cIcon('warmage'),
          humanTrades: CLS_BY_RACE.human,
          picker: [...new Set(CLS_BY_RACE.human)].map(k=>CLASSES[k].n),
          dupes: (()=>{const n=[...new Set(CLS_BY_RACE.human)].map(k=>CLASSES[k].n);
                       return n.length-new Set(n).size;})()};

  /* ask 9 - the stave */
  o.a9 = {reach: GEAR.rod.reach, spellRange: GEAR.rod.spellRange};

  /* ask 6 - the nag is gone */
  o.a6 = {iNag: !!document.getElementById('iNag')};

  /* ask 7 - the break-down button, at rest */
  o.a7 = (()=>{openInv(); const b=document.getElementById('iScrapBtn');
    if(!b)return 'no button';
    const c=getComputedStyle(b); return {color:c.color, border:c.borderTopColor};})();

  /* ask 5 + 17 - the sheet */
  o.a5_17 = (()=>{iSel='you';drawInv();
    const d=document.querySelector('#iChar .idrv');
    const txt=d?d.textContent.replace(/\s+/g,' '):'';
    const u=unitFrom(member('you'));
    return {row:txt, dodgePct:/DODGE \d+%/.test(txt),
            realStart:u.morale0, textbook:Math.round(D.moral({st:effStats(member('you'))})*0.78),
            sheetRung:(document.querySelector('#iNerve .lnm')||{}).textContent};})();

  /* ask 3 + 4 - what each rung is worth, and what the field charges */
  o.a3 = MOODSTATES.map(s=>({n:s.n, says:moodEffect(s), fx:s.fx}));
  o.a4 = (()=>{const keep=G.morale, out=[];
    [-60,-25,0,25,60].forEach(v=>{G.morale=v;
      const u=unitFrom(member('you'));
      out.push({morale:v, rung:moodState(v).n, start:u.morale0, hit:u.mskill, dodge:dodgeOf(u)});});
    G.morale=keep; return out;})();

  /* ask 13 - provisions come in lighter, and the label says the cut figure */
  o.a13 = (()=>{const keep=G.run.food; G.run.food=0;
    const got=pay('food',10); const got1=(G.run.food=0,pay('food',1));
    G.run.food=keep;
    return {ten:got, one:got1, promised:evPaidOf({food:10}).food,
            label:fxNote({food:10}).replace(/<[^>]*>/g,''),
            charge:evPaidOf({food:-3}).food};})();

  /* ask 14 - the injury clock at double rations */
  o.a14 = {mendBase:MEND_BASE, mendDouble:MEND_DOUBLE,
           clockLine:/heal=G.doubleRations>0\?2:1/.test(passDays.toString())};

  /* ask 15 - the chain */
  o.a15 = (()=>{const keep=G.goal;
    G.goal={k:'grow',need:1,done:true};
    const nx=goalNext();
    G.goal=GOALS.wagon.open();
    const row=goalRow().replace(/<[^>]*>/g,' ');
    const met0=GOALS.wagon.met();
    const fr=G.wagon.frame; G.wagon.frame=1;
    const met1=GOALS.wagon.met(); G.wagon.frame=fr;
    const body=GOALS.wagon.body();
    G.goal=keep;
    return {next:nx, row:row.trim(), metBefore:met0, metAfter:met1,
            words:body.trim().split(/\s+/).length};})();

  return o;
})()
