import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DecodedUser = {
  sub: string
  _id: string
  email: string
  name: string
}

type AuthState = {
  accessToken: string | null
  setAuthenticatedUser: (token: string | null) => void
}

const decodeJwt = (token: string): DecodedUser => {
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
  if (!accessToken) return { authenticatedUser: null }

  const authenticatedUser = decodeJwt(accessToken)
  return { authenticatedUser }
}

export const useSetAuthenticatedUser = () => {
  const setAuthenticatedUser = useAuthStore((s) => s.setAuthenticatedUser)
  return { setAuthenticatedUser }
}
