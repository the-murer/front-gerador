import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { UserForm } from './user-form'
import { DefaultModal } from '@/ui/blocks/modal/default-modal'
import { useForm } from 'react-hook-form'
import type { User } from '../utils/constants'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'

export const UpdateUserDialog = NiceModal.create(({ user }: { user: User }) => {
  const { handleSubmit, control } = useForm<any>({
    // resolver: zodResolver(),
    mode: 'onBlur',
    defaultValues: user,
  })

  const modal = useModal()

  const handleFormSubmit = handleSubmit((data: any) => {
    console.log(data)
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
        submit={handleSubmit(handleFormSubmit)}
        onCancel={modal.hide}
      />
    </DefaultModal>
  )
})
