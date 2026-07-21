import type { Vector3Tuple } from '../types/gymAsset'

export interface CameraViewConfig {
  position: Vector3Tuple
  target: Vector3Tuple
  fov: number
  minDistance: number
  maxDistance: number
  minPolarAngle: number
  maxPolarAngle: number
  minAzimuthAngle: number
  maxAzimuthAngle: number
  rotateSpeed: number
  zoomSpeed: number
}

const wideCamera: CameraViewConfig = {
  position: [12.8, 5.4, 15.9],
  target: [0.2, 1.6, -1.55],
  fov: 44,
  minDistance: 12.5,
  maxDistance: 20.5,
  minPolarAngle: 1.0,
  maxPolarAngle: 1.36,
  minAzimuthAngle: -0.78,
  maxAzimuthAngle: 0.76,
  rotateSpeed: 0.48,
  zoomSpeed: 0.56,
}

const laptopCamera: CameraViewConfig = {
  position: [11.8, 4.95, 14.8],
  target: [0.2, 1.56, -1.4],
  fov: 46,
  minDistance: 11.5,
  maxDistance: 18.8,
  minPolarAngle: 1.02,
  maxPolarAngle: 1.38,
  minAzimuthAngle: -0.74,
  maxAzimuthAngle: 0.72,
  rotateSpeed: 0.5,
  zoomSpeed: 0.58,
}

const compactCamera: CameraViewConfig = {
  position: [12.6, 5.1, 16.8],
  target: [0.15, 1.48, -1.18],
  fov: 48,
  minDistance: 12,
  maxDistance: 19.6,
  minPolarAngle: 1.04,
  maxPolarAngle: 1.4,
  minAzimuthAngle: -0.72,
  maxAzimuthAngle: 0.68,
  rotateSpeed: 0.48,
  zoomSpeed: 0.54,
}

export function getCameraViewConfig(width: number): CameraViewConfig {
  if (width >= 1440) {
    return wideCamera
  }

  if (width >= 900) {
    return laptopCamera
  }

  return compactCamera
}
