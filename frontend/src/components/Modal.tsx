import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  subtitle?: string
  showCloseButton?: boolean
  className?: string
  backdropClassName?: string
  headerClassName?: string
  headerStyle?: React.CSSProperties
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  showCloseButton = true,
  className = '',
  backdropClassName = '',
  headerClassName = '',
  headerStyle = {}
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isBackdropVisible, setIsBackdropVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Show both modal content and backdrop immediately
      setIsVisible(true)
      setIsBackdropVisible(true)
    } else {
      // Hide backdrop first
      setIsBackdropVisible(false)
      // Hide modal content after backdrop transition
      setTimeout(() => setIsVisible(false), 200)
    }
  }, [isOpen])

  if (!isOpen && !isBackdropVisible) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with smooth blur transition */}
      <div 
        className={`
          fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm
          transition-opacity duration-300 ease-out
          ${isBackdropVisible ? 'opacity-100' : 'opacity-0'}
          ${backdropClassName}
        `}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-[10vh]">
        <div 
          className={`
            relative w-full max-w-md transform overflow-hidden rounded-lg bg-gray-900 shadow-xl 
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
            ${className}
          `}
        >
          {/* Header */}
          {title && (
            <div 
              className={`flex items-center justify-between p-6 border-b border-gray-700 relative overflow-hidden ${headerClassName}`}
              style={headerStyle}
            >
              {/* Overlay for better text contrast - only on header */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              <div className="relative z-10 flex items-center justify-between w-full">
                <div>
                  <h2 className="text-2xl font-bold text-white">{title}</h2>
                  {subtitle && (
                    <p className="text-sm text-gray-300 mt-1">{subtitle}</p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-white hover:bg-opacity-20 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal 