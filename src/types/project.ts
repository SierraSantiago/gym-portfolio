export type Tuple3 = [number, number, number]

export type MachineType = 'treadmill' | 'dumbbell-rack' | 'cable-machine'

export interface ProjectStationData {
  id: string
  title: string
  machineType: MachineType
  position: Tuple3
  rotation?: Tuple3
  labelOffset?: Tuple3
  scale?: number
}
