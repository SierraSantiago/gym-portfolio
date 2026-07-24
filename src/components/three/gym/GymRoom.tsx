import { GymModel } from '../models/GymModel'
import { GymDecoration } from './GymDecoration'
import { GymFrontFacade } from './GymFrontFacade'
import { GymMirrors } from './GymMirrors'
import { GymSidePhotoWalls } from './GymSidePhotoWalls'
import { GymSign } from './GymSign'
import { GymWallPosters } from './GymWallPosters'
import { GymZoneSigns } from './GymZoneSigns'
import { HangingLights } from './HangingLights'

export function GymRoom() {
  return (
    <group name="gym-room">
      <GymModel assetId="gym-environment" />
      <GymDecoration />
      <GymFrontFacade />
      <HangingLights />
      <GymMirrors />
      <GymSidePhotoWalls />
      <GymWallPosters />
      <GymZoneSigns />
      <GymSign />
    </group>
  )
}
