import { useMutation } from '@tanstack/react-query'
import { api } from '@/common/api'

export type RecoverPasswordPayload = {
  hash: string
  password: string
}

export const useRecoverPassword = () => {
  return useMutation({
    mutationFn: async (data: RecoverPasswordPayload) => {
      const response = await api.patch(
        `/auth/recover-password/${data.hash}`,
        data,
      )

      return response.data
    },
  })
}
