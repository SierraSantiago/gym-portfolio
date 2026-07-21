import { gymTheme } from '../../../config/gymTheme'
import { backMirrorPanels } from '../../../data/gymScene'

export function GymMirrors() {
  return (
    <group>
      {backMirrorPanels.map((panel) => (
        <group key={panel.id} position={panel.position}>
          <mesh receiveShadow>
            <boxGeometry args={[panel.size[0] + 0.1, panel.size[1] + 0.1, 0.06]} />
            <meshStandardMaterial
              color={gymTheme.colors.wallPanelDeep}
              roughness={0.46}
              metalness={0.28}
            />
          </mesh>
          <mesh position={[0, 0, 0.024]}>
            <boxGeometry args={panel.size} />
            <meshStandardMaterial
              color={gymTheme.colors.mirror}
              emissive={gymTheme.colors.mirrorTint}
              emissiveIntensity={0.3}
              roughness={gymTheme.materials.mirror.roughness}
              metalness={gymTheme.materials.mirror.metalness}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh position={[-panel.size[0] * 0.16, 0.08, 0.034]}>
            <planeGeometry args={[panel.size[0] * 0.24, panel.size[1] * 0.72]} />
            <meshBasicMaterial
              color={gymTheme.colors.mirrorHighlight}
              transparent
              opacity={0.22}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
