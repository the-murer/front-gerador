import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AdminUiState = {
  isSidebarCollapsed: boolean
  toggleSidebarCollapsed: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useAdminUiStore = create<AdminUiState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      toggleSidebarCollapsed: () =>
        set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
    }),
    { name: 'admin-ui-store' },
  ),
)


