import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useAuthStore } from '../../store/auth-store'

const HeroSection = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <section className='relative px-6 py-20'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='space-y-8'
          >
            <div className='space-y-4'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className='inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium'
              >
                <Sparkles className='w-4 h-4' />
                <span>Find Your Perfect Match</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'
              >
                Where
                <span className='text-primary-600'> Love </span>
                Meets
                <span className='text-secondary-600'> Technology</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className='text-xl text-gray-600 leading-relaxed'
              >
                Discover meaningful connections with people who share your interests, values, and
                dreams. Our intelligent matching system helps you find your perfect match.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              {!isAuthenticated && (
                <>
                  <Link to='/register' className='btn-primary text-lg px-8 py-4'>
                    Start Your Journey
                  </Link>
                  <Link to='/login' className='btn-outline text-lg px-8 py-4'>
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            <div className='relative z-10'>
              <img
                src='/src/assets/matcha_logo.png'
                alt='Matcha Dating App'
                className='w-full h-auto rounded-2xl shadow-2xl'
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className='absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-2xl transform rotate-3 scale-105 opacity-20'></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
