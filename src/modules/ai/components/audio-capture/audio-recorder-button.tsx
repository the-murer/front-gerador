import { IconButton, HStack, Text } from '@chakra-ui/react'
import { CheckIcon, MicIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranscribeAudio } from '../../hooks/use-transcribe-audio'
import { AudioBars } from './audio-bar'

type AudioRecorderButtonProps = {
  onRecordingComplete: (audio: string) => void
}

export const AudioRecorderButton = ({
  onRecordingComplete,
}: AudioRecorderButtonProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const { mutateAsync: transcribeAudio, isPending } = useTranscribeAudio()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRecording) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000)
    } else {
      setSeconds(0)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      mediaRecorder.start(1000)
      setIsRecording(true)
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error)
    }
  }

  const handleCancel = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop()
    }
    stopStream()
    setIsRecording(false)
    audioChunksRef.current = []
  }

  const handleConfirm = async () => {
    if (!mediaRecorderRef.current) return

    const recorder = mediaRecorderRef.current
    if (recorder.state === 'inactive') return

    const chunksPromise = new Promise<Blob[]>((resolve) => {
      const chunks: Blob[] = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }

      recorder.onstop = () => {
        resolve(chunks)
      }

      recorder.stop()
    })

    setIsRecording(false)
    stopStream()

    try {
      const chunks = await chunksPromise
      if (chunks.length === 0) {
        console.error('Nenhum chunk de áudio capturado')
        return
      }

      const audioBlob = new Blob(chunks, { type: 'audio/webm' })
      const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' })
      const result = await transcribeAudio(file)
      onRecordingComplete(result)
    } catch (error) {
      console.error('Erro ao transcrever:', error)
    } finally {
      audioChunksRef.current = []
    }
  }

  if (!isRecording) {
    return (
      <IconButton
        variant="solid"
        colorPalette="blue"
        size="md"
        gap={2}
        onClick={handleStartRecording}
        disabled={isPending}
        borderRadius="lg"
      >
        <MicIcon size={18} />
      </IconButton>
    )
  }

  return (
    <HStack gap={3} align="center">
      <IconButton
        variant="outline"
        colorPalette="red"
        size="sm"
        onClick={handleCancel}
        borderRadius="lg"
      >
        <XIcon size={16} />
      </IconButton>
      <HStack gap={2} align="center">
        <AudioBars isActive={isRecording} stream={streamRef.current} />
        <Text fontSize="sm" fontWeight="bold" color="red.500" minW="40px">
          {formatTime(seconds)}
        </Text>
      </HStack>
      <IconButton
        variant="solid"
        colorPalette="green"
        size="sm"
        onClick={handleConfirm}
        disabled={isPending}
        borderRadius="lg"
      >
        <CheckIcon size={16} />
      </IconButton>
    </HStack>
  )
}
