import type { ProjectStationData } from '../types/project'

export const projectStations: ProjectStationData[] = [
  {
    id: 'career-pulse',
    title: 'CareerPulse',
    machineType: 'treadmill',
    position: [-6.25, 0, 2.35],
    rotation: [0, 0.28, 0],
    labelOffset: [0, 1.92, 0.86],
    scale: 1.08,
  },
  {
    id: 'risk-analysis-ai',
    title: 'Risk Analysis AI',
    machineType: 'dumbbell-rack',
    position: [0.1, 0, -3.35],
    rotation: [0, 0, 0],
    labelOffset: [0, 1.72, 0.88],
    scale: 1.06,
  },
  {
    id: 'automation-pipeline',
    title: 'Automation Pipeline',
    machineType: 'cable-machine',
    position: [6.2, 0, -1.15],
    rotation: [0, -0.34, 0],
    labelOffset: [0, 2.15, 0.94],
    scale: 1.08,
  },
]
