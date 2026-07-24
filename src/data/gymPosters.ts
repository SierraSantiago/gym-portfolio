import type { Vector3Tuple } from '../types/gymAsset'

export interface GymPosterConfig {
  id: string
  imageUrl: string
  position: Vector3Tuple
  rotation: Vector3Tuple
  size: [number, number]
}

export const gymPosterAssets = {
  dog: '/models/Posters/Dog.jpg',
  family: '/models/Posters/Family.jpg',
  portrait: '/models/Posters/I.jpg',
} as const

export const gymWallPosters: GymPosterConfig[] = [
  {
    id: 'family-left-wall',
    imageUrl: gymPosterAssets.family,
    position: [-9.55, 2.3, -0.15],
    rotation: [0, Math.PI / 2, 0],
    size: [1.72, 1.06],
  },
  {
    id: 'dog-right-wall-front',
    imageUrl: gymPosterAssets.dog,
    position: [9.55, 2.2, 2.3],
    rotation: [0, -Math.PI / 2, 0],
    size: [1.02, 1.36],
  },
  {
    id: 'portrait-right-wall-rear',
    imageUrl: gymPosterAssets.portrait,
    position: [9.55, 2.2, -2.15],
    rotation: [0, -Math.PI / 2, 0],
    size: [1.02, 1.36],
  },
] as const
