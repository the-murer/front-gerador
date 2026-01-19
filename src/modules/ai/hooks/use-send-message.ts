import { useMutation } from '@tanstack/react-query'
import { aiApi } from '../utils/constants'

export const useSendMessage = () => {

  return useMutation({
    mutationFn: (input: { chatId?: string; content: string }) =>
      aiApi.sendMessage(input),
  })
}
