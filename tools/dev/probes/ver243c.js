/* #243 - the two things that only show up when driven: a deserter walking off,
   and the wagon objective's card. */
(() => {
  const o={};

  /* the ON THE BRINK roll, forced */
  o.desert=(()=>{const keepM=G.morale,keepP=G.party.slice(),keepD=(G.dismissed||[]).slice();
    G.morale=-70;
    const before=G.party.length;
    const rnd=Math.random; Math.random=()=>0.01;      /* the 5% lands */
    passDays(1);
    Math.random=rnd;
    const out={rung:moodState(-70).n, before:before, after:G.party.length,
               dismissed:(G.dismissed||[]).length, news:G.log.slice(-1)[0]};
    G.morale=keepM;G.party.length=0;keepP.forEach(p=>G.party.push(p));
    G.dismissed=keepD;
    return out;})();

  /* and it never takes the last crew member or the leader */
  o.floor=(()=>{const keepM=G.morale,keepP=G.party.slice();
    G.morale=-70;
    while(G.party.length>2)G.party.pop();
    const rnd=Math.random;Math.random=()=>0.01;
    passDays(1);passDays(1);passDays(1);
    Math.random=rnd;
    const n=G.party.length,lead=G.party.some(p=>p.leader);
    G.morale=keepM;G.party.length=0;keepP.forEach(p=>G.party.push(p));
    return {left:n,leaderStillHere:lead};})();

  /* the wagon objective's card, drawn */
  o.card=(()=>{const keep=G.goal;
    G.goal={k:'grow',need:1,done:true};
    const nx=goalNext();
    goalOpen(nx);
    show('world');
    openGoalCard({x:640,y:300},()=>{});
    const dlg=$('wDlg');
    const h3=(dlg.querySelector('h3')||{}).textContent;
    const bd=(dlg.querySelector('.bd')||{}).textContent||'';
    const btn=(dlg.querySelector('#wV')||{}).textContent;
    const goal=(dlg.querySelector('.qgoal')||{}).textContent;
    const box=dlg.getBoundingClientRect();
    const over=dlg.scrollHeight-dlg.clientHeight;
    dlg.classList.remove('on');G.pending=null;G.goal=keep;
    return {h3:h3,words:bd.trim().split(/\s+/).length,goal:goal,btn:btn,
            cardOverflow:over,w:+box.width.toFixed(0),h:+box.height.toFixed(0)};})();

  /* the mood tip must fit on the stage */
  o.tip=(()=>{show('world');worldTick();
    const el=document.querySelector('#wCompany [data-w="mood"]');
    el.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true}));
    const t=$('gtTip'),s=$('stage').getBoundingClientRect(),b=t.getBoundingClientRect();
    return {w:+b.width.toFixed(0),h:+b.height.toFixed(0),
            insideStage:b.top>=s.top-1&&b.bottom<=s.bottom+1&&b.left>=s.left-1&&b.right<=s.right+1,
            top:+(b.top-s.top).toFixed(0),bottom:+(s.bottom-b.bottom).toFixed(0)};})();
  return o;
})()
