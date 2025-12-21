import { UsersPage } from '@/modules/user/pages/users-page'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const usersSearchSchema = z.object({
  page: z.coerce.number().optional().default(1),
  sort: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export const Route = createFileRoute('/admin/users/')({
  component: UsersPage,
  validateSearch: usersSearchSchema,
})
