# Re-taking the Steam reference measurements

These three scripts produce every number in [`../STEAM_COPY_REFERENCES.md`](../STEAM_COPY_REFERENCES.md).
Stdlib Python only, about a minute end to end, and they hit the public store endpoints.

```bash
python fetch.py     # appdetails + review totals for the 15 games -> raw_<appid>.json + structure.json
python tags.py      # scrapes the store page user tags into structure.json
python metrics.py   # prints the copy metrics table and the short descriptions
```

⚠ **`structure.json` and `raw_*.json` are other people's marketing copy.** They are a local working
cache: read them, quote fragments from them, do not commit them and do not paste a page whole into
anything we publish. The scripts are here so the cache can be rebuilt instead of stored.

The game list is the `GAMES` array at the top of `fetch.py`: the nine commercial comparables from
[`../PRICING_RESEARCH.md`](../PRICING_RESEARCH.md) plus the six design references from
[`../../docs/01_GAME_CONCEPT.md`](../../docs/01_GAME_CONCEPT.md). Add a row and re-run all three.
