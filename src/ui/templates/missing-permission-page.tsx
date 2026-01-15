import { VStack, Heading, Text, Box } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { HomeIcon, LockIcon } from 'lucide-react'
import { Button } from '../components/button/button'

export function MissingPermissionPage() {
  const navigate = useNavigate()

  return (
    <Box
      w="full"
      h="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
    >
      <VStack gap={8} textAlign="center" px={4} maxW="600px">
        <Box
          color="gray.400"
          _dark={{ color: 'gray.600' }}
          transform="scale(2)"
          mb={8}
        >
          <LockIcon size={80} />
        </Box>

        <VStack gap={4}>
          <Heading
            size="4xl"
            fontWeight="bold"
            bgGradient="to-r"
            gradientFrom="blue.500"
            gradientTo="purple.500"
            bgClip="text"
            lineHeight="1"
          >
            Acesso negado
          </Heading>

          <Heading
            size="xl"
            fontWeight="semibold"
            color="gray.700"
            _dark={{ color: 'gray.300' }}
          >
            Você não tem permissão para acessar esta página.
          </Heading>

          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            maxW="md"
          >
            Por favor, contate o suporte para obter assistência.
          </Text>
        </VStack>

        <Button
          onClick={() => navigate({ to: '/admin/dashboard' })}
          variant="solid"
          colorPalette="blue"
          size="lg"
        >
          <HomeIcon size={20} />
          Voltar para o início
        </Button>
      </VStack>
    </Box>
  )
}
