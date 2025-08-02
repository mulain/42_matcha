import React, { forwardRef } from 'react'
import ValidatedInput from '../validated-input'
import { validatePassword } from '../../utils/validation'

interface PasswordFieldProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  autoComplete?: string
  showPasswordToggle?: boolean
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
    autoComplete = 'current-password',
    showPasswordToggle = true
  }, ref) => {
    return (
      <ValidatedInput
        ref={ref}
        label={label}
        type='password'
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
        validator={validatePassword}
        showPasswordToggle={showPasswordToggle}
      />
    )
  }
)

PasswordField.displayName = 'PasswordField'

export default PasswordField 