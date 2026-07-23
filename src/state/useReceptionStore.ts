import { create } from 'zustand'
import type { Vector3Tuple } from '../types/gymAsset'
import type { ReceptionTopicId } from '../data/receptionDialog'

interface ReceptionState {
  playerPosition: Vector3Tuple
  isNearReception: boolean
  isDialogOpen: boolean
  selectedTopic: ReceptionTopicId | null
  tourStarted: boolean
  setPlayerPosition: (position: Vector3Tuple) => void
  setNearReception: (isNear: boolean) => void
  openDialog: () => void
  closeDialog: () => void
  selectTopic: (topic: ReceptionTopicId) => void
}

export const useReceptionStore = create<ReceptionState>((set) => ({
  // This matches the planned player spawn near the entrance. The future player
  // controller should call setPlayerPosition every frame or whenever it moves.
  playerPosition: [0, 0, 5.2],
  isNearReception: false,
  isDialogOpen: false,
  selectedTopic: null,
  tourStarted: false,
  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  setNearReception: (isNearReception) => set({ isNearReception }),
  openDialog: () =>
    set((state) =>
      state.isNearReception
        ? { isDialogOpen: true, selectedTopic: null }
        : state,
    ),
  closeDialog: () => set({ isDialogOpen: false, selectedTopic: null }),
  selectTopic: (selectedTopic) =>
    set((state) => ({
      selectedTopic,
      tourStarted: selectedTopic === 'tour' ? true : state.tourStarted,
    })),
}))
