import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Eye, EyeOff } from 'lucide-react'
import Form from '../components/form'
import FormInput from '../components/form-input'
import Button from '../components/button'
import { validateForm, ValidationError } from '../utils/validation'

interface FormData {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  [key: string]: string
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const validationErrors = validateForm({ [name]: value })
    const fieldError = validationErrors.find(error => error.field === name)
    
    if (fieldError) {
      setErrors(prev => ({ ...prev, [name]: fieldError.message }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const validationErrors = validateForm(formData)
    const errorMap: Record<string, string> = {}
    
    validationErrors.forEach(error => {
      errorMap[error.field] = error.message
    })
    
    if (validationErrors.length > 0) {
      setErrors(errorMap)
      return
    }

    setIsLoading(true)
    
    try {
      // TODO: Implement actual registration API call
      console.log('Registration data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to login page after successful registration
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <div className='flex justify-center'>
            <Heart className='w-12 h-12 text-primary-600' />
          </div>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Join Matcha</h2>
          <p className='mt-2 text-sm text-gray-600'>Create your account to start your journey</p>
        </div>

        <div className='bg-white py-8 px-6 shadow rounded-lg'>
          <Form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <FormInput
                label='First Name'
                name='firstName'
                placeholder='John'
                required
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.firstName}
                autoComplete='given-name'
              />
              <FormInput
                label='Last Name'
                name='lastName'
                placeholder='Doe'
                required
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.lastName}
                autoComplete='family-name'
              />
            </div>

            <FormInput
              label='Email'
              type='email'
              name='email'
              placeholder='john@example.com'
              required
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.email}
              autoComplete='email'
            />

            <FormInput
              label='Username'
              name='username'
              placeholder='johndoe'
              required
              value={formData.username}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.username}
              autoComplete='username'
            />

            <div className='relative'>
              <FormInput
                label='Password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='••••••••'
                required
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.password}
                autoComplete='new-password'
              />
              <button
                type='button'
                className='absolute right-3 top-8 text-gray-400 hover:text-gray-600'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>

            <div className='relative'>
              <FormInput
                label='Confirm Password'
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                placeholder='••••••••'
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.confirmPassword}
                autoComplete='new-password'
              />
              <button
                type='button'
                className='absolute right-3 top-8 text-gray-400 hover:text-gray-600'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>

            {errors.general && (
              <div className='text-sm text-red-600 bg-red-50 p-3 rounded-lg'>
                {errors.general}
              </div>
            )}

            <Button
              type='submit'
              size='lg'
              loading={isLoading}
              disabled={isLoading}
              className='w-full'
            >
              Create Account
            </Button>
          </Form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link to='/login' className='text-primary-600 hover:text-primary-500 font-medium'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
