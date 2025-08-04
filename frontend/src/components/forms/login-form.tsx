import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { EmailField, PasswordField } from '../fields'
import { loginResolver } from '../../utils/form-validation'
import { authService } from '../../services/auth-service'
import { useAuthStore } from '../../store/auth-store'
import Button from '../button'
import type { LoginDTO } from '../../types'

interface LoginFormProps {
  onSubmit?: (data: LoginDTO) => Promise<void>
  onSuccess?: () => void
  submitText?: string
  isLoading?: boolean
  disabled?: boolean
  showForgotPassword?: boolean
  showSignUp?: boolean
  onForgotPassword?: () => void
  onSignUp?: () => void
  className?: string
  theme?: 'light' | 'dark'
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit: customOnSubmit,
  onSuccess,
  submitText = 'Sign In',
  isLoading: externalLoading,
  disabled = false,
  showForgotPassword = true,
  showSignUp = true,
  onForgotPassword,
  onSignUp,
  className = '',
  theme = 'light'
}) => {
  const [error, setLocalError] = useState<string | null>(null)
  const { login, setLoading, setError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginDTO>({
    resolver: loginResolver,
    mode: 'onBlur'
  })

  const handleFormSubmit = async (data: LoginDTO) => {
    try {
      setError(null)
      setLoading(true)
      setLocalError(null)
      
      if (customOnSubmit) {
        // Use custom onSubmit if provided
        await customOnSubmit(data)
      } else {
        // Use default login logic
        const response = await authService.login(data)
        
        if (response.success && response.data) {
          // Update auth store with user data
          login(response.data.user)
          
          // Reset form
          reset()
          
          // Call success callback if provided
          if (onSuccess) {
            onSuccess()
          }
        } else {
          setLocalError(response.error || 'Login failed')
        }
      }
    } catch (err) {
      console.error('Login error:', err)
      setLocalError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPasswordClick = () => {
    if (onForgotPassword) {
      onForgotPassword()
    } else {
      // Default behavior
      console.log('Forgot password clicked')
    }
  }

  const handleSignUpClick = () => {
    if (onSignUp) {
      onSignUp()
    } else {
      // Default behavior
      console.log('Sign up clicked')
    }
  }

  const isFormLoading = externalLoading !== undefined ? externalLoading : isSubmitting

  const isDark = theme === 'dark'
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={`space-y-4 ${className}`}>
      {error && (
        <div className={`${isDark ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'} border rounded-md p-4`}>
          <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>{error}</p>
        </div>
      )}

      <EmailField
        {...register('email')}
        error={errors.email?.message}
        theme={theme}
      />

      <PasswordField
        {...register('password')}
        error={errors.password?.message}
        theme={theme}
      />

      {showForgotPassword && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleForgotPasswordClick}
            className="text-sm text-primary-400 hover:text-primary-300 font-medium"
            disabled={isFormLoading}
          >
            Forgot your password?
          </button>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        loading={isFormLoading}
        disabled={disabled || isFormLoading}
        className="w-full"
      >
        {submitText}
      </Button>

      {showSignUp && (
        <div className="text-center">
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <button
              type="button"
              className="text-primary-400 hover:text-primary-300 font-medium"
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
          </p>
        </div>
      )}
    </form>
  )
}

export default LoginForm 