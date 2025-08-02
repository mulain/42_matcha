import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthForm from '../components/auth-form'
import { EmailField, PasswordField } from '../components/fields'
import { loginResolver } from '../utils/form-validation'

interface LoginData {
  email: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginData>({
    resolver: loginResolver,
    mode: 'onBlur'
  })

  const onSubmit = async (data: LoginData) => {
    // TODO: Implement actual login API call
    console.log('Login data:', data)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to dashboard after successful login
    navigate('/dashboard')
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
