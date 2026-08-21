import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.path.join(HERE, "structure.json"), encoding="utf-8"))

GENRE = re.compile(r"\b(rogue-?li(?:ke|te)|tactical|turn-based|RPG|deckbuilder|autobattler|auto ?battler|strategy)\b", re.I)
def w(s): return len(re.findall(r"[A-Za-z0-9'’\-]+", s))

print("%-24s %5s %5s %5s %5s %5s  %6s %6s  %s" % ("game","shortW","bodyW","sect","bul","para","you/100","imper","genre-in-1st-sentence"))
for g in S:
    body = " ".join(t for _, t in g["blocks"])
    you = len(re.findall(r"\b(you|your|yours|yourself)\b", body, re.I))
    sd = g["short_description"] or ""
    first = re.split(r"(?<=[.!?])\s", sd)[0]
    imper = bool(re.match(r"^(Lead|Defend|Command|Become|Manage|Guide|Recruit|Inhabit|Live|Build|Craft|Explore|Fight|Take|Join|Play|Descend|Assemble|Survive)\b", sd))
    print("%-24s %5d %5d %5d %5d %5d  %6.1f %6s  %s" % (
        g["name"][:24], g["short_words"], g["detailed_words"], g["n_headings"], g["n_bullets"], g["n_paras"],
        100.0*you/max(1,g["detailed_words"]), imper, bool(GENRE.search(first))))

print()
print("FIRST BODY BLOCK, first 22 words:")
for g in S:
    b = g["blocks"][0][1] if g["blocks"] else ""
    # skip roadmap / language / discord furniture
    for k, t in g["blocks"]:
        if not re.match(r"^(Supported Languages|Join our Discord|About the Game|\d{4} ROADMAP|Please note|The demo)", t):
            b = t; break
    print(" %-22s | %s" % (g["name"][:22], " ".join(b.split()[:22])))

print()
print("SHORT DESCRIPTIONS, verbatim, for pattern reading:")
for g in S:
    print(" %-22s | %s" % (g["name"][:22], g["short_description"]))
