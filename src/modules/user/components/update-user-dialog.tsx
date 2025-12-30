import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { UserForm } from './user-form'
import { DefaultModal } from '@/ui/blocks/modal/default-modal'
import { useForm } from 'react-hook-form'
import type { User } from '../utils/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { userUpdateSerializer } from '../utils/schemas'
import { useUpdateUser } from '../hooks/use-update-user'
import { toaster } from '@/ui/storybook/toaster'

export const UpdateUserDialog = NiceModal.create(({ user }: { user: User }) => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(userUpdateSerializer),
    mode: 'onBlur',
    defaultValues: user,
  })
  const { mutateAsync: updateUser, isPending } = useUpdateUser()

  const modal = useModal()

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      await updateUser({ id: user._id, data })
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
        <UserForm control={control} />
      </DefaultModal.Body>
      <DefaultModal.Confirm
        submit={handleFormSubmit}
        isLoading={isPending}
        onCancel={modal.hide}
      />
    </DefaultModal>
  )
})
