import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { gymModelAssets } from '../../../data/gymModelAssets'
import type { GymModelAssetId, ModelScale, Vector3Tuple } from '../../../types/gymAsset'

interface GymModelProps {
  assetId: GymModelAssetId
  position?: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: ModelScale | undefined
  visible?: boolean | undefined
}

function prepareClone(scene: GLTF['scene'], castShadow: boolean, receiveShadow: boolean) {
  const instance = clone(scene)

  instance.traverse((object) => {
    if ('isMesh' in object && object.isMesh) {
      object.castShadow = castShadow
      object.receiveShadow = receiveShadow
    }
  })

  return instance
}

export function GymModel({
  assetId,
  position = [0, 0, 0],
  rotation,
  scale,
  visible = true,
}: GymModelProps) {
  const asset = gymModelAssets[assetId]
  const gltf = useGLTF(asset.url) as unknown as GLTF
  const instance = useMemo(
    () => prepareClone(gltf.scene, asset.castShadow, asset.receiveShadow),
    [asset.castShadow, asset.receiveShadow, gltf.scene],
  )

  return (
    <primitive
      object={instance}
      position={position}
      rotation={rotation ?? asset.defaultRotation}
      scale={scale ?? asset.defaultScale}
      visible={visible}
    />
  )
}
