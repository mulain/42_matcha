import Navigation from './navigation'
import HeroSection from './hero-section'
import FeaturesSection from './features-section'
import CtaSection from './cta-section'
import Footer from './footer'

const LandingPage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />

      <main className='flex-1 flex flex-col'>
        <div className='bg-gradient-to-br from-primary-50 via-white to-secondary-50'>
          <HeroSection />
          <CtaSection />
        </div>
        <div className='bg-gray-900 flex-1 flex flex-col'>
          <FeaturesSection />
          <div className='mt-auto'>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage
