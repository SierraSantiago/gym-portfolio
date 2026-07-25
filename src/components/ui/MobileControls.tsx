import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { MathUtils } from 'three'
import { cameraControls } from '../../config/cameraControls'
import { projectStations } from '../../data/projectStations'
import { useIsMobileDevice } from '../../hooks/useIsMobileDevice'
import { usePlayerStore } from '../../state/usePlayerStore'
import { useProjectStore } from '../../state/useProjectStore'
import { useReceptionStore } from '../../state/useReceptionStore'
import styles from './MobileControls.module.css'

const JOYSTICK_TRAVEL_RADIUS = 44

interface ThumbPosition {
  x: number
  y: number
}

function clampThumbPosition(deltaX: number, deltaY: number): ThumbPosition {
  const distance = Math.hypot(deltaX, deltaY)

  if (distance <= JOYSTICK_TRAVEL_RADIUS || distance === 0) {
    return { x: deltaX, y: deltaY }
  }

  const scale = JOYSTICK_TRAVEL_RADIUS / distance
  return {
    x: deltaX * scale,
    y: deltaY * scale,
  }
}

export function MobileControls() {
  const isMobileDevice = useIsMobileDevice()
  const [thumbPosition, setThumbPosition] = useState<ThumbPosition>({ x: 0, y: 0 })
  const joystickPointerIdRef = useRef<number | null>(null)
  const joystickCenterRef = useRef<ThumbPosition>({ x: 0, y: 0 })
  const lookPointerIdRef = useRef<number | null>(null)
  const lookPointerRef = useRef<ThumbPosition>({ x: 0, y: 0 })

  const nearbyProjectId = useProjectStore((state) => state.nearbyProjectId)
  const isProjectOpen = useProjectStore((state) => state.isProjectOpen)
  const openProject = useProjectStore((state) => state.openProject)
  const isNearReception = useReceptionStore((state) => state.isNearReception)
  const isDialogOpen = useReceptionStore((state) => state.isDialogOpen)
  const openDialog = useReceptionStore((state) => state.openDialog)

  const nearbyProject = useMemo(
    () => projectStations.find((project) => project.id === nearbyProjectId) ?? null,
    [nearbyProjectId],
  )

  if (!isMobileDevice) {
    return null
  }

  const updateJoystick = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const deltaX = event.clientX - joystickCenterRef.current.x
    const deltaY = event.clientY - joystickCenterRef.current.y
    const clamped = clampThumbPosition(deltaX, deltaY)

    setThumbPosition(clamped)
    usePlayerStore.getState().setTouchMove(
      MathUtils.clamp(clamped.x / JOYSTICK_TRAVEL_RADIUS, -1, 1),
      MathUtils.clamp(-clamped.y / JOYSTICK_TRAVEL_RADIUS, -1, 1),
    )
  }

  const resetJoystick = () => {
    joystickPointerIdRef.current = null
    setThumbPosition({ x: 0, y: 0 })
    usePlayerStore.getState().clearTouchMove()
  }

  const handleJoystickPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    joystickPointerIdRef.current = event.pointerId
    const bounds = event.currentTarget.getBoundingClientRect()
    joystickCenterRef.current = {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    updateJoystick(event)
  }

  const handleJoystickPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (joystickPointerIdRef.current !== event.pointerId) {
      return
    }

    updateJoystick(event)
  }

  const handleJoystickPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (joystickPointerIdRef.current !== event.pointerId) {
      return
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    resetJoystick()
  }

  const handleLookPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    lookPointerIdRef.current = event.pointerId
    lookPointerRef.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleLookPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (lookPointerIdRef.current !== event.pointerId || isProjectOpen || isDialogOpen) {
      return
    }

    const deltaX = event.clientX - lookPointerRef.current.x
    const deltaY = event.clientY - lookPointerRef.current.y
    lookPointerRef.current = { x: event.clientX, y: event.clientY }

    const state = usePlayerStore.getState()
    state.setCameraOrbit(
      state.cameraYaw - deltaX * cameraControls.yawSensitivity,
      MathUtils.clamp(
        state.cameraPitch + deltaY * cameraControls.pitchSensitivity,
        cameraControls.minPitch,
        cameraControls.maxPitch,
      ),
    )
  }

  const handleLookPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (lookPointerIdRef.current !== event.pointerId) {
      return
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    lookPointerIdRef.current = null
  }

  const handleAction = () => {
    if (nearbyProject && !isProjectOpen) {
      openProject(nearbyProject.id)
      return
    }

    if (isNearReception && !isDialogOpen) {
      openDialog()
    }
  }

  const actionLabel = nearbyProject
    ? `Open ${nearbyProject.title}`
    : isNearReception && !isDialogOpen
      ? 'Talk at reception'
      : null

  return (
    <section className={styles.overlay} aria-label="Mobile controls">
      <button
        className={styles.joystick}
        type="button"
        aria-label="Move character"
        onPointerDown={handleJoystickPointerDown}
        onPointerMove={handleJoystickPointerMove}
        onPointerUp={handleJoystickPointerUp}
        onPointerCancel={handleJoystickPointerUp}
      >
        <span className={styles.joystickRing} />
        <span
          className={styles.joystickThumb}
          style={{ transform: `translate(${thumbPosition.x}px, ${thumbPosition.y}px)` }}
        />
      </button>

      <div
        className={styles.lookPad}
        role="presentation"
        onPointerDown={handleLookPointerDown}
        onPointerMove={handleLookPointerMove}
        onPointerUp={handleLookPointerUp}
        onPointerCancel={handleLookPointerUp}
      >
        <span className={styles.lookPadLabel}>Drag to look</span>
      </div>

      {actionLabel ? (
        <button className={styles.actionButton} type="button" onClick={handleAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}
