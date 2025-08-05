import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useAuthStore } from './store/auth-store'
import AppRoutes from './routes'
import ModalProvider from './components/ModalProvider'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const { setUser, setAuthenticated } = useAuthStore()

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        setUser(user)
        setAuthenticated(true)
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }, [setUser, setAuthenticated])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className='min-h-screen bg-gray-50'>
          <AppRoutes />
        </div>

        {/* Modal Provider */}
        <ModalProvider />

        {/* Toast notifications */}
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  )
}

export default App
