# -*- coding: utf-8 -*-
"""#292 part B - EVERY STRUCTURAL EDGE ON THE THREE SCALES, AND THE TWO BARS
AND THE TWO CORNERS AGREE WITH THEMSELVES.

(Same ask: *"консистент, четче бордеры"*.)

Measured on the running build, four screens, every VISIBLE border grouped by
colour (`probes/edges.js`). What it found:

  · the teal chrome had FIVE colours where the scale has two. `--e4` was not
    drawn on the battle screen at all while `#24383a` (the stat cells),
    `#3a4f52` (the act cards) and `#223335` (the log head, the log's own
    footer door) did its job, and the hover was `#4d6b6c` at ten sites plus
    `#4c6a6d` at one - the same colour spelled two ways.
  · the gold ladder had the same drift on the sheet: `#3d3020` (the doll box,
    the memory list) is `--e1` off by three units of blue, and `#2a2114` - a
    BACKGROUND colour everywhere else in this file - was doing edge duty on
    the roster tile, the tab strip, the derived row and the empty ledger chip.
  · the two top bars disagreed about their own seam: `#wBar` 1px, `#iBar` 2px,
    both `--e1`, and the sheet's other three seams 2px.
  · the world bar carried THREE chip grounds in one 42px strip: `#221a10`
    (.cchip), `#161009` (.rseg), `#1a1a14` (.bcchip). Same height, same row,
    three colours.
  · the two corner doors that live on every screen were 23px and 20px tall on
    two different baselines (bottom:10 and bottom:6) with two backgrounds.

Run:  python tools/dev/patches/p292_b_edges.py
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = []

# ═══ 1 · the teal ladder gets its third step ══════════════════════════════
E.append((
    "  --e4:#2c3d3f; --e5:#35494c;                 /* the teal chrome, dim to lit */",

    "  /* ⛔ #292 - AND THE TEAL LADDER GETS ITS THIRD STEP, WHICH IS THE ONE THE GOLD\n"
    "     LADDER HAS ALWAYS HAD. `--e1/--e2/--e3` is dim, raised, lit; the teal side\n"
    "     stopped at two, so every raised or hovered teal edge in the build was a literal.\n"
    "     Counted before it was added: `#4d6b6c` at ten sites and `#4c6a6d` at ONE - the\n"
    "     act card's popover, one unit of blue away from the other ten and unfindable by\n"
    "     eye. That is what a missing step costs, and `.claude/skills/ui-scales/SKILL.md`\n"
    "     §6's condition is met: the surfaces that needed it are named here.\n"
    "     ⚠ TWO SITES KEEP THE LITERAL ON PURPOSE and must not be swept into this: the\n"
    "     `#tutCard.call` rail and `#bLog .ll.mine` are MEANING edges that happen to be\n"
    "     teal (whose voice is speaking), and §2 forbids collapsing one of those into the\n"
    "     structural scale even when the hex agrees today. */\n"
    "  --e4:#2c3d3f; --e5:#35494c; --e6:#4d6b6c;   /* the teal chrome, dim to lit */"))

# ═══ 2 · the corner-door height, on the same footing as --barChip ═════════
E.append((
    "  --barChip:30px;",

    "  --barChip:30px;\n"
    "  /* ⛔ #292 · ONE HEIGHT FOR THE DOORS THAT STAND IN A CORNER OF EVERY SCREEN.\n"
    "     ⚑ GEOMETRY AND NOT A `--p` STEP, for exactly `--barChip`'s reason one comment up:\n"
    "     a shared BOX SIZE is none of the three scales.\n"
    "     Measured before it existed: `? RULES` 23px at `--fs4`, `FEEDBACK` 20px at\n"
    "     `--fs1`, `☰ MENU` 24px - three doors, three heights, and the bottom pair on two\n"
    "     different baselines (10px and 6px off the floor). 24 IS THE TALLEST OF THE\n"
    "     THREE, so nothing shrank and no type came down a step to buy it: the type sizes\n"
    "     are untouched and the BOX is what agrees now. */\n"
    "  --chromeChip:24px;"))

# ═══ 3 · the off-scale teals come onto the scale ═════════════════════════
E.append((
    "#bIcons button:hover:not(:disabled){background:#294041;color:var(--t4);border-color:#4d6b6c}",
    "#bIcons button:hover:not(:disabled){background:#294041;color:var(--t4);border-color:var(--e6)}"))
E.append((
    ".act{width:80px;height:90px;background:linear-gradient(#1e2c2d,#141f20);border:1px solid #3a4f52;",
    ".act{width:80px;height:90px;background:linear-gradient(#1e2c2d,#141f20);border:1px solid var(--e5);"))
E.append((
    ".act:hover:not(:disabled){background:linear-gradient(#25383a,#182425);border-color:#4d6b6c}",
    ".act:hover:not(:disabled){background:linear-gradient(#25383a,#182425);border-color:var(--e6)}"))
E.append((
    "  background:rgba(10,15,16,.97);border:1px solid #4c6a6d;padding:var(--p4) var(--p4);z-index:60;",
    "  background:rgba(10,15,16,.97);border:1px solid var(--e6);padding:var(--p4) var(--p4);z-index:60;"))
E.append((
    "  background:#1f2d2e;border:1px solid #4d6b6c;font-family:var(--mono);",
    "  background:#1f2d2e;border:1px solid var(--e6);font-family:var(--mono);"))
E.append((
    "#bLegend>.lbl:hover{color:#c9c6bb;border-color:#4d6b6c}",
    "#bLegend>.lbl:hover{color:#c9c6bb;border-color:var(--e6)}"))
E.append((
    "#rxWhy textarea:focus{outline:none;border-color:#4d6b6c;background:#172223}",
    "#rxWhy textarea:focus{outline:none;border-color:var(--e6);background:#172223}"))
E.append((
    "#rxSend:hover{color:var(--t4);border-color:#4d6b6c;background:#172223}",
    "#rxSend:hover{color:var(--t4);border-color:var(--e6);background:#172223}"))
E.append((
    ".qta:focus{outline:none;border-color:#4d6b6c;background:#172223}",
    ".qta:focus{outline:none;border-color:var(--e6);background:#172223}"))
E.append((
    ".qpick:hover{background:#294041;color:var(--t4);border-color:#4d6b6c}",
    ".qpick:hover{background:#294041;color:var(--t4);border-color:var(--e6)}"))
E.append((
    "#bStats .pcell{background:#101a1b;border:1px solid #24383a;",
    "#bStats .pcell{background:#101a1b;border:1px solid var(--e4);"))
E.append((
    "  border-bottom:1px solid #223335;user-select:none}",
    "  border-bottom:1px solid var(--e4);user-select:none}"))
E.append((
    "  border-top:1px solid #223335;font-size:var(--fs1);letter-spacing:.1em;color:#7d8f8c;",
    "  border-top:1px solid var(--e4);font-size:var(--fs1);letter-spacing:.1em;color:#7d8f8c;"))

# ═══ 4 · the gold drift on the sheet ═════════════════════════════════════
E.append((
    "  border:1px solid #3d3020;display:flex;flex-direction:column;gap:var(--p3);",
    "  border:1px solid var(--e1);display:flex;flex-direction:column;gap:var(--p3);"))
E.append((
    "  border-left:2px solid #3d3020}",
    "  border-left:2px solid var(--e1)}"))
E.append((
    "  padding:var(--p3) var(--p4);border-bottom:1px solid #2a2114;align-items:center}",
    "  padding:var(--p3) var(--p4);border-bottom:1px solid var(--e1);align-items:center}"))
E.append((
    "letter-spacing:.04em;border-top:1px solid #2a2114;padding-top:var(--p2)}",
    "letter-spacing:.04em;border-top:1px solid var(--e1);padding-top:var(--p2)}"))
E.append((
    ".wchip.none{border-color:#2a2114;background:#171208;color:#6b5836;font-style:italic;cursor:default}",
    ".wchip.none{border-color:var(--e1);background:#171208;color:#6b5836;font-style:italic;cursor:default}"))
E.append((
    "  color:#8a7449;background:#120d07;border:none;border-right:1px solid #2a2114;padding:var(--p4) var(--p2);",
    "  color:#8a7449;background:#120d07;border:none;border-right:1px solid var(--e1);padding:var(--p4) var(--p2);"))
E.append((
    "  border-bottom:1px dotted #332818;cursor:help;min-width:0}",
    "  border-bottom:1px dotted var(--e1);cursor:help;min-width:0}"))

# ═══ 5 · the seams ═══════════════════════════════════════════════════════
E.append((
    "#wBar{height:42px;background:var(--g0);border-bottom:1px solid var(--e1);display:flex;align-items:center;",

    "/* ⛔ #292 · A REGION SEAM IS 2px ON `--e2`, AND BOTH TOP BARS ARE ONE NOW.\n"
    "   The two bars are the same furniture on two screens and they disagreed about their\n"
    "   own bottom edge: `#wBar` 1px, `#iBar` 2px, and the sheet's other three seams\n"
    "   (`#iRoster`, `#iStash`, `#iTabs`) 2px. All five were `--e1`, which on `--g0` is\n"
    "   barely a line at all, so the sheet's whole spine was two invisible pixels wide.\n"
    "   ⛑ THE RULE, WRITTEN DOWN SO THE NEXT ONE HAS SOMEWHERE TO LAND: a BOX takes 1px\n"
    "   of `--e1`; a SEAM between two panes of one screen takes 2px of `--e2`, one step\n"
    "   lit-ter, because it is dividing rather than containing. `.claude/skills/ui-scales`\n"
    "   §2's *\"1px, or 2px when a thing is picked\"* is untouched: a seam is not a box. */\n"
    "#wBar{height:42px;background:var(--g0);border-bottom:2px solid var(--e2);display:flex;align-items:center;"))
E.append((
    "#iBar{height:42px;background:var(--g0);border-bottom:2px solid var(--e1);display:flex;align-items:center;",
    "#iBar{height:42px;background:var(--g0);border-bottom:2px solid var(--e2);display:flex;align-items:center;"))
E.append((
    "#iRoster{width:80px;background:#161009;border-right:2px solid var(--e1);overflow:auto;flex:none}",
    "#iRoster{width:80px;background:#161009;border-right:2px solid var(--e2);overflow:auto;flex:none}"))
E.append((
    "#iStash{width:606px;background:#161009;border-left:2px solid var(--e1);flex:none;",
    "#iStash{width:606px;background:#161009;border-left:2px solid var(--e2);flex:none;"))
E.append((
    "#iTabs{display:flex;flex:none;border-bottom:2px solid var(--e1)}",
    "#iTabs{display:flex;flex:none;border-bottom:2px solid var(--e2)}"))

# ═══ 6 · the world bar is one strip ══════════════════════════════════════
E.append((
    ".rseg{display:flex;align-items:center;gap:6px;background:#161009;border:1px solid var(--e1);",

    "/* ⛔ #292 · ONE GROUND AND ONE EDGE FOR EVERY CHIP ON THE BAR, which is #197's ask\n"
    "   (*\"Make heights same size, so it looks nicer\"*) finished on the other axis. #197\n"
    "   gave the strip one HEIGHT and left three BACKGROUNDS standing: `.cchip` `#221a10`,\n"
    "   `.rseg` `#161009`, `.bcchip` `#1a1a14` - measured side by side in one 42px row, and\n"
    "   the eye reads three grounds as three kinds of thing. `#221a10` wins because six of\n"
    "   the ten chips already wore it and it is the only one that lifts off `--g0`.\n"
    "   ⚠ THE EDGE GOES `--e2` AND THE MEANING EDGES ARE UNTOUCHED: `.tchip` keeps its\n"
    "   bloom red and `.bcchip`'s inline mood/blood colour keeps carrying the rung. */\n"
    ".rseg{display:flex;align-items:center;gap:6px;background:#221a10;border:1px solid var(--e2);"))
E.append((
    ".cchip{display:flex;align-items:center;gap:6px;background:#221a10;border:1px solid var(--e1);",
    ".cchip{display:flex;align-items:center;gap:6px;background:#221a10;border:1px solid var(--e2);"))
E.append((
    ".bcchip{display:flex;align-items:center;gap:5px;background:#1a1a14;border:1px solid var(--e1);",
    ".bcchip{display:flex;align-items:center;gap:5px;background:#221a10;border:1px solid var(--e2);"))
E.append((
    ".bcchip.click:hover{background:#26261c;filter:brightness(1.15)}",
    ".bcchip.click:hover{background:#2a2114;filter:brightness(1.15)}"))
E.append((
    "  border-radius:50%;background:#c15d55;box-shadow:0 0 0 1px #1a1a14,0 0 7px rgba(193,93,85,.9)}",
    "  border-radius:50%;background:#c15d55;box-shadow:0 0 0 1px #221a10,0 0 7px rgba(193,93,85,.9)}"))

# the two state chips' meaning edge was 40% alpha, which reads as "dimmer",
# not as "coloured". `aa` is 67%, the same weight as the `--e2` beside it.
E.append((
    "'<span class=\"bcchip click\" data-w=\"mood\" style=\"border-color:'+ms.col+'66\">'+",
    "/* ⛔ #292 - `aa` AND NOT `66`. A meaning edge at 40% alpha over `#221a10` is DIMMER\n"
    "   than the `--e2` on the seven chips beside it, so the two readouts that carry a\n"
    "   colour read as the two chips that were forgotten. At 67% the rung's colour is the\n"
    "   loudest edge on the strip, which is what it is for. */\n"
    "     '<span class=\"bcchip click\" data-w=\"mood\" style=\"border-color:'+ms.col+'aa\">'+"))
E.append((
    "'style=\"border-color:'+hs.col+'66\">'+",
    "'style=\"border-color:'+hs.col+'aa\">'+"))
E.append((
    "style=\"border-color:#8ca35a66\">'+",
    "style=\"border-color:#8ca35aaa\">'+"))

# ═══ 7 · the two corner doors ════════════════════════════════════════════
E.append((
    "#menuBtn:hover{color:var(--g4)}",

    "#menuBtn:hover{color:var(--g4)}\n"
    "/* ⛔ #292 · THE THREE DOORS THAT STAND IN A CORNER OF EVERY SCREEN ARE ONE BOX.\n"
    "   `? RULES` bottom left, `FEEDBACK` bottom right and `☰ MENU` top right are the only\n"
    "   chrome a player sees on all fourteen screens, and they were three sizes, two\n"
    "   backgrounds and two floor heights. `--chromeChip` is the tallest of the three, so\n"
    "   the type is untouched and only the BOXES agree; the ground and the edge come with\n"
    "   it. `:not(.inlog)` leaves the battle log's footer door alone - that one is a full\n"
    "   width row inside the log and has its own rule three lines up. */\n"
    "#helpBtn:not(.inlog),#menuBtn:not(.inlog),#reactTog{display:flex;align-items:center;\n"
    "  min-height:var(--chromeChip);padding:0 var(--p4);line-height:1.1;\n"
    "  background:rgba(16,12,6,.88);border:1px solid var(--e2)}"))
E.append((
    "#reactBar{position:absolute;right:38px;bottom:6px;z-index:150;display:flex;gap:4px;",
    "/* ⛔ #292 - AND ON THE SAME FLOOR AS `? RULES` OPPOSITE IT. 6 against 10 is a 4px\n"
    "   step between the two bottom corners, which nothing reads as deliberate. */\n"
    "#reactBar{position:absolute;right:38px;bottom:10px;z-index:150;display:flex;gap:4px;"))

# ═══ 8 · every map caption gets the ring the live one already has ════════
E.append((
    ".node .nm{font-family:var(--display);font-size:var(--fs2);color:#c9b98f;text-align:center;line-height:1.15;background:rgba(10,8,4,.74);padding:var(--p1) var(--p2);text-shadow:0 1px 2px #000;",

    "/* ⛔ #292 - EVERY CAPTION GETS THE HAIRLINE THE LIVE ONE ALREADY HAD. `.node.live\n"
    "   .nm`, `.node.mark .nm`, `.node.goal .nm` and `.node.done .nm` have each carried a\n"
    "   `box-shadow:0 0 0 1px` ring since they were written; the PLAIN caption had none, so\n"
    "   two thirds of the labels on the map were an unbounded smudge of `rgba(10,8,4,.74)`\n"
    "   over painted ground and the other third were plates.\n"
    "   ⛔ A `box-shadow` AND NEVER A `border`, and that is not taste here: the three map\n"
    "   counters in `.claude/skills/world-map-sights/SKILL.md` measure label BOXES against\n"
    "   each other and against the roads, and a border would grow every one of them by 2px.\n"
    "   A shadow costs no layout, so spacing/label/orphan stay 0/0/0 by construction. */\n"
    ".node .nm{font-family:var(--display);font-size:var(--fs2);color:#c9b98f;text-align:center;line-height:1.15;background:rgba(10,8,4,.74);padding:var(--p1) var(--p2);text-shadow:0 1px 2px #000;box-shadow:0 0 0 1px var(--e1);"))

patch(E)
print('p292_b: %d edits applied' % len(E))
