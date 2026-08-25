#!/usr/bin/env python3
# ============================================================================
# record.py - THE FOUR WRITES, COUNTED. And the union-merge damage, caught.
#
#   python tools/record.py check     what is wrong. Exit 1 on a structural fault
#   python tools/record.py fix       resolve conflicts, dedupe, sort. Then check
#   python tools/record.py check --strict     also exit 1 on a missing write
#
# ---------------------------------------------------------------------------
# WHY THIS EXISTS, AND IT IS NOT A NEW IDEA. `docs/SHIPPED.md` has stated the
# contract since it was written:
#
#   "When an entry ships, four writes: full text and a build-log row ->
#    CHANGELOG.md · a one-line row here · strike it from the backlog ·
#    a section -> WHAT_TO_TEST.md"
#
# and it records, in its own header, the day the contract failed:
#
#   "(#117, #137 and #138 were added to this table on 2026-08-14 by #151's
#    audit. All three shipped into the build and into CHANGELOG.md and never
#    got their row here, so THE FOUR WRITES WERE THREE.)"
#
# That audit was done by hand, once, and nothing was left behind to do it
# again. By 2026-08-21 twenty-two entries had a changelog row and no registry
# row. ⛔ A CONTRACT THAT IS ONLY EVER CHECKED BY SOMEBODY REMEMBERING TO CHECK
# IT IS NOT A CONTRACT, IT IS A HABIT, and this repo has now proved that twice.
#
# ---------------------------------------------------------------------------
# ⛔ AND THE SECOND HALF, WHICH IS THE ONE A HUMAN CANNOT DO BY READING.
#
# `.gitattributes` declares CHANGELOG.md, SHIPPED.md and WHAT_TO_TEST.md as
# `merge=union`, for a good reason: every desk adds a row at the top and they
# would conflict every single time. The cost is that A UNION MERGE NEVER
# CONFLICTS, so its damage arrives looking exactly like success. On the
# 2026-08-21 landing of six desks it produced, silently:
#
#   · #215's registry row TWICE - once as authored, once as #217 had edited it
#     to close its own remainder (beast-race was stacked on mirror-battle).
#     The two rows DIFFER, and keeping the wrong one leaves the registry
#     claiming an open remainder that is closed;
#   · #220's changelog row with #221's row written INTO THE MIDDLE of it, on
#     one line, and #220's own text orphaned on the next.
#
# Neither appears in a diff as anything but an addition. Both are one grep.
# ---------------------------------------------------------------------------
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NL = "\r\n"

CHANGELOG = os.path.join(ROOT, "docs", "CHANGELOG.md")
SHIPPED = os.path.join(ROOT, "docs", "SHIPPED.md")
BACKLOG = os.path.join(ROOT, "docs", "00_PLAN_AND_BACKLOG.md")
TESTBENCH = os.path.join(ROOT, "docs", "WHAT_TO_TEST.md")
CLAIMDIR = os.path.join(ROOT, ".grimtoll", "claims")

# ⛔ THE ARCHIVES COUNT AS THE RECORD, OR THE SPLIT LOOKS LIKE A MASS DELETION.
# CHANGELOG.md was 1.26 MB on 2026-08-21 and 82% of it was build-log rows from
# before the era anybody was working in. Moving 195 of them under docs/archive/
# is a MOVE: `grep` still reaches them, `claim.ps1`'s $ShipRecord still reads
# them, and so does this. Read them here and the four-writes counter goes on
# seeing every entry that ever shipped; forget them and it reports two hundred
# entries as missing on the first run after the split.
CHANGELOG_ARCHIVES = [
    os.path.join(ROOT, "docs", "archive", "CHANGELOG_BUILD_LOG_pre_8f200.md"),
    os.path.join(ROOT, "docs", "archive", "CHANGELOG_BUILT_ENTRY_TEXT.md"),
]


def changelog_text():
    """The live changelog plus whatever has been split out of it."""
    parts = ["".join(read(CHANGELOG))]
    for p in CHANGELOG_ARCHIVES:
        if os.path.exists(p):
            parts.append("".join(read(p)))
    return "\n".join(parts)

# ⛔ THE FLOOR IS NOT AN OPINION ABOUT OLD WORK, IT IS THE LINE THIS CHECK WAS
# BORN ON. Entries below it predate the counter and are summarised in one line
# rather than listed: 16 of them have no registry row and re-deriving what
# their open remainders were, years of build-log rows later, is archaeology
# rather than record-keeping. Everything AT or ABOVE it is held to the four
# writes. ⚠ Do not raise this to make a new gap quiet. Raising it is how the
# next twenty-two happen.
ENTRY_FLOOR = 195

# ⚠ THE SAME WARNING `.claude/rules/ui-scales.md` PUTS ON ITS OWN KNOWN-GOOD
# LIST: this is four genuine facts, not a place to put whatever is failing
# today. Each is parked in 00_PLAN_AND_BACKLOG.md's "PARKED BY THE LANDING
# SWEEP OF 2026-08-21" section with its reason, and each leaves this list the
# day its row is written.
KNOWN_MISSING_SHIPPED = {196, 198, 199, 201, 208, 209}

# ⛔ AN ENTRY THAT CHANGES NO SCREEN GETS NO TEST-BENCH SECTION, AND THAT IS THE
# CONTRACT RATHER THAN AN EXCEPTION TO IT. WHAT_TO_TEST.md's own header says it
# exists so that "after a build session you can open the game, go straight to
# the new thing". #222 fixed `claim.ps1 verify`, which is a script in tools/:
# there is no game to open and a section saying so would be furniture, which is
# what `.claude/rules/event-cards.md` spends its length deleting.
# ⚠ THE BAR IS "NOTHING TO PLAY", NOT "SMALL" OR "INTERNAL". A one-line CSS fix
# to a screen still changes a screen and still gets its section.
NO_TESTBENCH = {222}

# ⚠ AN ENTRY CAN HONESTLY BE SHIPPED AND PARKED AT THE SAME TIME, WHICH IS WHY
# WRITE 3 IS A NOTE AND NOT A FAULT. #134 is the case that proves it: the joke
# door LEAVING the opening shipped (SHIPPED.md, 8f.162), and the door itself is
# parked for a future set at the user's own word. Two different things wearing
# one number, and neither row is wrong. A checker cannot tell that apart from a
# backlog row nobody struck, so it reports and a human decides.
SHIPPED_AND_STILL_PENDING_OK = {134}

# ROW SHAPES. One regex per file and nowhere else, so a format change is one
# edit here rather than four scattered greps. `8f.161b` is real, hence the
# optional letter.
RE_CL = re.compile(r"^\| 8f\.(\d+)([a-z]?) \|")
# ⚠ re.M ON THIS ONE OR IT MATCHES NOTHING AND THE CHECK PASSES SILENTLY. It is
# the only pattern here run against a JOINED file rather than line by line, so
# without MULTILINE its `^` anchors at byte 0 and `entries` comes back empty -
# i.e. the four-writes counter reports a clean record because it looked at no
# records at all. Caught by the counter disagreeing with a grep that had already
# named three entries; a green check is a claim and it has to be earned.
RE_CL_ENTRY = re.compile(r"^\| 8f\.\d+[a-z]? \| \*\*#(\d+)", re.M)
RE_SH = re.compile(r"^\| \*\*(\d+)\*\* \|")
RE_BL = re.compile(r"^\| \*\*#(\d+)\*\*")
RE_MARK = re.compile(r"^(<<<<<<<|=======|>>>>>>>)")


def read(path):
    return open(path, "rb").read().decode("utf-8").splitlines(keepends=True)


def write(path, lines):
    data = "".join(lines).encode("utf-8")
    tmp = path + ".tmp"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, path)
    return len(data)


def endnl(line):
    return line if line.endswith(("\n", "\r\n")) else line.rstrip("\r\n") + NL


def first_run(lines, rx):
    """The FIRST contiguous run of rows matching rx: (start, end) inclusive.

    ⚠ SHIPPED.md holds TWO tables and the backlog holds one among a lot of
    prose. Taking "first matching row .. last matching row" would span the
    header between SHIPPED's two tables and shuffle rows across it. A
    contiguous run cannot.
    """
    start = None
    for n, l in enumerate(lines):
        if rx.match(l):
            start = n
            break
    if start is None:
        return None
    end = start
    while end + 1 < len(lines) and rx.match(lines[end + 1]):
        end += 1
    return (start, end)


def run_from(lines, rx, key, floor):
    """The contiguous run of rows whose number is >= floor. Used for the
    changelog, where sorting all 240 rows would bury a landing's real diff in
    other sessions' history."""
    hits = [n for n, l in enumerate(lines) if rx.match(l) and key(rx.match(l)) >= floor]
    if not hits:
        return None
    lo, hi = hits[0], hits[-1]
    if not all(rx.match(lines[n]) for n in range(lo, hi + 1)):
        return None
    return (lo, hi)


# ══ the checks ═══════════════════════════════════════════════════════════════
class Report:
    def __init__(self):
        self.faults = []   # structural: always exit 1
        self.writes = []   # a missing one of the four writes
        self.notes = []    # informational

    def fault(self, m):
        self.faults.append(m)

    def missing(self, m):
        self.writes.append(m)

    def note(self, m):
        self.notes.append(m)


DOCS = [("CHANGELOG.md", CHANGELOG, RE_CL),
        ("SHIPPED.md", SHIPPED, RE_SH),
        ("00_PLAN_AND_BACKLOG.md", BACKLOG, RE_BL),
        ("WHAT_TO_TEST.md", TESTBENCH, None)]


def structural(rep):
    """The union-merge damage, and anything else that makes a table stop being
    a table. Every one of these is cheap and exact."""
    for name, path, rx in DOCS:
        lines = read(path)

        # 1 · a conflict left in the file
        for n, l in enumerate(lines):
            if RE_MARK.match(l):
                rep.fault("%s:%d  conflict marker left in the file  %s"
                          % (name, n + 1, l.strip()[:40]))
                break

        if rx is None:
            continue

        # 2 · a SPLICED row: a row line that contains a SECOND row start.
        #     This is how #221 arrived inside #220 and it renders as one
        #     broken row rather than as two.
        for n, l in enumerate(lines):
            if not rx.match(l):
                continue
            body = l[1:]                      # skip the row's own leading '|'
            m = rx.search("|" + body[body.find("|") + 1:]) if "|" in body else None
            inner = [mm.start() for mm in re.finditer(r"\| (?:8f\.\d+[a-z]? \||\*\*#?\d+\*\* \|)", l)]
            if len(inner) > 1:
                rep.fault("%s:%d  TWO rows on one line (spliced): %s"
                          % (name, n + 1, l.strip()[:70]))

        # 3 · an orphaned fragment: a line that is not a row, not blank, and
        #     does not start with '|', sitting DIRECTLY UNDER a table row.
        #     That is the shape #220's orphaned text had.
        #
        # ⚠ "DIRECTLY UNDER" IS THE WHOLE PRECISION AND THE FIRST CUT LACKED
        # IT. Scanning the span between the first row and the last row instead
        # reported SHIPPED.md's two prose paragraphs BETWEEN its two tables,
        # which are separated from the rows by a blank line and are perfectly
        # correct. A row and its severed tail never have a blank line between
        # them, because they were one line a moment ago.
        for n in range(1, len(lines)):
            l = lines[n]
            if not l.strip() or l.lstrip().startswith("|") or rx.match(l):
                continue
            if rx.match(lines[n - 1]):
                rep.fault("%s:%d  orphaned fragment directly under a row: %s"
                          % (name, n + 1, l.strip()[:70]))

        # 4 · the same number twice in one table
        run = first_run(lines, rx)
        if run:
            lo, hi = run
            seen = {}
            for n in range(lo, hi + 1):
                k = rx.match(lines[n]).group(1)
                if k in seen:
                    same = lines[n] == lines[seen[k]]
                    rep.fault("%s  number %s appears twice (lines %d and %d), rows are %s"
                              % (name, k, seen[k] + 1, n + 1,
                                 "IDENTICAL" if same else "DIFFERENT"))
                else:
                    seen[k] = n


def four_writes(rep):
    """Every entry at or above the floor, against the contract in SHIPPED.md's
    own header."""
    cl = changelog_text()
    sh = "".join(read(SHIPPED))
    bl = "".join(read(BACKLOG))
    wt = "".join(read(TESTBENCH))

    entries = sorted(set(int(m) for m in RE_CL_ENTRY.findall(cl)))
    in_sh = set(int(m) for m in re.findall(r"^\| \*\*(\d+)\*\* \|", sh, re.M))
    in_bl = set(int(m) for m in re.findall(r"^\| \*\*#(\d+)\*\*", bl, re.M))
    in_wt = set(int(m) for m in re.findall(r"#(\d{2,3})\b", wt))

    below = [n for n in entries if n < ENTRY_FLOOR and n not in in_sh]
    if below:
        rep.note("%d entries below #%d have no registry row. Grandfathered by "
                 "the floor, not by a judgment that they are fine: %s"
                 % (len(below), ENTRY_FLOOR,
                    " ".join(str(n) for n in below)))

    for n in entries:
        if n < ENTRY_FLOOR:
            continue
        if n not in in_sh and n not in KNOWN_MISSING_SHIPPED:
            rep.missing("#%d has a changelog row and NO row in SHIPPED.md "
                        "(write 2 of 4)" % n)
        if n not in in_wt and n not in NO_TESTBENCH:
            rep.missing("#%d is named nowhere in WHAT_TO_TEST.md (write 4 of 4)" % n)
        if n not in in_bl:
            rep.note("#%d has no row in the backlog's shipped table. That is "
                     "only a fault if it belongs to the clarity pass." % n)

    # WRITE 3 OF 4: "strike it from the backlog". An entry with a registry row
    # that is still sitting in NEXT / LATER / PARKED / YOURS is work the plan
    # still thinks is waiting. Struck rows (`| ~~**NN**~~`) and rows already
    # carrying a tick are not counted, because that IS the strike.
    bl_lines = read(BACKLOG)
    sec = ''
    for l in bl_lines:
        if l.startswith('# '):
            sec = l
        m = re.match(r'^\| \*\*(\d+)\*\*', l)
        if not m:
            continue
        if not any(k in sec for k in ('NEXT', 'LATER', 'PARKED', 'YOURS')):
            continue
        n = int(m.group(1))
        if n in in_sh and n not in SHIPPED_AND_STILL_PENDING_OK and '✅' not in l:
            rep.note('#%d has a registry row and is STILL LISTED as pending in %s'
                     ' (write 3 of 4: strike it, or say why it is both)'
                     % (n, sec.lstrip('# ').strip()[:22]))

    stale = KNOWN_MISSING_SHIPPED & in_sh
    if stale:
        rep.note("KNOWN_MISSING_SHIPPED names %s, which now HAVE registry "
                 "rows. Delete them from the list in tools/record.py."
                 % " ".join("#%d" % n for n in sorted(stale)))


def claims(rep):
    """A number held by a claim and written nowhere is a DEAD SEAT.

    ⛔ AND A DEAD SEAT IS NOT INERT, WHICH IS THE WHOLE REASON THIS IS HERE.
    `claim.ps1`'s own #144 note: once a number is in the record the issuing
    floor is above it and the claim stops holding a seat - it holds a WORD, and
    the only thing it can still do is refuse somebody else's honest sentence.
    On 2026-08-21 that is exactly what happened: the backlog paragraph
    DESCRIBING nine stranded numbers was refused by the guard, because a guard
    cannot tell a citation from a spend.

    ⚠ The sweep in claim.ps1 already reads all four docs (`$ShipRecord`), so a
    claim whose number is recorded ANYWHERE clears itself. What it cannot do is
    clear a claim on the strength of a commit that has not landed yet - and the
    blocked commit is precisely the one that would record it. Hence: free it
    first, commit second.
    """
    if not os.path.isdir(CLAIMDIR):
        return
    blob = changelog_text() + "".join("".join(read(p))
                                      for p in (SHIPPED, BACKLOG, TESTBENCH))
    for f in sorted(os.listdir(CLAIMDIR)):
        m = re.match(r"^(entry|build)-(\d+)\.claim$", f)
        if not m:
            continue
        kind, num = m.group(1), m.group(2)
        needle = ("#%s" % num) if kind == "entry" else ("8f.%s" % num)
        if re.search(re.escape(needle) + r"\b", blob):
            continue
        by = ""
        try:
            body = open(os.path.join(CLAIMDIR, f), "rb").read().decode("utf-8")
            mm = re.search(r'"by"\s*:\s*"([^"]+)"', body)
            by = mm.group(1) if mm else ""
        except Exception:
            pass
        rep.note("claim %s holds %s and it is written in no doc. Write its row, "
                 "or if that session is finished:  powershell -NoProfile -File "
                 "tools\\claim.ps1 release %s -By %s"
                 % (f, needle, num, by or "<session>"))


def ordering(rep):
    lines = read(CHANGELOG)
    run = run_from(lines, RE_CL, lambda m: int(m.group(1)), 207)
    if run:
        lo, hi = run
        ids = [int(RE_CL.match(lines[n]).group(1)) for n in range(lo, hi + 1)]
        if ids != sorted(ids):
            rep.note("CHANGELOG.md build rows from 8f.207 are out of order "
                     "(union merge interleaves them). `fix` sorts them.")
    for name, path, rx in ((("SHIPPED.md"), SHIPPED, RE_SH),
                           ("00_PLAN_AND_BACKLOG.md", BACKLOG, RE_BL)):
        lines = read(path)
        run = first_run(lines, rx)
        if not run:
            continue
        lo, hi = run
        ids = [int(rx.match(lines[n]).group(1)) for n in range(lo, hi + 1)]
        if ids != sorted(ids, reverse=True):
            rep.note("%s rows are not newest-first. `fix` sorts them." % name)


# ══ fix ══════════════════════════════════════════════════════════════════════
def fix_conflicts(path, rx, name, log):
    """Resolve a conflict whose two sides are both entry rows: keep BOTH and
    order by number. Refuse anything else - that is a real disagreement and it
    wants a human."""
    lines = read(path)
    blocks, i = [], 0
    while i < len(lines):
        if lines[i].startswith("<<<<<<<"):
            s, m = i, None
            for j in range(i + 1, len(lines)):
                if lines[j].startswith("=======") and m is None:
                    m = j
                elif lines[j].startswith(">>>>>>>"):
                    blocks.append((s, m, j))
                    i = j
                    break
        i += 1
    if not blocks:
        return False

    out, prev, done = [], 0, 0
    for (s, m, e) in blocks:
        rows = [l for l in lines[s + 1:m] if l.strip()] + \
               [l for l in lines[m + 1:e] if l.strip()]
        if not rows or not all(rx.match(r) for r in rows):
            log.append("  %s: a conflict whose sides are NOT both entry rows. "
                       "Left for you." % name)
            return False
        rows.sort(key=lambda r: int(rx.match(r).group(1)), reverse=True)
        log.append("  %s: kept %s" % (name, ", ".join("#" + rx.match(r).group(1) for r in rows)))
        out.extend(lines[prev:s])
        out.extend(endnl(r) for r in rows)
        prev = e + 1
        done += 1
    out.extend(lines[prev:])
    write(path, out)
    return done > 0


def fix_dupes(path, rx, name, log):
    lines = read(path)
    run = first_run(lines, rx)
    if not run:
        return False
    lo, hi = run
    seen, kept, dropped = {}, [], 0
    for l in lines[lo:hi + 1]:
        k = rx.match(l).group(1)
        if k in seen:
            dropped += 1
            if seen[k] != l:
                # ⚠ NOT SILENT. An edit that supersedes a row ADDS text - #217
                # closing #215's remainder is the shape - so the longer row is
                # kept and the shorter is NAMED. If that is ever the wrong way
                # round, git has both.
                a, b = seen[k], l
                win = a if len(a) >= len(b) else b
                lose = b if win is a else a
                kept[kept.index(a)] = win
                seen[k] = win
                log.append("  %s: #%s had TWO DIFFERENT rows. Kept the longer "
                           "(%d chars), dropped %d chars: ...%s"
                           % (name, k, len(win), len(lose), lose.strip()[-90:]))
            else:
                log.append("  %s: #%s appeared twice, identical. Dropped one." % (name, k))
            continue
        seen[k] = l
        kept.append(l)
    if not dropped:
        return False
    lines[lo:hi + 1] = kept
    write(path, lines)
    return True


def fix_order(log):
    moved = 0
    lines = read(CHANGELOG)
    run = run_from(lines, RE_CL, lambda m: int(m.group(1)), 207)
    if run:
        lo, hi = run
        block = sorted(lines[lo:hi + 1],
                       key=lambda l: (int(RE_CL.match(l).group(1)), RE_CL.match(l).group(2)))
        n = sum(1 for a, b in zip(block, lines[lo:hi + 1]) if a != b)
        if n:
            lines[lo:hi + 1] = block
            write(CHANGELOG, lines)
            log.append("  CHANGELOG.md: %d row(s) sorted ascending from 8f.207" % n)
            moved += n
    for name, path, rx in (("SHIPPED.md", SHIPPED, RE_SH),
                           ("00_PLAN_AND_BACKLOG.md", BACKLOG, RE_BL)):
        lines = read(path)
        run = first_run(lines, rx)
        if not run:
            continue
        lo, hi = run
        block = sorted(lines[lo:hi + 1], key=lambda l: int(rx.match(l).group(1)), reverse=True)
        n = sum(1 for a, b in zip(block, lines[lo:hi + 1]) if a != b)
        if n:
            lines[lo:hi + 1] = block
            write(path, lines)
            log.append("  %s: %d row(s) sorted newest-first" % (name, n))
            moved += n
    return moved


# ══ the fifth write: a question lives in ONE file ════════════════════════════
QUESTIONS = os.path.join(ROOT, "docs", "OPEN_QUESTIONS.md")
ASKS = "\U0001f464"                       # the person glyph a row marks a ruling with


def questions(rep):
    """⛔ #248 - A RULING RAISED IN A ROW IS FILED WHERE NOBODY LOOKS.

    `.claude/rules/open-questions.md` is the rule; this is the counter under it.
    `ASKS` in a CHANGELOG or SHIPPED row means *this entry wants the user to
    decide something*, and it was used correctly in twenty entries over five
    months while **nothing ever collected them** - so the user had never seen
    them as a list, and ten had been silently answered by unrelated work by the
    time anybody did.

    ⛑ RAISE IT WHERE THE REASONING IS, FILE IT WHERE HE READS. The glyph stays;
    what this asks is whether the entry that wrote one also put a row in
    `OPEN_QUESTIONS.md`.

    ⚠ A NOTE AND NOT A FAULT, for `--faults-only`'s own reason: the writes
    finish at different times and a hook that refuses the commit on its way to
    being correct gets bypassed within a day.
    ⚠ AND IT LOOKS FOR `#NN` ANYWHERE IN THE FILE, not for a row shape. That
    file is prose with tables in it and its layout is the user's to change; a
    check that pins its FORMAT would break the first time he reorganised it."""
    if not os.path.exists(QUESTIONS):
        rep.note("docs/OPEN_QUESTIONS.md is missing, and it is the fifth write "
                 "(.claude/rules/open-questions.md)")
        return
    q = "".join(read(QUESTIONS))
    for name, path, rx in (("CHANGELOG.md", CHANGELOG, RE_CL),
                           ("SHIPPED.md", SHIPPED, RE_SH)):
        for line in read(path):
            if ASKS not in line:
                continue
            m = rx.match(line)
            if not m:
                continue
            n = entry_of(line, name)
            # ⛔ NO ENTRY_FLOOR HERE, AND THAT IS DELIBERATE. The floor exists
            # because entries below it predate the registry and their rows were
            # never going to be written. **These were.** #248 swept all twenty
            # marked rows into OPEN_QUESTIONS.md, from #90 up, so the legacy set
            # is filed and the check passes on it today - which is the only
            # thing that makes it a guard rather than a decoration.
            if n is None:
                continue
            if ("#%d" % n) not in q:
                rep.note("#%d marks a ruling with the person glyph in %s and has no row in "
                         "OPEN_QUESTIONS.md (the fifth write)" % (n, name))


def entry_of(line, name):
    """the ENTRY number a row is about, whichever table it is in."""
    m = re.search(r"\*\*#?(\d+)\*\*", line)
    if m:
        try:
            return int(m.group(1))
        except ValueError:
            return None
    m = re.search(r"#(\d+)", line)
    return int(m.group(1)) if m else None


# ══ the em dash, which is a rule the repo states ═════════════════════════════
def emdashes(rep):
    """⛔ #248 - A HARD RULE WITH NO COUNTER IS AN INTENTION.

    `NEVER use an em dash` is stated in the repo's standing rules, #199 swept the
    GAME for it, and the docs then carried 878 of them for four days because
    nothing ever asked. This is the ask. `tools/dev/emdash.py` owns the reading
    (and the two documented exclusions); this only reports it, so there is one
    implementation and not two - which is the defect this whole file exists to
    catch, arriving in the file itself if it were done any other way.

    ⚠ A NOTE AND NOT A FAULT. A dash in a doc breaks nothing, and `do_check`
    returns 1 only on structural faults; making it fatal would refuse the commit
    that is on its way to fixing it, which is the same argument `--faults-only`
    already makes about the four writes."""
    try:
        import subprocess
        r = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "dev", "emdash.py")],
                           capture_output=True, text=True, cwd=ROOT)
        tail = [l for l in r.stdout.splitlines() if l.startswith("total prose ")]
        if not tail:
            return
        n = int(tail[0].split()[2])
        if n:
            rep.note("%d em dashes in docs prose, against a standing rule of none. "
                     "`python tools/dev/emdash.py --fix` rewrites prose and never "
                     "touches a code block." % n)
    except Exception as e:                 # a missing tool is not a broken record
        rep.note("em dash check did not run: %s" % e)


# ══ main ═════════════════════════════════════════════════════════════════════
def do_check(strict, faults_only=False):
    rep = Report()
    structural(rep)
    # ⛔ --faults-only IS FOR THE PRE-COMMIT HOOK AND THE REASON IS NOT SPEED.
    # The four writes are finished at DIFFERENT TIMES: code and the changelog row
    # land in one commit and the registry row often in the next. A hook that
    # demanded all four would refuse the ordinary commit that is on its way to
    # making them, and a guard that refuses correct work gets bypassed within a
    # day - which is worse than not having it. Structural faults have no such
    # excuse: a spliced row or a duplicate is never a stage on the way to
    # anything.
    if not faults_only:
        four_writes(rep)
        claims(rep)
        ordering(rep)
        questions(rep)
        emdashes(rep)

    if rep.faults:
        print("")
        print("  STRUCTURAL FAULTS (%d) - a table is broken" % len(rep.faults))
        for m in rep.faults:
            print("    " + m)
    if rep.writes:
        print("")
        print("  MISSING WRITES (%d) - SHIPPED.md's header says four" % len(rep.writes))
        for m in rep.writes:
            print("    " + m)
    if rep.notes:
        print("")
        print("  NOTES (%d)" % len(rep.notes))
        for m in rep.notes:
            print("    " + m)
    if not (rep.faults or rep.writes or rep.notes):
        if faults_only:
            return 0                       # the hook says nothing when nothing is wrong
        print("  the record is clean: no conflict, no duplicate, no spliced row, "
              "four writes for every entry from #%d" % ENTRY_FLOOR)
    print("")
    if rep.faults:
        print("  run `python tools/record.py fix` for the mechanical ones.")
        return 1
    if strict and rep.writes:
        return 1
    return 0


def do_fix():
    log = []
    for name, path, rx in (("CHANGELOG.md", CHANGELOG, RE_CL),
                           ("SHIPPED.md", SHIPPED, RE_SH),
                           ("00_PLAN_AND_BACKLOG.md", BACKLOG, RE_BL)):
        fix_conflicts(path, rx, name, log)
        fix_dupes(path, rx, name, log)
    fix_order(log)
    if log:
        print("")
        print("  FIXED")
        for m in log:
            print(m)
    else:
        print("  nothing mechanical to fix")
    print("")
    return do_check(False)


# ══ prove ════════════════════════════════════════════════════════════════════
# ⛑ A CHECK THAT HAS ONLY EVER RETURNED CLEAN IS INDISTINGUISHABLE FROM ONE THAT
# IS BROKEN. This repo's own rule, and it earned its keep here inside an hour:
# the four-writes counter reported a spotless record on its first run because
# RE_CL_ENTRY was missing re.M and had matched nothing at all.
#
# Every fault is seeded into the REAL file and undone with `git checkout --`,
# which is exact because the docs are committed. Refuses to run on a dirty tree.
def do_prove():
    import subprocess

    def run():
        p = subprocess.run([sys.executable, os.path.join("tools", "record.py"), "check"],
                           cwd=ROOT, capture_output=True, text=True,
                           encoding="utf-8", errors="replace")
        return (p.stdout or "") + (p.stderr or "")

    rel = ["docs/CHANGELOG.md", "docs/SHIPPED.md", "docs/00_PLAN_AND_BACKLOG.md"]
    dirty = subprocess.run(["git", "-C", ROOT, "status", "--porcelain", "--"] + rel,
                           capture_output=True, text=True).stdout.strip()
    if dirty:
        print("  refusing to prove on a dirty tree: this seeds faults into the real")
        print("  files and undoes them with `git checkout --`. Commit or stash first:")
        print("   " + dirty.replace("\n", "\n   "))
        return 2

    def edit(r, fn):
        p = os.path.join(ROOT, r.replace("/", os.sep))
        L = fn(read(p))
        with open(p, "wb") as f:
            f.write("".join(L).encode("utf-8"))

    def restore(r):
        subprocess.run(["git", "-C", ROOT, "checkout", "--", r], capture_output=True)

    def idx(L, pat):
        return [n for n, l in enumerate(L) if re.match(pat, l)]

    CL_R, SH_R, BL_R = rel[0], rel[1], rel[2]

    def splice(L):
        i = idx(L, r"^\| 8f\.\d+[a-z]? \|")
        L[i[-2]] = L[i[-2]].rstrip("\r\n")[:40] + L[i[-1]]
        return L

    def orphan(L):
        i = idx(L, r"^\| 8f\.\d+[a-z]? \|")[-1]
        return L[:i + 1] + ["a tail that lost the row it belonged to\r\n"] + L[i + 1:]

    def dupe_same(L):
        i = idx(L, r"^\| \*\*\d+\*\* \|")[0]
        return L[:i] + [L[i]] + L[i:]

    def dupe_diff(L):
        i = idx(L, r"^\| \*\*\d+\*\* \|")[0]
        return L[:i] + [L[i].rstrip("\r\n") + " **Closed by something.** |\r\n"] + L[i:]

    def drop_row(L):
        i = idx(L, r"^\| \*\*\d+\*\* \|")[0]
        return L[:i] + L[i + 1:]

    def unsort(L):
        i = idx(L, r"^\| \*\*\d+\*\* \|")
        L[i[0]], L[i[3]] = L[i[3]], L[i[0]]
        return L

    cases = [
        ("conflict marker", BL_R,
         lambda L: L[:70] + ["<<<<<<< HEAD\r\n"] + L[70:], "conflict marker left in the file"),
        ("spliced row", CL_R, splice, "TWO rows on one line"),
        ("orphaned fragment", CL_R, orphan, "orphaned fragment directly under a row"),
        ("duplicate row, identical", SH_R, dupe_same, "appears twice"),
        ("duplicate row, different", SH_R, dupe_diff, "rows are DIFFERENT"),
        ("missing registry row", SH_R, drop_row, "NO row in SHIPPED.md"),
        ("rows out of order", SH_R, unsort, "SHIPPED.md rows are not newest-first"),
    ]

    ok = 0
    for name, r, mutate, expect in cases:
        edit(r, mutate)
        fired = expect in run()
        restore(r)
        quiet = expect not in run()
        good = fired and quiet
        ok += 1 if good else 0
        print("  %-26s fires=%-5s quiet again=%-5s  %s"
              % (name, fired, quiet, "ok" if good else "*** FAILED ***"))

    # the stranded-claim check needs a claim rather than a doc edit
    os.makedirs(CLAIMDIR, exist_ok=True)
    p = os.path.join(CLAIMDIR, "entry-999.claim")
    with open(p, "wb") as f:
        f.write(b'{"by":"prove","kind":"entry","title":"proving the check","number":999}')
    fired = "holds #999" in run()
    os.remove(p)
    quiet = "#999" not in run()
    good = fired and quiet
    ok += 1 if good else 0
    print("  %-26s fires=%-5s quiet again=%-5s  %s"
          % ("stranded claim", fired, quiet, "ok" if good else "*** FAILED ***"))

    total = len(cases) + 1
    print("")
    print("  %d of %d checks proved" % (ok, total))
    return 0 if ok == total else 1


if __name__ == "__main__":
    # ⛔ THE CONSOLE WILL NOT BE UTF-8 AND THIS TOOL PRINTS THE DOCS' OWN TEXT.
    # A finding quotes a heading, and every heading in this repo carries a mark
    # (⛔ ⚑ ⚠ ⏸ 🟡). On a default Windows console that is cp1251/cp866, and
    # `print` raises UnicodeEncodeError - so the tool DIES on exactly the finding
    # it was written to report, and dies hardest inside the pre-commit hook,
    # where the console is cp866 and there is nobody watching the traceback.
    # ⚠ Found by making the write-3 check fire: it produced a note naming the
    # PARKED section and took the whole process down with it.
    for _s in (sys.stdout, sys.stderr):
        try:
            _s.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

    verb = sys.argv[1] if len(sys.argv) > 1 else "check"
    strict = "--strict" in sys.argv
    if verb == "check":
        sys.exit(do_check(strict, "--faults-only" in sys.argv))
    if verb == "fix":
        sys.exit(do_fix())
    if verb == "prove":
        sys.exit(do_prove())
    print("usage: python tools/record.py check [--strict] | fix | prove")
    sys.exit(2)
