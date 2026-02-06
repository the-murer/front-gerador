import { ViewPage } from '@/ui/templates/view-page'
import { useParams, useNavigate } from '@tanstack/react-router'
import { useGetUser } from '../hooks/use-get-user'
import { useModal } from '@ebay/nice-modal-react'
import { UpdateUserDialog } from '../components/update-user-dialog'
import { UpdateProfilePictureDialog } from '../components/update-profile-picture-dialog'
import { Switch } from '@/ui/components/switch/switch'
import { useChangeUserActive } from '../hooks/use-change-user-active'
import { formatDate } from '@/common/utils/time-utils'
import { Badge, Flex, HStack } from '@chakra-ui/react'
import { getUserBackgroundColor, getUserInitials } from '../utils/user-utils'
import { Button } from '@/ui/components/button/button'
import { ImageIcon } from 'lucide-react'

const roleLabelMap: Record<string, string> = {
  admin: 'Administrador',
  user: 'Usuário',
}

export const UserPage = () => {
  const { id } = useParams({ from: '/admin/users/$id' })
  const navigate = useNavigate()
  const { data, isLoading } = useGetUser({ id })

  const editUserModal = useModal(UpdateUserDialog)
  const profilePictureModal = useModal(UpdateProfilePictureDialog)
  const { mutateAsync: changeUserActive } = useChangeUserActive()

  return (
    <ViewPage loading={isLoading} action="read" subject="User">
      <ViewPage.Header
        title={data?.name ?? 'Usuário'}
        subtitle={data?.email}
        badge={
          data
            ? {
                label: data.active ? 'Ativo' : 'Inativo',
                colorPalette: data.active ? 'green' : 'red',
              }
            : undefined
        }
        onBack={() => navigate({ to: '/admin/users' })}
        onEdit={() => data && editUserModal.show({ user: data })}
        editPermission={{ action: 'update', subject: 'User' }}
        avatar={
          data && (
            <UserAvatar
              name={data.name}
              profilePictureUrl={data.profilePictureUrl}
            />
          )
        }
        actions={
          <Button
            variant="outline"
            size="md"
            onClick={() => data && profilePictureModal.show({ user: data })}
          >
            <ImageIcon size={16} />
            Foto
          </Button>
        }
      />

      <ViewPage.Section
        title="Informações Gerais"
        description="Dados básicos do usuário"
      >
        <ViewPage.InfoGrid>
          <ViewPage.InfoItem label="Nome" value={data?.name} />
          <ViewPage.InfoItem label="Email" value={data?.email} />
          <ViewPage.InfoItem label="Status">
            <Switch
              value={data?.active ?? false}
              onChange={(value) => {
                if (data) changeUserActive({ id: data._id, active: value })
              }}
            />
          </ViewPage.InfoItem>
        </ViewPage.InfoGrid>
      </ViewPage.Section>

      <ViewPage.Section
        title="Permissões"
        description="Regras atribuídas ao usuário"
      >
        <ViewPage.InfoGrid columns={{ base: 1, md: 1, lg: 1 }}>
          <ViewPage.InfoItem label="Regras">
            <HStack gap="2" flexWrap="wrap" mt="1">
              {data?.roles?.length ? (
                data.roles.map((role) => (
                  <Badge
                    key={role}
                    colorPalette="blue"
                    size="lg"
                    borderRadius="full"
                    px="3"
                    py="1"
                  >
                    {roleLabelMap[role] ?? role}
                  </Badge>
                ))
              ) : (
                <Badge
                  colorPalette="gray"
                  size="lg"
                  borderRadius="full"
                  px="3"
                  py="1"
                >
                  Sem regras
                </Badge>
              )}
            </HStack>
          </ViewPage.InfoItem>
        </ViewPage.InfoGrid>
      </ViewPage.Section>

      <ViewPage.Section
        title="Datas"
        description="Informações de criação e atualização"
      >
        <ViewPage.InfoGrid columns={{ base: 1, md: 2, lg: 2 }}>
          <ViewPage.InfoItem
            label="Criado em"
            value={formatDate(data?.createdAt as unknown as Date, true)}
          />
          <ViewPage.InfoItem
            label="Atualizado em"
            value={formatDate(data?.updatedAt as unknown as Date, true)}
          />
        </ViewPage.InfoGrid>
      </ViewPage.Section>
    </ViewPage>
  )
}

const UserAvatar = ({
  name,
  profilePictureUrl,
}: {
  name: string
  profilePictureUrl?: string
}) => {
  if (profilePictureUrl) {
    return (
      <Flex
        boxSize="14"
        borderRadius="full"
        align="center"
        justify="center"
        flexShrink={0}
        overflow="hidden"
        border="2px solid"
        borderColor="gray.200"
      >
        <img
          src={profilePictureUrl}
          alt={`Foto de ${name}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Flex>
    )
  }

  return (
    <Flex
      boxSize="14"
      borderRadius="full"
      bg={getUserBackgroundColor(name)}
      align="center"
      justify="center"
      flexShrink={0}
      overflow="hidden"
      color="white"
      fontWeight="bold"
      fontSize="lg"
    >
      {getUserInitials(name)}
    </Flex>
  )
}
