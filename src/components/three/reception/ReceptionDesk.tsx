import { useMemo } from 'react'
import { CanvasTexture } from 'three'
import { useReceptionStore } from '../../../state/useReceptionStore'
import { gymTheme } from '../../../config/gymTheme'

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

function LowPolyReceptionist() {
  return (
    <group position={[0, 0, -0.48]}>
      <mesh position={[0, 1.8, 0]} castShadow>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#c98761" roughness={0.82} />
      </mesh>

      <mesh position={[0, 2.02, -0.04]} castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="#19120f" roughness={0.9} />
      </mesh>

      <mesh position={[0, 2.24, -0.08]} castShadow>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color="#19120f" roughness={0.9} />
      </mesh>

      <mesh position={[0, 1.23, 0]} castShadow>
        <coneGeometry args={[0.38, 0.76, 6]} />
        <meshStandardMaterial
          color="#171717"
          roughness={0.78}
          metalness={0.04}
        />
      </mesh>

      <mesh position={[0, 1.42, 0.31]} castShadow>
        <boxGeometry args={[0.26, 0.12, 0.04]} />
        <meshStandardMaterial
          color={gymTheme.colors.marker}
          emissive={gymTheme.colors.marker}
          emissiveIntensity={0.24}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[-0.43, 1.34, 0]} rotation={[0, 0, -0.32]} castShadow>
        <cylinderGeometry args={[0.075, 0.09, 0.66, 7]} />
        <meshStandardMaterial color="#c98761" roughness={0.82} />
      </mesh>
      <mesh position={[0.43, 1.34, 0]} rotation={[0, 0, 0.32]} castShadow>
        <cylinderGeometry args={[0.075, 0.09, 0.66, 7]} />
        <meshStandardMaterial color="#c98761" roughness={0.82} />
      </mesh>

      <mesh position={[-0.17, 0.67, 0]} castShadow>
        <cylinderGeometry args={[0.105, 0.12, 0.74, 7]} />
        <meshStandardMaterial color="#111111" roughness={0.85} />
      </mesh>
      <mesh position={[0.17, 0.67, 0]} castShadow>
        <cylinderGeometry args={[0.105, 0.12, 0.74, 7]} />
        <meshStandardMaterial color="#111111" roughness={0.85} />
      </mesh>
    </group>
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
      <mesh position={[0, 0.54, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 1.08, 0.82]} />
        <meshStandardMaterial color="#0b0b0b" roughness={0.76} metalness={0.14} />
      </mesh>

      <mesh position={[0, 1.11, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.64, 0.14, 0.98]} />
        <meshStandardMaterial
          color="#232323"
          roughness={0.5}
          metalness={0.32}
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
      <LowPolyReceptionist />

      <mesh position={[0, 2.64, -0.46]}>
        <torusGeometry args={[0.18, 0.035, 8, 24]} />
        <meshStandardMaterial
          color={gymTheme.colors.marker}
          emissive={gymTheme.colors.marker}
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

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
