(()=>{
  const N=30;
  const sum=r=>{const w=r.rows.filter(x=>x.won===true).length;
    return (100*w/r.rows.length).toFixed(0)+'% ('+w+'/'+r.rows.length+') · '+
      (r.rows.reduce((s,x)=>s+x.rd,0)/r.rows.length).toFixed(1)+'rd';};
  const BASE=()=>{const plan=[[10,6,'serj',46],
    [9,4,'corp',42],[9,8,'corp',41],[10,2,'corp',40],
    [10,5,'bill',38],[10,7,'bill',37],[9,10,'bill',36],[11,4,'bill',35],
    [11,6,'cross',33],[12,1,'cross',32],
    [9,1,'hound',49],[9,11,'hound',48],[10,9,'hound',47]];
    if(G.party.length>=6)plan.push([10,10,'corp',39],[11,8,'bill',34],[12,11,'cross',31],
      [11,2,'bill',30]);
    return plan;};
  const run=(mk,label)=>{FOE_BUILD.snarejoin=()=>build(mk(),HOLD_T);
    return label+': '+sum(ARENA.match('prepared','snarejoin',N));};
  const out=[];
  out.push(run(BASE,'shipped'));
  out.push(run(()=>{const p=BASE();
    p.push([11,10,'bill',33],[10,4,'bill',32]);return p;},'B +2 bills only'));
  out.push(run(()=>{const p=BASE();
    p[4]=[10,5,'bill',38,'champ'];p[5]=[10,7,'bill',37,'champ'];
    p[1]=[9,4,'corp',42,'champ'];
    p.push([11,10,'bill',33],[10,4,'bill',32]);return p;},'D +2 bills, 3 champions'));
  FOE_BUILD.snarejoin=holdHost;
  return out;
})()
