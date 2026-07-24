import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { MathUtils, PerspectiveCamera, Vector3 } from 'three'
import { usePlayerStore } from '../../state/usePlayerStore'
import { useReceptionStore } from '../../state/useReceptionStore'

const MIN_PITCH = 0.16
const MAX_PITCH = 0.78
const MIN_DISTANCE = 3.6
const MAX_DISTANCE = 7.5

export function SceneCamera() {
  const { camera, gl } = useThree()
  const isDraggingRef = useRef(false)
  const previousPointerRef = useRef({ x: 0, y: 0 })
  const initializedRef = useRef(false)
  const desiredPosition = useMemo(() => new Vector3(), [])
  const desiredTarget = useMemo(() => new Vector3(), [])
  const smoothedPosition = useMemo(() => new Vector3(), [])
  const smoothedTarget = useMemo(() => new Vector3(), [])
  const isDialogOpen = useReceptionStore((state) => state.isDialogOpen)

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) {
      return
    }

    camera.fov = 46
    camera.near = 0.08
    camera.far = 100
    camera.updateProjectionMatrix()
  }, [camera])

  useEffect(() => {
    const canvas = gl.domElement

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || isDialogOpen) {
        return
      }

      isDraggingRef.current = true
      previousPointerRef.current = { x: event.clientX, y: event.clientY }
      canvas.setPointerCapture(event.pointerId)
      canvas.style.cursor = 'grabbing'
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current || isDialogOpen) {
        return
      }

      const deltaX = event.clientX - previousPointerRef.current.x
      const deltaY = event.clientY - previousPointerRef.current.y
      previousPointerRef.current = { x: event.clientX, y: event.clientY }

      const state = usePlayerStore.getState()
      state.setCameraOrbit(
        state.cameraYaw - deltaX * 0.006,
        MathUtils.clamp(state.cameraPitch + deltaY * 0.0045, MIN_PITCH, MAX_PITCH),
      )
    }

    const stopDragging = (event: PointerEvent) => {
      if (!isDraggingRef.current) {
        return
      }

      isDraggingRef.current = false
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
      canvas.style.cursor = 'grab'
    }

    const handleWheel = (event: WheelEvent) => {
      if (isDialogOpen) {
        return
      }

      event.preventDefault()
      const state = usePlayerStore.getState()
      state.setCameraDistance(
        MathUtils.clamp(
          state.cameraDistance + Math.sign(event.deltaY) * 0.45,
          MIN_DISTANCE,
          MAX_DISTANCE,
        ),
      )
    }

    canvas.style.cursor = isDialogOpen ? 'default' : 'grab'
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', stopDragging)
    canvas.addEventListener('pointercancel', stopDragging)
    canvas.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      canvas.style.cursor = 'default'
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', stopDragging)
      canvas.removeEventListener('pointercancel', stopDragging)
      canvas.removeEventListener('wheel', handleWheel)
    }
  }, [gl, isDialogOpen])

  useFrame((_, delta) => {
    const state = usePlayerStore.getState()
    const [playerX, playerY, playerZ] = state.position
    const horizontalDistance = Math.cos(state.cameraPitch) * state.cameraDistance

    desiredTarget.set(playerX, playerY + 1.3, playerZ)
    desiredPosition.set(
      playerX + Math.sin(state.cameraYaw) * horizontalDistance,
      playerY + 0.55 + Math.sin(state.cameraPitch) * state.cameraDistance,
      playerZ + Math.cos(state.cameraYaw) * horizontalDistance,
    )

    if (!initializedRef.current) {
      smoothedPosition.copy(desiredPosition)
      smoothedTarget.copy(desiredTarget)
      camera.position.copy(desiredPosition)
      camera.lookAt(desiredTarget)
      initializedRef.current = true
      return
    }

    const cappedDelta = Math.min(delta, 0.05)
    const positionSmoothing = 1 - Math.exp(-9 * cappedDelta)
    const targetSmoothing = 1 - Math.exp(-11 * cappedDelta)

    smoothedPosition.lerp(desiredPosition, positionSmoothing)
    smoothedTarget.lerp(desiredTarget, targetSmoothing)

    camera.position.copy(smoothedPosition)
    camera.lookAt(smoothedTarget)
  })

  return null
}
