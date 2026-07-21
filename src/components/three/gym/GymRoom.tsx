import { GymColumns } from './GymColumns'
import { GymDecoration } from './GymDecoration'
import { GymFloor } from './GymFloor'
import { GymZoneSigns } from './GymZoneSigns'
import { HangingLights } from './HangingLights'
import { GymMirrors } from './GymMirrors'
import { GymSign } from './GymSign'
import { GymWallPanels } from './GymWallPanels'
import { GymWalls } from './GymWalls'

export function GymRoom() {
  return (
    <group>
      <GymFloor />
      <GymWalls />
      <GymWallPanels />
      <GymColumns />
      <HangingLights />
      <GymMirrors />
      <GymDecoration />
      <GymZoneSigns />
      <GymSign />
    </group>
  )
}
