import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { Color, Mesh, type Material } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { hiddenGymEnvironmentNodeNames } from '../../../data/gymScene'
import { gymModelAssets } from '../../../data/gymModelAssets'
import type { GymModelAssetId, ModelScale, Vector3Tuple } from '../../../types/gymAsset'

interface GymModelProps {
  assetId: GymModelAssetId
  position?: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: ModelScale | undefined
  visible?: boolean | undefined
}

type ColorAwareMaterial = Material & {
  color?: Color
  emissive?: Color
  roughness?: number
  metalness?: number
}

function retintEnvironmentMaterial(material: ColorAwareMaterial) {
  if (!material.color) {
    return
  }

  const hsl = { h: 0, s: 0, l: 0 }
  material.color.getHSL(hsl)

  if (hsl.s < 0.18) {
    if (hsl.l > 0.72) {
      material.color.set('#3d3d3d')
    } else if (hsl.l > 0.42) {
      material.color.set('#242424')
    } else {
      material.color.set('#121212')
    }
  } else if (hsl.h > 0.07 && hsl.h < 0.18) {
    material.color.set('#725b2a')
  } else {
    material.color.offsetHSL(-0.01, -0.18, -0.1)
  }

  if (material.emissive) {
    material.emissive.set('#000000')
  }

  if (typeof material.roughness === 'number') {
    material.roughness = Math.min(1, material.roughness + 0.08)
  }

  if (typeof material.metalness === 'number') {
    material.metalness = Math.max(0, material.metalness - 0.04)
  }
}

function prepareClone(
  scene: GLTF['scene'],
  castShadow: boolean,
  receiveShadow: boolean,
  assetId: GymModelAssetId,
) {
  const instance = clone(scene)
  const hiddenEnvironmentNodes = new Set<string>(hiddenGymEnvironmentNodeNames)

  instance.traverse((object) => {
    if (!(object instanceof Mesh)) {
      return
    }

    object.castShadow = castShadow
    object.receiveShadow = receiveShadow

    if (assetId === 'gym-environment') {
      if (hiddenEnvironmentNodes.has(object.name)) {
        object.visible = false
        return
      }

      if (Array.isArray(object.material)) {
        object.material = object.material.map((material) => {
          const clonedMaterial = material.clone() as ColorAwareMaterial
          retintEnvironmentMaterial(clonedMaterial)
          return clonedMaterial
        })
      } else if (object.material) {
        const clonedMaterial = object.material.clone() as ColorAwareMaterial
        retintEnvironmentMaterial(clonedMaterial)
        object.material = clonedMaterial
      }
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
    () => prepareClone(gltf.scene, asset.castShadow, asset.receiveShadow, assetId),
    [asset.castShadow, asset.receiveShadow, assetId, gltf.scene],
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
