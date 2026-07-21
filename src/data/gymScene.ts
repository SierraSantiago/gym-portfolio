import type { Tuple3 } from '../types/project'

export const gymRoom = {
  width: 20,
  depth: 14,
  wallHeight: 5.2,
  wallThickness: 0.32,
  floorThickness: 0.24,
} as const

export interface FloorZone {
  id: string
  position: Tuple3
  size: Tuple3
  variant: 'cardio' | 'strength' | 'functional' | 'aisle' | 'future'
}

export interface BoxLayout {
  id: string
  position: Tuple3
  size: Tuple3
  rotation?: Tuple3
}

export interface CeilingLightConfig {
  id: string
  position: Tuple3
  size: [number, number]
  intensity: number
}

export interface ZoneLightConfig {
  id: string
  position: Tuple3
  intensity: number
  distance: number
  colorToken: 'fillLight' | 'accentLight' | 'lightPanel'
}

export interface ZoneSignConfig {
  id: string
  title: string
  position: Tuple3
  rotation: Tuple3
  size: [number, number]
}

export const gymColumns: Array<BoxLayout> = [
  {
    id: 'column-left-front',
    position: [-8.6, 2.1, 2.4],
    size: [0.62, 4.2, 0.62],
  },
  {
    id: 'column-right-front',
    position: [8.6, 2.1, 2.4],
    size: [0.62, 4.2, 0.62],
  },
  {
    id: 'column-left-rear',
    position: [-8.6, 2.1, -3.3],
    size: [0.62, 4.2, 0.62],
  },
  {
    id: 'column-right-rear',
    position: [8.6, 2.1, -3.3],
    size: [0.62, 4.2, 0.62],
  },
]

export const floorZones: FloorZone[] = [
  {
    id: 'cardio-zone',
    position: [-6.1, 0.012, 2.35],
    size: [5.8, 0.024, 4.8],
    variant: 'cardio',
  },
  {
    id: 'strength-zone',
    position: [-0.15, 0.013, -3.25],
    size: [7.4, 0.026, 5.5],
    variant: 'strength',
  },
  {
    id: 'functional-zone',
    position: [6.35, 0.012, 1.55],
    size: [5.2, 0.024, 5.8],
    variant: 'functional',
  },
  {
    id: 'central-aisle',
    position: [0, 0.014, -0.1],
    size: [3.4, 0.028, 12.1],
    variant: 'aisle',
  },
  {
    id: 'future-left-pad',
    position: [-6.2, 0.01, -3.35],
    size: [4.8, 0.02, 4.2],
    variant: 'future',
  },
  {
    id: 'future-right-pad',
    position: [6.1, 0.01, 4.15],
    size: [4.6, 0.02, 3.8],
    variant: 'future',
  },
]

export const backMirrorPanels: Array<BoxLayout> = [
  { id: 'mirror-left-outer', position: [-6, 2.05, -6.79], size: [2.2, 2.5, 0.05] },
  { id: 'mirror-left-inner', position: [-3.2, 2.05, -6.79], size: [2.2, 2.5, 0.05] },
  { id: 'mirror-right-inner', position: [3.2, 2.05, -6.79], size: [2.2, 2.5, 0.05] },
  { id: 'mirror-right-outer', position: [6, 2.05, -6.79], size: [2.2, 2.5, 0.05] },
]

export const ceilingLightFixtures: CeilingLightConfig[] = [
  { id: 'ceiling-light-a1', position: [-6.5, 4.72, -4.6], size: [2.2, 0.64], intensity: 8.2 },
  { id: 'ceiling-light-b1', position: [0, 4.72, -4.6], size: [2.2, 0.64], intensity: 8.8 },
  { id: 'ceiling-light-c1', position: [6.5, 4.72, -4.6], size: [2.2, 0.64], intensity: 8.2 },
  { id: 'ceiling-light-a2', position: [-6.5, 4.72, 1.2], size: [2.2, 0.64], intensity: 8 },
  { id: 'ceiling-light-b2', position: [0, 4.72, 1.2], size: [2.2, 0.64], intensity: 8.6 },
  { id: 'ceiling-light-c2', position: [6.5, 4.72, 1.2], size: [2.2, 0.64], intensity: 8 },
]

export const zoneAccentLights: ZoneLightConfig[] = [
  {
    id: 'zone-light-cardio',
    position: [-6.1, 3.3, 2.6],
    intensity: 8,
    distance: 9,
    colorToken: 'fillLight',
  },
  {
    id: 'zone-light-strength',
    position: [0.2, 3.2, -3.4],
    intensity: 7.4,
    distance: 10,
    colorToken: 'lightPanel',
  },
  {
    id: 'zone-light-functional',
    position: [6.35, 3.1, 1.1],
    intensity: 7.8,
    distance: 9,
    colorToken: 'fillLight',
  },
  {
    id: 'zone-light-sign',
    position: [0, 3.4, -5.2],
    intensity: 5.6,
    distance: 8,
    colorToken: 'accentLight',
  },
]

export const benches: Array<BoxLayout> = [
  {
    id: 'bench-left',
    position: [-2.7, 0, -2.35],
    size: [1, 1, 1],
    rotation: [0, 0.22, 0],
  },
  {
    id: 'bench-right',
    position: [2.95, 0, -2.7],
    size: [1, 1, 1],
    rotation: [0, -0.24, 0],
  },
]

export const exerciseMats: Array<BoxLayout> = [
  { id: 'mat-top', position: [6.45, 0.02, 3.05], size: [1.2, 0.04, 2.3] },
  { id: 'mat-middle', position: [6.45, 0.02, 1.65], size: [1.2, 0.04, 2.3] },
  { id: 'mat-bottom', position: [6.45, 0.02, 0.25], size: [1.2, 0.04, 2.3] },
]

export const functionalBoxes: Array<BoxLayout> = [
  {
    id: 'plyo-box-tall',
    position: [7.85, 0.34, 2.55],
    size: [0.7, 0.68, 0.7],
  },
  {
    id: 'plyo-box-low',
    position: [8.55, 0.22, 1.75],
    size: [0.58, 0.44, 0.58],
  },
]

export const plateTree = {
  position: [4.55, 0, -4.85] as Tuple3,
}

export const zoneSigns: ZoneSignConfig[] = [
  {
    id: 'zone-sign-cardio',
    title: 'CARDIO',
    position: [-8.7, 2.55, 0.8],
    rotation: [0, Math.PI / 2, 0],
    size: [1.8, 0.48],
  },
  {
    id: 'zone-sign-strength',
    title: 'STRENGTH',
    position: [0, 2.55, -6.62],
    rotation: [0, 0, 0],
    size: [2.15, 0.52],
  },
  {
    id: 'zone-sign-functional',
    title: 'FUNCTIONAL',
    position: [8.7, 2.55, 0.75],
    rotation: [0, -Math.PI / 2, 0],
    size: [2.4, 0.52],
  },
]
