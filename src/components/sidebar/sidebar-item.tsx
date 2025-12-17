import { Box, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { Tooltip } from '../storybook/tooltip'
import { useColorModeValue } from '@/modules/common/components/ui/color-mode'
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
    <Tooltip
      key={to}
      content={title}
      disabled={!collapsed}
      showArrow
      positioning={{ placement: 'right' }}
      openDelay={250}
    >
      <Box
        asChild
        display="flex"
        alignItems="center"
        justifyContent={collapsed ? 'center' : 'flex-start'}
        gap={collapsed ? 0 : 3}
        px={collapsed ? 0 : 3}
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
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          to={to}
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
    </Tooltip>
  )
}
