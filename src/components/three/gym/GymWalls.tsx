import { gymTheme } from '../../../config/gymTheme'
import { gymRoom } from '../../../data/gymScene'
import type { Vector3Tuple } from '../../../types/gymAsset'

const wallSegments: Array<{ position: Vector3Tuple; size: Vector3Tuple }> = [
  {
    position: [0, gymRoom.wallHeight / 2, -gymRoom.depth / 2],
    size: [gymRoom.width, gymRoom.wallHeight, gymRoom.wallThickness],
  },
  {
    position: [-gymRoom.width / 2, gymRoom.wallHeight / 2, 0],
    size: [gymRoom.wallThickness, gymRoom.wallHeight, gymRoom.depth],
  },
  {
    position: [gymRoom.width / 2, gymRoom.wallHeight / 2, 0],
    size: [gymRoom.wallThickness, gymRoom.wallHeight, gymRoom.depth],
  },
]

const wallPanels: Array<{ position: Vector3Tuple; size: Vector3Tuple }> = [
  {
    position: [0, 1.25, -gymRoom.depth / 2 + 0.06],
    size: [gymRoom.width - 0.4, 2.25, 0.1],
  },
  {
    position: [-gymRoom.width / 2 + 0.06, 1.3, 0.1],
    size: [0.1, 2.2, gymRoom.depth - 0.8],
  },
  {
    position: [gymRoom.width / 2 - 0.06, 1.3, 0.1],
    size: [0.1, 2.2, gymRoom.depth - 0.8],
  },
]

const baseboards: Array<{ position: Vector3Tuple; size: Vector3Tuple }> = [
  {
    position: [0, 0.16, -gymRoom.depth / 2 + 0.08],
    size: [gymRoom.width - 0.36, 0.3, 0.14],
  },
  {
    position: [-gymRoom.width / 2 + 0.08, 0.16, 0],
    size: [0.14, 0.3, gymRoom.depth - 0.18],
  },
  {
    position: [gymRoom.width / 2 - 0.08, 0.16, 0],
    size: [0.14, 0.3, gymRoom.depth - 0.18],
  },
]

export function GymWalls() {
  return (
    <group>
      {wallSegments.map((wall) => (
        <mesh key={wall.position.join('-')} position={wall.position} castShadow receiveShadow>
          <boxGeometry args={wall.size} />
          <meshStandardMaterial
            color={gymTheme.colors.wall}
            roughness={gymTheme.materials.wall.roughness}
            metalness={gymTheme.materials.wall.metalness}
          />
        </mesh>
      ))}

      {wallPanels.map((panel) => (
        <mesh key={panel.position.join('-')} position={panel.position} receiveShadow>
          <boxGeometry args={panel.size} />
          <meshStandardMaterial
            color={gymTheme.colors.wallAccent}
            roughness={0.8}
            metalness={0.08}
          />
        </mesh>
      ))}

      {baseboards.map((trim) => (
        <mesh key={trim.position.join('-')} position={trim.position} castShadow receiveShadow>
          <boxGeometry args={trim.size} />
          <meshStandardMaterial
            color={gymTheme.colors.wallTrim}
            roughness={0.68}
            metalness={0.16}
          />
        </mesh>
      ))}
    </group>
  )
}
