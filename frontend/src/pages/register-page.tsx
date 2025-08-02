import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Form from '../components/form'
import Button from '../components/button'
import { EmailField, PasswordField, UsernameField, NameField, ConfirmPasswordField } from '../components/fields'

interface FormData {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
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
    const requiredFields = ['email', 'username', 'firstName', 'lastName', 'password', 'confirmPassword']
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData])
    
    if (missingFields.length > 0) {
      setErrors({ general: 'Please fill in all required fields.' })
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
              <NameField
                name='firstName'
                label='First Name'
                placeholder='John'
                value={formData.firstName}
                onChange={handleInputChange}
                fieldName='First name'
                autoComplete='given-name'
              />
              <NameField
                name='lastName'
                label='Last Name'
                placeholder='Doe'
                value={formData.lastName}
                onChange={handleInputChange}
                fieldName='Last name'
                autoComplete='family-name'
              />
            </div>

            <EmailField
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />

            <UsernameField
              name='username'
              value={formData.username}
              onChange={handleInputChange}
            />

            <PasswordField
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />

            <ConfirmPasswordField
              name='confirmPassword'
              value={formData.confirmPassword}
              password={formData.password}
              onChange={handleInputChange}
            />

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
