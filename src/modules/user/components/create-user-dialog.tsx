import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { UserForm } from './user-form'
import { DefaultModal } from '@/ui/blocks/modal/default-modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const CreateUserDialog = NiceModal.create(({ name }: { name: string }) => {
  const { handleSubmit, control } = useForm<any>({
    // resolver: zodResolver(),
    mode: 'onBlur',
  })

  const modal = useModal()

  const handleFormSubmit = handleSubmit((data: any) => {
    console.log(data)
  })

  return (
    <DefaultModal open={modal.visible} onOpenChange={modal.hide}>
      <DefaultModal.Header title="Criar Usuário" showCloseButton={true} />
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
