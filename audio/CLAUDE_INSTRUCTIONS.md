# Claude integration brief: approved audio

The user approved this audio pack. Integrate it into
`prototype/grimtoll_slice.html` only when explicitly asked to perform the
integration. Until then, do not edit the prototype.

## Non-negotiable intent

- Replace the current synthesized background score; do not layer these files
  over `startMusic()`, `windLayer()`, or the oscillator drone.
- Remove the continuous white-noise wind. Disable the synthesized fire loop as
  well until a separate fire recording is approved.
- Use the supplied one-shot files for sound effects instead of the noisy
  `thud()`/square-wave versions wherever there is an approved mapping.
- Keep the existing `♪ ON/OFF` button and `gt_mute` persistence working.
- Do not base64-embed the WAV files into the HTML. Load them as external files.

## Paths from the prototype

`prototype/grimtoll_slice.html` should load:

```text
../audio/music/world_road.wav
../audio/music/world_fen.wav
../audio/music/battle.wav
../audio/music/boss.wav
../audio/sfx/click.wav
../audio/sfx/hit.wav
../audio/sfx/armour.wav
../audio/sfx/miss.wav
../audio/sfx/coin.wav
../audio/sfx/promote.wav
../audio/sfx/magic.wav
```

## Music behaviour

Build one small music controller around `HTMLAudioElement`s. Do not set
`element.loop = true`.

1. On world/menu/camp screens, alternate `world_road.wav` and
   `world_fen.wav`. Play both before repeating either. Fade between them over
   roughly 2.5 seconds so the combined world programme lasts about 3:12 before
   any track repeats.
2. Use `battle.wav` for ordinary encounters.
3. Use `boss.wav` when `G.battleKind` is `mother` or `armour`.
4. Battle tracks should start at zero and normally play once. If an encounter
   outlives the track, allow a few seconds of quiet rather than immediately
   producing an obvious hard loop.
5. Fade music out over 0.8–1.2 seconds when changing screen/mode. Do not allow
   two modes to continue playing underneath each other.
6. Suggested starting volumes: world `0.28`, battle `0.34`, boss `0.38`.
   Treat these as mix values, not UI percentages.
7. Start/resume audio only after the existing first pointer interaction so
   browser autoplay rules remain satisfied.
8. Pause while `document.hidden`; resume the active cue when visible again.

The current `show()` only distinguishes `battle` and `world`. Extend its audio
routing so a battle can select `boss` from `G.battleKind`. Do not change visual
screen routing to accomplish this.

## SFX mapping

Use a tiny pool of 3–4 `Audio` instances per short effect so rapid actions can
overlap without cutting each other off.

```text
click                                      -> sfx/click.wav
hit, hit_human, taken                      -> sfx/hit.wav
hit_ratkin                                 -> sfx/hit.wav at playbackRate ~1.12
hit_ogre, hit_beast, death, shove, hurl    -> sfx/hit.wav at playbackRate ~0.82
armour, armour_taken, hook                 -> sfx/armour.wav
miss, dodge                                -> sfx/miss.wav
coin                                       -> sfx/coin.wav
promote, rung_up                           -> sfx/promote.wav
cast, grasp, sink, venom                   -> sfx/magic.wav at a restrained volume
```

The hit and miss files are deliberately only 0.16 s and 0.11 s. Do not add a
long reverb tail, delay, or release envelope to them. For any unmapped legacy
sound, prefer silence temporarily over falling back to broadband `thud()`
noise or harsh square/saw oscillators.

Suggested SFX gain range is `0.45–0.70`; armour and magic should sit lower than
hit because their files have longer tails. Clamp simultaneous SFX voices to
avoid a loud pile-up during AUTO battles.

## Verification checklist

- Serve through `tools/serve.ps1`; verify every audio URL returns 200.
- The first click starts audio, and reloading preserves mute state.
- World tracks alternate instead of restarting the same track.
- `clash` uses normal battle music.
- `mother` and `armour` use boss music.
- Leaving battle stops its track; no hidden battle track continues on the map.
- AUTO combat does not clip or create an unbounded number of audio elements.
- Hit and miss remain short one-shots.
- No continuous white-noise wind or synthesized fire hiss remains audible.
- Run the existing gameplay harness after integration to ensure audio routing
  did not alter battle state or timing.

For this prototype, ship the WAV files as supplied. If download size later
becomes important, make compressed derivatives in a separate pass and compare
them against these approved masters before replacing any path.
