import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { Box3, Vector3 } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { gymModelAssets } from '../../../data/gymModelAssets'
import type { GymEquipmentPlacement } from '../../../data/gymScene'

interface GymEquipmentPropsProps {
  placement: GymEquipmentPlacement
}

function prepareEquipmentNode(scene: GLTF['scene'], nodeName: GymEquipmentPlacement['nodeName']) {
  const source = scene.getObjectByName(nodeName)

  if (!source) {
    throw new Error(
      `Node "${nodeName}" was not found in ${gymModelAssets['gym-equipment'].url}.`,
    )
  }

  const instance = clone(source)
  const bounds = new Box3().setFromObject(instance)
  const center = bounds.getCenter(new Vector3())
  const min = bounds.min.clone()

  instance.position.set(-center.x, -min.y, -center.z)

  instance.traverse((object) => {
    if ('isMesh' in object && object.isMesh) {
      object.castShadow = true
      object.receiveShadow = true
    }
  })

  return instance
}

export function GymEquipmentProps({ placement }: GymEquipmentPropsProps) {
  const gltf = useGLTF(gymModelAssets['gym-equipment'].url) as unknown as GLTF
  const instance = useMemo(
    () => prepareEquipmentNode(gltf.scene, placement.nodeName),
    [gltf.scene, placement.nodeName],
  )

  return (
    <primitive
      object={instance}
      position={placement.position}
      rotation={placement.rotation}
      scale={placement.scale ?? gymModelAssets['gym-equipment'].defaultScale}
    />
  )
}
