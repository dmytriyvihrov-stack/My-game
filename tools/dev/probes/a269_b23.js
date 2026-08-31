/* #269 batches 2+3 */
({
  xpPerHp:+XP_PER_HP.toFixed(3), opening:GIVEN.opening,
  ashaTrait:PRESET_ASH.trait, halfhuman:TRAITS.halfhuman&&TRAITS.halfhuman.n,
  ashaRollable:traitPool('ratkin','cutter').indexOf('halfhuman'),
  twitchyShort:traitShort({trait:'twitchy',race:'ratkin'}),
  twitchyDesc:traitDesc({trait:'twitchy',race:'ratkin'}),
  pacifist:traitShort({trait:'pacifist',race:'human'}),
  frightening:traitShort({trait:'frightening',race:'human'}),
  nofear:traitDesc({trait:'nofear',race:'human'}),
  veteran:traitShort({trait:'veteran',race:'human'}),
  agiTop:rungText('agi',4), agiHeld:heldText('agi',4),
  strTop:rungText('str',4)
})
