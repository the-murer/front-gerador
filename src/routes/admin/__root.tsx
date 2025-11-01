import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/__root')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_root"!
    <Outlet />
  </div>
}
