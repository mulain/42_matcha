import { apiClient } from '../lib/api'
import type {
  User,
  UpdateProfileRequest,
  BrowseFilters,
  SearchRequest,
  PaginatedResponse,
  ApiResponse,
} from '../types'

export const userService = {
  async getProfile(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>('/api/users/profile')
    return response.data
  },

  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<User>> {
    const response = await apiClient.put<ApiResponse<User>>('/api/users/profile', data)
    return response.data
  },

  async uploadPictures(files: File[]): Promise<ApiResponse<{ pictures: unknown[] }>> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('pictures', file)
    })

    const response = await apiClient.upload<ApiResponse<{ pictures: unknown[] }>>(
      '/api/users/profile/pictures',
      formData
    )
    return response.data
  },

  async deletePicture(pictureId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/api/users/profile/pictures/${pictureId}`
    )
    return response.data
  },

  async browseUsers(
    filters?: BrowseFilters,
    page = 1,
    limit = 20
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, JSON.stringify(value))
        }
      })
    }
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(
      `/api/users/browse?${params}`
    )
    return response.data
  },

  async searchUsers(searchData: SearchRequest): Promise<ApiResponse<PaginatedResponse<User>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(
      '/api/users/search',
      { params: searchData }
    )
    return response.data
  },

  async getUserProfile(userId: string): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>(`/api/users/${userId}`)
    return response.data
  },

  async recordVisit(userId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(`/api/users/${userId}/visit`)
    return response.data
  },
}
