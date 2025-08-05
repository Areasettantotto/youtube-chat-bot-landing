
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage.jsx'
import { useEffect } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import NavLinks from './NavLinks'
import { getNavItems } from './navItems'

export default function MobileMenu({ isOpen, setIsOpen }) {
  const { t } = useLanguage()
  const navItems = getNavItems(t, 'mobile')
  const sectionIds = navItems.map(item => item.href.replace('#', ''))
  const activeSection = useActiveSection(sectionIds, 100)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      const timeout = setTimeout(() => {
        document.body.style.overflow = ''
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])



  const handleItemClick = (href) => {
    const id = href.replace('#', '')
    setIsOpen(false)
    setTimeout(() => {
      if (id === 'policy') {
        window.location.hash = 'policy'
        return
      }
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const headerOffset = 80
        window.scrollBy({ top: -headerOffset, behavior: 'smooth' })
      } else {
        console.warn(`Elemento con id "${id}" non trovato`)
      }
    }, 450)
  }

  return (
    <div className="lg:hidden">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('header.menu')}
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="w-5 h-5 flex flex-col justify-center items-center"
        >
          <motion.span
            className="w-4 h-0.5 bg-current block"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 2 }
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-4 h-0.5 bg-current block mt-1"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-4 h-0.5 bg-current block mt-1"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -2 }
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 h-[100vh] bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl shadow-2xl border-l border-gray-200 dark:border-gray-700 p-0"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">YT ChatBot</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Live Assistant</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            <nav className="px-6 py-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100vh - 140px - 120px)' }}>
              <NavLinks items={navItems} activeSection={activeSection} onItemClick={handleItemClick} isMobile />
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
