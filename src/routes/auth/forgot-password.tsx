import { ForgotPasswordPage } from '@/modules/auth/pages/forgot-password-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/forgot-password')({
  component: ForgotPasswordPage,
})
