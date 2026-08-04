# Claude brief: add the main-menu music

> ## ✅ EXECUTED 2026-08-02, build log 8f.96. This file is history now, not a task.
>
> Everything below shipped as written. **Two things went beyond it, both at the
> user's request in the same message** ("and also it could be after some cool
> event"), and they are the only places the running build differs from this
> page:
>
> 1. **`show()` passes the real screen id to `setMusicMode` now**, instead of
>    `i==='battle'?'battle':'world'`. The brief said to change only the audio
>    mapping inside `setMusicMode`, and that was impossible while its caller
>    was collapsing twelve screens into two before it ever saw them. No visual
>    screen routing changed and no game state routes audio, which is what the
>    rule was protecting. `AU.mode` was pinned back to its old two values.
> 2. **The theme also plays on the SURVIVING ending** (`toEpilogue`, END OF
>    SLICE) and carries unbroken into the menu behind it. Not on `toDefeat` -
>    same screen, different ending, told apart by `MUSWON` set on the line above
>    each `show('epilogue')`.
>
> The `ended`-handler gap needed one new field, `MUS.quietFade`, because the
> gap timer now restarts a cue two ways: a battle cue at full volume, the theme
> on a 1.5s ramp. See CHANGELOG 8f.96 for the full reasoning and the live
> verification.

The new approved cue is `audio/music/main_menu.wav` ("Road Beneath the Bloom").
Integrate it into `prototype/grimtoll_slice.html` only when explicitly asked.
This file is an implementation brief; the prototype has deliberately not been
edited as part of the music pass.

## Intent

- Play `main_menu.wav` only while the visible screen is `#menu`.
- Keep `world_road.wav` and `world_fen.wav` as the alternating programme for
  world, camp, prologue, and other non-battle gameplay screens.
- Keep the existing `battle.wav` / `boss.wav` routing unchanged.
- Do not layer this cue with any oscillator score, wind, fire, or another music
  element.
- Preserve the existing first-pointer autoplay unlock, mute button,
  `gt_mute` persistence, visibility pause/resume, and fade behavior.
- Load it as an external file. Do not base64-embed it.

## Minimal controller changes

1. Add one definition beside the current `MUSDEF` entries:

   ```js
   menu: {f:'main_menu', v:.30}
   ```

2. Give the controller a real `menu` mode. `setMusicMode(m)` currently maps
   every non-battle screen to `world`; change only that audio mapping so:

   ```text
   m === 'menu'                                      -> menu
   m === 'battle' and G.battleKind mother/armour     -> boss
   m === 'battle' and every other battle kind        -> battle
   every other screen                                -> world
   ```

   Do not change which visual screen `show()` displays and do not modify game
   state to route audio.

3. In `musEl()`'s `ended` handler, treat only `MUS.mode === 'world'` as the
   alternating world programme. When `menu` ends, wait about 3 seconds and
   replay it with a 1.5-second fade-in, or leave silence until the player enters
   the game. Do not call `musAdvanceWorld()` from menu mode.

4. `musEnter()` already supports named non-world cues through
   `musPlay(MUS.mode, 1.0)`. Once `menu` is a real mode and exists in `MUSDEF`,
   no special-case player should be added.

5. Keep the existing 1-second fade on screen changes. The WAV has a 3-second
   musical tail designed to tolerate either a fade to world music or silence.

## Verification

- Serve the project with `tools/serve.ps1`; confirm
  `../audio/music/main_menu.wav` returns HTTP 200 from the prototype.
- On the first pointer interaction at the main menu, the new cue starts once.
- Starting/continuing a run fades the menu cue out and starts the alternating
  world programme; the menu cue does not continue underneath it.
- Returning with the world-screen `MENU` button fades world music out and
  starts the menu cue from zero.
- Ordinary battle and boss music routing is unchanged.
- Muting pauses the menu cue; unmuting and tab visibility behavior match the
  other music cues.
- No extra `Audio` element is created on repeated menu visits: `musEl('menu')`
  must reuse the controller's cached element.
- Run the existing gameplay harness and confirm audio routing does not change
  save state, battle timing, or screen transitions.

## Source and mix notes

The reproducible source is `audio_review/generate_main_menu.py`. It renders a
97.2-second, 44.1 kHz, 16-bit stereo WAV at approximately -21 dBFS RMS with a
-2 dBFS peak ceiling. Its broad reference points are intimate felt piano,
patient modular repetition, and acoustic/electronic overlap; its melody and
harmony are original and written for Grimtoll's existing A-minor/D-Dorian
musical palette.
