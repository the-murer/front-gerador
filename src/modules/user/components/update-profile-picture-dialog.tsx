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
    const { handleSubmit, control } = useForm({
      resolver: zodResolver(
        z.object({
          fileId: z.string(),
        }),
      ),
      mode: 'onBlur',
      defaultValues: {
        fileId: user.profilePictureId?.toString() || '',
      },
    })
    const { mutateAsync: updateProfilePicture, isPending } =
      useUpdateProfilePicture()

    const modal = useModal()

    const handleFormSubmit = handleSubmit(async (data) => {
      console.log('🚀 ~ handleFormSubmit ~ data:', data)
      try {
        await updateProfilePicture({ id: user._id, fileId: data.fileId })
        modal.hide()
      } catch (error) {
        toaster.error({
          title: 'Erro ao atualizar usuário',
        })
      }
    })

    return (
      <DefaultModal open={modal.visible} onOpenChange={modal.hide}>
        <DefaultModal.Header
          title={`Editar Usuário ${user.name}`}
          showCloseButton={true}
        />
        <DefaultModal.Body>
          <DefaultInput
            type={InputTypes.FILE}
            name="fileId"
            label="Foto de perfil"
            control={control}
            accept={FileTypes.IMAGE}
          />
        </DefaultModal.Body>
        <pre>{JSON.stringify(control._formState.errors, null, 2)}</pre>
        <DefaultModal.Confirm
          submit={handleFormSubmit}
          isLoading={isPending}
          onCancel={modal.hide}
        />
      </DefaultModal>
    )
  },
)
