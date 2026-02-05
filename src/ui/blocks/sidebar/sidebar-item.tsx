import { Box, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { useColorModeValue } from '@/ui/utils/color-mode'
import type { ComponentType } from 'react'

type SidebarItemProps = {
  to: string
  title: string
  collapsed: boolean
  icon: ComponentType<{ size?: number }>
}

export const SidebarItem = ({
  to,
  title,
  collapsed,
  icon,
}: SidebarItemProps) => {
  const Icon = icon

  const navTextColor = useColorModeValue('gray.700', 'gray.200')
  const navHoverBg = useColorModeValue('gray.100', 'gray.900')
  const navActiveBg = useColorModeValue('cyan.50', 'cyan.950')
  const navActiveText = useColorModeValue('cyan.800', 'cyan.200')

  return (
    <Box
      asChild
      data-sidebar-no-expand="true"
      display="flex"
      alignItems="center"
      justifyContent={collapsed ? 'center' : 'flex-start'}
      gap={3}
      px={3}
      py="10px"
      h={10}
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
      onClick={(e) => e.stopPropagation()}
    >
      <Link
        to={to}
        onClick={(e) => e.stopPropagation()}
        activeProps={{
          'data-active': 'true',
        }}
      >
        <Box flexShrink={0}>
          <Icon size={18} />
        </Box>
        {!collapsed && (
          <Text fontWeight="medium" lineClamp={1}>
            {title}
          </Text>
        )}
      </Link>
    </Box>
  )
}
