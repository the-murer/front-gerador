import { UserPage } from '@/modules/user/pages/user-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users/$id')({
  component: UserPage,
})

