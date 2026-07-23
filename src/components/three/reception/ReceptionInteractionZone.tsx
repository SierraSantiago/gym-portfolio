import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useMemo } from 'react'
import { useReceptionStore } from '../../../state/useReceptionStore'
import type { Vector3Tuple } from '../../../types/gymAsset'

interface ReceptionInteractionZoneProps {
  position: Vector3Tuple
  radius?: number
}

export function ReceptionInteractionZone({
  position,
  radius = 2.35,
}: ReceptionInteractionZoneProps) {
  const center = useMemo(() => new Vector3(...position), [position])
  const currentPlayerPosition = useMemo(() => new Vector3(), [])

  useFrame(() => {
    const state = useReceptionStore.getState()
    currentPlayerPosition.set(...state.playerPosition)
    const isNear = currentPlayerPosition.distanceTo(center) <= radius

    if (isNear !== state.isNearReception) {
      state.setNearReception(isNear)

      if (!isNear && state.isDialogOpen) {
        state.closeDialog()
      }
    }
  })

  return null
}
