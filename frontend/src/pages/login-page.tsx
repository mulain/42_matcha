import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Form from '../components/form'
import Button from '../components/button'
import { EmailField, PasswordField } from '../components/fields'

interface LoginData {
  email: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if all required fields have values
    if (!formData.email || !formData.password) {
      setErrors({ general: 'Please fill in all required fields.' })
      return
    }

    setIsLoading(true)
    
    try {
      // TODO: Implement actual login API call
      console.log('Login data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard after successful login
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      setErrors({ general: 'Login failed. Please check your credentials.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked')
    // This could open a modal or navigate to a forgot password page
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <div className='flex justify-center'>
            <Heart className='w-12 h-12 text-primary-600' />
          </div>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Welcome back to Matcha</h2>
          <p className='mt-2 text-sm text-gray-600'>Sign in to your account to continue</p>
        </div>

        <div className='bg-white py-8 px-6 shadow rounded-lg'>
          <Form onSubmit={handleSubmit}>
            <EmailField
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />

            <PasswordField
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />

            <div className='flex items-center justify-between'>
              <button
                type='button'
                onClick={handleForgotPassword}
                className='text-sm text-primary-600 hover:text-primary-500 font-medium'
              >
                Forgot your password?
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
              Sign In
            </Button>
          </Form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{' '}
              <Link to='/register' className='text-primary-600 hover:text-primary-500 font-medium'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
