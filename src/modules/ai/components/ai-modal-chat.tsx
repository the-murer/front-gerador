import { Dialog, Portal, Box, Input, IconButton } from '@chakra-ui/react'
import { XIcon, SendIcon, PlusIcon, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { MessageRole } from '../utils/constants'
import { useSendMessage } from '../hooks/use-send-message'
import { toaster } from '@/ui/storybook/toaster'
import { useChat, useMessages } from '../stores/use-ai.store'
import { ChatHistory } from './chat-history'
import { useFindChatById } from '../hooks/use-find-chat-by-id'
import { Button } from '@/ui/components/button/button'
import { AudioRecorderButton } from './audio-capture/audio-recorder-button'

// TODO: IMPROVE THIS BY FAR

export const AiModalChat = NiceModal.create(() => {
  const { chat, clearChat } = useChat()
  const { mutateAsync: sendMessage, isPending } = useSendMessage()
  const { data: chatData } = useFindChatById({ id: chat?._id })
  const [message, setMessage] = useState('')
  const { messages, addMessage, setMessages } = useMessages()

  const { visible, remove } = useModal()

  const handleSend = async () => {
    if (!message.trim()) return

    try {
      const randomId = Math.random().toString(36).substr(2, 20)
      addMessage({
        _id: randomId,
        role: MessageRole.USER,
        content: message,
        createdAt: new Date().toISOString(),
      })

      const response = await sendMessage({
        content: message,
        chatId: chat?._id,
      })
      setMessage('')

      addMessage({
        _id: response._id,
        role: MessageRole.ASSISTANT,
        content: response.content,
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      toaster.error({ title: 'Erro ao enviar mensagem' })
      console.error(error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClose = () => {
    clearChat()
    remove()
  }

  useEffect(() => {
    if (chatData) {
      setMessages(chatData.messages)
    }
  }, [chatData])

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-right"
      open={visible}
      onOpenChange={handleClose}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            w="500px"
            h="600px"
            maxH="90vh"
            display="flex"
            flexDirection="column"
            boxShadow="xl"
            borderRadius="lg"
          >
            <Dialog.Header>
              <Dialog.Title display="flex" alignItems="center" gap={2}>
                {chat?.title || 'Incie uma conversa'}
              </Dialog.Title>
              <ChatHistory />
              <Button
                variant="solid"
                colorPalette="blue"
                size="md"
                gap={2}
                onClick={() => clearChat()}
              >
                <PlusIcon />
              </Button>
              <Dialog.CloseTrigger asChild>
                <IconButton variant="ghost" size="lg" aria-label="Fechar">
                  <XIcon size={30} />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body flex="1" overflowY="auto" p={4}>
              <Box display="flex" flexDirection="column" gap={4}>
                {messages.length === 0 ? (
                  <Box
                    textAlign="center"
                    display="flex"
                    h="full"
                    justifyContent="center"
                    alignItems="center"
                    color="gray.500"
                    py={8}
                  >
                    Sobre o que vamos falar hoje?
                  </Box>
                ) : (
                  messages.map((msg) => (
                    <Box
                      key={msg._id}
                      alignSelf={
                        msg.role === MessageRole.USER
                          ? 'flex-end'
                          : 'flex-start'
                      }
                      maxW="80%"
                      p={3}
                      borderRadius="md"
                      bg={
                        msg.role === MessageRole.USER ? 'blue.500' : 'gray.200'
                      }
                      color={msg.role === MessageRole.USER ? 'white' : 'black'}
                    >
                      {msg.content}
                    </Box>
                  ))
                )}
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
              <Box display="flex" w="100%" gap={2}>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  flex="1"
                  disabled={isPending}
                />
                <IconButton
                  onClick={handleSend}
                  aria-label="Enviar mensagem"
                  colorPalette="blue"
                  disabled={isPending}
                  borderRadius="lg"
                >
                  {isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <SendIcon />
                  )}
                </IconButton>
                <AudioRecorderButton onRecordingComplete={setMessage} />
              </Box>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})
