import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface ValidatedInputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  name: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  autoComplete?: string
  validator?: (value: string) => string | null
  showPasswordToggle?: boolean
}

const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ 
    label, 
    type = 'text', 
    name, 
    placeholder, 
    required = false, 
    value, 
    onChange, 
    onBlur, 
    disabled = false, 
    autoComplete,
    validator,
    showPasswordToggle = false
  }, ref) => {
    const [error, setError] = useState<string>('')
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Clear error when user starts typing
      if (error) {
        setError('')
      }
      onChange?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Validate on blur if validator is provided
      if (validator) {
        const validationError = validator(e.target.value)
        setError(validationError || '')
      }
      onBlur?.(e)
    }

    const inputType = type === 'password' && showPasswordToggle ? (showPassword ? 'text' : 'password') : type

    return (
      <div className='space-y-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        <div className='relative'>
          <input
            ref={ref}
            type={inputType}
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            autoComplete={autoComplete}
            className={`
              w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              ${error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300'
              }
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            `}
          />
          {showPasswordToggle && type === 'password' && (
            <button
              type='button'
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
            </button>
          )}
        </div>
        {error && (
          <p className='text-sm text-red-600'>{error}</p>
        )}
      </div>
    )
  }
)

ValidatedInput.displayName = 'ValidatedInput'

export default ValidatedInput 