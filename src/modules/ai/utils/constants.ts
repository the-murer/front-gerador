import type { PaginatedParams, PaginatedResponse } from '@/common/api/api-types'
import { DefaultEndpoint } from '@/common/api/base-endpoint'
import type { AxiosResponse } from 'axios'

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export type Chat = {
  _id: string
  title: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type Message = {
  _id: string
  role: MessageRole
  content: string
  versions?: string[]
  chatId: string
  createdAt: string
  updatedAt: string
}

class AiEndpoints extends DefaultEndpoint<Chat> {
  constructor() {
    super('ai', 'ai')
  }

  async findChats(params: PaginatedParams): Promise<PaginatedResponse<Chat>> {
    return this.api
      .get<PaginatedResponse<Chat>>(`${this.basePath}/chats`, { params })
      .then((r: AxiosResponse<PaginatedResponse<Chat>>) => r.data)
  }

  async findChatById(id: string): Promise<{ chat: Chat; messages: Message[] }> {
    return this.api
      .get<{ chat: Chat; messages: Message[] }>(`${this.basePath}/chats/${id}`)
      .then((r: AxiosResponse<{ chat: Chat; messages: Message[] }>) => r.data)
  }

  async sendMessage(data: {
    chatId?: string
    content: string
  }): Promise<Message> {
    return this.api
      .post<Message>(`${this.basePath}/message`, data)
      .then((r: AxiosResponse<Message>) => r.data)
  }

  async transcribeAudio(audio: File): Promise<string> {
    const formData = new FormData()
    formData.append('audio', audio)
    return this.api
      .post<string>(`${this.basePath}/transcribe`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r: AxiosResponse<string>) => r.data)
  }
}

export const aiApi = new AiEndpoints()
