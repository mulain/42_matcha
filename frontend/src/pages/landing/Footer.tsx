import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='px-6 py-12 bg-gray-900 flex-1'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0'>
          <div className='flex items-center space-x-2'>
            <Heart className='w-6 h-6 text-primary-600' />
            <span className='text-xl font-bold text-white'>Matcha</span>
          </div>
          <p className='text-gray-400 whitespace-nowrap'>
            © {new Date().getFullYear()} Matcha. All shmangs reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
