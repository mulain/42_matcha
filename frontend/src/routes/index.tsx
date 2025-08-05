import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/landing'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import ProfilePage from '../pages/ProfilePage'
import BrowsePage from '../pages/BrowsePage'
import ChatPage from '../pages/ChatPage'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/browse' element={<BrowsePage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Route>

      {/* Catch all route */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default AppRoutes 