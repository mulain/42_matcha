import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthForm from '../components/auth-form'
import { EmailField, PasswordField } from '../components/fields'
import { loginResolver } from '../utils/form-validation'
import { authService } from '../services/auth-service'
import { useAuthStore } from '../store/auth-store'
import type { LoginDTO } from '../types'



const LoginPage = () => {
  const navigate = useNavigate()
  const [error, setLocalError] = useState<string | null>(null)
  const { login, setLoading, setError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginDTO>({
    resolver: loginResolver,
    mode: 'onBlur'
  })

  const onSubmit = async (data: LoginDTO) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await authService.login(data)
      
      if (response.success && response.data) {
        // Update auth store with user data
        login(response.data.user)
        
        // Redirect to dashboard after successful login
        navigate('/dashboard')
      } else {
        setLocalError(response.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setLocalError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked')
    // This could open a modal or navigate to a forgot password page
  }

  return (
    <AuthForm
      title='Welcome back to Matcha'
      subtitle='Sign in to your account to continue'
      submitText='Sign In'
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isSubmitting}
      error={error}
      alternateAction={{
        text: "Don't have an account?",
        linkText: 'Sign up',
        linkTo: '/register'
      }}
      extraContent={
        <>
          <EmailField
            {...register('email')}
            error={errors.email?.message}
          />

          <PasswordField
            {...register('password')}
            error={errors.password?.message}
          />

          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={handleForgotPassword}
              className='text-sm text-primary-600 hover:text-primary-500 font-medium'
              disabled={isSubmitting}
            >
              Forgot your password?
            </button>
          </div>
        </>
      }
    />
  )
}

export default LoginPage
