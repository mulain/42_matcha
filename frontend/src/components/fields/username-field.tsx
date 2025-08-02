import React, { forwardRef } from 'react'

interface UsernameFieldProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  autoComplete?: string
  error?: string
}

const UsernameField = forwardRef<HTMLInputElement, UsernameFieldProps>(
  ({ 
    name = 'username',
    label = 'Username',
    placeholder = 'johndoe',
    required = true,
    value,
    onChange,
    onBlur,
    disabled = false,
    autoComplete = 'username',
    error
  }, ref) => {
    return (
      <div className='space-y-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        <input
          ref={ref}
          type='text'
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
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
        {error && (
          <p className='text-sm text-red-600'>{error}</p>
        )}
      </div>
    )
  }
)

UsernameField.displayName = 'UsernameField'

export default UsernameField 