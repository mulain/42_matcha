import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import AuthForm from '../components/auth-form'
import LoginForm from '../components/forms/login-form'



const LoginPage = () => {
  const navigate = useNavigate()

  const handleSuccess = () => {
    // Redirect to dashboard after successful login
    navigate('/dashboard')
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
          <Link to='/' className='flex justify-center hover:opacity-80 transition-opacity'>
            <Heart className='w-12 h-12 text-primary-600' />
          </Link>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Welcome back to Matcha</h2>
          <p className='mt-2 text-sm text-gray-600'>Sign in to your account to continue</p>
        </div>

        <div className='bg-white py-8 px-6 shadow rounded-lg'>
          <LoginForm
            onSuccess={handleSuccess}
            onForgotPassword={handleForgotPassword}
            onSignUp={() => navigate('/register')}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
