import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Generic HTTP methods
export const apiClient = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.get<T>(url, config)
  },

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api.post<T>(url, data, config)
  },

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api.put<T>(url, data, config)
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.delete<T>(url, config)
  },

  // File upload method
  async upload<T>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api.post<T>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    })
  },
}
