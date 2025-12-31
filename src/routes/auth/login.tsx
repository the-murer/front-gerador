import { LoginPage } from '@/modules/auth/pages/login-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})
