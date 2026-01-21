import { AIButton } from '@/modules/ai/components/ai-button'
import { useAuthenticatedUser } from '@/modules/auth/stores/auth-user-store'
import { AdminNavigation } from '@/ui/blocks/navigation/admin-navigation'
import { MobileHeader } from '@/ui/blocks/navigation/mobile-header'
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
    <Flex h="100vh" direction={{ base: 'column', sm: 'row' }}>
      <MobileHeader />
      <AdminNavigation />
      <Box flex="1" minW={0} overflowY="scroll">
        <Outlet />
      </Box>
      <AIButton />
    </Flex>
  )
}
