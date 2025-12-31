import { useIsAuthenticated } from '@/modules/auth/stores/auth-user-store'
import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'

export function LoginTemplate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate({ to: '/admin/dashboard' })
  }

  return (
    <HStack w="full" h="100vh" overflowY="hidden">
      {children}
    </HStack>
  )
}

const LeftImage = () => {
  return (
    <VStack h="100%" w="60%" hideBelow="md">
      <Image src="../../../../../public/login-hero.png" height="100vh" />
    </VStack>
  )
}

const Form = ({ title, description, children }: LoginFormType) => {
  return (
    <VStack h="100%" w="40%" alignItems="center" justifyContent="center">
      <VStack>
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        {description && (
          <Text fontSize="md" color="gray.500">
            {description}
          </Text>
        )}
      </VStack>
      {children}
    </VStack>
  )
}

LoginTemplate.LeftImage = LeftImage
LoginTemplate.Form = Form

type LoginFormType = {
  title: string
  description?: string
  children: React.ReactNode
}
