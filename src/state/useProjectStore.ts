import { create } from 'zustand'

interface ProjectState {
  nearbyProjectId: string | null
  activeProjectId: string | null
  isProjectOpen: boolean
  setNearbyProject: (projectId: string | null) => void
  openProject: (projectId?: string) => void
  closeProject: () => void
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  nearbyProjectId: null,
  activeProjectId: null,
  isProjectOpen: false,
  setNearbyProject: (nearbyProjectId) => set({ nearbyProjectId }),
  openProject: (projectId) => {
    const targetId = projectId ?? get().nearbyProjectId
    if (!targetId) return

    set({
      activeProjectId: targetId,
      isProjectOpen: true,
    })
  },
  closeProject: () =>
    set({
      activeProjectId: null,
      isProjectOpen: false,
    }),
}))
