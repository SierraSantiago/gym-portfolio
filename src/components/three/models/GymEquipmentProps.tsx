import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { Box3, Vector3, type Object3D } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { gymModelAssets } from '../../../data/gymModelAssets'
import type { GymEquipmentPlacement } from '../../../data/gymScene'

interface GymEquipmentPropsProps {
  placement: GymEquipmentPlacement
}

/**
 * GLTFLoader sanitizes node names for Three.js property paths. Depending on the
 * exporter/version, spaces and punctuation can become underscores. Comparing a
 * normalized form keeps placements stable without depending on that detail.
 */
function normalizeNodeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function findEquipmentNode(
  scene: GLTF['scene'],
  requestedName: GymEquipmentPlacement['nodeName'],
): Object3D | undefined {
  const exactMatch = scene.getObjectByName(requestedName)
  if (exactMatch) {
    return exactMatch
  }

  const normalizedRequestedName = normalizeNodeName(requestedName)
  let normalizedMatch: Object3D | undefined

  scene.traverse((object) => {
    if (!normalizedMatch && normalizeNodeName(object.name) === normalizedRequestedName) {
      normalizedMatch = object
    }
  })

  return normalizedMatch
}

function prepareEquipmentNode(scene: GLTF['scene'], nodeName: GymEquipmentPlacement['nodeName']) {
  const source = findEquipmentNode(scene, nodeName)

  if (!source) {
    const availableNames: string[] = []
    scene.traverse((object) => {
      if (object.name) {
        availableNames.push(object.name)
      }
    })

    throw new Error(
      `Node "${nodeName}" was not found in ${gymModelAssets['gym-equipment'].url}. ` +
        `Available nodes: ${availableNames.join(', ')}.`,
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
