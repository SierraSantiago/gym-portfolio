import type { ProjectStationData } from '../types/project'

export const projectStations: ProjectStationData[] = [
  {
    id: 'career-pulse',
    title: 'CareerPulse',
    assetId: 'treadmill',
    position: [-6.75, -0.002, 0.35],
    rotation: [0, Math.PI / 2, 0],
    labelOffset: [0, 1.36, 1.02],
  },
  {
    id: 'risk-analysis-ai',
    title: 'Risk Analysis AI',
    assetId: 'dumbbell-stand',
    position: [0.55, 0.038, -4.82],
    rotation: [0, Math.PI / 2, 0],
    labelOffset: [0, 1.38, 0.9],
  },
  {
    id: 'automation-pipeline',
    title: 'Automation Pipeline',
    assetId: 'leg-press',
    position: [6.05, -0.004, -3.3],
    rotation: [0, -Math.PI / 2, 0],
    labelOffset: [0, 1.72, 1.05],
  },
]
