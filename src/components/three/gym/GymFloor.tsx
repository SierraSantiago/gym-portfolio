import { gymTheme } from '../../../config/gymTheme'
import {
  floorEdgeStrips,
  floorTileLines,
  floorZones,
  gymRoom,
} from '../../../data/gymScene'
import type { Vector3Tuple } from '../../../types/gymAsset'

const zoneColors = {
  cardio: gymTheme.colors.floorCardio,
  strength: gymTheme.colors.floorStrength,
  functional: gymTheme.colors.floorFunctional,
  aisle: gymTheme.colors.floorAisle,
} as const

interface FloorLayerProps {
  color: string
  position: Vector3Tuple
  size: Vector3Tuple
  roughness: number
  metalness: number
}

function FloorLayer({
  color,
  position,
  size,
  roughness,
  metalness,
}: FloorLayerProps) {
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[size[0], size[2]]} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  )
}

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
        <FloorLayer
          key={zone.id}
          color={zoneColors[zone.variant]}
          position={zone.position}
          size={zone.size}
          roughness={gymTheme.materials.floorZone.roughness}
          metalness={gymTheme.materials.floorZone.metalness}
        />
      ))}

      {floorTileLines.map((line) => (
        <FloorLayer
          key={line.id}
          color={gymTheme.colors.floorSeam}
          position={line.position}
          size={line.size}
          roughness={0.96}
          metalness={0.03}
        />
      ))}

      {floorEdgeStrips.map((strip) => (
        <FloorLayer
          key={strip.id}
          color={gymTheme.colors.floorBorder}
          position={strip.position}
          size={strip.size}
          roughness={0.82}
          metalness={0.08}
        />
      ))}
    </group>
  )
}
