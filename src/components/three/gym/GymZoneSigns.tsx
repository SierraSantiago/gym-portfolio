import { zoneSigns } from '../../../data/gymScene'
import { GymZoneSign } from './GymZoneSign'

export function GymZoneSigns() {
  return (
    <group>
      {zoneSigns.map((sign) => (
        <GymZoneSign key={sign.id} sign={sign} />
      ))}
    </group>
  )
}
