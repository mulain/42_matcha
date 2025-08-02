import React, { forwardRef } from 'react'
import ValidatedInput from '../validated-input'
import { validateConfirmPassword } from '../../utils/validation'

interface ConfirmPasswordFieldProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  value?: string
  password?: string // The original password to compare against
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  autoComplete?: string
  showPasswordToggle?: boolean
}

const ConfirmPasswordField = forwardRef<HTMLInputElement, ConfirmPasswordFieldProps>(
  ({ 
    name = 'confirmPassword',
    label = 'Confirm Password',
    placeholder = '••••••••',
    required = true,
    value,
    password = '',
    onChange,
    onBlur,
    disabled = false,
    autoComplete = 'new-password',
    showPasswordToggle = true
  }, ref) => {
    const validator = (value: string) => validateConfirmPassword(password, value)

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
        validator={validator}
        showPasswordToggle={showPasswordToggle}
      />
    )
  }
)

ConfirmPasswordField.displayName = 'ConfirmPasswordField'

export default ConfirmPasswordField 