import { useAnimations } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import {
  Box3,
  Group,
  LoopOnce,
  LoopRepeat,
  Vector3,
  type AnimationAction,
  type AnimationClip,
  type Material,
  type Mesh,
} from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { useReceptionStore } from '../../../state/useReceptionStore'

const receptionistAssets = {
  character: '/models/characters/receptionist/character.fbx',
  idle: '/models/characters/receptionist/idle.fbx',
  talking: '/models/characters/receptionist/talking.fbx',
  waving: '/models/characters/receptionist/waving.fbx',
  agreeing: '/models/characters/receptionist/agreeing.fbx',
} as const

const animationNames = {
  idle: 'Idle',
  talking: 'Talking',
  waving: 'Waving',
  agreeing: 'Agreeing',
} as const

type AnimationName = (typeof animationNames)[keyof typeof animationNames]
type RigNodeMap = Map<string, string>

function normalizeRigNodeName(name: string) {
  return name
    .toLowerCase()
    .replace(/^mixamorig\d*/, 'mixamorig')
    .replace(/[^a-z0-9]/g, '')
}

function createRigNodeMap(character: Group): RigNodeMap {
  const nodeMap: RigNodeMap = new Map()

  character.traverse((object) => {
    if (!object.name) return
    nodeMap.set(normalizeRigNodeName(object.name), object.name)
  })

  return nodeMap
}

function findTargetNodeName(sourceName: string, targetNodes: RigNodeMap) {
  const normalizedSource = normalizeRigNodeName(sourceName)
  const exactMatch = targetNodes.get(normalizedSource)
  if (exactMatch) return exactMatch

  for (const [normalizedTarget, targetName] of targetNodes) {
    if (
      normalizedSource.endsWith(normalizedTarget) ||
      normalizedTarget.endsWith(normalizedSource)
    ) {
      return targetName
    }
  }

  return undefined
}

function cloneAnimation(
  source: Group,
  name: AnimationName,
  targetNodes: RigNodeMap,
): AnimationClip {
  const sourceClip = source.animations[0]

  if (!sourceClip) {
    throw new Error(`The receptionist animation file for "${name}" has no animation clip.`)
  }

  const clip = sourceClip.clone()
  clip.name = name

  clip.tracks.forEach((track) => {
    const propertySeparator = track.name.lastIndexOf('.')
    if (propertySeparator < 0) return

    const sourceNodeName = track.name.slice(0, propertySeparator)
    const propertyPath = track.name.slice(propertySeparator)
    const targetNodeName = findTargetNodeName(sourceNodeName, targetNodes)

    if (targetNodeName) {
      track.name = `${targetNodeName}${propertyPath}`
    }
  })

  return clip
}

function prepareCharacter(source: Group) {
  const character = clone(source) as Group
  character.visible = false

  character.traverse((object) => {
    if ('isMesh' in object && object.isMesh) {
      const mesh = object as Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.frustumCulled = false

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((material) => material.clone())
      } else if (mesh.material) {
        mesh.material = (mesh.material as Material).clone()
      }
    }
  })

  character.updateMatrixWorld(true)

  const initialBounds = new Box3().setFromObject(character)
  const initialSize = initialBounds.getSize(new Vector3())
  const targetHeight = 1.72
  const scale = initialSize.y > 0 ? targetHeight / initialSize.y : 1

  character.scale.setScalar(scale)
  character.updateMatrixWorld(true)

  const scaledBounds = new Box3().setFromObject(character)
  const center = scaledBounds.getCenter(new Vector3())
  character.position.set(-center.x, -scaledBounds.min.y, -center.z)

  return character
}

export function ReceptionistCharacter() {
  const characterSource = useLoader(FBXLoader, receptionistAssets.character)
  const idleSource = useLoader(FBXLoader, receptionistAssets.idle)
  const talkingSource = useLoader(FBXLoader, receptionistAssets.talking)
  const wavingSource = useLoader(FBXLoader, receptionistAssets.waving)
  const agreeingSource = useLoader(FBXLoader, receptionistAssets.agreeing)

  const character = useMemo(() => prepareCharacter(characterSource), [characterSource])
  const rigNodeMap = useMemo(() => createRigNodeMap(character), [character])
  const clips = useMemo(
    () => [
      cloneAnimation(idleSource, animationNames.idle, rigNodeMap),
      cloneAnimation(talkingSource, animationNames.talking, rigNodeMap),
      cloneAnimation(wavingSource, animationNames.waving, rigNodeMap),
      cloneAnimation(agreeingSource, animationNames.agreeing, rigNodeMap),
    ],
    [agreeingSource, idleSource, rigNodeMap, talkingSource, wavingSource],
  )

  const previousNearRef = useRef(false)
  const activeAnimationRef = useRef<AnimationName | null>(null)
  const oneShotCleanupRef = useRef<(() => void) | null>(null)
  const { actions, mixer } = useAnimations(clips, character)

  const isNearReception = useReceptionStore((state) => state.isNearReception)
  const isDialogOpen = useReceptionStore((state) => state.isDialogOpen)
  const selectedTopic = useReceptionStore((state) => state.selectedTopic)
  const idleAction = actions[animationNames.idle]

  const stopOneShotListener = () => {
    oneShotCleanupRef.current?.()
    oneShotCleanupRef.current = null
  }

  const getAction = (name: AnimationName): AnimationAction | undefined =>
    actions[name] ?? undefined

  const fadeOutOtherActions = (activeAction: AnimationAction, duration: number) => {
    Object.values(actions).forEach((action) => {
      if (action && action !== activeAction) {
        action.fadeOut(duration)
      }
    })
  }

  const playLoop = (name: AnimationName) => {
    if (activeAnimationRef.current === name) return

    stopOneShotListener()
    const action = getAction(name)
    if (!action) return

    fadeOutOtherActions(action, 0.2)
    action
      .reset()
      .setLoop(LoopRepeat, Number.POSITIVE_INFINITY)
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.2)
      .play()
    activeAnimationRef.current = name
  }

  const playOnce = (name: AnimationName, onFinished: () => void) => {
    stopOneShotListener()
    const action = getAction(name)
    if (!action) {
      onFinished()
      return
    }

    fadeOutOtherActions(action, 0.16)
    action.reset().setLoop(LoopOnce, 1)
    action.clampWhenFinished = true
    action.setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.16).play()
    activeAnimationRef.current = name

    const handleFinished = (event: { action: AnimationAction }) => {
      if (event.action !== action) return
      stopOneShotListener()
      activeAnimationRef.current = null
      onFinished()
    }

    mixer.addEventListener('finished', handleFinished)
    oneShotCleanupRef.current = () => mixer.removeEventListener('finished', handleFinished)
  }

  useLayoutEffect(() => {
    if (!idleAction) return

    character.visible = false
    idleAction
      .reset()
      .setLoop(LoopRepeat, Number.POSITIVE_INFINITY)
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .play()
    activeAnimationRef.current = animationNames.idle

    mixer.update(1 / 60)
    character.updateMatrixWorld(true)
    character.visible = true

    return () => {
      stopOneShotListener()
      mixer.stopAllAction()
      activeAnimationRef.current = null
      character.visible = false
    }
  }, [character, idleAction, mixer])

  useEffect(() => {
    if (!idleAction) return

    if (isDialogOpen) {
      playLoop(animationNames.talking)
      return
    }

    if (!isNearReception) {
      playLoop(animationNames.idle)
    }
    // Animation helpers intentionally use the current action map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleAction, isDialogOpen, isNearReception])

  useEffect(() => {
    if (!idleAction) return

    const justApproached = isNearReception && !previousNearRef.current
    previousNearRef.current = isNearReception

    if (!justApproached || isDialogOpen) return

    playOnce(animationNames.waving, () => {
      const state = useReceptionStore.getState()
      playLoop(state.isDialogOpen ? animationNames.talking : animationNames.idle)
    })
    // Animation helpers intentionally use the current action map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleAction, isDialogOpen, isNearReception])

  useEffect(() => {
    if (!idleAction || selectedTopic !== 'tour') return

    playOnce(animationNames.agreeing, () => {
      const state = useReceptionStore.getState()
      playLoop(state.isDialogOpen ? animationNames.talking : animationNames.idle)
    })
    // Animation helpers intentionally use the current action map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleAction, selectedTopic])

  return (
    <group position={[0, 0.02, -0.82]}>
      <primitive object={character} dispose={null} />
    </group>
  )
}

Object.values(receptionistAssets).forEach((url) => {
  useLoader.preload(FBXLoader, url)
})
