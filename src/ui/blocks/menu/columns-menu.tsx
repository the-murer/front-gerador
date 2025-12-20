import { Menu, Portal } from '@chakra-ui/react'
import { EllipsisVertical, PencilIcon } from 'lucide-react'

export const ColumnsMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <EllipsisVertical size={24} />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>{children}</Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

ColumnsMenu.EditItem = ({ onClick }: { onClick: () => void }) => {
  return (
    <Menu.Item onClick={onClick} value="edit">
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
