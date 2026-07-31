import type { Vector3Tuple } from '../types/gymAsset'

export interface TourPathSegment {
  id: string
  position: Vector3Tuple
  size: Vector3Tuple
  rotation?: Vector3Tuple
}

export interface TourStopConfig {
  id: string
  order: number
  label: string
  position: Vector3Tuple
  badge?: string
}

export const projectTourPathSegments: TourPathSegment[] = [
  {
    id: 'route-entry-axis',
    position: [0, 0.026, 2.45],
    size: [0.22, 0.012, 2.35],
  },
  {
    id: 'route-cardio-cross',
    position: [-3.22, 0.026, 1.45],
    size: [6.62, 0.012, 0.22],
  },
  {
    id: 'route-cardio-approach',
    position: [-6.55, 0.026, 1.95],
    size: [0.22, 0.012, 1.22],
  },
  {
    id: 'route-left-lane-down',
    position: [-6.1, 0.026, -0.98],
    size: [0.22, 0.012, 4.96],
  },
  {
    id: 'route-left-bench-approach',
    position: [-5.38, 0.026, -3.2],
    size: [1.44, 0.012, 0.22],
  },
  {
    id: 'route-bench-row-center',
    position: [0.05, 0.026, -3.2],
    size: [9.5, 0.012, 0.22],
  },
  {
    id: 'route-right-turn',
    position: [6.95, 0.026, -1.83],
    size: [0.22, 0.012, 2.96],
  },
] as const

export const projectTourStops: TourStopConfig[] = [
  {
    id: 'tour-stop-1',
    order: 1,
    label: 'Treadmills',
    position: [-6.55, 0.03, 2.45],
  },
  {
    id: 'tour-stop-2',
    order: 2,
    label: 'Left Bench',
    position: [-4.7, 0.03, -3.2],
  },
  {
    id: 'tour-stop-3',
    order: 3,
    label: 'Center Bench',
    position: [0.1, 0.03, -3.15],
  },
  {
    id: 'tour-stop-4',
    order: 4,
    label: 'Right Bench',
    position: [4.8, 0.03, -3.2],
  },
  {
    id: 'tour-stop-5',
    order: 5,
    label: 'Right Machines',
    position: [7.05, 0.03, -0.45],
  },
] as const

export const socialTourPathSegments: TourPathSegment[] = [
  {
    id: 'social-route-entry-drop',
    position: [0, 0.026, 5.18],
    size: [0.22, 0.012, 1.28],
  },
  {
    id: 'social-route-left-approach',
    position: [-3.98, 0.026, 4.85],
    size: [7.94, 0.012, 0.22],
  },
  {
    id: 'social-route-right-approach',
    position: [3.98, 0.026, 4.85],
    size: [7.94, 0.012, 0.22],
  },
] as const

export const socialTourStops: TourStopConfig[] = [
  {
    id: 'social-tour-stop-1',
    order: 1,
    label: 'About Me',
    badge: 'ME',
    position: [-7.95, 0.03, 4.85],
  },
  {
    id: 'social-tour-stop-2',
    order: 2,
    label: 'Gym Portfolio',
    badge: 'GP',
    position: [7.95, 0.03, 4.85],
  },
] as const
