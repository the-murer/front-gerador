import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Heading,
  Container,
  Image,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useRef } from 'react'
import {
  LuCode,
  LuCpu,
  LuTerminal,
  LuBinary,
  LuCircuitBoard,
} from 'react-icons/lu'
import {
  ColorModeButton,
  useColorMode,
  useColorModeValue,
} from '@/ui/utils/color-mode'

export const Route = createFileRoute('/')({
  component: App,
})

// Keyframe animations
const scanLine = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`

const glitch = keyframes`
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-2px, 2px); }
  94% { transform: translate(2px, -2px); }
  96% { transform: translate(-2px, -2px); }
  98% { transform: translate(2px, 2px); }
`

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`

const blink = keyframes`
  0%, 50% { border-color: transparent; }
  51%, 100% { border-color: currentColor; }
`

const particleFloat = keyframes`
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
`

const gridMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
`

const dataStream = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`

// Floating particle component
function FloatingParticle({
  delay,
  left,
  size,
}: {
  delay: number
  left: string
  size: number
}) {
  const color = useColorModeValue(
    'rgba(59, 130, 246, 0.6)',
    'rgba(96, 165, 250, 0.6)',
  )

  return (
    <Box
      position="absolute"
      left={left}
      bottom="-20px"
      w={`${size}px`}
      h={`${size}px`}
      bg={color}
      borderRadius="50%"
      animation={`${particleFloat} ${15 + Math.random() * 10}s linear infinite`}
      style={{ animationDelay: `${delay}s` }}
      filter="blur(1px)"
      pointerEvents="none"
    />
  )
}

// Data stream column
function DataStream({ left, delay }: { left: string; delay: number }) {
  const color = useColorModeValue(
    'rgba(59, 130, 246, 0.15)',
    'rgba(96, 165, 250, 0.1)',
  )

  return (
    <Box
      position="absolute"
      left={left}
      top="0"
      w="1px"
      h="200%"
      bg={`linear-gradient(to bottom, transparent, ${color}, transparent)`}
      animation={`${dataStream} ${8 + Math.random() * 4}s linear infinite`}
      style={{ animationDelay: `${delay}s` }}
      pointerEvents="none"
    />
  )
}

// Circuit node
function CircuitNode({
  top,
  left,
  delay,
}: {
  top: string
  left: string
  delay: number
}) {
  const color = useColorModeValue(
    'rgba(59, 130, 246, 0.4)',
    'rgba(96, 165, 250, 0.3)',
  )

  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      w="8px"
      h="8px"
      bg={color}
      borderRadius="50%"
      animation={`${pulse} ${2 + Math.random() * 2}s ease-in-out infinite`}
      style={{ animationDelay: `${delay}s` }}
      pointerEvents="none"
      _after={{
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        w: '20px',
        h: '20px',
        border: '1px solid',
        borderColor: color,
        borderRadius: '50%',
        opacity: 0.5,
      }}
    />
  )
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  // Color values for dark/light mode - BLUE theme
  const bgGradient = useColorModeValue(
    'linear-gradient(135deg, #f0f5ff 0%, #e0ebff 25%, #d4e3ff 50%, #c8dbff 75%, #bcd3ff 100%)',
    'linear-gradient(135deg, #0a0d14 0%, #0d1018 25%, #10141c 50%, #131820 75%, #161c24 100%)',
  )
  const accentColor = useColorModeValue('#3b82f6', '#60a5fa')
  const textColor = useColorModeValue('gray.800', 'white')
  const subtextColor = useColorModeValue('gray.600', 'gray.400')
  const cardBg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(15, 20, 30, 0.8)',
  )
  const cardBorder = useColorModeValue(
    'rgba(59, 130, 246, 0.3)',
    'rgba(96, 165, 250, 0.2)',
  )
  const gridColor = useColorModeValue(
    'rgba(59, 130, 246, 0.08)',
    'rgba(96, 165, 250, 0.05)',
  )
  const scanLineColor = useColorModeValue(
    'rgba(59, 130, 246, 0.05)',
    'rgba(96, 165, 250, 0.03)',
  )

  return (
    <Box
      ref={containerRef}
      minH="100vh"
      maxH="100vh"
      overflow="hidden"
      bg={bgGradient}
      position="relative"
    >
      {/* Animated grid background */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`
          linear-gradient(${gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
        `}
        backgroundSize="50px 50px"
        animation={`${gridMove} 20s linear infinite`}
        opacity={0.8}
        pointerEvents="none"
      />

      {/* Scan line effect */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="4px"
        bg={`linear-gradient(to bottom, transparent, ${scanLineColor}, transparent)`}
        animation={`${scanLine} 3s linear infinite`}
        pointerEvents="none"
      />

      {/* CSS-only mouse follower glow using :hover on pseudo-element */}
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          w: '400px',
          h: '400px',
          borderRadius: '50%',
          bg: `radial-gradient(circle, ${isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(59, 130, 246, 0.15)'} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          left: 'var(--mouse-x, 50%)',
          top: 'var(--mouse-y, 50%)',
          transition:
            'left 0.5s cubic-bezier(0.16, 1, 0.3, 1), top 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        css={{
          '& + *': {
            pointerEvents: 'auto',
          },
        }}
      />

      {/* Mouse tracker - updates CSS variables smoothly */}
      <Box
        position="absolute"
        inset="0"
        pointerEvents="auto"
        zIndex={0}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          document.documentElement.style.setProperty('--mouse-x', `${x}px`)
          document.documentElement.style.setProperty('--mouse-y', `${y}px`)
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.8}
          left={`${Math.random() * 100}%`}
          size={2 + Math.random() * 4}
        />
      ))}

      {/* Data streams */}
      {Array.from({ length: 15 }).map((_, i) => (
        <DataStream key={i} left={`${5 + i * 7}%`} delay={i * 0.5} />
      ))}

      {/* Circuit nodes */}
      <CircuitNode top="15%" left="10%" delay={0} />
      <CircuitNode top="25%" left="85%" delay={0.5} />
      <CircuitNode top="70%" left="15%" delay={1} />
      <CircuitNode top="80%" left="90%" delay={1.5} />
      <CircuitNode top="40%" left="5%" delay={2} />
      <CircuitNode top="60%" left="95%" delay={2.5} />

      {/* Header */}
      <Flex
        as="header"
        position="absolute"
        top="0"
        left="0"
        right="0"
        px={{ base: 4, md: 8 }}
        py={4}
        alignItems="center"
        justifyContent="space-between"
        zIndex={10}
        backdropFilter="blur(10px)"
        bg={useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)')}
        borderBottom="1px solid"
        borderColor={useColorModeValue(
          'rgba(59, 130, 246, 0.2)',
          'rgba(96, 165, 250, 0.1)',
        )}
      >
        <HStack
          gap={3}
          cursor="pointer"
          _hover={{ transform: 'scale(1.02)' }}
          transition="transform 0.2s"
        >
          <Box
            borderRadius="lg"
            boxShadow={`0 0 20px ${isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.3)'}`}
            overflow="hidden"
          >
            <Image
              src="/logo192.png"
              alt="Generator Logo"
              w="40px"
              h="40px"
              objectFit="contain"
            />
          </Box>
          <VStack align="start" gap={0}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
              letterSpacing="wider"
              fontFamily="'JetBrains Mono', 'Fira Code', monospace"
            >
              GENERATOR
            </Text>
            <Text
              fontSize="xs"
              color={subtextColor}
              letterSpacing="widest"
              textTransform="uppercase"
            >
              Projeto Base
            </Text>
          </VStack>
        </HStack>

        {/* Right side - Login link and theme toggle */}
        <HStack gap={4}>
          <ColorModeButton
            _hover={{
              bg: useColorModeValue(
                'rgba(59, 130, 246, 0.1)',
                'rgba(96, 165, 250, 0.1)',
              ),
              transform: 'rotate(180deg)',
            }}
            transition="all 0.3s"
          />
          <Link to="/auth/login">
            <Box
              as="span"
              color={textColor}
              fontWeight="semibold"
              letterSpacing="wide"
              position="relative"
              overflow="hidden"
              px={4}
              py={2}
              borderRadius="md"
              cursor="pointer"
              transition="all 0.3s"
              _hover={{
                color: accentColor,
              }}
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                h: '2px',
                bg: accentColor,
                transform: 'scaleX(0)',
                transition: 'transform 0.3s ease',
              }}
              css={{
                '&:hover::after': {
                  transform: 'scaleX(1)',
                },
              }}
            >
              Entrar
            </Box>
          </Link>
        </HStack>
      </Flex>

      {/* Main content - Hero only */}
      <Flex
        minH="100vh"
        alignItems="center"
        justifyContent="center"
        px={4}
        position="relative"
        zIndex={1}
      >
        <Container maxW="container.lg">
          <VStack align="center" gap={8} textAlign="center">
            {/* Animated terminal icon */}
            <Box animation={`${float} 4s ease-in-out infinite`} mb={2}>
              <Box
                p={5}
                borderRadius="2xl"
                bg={cardBg}
                border="2px solid"
                borderColor={cardBorder}
                backdropFilter="blur(10px)"
                boxShadow={`0 0 40px ${isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`}
              >
                <LuTerminal size={56} color={accentColor} />
              </Box>
            </Box>

            {/* Main heading with glitch effect */}
            <Box position="relative">
              <Heading
                as="h1"
                fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
                fontWeight="black"
                color={textColor}
                letterSpacing="tight"
                lineHeight="1.1"
                animation={`${glitch} 5s ease-in-out infinite`}
                fontFamily="'JetBrains Mono', 'Fira Code', monospace"
              >
                <Text as="span" color={accentColor}>
                  {'>'}
                </Text>{' '}
                GENERATOR
              </Heading>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                color={subtextColor}
                fontWeight="medium"
                mt={3}
                letterSpacing="widest"
                textTransform="uppercase"
              >
                Projeto Base
              </Text>
            </Box>

            {/* Typewriter effect text */}
            <Box
              overflow="hidden"
              borderRight="2px solid"
              borderColor={accentColor}
              animation={`${blink} 1s step-end infinite`}
              pr={1}
            >
              <Text
                fontSize={{ base: 'md', md: 'xl' }}
                color={subtextColor}
                fontFamily="'JetBrains Mono', 'Fira Code', monospace"
                whiteSpace="nowrap"
                overflow="hidden"
                animation={`${typewriter} 3s steps(40) forwards`}
              >
                Inicializando ambiente de desenvolvimento...
              </Text>
            </Box>

            {/* Feature badges */}
            <HStack gap={4} flexWrap="wrap" justify="center" mt={4}>
              {[
                { icon: LuCode, label: 'Geração de Código' },
                { icon: LuCpu, label: 'Powered by IA' },
                { icon: LuBinary, label: 'Build Rápido' },
                { icon: LuCircuitBoard, label: 'Escalável' },
              ].map((item) => (
                <HStack
                  key={item.label}
                  px={5}
                  py={3}
                  borderRadius="full"
                  bg={cardBg}
                  border="1px solid"
                  borderColor={cardBorder}
                  backdropFilter="blur(10px)"
                  cursor="pointer"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: `0 10px 30px ${isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`,
                    borderColor: accentColor,
                  }}
                >
                  <item.icon size={18} color={accentColor} />
                  <Text fontSize="sm" color={textColor} fontWeight="medium">
                    {item.label}
                  </Text>
                </HStack>
              ))}
            </HStack>
          </VStack>
        </Container>
      </Flex>

      {/* Bottom decoration line */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        h="2px"
        bg={`linear-gradient(90deg, transparent, ${accentColor}, transparent)`}
        opacity={0.5}
      />
    </Box>
  )
}
