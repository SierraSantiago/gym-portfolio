import type { GymModelAssetId, ModelScale, Vector3Tuple } from './gymAsset'

export interface ProjectStationData {
  id: string
  title: string
  assetId: GymModelAssetId
  position: Vector3Tuple
  rotation: Vector3Tuple
  labelOffset: Vector3Tuple
  scale?: ModelScale
}
