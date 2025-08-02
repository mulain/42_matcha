import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const LoginPage = () => {
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

        <div className='card'>
          <p className='text-center text-gray-600'>Login functionality coming soon...</p>
          <div className='mt-4 text-center'>
            <Link to='/' className='text-primary-600 hover:text-primary-500'>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
