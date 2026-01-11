import { useAuthenticatedUser } from '@/modules/auth/stores/auth-user-store'
import { can } from '@/modules/auth/components/can'
import { Collapsible, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from 'react'
import { FilterIcon, PlusIcon } from 'lucide-react'
import { Button } from '../components/button/button'
import type { Actions, Subjects } from '@/modules/auth/utils/ability.factory'
import { Can } from '@/modules/auth/components/can'

type DefaultPageProps = {
  children: ReactNode
  action?: Actions
  subject?: Subjects
  viewPermission?: { action: Actions; subject: Subjects }
}

export const DefaultPage = ({ children, viewPermission }: DefaultPageProps) => {
  const { authenticatedUser } = useAuthenticatedUser()

  if (viewPermission) {
    if (can(authenticatedUser, viewPermission.action, viewPermission.subject)) {
      return <Stack p="40px">{children}</Stack>
    }
    return null
  }
  return <Stack p="40px">{children}</Stack>
}

type PageHeaderProps = {
  title: string
  description?: string
  onActionClick?: () => void
  children?: ReactNode
  createPermission?: { action: Actions; subject: Subjects }
}

const PageHeader = ({
  title,
  description,
  children,
  onActionClick,
  createPermission,
}: PageHeaderProps) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <VStack>
      <HStack w="full" justify="space-between">
        <Stack>
          <Heading spaceX="2" size="4xl">
            {title}
          </Heading>
          {description && <Heading size="lg">{description}</Heading>}
        </Stack>
        <HStack>
          {!!children && <PageFilters setShowFilters={setShowFilters} />}
          {onActionClick && createPermission ? (
            <Can
              action={createPermission.action}
              subject={createPermission.subject}
            >
              <ActionComponent onClick={onActionClick} />
            </Can>
          ) : onActionClick ? (
            <ActionComponent onClick={onActionClick} />
          ) : null}
        </HStack>
      </HStack>
      <Collapsible.Root w="full" p="4" open={showFilters}>
        <Collapsible.Content w="full">{children}</Collapsible.Content>
      </Collapsible.Root>
    </VStack>
  )
}

const PageFilters = ({
  setShowFilters,
}: {
  setShowFilters: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Button onClick={() => setShowFilters((prev) => !prev)}>
      <FilterIcon />
      Filtrar
    </Button>
  )
}

const ActionComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick} variant="solid" colorPalette="blue">
      <PlusIcon />
      Adicionar
    </Button>
  )
}

DefaultPage.Header = PageHeader
DefaultPage.ActionComponent = ActionComponent
