import { ceilingLightFixtures } from '../../../data/gymScene'
import { CeilingLightFixture } from './CeilingLightFixture'

export function HangingLights() {
  return (
    <group>
      {ceilingLightFixtures.map((fixture) => (
        <CeilingLightFixture key={fixture.id} fixture={fixture} />
      ))}
    </group>
  )
}
