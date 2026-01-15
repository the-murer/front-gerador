import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../utils/constants'
import { toaster } from '@/ui/storybook/toaster'

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, fileKey }: { id: string; fileKey: string }) =>
      userApi.updateProfilePicture(id, fileKey, { queryClient }),
    onSuccess: () => {
      toaster.success({
        title: 'Foto de perfil atualizada com sucesso',
      })
    },
  })
}
