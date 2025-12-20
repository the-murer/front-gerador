import { Dialog, Portal } from '@chakra-ui/react'
import { XIcon } from 'lucide-react'
import type { OpenChangeDetails } from 'node_modules/@chakra-ui/react/dist/types/components/action-bar/namespace'
import React from 'react'
import { Button } from '../../components/button/button'

type DefaultModalProps = {
  open: boolean
  onOpenChange: (details: OpenChangeDetails) => void
  children: React.ReactNode
}

export const DefaultModal = ({
  open,
  onOpenChange,
  children,
}: DefaultModalProps) => {
  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>{children}</Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

type DefaultModalHeaderProps = {
  title: string
  showCloseButton: boolean
}

type DefaultModalComponentProps = React.PropsWithChildren<{}>

DefaultModal.Header = ({ title, showCloseButton }: DefaultModalHeaderProps) => (
  <>
    <Dialog.Header>
      <Dialog.Title>{title}</Dialog.Title>
    </Dialog.Header>
    {showCloseButton && (
      <Dialog.CloseTrigger asChild>
        <XIcon />
      </Dialog.CloseTrigger>
    )}
  </>
)

DefaultModal.Footer = ({ children }: DefaultModalComponentProps) => (
  <Dialog.Footer>{children}</Dialog.Footer>
)

DefaultModal.Body = ({ children }: DefaultModalComponentProps) => (
  <Dialog.Body>{children}</Dialog.Body>
)

DefaultModal.Confirm = ({
  submit,
  confirmText = 'Confirmar',
  onCancel,
}: {
  submit: () => void
  onCancel: () => void
  confirmText?: string
}) => (
  <Dialog.Footer>
    <Button onClick={onCancel} variant="outline">Cancel</Button>
    <Button onClick={submit}>{confirmText}</Button>
  </Dialog.Footer>
)
