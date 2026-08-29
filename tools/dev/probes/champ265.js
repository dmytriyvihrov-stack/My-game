/* #265 - the champion, driven: does it actually carry two perks it can be PAID
   for, and a rung the card can show? And does the nerve knob land? */
(() => {
  const _r=render,_f=fx,_s=say,_x=sfx,_p=paintTerrain;
  render=()=>{};fx=()=>{};sfx=()=>{};paintTerrain=()=>{};say=()=>{};
  const _t=window.TUT_SILENT; window.TUT_SILENT=true;
  const out={};
  try{
    out.CHAMP=CHAMP;
    out.FOE_NERVE=FOE_NERVE;
    G.party.length=0; ARENA.COMPS.prepared().forEach(p=>G.party.push(p));

    /* the nerve gap, rebuilt */
    const all=[];
    Object.keys(FOE_BUILD).forEach(k=>{ G.battleKind=k;
      try{ FOE_BUILD[k]().forEach(u=>{ if(!u.noTrim) all.push(u); }); }catch(e){} });
    const us=G.party.map(p=>unitFrom(p,'you',0,0));
    out.nerve={yours:+(us.reduce((s,u)=>s+u.moraleMax,0)/us.length).toFixed(1),
               foes:+(all.reduce((s,u)=>s+u.moraleMax,0)/all.length).toFixed(1)};
    out.nerve.gap_pct=+(100*(out.nerve.foes/out.nerve.yours-1)).toFixed(1);

    /* the champions: 30 rolls of the fight that fields them */
    const seen={},rungs={},counts=[];
    for(let i=0;i<30;i++){
      G.battleKind='snarejoin';
      holdHost().filter(u=>u.champ).forEach(u=>{
        counts.push(u.perks.length);
        u.perks.forEach(k=>{seen[k]=(seen[k]||0)+1;});
        rungs[u.champRung]=(rungs[u.champRung]||0)+1;
      });
    }
    out.champ_perk_counts={min:Math.min.apply(null,counts),max:Math.max.apply(null,counts),n:counts.length};
    out.champ_perks_rolled=seen;
    out.champ_rungs=rungs;
    out.every_rolled_perk_is_payable=Object.keys(seen).every(k=>!!FOE_PERK_OK[k]);

    /* and one champion against its own ordinary twin, field by field */
    G.battleKind='snarejoin';
    const host=holdHost();
    const c=host.find(u=>u.champ&&u.variant==='bill');
    const o=host.find(u=>!u.champ&&u.variant==='bill');
    out.bill_champ_vs_plain=c&&o?{
      hp:o.hpMax+' -> '+c.hpMax, armour:o.armourMax+' -> '+c.armourMax,
      mskill:o.mskill+' -> '+c.mskill, dodge:o.dodgeBase+' -> '+c.dodgeBase,
      mor:o.moraleMax+' -> '+c.moraleMax, speed:o.speed+' -> '+c.speed,
      st:[o.st.str,o.st.agi,o.st.int,o.st.mor].join('/')+' -> '+
         [c.st.str,c.st.agi,c.st.int,c.st.mor].join('/'),
      perks:c.perks.join(','), rung:c.champRung,
      dmg:(o.acts.find(a=>a.dmg)||{}).dmg+' -> '+(c.acts.find(a=>a.dmg)||{}).dmg
    }:'no bill pair';
  }catch(e){out.FATAL=e.message+' @ '+(e.stack||'').split('\n')[1];}
  finally{render=_r;fx=_f;say=_s;sfx=_x;paintTerrain=_p;window.TUT_SILENT=_t;B=null;
    G.party.length=0; makeParty().forEach(p=>G.party.push(p));}
  return out;
})()
