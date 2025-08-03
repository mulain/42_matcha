import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Button from './button'

interface AuthFormProps {
  title: string
  subtitle: string
  children?: React.ReactNode
  submitText: string
  onSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
  isDisabled?: boolean
  alternateAction?: {
    text: string
    linkText: string
    linkTo: string
  }
  extraContent?: React.ReactNode
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  children,
  submitText,
  onSubmit,
  isLoading = false,
  isDisabled = false,
  alternateAction,
  extraContent
}) => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <Link to='/' className='flex justify-center hover:opacity-80 transition-opacity'>
            <Heart className='w-12 h-12 text-primary-600' />
          </Link>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>{title}</h2>
          <p className='mt-2 text-sm text-gray-600'>{subtitle}</p>
        </div>

        <div className='bg-white py-8 px-6 shadow rounded-lg'>
          <form onSubmit={onSubmit} className='space-y-6'>
            {children}
            {extraContent}

            <Button
              type='submit'
              size='lg'
              loading={isLoading}
              disabled={isDisabled || isLoading}
              className='w-full'
            >
              {submitText}
            </Button>
          </form>

          {alternateAction && (
            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-600'>
                {alternateAction.text}{' '}
                <Link to={alternateAction.linkTo} className='text-primary-600 hover:text-primary-500 font-medium'>
                  {alternateAction.linkText}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm 