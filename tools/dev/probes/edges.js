/* every VISIBLE structural edge on each screen, grouped by colour and width.

     python tools/dev/gt.py eval edges.js

   ⛔ WHY THIS IS A PROBE AND NOT A GREP. `.claude/skills/ui-scales/SKILL.md` §5 greps the
   SOURCE for a scale colour written as a literal, which finds a token that was retyped and
   cannot find the opposite fault: a literal that was never a token at all. That is the fault
   the file actually accumulates. #292 measured it and the four screens carried FIVE teal
   edges where the scale has two, `#4c6a6d` and `#4d6b6c` doing one job, and `#2a2114` - a
   background colour at eleven sites - drawing four borders on the company sheet.

   ⛔ AND IT WALKS THE RENDERED PAGE, WHICH IS THE POINT. A rule in the stylesheet may be
   overridden by an inline colour a renderer writes (the two state chips on the world bar
   carry the rung's own hue) and may apply to nothing at all. What is asked here is what an
   eye gets, on the screen it gets it on.

   HOW TO READ IT. Every row is `<colour> | <width> <style>  x<sides>  [elements]`, sorted by
   how many sides wear it. ⚠ THE COUNT IS SIDES, NOT ELEMENTS: a fully bordered box
   contributes 4. The named tokens are resolved back to `--e1..--e6`, so anything printed as
   a raw `rgb(...)` is either a MEANING edge (which §2 says must stay off the scale: gold
   selects, blood warns, green approves, a race mark, a node's kind) or the finding.

   ⚠ IT STARTS A RUN AND A FIGHT. `loadRun()` and `startBattle()` are how the world bar and
   the battle chrome get their content; on a browser with no save the world rows come back
   thin rather than wrong. */
(() => {
  const NAME = { 'rgb(61, 47, 29)': '--e1', 'rgb(77, 60, 34)': '--e2', 'rgb(107, 83, 48)': '--e3',
                 'rgb(44, 61, 63)': '--e4', 'rgb(53, 73, 76)': '--e5', 'rgb(77, 107, 108)': '--e6' };
  const scan = () => {
    const m = {};
    for (const e of document.querySelectorAll('#stage *')) {
      const c = getComputedStyle(e);
      if (c.display === 'none' || c.visibility === 'hidden') continue;
      if (!e.offsetParent && c.position !== 'fixed') continue;
      ['Top', 'Right', 'Bottom', 'Left'].forEach(s => {
        const st = c['border' + s + 'Style'], w = parseFloat(c['border' + s + 'Width']);
        if (st === 'none' || st === 'hidden' || !w) return;
        const col = c['border' + s + 'Color'];
        if (/rgba\(0, 0, 0, 0\)|transparent/.test(col)) return;
        const k = (NAME[col] || col) + ' | ' + w + 'px ' + st;
        (m[k] = m[k] || { n: 0, who: {} }).n++;
        const id = e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') +
          (e.className && typeof e.className === 'string'
            ? '.' + e.className.trim().split(/\s+/)[0] : '');
        m[k].who[id] = (m[k].who[id] || 0) + 1;
      });
    }
    return Object.entries(m).sort((a, b) => b[1].n - a[1].n)
      .map(([k, v]) => k + '  x' + v.n + '  [' + Object.keys(v.who).slice(0, 6).join(', ') + ']');
  };

  const o = {};
  loadRun(); show('world'); worldTick(); placeToken(); drawNodes(); o.world = scan();
  openInv(); o.inv = scan();
  startBattle('brigand');
  const i = B.order.findIndex(x => x.side === 'you' && !x.ally && !x.pet);
  B.idx = i; beginTurn(); render();
  o.battle = scan();
  show('menu'); openMenu(); o.menu = scan();
  return o;
})()
