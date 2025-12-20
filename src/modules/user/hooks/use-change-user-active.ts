import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../utils/constants'
import { toaster } from '@/ui/storybook/toaster'

export const useChangeUserActive = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      userApi.changeActive(id, active, { queryClient }),
    onSuccess: () => {
      toaster.success({
        title: 'Usuário ativado com sucesso',
      })
    },
  })
}
