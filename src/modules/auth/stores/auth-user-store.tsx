import type { User } from '@/modules/user/utils/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  accessToken: string | null
  setAuthenticatedUser: (token: string | null) => void
}

const decodeJwt = (token: string): User => {
  const payload = token.split('.')[1]
  const json = atob(payload)
  return JSON.parse(json)
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAuthenticatedUser: (token) => set({ accessToken: token }),
    }),
    { name: 'auth-store' },
  ),
)

export const useAuthenticatedUser = () => {
  const accessToken = useAuthStore((s) => s.accessToken)
  if (!accessToken) throw new Error('Access token is required')

  const authenticatedUser = decodeJwt(accessToken)

  return { authenticatedUser }
}

export const useSetAuthenticatedUser = () => {
  const setAuthenticatedUser = useAuthStore((s) => s.setAuthenticatedUser)
  return { setAuthenticatedUser }
}