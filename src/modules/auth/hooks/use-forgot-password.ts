import { useMutation } from '@tanstack/react-query'
import { api } from '@/common/api'
import { toaster } from '@/ui/storybook/toaster'

export type ForgotPasswordPayload = {
  email: string
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordPayload) => {
      const response = await api.post('/auth/forgot-password', data)

      return response.data
    },
    onSuccess: () => {
      toaster.success({
        title: 'Email de recuperação enviado',
      })
    },
  })
}
