import type { Vector3Tuple } from './gymAsset'

export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectStationData {
  id: string
  title: string
  kind?: 'project' | 'social'
  tone?: 'project' | 'social' | 'portfolio'
  tourOrder?: number
  position: Vector3Tuple
  interactionRadius: number
  status: string
  summary: string
  description: string
  features: string[]
  stack: string[]
  links?: ProjectLink[]
  githubUrl?: string
  liveUrl?: string
  accessNote?: string
}
