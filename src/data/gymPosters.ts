import type { Vector3Tuple } from '../types/gymAsset'

export interface GymPosterConfig {
  id: string
  imageUrl: string
  position: Vector3Tuple
  rotation: Vector3Tuple
  size: [number, number]
}

export const gymPosterAssets = {
  aunt: '/models/Posters/aunt.jpg',
  dog: '/models/Posters/Dog.jpg',
  dog2: '/models/Posters/Dog2.jpg',
  family: '/models/Posters/Family.jpg',
  portrait: '/models/Posters/I.jpg',
  uncle: '/models/Posters/Uncle.jpg',
  uni: '/models/Posters/Uni.jpg',
} as const

export const gymWallPosters: GymPosterConfig[] = [
  {
    id: 'aunt-left-wall-front',
    imageUrl: gymPosterAssets.aunt,
    position: [-9.55, 2.25, 3.15],
    rotation: [0, Math.PI / 2, 0],
    size: [1.04, 1.03],
  },
  {
    id: 'family-left-wall',
    imageUrl: gymPosterAssets.family,
    position: [-9.55, 2.3, 0.05],
    rotation: [0, Math.PI / 2, 0],
    size: [1.72, 1.06],
  },
  {
    id: 'uncle-left-wall-rear',
    imageUrl: gymPosterAssets.uncle,
    position: [-9.55, 2.28, -3.15],
    rotation: [0, Math.PI / 2, 0],
    size: [1.02, 1.36],
  },
  {
    id: 'dog2-right-wall-front',
    imageUrl: gymPosterAssets.dog2,
    position: [9.55, 2.28, 3.75],
    rotation: [0, -Math.PI / 2, 0],
    size: [0.98, 1.31],
  },
  {
    id: 'dog-right-wall-front',
    imageUrl: gymPosterAssets.dog,
    position: [9.55, 2.28, 1.1],
    rotation: [0, -Math.PI / 2, 0],
    size: [1.02, 1.36],
  },
  {
    id: 'uni-right-wall-center',
    imageUrl: gymPosterAssets.uni,
    position: [9.55, 2.32, -1.05],
    rotation: [0, -Math.PI / 2, 0],
    size: [0.92, 0.92],
  },
  {
    id: 'portrait-right-wall-rear',
    imageUrl: gymPosterAssets.portrait,
    position: [9.55, 2.28, -3.7],
    rotation: [0, -Math.PI / 2, 0],
    size: [1.02, 1.36],
  },
] as const
