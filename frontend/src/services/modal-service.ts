import { create } from 'zustand'

export type ModalType = 'login' | 'register' | 'forgot-password' | 'profile' | 'settings'

interface ModalState {
  activeModal: ModalType | null
  modalData: Record<string, any>
  openModal: (type: ModalType, data?: Record<string, any>) => void
  closeModal: () => void
  setModalData: (data: Record<string, any>) => void
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: {},
  openModal: (type: ModalType, data = {}) => {
    set({ activeModal: type, modalData: data })
  },
  closeModal: () => {
    set({ activeModal: null, modalData: {} })
  },
  setModalData: (data: Record<string, any>) => {
    set((state) => ({ modalData: { ...state.modalData, ...data } }))
  }
}))

// Modal configuration for different types
export const modalConfig = {
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to your account',
    size: 'md' as const,
    className: 'bg-gray-900'
  },
  register: {
    title: 'Create your account',
    subtitle: 'Join the Matcha community',
    size: 'md' as const,
    className: 'bg-gray-900'
  },
  'forgot-password': {
    title: 'Reset your password',
    subtitle: 'Enter your email to receive reset instructions',
    size: 'sm' as const,
    className: 'bg-gray-900'
  },
  profile: {
    title: 'Edit Profile',
    subtitle: 'Update your information',
    size: 'lg' as const,
    className: 'bg-gray-900'
  },
  settings: {
    title: 'Settings',
    subtitle: 'Manage your preferences',
    size: 'md' as const,
    className: 'bg-gray-900'
  }
} as const

// Hook for easy modal usage
export const useModal = () => {
  const { activeModal, modalData, openModal, closeModal, setModalData } = useModalStore()
  
  return {
    activeModal,
    modalData,
    openModal,
    closeModal,
    setModalData,
    isModalOpen: (type: ModalType) => activeModal === type,
    openLoginModal: (data?: Record<string, any>) => openModal('login', data),
    openRegisterModal: (data?: Record<string, any>) => openModal('register', data),
    openForgotPasswordModal: (data?: Record<string, any>) => openModal('forgot-password', data),
    openProfileModal: (data?: Record<string, any>) => openModal('profile', data),
    openSettingsModal: (data?: Record<string, any>) => openModal('settings', data)
  }
} 