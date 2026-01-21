import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { DefaultModal } from '@/ui/blocks/modal/default-modal'
import { useForm } from 'react-hook-form'
import type { User } from '../utils/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { toaster } from '@/ui/storybook/toaster'
import { DefaultInput } from '@/ui/components/input/input'
import { InputTypes } from '@/ui/components/input/input-map'
import { FileTypes } from '@/ui/components/input/variants/file-input'
import { useUpdateProfilePicture } from '../hooks/use-update-profile-picture'
import { z } from 'zod'

export const UpdateProfilePictureDialog = NiceModal.create(
  ({ user }: { user: User }) => {
    const { handleSubmit, control } = useForm<{ fileKey: string }>({
      resolver: zodResolver(
        z.object({
          fileKey: z.string(),
        }),
      ),
      mode: 'onBlur',
      defaultValues: {
        fileKey: user.profilePictureUrl || '',
      },
    })
    const { mutateAsync: updateProfilePicture, isPending } =
      useUpdateProfilePicture()

    const modal = useModal()

    const handleFormSubmit = handleSubmit(async (data) => {
      try {
        await updateProfilePicture({ id: user._id, fileKey: data.fileKey })
        modal.remove()
      } catch (error) {
        toaster.error({
          title: 'Erro ao atualizar usuário',
        })
      }
    })

    return (
      <DefaultModal open={modal.visible} onOpenChange={modal.remove}>
        <DefaultModal.Header
          title={`Editar Usuário ${user.name}`}
          showCloseButton={true}
        />
        <DefaultModal.Body>
          <DefaultInput
            type={InputTypes.FILE}
            name="fileKey"
            label="Foto de perfil"
            control={control}
            accept={FileTypes.IMAGE}
          />
        </DefaultModal.Body>
        <DefaultModal.Confirm
          submit={handleFormSubmit}
          isLoading={isPending}
          onCancel={modal.remove}
        />
      </DefaultModal>
    )
  },
)
