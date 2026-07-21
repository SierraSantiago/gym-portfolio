import { gymTheme } from '../../../config/gymTheme'
import { floorZones, gymRoom } from '../../../data/gymScene'

const zoneColors = {
  cardio: gymTheme.colors.floorCardio,
  strength: gymTheme.colors.floorStrength,
  functional: gymTheme.colors.floorFunctional,
  aisle: gymTheme.colors.floorAisle,
  future: gymTheme.colors.floorFuture,
} as const

export function GymFloor() {
  return (
    <group>
      <mesh position={[0, -gymRoom.floorThickness / 2, 0]} receiveShadow>
        <boxGeometry args={[gymRoom.width, gymRoom.floorThickness, gymRoom.depth]} />
        <meshStandardMaterial
          color={gymTheme.colors.floorBase}
          roughness={gymTheme.materials.floorBase.roughness}
          metalness={gymTheme.materials.floorBase.metalness}
        />
      </mesh>

      {floorZones.map((zone) => (
        <mesh key={zone.id} position={zone.position} receiveShadow>
          <boxGeometry args={zone.size} />
          <meshStandardMaterial
            color={zoneColors[zone.variant]}
            roughness={gymTheme.materials.floorZone.roughness}
            metalness={gymTheme.materials.floorZone.metalness}
          />
        </mesh>
      ))}
    </group>
  )
}
