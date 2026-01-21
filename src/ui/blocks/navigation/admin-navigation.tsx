import type { ComponentType, MouseEvent } from 'react'

import { Box, Flex, VStack } from '@chakra-ui/react'
import { LayoutDashboard, Users } from 'lucide-react'

import { useAdminUiStore } from '@/common/stores/admin-ui-store'
import { useColorModeValue } from '@/ui/utils/color-mode'
import { SidebarItem } from '@/ui/blocks/sidebar/sidebar-item'
import { SidebarHeader } from '@/ui/blocks/sidebar/sidebar-header'
import { SidebarFooter } from '@/ui/blocks/sidebar/sidebar-footer'
import React from 'react'

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

export function AdminNavigation() {
  const collapsed = useAdminUiStore((s) => s.isSidebarCollapsed)
  const toggleCollapsed = useAdminUiStore((s) => s.toggleSidebarCollapsed)
  const setSidebarCollapsed = useAdminUiStore((s) => s.setSidebarCollapsed)

  const sidebarBg = useColorModeValue('white', 'gray.950')
  const borderColor = useColorModeValue('gray.200', 'gray.800')
  const subtleText = useColorModeValue('gray.500', 'gray.400')

  const sidebarWidth = collapsed ? '72px' : '288px'

  const handleSidebarClickCapture = (e: MouseEvent<HTMLElement>) => {
    if (!collapsed) return

    const target = e.target as HTMLElement | null
    if (!target) return

    const isOnNoExpand = Boolean(
      target.closest('[data-sidebar-no-expand="true"]'),
    )

    if (isOnNoExpand) return

    setSidebarCollapsed(false)
  }

  return (
    <>
    <Box
      hideBelow="sm"
      as="aside"
      w={sidebarWidth}
      transition="width 180ms ease"
      bg={sidebarBg}
      borderRightWidth="1px"
      borderRightColor={borderColor}
      position="sticky"
      top="0"
      h="100vh"
      overflow="hidden"
      flexShrink={0}
      cursor={collapsed ? 'pointer' : 'default'}
      onClickCapture={handleSidebarClickCapture}
    >
      <Flex direction="column" h="full">
        <SidebarHeader
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          subtleText={subtleText}
        />

        <Divider borderTopColor={borderColor} />

        <VStack
          align="stretch"
          gap={1}
          px={2}
          py={3}
          flex="1"
          overflowY="scroll"
        >
          {NAV_ITEMS.map((item) => {
            return (
              <React.Fragment key={item.to}>
                <SidebarItem
                  to={item.to}
                  title={item.title}
                  collapsed={collapsed}
                  icon={item.icon}
                />
              </React.Fragment>
            )
          })}
        </VStack>

        <Divider borderTopColor={borderColor} />

        <SidebarFooter collapsed={collapsed} />
      </Flex>
    </Box>
    </>
  )
}

const Divider = ({ borderTopColor }: { borderTopColor: string }) => {
  return <Box borderTopWidth="1px" borderTopColor={borderTopColor} />
}
