import { Switch } from '@/ui/components/switch/switch'
import type { ColumnDef } from '@tanstack/react-table'
import type { User } from '../utils/constants'
import { useChangeUserActive } from '../hooks/use-change-user-active'
import { useModal } from '@ebay/nice-modal-react'
import { UpdateUserDialog } from './update-user-dialog'
import { ColumnsMenu } from '@/ui/blocks/menu/columns-menu'
import { Typography } from '@/ui/components/typography/typography'
import { formatDate } from '@/common/utils/time-utils'

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
      accessorKey: 'createdAt',
      header: 'Criado em',
      cell: ({ getValue }) => (
        <Typography>{formatDate(getValue() as Date)}</Typography>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <ColumnsMenu>
          <ColumnsMenu.EditItem
            onClick={() => editUserModal.show({ user: row.original })}
          />
        </ColumnsMenu>
      ),
    },
  ] as ColumnDef<User>[]
}
