import DashboardPlaceholder from '@/modules/dashboard/pages/placeholder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardPlaceholder />
}
