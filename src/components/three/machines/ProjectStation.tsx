import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group as ThreeGroup } from 'three'
import { gymTheme } from '../../../config/gymTheme'
import { useProjectStore } from '../../../state/useProjectStore'
import type { ProjectStationData } from '../../../types/project'

interface ProjectStationProps {
  station: ProjectStationData
}

export function ProjectStation({ station }: ProjectStationProps) {
  const isNearby = useProjectStore((state) => state.nearbyProjectId === station.id)
  const openProject = useProjectStore((state) => state.openProject)
  const markerRef = useRef<ThreeGroup>(null)
  const isPurpleStation = station.tone === 'social' || station.tone === 'portfolio'
  const markerColor = isPurpleStation ? gymTheme.colors.socialMarker : gymTheme.colors.marker
  const markerGlowColor = isPurpleStation
    ? gymTheme.colors.socialMarkerGlow
    : gymTheme.colors.markerGlow

  useFrame(({ clock }) => {
    if (!markerRef.current) return

    const pulseSeed = station.tourOrder ?? 0
    const pulse = 1 + Math.sin(clock.elapsedTime * 3.2 + pulseSeed) * 0.08
    const baseScale = isNearby ? 1.18 : 1.05
    markerRef.current.scale.setScalar(baseScale * pulse)
  })

  return (
    <group
      position={station.position}
      onClick={(event) => {
        event.stopPropagation()
        if (isNearby) {
          openProject(station.id)
        }
      }}
      onPointerOver={() => {
        document.body.style.cursor = isNearby ? 'pointer' : 'default'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
    >
      <group ref={markerRef}>
        <mesh>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial
            color={markerColor}
            emissive={markerColor}
            emissiveIntensity={isNearby ? 2.9 : 2.1}
            roughness={0.18}
            metalness={0.14}
            toneMapped={false}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.165, 20, 20]} />
          <meshBasicMaterial
            color={markerGlowColor}
            transparent
            opacity={isNearby ? 0.42 : 0.28}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  )
}
