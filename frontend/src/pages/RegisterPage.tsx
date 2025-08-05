import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthForm from '../components/AuthForm'
import { EmailField, PasswordField, UsernameField, NameField, ConfirmPasswordField } from '../components/fields'
import { registerResolver, RegisterFormData } from '../utils/form-validation'
import { authService } from '../services/auth-service'
import { useAuthStore } from '../store/auth-store'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const { login, setLoading } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: registerResolver,
    mode: 'onBlur'
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await authService.register({
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      })
      
      if (response.success && response.data) {
        // Update auth store with user data
        login(response.data.user)
        
        // Redirect to dashboard after successful registration
        navigate('/dashboard')
      } else {
        setError(response.error || 'Registration failed')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthForm
      title='Join Matcha'
      subtitle='Create your account to start your journey'
      submitText='Create Account'
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isSubmitting}
      error={error}
      alternateAction={{
        text: 'Already have an account?',
        linkText: 'Sign in',
        linkTo: '/login'
      }}
      extraContent={
        <>
          <div className='grid grid-cols-2 gap-4'>
            <NameField
              label='First Name'
              placeholder='Your First Name'
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <NameField
              label='Last Name'
              placeholder='Your Last Name'
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          </div>

          <EmailField
            {...register('email')}
            error={errors.email?.message}
          />

          <UsernameField
            {...register('username')}
            error={errors.username?.message}
          />

          <PasswordField
            {...register('password')}
            error={errors.password?.message}
          />

          <ConfirmPasswordField
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </>
      }
    />
  )
}

export default RegisterPage
