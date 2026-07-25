import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { Vector3 } from 'three'
import { projectStations } from '../../../data/projectStations'
import { usePlayerStore } from '../../../state/usePlayerStore'
import { useProjectStore } from '../../../state/useProjectStore'

export function ProjectInteractionZones() {
  const playerPosition = useMemo(() => new Vector3(), [])
  const stationPoints = useMemo(
    () =>
      projectStations.map((station) => ({
        id: station.id,
        radiusSquared: station.interactionRadius * station.interactionRadius,
        point: new Vector3(station.position[0], 0, station.position[2]),
      })),
    [],
  )

  useFrame(() => {
    const [playerX, playerY, playerZ] = usePlayerStore.getState().position
    playerPosition.set(playerX, playerY, playerZ)

    let nearestProjectId: string | null = null
    let nearestDistance = Number.POSITIVE_INFINITY

    stationPoints.forEach((station) => {
      const distanceSquared = playerPosition.distanceToSquared(station.point)

      if (distanceSquared <= station.radiusSquared && distanceSquared < nearestDistance) {
        nearestProjectId = station.id
        nearestDistance = distanceSquared
      }
    })

    const state = useProjectStore.getState()
    if (state.nearbyProjectId !== nearestProjectId) {
      state.setNearbyProject(nearestProjectId)
    }
  })

  return null
}
