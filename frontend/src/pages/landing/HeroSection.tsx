import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useAuthStore } from '../../store/auth-store'
import matchaLogo from '../../assets/matcha_logo.png'

const HeroSection = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <section className='relative px-6 py-20 bg-gray-900'>
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
                className='inline-flex items-center space-x-2 bg-gray-800 text-primary-400 px-4 py-2 rounded-full text-sm font-medium border border-gray-700'
              >
                <Sparkles className='w-4 h-4' />
                <span>Get Knudling Now</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='text-5xl lg:text-6xl font-bold text-white leading-tight'
              >
                Find Your
                <span className='text-primary-400'> Perfect </span>
                Match in the
                <span className='text-secondary-400'> Dating Jungle</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className='text-xl text-gray-300 leading-relaxed'
              >
                Venture into the wild world of dating with confidence. Our intelligent matching system 
                helps you navigate through the dating jungle to find your perfect companion.
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
                  <Link to='/register' className='btn-primary text-lg px-8'>
                    Start Your Adventure
                  </Link>
                  <Link to='/login' className='btn-outline text-lg px-8'>
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
                src={matchaLogo}
                alt='Matcha Dating App'
                className='w-full h-auto rounded-2xl shadow-2xl'
              />
            </div>
            <div className='absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl transform rotate-3 scale-105 opacity-20'></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
