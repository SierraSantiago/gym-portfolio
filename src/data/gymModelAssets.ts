import type { GymModelAsset, GymModelAssetId } from '../types/gymAsset'

export const gymModelAssets: Record<GymModelAssetId, GymModelAsset> = {
  treadmill: {
    id: 'treadmill',
    url: '/models/gym/treadmill.glb',
    defaultScale: 0.36,
    defaultRotation: [0, 0, 0],
    castShadow: true,
    receiveShadow: true,
  },
  'dumbbell-stand': {
    id: 'dumbbell-stand',
    url: '/models/gym/dumbbell-stand.glb',
    defaultScale: 0.39,
    defaultRotation: [0, 0, 0],
    castShadow: true,
    receiveShadow: true,
  },
  'leg-press': {
    id: 'leg-press',
    url: '/models/gym/leg-press.glb',
    defaultScale: 0.41,
    defaultRotation: [0, 0, 0],
    castShadow: true,
    receiveShadow: true,
  },
  'arc-bench': {
    id: 'arc-bench',
    url: '/models/gym/arc-bench.glb',
    defaultScale: 0.58,
    defaultRotation: [0, 0, 0],
    castShadow: true,
    receiveShadow: true,
  },
  'gym-equipment': {
    id: 'gym-equipment',
    url: '/models/gym/gym-equipment.glb',
    defaultScale: 0.29,
    defaultRotation: [0, 0, 0],
    castShadow: true,
    receiveShadow: true,
  },
  'gym-environment': {
    id: 'gym-environment',
    url: '/models/gym/gym-environment.glb',
    defaultScale: 1,
    defaultRotation: [0, 0, 0],
    castShadow: true,
    receiveShadow: true,
  },
}

export const preloadGymAssetIds: GymModelAssetId[] = [
  'treadmill',
  'dumbbell-stand',
  'leg-press',
  'arc-bench',
  'gym-equipment',
  'gym-environment',
]
