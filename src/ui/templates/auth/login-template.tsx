import { useIsAuthenticated } from '@/modules/auth/stores/auth-user-store'
import { Box, Card, Flex, Image, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'

export function LoginTemplate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate({ to: '/admin/dashboard' })
  }

  return (
    <Flex
      w="full"
      minH="100vh"
      bg={{ base: 'white', lg: 'gray.50' }}
      alignItems="center"
      justifyContent="center"
      p={{ base: 0, sm: 4, lg: 8 }}
    >
      {children}
    </Flex>
  )
}

const LeftImage = () => {
  return (
    <Box
      display={{ base: 'none', lg: 'flex' }}
      w="50%"
      h="full"
      minH={{ lg: '500px' }}
      borderLeftRadius="xl"
      overflow="hidden"
      position="relative"
    >
      <Image src="/login-hero.png" alt="hero image" objectFit="cover" />
      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.400"
        display="flex"
        alignItems="flex-end"
        p={8}
      >
        <VStack alignItems="flex-start" color="white" gap={2}>
          <Text fontSize="2xl" fontWeight="bold">
            Bem-vindo de volta
          </Text>
          <Text fontSize="md" opacity={0.9}>
            Acesse sua conta para continuar
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

const Form = ({ title, description, children }: LoginFormType) => {
  return (
    <VStack
      w={{ base: 'full', lg: '50%' }}
      h="full"
      minH={{ lg: '500px' }}
      alignItems="center"
      justifyContent="center"
      p={{ base: 6, sm: 8, lg: 12 }}
      gap={6}
    >
      <VStack gap={2} textAlign="center" w="full" maxW="md">
        <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold">
          {title}
        </Text>
        {description && (
          <Text fontSize={{ base: 'sm', sm: 'md' }} color="gray.500">
            {description}
          </Text>
        )}
      </VStack>
      <Box w="full" maxW="md">
        {children}
      </Box>
    </VStack>
  )
}

const Complete = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <LoginTemplate>
      <Card.Root
        w={{ base: 'full', sm: 'full', lg: 'auto' }}
        maxW={{ base: 'full', sm: 'md', lg: '900px' }}
        minH={{ base: '100vh', sm: 'auto', lg: 'auto' }}
        borderRadius={{ base: 0, sm: 'xl', lg: 'xl' }}
        overflow="hidden"
        boxShadow={{ base: 'none', sm: 'lg', lg: 'xl' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        display="flex"
      >
        <LeftImage />
        <Form title={title} description={description}>
          {children}
        </Form>
      </Card.Root>
    </LoginTemplate>
  )
}

LoginTemplate.LeftImage = LeftImage
LoginTemplate.Form = Form
LoginTemplate.Complete = Complete

type LoginFormType = {
  title: string
  description?: string
  children: React.ReactNode
}
