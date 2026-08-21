# Fetch Steam store copy for the reference games and reduce it to a STRUCTURE dump.
# Raw JSON stays here in the scratchpad; only structure + short quotes go to the repo.
import json, os, re, time, urllib.request
from html.parser import HTMLParser

HERE = os.path.dirname(os.path.abspath(__file__))

GAMES = [
    ("Battle Brothers",        365360),
    ("The Last Spell",        1105670),
    ("Urtuk: The Desolation", 1181830),
    ("The Iron Oath",          699330),
    ("Our Adventurer Guild",  2026000),
    ("Shogun Showdown",       2084000),
    ("Path of Achra",         2128270),
    ("Mortal Glory 2",        2216660),
    ("The Dungeon Beneath",   1359120),
    ("Wartales",              1527950),
    ("Darkest Dungeon",        262060),
    ("The Banner Saga",        237990),
    ("Wildermyth",             763890),
    ("Slay the Spire",         646570),
    ("Caves of Qud",           333640),
]

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.loads(r.read().decode("utf-8", "replace"))

class Blocks(HTMLParser):
    """Flatten Steam's bbcode-ish HTML into ordered blocks: (kind, text)."""
    HEAD = {"h1", "h2", "h3", "h4", "h5"}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks, self.buf, self.kind = [], [], "p"
        self.imgs = self.vids = 0
        self.strong = 0
    def flush(self):
        t = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        if t:
            self.blocks.append((self.kind, t))
        self.buf, self.kind = [], "p"
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class", "")
        if tag == "img":
            self.imgs += 1
        elif tag == "video":
            self.vids += 1
        elif tag in ("br",):
            self.flush()
        elif tag in self.HEAD or "bb_h" in cls:
            self.flush(); self.kind = "h"
        elif tag == "li":
            self.flush(); self.kind = "li"
        elif tag in ("p", "div", "ul", "ol", "table", "tr"):
            self.flush()
        elif tag in ("b", "strong"):
            self.strong += 1
    def handle_endtag(self, tag):
        if tag in self.HEAD or tag in ("li", "p", "div", "ul", "ol", "tr"):
            self.flush()
    def handle_data(self, d):
        self.buf.append(d)

def words(s):
    return len(re.findall(r"[A-Za-z0-9'’\-]+", s))

out = []
for name, app in GAMES:
    d = get("https://store.steampowered.com/api/appdetails?appids=%d&l=english&cc=us" % app)
    d = d[str(app)]
    if not d.get("success"):
        print("FAIL", name); continue
    d = d["data"]
    with open(os.path.join(HERE, "raw_%d.json" % app), "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=1)
    try:
        rv = get("https://store.steampowered.com/appreviews/%d?json=1&num_per_page=0&language=all&purchase_type=all" % app)
        rv = rv.get("query_summary", {})
    except Exception as e:
        rv = {}
    p = Blocks(); p.feed(d.get("detailed_description", "") or ""); p.flush()
    about = Blocks(); about.feed(d.get("about_the_game", "") or ""); about.flush()
    rec = {
        "name": d.get("name"),
        "appid": app,
        "url": "https://store.steampowered.com/app/%d/" % app,
        "release": (d.get("release_date") or {}).get("date"),
        "price": (d.get("price_overview") or {}).get("final_formatted"),
        "genres": [g["description"] for g in d.get("genres", [])],
        "categories": [c["description"] for c in d.get("categories", [])][:8],
        "reviews_total": rv.get("total_reviews"),
        "reviews_positive": rv.get("total_positive"),
        "reviews_desc": rv.get("review_score_desc"),
        "short_description": d.get("short_description"),
        "short_words": words(d.get("short_description") or ""),
        "detailed_words": sum(words(t) for _, t in p.blocks),
        "n_headings": sum(1 for k, _ in p.blocks if k == "h"),
        "n_bullets": sum(1 for k, _ in p.blocks if k == "li"),
        "n_paras": sum(1 for k, _ in p.blocks if k == "p"),
        "n_imgs": p.imgs, "n_vids": p.vids,
        "blocks": [[k, t] for k, t in p.blocks],
        "about_blocks": [[k, t] for k, t in about.blocks],
    }
    out.append(rec)
    print("ok %-24s words=%4d h=%2d li=%3d img=%2d rev=%s" % (
        name, rec["detailed_words"], rec["n_headings"], rec["n_bullets"], rec["n_imgs"], rec["reviews_total"]))
    time.sleep(1.0)

with open(os.path.join(HERE, "structure.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print("wrote structure.json,", len(out), "games")
