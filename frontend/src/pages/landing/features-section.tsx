import { motion } from 'framer-motion'
import { Heart, Users, MessageCircle, MapPin } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: <Heart className='w-6 h-6' />,
      title: 'Smart Matching',
      description: 'Find your perfect match based on shared interests and compatibility.',
    },
    {
      icon: <Users className='w-6 h-6' />,
      title: 'Real Connections',
      description: 'Build meaningful relationships with people who share your values.',
    },
    {
      icon: <MessageCircle className='w-6 h-6' />,
      title: 'Real-time Chat',
      description: 'Connect instantly with your matches through our secure messaging system.',
    },
    {
      icon: <MapPin className='w-6 h-6' />,
      title: 'Location Based',
      description: 'Discover people near you and plan real-life meetings.',
    },
  ]

  return (
    <section className='px-6 py-20 bg-gray-900'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-white mb-4'>Why Choose Matcha?</h2>
          <p className='text-xl text-gray-400 max-w-3xl mx-auto'>
            Our platform combines cutting-edge technology with human connection to create meaningful
            relationships.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className='bg-gray-800 border border-gray-700 rounded-lg text-center p-6 hover:bg-gray-750 hover:border-gray-600 transition-all duration-300'
            >
              <div className='w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-400'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>{feature.title}</h3>
              <p className='text-gray-400'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
