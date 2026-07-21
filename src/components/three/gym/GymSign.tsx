import { useMemo } from 'react'
import { CanvasTexture } from 'three'
import { gymTheme } from '../../../config/gymTheme'
import { gymRoom } from '../../../data/gymScene'

export function GymSign() {
  const signTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1280
    canvas.height = 288

    const context = canvas.getContext('2d')
    if (context) {
      context.fillStyle = gymTheme.colors.signBackground
      context.fillRect(0, 0, canvas.width, canvas.height)

      const gradient = context.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, gymTheme.colors.marker)
      gradient.addColorStop(0.48, gymTheme.colors.lightPanel)
      gradient.addColorStop(1, gymTheme.colors.accentLight)

      context.strokeStyle = gymTheme.colors.signEdge
      context.lineWidth = 12
      context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

      context.fillStyle = gradient
      context.font = '700 100px Aptos, Segoe UI, sans-serif'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText('BUILD YOUR CAREER', canvas.width / 2, canvas.height / 2)
    }

    const texture = new CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  return (
    <group position={[0, 3.65, -gymRoom.depth / 2 + 0.2]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[6.8, 1.65, 0.16]} />
        <meshStandardMaterial
          color={gymTheme.colors.signFrame}
          roughness={0.36}
          metalness={0.38}
        />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[6.28, 1.28]} />
        <meshBasicMaterial map={signTexture} toneMapped={false} />
      </mesh>
    </group>
  )
}
