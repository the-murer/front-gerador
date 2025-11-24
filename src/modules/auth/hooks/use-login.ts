import { api } from '@/modules/common/api'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../stores/auth-user-store'

export type LoginPayload = {
  email: string
  password: string
}

export const useLogin = () => {
  const { setAuthenticatedUser } = useAuthStore()

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const response = await api.post('/auth/login', data)

      return response.data
    },
    onSuccess: (data) => setAuthenticatedUser(data.access_token),
  })
}
