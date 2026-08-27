# Retired skills: the perks taken out of the build on 2026-08-27

> **Why this file exists.** The user, clearing the old perk tree to make room for the
> skill tree in `tools/skilltree_lab.html`: *"Save to the file curent skills, that we are
> deleting from the main build. Maybe we will use some of them"*. Nothing here is dead by
> judgment: these are working, tested skills that the new tree has no slot for yet.
>
> **Every row below was generated from the build itself**, not retyped, so the wording is
> exactly what the perk said and the line numbers are where it was paid. They are the line
> numbers as of the commit that removed them, so use the text to find the site, not the number.
>
> ⚠ **The engine code that READ these keys was deliberately left in place.** `has(u,'bracewall')`
> and its family simply return false forever now, so nothing throws and nothing changed shape.
> That means restoring a skill is usually a one-line `PERKS` row plus a class tier, and the
> mechanic behind it is still standing. **Check the site still exists before promising that.**

**Kept in the build:** Everchanging Luck, Break Away, Shieldwork, Duellist.

**Retired: 25.**

## Braced Wall  `bracewall`

**What it did:** Your SPEAR WALL keeps working even when somebody is already inside your reach.

**Sat at:** Spear t4

**Paid by:**

```js
19847: if(has(u,'bracewall'))return true;
19860: return !has(u,'bracewall')&&
```

## Brawn  `brawn`

**What it did:** +10% melee damage.

**Sat at:** Brute t2

**Paid by:**

```js
21226: (has(a,'brawn')&&!act.range?.10:0)+(a.trait==='vegetarian'?-.10:0)+
```

## Bulwark  `bulwark`

**What it did:** +8 dodge on any turn you have not moved.

**Sat at:** Captain t6, Spear t2, Mage t4, Brute t8

**Paid by:**

```js
20866: if(has(u,'bulwark')&&!u.moved){d+=8;w&&w('bulwark, stood still',8);}
```

## Butcher  `butcher`

**What it did:** +17% damage against anything under half hitpoints.

**Sat at:** Archer t4, Cutter t2

**Paid by:**

```js
21227: ((a.trait==='thrice'||has(a,'butcher'))&&d.hp<d.hpMax*.5?.17:0)+
```

## Conduit  `conduit`

**What it did:** +20% spell damage.

**Sat at:** Mage t4, Mage t4

**Paid by:**

```js
15539: spellPow:D.spell({st:s})*(p.perks.indexOf('conduit')>=0?1.2:1),
```

## Dead Eye  `deadeye`

**What it did:** +6 to hit with any ranged attack.

**Sat at:** Archer t6, Cutter t6

**Paid by:**

```js
21093: if(has(a,'deadeye')&&act.range){other+=6;po('dead eye +6');}
```

## Eagle Eye  `eagle`

**What it did:** +2 range on every ranged attack.

**Sat at:** Archer t4

**Paid by:**

```js
15671: const R=p.perks.indexOf('eagle')>=0?2:0;
```

## Elemental Weapon  `elemental`

**What it did:** Your weapon comes to the field carrying FIRE, FROST or VENOM. Which one is rolled fresh for every battle, and every blow that lands delivers it.

**Sat at:** Mage t6

**Paid by:**

```js
16048: const elk=p.perks.indexOf('elemental')>=0?pickOne(Object.keys(ELEM)):null;
```

## Field Dressing  `fieldmedic`

**What it did:** +8 morale at the start of every turn.

**Sat at:** Mage t2

**Paid by:**

```js
22752: (tr(u,'mrec')||0)+(has(u,'fieldmedic')?8:0);
```

## Footwork  `footwork`

**What it did:** You never provoke a parting swing. Walking away is simply free.

**Sat at:** Spear t8, Archer t6, Mage t8, Mage t8, Cutter t6

**Paid by:**

```js
19818: const partingRisk=u=>(u.safeMove||has(u,'footwork'))?[]
```

## Ground-Wise  `groundwise`

**What it did:** No ground slows you: water, fire and mud all cost one hex to enter and take nothing off your stride. Anything the ground itself does to you takes half.

**Sat at:** Spear t8, Archer t8, Cutter t4

**Paid by:**

```js
19236: const wetproof=u=>!!(u&&(u.mut==='gills'||u.fenborn||has(u,'groundwise')));
19310: if(has(u,'groundwise'))n=Math.ceil(n/2);
```

## Heavy Hand  `heavyhand`

**What it did:** +12% damage against anything still wearing armour.

**Sat at:** Captain t8, Spear t8, Mage t8, Cutter t8, Brute t6

**Paid by:**

```js
21237: (has(a,'heavyhand')&&d.armour>0?.12:0)+
```

## Steadying  `inspire`

**What it did:** +4 morale to every ally within 2 hexes at the start of your turn.

**Sat at:** Captain t6, Mage t6, Mage t6, Brute t8

**Paid by:**

```js
22793: if(has(u,'inspire'))alive().filter(x=>x.side===u.side&&x!==u&&udist(u,x)<=2)
```

## Iron Jaw  `ironjaw`

**What it did:** +12 maximum morale.

**Sat at:** Captain t2, Spear t6, Archer t8, Mage t2, Mage t4, Brute t2

**Paid by:**

```js
15518: moraleMax:D.moral({st:s})+(p.perks.indexOf('ironjaw')>=0?12:0),
```

## Killing Zone  `killzone`

**What it did:** Your parting swings deal 100% damage instead of 50%.

**Sat at:** Spear t2, Archer t8, Cutter t8

**Paid by:**

```js
23589: strike(e,u,atk,has(e,'killzone')?1:.5);});
```

## Opportunist  `opportune`

**What it did:** +10 flanking bonus (per extra body on the target).

**Sat at:** Spear t4, Cutter t4

**Paid by:**

```js
15538: flankPow:D.flank({st:s})+(p.perks.indexOf('opportune')>=0?10:0),
```

## Quick Foot  `quickfoot`

**What it did:** +1 hex of movement.

**Sat at:** Archer t2, Mage t6, Cutter t2

**Paid by:**

```js
15598: if(p.perks.indexOf('quickfoot')>=0)u.speed+=1;
```

## Shadow-Step  `shadowstep`

**What it did:** After you DISTRACT something, your next attack on it this turn costs no action.

**Sat at:** Cutter t4

**Paid by:**

```js
24669: if(has(u,'shadowstep')){u.actions++;u.freeOn=tgt.id;}
```

## Stand Fast  `standfast`

**What it did:** Morale can never fall below 15%: you cannot rout.

**Sat at:** Captain t4, Brute t4

**Paid by:**

```js
15124: if(u.perks&&u.perks.indexOf('standfast')>=0)u.morale=Math.max(u.morale,max*.15);
```

## Stone Skin  `stoneskin`

**What it did:** +10 armour.

**Sat at:** Captain t8, Spear t6, Mage t6, Mage t8, Brute t6

**Paid by:**

```js
15517: (p.perks.indexOf('stoneskin')>=0?10:0),
```

## Sure Shot  `sureshot`

**What it did:** Shooting while engaged: −15 to hit instead of −35.

**Sat at:** Archer t2

**Paid by:**

```js
14734: if(dd<=1)return {k:'POINT',hit:has(a,'sureshot')?-20:-40,why:'point blank'};
21032: const p=has(a,'sureshot')?-15:walled?-18:-35;other+=p;
21033: po(walled&&!has(a,'sureshot')?'scrum, but screened '+p:'shooting in a scrum '+p);}
```

## Thick Hide  `thickhide`

**What it did:** +18 armour.

**Sat at:** Brute t4

**Paid by:**

```js
15516: armourMax:armourValue(p)+(p.perks.indexOf('thickhide')>=0?18:0)+
```

## Patient  `waiter`

**What it did:** End a turn with an action unspent and you start the next one with an extra action. One, never more.

**Sat at:** Captain t4, Spear t6, Archer t6, Brute t6

**Paid by:**

```js
23052: if(out&&!out.dead&&!out.fled&&!out.downed&&has(out,'waiter'))
```

## War-Leader  `warleader`

**What it did:** COMMAND also grants +6 dodge to everyone it reaches, for one round.

**Sat at:** Captain t4

**Paid by:**

```js
23744: .forEach(x=>{mor(x,24,'');if(has(u,'warleader'))x.rallyBuff=6;});
```

## Cold Hands  `windeater`

**What it did:** Casting costs you 5 less of your own mood.

**Sat at:** Mage t2, Mage t2

**Paid by:**

```js
20076: if(has(u,'windeater'))w-=5;
```

