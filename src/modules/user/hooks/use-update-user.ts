import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../utils/constants'
import { toaster } from '@/ui/storybook/toaster'
import type { UserUpdateSerializerType } from '../utils/schemas'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdateSerializerType }) =>
      userApi.update(id, data, { queryClient }),
    onSuccess: () => {
      toaster.success({
        title: 'Usuário atualizado com sucesso',
      })
    },
  })
}
