/* which build am I talking to */
({hasNew: typeof ARMOUR_ABSORB!=='undefined' ? 'NEW '+ARMOUR_ABSORB : 'BASELINE',
  opening: GIVEN.opening, xp:+XP_PER_HP.toFixed(2), href:location.href.slice(-40)})
