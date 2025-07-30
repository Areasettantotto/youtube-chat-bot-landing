import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import SetupGuide from './components/SetupGuide'
import MultilingualSupport from './components/MultilingualSupport'
import LoggingSystem from './components/LoggingSystem'
import Troubleshooting from './components/Troubleshooting'
import Footer from './components/Footer'
// import LanguageTestPanel from './components/header/LanguageTestPanel'
import { useEffect, useState } from 'react'

function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <div className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory">
      <Header dark={dark} setDark={setDark} />
      <Hero />
      <Features />
      <SetupGuide />
      <MultilingualSupport />
      <LoggingSystem />
      <Troubleshooting />
      <Footer />

      {/* 🧪 Pannello di test per le traduzioni - DISABILITATO */}
      {/* {process.env.NODE_ENV === 'development' && <LanguageTestPanel />} */}
    </div>
  )
}

export default App
