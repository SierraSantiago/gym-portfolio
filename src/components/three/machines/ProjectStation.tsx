import type { JSX } from 'react'
import { useMemo } from 'react'
import { CanvasTexture } from 'three'
import { useThree } from '@react-three/fiber'
import { gymTheme } from '../../../config/gymTheme'
import type { ProjectStationData } from '../../../types/project'
import { CableMachine } from './CableMachine'
import { DumbbellRack } from './DumbbellRack'
import { TreadmillMachine } from './TreadmillMachine'

interface ProjectStationProps {
  station: ProjectStationData
}

function renderMachine(machineType: ProjectStationData['machineType']): JSX.Element {
  switch (machineType) {
    case 'treadmill':
      return <TreadmillMachine />
    case 'dumbbell-rack':
      return <DumbbellRack />
    case 'cable-machine':
      return <CableMachine />
  }
}

function ProjectStationLabel({ title }: Pick<ProjectStationData, 'title'>) {
  const { size } = useThree()
  const isCompactViewport = size.width < 900
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 640
    canvas.height = 136

    const context = canvas.getContext('2d')
    if (context) {
      context.fillStyle = gymTheme.colors.labelBackground
      context.beginPath()
      context.roundRect(8, 8, 624, 120, 64)
      context.fill()

      context.strokeStyle = gymTheme.colors.labelBorder
      context.lineWidth = 2
      context.stroke()

      context.fillStyle = gymTheme.colors.marker
      context.beginPath()
      context.arc(56, 68, 12, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = gymTheme.colors.labelText
      context.font = '600 30px Aptos, Segoe UI, sans-serif'
      context.textBaseline = 'middle'
      context.fillText(title.toUpperCase(), 88, 68)
    }

    const labelTexture = new CanvasTexture(canvas)
    labelTexture.needsUpdate = true
    return labelTexture
  }, [title])
  const scale: [number, number, number] = isCompactViewport
    ? [1.95, 0.42, 1]
    : [2.3, 0.5, 1]

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
      rotation={station.rotation ?? [0, 0, 0]}
      scale={station.scale ?? 1}
    >
      {renderMachine(station.machineType)}

      <mesh position={[0, 1.32, 0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.44, 16]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineDetail}
          roughness={gymTheme.materials.machineMetal.roughness}
          metalness={gymTheme.materials.machineMetal.metalness}
        />
      </mesh>

      <mesh position={[0, 1.6, 0.08]} castShadow receiveShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={gymTheme.colors.marker}
          emissive={gymTheme.colors.marker}
          emissiveIntensity={1.5}
          roughness={0.22}
          metalness={0.12}
        />
      </mesh>

      <group position={station.labelOffset ?? [0, 2.02, 0.78]}>
        <ProjectStationLabel title={station.title} />
      </group>
    </group>
  )
}
