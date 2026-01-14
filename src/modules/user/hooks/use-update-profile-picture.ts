import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../utils/constants'
import { toaster } from '@/ui/storybook/toaster'

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, fileId }: { id: string; fileId: string }) =>
      userApi.updateProfilePicture(id, fileId, { queryClient }),
    onSuccess: () => {
      toaster.success({
        title: 'Foto de perfil atualizada com sucesso',
      })
    },
  })
}
