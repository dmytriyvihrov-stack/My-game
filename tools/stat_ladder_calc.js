/* STR/AGI ladder proposal: today's derived numbers vs the proposed ones, for the
   seven authored bodies. Formulas copied from prototype/grimtoll_slice.html:
   D.hp / D.dmg / D.hit / D.dodge / thews / swingOf / unitFrom / RACEMOD / TRAITS. */
const R=Math.round, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------- TODAY ---------- */
const RACEMOD={human:{str:0,agi:0,int:2,mor:0},ratkin:{str:-1,agi:1,int:0,mor:0},ogre:{str:2,agi:-1,int:-1,mor:1}};
const TRAITMOD={stubborn:{mor:-5},thrice:{},windtouched:{mor:-2},ambition:{},twitchy:{agi:2,mor:-3},dutiful:{},big:{agi:-2,bigly:16}};
const RACEDODGE={ratkin:5,ogre:-5,human:0};
const WEAPON={sword:[16,24],spear:[15,22],rod:[6,10],bow:[14,21],knife:[11,16],club:[23,36]};
const HIT_EASE=10;
const BODIES=[
 {n:'Captain (You)',race:'human',st:{str:9,agi:8,int:9,mor:11},trait:'stubborn',w:'sword',lvl:{str:0,agi:-1}},
 {n:'Vesna Kolb',   race:'human',st:{str:9,agi:9,int:7,mor:10},trait:'thrice',w:'spear',lvl:{str:0,agi:0}},
 {n:'Marrow',       race:'human',st:{str:8,agi:8,int:12,mor:9},trait:'windtouched',w:'rod',caster:true,lvl:{str:-1,agi:-1}},
 {n:'Ilka Renn',    race:'human',st:{str:7,agi:11,int:8,mor:9},trait:'ambition',w:'bow',bow:true,lvl:{str:-1,agi:1}},
 {n:'Skree',        race:'ratkin',st:{str:5,agi:13,int:8,mor:6},trait:'twitchy',w:'knife',lvl:{str:-3,agi:2},traitLvl:{agi:1}},
 {n:'Ash Nobody’s', race:'ratkin',st:{str:5,agi:12,int:9,mor:9},trait:'dutiful',w:'knife',dirk:6,lvl:{str:-3,agi:2}},
 {n:'Bruht',        race:'ogre',st:{str:11,agi:6,int:5,mor:11},trait:'big',w:'club',lvl:{str:2,agi:-2},traitLvl:{agi:-1}},
];
function today(b){
  const m=RACEMOD[b.race],t=TRAITMOD[b.trait]||{};
  const s={str:b.st.str+m.str+(t.str||0),agi:b.st.agi+m.agi+(t.agi||0),mor:b.st.mor+m.mor+(t.mor||0)};
  let hp=R(25+s.str*3.5)+(t.bigly||0); if(b.bow||b.caster)hp=R(hp*0.9);
  const th=b.bow?clamp((s.agi-8)*.055,-.3,.55):clamp((s.str-8)*.055,-.3,.55);
  const mult=1+s.mor*0.012+th, flat=R(s.str*0.3), d=WEAPON[b.w];
  const lo=R((d[0]+flat)*mult),hi=R((d[1]+flat)*mult);
  const hit=48+R(s.agi*1.2)+HIT_EASE+(b.dirk||0);
  const dodge=6+R(s.agi)+RACEDODGE[b.race];
  return {s,hp,lo,hi,mult:+mult.toFixed(3),flat,hit,dodge};
}

/* ---------- PROPOSED (round three, 2026-08-19: nine rungs, −4..+4, 0 = the ordinary human) ---------- */
/* THE RACE TABLE carries the body: hitpoints base (the one MULTIPLYING half), and the three
   additive bits (melee %, to-be-hit, step) plus the lean in rungs. */
const RACE={
  human :{hp:56, melee:0,   tbh:0,  step:4, lean:{str:0, agi:0}},
  ratkin:{hp:42, melee:-.10,tbh:-5, step:5, lean:{str:-1,agi:+1}},
  ogre  :{hp:70, melee:+.10,tbh:+10,step:3, lean:{str:+1,agi:-1}},
};
const HIT_BASE=68, DODGE_BASE=14;
/* rung → what THIS rung gives. Negative rungs are debuffs, a little softer than the buffs. */
const STR_RUNG={
  '-4':{hp:0,  melee:-.15,bow:-.08}, '-3':{hp:-.10,melee:0,bow:0}, '-2':{hp:0,melee:-.15,bow:-.08}, '-1':{hp:-.05,melee:0,bow:0},
  '0':{}, '1':{hp:.10}, '2':{melee:.20,bow:.10}, '3':{hp:.15}, '4':{melee:.20,bow:.10,cap:'STANDS'} };
const AGI_RUNG={
  '-4':{dodge:-3}, '-3':{hit:-3}, '-2':{dodge:-3}, '-1':{hit:-3},
  '0':{}, '1':{hit:4}, '2':{dodge:4}, '3':{hit:4}, '4':{dodge:4,cap:'FLEET'} };
/* held = the sum of every rung between 0 and L, on L's side of 0 */
const held=(T,L,k)=>{let v=0;if(L>0)for(let i=1;i<=L;i++)v+=(T[i][k]||0);if(L<0)for(let i=-1;i>=L;i--)v+=(T[i][k]||0);return v;};
function proposed(b){
  const rc=RACE[b.race],t=TRAITMOD[b.trait]||{},tl=b.traitLvl||{};
  const L={str:clamp(b.lvl.str,-4,4),agi:clamp(b.lvl.agi+(tl.agi||0),-4,4)};
  const mor=b.st.mor+RACEMOD[b.race].mor+(t.mor||0);
  let hp=rc.hp*(1+held(STR_RUNG,L.str,'hp')); if(b.bow||b.caster)hp*=0.9; hp=R(hp)+(t.bigly||0);
  const dmgPct=b.bow?held(STR_RUNG,L.str,'bow'):held(STR_RUNG,L.str,'melee')+rc.melee;
  /* ONE bracket and no flat: dice × (1 + Σ%). The old +round(0.3×STR) flat is BAKED INTO THE WEAPON ROW
     once (+2 on both ends of every GEAR/act row, the enemy's dmgBonus:2 folded the same way), so the
     sword reads 18-26 on its own row and the formula has one term. DICE_RETUNE is that. */
  const DICE_RETUNE=2;
  const mult=1+mor*0.012+dmgPct, d=WEAPON[b.w];
  const lo=R((d[0]+DICE_RETUNE)*mult),hi=R((d[1]+DICE_RETUNE)*mult);
  const hit=HIT_BASE+held(AGI_RUNG,L.agi,'hit')+(b.dirk||0);
  const dodge=DODGE_BASE+held(AGI_RUNG,L.agi,'dodge')-rc.tbh;   /* shown in the old "dodge incl. race" terms */
  return {L,hp,lo,hi,mult:+mult.toFixed(3),hit,dodge};
}
const pct=(a,b)=>{const v=R((b-a)/a*100);return (v>0?'+':'')+v+'%';};
const sg=v=>(v>0?'+':'')+v;
console.log('body | STR/AGI today→rung | HP today→new | swing today→new (avg Δ) | hit | dodge');
BODIES.forEach(b=>{
  const a=today(b),p=proposed(b);
  const avgA=(a.lo+a.hi)/2,avgP=(p.lo+p.hi)/2;
  console.log(`${b.n.padEnd(14)} | ${a.s.str}/${a.s.agi} → ${sg(p.L.str)}/${sg(p.L.agi)} | ${a.hp} → ${p.hp} (${pct(a.hp,p.hp)}) | ${a.lo}-${a.hi} → ${p.lo}-${p.hi} (${pct(avgA,avgP)}) | ${a.hit} → ${p.hit} | ${a.dodge} → ${p.dodge}`);
});
console.log('\nSTR ladder (held), hp on the three bodies, sword 18-26 / bow 16-23 (re-tuned rows) without morale:');
for(let L=-4;L<=4;L++){const hp=held(STR_RUNG,L,'hp'),me=held(STR_RUNG,L,'melee'),bw=held(STR_RUNG,L,'bow');
  console.log(` ${sg(L).padStart(2)}: hp ${(hp*100).toFixed(0).padStart(4)}% → ${R(56*(1+hp))} / ${R(42*(1+hp))} / ${R(70*(1+hp))} | melee ${(me*100).toFixed(0).padStart(4)}% → sword ${R(18*(1+me))}-${R(26*(1+me))} (ratkin ${R(18*(1+me-.1))}-${R(26*(1+me-.1))} · ogre ${R(18*(1+me+.1))}-${R(26*(1+me+.1))}) | bow ${(bw*100).toFixed(0).padStart(4)}% → ${R(16*(1+bw))}-${R(23*(1+bw))}`);}
console.log('\nAGI ladder (held): hit · dodge (human / ratkin / ogre, body folded in)');
for(let L=-4;L<=4;L++){const h=held(AGI_RUNG,L,'hit'),d=held(AGI_RUNG,L,'dodge');
  console.log(` ${sg(L).padStart(2)}: hit ${HIT_BASE+h} · dodge ${DODGE_BASE+d} / ${DODGE_BASE+d+5} / ${DODGE_BASE+d-10}`);}
console.log('\nTODAY per stat point: hp 25+3.5s; melee 1+(s-8)*.055; hit 58+1.2a; dodge 6+a');
[4,6,8,10,12,14,16].forEach(s=>console.log(` s=${s}: hp ${R(25+3.5*s)} · melee ${(1+clamp((s-8)*.055,-.3,.55)).toFixed(2)} · hit ${58+R(1.2*s)} · dodge ${6+s}`));

/* ---------- ROUND FOUR: the full sheet of every founder, rung by rung (2026-08-19) ----------
   final rung = born + race lean + class lean + trait (+ gear). The founders are AUTHORED: `born` is
   set so the final rung is the word today's sheet prints; random recruits roll born −1/0/+1. */
const RACE_LEAN={human:{int:+1},ratkin:{str:-1,agi:+1,int:+1,mor:-1},ogre:{str:+1,agi:-1,int:-1,mor:+1}};
const CLASS_LEAN={captain:{mor:+1},spear:{str:+1},archer:{agi:+1},mage:{int:+1,mor:+1},   /* round five: the battle-mage IS 'mage' now; the old pure mage is deleted */
  cutter:{agi:+1},brute:{str:+1},none:{}};
const TRAIT_RUNG={stubborn:{mor:-1},thrice:{},windtouched:{mor:-1},ambition:{},twitchy:{agi:+1,mor:-1},dutiful:{},big:{agi:-1}};
const WORDS={
  str:['No use lifting anything','Feeble','Weak','Not strong','Strong enough','Strong','Very strong','Enormously strong','Monstrously strong'],
  agi:['All thumbs, every time','Hopeless with their hands','Clumsy','Heavy-handed','Steady enough','Handy','Quick','Very quick','Uncannily quick'],
  int:['Not all there','Simple','Slow-witted','Plain','Sensible','Quick to see it','Clever','Sharp','Brilliant'],
  mor:['Runs before it starts','A coward, and knows it','Easily frightened','Nervous','Fairly brave','Steady','Brave','Fearless','Afraid of nothing']};
const word=(k,L)=>WORDS[k][L+4];
/* INT and MOR rungs, the sketch: what THIS rung gives */
const INT_RUNG={'-4':{work:-.15,land:-5,open:-5},'-3':{xp:-.10},'-2':{work:-.10,land:-5},'-1':{xp:-.05},'0':{},
  '1':{xp:.10},'2':{open:5,work:.15,land:5},'3':{range:1},'4':{work:.15,cap:'TWICE-TAUGHT'}};
const MOR_RUNG={'-4':{climb:-8},'-3':{startRung:-1},'-2':{lossMul:.25},'-1':{nerve:-10,climb:-2},'0':{},
  '1':{nerve:10,climb:4},'2':{lossMul:-.25},'3':{free:.10},'4':{cap:'STANDARD'}};
const FULL=[
 {n:'Captain',race:'human',cls:'captain',trait:'stubborn',born:{str:+1,agi:+1,int:0,mor:-2},gear:'arming sword 18-26 · padded jack',w:'sword'},
 {n:'Vesna Kolb',race:'human',cls:'spear',trait:'thrice',born:{str:-1,agi:0,int:-1,mor:0},gear:'boar spear 17-24 · rags',w:'spear'},
 {n:'Marrow',race:'human',cls:'mage',trait:'windtouched',born:{str:-1,agi:-1,int:0,mor:-1},gear:'working stave 8-12 · focus · rags',w:'rod',caster:true},
 {n:'Ilka Renn',race:'human',cls:'archer',trait:'ambition',born:{str:-1,agi:0,int:-1,mor:0},gear:'hunting bow 16-23 · rags',w:'bow',bow:true},
 {n:'Skree',race:'ratkin',cls:'cutter',trait:'twitchy',born:{str:-2,agi:0,int:-2,mor:-1},gear:'gut-knife 13-18 · scrap',w:'knife'},
 {n:'Ash Nobody’s',race:'ratkin',cls:'cutter',trait:'dutiful',born:{str:-2,agi:0,int:-1,mor:+1},gear:'gut-knife 13-18 · off-hand dirk +6 hit · scrap',w:'knife',dirk:6},
 {n:'Bruht',race:'ogre',cls:'brute',trait:'big',born:{str:0,agi:-1,int:-2,mor:0},gear:'warclub 25-38 · no armour',w:'club',bigly:16},
];
const sgn=v=>v===0?'0':(v>0?'+'+v:String(v));
console.log('\nFULL SHEET (round four): final = born + race + class + trait');
FULL.forEach(b=>{
  const rl=RACE_LEAN[b.race],cl=CLASS_LEAN[b.cls],tr=TRAIT_RUNG[b.trait]||{};
  const F={};['str','agi','int','mor'].forEach(k=>F[k]=clamp(b.born[k]+(rl[k]||0)+(cl[k]||0)+(tr[k]||0),-4,4));
  const rc=RACE[b.race];
  let hp=rc.hp*(1+held(STR_RUNG,F.str,'hp')); if(b.bow||b.caster)hp*=0.9; hp=R(hp)+(b.bigly||0);
  const dmgPct=b.bow?held(STR_RUNG,F.str,'bow'):held(STR_RUNG,F.str,'melee')+rc.melee;
  const d=WEAPON[b.w],lo=R((d[0]+2)*(1+dmgPct)),hi=R((d[1]+2)*(1+dmgPct));
  const hit=HIT_BASE+held(AGI_RUNG,F.agi,'hit')+(b.dirk||0), dodge=DODGE_BASE+held(AGI_RUNG,F.agi,'dodge');
  const nerve=90+held(MOR_RUNG,F.mor,'nerve'), climb=8+held(MOR_RUNG,F.mor,'climb'), loss=1+held(MOR_RUNG,F.mor,'lossMul');
  const xp=1+held(INT_RUNG,F.int,'xp'), open=15+held(INT_RUNG,F.int,'open');
  const line=k=>`${k.toUpperCase()} ${sgn(F[k]).padStart(2)} ${word(k,F[k]).padEnd(24)} = born ${sgn(b.born[k])}`+
    (rl[k]?` · ${b.race} ${sgn(rl[k])}`:'')+(cl[k]?` · ${b.cls} ${sgn(cl[k])}`:'')+(tr[k]?` · ${b.trait} ${sgn(tr[k])}`:'');
  console.log(`\n${b.n}  (${b.race} · ${b.cls} · ${b.trait})  ${b.gear}`);
  ['str','agi','int','mor'].forEach(k=>console.log('  '+line(k)));
  console.log(`  → hp ${hp} · swing ${lo}-${hi} (before nerve) · to hit ${hit} · dodge ${dodge} · step ${rc.step}${F.agi>=4?'+1':''} · nerve ${nerve} starts ${R(nerve*.78)} climbs ${climb} loses ×${loss} · experience ×${xp.toFixed(2)} · the opening ${open}/body`);
});
