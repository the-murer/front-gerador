import { Switch } from '@/ui/components/switch/switch'
import type { ColumnDef } from '@tanstack/react-table'
import type { User } from '../utils/constants'
import { useChangeUserActive } from '../hooks/use-change-user-active'
import { useModal } from '@ebay/nice-modal-react'
import { UpdateUserDialog } from './update-user-dialog'
import { ColumnsMenu } from '@/ui/blocks/menu/columns-menu'

export const useUserColumns = () => {
  const { mutateAsync: changeUserActive } = useChangeUserActive()

  const editUserModal = useModal(UpdateUserDialog)

  return [
    {
      accessorKey: 'active',
      header: 'Ativo',
      cell: ({ getValue, row }) => (
        <Switch
          value={getValue() as boolean}
          onChange={(value) => {
            changeUserActive({ id: row.original._id, active: value })
          }}
        />
      ),
    },
    { accessorKey: 'name', header: 'Nome' },
    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <ColumnsMenu>
          <ColumnsMenu.EditItem
            onClick={() => editUserModal.show({ id: row.original._id })}
          />
        </ColumnsMenu>
      ),
    },
  ] as ColumnDef<User>[]
}
