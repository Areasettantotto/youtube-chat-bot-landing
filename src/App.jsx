import Header from './components/Header'
import Hero from './components/Hero'
import SetupGuide from './components/SetupGuide'
import Features from './components/Features'
import MultilingualSupport from './components/MultilingualSupport'
import LoggingSystem from './components/LoggingSystem'
import Troubleshooting from './components/Troubleshooting'
import Footer from './components/Footer'
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
    <div className="font-sans min-h-screen w-full overflow-x-hidden">
      <div className="w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        <Header dark={dark} setDark={setDark} />
        <Hero />
        <SetupGuide />
        <Features />
        <MultilingualSupport />
        <LoggingSystem />
        <Troubleshooting />
        <Footer />
      </div>
    </div>
  )
}

export default App
