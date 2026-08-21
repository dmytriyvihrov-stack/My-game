import json, os, re, time, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.path.join(HERE, "structure.json"), encoding="utf-8"))
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Cookie": "birthtime=283993201; lastagecheckage=1-January-1980; wants_mature_content=1"}
for g in S:
    url = "https://store.steampowered.com/app/%d/?l=english" % g["appid"]
    try:
        req = urllib.request.Request(url, headers=UA)
        html = urllib.request.urlopen(req, timeout=45).read().decode("utf-8", "replace")
        m = re.search(r"InitAppTagModal\(\s*\d+\s*,\s*(\[.*?\])\s*,", html, re.S)
        tags = [t["name"] for t in json.loads(m.group(1))] if m else []
    except Exception as e:
        tags = ["ERR:" + str(e)[:60]]
    g["tags"] = tags[:20]
    print("%-24s %s" % (g["name"], ", ".join(g["tags"][:12])))
    time.sleep(1.2)
json.dump(S, open(os.path.join(HERE, "structure.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
