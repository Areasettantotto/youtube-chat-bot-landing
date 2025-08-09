
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage.jsx'
import { useEffect } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import NavLinks from './NavLinks'
import { getNavItems } from './navItems'
import Logo from './Logo'

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
    document.body.style.overflow = ''
    setIsOpen(false)

    // After closing the menu, wait for the element to be in the DOM before scrolling
    setTimeout(() => {
      const id = href.replace('#', '')
      let attempts = 0
      const maxAttempts = 10 // 10 attempts (500ms max)
      function scrollToSection() {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(scrollToSection, 50)
        } else {
          // fallback: change hash anyway
          document.location.hash = href
        }
      }
      scrollToSection()
    }, 450)
  }

  // Callback called by AnimatePresence when the menu is removed from the DOM
  const handleMenuExitComplete = () => {
    const href = pendingScrollRef.current
    if (!href) return
    const id = href.replace('#', '')
    if (id === 'policy') {
      window.location.hash = 'policy'
      pendingScrollRef.current = null
      return
    }
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      pendingScrollRef.current = null
      return
    }
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 64
      const elementPosition = element.offsetTop - headerOffset
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    } else {
      console.warn(`Elemento con id "${id}" non trovato`)
    }
    pendingScrollRef.current = null
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
              <Logo />
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
