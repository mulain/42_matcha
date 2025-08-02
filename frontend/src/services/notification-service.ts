import { apiClient } from '../lib/api'
import type { Notification, ApiResponse } from '../types'

export const notificationService = {
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    const response = await apiClient.get<ApiResponse<Notification[]>>('/api/notifications')
    return response.data
  },

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(
      `/api/notifications/read/${notificationId}`
    )
    return response.data
  },

  async markAllNotificationsAsRead(): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/api/notifications/read')
    return response.data
  },
}
