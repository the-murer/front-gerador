import { useNavigate } from '@tanstack/react-router'
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react'
import { LogOut } from 'lucide-react'

import {
  useAuthenticatedUser,
  useSetAuthenticatedUser,
} from '@/modules/auth/stores/auth-user-store'
import { useColorModeValue } from '@/ui/utils/color-mode'
import { Tooltip } from '@/ui/storybook/tooltip'
import {
  getUserBackgroundColor,
  getUserInitials,
} from '@/modules/user/utils/user-utils'

export const SidebarFooter = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate()
  const { setAuthenticatedUser } = useSetAuthenticatedUser()
  const { authenticatedUser } = useAuthenticatedUser()

  const handleLogout = () => {
    setAuthenticatedUser(null)
    navigate({ to: '/auth/login' })
  }

  const goToProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate({ to: `/admin/users/${authenticatedUser?._id}` })
  }

  const subtleText = useColorModeValue('gray.500', 'gray.400')

  const userInitials = getUserInitials(authenticatedUser?.name)
  const userBackgroundColor = getUserBackgroundColor(authenticatedUser?.name)

  return (
    <Box px={collapsed ? 2 : 4} py={4}>
      <HStack
        onClick={goToProfile}
        cursor="pointer"
        gap={3}
        mb={3}
        justify={collapsed ? 'center' : 'flex-start'}
      >
        <Flex
          boxSize="10"
          borderRadius="full"
          bg={userBackgroundColor}
          align="center"
          justify="center"
          flexShrink={0}
          overflow="hidden"
        >
          <Text fontWeight="semibold" fontSize="sm" color="white">
            {userInitials}
          </Text>
        </Flex>

        {!collapsed && (
          <Box minW={0}>
            <Text fontWeight="semibold" lineClamp={1}>
              {authenticatedUser?.name ?? 'Usuário'}
            </Text>
            <Text fontSize="sm" color={subtleText} lineClamp={1}>
              {authenticatedUser?.email ?? '—'}
            </Text>
          </Box>
        )}
      </HStack>

      {collapsed ? (
        <Tooltip
          content="Sair"
          showArrow
          positioning={{ placement: 'right' }}
          openDelay={250}
        >
          <IconButton
            aria-label="Logout"
            w="full"
            variant="subtle"
            onClick={handleLogout}
            data-sidebar-no-expand="true"
          >
            <LogOut size={18} />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          w="full"
          variant="subtle"
          onClick={handleLogout}
          data-sidebar-no-expand="true"
        >
          <HStack w="full" justify="center" gap={2}>
            <LogOut size={18} />
            <Text>Sair</Text>
          </HStack>
        </Button>
      )}
    </Box>
  )
}
