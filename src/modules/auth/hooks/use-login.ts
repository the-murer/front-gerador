import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../stores/auth-user-store'
import { api } from '@/common/api'
import { toaster } from '@/ui/storybook/toaster'

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
    onSuccess: (data) => {
      setAuthenticatedUser(data.access_token)
      toaster.success({ title: 'Autenticado com sucesso' })
    },
    onError: () => {
      toaster.error({
        title: 'Falha ao autenticar',
        description: 'Verifique seu email ou usuário',
      })
    },
  })
}
