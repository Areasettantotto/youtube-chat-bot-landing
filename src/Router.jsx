import { useState, useEffect } from 'react'
import App from './App'
import PolicyPage from './components/PolicyPage'

function Router() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Semplice routing basato sull'hash URL
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      setCurrentPage(hash || 'home')
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentPage === 'policy') {
    return <PolicyPage />
  }

  return <App />
}

export default Router
