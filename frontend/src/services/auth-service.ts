import { apiClient } from '../lib/api'
import type { LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../types'

export const authService = {
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/register', data)
    return response.data
  },

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/login', data)
    return response.data
  },

  async logout(): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/api/auth/logout')
    return response.data
  },

  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/api/auth/verify-email', { token })
    return response.data
  },

  async resetPassword(email: string): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/api/auth/reset-password', { email })
    return response.data
  },
}
