import { gymTheme } from '../../../config/gymTheme'
import { backMirrorPanels } from '../../../data/gymScene'

export function GymMirrors() {
  return (
    <group>
      {backMirrorPanels.map((panel) => (
        <group key={panel.id} position={panel.position}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[panel.size[0] + 0.16, panel.size[1] + 0.16, 0.08]} />
            <meshStandardMaterial
              color={gymTheme.colors.wallTrim}
              roughness={0.5}
              metalness={0.24}
            />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={panel.size} />
            <meshStandardMaterial
              color={gymTheme.colors.mirror}
              emissive={gymTheme.colors.mirrorTint}
              emissiveIntensity={0.18}
              roughness={gymTheme.materials.mirror.roughness}
              metalness={gymTheme.materials.mirror.metalness}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
