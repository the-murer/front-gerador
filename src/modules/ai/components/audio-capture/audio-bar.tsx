import { HStack, Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

export const AudioBars = ({
  isActive,
  stream,
}: {
  isActive: boolean
  stream: MediaStream | null
}) => {
  const animationFrameRef = useRef<number | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(5).fill(0.2))

  useEffect(() => {
    if (!isActive || !stream) {
      setAudioLevels(Array(5).fill(0.2))
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      analyserRef.current = null
      return
    }

    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 32
      analyser.smoothingTimeConstant = 0.8

      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateLevels = () => {
        if (!isActive || !analyserRef.current) return

        analyserRef.current.getByteFrequencyData(dataArray)

        // Dividir os dados em 5 barras
        const barCount = 5
        const samplesPerBar = Math.floor(dataArray.length / barCount)
        const levels: number[] = []

        for (let i = 0; i < barCount; i++) {
          let sum = 0
          for (let j = 0; j < samplesPerBar; j++) {
            sum += dataArray[i * samplesPerBar + j]
          }
          const avg = sum / samplesPerBar
          // Normalizar para 0-1 e adicionar um mínimo para sempre ter alguma animação
          levels.push(Math.min(1, (avg / 255) * 2 + 0.2))
        }

        setAudioLevels(levels)
        animationFrameRef.current = requestAnimationFrame(updateLevels)
      }

      updateLevels()
    } catch (error) {
      console.error('Erro ao analisar áudio:', error)
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      analyserRef.current = null
    }
  }, [isActive, stream])

  return (
    <HStack gap={1} align="flex-end" h="20px">
      {audioLevels.map((level, index) => (
        <Box
          key={index}
          w="3px"
          bg="blue.500"
          borderRadius="full"
          transition="height 0.1s ease-out"
          style={{
            height: `${level * 100}%`,
            minHeight: '4px',
          }}
        />
      ))}
    </HStack>
  )
}
