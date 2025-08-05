import { useState, useEffect } from 'react'
import { LanguageProvider } from './hooks/useLanguage.jsx'
import App from './App'
import PolicyPage from './components/PolicyPage'

function Router() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Semplice routing basato sull'hash URL
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)

      // Solo la policy page ha il suo componente dedicato
      // Tutti gli altri hash (#setup, #features, etc.) restano nella home
      if (hash === 'policy') {
        setCurrentPage('policy')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <LanguageProvider>
      {currentPage === 'policy' ? <PolicyPage /> : <App />}
    </LanguageProvider>
  )
}

export default Router
