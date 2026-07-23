import { GymModel } from '../models/GymModel'
import { GymDecoration } from './GymDecoration'
import { GymMirrors } from './GymMirrors'
import { GymSign } from './GymSign'
import { GymZoneSigns } from './GymZoneSigns'

export function GymRoom() {
  return (
    <group name="gym-room">
      <GymModel assetId="gym-environment" />
      <GymDecoration />
      <GymMirrors />
      <GymZoneSigns />
      <GymSign />
    </group>
  )
}
