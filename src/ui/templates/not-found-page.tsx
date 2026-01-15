import { VStack, Heading, Text, Box } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { HomeIcon, SearchXIcon } from 'lucide-react'
import { Button } from '../components/button/button'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box
      w="full"
      h="full"
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
          <SearchXIcon size={80} />
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
            404
          </Heading>

          <Heading
            size="xl"
            fontWeight="semibold"
            color="gray.700"
            _dark={{ color: 'gray.300' }}
          >
            Página não encontrada
          </Heading>

          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            maxW="md"
          >
            Desculpe, a página que você está procurando não existe ou foi
            movida.
          </Text>
        </VStack>

        <Button
          onClick={() => navigate({ to: '/' })}
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
