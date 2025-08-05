import React, { forwardRef } from 'react'

interface EmailFieldProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: string
  theme?: 'light' | 'dark'
}

const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  ({ 
    name = 'email',
    label = 'Email',
    placeholder = 'your@email.com',
    required = true,
    value,
    onChange,
    onBlur,
    disabled = false,
    error,
    theme = 'light'
  }, ref) => {
    const isDark = theme === 'dark'
    
    return (
      <div className='space-y-2'>
        <label htmlFor={name} className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        <input
          ref={ref}
          type='email'
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete='email'
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
        {error && (
          <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
        )}
      </div>
    )
  }
)

EmailField.displayName = 'EmailField'

export default EmailField 