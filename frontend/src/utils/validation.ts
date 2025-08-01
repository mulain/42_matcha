export interface ValidationError {
  field: string
  message: string
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return 'Email is required'
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  return null
}

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required'
  if (username.length < 3) return 'Username must be at least 3 characters long'
  if (username.length > 20) return 'Username must be less than 20 characters'
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores'
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters long'
  if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter'
  if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter'
  if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number'
  return null
}

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return null
}

export const validateName = (name: string, fieldName: string): string | null => {
  if (!name) return `${fieldName} is required`
  if (name.length < 2) return `${fieldName} must be at least 2 characters long`
  if (name.length > 50) return `${fieldName} must be less than 50 characters`
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`
  return null
}

// Type-safe validation function using generics
export const validateForm = <T extends Record<string, string>>(
  formData: T,
  validators: Partial<Record<keyof T, (value: string) => string | null>>
): ValidationError[] => {
  const errors: ValidationError[] = []

  Object.entries(validators).forEach(([field, validator]) => {
    if (validator && field in formData) {
      const error = validator(formData[field])
      if (error) {
        errors.push({ field, message: error })
      }
    }
  })

  return errors
}

// Type-safe validation for specific field combinations
export const validateLoginForm = (formData: { email: string; password: string }): ValidationError[] => {
  return validateForm(formData, {
    email: validateEmail,
    password: validatePassword
  })
}

export const validateRegisterForm = (formData: { 
  email: string; 
  username: string; 
  firstName: string; 
  lastName: string; 
  password: string; 
  confirmPassword: string 
}): ValidationError[] => {
  const errors = validateForm(formData, {
    email: validateEmail,
    username: validateUsername,
    firstName: (value) => validateName(value, 'First name'),
    lastName: (value) => validateName(value, 'Last name'),
    password: validatePassword,
    confirmPassword: (value) => validateConfirmPassword(formData.password, value)
  })
  
  return errors
}

// Helper function for single field validation
export const validateField = <K extends string>(
  fieldName: K,
  value: string,
  validator: (value: string) => string | null
): ValidationError | null => {
  const error = validator(value)
  return error ? { field: fieldName, message: error } : null
} 