import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../utils/user-constants'
import { toaster } from '@/ui/storybook/toaster'
import type { UserBodySerializerType } from '../utils/user-schemas'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserBodySerializerType) =>
      userApi.create(data, { queryClient }),
    onSuccess: () => {
      toaster.success({
        title: 'Usuário criado com sucesso',
      })
    },
  })
}
