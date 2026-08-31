/* #274 - the whole batch, driven */
(()=>{
  const o={};
  /* ---- ask 3: the sheet ------------------------------------------------ */
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  openInv();iSel=G.party[1].id;drawInv();
  const sk=document.getElementById('iSkills');
  o.sheet={skillsIn:sk?(sk.parentElement.id||sk.parentElement.className):null,
    skillsVisible:sk?!!GT.vis(sk):false,
    perkBodyOn:$('iPerkBody').classList.contains('on'),
    perkBodyShown:getComputedStyle($('iPerkBody')).display,
    stashBodyShown:getComputedStyle($('iStashBody')).display,
    charKids:[].slice.call($('iChar').children).map(k=>(k.id||k.className)+':'+
      Math.round(k.getBoundingClientRect().height))};
  /* every body x every state, the way #230 asks */
  const worst=GT.eachBody(p=>{const s=GT.slack('iChar');
    return {slack:s.slack,scroll:s.scroll,overlap:s.overlap};});
  o.sheetWorst=worst.map(x=>x.id+'/'+x.state+':'+x.m.slack+
    (x.m.scroll?' SCROLL'+x.m.scroll:'')+(x.m.overlap.length?' OVER'+x.m.overlap.length:''))
    .sort((a,b)=>parseFloat(a.split(':')[1])-parseFloat(b.split(':')[1])).slice(0,4);
  o.sheetClip=GT.clip().length;o.sheetFloor=GT.floor().length;
  /* the Captain's own row: the widest in the game */
  iSel='you';drawInv();
  const sk2=document.getElementById('iSkills');
  o.captainSkills=sk2?{w:Math.round(sk2.getBoundingClientRect().width),
    h:Math.round(sk2.getBoundingClientRect().height),
    cards:sk2.querySelectorAll('.iact').length}:null;
  o.captainSlack=GT.slack('iChar').slack;

  /* ---- ask 4: the armour bar ------------------------------------------- */
  o.segArm=SEG_ARM;
  o.jack=GEAR.jack.rarity+' / '+rarityTag('jack').replace(/<[^>]*>/g,'')+' / '+gearPrice('jack');

  /* ---- the battle ------------------------------------------------------ */
  startBattle('brigand');
  const g=$('bGrid');
  const you=B.units.filter(x=>x.side==='you'&&!x.ally&&!x.pet&&!x.dead);
  const arch=you.find(u=>u.acts.some(a=>a.range&&a.dmg&&!a.arcane));
  B.idx=B.order.indexOf(arch);beginTurn();
  const u=cur();
  const foes=B.units.filter(x=>x.side==='foe'&&!x.dead);
  const ring=d=>{const s=[];for(let c=0;c<COLS;c++)for(let r=0;r<ROWS;r++)
    if(B.terr[K(c,r)]!==undefined&&!at(c,r)&&hdist([c,r],[u.col,u.row])===d)s.push([c,r]);return s;};
  /* put one foe out of bow range from here but inside it after a step */
  foes[0].col=ring(7)[0][0];foes[0].row=ring(7)[0][1];
  render();
  const rd=()=>GT.shown('#bGrid .hodds').map(e=>e.textContent+(e.classList.contains('aodds')?'*':''));
  o.odds={atRest:rd()};
  /* the lit hex nearest that foe */
  const lits=[].slice.call(g.querySelectorAll('.hex.lit'))
    .map(h=>h.dataset.k).map(k=>k.split(',').map(Number))
    .sort((a,b)=>hdist(a,[foes[0].col,foes[0].row])-hdist(b,[foes[0].col,foes[0].row]));
  o.odds.step=lits.length?K(lits[0][0],lits[0][1]):null;
  o.odds.stepDistToFoe=lits.length?hdist(lits[0],[foes[0].col,foes[0].row]):null;
  if(lits.length)handOn(K(lits[0][0],lits[0][1]));
  o.odds.onStep=rd();
  o.odds.stepClass=g.classList.contains('stepodds');
  handOn(null);
  o.odds.pointerOff=rd();
  o.odds.leftBehind=g.querySelectorAll('.hodds.aodds').length;

  /* ---- ask 1: the two washes ------------------------------------------- */
  peekOn(foes[0]);paintPeek();
  const cols={};
  [].slice.call(g.querySelectorAll('.hex')).forEach(h=>{
    const f=h.querySelector('.hfill');if(!f)return;
    const b=f.style.background;if(b&&/120, 50, 66/.test(b))cols[b]=(cols[b]||0)+1;});
  o.washes=cols;
  o.washMove=B.peekReach?Object.keys(B.peekReach.dist).length:0;
  o.washHit=B.peekHit?Object.keys(B.peekHit).length:0;
  peekOff();

  /* ---- ask 9: the enemy card ------------------------------------------- */
  startBattle('warmstones');
  const hide=B.units.find(x=>x.side==='foe'&&x.kind==='slaghide');
  peekOn(hide);
  inspect(hide,{clientX:400,clientY:300,currentTarget:GT.hexOf(hide)});
  const rdc=$('bRead');
  o.card={says:[].slice.call(rdc.querySelectorAll('.actsay')).map(e=>e.textContent),
    box:GT.R(rdc),
    inStage:(()=>{const r=rdc.getBoundingClientRect();
      return r.top>=0&&r.left>=0&&r.bottom<=innerHeight+1&&r.right<=innerWidth+1;})(),
    over:rdc.scrollHeight-rdc.clientHeight};
  /* and one of yours must NOT carry the sentence */
  const mine=B.units.filter(x=>x.side==='you'&&!x.ally)[0];
  inspect(mine,{clientX:400,clientY:300,currentTarget:GT.hexOf(mine)});
  o.card.ownSays=$('bRead').querySelectorAll('.actsay').length;
  return o;
})()
