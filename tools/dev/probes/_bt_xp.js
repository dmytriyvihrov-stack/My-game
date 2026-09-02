/* WHAT A ROAD FIGHT PAYS, AND HOW MANY OF THEM BUY LEVEL 4.
   `payFightXP` splits the pot half to the line evenly and half by damage
   dealt, so a body that does its quarter of the work takes worth/4. The
   thresholds are XP_TABLE and the rate is XP_RATE. */
(() => {
  const KEYS = ['tavern','chase','clash','brigand','pack','slingline','mirehares'];
  const _r=render,_f=fx,_s=say,_x=sfx,_p=paintTerrain;
  render=()=>{};fx=()=>{};sfx=()=>{};paintTerrain=()=>{};say=t=>{G.log.push(t);};
  const _t = window.TUT_SILENT; window.TUT_SILENT = true;
  const out = {rate:XP_RATE, perHp:+XP_PER_HP.toFixed(2), table:XP_TABLE.slice(0,6), fights:{}};
  try {
    G.party.length=0; makeParty().forEach(p=>G.party.push(p));
    KEYS.forEach(k => {
      try {
        G.morale=0; G.log.length=0; G.run.food=8;
        startBattle(k);
        const foes = B.units.filter(u=>u.side==='foe'&&!u.pet);
        const worth = foes.reduce((s,u)=>s+Math.round((u.hpMax||0)*XP_PER_HP)+(u.captain?XP_LEAD:0),0);
        out.fights[k] = {foes:foes.length, hp:foes.reduce((s,u)=>s+(u.hpMax||0),0), worth:worth,
                         quarter:Math.round(worth/4*XP_RATE), even:Math.round(worth/4*XP_RATE)};
        B=null;
      } catch(e){ out.fights[k]={err:''+e}; B=null; }
    });
  } finally {
    render=_r;fx=_f;say=_s;sfx=_x;paintTerrain=_p; window.TUT_SILENT=_t;
    G.party.length=0; makeParty().forEach(p=>G.party.push(p));
  }
  /* how many average early fights to each rung, at a quarter share */
  const avg = Object.values(out.fights).filter(f=>f.quarter).reduce((s,f)=>s+f.quarter,0) /
              Math.max(1,Object.values(out.fights).filter(f=>f.quarter).length);
  out.avgTake = Math.round(avg);
  out.toLevel = {2:Math.ceil(100/avg), 3:Math.ceil(250/avg), 4:Math.ceil(450/avg), 5:Math.ceil(700/avg)};
  return out;
})()
