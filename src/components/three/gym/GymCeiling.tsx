import { gymTheme } from '../../../config/gymTheme'
import { ceilingLightFixtures, gymRoom } from '../../../data/gymScene'
import type { Tuple3 } from '../../../types/project'
import { CeilingLightFixture } from './CeilingLightFixture'

const ceilingRails: Array<{ position: Tuple3; size: Tuple3 }> = [
  { position: [-6.6, gymRoom.wallHeight - 0.16, -0.15], size: [0.26, 0.22, 12.8] },
  { position: [0, gymRoom.wallHeight - 0.16, -0.15], size: [0.26, 0.22, 12.8] },
  { position: [6.6, gymRoom.wallHeight - 0.16, -0.15], size: [0.26, 0.22, 12.8] },
]

const ceilingCrossBeams: Array<{ position: Tuple3; size: Tuple3 }> = [
  { position: [0, gymRoom.wallHeight - 0.2, -4.6], size: [16.4, 0.16, 0.24] },
  { position: [0, gymRoom.wallHeight - 0.2, -1.75], size: [16.4, 0.16, 0.24] },
  { position: [0, gymRoom.wallHeight - 0.2, 1.15], size: [16.4, 0.16, 0.24] },
  { position: [0, gymRoom.wallHeight - 0.2, 4], size: [16.4, 0.16, 0.24] },
]

const ceilingPanels: Array<{ position: Tuple3; size: Tuple3 }> = [
  { position: [0, gymRoom.wallHeight - 0.08, -4.6], size: [16.1, 0.1, 1.16] },
  { position: [0, gymRoom.wallHeight - 0.08, 1.2], size: [16.1, 0.1, 1.16] },
]

export function GymCeiling() {
  return (
    <group>
      {ceilingPanels.map((panel) => (
        <mesh key={panel.position.join('-')} position={panel.position} receiveShadow>
          <boxGeometry args={panel.size} />
          <meshStandardMaterial
            color={gymTheme.colors.ceilingPanel}
            roughness={0.72}
            metalness={0.14}
          />
        </mesh>
      ))}

      {ceilingRails.map((rail) => (
        <mesh key={rail.position.join('-')} position={rail.position} castShadow receiveShadow>
          <boxGeometry args={rail.size} />
          <meshStandardMaterial
            color={gymTheme.colors.structure}
            roughness={gymTheme.materials.structure.roughness}
            metalness={gymTheme.materials.structure.metalness}
          />
        </mesh>
      ))}

      {ceilingCrossBeams.map((beam) => (
        <mesh key={beam.position.join('-')} position={beam.position} castShadow receiveShadow>
          <boxGeometry args={beam.size} />
          <meshStandardMaterial
            color={gymTheme.colors.structure}
            roughness={gymTheme.materials.structure.roughness}
            metalness={gymTheme.materials.structure.metalness}
          />
        </mesh>
      ))}

      {ceilingLightFixtures.map((fixture) => (
        <CeilingLightFixture key={fixture.id} fixture={fixture} />
      ))}
    </group>
  )
}
