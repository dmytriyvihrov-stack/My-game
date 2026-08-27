/* #255 - the six asks, measured. */
(()=>{const K=['str','agi','int','mor'];
 const nerve=[4,3,2,1,0,-1,-2,-3,-4].map(n=>n+':'+(GIVEN.nerve+(rungHeld('mor',n).nerve||0))).join(' ');
 const size=Object.keys(RACESIZE).map(r=>r+' '+RACESIZE[r].n+' hp '+(RACEHP[r]+RACEBULK[r])+
   ' melee '+RACEMELEE[r]+' atk '+RACEATK[r]).join(' | ');
 /* an ogre and a ratkin, built the way the game builds them */
 const mk=(race,cls)=>{const p={id:'t',name:'T',sur:'',race:race,cls:cls,kind:race,
   st:{str:0,agi:0,int:0,mor:0},trait:'thrice',perks:[],injuries:[],
   eq:{armour:null,main:'club',off:null,trinket:null,bag:null}};
  finishRecruit(p);const u=unitFrom(p),s=effStats(p);
  return race+'/'+cls+' ['+K.map(k=>k+(s[k]>0?'+':'')+s[k]).join(' ')+'] hp '+bodyHp(p)+
    ' swing '+(sw=>sw?sw.lo+'-'+sw.hi:'-')(swingOf(u));};
 /* what a trait or a piece of gear may now move */
 const worst=[];
 Object.keys(TRAITS).forEach(t=>K.forEach(k=>{const v=TRAITS[t][k];
   if(v&&Math.abs(v)>2)worst.push('TRAIT '+t+' '+k+' '+v);}));
 Object.keys(GEAR).forEach(g=>{K.forEach(k=>{const v=GEAR[g][k];
   if(v&&Math.abs(v)>2)worst.push('GEAR '+g+' '+k+' '+v);});
   const b=GEAR[g].bonus||{};K.forEach(k=>{if(b[k]&&Math.abs(b[k])>2)worst.push('BONUS '+g+' '+k+' '+b[k]);});});
 return {nerveLadder:nerve,size:size,seats:PARTYBASE,
   bodies:[mk('ogre','brute'),mk('ratkin','cutter'),mk('human','spear')],
   bigTraitStillPays:!!(TRAITS.big.agi||TRAITS.big.bigly||TRAITS.big.hp),
   modifiersOverTwoRungs:worst,
   rolledBorn:(()=>{const o=[];for(let i=0;i<12;i++){const r=rollRecruit();
     o.push(K.map(k=>r.st[k]).join(','));}return [...new Set(o)].length+' distinct patterns';})(),
   lint:LINT().findings};})()
