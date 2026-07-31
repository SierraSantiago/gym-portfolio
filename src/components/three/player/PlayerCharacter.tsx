import { useAnimations } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import {
  Box3,
  Group,
  LoopRepeat,
  MathUtils,
  Vector3,
  type AnimationAction,
  type AnimationClip,
  type Material,
  type Mesh,
  type VectorKeyframeTrack,
} from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { entrySpawnPosition } from '../../../data/gymScene'
import { usePlayerStore } from '../../../state/usePlayerStore'
import { useProjectStore } from '../../../state/useProjectStore'
import { useReceptionStore } from '../../../state/useReceptionStore'

const playerAssets = {
  character: '/models/characters/player/character.fbx',
  idle: '/models/characters/player/idle.fbx',
  walking: '/models/characters/player/walking.fbx',
  running: '/models/characters/player/running.fbx',
} as const

const animationNames = {
  idle: 'Idle',
  walking: 'Walking',
  running: 'Running',
} as const

type AnimationName = (typeof animationNames)[keyof typeof animationNames]

interface ColliderBox {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

const PLAYER_RADIUS = 0.32
const WALK_SPEED = 2.65
const RUN_SPEED = 4.45
const GYM_BOUNDS = {
  minX: -9.35,
  maxX: 9.35,
  minZ: -6.42,
  maxZ: 6.48,
} as const

const colliders: ColliderBox[] = [
  // Reception desk.
  { minX: -2.05, maxX: 2.05, minZ: 3.68, maxZ: 4.82 },
  // Cardio machines, leaving the aisle open between the two treadmills.
  { minX: -8.55, maxX: -7.1, minZ: -0.45, maxZ: 1.7 },
  { minX: -5.95, maxX: -4.45, minZ: -0.45, maxZ: 1.7 },
  // Main project stations and the densest free-weight machines.
  { minX: -1.35, maxX: 2.2, minZ: -6.15, maxZ: -3.45 },
  { minX: 4.55, maxX: 7.75, minZ: -4.85, maxZ: -1.8 },
  { minX: -5.35, maxX: -3.55, minZ: -6.15, maxZ: -4.55 },
  { minX: 3.55, maxX: 5.35, minZ: -6.15, maxZ: -4.55 },
  // Side equipment and storage.
  { minX: -9.25, maxX: -8.55, minZ: -1.8, maxZ: 6.15 },
  { minX: 8.55, maxX: 9.25, minZ: -1.75, maxZ: 5.95 },
]

const movementCodes = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'ShiftLeft',
  'ShiftRight',
])

function cloneAnimation(source: Group, name: AnimationName, makeInPlace = false): AnimationClip {
  const sourceClip = source.animations[0]

  if (!sourceClip) {
    throw new Error(`The player animation file for "${name}" has no animation clip.`)
  }

  const clip = sourceClip.clone()
  clip.name = name

  if (makeInPlace) {
    clip.tracks.forEach((track) => {
      if (!track.name.endsWith('Hips.position')) {
        return
      }

      const positionTrack = track as VectorKeyframeTrack
      const values = positionTrack.values
      const baseX = values[0] ?? 0
      const baseZ = values[2] ?? 0

      for (let index = 0; index < values.length; index += 3) {
        values[index] = baseX
        values[index + 2] = baseZ
      }
    })
  }

  return clip
}

function prepareCharacter(source: Group) {
  const character = clone(source) as Group
  // Avoid displaying the bind/T-pose before the idle action is evaluated.
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
  const targetHeight = 1.76
  const scale = initialSize.y > 0 ? targetHeight / initialSize.y : 1

  character.scale.setScalar(scale)
  character.updateMatrixWorld(true)

  const scaledBounds = new Box3().setFromObject(character)
  const center = scaledBounds.getCenter(new Vector3())
  character.position.set(-center.x, -scaledBounds.min.y, -center.z)

  return character
}

function intersectsCollider(x: number, z: number, collider: ColliderBox) {
  return (
    x + PLAYER_RADIUS > collider.minX &&
    x - PLAYER_RADIUS < collider.maxX &&
    z + PLAYER_RADIUS > collider.minZ &&
    z - PLAYER_RADIUS < collider.maxZ
  )
}

function isBlocked(x: number, z: number) {
  if (
    x - PLAYER_RADIUS < GYM_BOUNDS.minX ||
    x + PLAYER_RADIUS > GYM_BOUNDS.maxX ||
    z - PLAYER_RADIUS < GYM_BOUNDS.minZ ||
    z + PLAYER_RADIUS > GYM_BOUNDS.maxZ
  ) {
    return true
  }

  return colliders.some((collider) => intersectsCollider(x, z, collider))
}

function moveWithCollisions(position: Vector3, displacement: Vector3) {
  const nextX = position.x + displacement.x
  if (!isBlocked(nextX, position.z)) {
    position.x = nextX
  }

  const nextZ = position.z + displacement.z
  if (!isBlocked(position.x, nextZ)) {
    position.z = nextZ
  }
}

export function PlayerCharacter() {
  const characterSource = useLoader(FBXLoader, playerAssets.character)
  const idleSource = useLoader(FBXLoader, playerAssets.idle)
  const walkingSource = useLoader(FBXLoader, playerAssets.walking)
  const runningSource = useLoader(FBXLoader, playerAssets.running)

  const character = useMemo(() => prepareCharacter(characterSource), [characterSource])
  const clips = useMemo(
    () => [
      cloneAnimation(idleSource, animationNames.idle),
      cloneAnimation(walkingSource, animationNames.walking, true),
      cloneAnimation(runningSource, animationNames.running, true),
    ],
    [idleSource, runningSource, walkingSource],
  )

  const rootRef = useRef<Group>(null)
  const keysRef = useRef(new Set<string>())
  const activeAnimationRef = useRef<AnimationName | null>(null)
  const movementDirection = useMemo(() => new Vector3(), [])
  const displacement = useMemo(() => new Vector3(), [])
  const forward = useMemo(() => new Vector3(), [])
  const right = useMemo(() => new Vector3(), [])
  const lastSyncedPosition = useMemo(() => new Vector3(...entrySpawnPosition), [])
  const lastSyncedRotationRef = useRef(Math.PI)
  // Bind the mixer directly to the cloned character, so actions exist before paint.
  const { actions, mixer } = useAnimations(clips, character)

  const isDialogOpen = useReceptionStore((state) => state.isDialogOpen)
  const isProjectOpen = useProjectStore((state) => state.isProjectOpen)

  const getAction = (name: AnimationName): AnimationAction | undefined =>
    actions[name] ?? undefined

  const playLoop = (name: AnimationName, fadeDuration = 0.16) => {
    if (activeAnimationRef.current === name) {
      return
    }

    const action = getAction(name)
    if (!action) {
      return
    }

    Object.values(actions).forEach((otherAction) => {
      if (otherAction && otherAction !== action) {
        otherAction.fadeOut(fadeDuration)
      }
    })

    action
      .reset()
      .setLoop(LoopRepeat, Number.POSITIVE_INFINITY)
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(fadeDuration)
      .play()

    activeAnimationRef.current = name
  }

  useLayoutEffect(() => {
    const root = rootRef.current
    if (root) {
      root.position.set(...entrySpawnPosition)
      root.rotation.y = Math.PI
    }

    const idleAction = getAction(animationNames.idle)
    if (idleAction) {
      idleAction
        .reset()
        .setLoop(LoopRepeat, Number.POSITIVE_INFINITY)
        .setEffectiveWeight(1)
        .play()
      activeAnimationRef.current = animationNames.idle
      // Evaluate the first keyframe before revealing the character.
      mixer.update(0.0001)
    }
    character.visible = true

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!movementCodes.has(event.code)) {
        return
      }
      event.preventDefault()
      keysRef.current.add(event.code)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!movementCodes.has(event.code)) {
        return
      }
      event.preventDefault()
      keysRef.current.delete(event.code)
    }

    const clearKeys = () => keysRef.current.clear()

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', clearKeys)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', clearKeys)
      mixer.stopAllAction()
      character.visible = false
    }
    // Actions are created for this exact character and clip collection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character, mixer])

  useFrame((_, delta) => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const keys = keysRef.current
    const playerState = usePlayerStore.getState()
    const forwardInput = MathUtils.clamp(
      (keys.has('KeyW') ? 1 : 0) - (keys.has('KeyS') ? 1 : 0) + playerState.touchMoveY,
      -1,
      1,
    )
    const rightInput = MathUtils.clamp(
      (keys.has('KeyD') ? 1 : 0) - (keys.has('KeyA') ? 1 : 0) + playerState.touchMoveX,
      -1,
      1,
    )
    const hasInput = !isDialogOpen && !isProjectOpen && (forwardInput !== 0 || rightInput !== 0)
    const touchMagnitude = Math.hypot(playerState.touchMoveX, playerState.touchMoveY)
    const isRunning =
      hasInput && (keys.has('ShiftLeft') || keys.has('ShiftRight') || touchMagnitude > 0.82)

    if (hasInput) {
      const { cameraYaw } = playerState
      forward.set(-Math.sin(cameraYaw), 0, -Math.cos(cameraYaw))
      right.set(Math.cos(cameraYaw), 0, -Math.sin(cameraYaw))
      movementDirection
        .copy(forward)
        .multiplyScalar(forwardInput)
        .addScaledVector(right, rightInput)
        .normalize()

      const speed = isRunning ? RUN_SPEED : WALK_SPEED
      displacement.copy(movementDirection).multiplyScalar(speed * Math.min(delta, 0.05))
      moveWithCollisions(root.position, displacement)

      const targetRotation = Math.atan2(movementDirection.x, movementDirection.z)
      root.rotation.y = MathUtils.damp(root.rotation.y, targetRotation, 12, delta)

      playLoop(isRunning ? animationNames.running : animationNames.walking)
    } else {
      playLoop(animationNames.idle)
    }

    const positionChanged =
      lastSyncedPosition.distanceToSquared(root.position) > 0.000001
    const rotationChanged = Math.abs(lastSyncedRotationRef.current - root.rotation.y) > 0.0005

    if (positionChanged || rotationChanged) {
      const positionTuple: [number, number, number] = [
        root.position.x,
        root.position.y,
        root.position.z,
      ]

      usePlayerStore.getState().setTransform(positionTuple, root.rotation.y)

      if (positionChanged) {
        useReceptionStore.getState().setPlayerPosition(positionTuple)
        lastSyncedPosition.copy(root.position)
      }

      lastSyncedRotationRef.current = root.rotation.y
    }
  })

  return (
    <group ref={rootRef} name="player-character">
      <primitive object={character} dispose={null} />
    </group>
  )
}

Object.values(playerAssets).forEach((url) => {
  useLoader.preload(FBXLoader, url)
})
