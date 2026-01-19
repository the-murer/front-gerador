import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Chat, MessageRole } from '../utils/constants'

export type ChatMessage = {
  _id: string
  role: MessageRole
  content: string
  createdAt: string
}

type AiState = {
  currentChat: Chat | null
  messages: ChatMessage[]
  setCurrentChat: (chat: Chat | null) => void
  setMessages: (messages: ChatMessage[]) => void
  addMessage: (message: ChatMessage | ChatMessage[]) => void
  updateMessage: (messageId: string, updates: Partial<ChatMessage>) => void
  removeMessage: (messageId: string) => void
  clearCurrentChat: () => void
  updateCurrentChat: (updates: Partial<Chat>) => void
}

export const useAiStore = create<AiState>()(
  persist(
    (set) => ({
      currentChat: null,
      messages: [],
      setCurrentChat: (chat) => set({ currentChat: chat, messages: [] }),
      setMessages: (messages) => set({ messages }),
      addMessage: (message) => {
        if (Array.isArray(message)) {
          return set((state) => ({
            messages: [...state.messages, ...message],
          }))
        } else {
          set((state) => ({
            messages: [...state.messages, message],
          }))
        }
      },
      updateMessage: (messageId, updates) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg._id === messageId ? { ...msg, ...updates } : msg,
          ),
        })),
      removeMessage: (messageId) =>
        set((state) => ({
          messages: state.messages.filter((msg) => msg._id !== messageId),
        })),
      clearMessages: () => set({ messages: [] }),
      clearCurrentChat: () => set({ currentChat: null, messages: [] }),
      updateCurrentChat: (updates) =>
        set((state) => ({
          currentChat: state.currentChat
            ? { ...state.currentChat, ...updates }
            : null,
        })),
    }),
    { name: 'ai-store' },
  ),
)

export const useChat = () => {
  const store = useAiStore((s) => s)
  return {
    chat: store.currentChat,
    clearChat: store.clearCurrentChat,
    setCurrentChat: store.setCurrentChat,
  }
}

export const useMessages = () => {
  const store = useAiStore((s) => s)
  return {
    messages: store.messages,
    addMessage: store.addMessage,
    setMessages: store.setMessages,
    clearMessages: store.clearCurrentChat,
  }
}

export const useSetCurrentChat = () => {
  return useAiStore((s) => s.setCurrentChat)
}

export const useAddMessage = () => {
  return useAiStore((s) => s.addMessage)
}

export const useClearCurrentChat = () => {
  return useAiStore((s) => s.clearCurrentChat)
}
