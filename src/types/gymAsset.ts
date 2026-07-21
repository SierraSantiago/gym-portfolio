export type GymModelAssetId =
  | 'treadmill'
  | 'dumbbell-stand'
  | 'leg-press'
  | 'arc-bench'
  | 'gym-equipment'

export type Vector3Tuple = [number, number, number]

export type ModelScale = number | Vector3Tuple

export interface GymModelAsset {
  id: GymModelAssetId
  url: string
  defaultScale: ModelScale
  defaultRotation: Vector3Tuple
  castShadow: boolean
  receiveShadow: boolean
}
