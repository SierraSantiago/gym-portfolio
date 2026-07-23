import { create } from 'zustand'
import type { Vector3Tuple } from '../types/gymAsset'
import { entrySpawnPosition } from '../data/gymScene'

interface PlayerState {
  position: Vector3Tuple
  rotationY: number
  cameraYaw: number
  cameraPitch: number
  cameraDistance: number
  setTransform: (position: Vector3Tuple, rotationY: number) => void
  setCameraOrbit: (yaw: number, pitch: number) => void
  setCameraDistance: (distance: number) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  position: entrySpawnPosition,
  rotationY: Math.PI,
  cameraYaw: 0,
  cameraPitch: 0.38,
  cameraDistance: 5.4,
  setTransform: (position, rotationY) => set({ position, rotationY }),
  setCameraOrbit: (cameraYaw, cameraPitch) => set({ cameraYaw, cameraPitch }),
  setCameraDistance: (cameraDistance) => set({ cameraDistance }),
}))
