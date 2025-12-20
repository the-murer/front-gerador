import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi, type User } from '../utils/constants'
import { toaster } from '@/ui/storybook/toaster'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: User) => userApi.create(data, { queryClient }),
    onSuccess: () => {
      toaster.success({
        title: 'Usuário criado com sucesso',
      })
    },
  })
}
