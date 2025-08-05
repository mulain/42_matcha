import React from 'react'
import { useModal, modalConfig } from '../services/modal-service'
import Modal from './Modal'
import LoginForm from './forms/LoginForm'
import backgroundImage from '../assets/background.png'

const ModalProvider: React.FC = () => {
  const { activeModal, closeModal, modalData } = useModal()

  if (!activeModal) return null

  const config = modalConfig[activeModal]

  const renderModalContent = () => {
    switch (activeModal) {
      case 'login':
        return (
          <LoginForm
            theme="dark"
            onSuccess={() => {
              closeModal()
              // Optional: Add success callback
              console.log('Login successful!')
            }}
            onForgotPassword={() => {
              // TODO: Open forgot password modal
              console.log('Forgot password clicked')
            }}
            onSignUp={() => {
              // TODO: Open register modal
              console.log('Sign up clicked')
            }}
          />
        )
      
      case 'register':
        return (
          <div className="text-center">
            <p className="text-gray-300">Register form coming soon...</p>
          </div>
        )
      
      case 'forgot-password':
        return (
          <div className="text-center">
            <p className="text-gray-300">Forgot password form coming soon...</p>
          </div>
        )
      
      case 'profile':
        return (
          <div className="text-center">
            <p className="text-gray-300">Profile form coming soon...</p>
          </div>
        )
      
      case 'settings':
        return (
          <div className="text-center">
            <p className="text-gray-300">Settings form coming soon...</p>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <Modal
      isOpen={!!activeModal}
      onClose={closeModal}
      title={config.title}
      subtitle={config.subtitle}
      className={config.className}
      headerStyle={activeModal === 'login' ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      {renderModalContent()}
    </Modal>
  )
}

export default ModalProvider 