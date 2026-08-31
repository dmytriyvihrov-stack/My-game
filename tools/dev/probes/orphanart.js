/* ═══ WHAT WAS DRAWN AND IS NEVER SHOWN ═══════════════════════════════════
   (User, 2026-08-31: "feel free to add on the button of the list assets of
   charaters, that verre additionlly created but never used".)

   An asset sitting on disk unbuilt is the silent-failure shape #190 wrote
   down; an asset EMBEDDED and unreachable is its quieter cousin - it costs
   bytes, it looks finished in the pack, and nothing in the build says so.
   This asks each art table the one question it cannot ask itself: is there a
   body, an item or a node that can ever reach this key?                    */
(()=>{
  const out={};
  /* ── 1. battle sprites. Drive `paintedSpriteKey` over every body the game
        can put on a board, both sides, rather than reading the cascade. ── */
  const reached={};
  const note=k=>{if(k)reached[k]=(reached[k]||0)+1;};
  Object.keys(FOE_BUILD).forEach(k=>{
    (k==='clash'?devFoeRun(k,'ratkin').concat(devFoeRun(k,'ogre')):devFoeRun(k)).forEach(u=>{
      note(paintedSpriteKey(u.kind,'foe',{unit:u,leader:u.leader||u.captain,
        caster:u.caster,bow:u.bow}));
      if(u.tails||u.tail)note(paintedSpriteKey(BODY_KIND[u.kind]||'wyrmbody','foe',{unit:u}));
    });
  });
  /* ⛔ THE ALLIED BODIES ARE BUILT OFF THE SAME TABLES AND THE FIRST CUT OF THIS
     PROBE MISSED THEM, so the barman and the ring-eyed pair reported as three
     statblocks nobody fields. A body on YOUR side is still a body the table
     pays for. */
  const ALLY=[()=>clashAllies(),()=>snareClan(),()=>build(TAVERN_ROOM,TAVERN_T),
    ()=>build([[6,4,'barman',18]],TAVERN_T),
    ()=>build([[0,0,'ringblade',15],[0,0,'ringclub',14]],REINF_T)];
  ALLY.forEach(f=>{
    try{f().forEach(u=>note(paintedSpriteKey(u.kind,'you',{unit:u,leader:u.leader||u.captain,
      caster:u.caster,bow:u.bow})));}catch(e){}
  });
  /* your side: every class x race x weapon the roster can hold */
  const races=Object.keys(RACEMOD||{human:1,ratkin:1,ogre:1});
  const cls=Object.keys(CLASSES||{});
  /* ⚠ 'main', NOT 'weapon'. The first cut filtered on a slot name GEAR does not
     use, so the weapon loop below ran ZERO times and every weapon-keyed painting
     reported as unused. A filter that matches nothing looks exactly like a
     finding. */
  const weps=Object.keys(GEAR).filter(g=>GEAR[g].slot==='main');
  /* ⚠ LEVEL 1 AND 3, AND THE NAMED PRESETS. Two of this probe's first findings
     were its own blind spots: `ratkin_you_veteran` is keyed on `u.level>=3` and
     `ratkin_you_thief` on `u.id==='ash'`, so a sweep of fresh nameless bodies
     reports both as art nobody uses. A cascade is only as tested as the bodies
     you hand it. */
  seededly(()=>{
    races.forEach(r=>cls.forEach(c=>{
      [null].concat(weps).forEach(w=>[1,3].forEach(lv=>{
        try{
          const p={id:'x',name:'x',race:r,cls:c,level:lv,st:{str:0,agi:0,int:0,mor:0},
                   eq:w?{main:w}:{},perks:[]};
          const u=unitFrom(JSON.parse(JSON.stringify(p)));
          note(paintedSpriteKey(u.kind,'you',{unit:u,leader:false,caster:u.caster,bow:u.bow}));
          note(paintedSpriteKey(u.kind,'you',{unit:u,leader:true,caster:u.caster,bow:u.bow}));
        }catch(e){}
      }));
    }));
    /* ⚠ THE ID-KEYED BRANCHES ARE ASKED OF THE CASCADE DIRECTLY, not through
       `unitFrom`. A preset object is not a roster row and `unitFrom(PRESET_ASH)`
       throws, which reported Asha's own painting as art nobody uses. What is
       under test here is the CASCADE; building a body is a different probe. */
    Object.keys(PORTRAIT).forEach(id=>races.forEach(r=>cls.forEach(c=>{
      try{note(paintedSpriteKey(r==='ogre'?'ogre':r==='ratkin'?'ratkin':'human','you',
        {unit:{id:id,race:r,cls:c,level:1}}));}catch(e){}
    })));
    try{ARENA.COMPS.prepared().forEach(p=>{
      const u=unitFrom(JSON.parse(JSON.stringify(p)));
      note(paintedSpriteKey(u.kind,'you',{unit:u,leader:u.leader,caster:u.caster,bow:u.bow}));
    });}catch(e){}
  });
  /* the picture itself travels with the finding, so the list can be LOOKED at
     rather than read: an unused asset is a thing somebody drew. */
  const pic=k=>{const a=BATTLE_ART[k];
    return a&&a.src?{src:a.src,w:a.w||null,h:a.h||null}:null;};
  const unused=Object.keys(BATTLE_ART)
    .filter(k=>k.indexOf('object_')!==0&&!reached[k]).sort();
  out.battle={reached:Object.keys(reached).sort(),
    unused:unused.map(k=>({key:k,art:pic(k)})),
    terrain:Object.keys(BATTLE_ART).filter(k=>k.indexOf('object_')===0).length};

  /* ── 2. item paintings with no GEAR row to hang on ── */
  out.items={mapped:Object.keys(ITEM_ICON).length,
    noRow:Object.keys(ITEM_ICON).filter(k=>!GEAR[k]).sort(),
    noArt:Object.keys(ITEM_ICON).filter(k=>!ITEM_ART[ITEM_ICON[k]]).sort(),
    artUnmapped:Object.keys(ITEM_ART).filter(a=>
      !Object.keys(ITEM_ICON).some(k=>ITEM_ICON[k]===a)).sort()};

  /* ── 3. map art nobody points at, and nodes with no picture ── */
  const used={};Object.keys(MAP_SIGHT).forEach(k=>used[MAP_SIGHT[k]]=1);
  Object.keys(MAP_PLACE).forEach(k=>used[MAP_PLACE[k]]=1);
  out.map={artUnmapped:Object.keys(MAP_ART).filter(k=>!used[k]).sort(),
    mappingsWithNoArt:Object.keys(MAP_SIGHT).concat(Object.keys(MAP_PLACE))
      .filter(k=>!MAP_ART[(MAP_SIGHT[k]||MAP_PLACE[k])]).sort(),
    bareNodes:Object.keys(NODES).filter(k=>!sightFor(NODES[k])&&!placeFor(NODES[k]))};

  /* ── 4. the wide stages: a painting with no card to be the stage of ── */
  try{
    const jUsed={};Object.keys(JSTAGE).forEach(k=>jUsed[JSTAGE[k]]=1);
    out.stages={unmapped:Object.keys(JSTAGE_ART).filter(k=>!jUsed[k]).sort(),
      mappedNoArt:Object.keys(JSTAGE).filter(k=>!JSTAGE_ART[JSTAGE[k]]).sort()};
  }catch(e){out.stages='n/a: '+e.message;}

  /* ── 5. portraits, and bestiary rows with nothing to describe ── */
  const monsOn={};Object.keys(FOE_BUILD).forEach(k=>devFoeUnits(k)
    .forEach(u=>{if(u.monster)monsOn[u.monster]=1;}));
  out.bestiary={rows:Object.keys(MONSTERS),
    noBody:Object.keys(MONSTERS).filter(m=>!monsOn[m])};
  out.portraits={rows:Object.keys(PORTRAIT),
    noArt:Object.keys(PORTRAIT).filter(k=>!ART[PORTRAIT[k]])};

  /* ── 6. event art with no card ── */
  out.events={artUnmapped:Object.keys(EVENTART).filter(k=>
    !EVENTS[k]&&!CAMPS[k]&&['prologue','contract'].indexOf(k)<0).sort()};
  /* ── 7. a STATBLOCK no plan fields. The table row is the asset here: it was
        written, it is tuned, and no fight can put it on a board. ── */
  const fielded={};
  Object.keys(FOE_BUILD).forEach(k=>{
    (k==='clash'?devFoeRun(k,'ratkin').concat(devFoeRun(k,'ogre')):devFoeRun(k))
      .forEach(u=>{fielded[u.variant]=1;});
  });
  ALLY.forEach(f=>{try{f().forEach(u=>{fielded[u.variant]=1;});}catch(e){}});
  const seenV={},dead=[];
  Object.keys(FOE_T).forEach(f=>Object.keys(FOE_T[f]).forEach(v=>{
    if(fielded[v]||seenV[v])return;seenV[v]=1;
    const t=FOE_T[f][v];
    let art=null;
    try{const u=build([[3,3,v,20]],FOE_T[f])[0];
      const s2=sprite(u.kind,'foe',{unit:u,leader:u.captain,caster:u.caster,bow:u.bow});
      art={src:s2.src,w:s2.w,h:s2.h};}catch(e){}
    dead.push({fight:f,variant:v,name:t.name,kind:t.kind,
      hp:t.hp,armour:t.armour,mor:t.mor,skill:t.skill,dodge:t.dodge,speed:t.speed,
      acts:(t.acts||[]).map(a=>a.n+(a.dmg?' '+a.dmg[0]+'-'+a.dmg[1]:'')),art:art});
  }));
  out.statblocks={neverFielded:dead};
  return out;
})()
