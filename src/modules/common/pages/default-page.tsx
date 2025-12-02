import { Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type DefaultPageProps = {
  children: ReactNode
}

export const DefaultPage = ({ children }: DefaultPageProps) => {
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
