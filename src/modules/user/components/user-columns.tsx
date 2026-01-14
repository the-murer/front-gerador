import { Switch } from '@/ui/components/switch/switch'
import type { ColumnDef } from '@tanstack/react-table'
import type { User } from '../utils/constants'
import { useChangeUserActive } from '../hooks/use-change-user-active'
import { useModal } from '@ebay/nice-modal-react'
import { UpdateUserDialog } from './update-user-dialog'
import { ColumnsMenu } from '@/ui/blocks/menu/columns-menu'
import { Typography } from '@/ui/components/typography/typography'
import { formatDate } from '@/common/utils/time-utils'
import { useAbility } from '@/modules/auth/stores/auth-user-store'
import { Flex } from '@chakra-ui/react'
import { getUserBackgroundColor, getUserInitials } from '../utils/user-utils'
import { ImageIcon } from 'lucide-react'
import { UpdateProfilePictureDialog } from './update-profile-picture-dialog'

export const useUserColumns = () => {
  const { mutateAsync: changeUserActive } = useChangeUserActive()
  const ability = useAbility()
  const editUserModal = useModal(UpdateUserDialog)
  const updateProfilePictureModal = useModal(UpdateProfilePictureDialog)
  const canUpdateUser = ability.can('update', 'User')

  return [
    {
      accessorKey: 'active',
      header: 'Ativo',
      cell: ({ getValue, row }) => (
        <Switch
          disabled={!canUpdateUser}
          value={getValue() as boolean}
          onChange={(value) => {
            changeUserActive({ id: row.original._id, active: value })
          }}
        />
      ),
    },
    {
      accessorKey: 'profilePicture',
      header: 'Foto de perfil',
      cell: ({ row }) => {
        if (row.original.profilePictureUrl) {
          return (
            <Flex
              boxSize="10"
              borderRadius="full"
              align="center"
              justify="center"
              flexShrink={0}
              overflow="hidden"
            >
              <img src={row.original.profilePictureUrl} alt="Foto de perfil" />
            </Flex>
          )
        }
        return (
          <Flex
            boxSize="10"
            borderRadius="full"
            bg={getUserBackgroundColor(row.original.name)}
            align="center"
            justify="center"
            flexShrink={0}
            overflow="hidden"
          >
            {getUserInitials(row.original.name)}
          </Flex>
        )
      },
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
            disabled={!canUpdateUser}
            onClick={() => editUserModal.show({ user: row.original })}
          />
          <ColumnsMenu.Item
            icon={<ImageIcon height={16} width={16} />}
            label="Foto de perfil"
            onClick={() =>
              updateProfilePictureModal.show({ user: row.original })
            }
          />
        </ColumnsMenu>
      ),
    },
  ] as ColumnDef<User>[]
}
