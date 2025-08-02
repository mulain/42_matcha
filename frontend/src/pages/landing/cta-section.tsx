import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useAuthStore } from '../../store/auth-store'

const CtaSection = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <section className='px-6 py-20 bg-gradient-to-r from-primary-600 to-secondary-600'>
      <div className='max-w-4xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='space-y-6'
        >
          <h2 className='text-4xl font-bold text-white mb-4'>Ready to Find Your Mate?</h2>
          <p className='text-xl text-primary-100 mb-8'>
            Join the, like, two people who have found meaningful connections on Matcha.
          </p>
          {!isAuthenticated && (
            <Link
              to='/register'
              className='bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg inline-flex items-center space-x-2 transition-colors duration-200'
            >
              <span>Get Started Today</span>
              <ArrowRight className='w-5 h-5' />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection
