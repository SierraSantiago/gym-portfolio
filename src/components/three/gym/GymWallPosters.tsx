import { useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'
import { gymTheme } from '../../../config/gymTheme'
import {
  gymPosterAssets,
  gymWallPosters,
  type GymPosterConfig,
} from '../../../data/gymPosters'

function GymWallPoster({ poster }: { poster: GymPosterConfig }) {
  const texture = useTexture(poster.imageUrl)

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
  }, [texture])

  return (
    <group position={poster.position} rotation={poster.rotation}>
      <mesh position={[0, 0, -0.032]} castShadow receiveShadow>
        <boxGeometry args={[poster.size[0] + 0.16, poster.size[1] + 0.16, 0.05]} />
        <meshStandardMaterial
          color={gymTheme.colors.posterFrame}
          roughness={0.72}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, 0, -0.003]} receiveShadow>
        <planeGeometry args={poster.size} />
        <meshStandardMaterial
          map={texture}
          roughness={0.86}
          metalness={0.02}
        />
      </mesh>
    </group>
  )
}

export function GymWallPosters() {
  return (
    <group>
      {gymWallPosters.map((poster) => (
        <GymWallPoster key={poster.id} poster={poster} />
      ))}
    </group>
  )
}

Object.values(gymPosterAssets).forEach((url: string) => {
  useTexture.preload(url)
})
