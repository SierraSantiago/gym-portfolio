import { useMemo } from 'react'
import { CanvasTexture } from 'three'
import { gymTheme } from '../../../config/gymTheme'
import type { ZoneSignConfig } from '../../../data/gymScene'

interface GymZoneSignProps {
  sign: ZoneSignConfig
}

export function GymZoneSign({ sign }: GymZoneSignProps) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 140

    const context = canvas.getContext('2d')
    if (context) {
      context.fillStyle = 'rgba(10, 14, 19, 0.78)'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      context.lineWidth = 2
      context.strokeRect(8, 8, canvas.width - 16, canvas.height - 16)

      context.fillStyle = 'rgba(255, 255, 255, 0.78)'
      context.font = '600 42px Aptos, Segoe UI, sans-serif'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(sign.title, canvas.width / 2, canvas.height / 2)
    }

    const signTexture = new CanvasTexture(canvas)
    signTexture.needsUpdate = true
    return signTexture
  }, [sign.title])

  return (
    <group position={sign.position} rotation={sign.rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[sign.size[0], sign.size[1], 0.06]} />
        <meshStandardMaterial
          color={gymTheme.colors.signFrame}
          roughness={0.46}
          metalness={0.28}
        />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[sign.size[0] * 0.92, sign.size[1] * 0.76]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}
