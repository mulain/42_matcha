import { apiClient } from '../lib/api'
import type { LikeRequest, UnlikeRequest, BlockRequest, ReportRequest, ApiResponse } from '../types'

export const interactionService = {
  async likeUser(data: LikeRequest): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(`/api/users/${data.userId}/like`)
    return response.data
  },

  async unlikeUser(data: UnlikeRequest): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(`/api/users/${data.userId}/unlike`)
    return response.data
  },

  async blockUser(data: BlockRequest): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(
      `/api/users/${data.userId}/block`,
      data
    )
    return response.data
  },

  async reportUser(data: ReportRequest): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(
      `/api/users/${data.userId}/report`,
      data
    )
    return response.data
  },
}
