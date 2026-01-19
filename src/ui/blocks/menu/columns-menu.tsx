import { Box, Menu, Portal } from '@chakra-ui/react'
import { EllipsisVertical, PencilIcon } from 'lucide-react'

export const ColumnsMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <Menu.Root>
      <Menu.Trigger onClick={(e) => e.stopPropagation()} asChild>
        <Box
          w="30px"
          h="30px"
          borderRadius="sm"
          p={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          bg="gray.900"
          _hover={{ bg: 'gray.700' }}
        >
          <EllipsisVertical size={24} />
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner onClick={(e) => e.stopPropagation()}>
          <Menu.Content>{children}</Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

ColumnsMenu.EditItem = ({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled?: boolean
}) => {
  return (
    <Menu.Item onClick={onClick} value="edit" disabled={disabled}>
      <PencilIcon height={16} width={16} />
      Editar
    </Menu.Item>
  )
}

ColumnsMenu.Item = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) => {
  return (
    <Menu.Item onClick={onClick} value={label}>
      {icon}
      {label}
    </Menu.Item>
  )
}
