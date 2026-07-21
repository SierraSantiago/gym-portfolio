import { gymTheme } from '../../../config/gymTheme'
import { wallArchitecturalPanels, wallLedStrips } from '../../../data/gymScene'

const panelColors = {
  deep: gymTheme.colors.wallPanelDeep,
  mid: gymTheme.colors.wallPanelMid,
  trim: gymTheme.colors.wallTrim,
  warm: gymTheme.colors.wallPanelWarm,
} as const

export function GymWallPanels() {
  return (
    <group>
      {wallArchitecturalPanels.map((panel) => (
        <mesh
          key={panel.id}
          position={panel.position}
          rotation={panel.rotation ?? [0, 0, 0]}
          receiveShadow
        >
          <boxGeometry args={panel.size} />
          <meshStandardMaterial
            color={panelColors[panel.variant]}
            roughness={panel.variant === 'trim' ? 0.58 : 0.82}
            metalness={panel.variant === 'trim' ? 0.18 : 0.08}
          />
        </mesh>
      ))}

      {wallLedStrips.map((strip) => (
        <mesh
          key={strip.id}
          position={strip.position}
          rotation={strip.rotation ?? [0, 0, 0]}
        >
          <boxGeometry args={strip.size} />
          <meshStandardMaterial
            color={gymTheme.colors[strip.colorToken]}
            emissive={gymTheme.colors[strip.colorToken]}
            emissiveIntensity={strip.emissiveIntensity}
            roughness={0.26}
            metalness={0.12}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}
