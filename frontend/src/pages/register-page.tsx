import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthForm from '../components/auth-form'
import { EmailField, PasswordField, UsernameField, NameField, ConfirmPasswordField } from '../components/fields'
import { registerResolver, RegisterFormData } from '../utils/form-validation'

const RegisterPage = () => {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<RegisterFormData>({
    resolver: registerResolver,
    mode: 'onBlur'
  })

  const watchedPassword = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Implement actual registration API call
      console.log('Registration data:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to login page after successful registration
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <AuthForm
      title='Join Matcha'
      subtitle='Create your account to start your journey'
      submitText='Create Account'
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isSubmitting}
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
              placeholder='John'
              autoComplete='given-name'
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <NameField
              label='Last Name'
              placeholder='Doe'
              autoComplete='family-name'
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
            password={watchedPassword}
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </>
      }
    />
  )
}

export default RegisterPage
