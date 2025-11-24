import { useAuthenticatedUser } from '@/modules/auth/stores/auth-user-store'
import { AdminHeader } from '@/modules/common/components/header/admin-header'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { authenticatedUser } = useAuthenticatedUser()

  if (!authenticatedUser) {
    navigate({ to: '/auth/login' })
  }

  return (
    <div>
      <AdminHeader />
      Hello "/admin/_root"!
      <Outlet />
    </div>
  )
}
