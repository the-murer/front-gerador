import { UsersPage } from '@/modules/user/pages/users-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users/')({
  component: UsersPage,
})
