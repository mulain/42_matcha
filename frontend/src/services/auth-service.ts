import { apiClient } from '../lib/api'
import type { LoginDTO, RegisterDTO, AuthResponse, ApiResponse } from '../types'

export const authService = {
  async register(data: RegisterDTO): Promise<ApiResponse<AuthResponse>> {
    // Convert to FormData for cookie-based auth
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('username', data.username)
    formData.append('password', data.password)
    formData.append('first_name', data.firstName)
    formData.append('last_name', data.lastName)

    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async login(data: LoginDTO): Promise<ApiResponse<AuthResponse>> {
    // Convert to FormData for cookie-based auth
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async logout(): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/api/auth/logout')
    return response.data
  },

  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    const formData = new FormData()
    formData.append('token', token)

    const response = await apiClient.post<ApiResponse<void>>('/api/auth/verify-email', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async resetPassword(email: string): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/api/auth/reset-password', { email })
    return response.data
  },

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    // Check if auth_token cookie exists
    return document.cookie.split(';').some(cookie => 
      cookie.trim().startsWith('auth_token=')
    )
  },

  // Helper method to get current user ID from cookie
  getCurrentUserId(): string | null {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'auth_token' && value) {
        return value
      }
    }
    return null
  },
}
