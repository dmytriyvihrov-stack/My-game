# ⛔ #235 - THIS NO LONGER TOUCHES THE PROTOTYPE. See art\inject.ps1 for the why.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File art\inject_j_pack.ps1
#
# ⚑ AND #209's REASON FOR A SECOND INJECTOR IS NOW STRUCTURAL RATHER THAN
# CAREFUL. That entry split the J pack off because "two desks that both run
# inject.ps1 produce the conflict nothing can resolve", so re-running one must
# never touch the other. The two blocks are two separate FILES now, so that is
# true by construction instead of by arrangement.
$ErrorActionPreference = 'Stop'
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'embed.ps1') j_pack
