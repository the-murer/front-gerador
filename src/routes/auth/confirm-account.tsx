import { createFileRoute } from '@tanstack/react-router'
import { ConfirmAccountPage } from '@/modules/auth/pages/confirm-account-page'

export const Route = createFileRoute('/auth/confirm-account')({
  component: ConfirmAccountPage,
})
