import type { GymModelAssetId, ModelScale, Vector3Tuple } from '../types/gymAsset'

export const gymRoom = {
  width: 20,
  depth: 14,
  wallHeight: 5.2,
  wallThickness: 0.32,
  floorThickness: 0.24,
} as const

export interface FloorZone {
  id: string
  position: Vector3Tuple
  size: Vector3Tuple
  variant: 'cardio' | 'strength' | 'functional' | 'aisle'
}

export interface BoxLayout {
  id: string
  position: Vector3Tuple
  size: Vector3Tuple
  rotation?: Vector3Tuple
}

export interface CeilingLightConfig {
  id: string
  position: Vector3Tuple
  drop: number
  size: [number, number]
  intensity?: number
}

export interface ZoneLightConfig {
  id: string
  position: Vector3Tuple
  intensity: number
  distance: number
  colorToken: 'fillLight' | 'accentLight' | 'lightPanel'
}

export interface ZoneSignConfig {
  id: string
  title: string
  position: Vector3Tuple
  rotation: Vector3Tuple
  size: [number, number]
}

export interface WallPanelConfig {
  id: string
  position: Vector3Tuple
  size: Vector3Tuple
  rotation?: Vector3Tuple
  variant: 'deep' | 'mid' | 'trim' | 'warm'
}

export interface LedStripConfig {
  id: string
  position: Vector3Tuple
  size: Vector3Tuple
  rotation?: Vector3Tuple
  colorToken: 'marker' | 'accentLight' | 'lightPanel'
  emissiveIntensity: number
}

export interface SecondaryModelConfig {
  id: string
  assetId: Extract<GymModelAssetId, 'arc-bench'>
  position: Vector3Tuple
  rotation: Vector3Tuple
  scale?: ModelScale
}

export interface GymEquipmentPlacement {
  id: string
  nodeName: 'Parallel_7' | 'Shoulder_6'
  position: Vector3Tuple
  rotation: Vector3Tuple
  scale?: ModelScale
}

export const gymColumns: Array<BoxLayout> = [
  {
    id: 'column-left-rear',
    position: [-8.82, 2.15, -4.95],
    size: [0.22, 4.3, 0.24],
  },
  {
    id: 'column-right-rear',
    position: [8.82, 2.15, -4.95],
    size: [0.22, 4.3, 0.24],
  },
]

export const floorZones: FloorZone[] = [
  {
    id: 'cardio-zone',
    position: [-6.45, 0.0052, 0.85],
    size: [4.75, 0.02, 5.35],
    variant: 'cardio',
  },
  {
    id: 'strength-zone',
    position: [0.3, 0.005, -4.05],
    size: [8.95, 0.02, 4.55],
    variant: 'strength',
  },
  {
    id: 'functional-zone',
    position: [6.7, 0.0051, 1.25],
    size: [4.4, 0.02, 5.05],
    variant: 'functional',
  },
  {
    id: 'central-aisle',
    position: [0.2, 0.0061, -0.05],
    size: [2.45, 0.02, 11.05],
    variant: 'aisle',
  },
]

export const backMirrorPanels: Array<BoxLayout> = [
  { id: 'mirror-left-outer', position: [-5.4, 1.95, -6.78], size: [2.35, 2.72, 0.04] },
  { id: 'mirror-left-inner', position: [-1.95, 1.95, -6.78], size: [2.35, 2.72, 0.04] },
  { id: 'mirror-right-inner', position: [1.95, 1.95, -6.78], size: [2.35, 2.72, 0.04] },
  { id: 'mirror-right-outer', position: [5.4, 1.95, -6.78], size: [2.35, 2.72, 0.04] },
]

export const ceilingLightFixtures: CeilingLightConfig[] = [
  { id: 'ceiling-light-cardio-front', position: [-6.75, 4.62, 2.15], size: [1.95, 0.22], drop: 0.42, intensity: 3.4 },
  { id: 'ceiling-light-cardio-rear', position: [-6.2, 4.72, -1.15], size: [1.8, 0.22], drop: 0.36 },
  { id: 'ceiling-light-strength', position: [0.1, 4.7, -4.2], size: [2.5, 0.22], drop: 0.4, intensity: 3.8 },
  { id: 'ceiling-light-aisle', position: [0.45, 4.82, -0.55], size: [2.35, 0.22], drop: 0.4, intensity: 3.1 },
  { id: 'ceiling-light-leg-press', position: [6.1, 4.7, -3.1], size: [2.05, 0.22], drop: 0.4, intensity: 3.5 },
  { id: 'ceiling-light-functional', position: [6.85, 4.7, 1.75], size: [1.9, 0.22], drop: 0.38 },
]

export const zoneAccentLights: ZoneLightConfig[] = [
  {
    id: 'zone-light-cardio',
    position: [-7, 2.85, 1.25],
    intensity: 3.2,
    distance: 8.4,
    colorToken: 'fillLight',
  },
  {
    id: 'zone-light-strength',
    position: [0.15, 2.95, -4.7],
    intensity: 3,
    distance: 8.6,
    colorToken: 'lightPanel',
  },
  {
    id: 'zone-light-guided',
    position: [5.9, 2.85, -2.55],
    intensity: 2.8,
    distance: 7.6,
    colorToken: 'fillLight',
  },
  {
    id: 'zone-light-functional',
    position: [7.05, 2.7, 1.9],
    intensity: 2.7,
    distance: 6.8,
    colorToken: 'fillLight',
  },
  {
    id: 'zone-light-warm-back',
    position: [0, 3.35, -5.72],
    intensity: 2.2,
    distance: 6.8,
    colorToken: 'accentLight',
  },
]

export const exerciseMats: Array<BoxLayout> = [
  { id: 'mat-functional-main', position: [6.82, 0.013, 2.25], size: [1.22, 0.012, 2.32] },
]

export const functionalBoxes: Array<BoxLayout> = [
  {
    id: 'plyo-box-tall',
    position: [8.35, 0.34, 0.15],
    size: [0.7, 0.68, 0.7],
  },
  {
    id: 'plyo-box-low',
    position: [8.85, 0.22, -0.65],
    size: [0.58, 0.44, 0.58],
  },
]

export const secondaryGymModels: SecondaryModelConfig[] = [
  {
    id: 'arc-bench-ambient',
    assetId: 'arc-bench',
    position: [0.55, -0.004, -3.2],
    rotation: [0, Math.PI / 2, 0],
    scale: 0.58,
  },
]

export const gymEquipmentPlacements: GymEquipmentPlacement[] = [
  {
    id: 'functional-parallel-bars',
    nodeName: 'Parallel_7',
    position: [7.55, 0, 0.95],
    rotation: [0, Math.PI, 0],
    scale: 0.3,
  },
  {
    id: 'strength-shoulder-machine',
    nodeName: 'Shoulder_6',
    position: [7.25, 0, -4.55],
    rotation: [0, -Math.PI / 2, 0],
    scale: 0.28,
  },
]

export const zoneSigns: ZoneSignConfig[] = [
  {
    id: 'zone-sign-cardio',
    title: 'CARDIO',
    position: [-9.81, 1.78, 0.98],
    rotation: [0, Math.PI / 2, 0],
    size: [1.34, 0.32],
  },
  {
    id: 'zone-sign-strength',
    title: 'STRENGTH',
    position: [0, 0.94, -6.81],
    rotation: [0, 0, 0],
    size: [1.44, 0.28],
  },
  {
    id: 'zone-sign-functional',
    title: 'FUNCTIONAL',
    position: [9.81, 1.78, 1.2],
    rotation: [0, -Math.PI / 2, 0],
    size: [1.56, 0.32],
  },
]

export const floorTileLines: Array<BoxLayout> = [
  { id: 'strength-line-v1', position: [-2.7, 0.0072, -4.05], size: [0.035, 0.002, 4.4] },
  { id: 'strength-line-v2', position: [0.25, 0.0072, -4.05], size: [0.035, 0.002, 4.4] },
  { id: 'strength-line-v3', position: [3.2, 0.0072, -4.05], size: [0.035, 0.002, 4.4] },
  { id: 'strength-line-h1', position: [0.25, 0.0078, -5.35], size: [8.7, 0.002, 0.035] },
  { id: 'strength-line-h2', position: [0.25, 0.0078, -4.05], size: [8.7, 0.002, 0.035] },
  { id: 'strength-line-h3', position: [0.25, 0.0078, -2.75], size: [8.7, 0.002, 0.035] },
]

export const floorEdgeStrips: Array<BoxLayout> = [
  { id: 'aisle-left-edge', position: [-1.06, 0.0086, -0.05], size: [0.024, 0.0015, 10.95] },
  { id: 'aisle-right-edge', position: [1.46, 0.0086, -0.05], size: [0.024, 0.0015, 10.95] },
  { id: 'cardio-front-edge', position: [-6.45, 0.0084, 3.5], size: [4.58, 0.0015, 0.024] },
  { id: 'functional-front-edge', position: [6.7, 0.0084, 3.72], size: [4.24, 0.0015, 0.024] },
]

export const wallArchitecturalPanels: Array<WallPanelConfig> = [
  { id: 'back-panel-left', position: [-7.7, 2.28, -6.76], size: [0.92, 4, 0.03], variant: 'deep' },
  { id: 'back-panel-right', position: [7.7, 2.28, -6.76], size: [0.92, 4, 0.03], variant: 'deep' },
  { id: 'back-panel-center-top', position: [0, 4.12, -6.79], size: [6.96, 0.24, 0.02], variant: 'trim' },
  { id: 'back-panel-center-base', position: [0, 0.88, -6.79], size: [6.96, 0.22, 0.02], variant: 'warm' },
  { id: 'left-wall-panel-main', position: [-9.83, 2.02, 0.9], size: [0.03, 2.18, 4.78], variant: 'mid' },
  { id: 'right-wall-panel-main', position: [9.83, 2.02, 1.25], size: [0.03, 2.18, 5.08], variant: 'mid' },
]

export const wallLedStrips: Array<LedStripConfig> = [
  {
    id: 'back-led-under-sign',
    position: [0, 2.72, -6.8],
    size: [6.3, 0.018, 0.012],
    colorToken: 'marker',
    emissiveIntensity: 0.78,
  },
  {
    id: 'left-wall-led',
    position: [-9.82, 1.34, 0.98],
    size: [0.012, 0.018, 1.26],
    rotation: [0, Math.PI / 2, 0],
    colorToken: 'lightPanel',
    emissiveIntensity: 0.34,
  },
  {
    id: 'right-wall-led',
    position: [9.82, 1.34, 1.2],
    size: [0.012, 0.018, 1.44],
    rotation: [0, Math.PI / 2, 0],
    colorToken: 'lightPanel',
    emissiveIntensity: 0.34,
  },
]
