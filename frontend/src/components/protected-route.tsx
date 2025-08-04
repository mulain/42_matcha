import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth-store'
import { authService } from '../services/auth-service'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    // Check authentication status on mount
    checkAuth()
  }, [checkAuth])

  // Show loading while checking authentication
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Check if user is authenticated via cookies
  const isCookieAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated && !isCookieAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
