/* the company sheet's height budget: every body, every state, against the
   666px content box.

     python tools/dev/gt.py eval sheet.js

   ⚠ THE WORST CASE IS NOT THE BODY THE SCREEN OPENS ON, and it is a per-AXIS
   fact (#200/#230): the Captain is the worst for WIDTH (six ability cards) and
   the BEST for height (no dismiss button, so his `iFoot` is 2 against a crew
   member's 25). A body whose NAME wraps to two lines of Cinzel at `--fs7` is
   the worst case for height and is the one to quote.
   ⚑ A NUMBER HERE MEANS NOTHING ON ITS OWN. Serve `git show HEAD:` in a second
   browser, run this there too, and diff. `.claude/rules/ui-scales.md` §5. */
(() => GT.eachBody().map(r => r.id + '/' + r.cls + ' ' + r.state +
  ': slack ' + r.m.slack + ' scroll ' + r.m.scroll +
  ' over ' + (r.m.overlap.join('; ') || '-')))()
