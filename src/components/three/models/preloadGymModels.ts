import { useGLTF } from '@react-three/drei'
import { gymModelAssets, preloadGymAssetIds } from '../../../data/gymModelAssets'

for (const assetId of preloadGymAssetIds) {
  useGLTF.preload(gymModelAssets[assetId].url)
}
