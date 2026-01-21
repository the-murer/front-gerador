import type { ComponentType } from 'react'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Box,
  Button,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Image,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LayoutDashboard, LogOut, Menu, Users, X } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import {
  useAuthenticatedUser,
  useSetAuthenticatedUser,
} from '@/modules/auth/stores/auth-user-store'
import {
  ColorModeIcon,
  useColorMode,
  useColorModeValue,
} from '@/ui/utils/color-mode'
import {
  getUserBackgroundColor,
  getUserInitials,
} from '@/modules/user/utils/user-utils'

type NavItem = {
  title: string
  to: string
  icon: ComponentType<{ size?: number }>
}

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Usuários', to: '/admin/users', icon: Users },
  /* NAV_ITEMS_INJECTOR */
]

// TODO: OPTIMIZE THIS 

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { setAuthenticatedUser } = useSetAuthenticatedUser()
  const { authenticatedUser } = useAuthenticatedUser()
  const { colorMode, toggleColorMode } = useColorMode()

  const headerBg = useColorModeValue('white', 'gray.950')
  const borderColor = useColorModeValue('gray.200', 'gray.800')
  const navTextColor = useColorModeValue('gray.700', 'gray.200')
  const navHoverBg = useColorModeValue('gray.100', 'gray.900')
  const navActiveBg = useColorModeValue('cyan.50', 'cyan.950')
  const navActiveText = useColorModeValue('cyan.800', 'cyan.200')
  const subtleText = useColorModeValue('gray.500', 'gray.400')

  const userInitials = getUserInitials(authenticatedUser?.name ?? '')
  const userBackgroundColor = getUserBackgroundColor(
    authenticatedUser?.name ?? '',
  )

  const handleLogout = () => {
    setAuthenticatedUser(null)
    navigate({ to: '/auth/login' })
    setIsOpen(false)
  }

  const goToProfile = () => {
    navigate({ to: `/admin/users/${authenticatedUser?._id}` })
    setIsOpen(false)
  }

  const goToHome = () => {
    navigate({ to: '/admin/dashboard' })
  }

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <Box hideFrom="sm">
      {/* Header fixo no topo */}
      <Flex
        as="header"
        position="sticky"
        top="0"
        zIndex="sticky"
        w="full"
        h="16"
        px={4}
        align="center"
        justify="space-between"
        bg={headerBg}
        borderBottomWidth="1px"
        borderBottomColor={borderColor}
      >
        {/* Logo à esquerda */}
        <Flex
          align="center"
          gap={2}
          cursor="pointer"
          onClick={goToHome}
        >
          <Image
            src="/logo192.png"
            alt="Logo"
            boxSize="8"
            objectFit="contain"
          />
        </Flex>

        {/* Foto do usuário e menu à direita */}
        <HStack gap={2}>
          {/* Avatar do usuário */}
          <Flex
            boxSize="9"
            borderRadius="full"
            bg={
              authenticatedUser?.profilePictureUrl
                ? 'transparent'
                : userBackgroundColor
            }
            align="center"
            justify="center"
            flexShrink={0}
            overflow="hidden"
            cursor="pointer"
            onClick={goToProfile}
          >
            {authenticatedUser?.profilePictureUrl ? (
              <Image
                src={authenticatedUser?.profilePictureUrl}
                alt="Foto de perfil"
                boxSize="9"
                objectFit="cover"
                borderRadius="full"
              />
            ) : (
              <Text fontWeight="semibold" fontSize="sm" color="white">
                {userInitials}
              </Text>
            )}
          </Flex>

          {/* Botão do menu */}
          <IconButton
            aria-label="Abrir menu"
            variant="ghost"
            size="md"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </IconButton>
        </HStack>
      </Flex>

      {/* Drawer do menu */}
      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="end"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header borderBottomWidth="1px" borderBottomColor={borderColor}>
                <Drawer.Title>Menu</Drawer.Title>
                <Drawer.CloseTrigger asChild position="absolute" top="3" right="3">
                  <IconButton aria-label="Fechar menu" variant="ghost" size="sm">
                    <X size={20} />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>

              <Drawer.Body p={0}>
                <VStack align="stretch" gap={1} px={3} py={4}>
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    return (
                      <Box
                        key={item.to}
                        asChild
                        display="flex"
                        alignItems="center"
                        gap={3}
                        px={3}
                        py="10px"
                        borderRadius="12px"
                        color={navTextColor}
                        textDecoration="none"
                        cursor="pointer"
                        transition="background-color 120ms ease, color 120ms ease"
                        _hover={{ bg: navHoverBg }}
                        css={{
                          '&[data-active="true"]': {
                            bg: navActiveBg,
                            color: navActiveText,
                            fontWeight: 600,
                          },
                          '&[data-active="true"]:hover': {
                            bg: navActiveBg,
                          },
                        }}
                        onClick={handleNavClick}
                      >
                        <Link
                          to={item.to}
                          activeProps={{
                            'data-active': 'true',
                          }}
                        >
                          <Box flexShrink={0}>
                            <Icon size={18} />
                          </Box>
                          <Text fontWeight="medium">{item.title}</Text>
                        </Link>
                      </Box>
                    )
                  })}
                </VStack>
              </Drawer.Body>

              <Drawer.Footer
                borderTopWidth="1px"
                borderTopColor={borderColor}
                flexDirection="column"
                gap={3}
                px={4}
                py={4}
              >
                {/* Informações do usuário */}
                <HStack
                  w="full"
                  gap={3}
                  cursor="pointer"
                  onClick={goToProfile}
                  p={2}
                  borderRadius="lg"
                  _hover={{ bg: navHoverBg }}
                >
                  <Flex
                    boxSize="10"
                    borderRadius="full"
                    bg={
                      authenticatedUser?.profilePictureUrl
                        ? 'transparent'
                        : userBackgroundColor
                    }
                    align="center"
                    justify="center"
                    flexShrink={0}
                    overflow="hidden"
                  >
                    {authenticatedUser?.profilePictureUrl ? (
                      <Image
                        src={authenticatedUser?.profilePictureUrl}
                        alt="Foto de perfil"
                        boxSize="10"
                        objectFit="cover"
                        borderRadius="full"
                      />
                    ) : (
                      <Text fontWeight="semibold" fontSize="sm" color="white">
                        {userInitials}
                      </Text>
                    )}
                  </Flex>
                  <Box flex="1" minW={0}>
                    <Text fontWeight="semibold" lineClamp={1}>
                      {authenticatedUser?.name ?? 'Usuário'}
                    </Text>
                    <Text fontSize="sm" color={subtleText} lineClamp={1}>
                      {authenticatedUser?.email ?? '—'}
                    </Text>
                  </Box>
                </HStack>

                {/* Botões de ação */}
                <HStack w="full" gap={2}>
                  <Button
                    flex="1"
                    variant="outline"
                    size="md"
                    onClick={toggleColorMode}
                  >
                    <ColorModeIcon />
                    <Text>{colorMode === 'dark' ? 'Tema Claro' : 'Tema Escuro'}</Text>
                  </Button>
                  <Button
                    flex="1"
                    variant="subtle"
                    colorPalette="red"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <Text>Sair</Text>
                  </Button>
                </HStack>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  )
}
