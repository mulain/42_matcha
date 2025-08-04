import React from 'react'
import { X } from 'lucide-react'
import LoginForm from './forms/login-form'
import backgroundImage from '../assets/background.png'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const handleClose = () => {
    onClose()
  }

  const handleSuccess = () => {
    onClose()
    if (onSuccess) {
      onSuccess()
    }
  }

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked')
    // This could open another modal or navigate to a forgot password page
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-[10vh]">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-gray-900 shadow-xl transition-all">
          {/* Header */}
          <div 
            className="flex items-center justify-between p-6 border-b border-gray-200 relative overflow-hidden"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Content with proper z-index */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                <p className="text-sm text-gray-200 mt-1">Sign in to your account</p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-gray-900">
            <LoginForm
              theme="dark"
              onSuccess={handleSuccess}
              onForgotPassword={handleForgotPassword}
              onSignUp={() => {
                // TODO: Handle registration modal or navigation
                console.log('Sign up clicked')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal 