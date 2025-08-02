import { validateEmail, validateUsername, validatePassword, validateConfirmPassword, validateName } from './validation'

interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

// React Hook Form resolver for login validation
export const loginResolver = (values: LoginFormData) => {
  const errors: Record<string, { type: string; message: string }> = {}

  const emailError = validateEmail(values.email)
  if (emailError) {
    errors.email = { type: 'validation', message: emailError }
  }

  const passwordError = validatePassword(values.password)
  if (passwordError) {
    errors.password = { type: 'validation', message: passwordError }
  }

  return {
    values,
    errors: Object.keys(errors).length > 0 ? errors : {}
  }
}

// React Hook Form resolver for register validation
export const registerResolver = (values: RegisterFormData) => {
  const errors: Record<string, { type: string; message: string }> = {}

  const emailError = validateEmail(values.email)
  if (emailError) {
    errors.email = { type: 'validation', message: emailError }
  }

  const usernameError = validateUsername(values.username)
  if (usernameError) {
    errors.username = { type: 'validation', message: usernameError }
  }

  const firstNameError = validateName(values.firstName, 'First name')
  if (firstNameError) {
    errors.firstName = { type: 'validation', message: firstNameError }
  }

  const lastNameError = validateName(values.lastName, 'Last name')
  if (lastNameError) {
    errors.lastName = { type: 'validation', message: lastNameError }
  }

  const passwordError = validatePassword(values.password)
  if (passwordError) {
    errors.password = { type: 'validation', message: passwordError }
  }

  const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword)
  if (confirmPasswordError) {
    errors.confirmPassword = { type: 'validation', message: confirmPasswordError }
  }

  return {
    values,
    errors: Object.keys(errors).length > 0 ? errors : {}
  }
}

// Legacy validation functions (keeping for backward compatibility)
export const validateLoginForm = (values: LoginFormData) => {
  const errors: Partial<Record<keyof LoginFormData, string>> = {}

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(values.password)
  if (passwordError) errors.password = passwordError

  return errors
}

export const validateRegisterForm = (values: RegisterFormData) => {
  const errors: Partial<Record<keyof RegisterFormData, string>> = {}

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError

  const usernameError = validateUsername(values.username)
  if (usernameError) errors.username = usernameError

  const firstNameError = validateName(values.firstName, 'First name')
  if (firstNameError) errors.firstName = firstNameError

  const lastNameError = validateName(values.lastName, 'Last name')
  if (lastNameError) errors.lastName = lastNameError

  const passwordError = validatePassword(values.password)
  if (passwordError) errors.password = passwordError

  const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword)
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError

  return errors
} 