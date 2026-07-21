import { GymAmbientProps } from './GymAmbientProps'
import { GymCeiling } from './GymCeiling'
import { GymColumns } from './GymColumns'
import { GymFloor } from './GymFloor'
import { GymMirrors } from './GymMirrors'
import { GymSign } from './GymSign'
import { GymWalls } from './GymWalls'

export function GymRoom() {
  return (
    <group>
      <GymFloor />
      <GymWalls />
      <GymColumns />
      <GymCeiling />
      <GymMirrors />
      <GymAmbientProps />
      <GymSign />
    </group>
  )
}
