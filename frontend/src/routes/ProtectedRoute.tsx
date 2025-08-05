import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth-store'
import { authService } from '../services/auth-service'

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const isCookieAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated && !isCookieAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
