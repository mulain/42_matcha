import { apiClient } from '../lib/api'
import type { Conversation, Message, SendMessageRequest, ApiResponse } from '../types'

export const chatService = {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    const response = await apiClient.get<ApiResponse<Conversation[]>>('/api/chat/conversations')
    return response.data
  },

  async getMessages(userId: string): Promise<ApiResponse<Message[]>> {
    const response = await apiClient.get<ApiResponse<Message[]>>(
      `/api/chat/conversations/${userId}/messages`
    )
    return response.data
  },

  async sendMessage(data: SendMessageRequest): Promise<ApiResponse<Message>> {
    const response = await apiClient.post<ApiResponse<Message>>(
      `/api/chat/conversations/${data.receiverId}/messages`,
      data
    )
    return response.data
  },
}
