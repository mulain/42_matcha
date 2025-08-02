import React, { forwardRef } from 'react'
import ValidatedInput from '../validated-input'
import { validateEmail } from '../../utils/validation'

interface EmailFieldProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  autoComplete?: string
}

const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  ({ 
    name = 'email',
    label = 'Email',
    placeholder = 'john@example.com',
    required = true,
    value,
    onChange,
    onBlur,
    disabled = false,
    autoComplete = 'email'
  }, ref) => {
    return (
      <ValidatedInput
        ref={ref}
        label={label}
        type='email'
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
        validator={validateEmail}
      />
    )
  }
)

EmailField.displayName = 'EmailField'

export default EmailField 