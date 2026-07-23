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
  position: [15.4, 6.3, 20.6],
  target: [0.15, 1.58, -2.4],
  fov: 50,
  minDistance: 15.1,
  maxDistance: 26.2,
  minPolarAngle: 1.0,
  maxPolarAngle: 1.36,
  minAzimuthAngle: -0.78,
  maxAzimuthAngle: 0.76,
  rotateSpeed: 0.48,
  zoomSpeed: 0.56,
}

const laptopCamera: CameraViewConfig = {
  position: [14.1, 5.8, 19.1],
  target: [0.15, 1.54, -2.2],
  fov: 51,
  minDistance: 14.1,
  maxDistance: 24.2,
  minPolarAngle: 1.02,
  maxPolarAngle: 1.38,
  minAzimuthAngle: -0.74,
  maxAzimuthAngle: 0.72,
  rotateSpeed: 0.5,
  zoomSpeed: 0.58,
}

const compactCamera: CameraViewConfig = {
  position: [14.3, 5.55, 19.45],
  target: [0.15, 1.48, -1.95],
  fov: 52,
  minDistance: 13.9,
  maxDistance: 24,
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
