import { createFileRoute } from '@tanstack/react-router'
import { RecoverPasswordPage } from '@/modules/auth/pages/recover-password-page'

export const Route = createFileRoute('/auth/recover')({
  component: RecoverPasswordPage,
})
