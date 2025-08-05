import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordFieldProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  showPasswordToggle?: boolean
  error?: string
  theme?: 'light' | 'dark'
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ 
    name = 'password',
    label = 'Password',
    placeholder = '••••••••',
    required = true,
    value,
    onChange,
    onBlur,
    disabled = false,
    showPasswordToggle = true,
    error,
    theme = 'light'
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isDark = theme === 'dark'

    return (
      <div className='space-y-2'>
        <label htmlFor={name} className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        <div className='relative'>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            autoComplete='current-password'
            className={`
              w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              ${error 
                ? isDark 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : isDark 
                  ? 'border-gray-600' 
                  : 'border-gray-300'
              }
              ${disabled 
                ? isDark 
                  ? 'bg-gray-800 cursor-not-allowed text-gray-400' 
                  : 'bg-gray-100 cursor-not-allowed'
                : isDark 
                  ? 'bg-gray-800 text-white placeholder-gray-400' 
                  : 'bg-white'
              }
            `}
          />
          {showPasswordToggle && (
            <button
              type='button'
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
            </button>
          )}
        </div>
        {error && (
          <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
        )}
      </div>
    )
  }
)

PasswordField.displayName = 'PasswordField'

export default PasswordField 