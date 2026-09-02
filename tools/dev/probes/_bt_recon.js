(() => {
  const keys = Object.keys(localStorage).filter(k=>/^gt_|^lab_|^foedex|^armoury/.test(k));
  const trink = Object.keys(GEAR).filter(k=>GEAR[k].slot==='trinket');
  return {
    sym: {simLevelTo:typeof simLevelTo, clsLaneAt:typeof clsLaneAt, levelUp:typeof levelUp,
          perkPool:typeof perkPool, ARENA:typeof ARENA, XP_CAP:(typeof XP_CAP!=='undefined'?XP_CAP:null),
          freeEarned:typeof freeEarned, GEAR:typeof GEAR, runFight:typeof runFight},
    lsKeys: keys,
    comps: Object.keys(ARENA.COMPS),
    trinkets: trink,
    gearSlots: [...new Set(Object.values(GEAR).map(g=>g.slot))],
    party: makeParty().map(p=>({id:p.id,cls:p.cls,lvl:p.level,perks:(p.perks||[]).slice(),
      sp:p.statPoints||0,pp:p.perkPoints||0,fp:p.freePicks||0,eq:p.eq}))
  };
})()
