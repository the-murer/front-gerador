import { useAuthenticatedUser } from '@/modules/auth/stores/auth-user-store'
import { can } from '@/modules/auth/components/can'
import { Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type DefaultPageProps = {
  children: ReactNode
  entity?: string
  action?: string
}

export const DefaultPage = ({ children, entity, action }: DefaultPageProps) => {
  const { authenticatedUser } = useAuthenticatedUser()

  if (entity && action) {
    if (can(authenticatedUser, entity, action)) {
      return <Stack p="40px">{children}</Stack>
    }
    return null
  }
  return <Stack p="40px">{children}</Stack>
}

type PageHeaderProps = {
  title: string
  description?: string
  actionComponent?: ReactNode
  children?: ReactNode
}

const PageHeader = ({
  title,
  description,
  actionComponent,
  children,
}: PageHeaderProps) => {
  return (
    <VStack>
      <HStack w="full" justify="space-between">
        <Stack>
          <Heading size="4xl">{title}</Heading>
          {description && <Heading size="lg">{description}</Heading>}
        </Stack>
        {actionComponent}
      </HStack>
      {children}
    </VStack>
  )
}

DefaultPage.Header = PageHeader
