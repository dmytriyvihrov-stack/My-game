(() => { try { const _s = strike; strike = function(){ return _s.apply(this,arguments); };
  return {writable:true, isfn: typeof strike}; } catch(e){ return {writable:false, err:''+e}; } })()
