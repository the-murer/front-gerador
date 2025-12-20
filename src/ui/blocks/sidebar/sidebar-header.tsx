import { Box, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'

import { useColorModeValue } from '@/ui/utils/color-mode'
import { Tooltip } from '@/ui/storybook/tooltip'

export const SidebarHeader = ({
  collapsed,
  toggleCollapsed,
  subtleText,
}: {
  collapsed: boolean
  toggleCollapsed: () => void
  subtleText: string
}) => {
  const brandBg = useColorModeValue('cyan.500', 'cyan.600')

  return (
    <Flex align="center" px={collapsed ? 2 : 4} py={4} gap={3}>
      {collapsed ? (
        <Flex
          boxSize="10"
          borderRadius="lg"
          bg={brandBg}
          align="center"
          justify="center"
          flexShrink={0}
        >
          <Image
            src="/tanstack-circle-logo.png"
            alt="Logo"
            boxSize="6"
            objectFit="contain"
          />
        </Flex>
      ) : (
        <HStack gap={3} minW={0} flex="1">
          <Flex
            h="10"
            px={2}
            borderRadius="lg"
            bg={brandBg}
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Image
              src="/tanstack-circle-logo.png"
              alt="Logo"
              h="7"
              w="auto"
              objectFit="contain"
            />
          </Flex>
          <Box minW={0}>
            <Text fontWeight="semibold" lineClamp={1}>
              Admin
            </Text>
            <Text fontSize="sm" color={subtleText} lineClamp={1}>
              Painel de controle
            </Text>
          </Box>
        </HStack>
      )}

      {!collapsed && (
        <Tooltip
          content="Recolher"
          showArrow
          positioning={{ placement: 'right' }}
          openDelay={250}
        >
          <IconButton
            aria-label="Collapse sidebar"
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            data-sidebar-no-expand="true"
          >
            <ChevronLeft size={18} />
          </IconButton>
        </Tooltip>
      )}
    </Flex>
  )
}
