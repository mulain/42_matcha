import React from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import LoginForm from './forms/LoginForm'
import backgroundImage from '../assets/background.png'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate()
  
  const handleClose = () => {
    onClose()
  }

  const handleSuccess = () => {
    onClose()
    // Navigate to dashboard on successful login
    navigate('/dashboard')
    if (onSuccess) {
      onSuccess()
    }
  }

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked')
    // This could open another modal or navigate to a forgot password page
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Welcome back"
      subtitle="Sign in to your account"
      className="bg-gray-900"
      headerStyle={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <LoginForm
        theme="dark"
        onSuccess={handleSuccess}
        onForgotPassword={handleForgotPassword}
        onSignUp={() => {
          // TODO: Handle registration modal or navigation
          console.log('Sign up clicked')
        }}
      />
    </Modal>
  )
}

export default LoginModal 