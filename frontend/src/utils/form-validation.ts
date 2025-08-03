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
