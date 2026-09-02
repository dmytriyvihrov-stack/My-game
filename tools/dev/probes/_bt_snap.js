(() => {
  const o={};
  Object.keys(localStorage).forEach(k=>{o[k]=localStorage.getItem(k);});
  return {n:Object.keys(o).length, bytes:JSON.stringify(o).length, dump:o};
})()
