import { gymTheme } from '../../../config/gymTheme'
import {
  frontFacadeFrameSegments,
  frontFacadeGlassPanels,
} from '../../../data/gymScene'

export function GymFrontFacade() {
  return (
    <group>
      {frontFacadeGlassPanels.map((panel) => (
        <mesh key={panel.id} position={panel.position} receiveShadow>
          <boxGeometry args={panel.size} />
          <meshStandardMaterial
            color={gymTheme.colors.frontGlass}
            emissive={gymTheme.colors.frontGlassGlow}
            emissiveIntensity={0.04}
            roughness={0.24}
            metalness={0.06}
            transparent
            opacity={0.16}
          />
        </mesh>
      ))}

      {frontFacadeFrameSegments.map((segment) => (
        <mesh
          key={segment.id}
          position={segment.position}
          receiveShadow
        >
          <boxGeometry args={segment.size} />
          <meshStandardMaterial
            color={gymTheme.colors.frontGlassFrame}
            roughness={0.42}
            metalness={0.28}
          />
        </mesh>
      ))}
    </group>
  )
}
