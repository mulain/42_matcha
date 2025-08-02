import React, { forwardRef } from 'react'
import ValidatedInput from '../validated-input'
import { validateName } from '../../utils/validation'

interface NameFieldProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  autoComplete?: string
  fieldName?: string // For validation message (e.g., "First name", "Last name")
}

const NameField = forwardRef<HTMLInputElement, NameFieldProps>(
  ({ 
    name = 'name',
    label = 'Name',
    placeholder = 'John',
    required = true,
    value,
    onChange,
    onBlur,
    disabled = false,
    autoComplete = 'given-name',
    fieldName
  }, ref) => {
    const validator = (value: string) => validateName(value, fieldName || label)

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
        validator={validator}
      />
    )
  }
)

NameField.displayName = 'NameField'

export default NameField 