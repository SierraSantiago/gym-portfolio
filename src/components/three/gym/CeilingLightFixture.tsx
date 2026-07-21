import { gymTheme } from '../../../config/gymTheme'
import type { CeilingLightConfig } from '../../../data/gymScene'

interface CeilingLightFixtureProps {
  fixture: CeilingLightConfig
}

export function CeilingLightFixture({ fixture }: CeilingLightFixtureProps) {
  const [width, depth] = fixture.size

  return (
    <group position={fixture.position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, 0.18, depth]} />
        <meshStandardMaterial
          color={gymTheme.colors.ceilingPanel}
          roughness={0.52}
          metalness={0.24}
        />
      </mesh>
      <mesh position={[0, -0.11, 0]}>
        <boxGeometry args={[width * 0.82, 0.04, depth * 0.56]} />
        <meshStandardMaterial
          color={gymTheme.colors.lightPanel}
          emissive={gymTheme.colors.lightGlow}
          emissiveIntensity={1.1}
          roughness={gymTheme.materials.lightPanel.roughness}
          metalness={gymTheme.materials.lightPanel.metalness}
        />
      </mesh>
      <pointLight
        color={gymTheme.colors.lightPanel}
        intensity={fixture.intensity}
        position={[0, -0.48, 0]}
        distance={10}
        decay={2}
      />
    </group>
  )
}
