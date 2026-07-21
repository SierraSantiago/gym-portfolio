import { useMemo } from 'react'
import { CanvasTexture } from 'three'
import { useThree } from '@react-three/fiber'
import { gymTheme } from '../../../config/gymTheme'
import type { ProjectStationData } from '../../../types/project'
import { GymModel } from '../models/GymModel'

interface ProjectStationProps {
  station: ProjectStationData
}

function ProjectStationLabel({ title }: Pick<ProjectStationData, 'title'>) {
  const { size } = useThree()
  const isCompactViewport = size.width < 900
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 108

    const context = canvas.getContext('2d')
    if (context) {
      context.fillStyle = gymTheme.colors.labelBackground
      context.beginPath()
      context.roundRect(8, 8, 484, 92, 46)
      context.fill()

      context.strokeStyle = gymTheme.colors.labelBorder
      context.lineWidth = 2
      context.stroke()

      context.fillStyle = gymTheme.colors.marker
      context.beginPath()
      context.arc(42, 54, 8, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = gymTheme.colors.labelText
      context.font = '600 24px Aptos, Segoe UI, sans-serif'
      context.textBaseline = 'middle'
      context.fillText(title.toUpperCase(), 68, 54)
    }

    const labelTexture = new CanvasTexture(canvas)
    labelTexture.needsUpdate = true
    return labelTexture
  }, [title])
  const scale: [number, number, number] = isCompactViewport
    ? [1.32, 0.29, 1]
    : [1.62, 0.34, 1]

  return (
    <sprite scale={scale}>
      <spriteMaterial
        map={texture}
        toneMapped={false}
        transparent
        depthWrite={false}
        opacity={0.9}
      />
    </sprite>
  )
}

export function ProjectStation({ station }: ProjectStationProps) {
  return (
    <group
      position={station.position}
      rotation={station.rotation}
      scale={station.scale ?? 1}
    >
      <GymModel assetId={station.assetId} />

      <mesh position={[0, 0.92, 0.12]} castShadow receiveShadow>
        <cylinderGeometry args={[0.028, 0.028, 0.28, 14]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineDetail}
          roughness={gymTheme.materials.machineMetal.roughness}
          metalness={gymTheme.materials.machineMetal.metalness}
        />
      </mesh>

      <mesh position={[0, 1.12, 0.12]} castShadow receiveShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={gymTheme.colors.marker}
          emissive={gymTheme.colors.marker}
          emissiveIntensity={1.25}
          roughness={0.28}
          metalness={0.12}
        />
      </mesh>

      <group position={station.labelOffset}>
        <ProjectStationLabel title={station.title} />
      </group>
    </group>
  )
}
