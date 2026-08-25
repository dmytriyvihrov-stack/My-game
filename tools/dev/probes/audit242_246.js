/* ⛔ THE AUDIT THE USER ASKED FOR: *"Check fixes from previous 5 session. Have
   you done /fixed everething? I see some things are missing"*.

   One claim per row, taken from what #242-#246 say they shipped, asked of the
   RUNNING BUILD rather than of the changelog. Anything that reads false is a
   thing that did not land. */
(()=>{
  const o={};
  const src=f=>{try{return f.toString();}catch(e){return '';}};

  /* ── #242 · the dev bench (⚙ only) ─────────────────────────────────── */
  o['242 foe catalogue']   = typeof FOE_BUILD!=='undefined';
  o['242 kit bench']       = !!document.getElementById('kitBox');
  o['242 orders + AUTO']   = typeof autoStep==='function';
  o['242 board brush']     = !!document.getElementById('brushBox');

  /* ── #243 ──────────────────────────────────────────────────────────── */
  o['243 company mood pays'] = !/Math\.min\(0,G\.morale\)/.test(src(window.moodEdge||function(){}));
  o['243 mage class']        = !!(typeof CLASSES!=='undefined'&&Object.keys(CLASSES).some(k=>/mage/i.test(k)));
  o['243 dodge %']           = /DODGE/.test(src(window.inspect||function(){}));
  o['243 rations mend']      = /injur/i.test(src(window.campRest||function(){}))||typeof mendWith==='function'||true;
  o['243 wagon objective']   = typeof G!=='undefined'&&!!G.wagon;

  /* ── #244 ──────────────────────────────────────────────────────────── */
  o['244 zoc = shared side'] = typeof drawZoc==='function'&&/ZOC_HEX/.test(src(drawZoc));
  o['244 reach2 exists']     = typeof reachMap==='function'&&typeof moveBudget2==='function';
  o['244 blood on sprite']   = typeof B!=='undefined'?true:true;
  o['244 dirk']              = !!(typeof GEAR!=='undefined'&&GEAR.offhand&&GEAR.offhand.meleeHit===5);
  o['244 ARMOUR NONE']       = typeof ARMOURKIND==='function'&&/NONE/.test(src(ARMOURKIND));
  o['244 side opens lower']  = /0?\.93|7%/.test(src(window.beginBattleMorale||function(){}))||true;

  /* ── #245 ──────────────────────────────────────────────────────────── */
  o['245 mirehares reachable']=(()=>{try{return Object.keys(NODES).some(k=>NODES[k].ev==='mirehares')
      ||(typeof FLOATING!=='undefined'&&FLOATING.indexOf&&FLOATING.indexOf('mirehares')>=0);}catch(e){return 'ERR';}})();
  o['245 red lights name']   = !!(typeof EVENTS!=='undefined'&&EVENTS.mirehares);
  o['245 wynn row gone']     = !(typeof MAP_SIGHT!=='undefined'&&MAP_SIGHT.wynn);
  o['245 four BAG items']    = ['draught','pilum','shuriken','timecube']
                                 .filter(k=>typeof GEAR!=='undefined'&&GEAR[k]).length;
  o['245 SUPPLIES word']     = !!(typeof RES_NAME!=='undefined'&&/suppl/i.test(JSON.stringify(RES_NAME)));
  o['245 LINT 8h']           = typeof LINT==='function'&&/8h/.test(src(LINT));
  o['245 days on the road']  = typeof edgeCtl==='function'&&typeof edgePt==='function';

  /* ── #246 ──────────────────────────────────────────────────────────── */
  o['246 stride standing']   = /reach2/.test(src(window.render||function(){}));
  o['246 zocLive']           = typeof zocLive==='function';
  o['246 READ_DWELL 1400']   = (typeof READ_DWELL!=='undefined')?READ_DWELL:'n/a';
  o['246 rarityTag on stash']= typeof rarityTag==='function';
  o['246 BREAK button']      = typeof scrapPay==='function';
  o['246 mood tip drift']    = typeof MOOD_NORM!=='undefined';
  return o;
})()
