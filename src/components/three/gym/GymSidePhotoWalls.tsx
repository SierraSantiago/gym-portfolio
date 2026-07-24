import { gymTheme } from '../../../config/gymTheme'
import { sidePhotoWallPanels } from '../../../data/gymScene'

export function GymSidePhotoWalls() {
  return (
    <group>
      {sidePhotoWallPanels.map((panel) => (
        <mesh
          key={panel.id}
          position={panel.position}
          rotation={panel.rotation ?? [0, 0, 0]}
          receiveShadow
        >
          <boxGeometry args={panel.size} />
          <meshStandardMaterial
            color={gymTheme.colors.photoWall}
            roughness={0.92}
            metalness={0.03}
          />
        </mesh>
      ))}
    </group>
  )
}
