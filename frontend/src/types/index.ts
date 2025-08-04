// User types
export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  gender: Gender
  sexualPreference: SexualPreference
  biography: string
  interestTags: string[]
  pictures: Picture[]
  profilePictureId?: string
  fameRating: number
  location: Location
  isOnline: boolean
  lastConnection: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Picture {
  id: string
  url: string
  isProfilePicture: boolean
  createdAt: string
}

export interface Location {
  latitude: number
  longitude: number
  city?: string
  country?: string
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum SexualPreference {
  HETEROSEXUAL = 'heterosexual',
  HOMOSEXUAL = 'homosexual',
  BISEXUAL = 'bisexual',
}

// Authentication types
export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

// Profile update types
export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  gender?: Gender
  sexualPreference?: SexualPreference
  biography?: string
  interestTags?: string[]
  location?: Location
}

// Browsing and search types
export interface BrowseFilters {
  ageRange?: [number, number]
  location?: Location
  fameRatingRange?: [number, number]
  interestTags?: string[]
  gender?: Gender
  sexualPreference?: SexualPreference
}

export interface SearchRequest {
  query: string
  filters?: BrowseFilters
  sortBy?: 'age' | 'location' | 'fameRating' | 'commonTags'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Interaction types
export interface LikeRequest {
  userId: string
}

export interface UnlikeRequest {
  userId: string
}

export interface BlockRequest {
  userId: string
  reason?: string
}

export interface ReportRequest {
  userId: string
  reason: string
  description?: string
}

// Chat types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
  isRead: boolean
}

export interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface SendMessageRequest {
  receiverId: string
  content: string
}

// Notification types
export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  userId?: string
  isRead: boolean
  createdAt: string
}

export enum NotificationType {
  NEW_LIKE = 'new_like',
  PROFILE_VISIT = 'profile_visit',
  NEW_MESSAGE = 'new_message',
  MUTUAL_CONNECTION = 'mutual_connection',
  UNLIKE = 'unlike',
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// WebSocket types
export interface WebSocketMessage {
  type: 'message' | 'notification' | 'like' | 'visit' | 'connection'
  data: unknown
}

// Form types
export interface LoginFormData {
  username: string
  password: string
}

export interface RegisterFormData {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

export interface ProfileFormData {
  firstName: string
  lastName: string
  gender: Gender
  sexualPreference: SexualPreference
  biography: string
  interestTags: string[]
}
