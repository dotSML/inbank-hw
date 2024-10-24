import { reactive, type Component } from 'vue'

export interface ModalState {
  isOpen: boolean
  content: Component | null
  open: (content: Component) => void
  close: () => void
}

export function useModal(): ModalState {
  const state = reactive<ModalState>({
    isOpen: false,
    content: null,
    open(content) {
      state.isOpen = true
      state.content = content
    },
    close() {
      state.isOpen = false
      state.content = null
    },
  })

  return state
}
