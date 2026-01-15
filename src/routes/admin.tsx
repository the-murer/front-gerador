import { useAuthenticatedUser } from '@/modules/auth/stores/auth-user-store'
import { AdminHeader } from '@/ui/blocks/header/admin-header'
import { NotFoundPage } from '@/ui/templates/not-found-page'
import { Box, Flex } from '@chakra-ui/react'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  notFoundComponent: NotFoundPage,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { authenticatedUser } = useAuthenticatedUser()

  if (!authenticatedUser) {
    navigate({ to: '/auth/login' })
  }

  return (
    <Flex h="100vh">
      <AdminHeader />
      <Box flex="1" minW={0} overflowY="scroll">
        <Outlet />
      </Box>
    </Flex>
  )
}
