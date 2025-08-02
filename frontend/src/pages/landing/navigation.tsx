import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../../store/auth-store'
import backgroundImage from '../../assets/background.png'

const Navigation = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <nav 
      className='relative z-10 px-6 py-4'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Heart className='w-8 h-8 text-white' />
          <span className='text-2xl font-bold text-white'>Matcha</span>
        </div>
        <div className='flex items-center space-x-4'>
          {isAuthenticated ? (
            <Link to='/dashboard' className='btn-primary flex items-center space-x-2'>
              <span>Go to Dashboard</span>
              <ArrowRight className='w-4 h-4' />
            </Link>
          ) : (
            <>
              <Link 
                to='/login' 
                className='px-4 py-2 text-white hover:text-gray-200 font-medium transition-colors bg-black bg-opacity-20 hover:bg-opacity-30 rounded-lg backdrop-blur-sm'
              >
                Sign In
              </Link>
              <Link to='/register' className='btn-primary'>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
