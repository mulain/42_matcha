import React, { forwardRef } from 'react'
import ValidatedInput from '../validated-input'
import { validateUsername } from '../../utils/validation'

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
    autoComplete = 'username'
  }, ref) => {
    return (
      <ValidatedInput
        ref={ref}
        label={label}
        type='text'
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
        validator={validateUsername}
      />
    )
  }
)

UsernameField.displayName = 'UsernameField'

export default UsernameField 