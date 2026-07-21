import { gymTheme } from '../../../config/gymTheme'
import type { CeilingLightConfig } from '../../../data/gymScene'

interface CeilingLightFixtureProps {
  fixture: CeilingLightConfig
}

export function CeilingLightFixture({ fixture }: CeilingLightFixtureProps) {
  const [width, depth] = fixture.size

  return (
    <group position={fixture.position}>
      {[-width * 0.32, width * 0.32].map((offset) => (
        <mesh
          key={`${fixture.id}-${offset}`}
          position={[offset, fixture.drop * 0.5, 0]}
        >
          <cylinderGeometry args={[0.015, 0.015, fixture.drop, 10]} />
          <meshStandardMaterial
            color={gymTheme.colors.structure}
            roughness={0.4}
            metalness={0.48}
          />
        </mesh>
      ))}

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, 0.1, depth]} />
        <meshStandardMaterial
          color={gymTheme.colors.ceilingPanel}
          roughness={0.36}
          metalness={0.32}
        />
      </mesh>
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[width * 0.8, 0.025, depth * 0.44]} />
        <meshStandardMaterial
          color={gymTheme.colors.lightPanel}
          emissive={gymTheme.colors.lightGlow}
          emissiveIntensity={1.08}
          roughness={gymTheme.materials.lightPanel.roughness}
          metalness={gymTheme.materials.lightPanel.metalness}
        />
      </mesh>
      {fixture.intensity ? (
        <pointLight
          color={gymTheme.colors.lightPanel}
          intensity={fixture.intensity}
          position={[0, -0.38, 0]}
          distance={7.8}
          decay={2}
        />
      ) : null}
    </group>
  )
}
