import { useMemo } from 'react'
import { CanvasTexture } from 'three'
import { useReceptionStore } from '../../../state/useReceptionStore'
import { gymTheme } from '../../../config/gymTheme'
import { ReceptionistCharacter } from './ReceptionistCharacter'

function ReceptionLabel() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 720
    canvas.height = 180

    const context = canvas.getContext('2d')
    if (context) {
      context.fillStyle = '#070707'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.strokeStyle = gymTheme.colors.marker
      context.lineWidth = 10
      context.strokeRect(8, 8, canvas.width - 16, canvas.height - 16)
      context.fillStyle = '#f3ead0'
      context.font = '700 72px Bahnschrift, Segoe UI, sans-serif'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText('RECEPTION', canvas.width / 2, canvas.height / 2)
    }

    const labelTexture = new CanvasTexture(canvas)
    labelTexture.needsUpdate = true
    return labelTexture
  }, [])

  return (
    <mesh position={[0, 0.58, 0.421]}>
      <planeGeometry args={[2.28, 0.57]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

export function ReceptionDesk() {
  const openDialog = useReceptionStore((state) => state.openDialog)
  const isNearReception = useReceptionStore((state) => state.isNearReception)

  return (
    <group
      name="reception-area"
      position={[0, 0, 4.25]}
      onClick={(event) => {
        event.stopPropagation()
        if (isNearReception) {
          openDialog()
        }
      }}
      onPointerOver={() => {
        document.body.style.cursor = isNearReception ? 'pointer' : 'default'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
    >
      <mesh position={[0, 0.01, -0.48]} receiveShadow>
        <boxGeometry args={[3.18, 0.02, 1.72]} />
        <meshStandardMaterial
          color={gymTheme.colors.receptionFloor}
          roughness={0.9}
          metalness={0.04}
        />
      </mesh>

      <mesh position={[0, 0.54, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 1.08, 0.82]} />
        <meshStandardMaterial
          color={gymTheme.colors.receptionDesk}
          roughness={0.72}
          metalness={0.08}
        />
      </mesh>

      <mesh position={[0, 1.11, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.64, 0.14, 0.98]} />
        <meshStandardMaterial
          color={gymTheme.colors.receptionDeskTop}
          roughness={0.42}
          metalness={0.12}
        />
      </mesh>

      <mesh position={[0, 0.92, 0.421]} castShadow>
        <boxGeometry args={[3.18, 0.065, 0.035]} />
        <meshStandardMaterial
          color={gymTheme.colors.marker}
          emissive={gymTheme.colors.marker}
          emissiveIntensity={0.34}
          roughness={0.32}
          metalness={0.36}
        />
      </mesh>

      <ReceptionLabel />
      <ReceptionistCharacter />

      <pointLight
        position={[0, 2.45, 0.2]}
        color={gymTheme.colors.accentLight}
        intensity={1.15}
        distance={4.2}
        decay={2}
      />
    </group>
  )
}
