import { apiClient } from '../lib/api'
import type { ApiResponse } from '../types'

export const healthService = {
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    const response = await apiClient.get<ApiResponse<{ status: string }>>('/health')
    return response.data
  },
}
