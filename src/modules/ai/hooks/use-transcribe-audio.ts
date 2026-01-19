import { useMutation } from '@tanstack/react-query'
import { aiApi } from '../utils/constants'

export const useTranscribeAudio = () => {
  return useMutation({
    mutationFn: (audio: File) => aiApi.transcribeAudio(audio),
  })
}
