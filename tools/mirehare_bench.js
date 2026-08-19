/* ═══════════════════════════════════════════════════════════════════════
   MIREHARE TEST BENCH - #193 (8f.212). Loaded into the running page, never
   shipped. It DEFINES NOTHING: the creatures, the card and the AI all live in
   `prototype/grimtoll_slice.html` now, and this file only measures them.

     fetch('/tools/harness.js').then(r=>r.text()).then(eval)
     fetch('/tools/mirehare_bench.js').then(r=>r.text()).then(eval)

   ⛔ AND THAT IS THE POINT OF IT. An earlier cut of this file carried its own
   statblocks and its own brain, which was right while the pair were a
   proposal and became a LIE the moment they landed: two competing mirehare
   designs in one repo is the drift this project has paid for before. What
   survives is the instrument.

   THE QUESTION IT EXISTS TO ANSWER (the user, 2026-08-19):
   *"I want some damage, if player ignores logic of this enemy."*

   That cannot be read off a win rate. Both creatures are built around a rule
   the player is supposed to work out, and each rule has a counter:

     the DOE  lands exactly three hexes away and hits what she lands on.
              She cannot reach anybody standing closer than that without
              leaving first, so the counter is CLOSE THE GAP AND STAY IN IT.
     the BUCK charges a straight cube axis and needs at least two hexes of
              run to be allowed to charge at all (`n>=2` in mirehareMove).
              The counter is BLOCK THE LANE, or stand on top of him.

   So the bench measures the SAME fight against companies that answer those
   rules and companies that ignore them, and reports the gap. If the gap is
   small the creature is not teaching anything, whatever its win rate says.

     MB.axes()          the charge lanes really are straight. Run first
     MB.run(12)         12 fights, the shipped encounter, full AI both sides
     MB.gap(12)         THE ONE THAT MATTERS: answered vs ignored
     MB.probe()         one fight, every mirehare blow itemised
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
if(typeof window.runFight!=='function')
  console.warn('mirehare_bench: load tools/harness.js first');
const M={};window.MB=M;

/* ---- 1. the geometry the shipped charge is authored in ------------------
   `mirehareMove` builds its lanes in cube space on purpose (its own comment
   says why: DIR's index is not a direction, so repeating one zig-zags with
   row parity). This re-derives the same six vectors independently and checks
   them with the ENGINE'S OWN `hdist`, from both row parities, so the check
   cannot agree with the bug by sharing its code. */
const AXIS=[[1,-1,0],[1,0,-1],[0,1,-1],[-1,1,0],[-1,0,1],[0,-1,1]];
const LANE=['E','NE','NW','W','SW','SE'];
const stepN=(c,r,d,n)=>{const q=cube(c,r),v=AXIS[d];
  const z=q.z+v[2]*n,x=q.x+v[0]*n;return [x+((z-(z&1))/2),z];};
M.axes=function(){
  const out=[];
  for(let d=0;d<6;d++){
    let ok=true;
    [[7,6],[8,5],[4,11],[9,2]].forEach(o=>{
      for(let n=1;n<=4;n++) if(hdist(o,stepN(o[0],o[1],d,n))!==n) ok=false;
    });
    out.push(LANE[d]+':'+(ok?'straight':'⛔ BENT'));
  }
  /* and a lane is collinear, not merely the right distance */
  const line=[1,2,3,4].map(n=>stepN(7,6,1,n)),far=line[3];
  out.push('collinear:'+(line.slice(0,3).every(p=>
    hdist([7,6],p)+hdist(p,far)===hdist([7,6],far))?'yes':'⛔ NO'));
  /* the doe's ring: how many hexes are exactly three away on open ground */
  let ring=0;
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)if(hdist([c,r],[7,6])===3)ring++;
  out.push('ring at exactly 3: '+ring+' hexes');
  return out.join(' · ');
};

/* ---- 2. one fight, with every mirehare blow itemised --------------------
   `probe` fires inside the harness's wrapped `strike`, which is the ONE door
   every blow in the game comes through, so a landing and a charge are counted
   by the same instrument as everything else. */
function fight(comp,setup){
  const s={land:0,dash:0,dmg:0,onYou:0,turns:0};
  const r=runFight('mirehares',{comp:comp||'prepared',
    setup:(b)=>{s.start=b.units.filter(x=>x.side==='you')
      .reduce((n,x)=>n+x.hp+x.armour,0); if(setup)setup(b);},
    probe:(a,d,act)=>{
      if(!act)return;
      if(act.leap)s.land++;
      if(act.dash)s.dash++;
    },
    after:(b)=>{
      const you=b.units.filter(x=>x.side==='you');
      const foe=b.units.filter(x=>x.side==='foe');
      return {took:Math.round(s.start-you.reduce((n,x)=>n+x.hp+x.armour,0)),
        left:foe.filter(x=>!x.dead).length,foes:foe.length};
    }});
  r.s=s;return r;
}
const agg=(rows)=>{
  const ok=rows.filter(r=>r.after&&!r.fatal);
  const avg=f=>ok.reduce((n,r)=>n+f(r),0)/(ok.length||1);
  const w=rows.filter(r=>r.won===true||r.won==='mercy').length;
  return {n:rows.length,wins:w+'/'+rows.length,
    rounds:avg(r=>r.rounds),down:avg(r=>r.down),took:avg(r=>r.after.took),
    land:avg(r=>r.s.land),dash:avg(r=>r.s.dash),
    stalls:rows.filter(r=>r.guard!=='ok'||r.won==='DRAW/STALL').length,
    errs:rows.flatMap(r=>(r.errs||[]).concat(r.fatal?[r.fatal]:[])).slice(0,3)};
};
M.run=function(n,comp,setup){
  const rows=[];for(let i=0;i<(n||12);i++)rows.push(fight(comp,setup));
  return agg(rows);
};
const fmt=(lbl,o)=>lbl.padEnd(26)+String(o.wins).padStart(6)+
  '  '+o.rounds.toFixed(1)+'rd  '+o.down.toFixed(2)+' down  '+
  String(Math.round(o.took)).padStart(4)+' taken  '+
  o.land.toFixed(1)+' landings + '+o.dash.toFixed(1)+' charges'+
  (o.stalls?'  ⚠STALL '+o.stalls:'')+(o.errs.length?'  ERR '+o.errs.join(';'):'');

/* ---- 3. THE GAP: a company that answers them, and one that does not -----
   ⛔ THE TWO ARRANGEMENTS ARE THE WHOLE MEASUREMENT AND THEY ARE APPLIED AT
   `setup`, WHICH RUNS AFTER `startBattle` HAS PLACED EVERYBODY. Nothing else
   differs: same company, same statblocks, same brain on both sides, same
   number of fights. Only where your people are standing when it opens.

     IGNORED  a tidy line abreast in open ground, well back, exactly the
              deployment every other fight in the act rewards. It is the
              longest possible run-up for a buck and it leaves the doe a
              clean ring of landings behind the line.
     ANSWERED the same bodies packed into a two-hex knot against the board's
              own edge and rocks: short lanes, no room to build a charge, and
              most of the doe's ring is either off the board or occupied. */
function arrange(b,mode){
  const you=b.units.filter(u=>u.side==='you'&&!u.dead);
  if(mode==='ignored'){
    /* spread down one column, deep in your own half: the parade-ground answer */
    you.forEach((u,i)=>{u.col=2;u.row=Math.max(0,Math.min(ROWS-1,2+i*2));});
  }else{
    /* a knot in the corner, shoulder to shoulder */
    const spots=[[1,1],[2,1],[1,2],[2,2],[1,3],[2,3],[3,1],[3,2]];
    you.forEach((u,i)=>{const p=spots[i%spots.length];u.col=p[0];u.row=p[1];});
  }
  /* nobody starts inside a rock, same guarantee startBattle gives */
  you.forEach(u=>{b.terr[K(u.col,u.row)]='field';});
}
M.gap=function(n,comp){
  n=n||12;comp=comp||'prepared';
  const ig=M.run(n,comp,b=>arrange(b,'ignored'));
  const an=M.run(n,comp,b=>arrange(b,'answered'));
  const out=[
    fmt('IGNORED (line abreast)',ig),
    fmt('ANSWERED (knotted up)',an),
    '',
    'the gap: '+(ig.down-an.down).toFixed(2)+' more of yours down and '+
      Math.round(ig.took-an.took)+' more hp+armour taken for ignoring it'
  ];
  console.log(out.join('\n'));
  return {ignored:ig,answered:an,rows:out};
};
M.probe=function(comp){
  const r=fight(comp);
  return {won:r.won,rounds:r.rounds,down:r.down,took:r.after&&r.after.took,
    landings:r.s.land,charges:r.s.dash,guard:r.guard,errs:r.errs};
};
return 'mirehare bench ready: MB.axes() · MB.run() · MB.gap() · MB.probe()';
})();
