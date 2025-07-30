import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage.jsx'

export default function MobileMenu({ isOpen, setIsOpen }) {
  const { t } = useLanguage()

  const menuItems = [
    { label: t('nav.home'), href: '#hero', icon: '🏠' },
    { label: t('nav.features'), href: '#features', icon: '🔧' },
    { label: t('nav.setup'), href: '#setup', icon: '🚀' },
    { label: t('nav.multilingual'), href: '#multilingual', icon: '🌍' },
    { label: t('nav.logging'), href: '#logging', icon: '📊' },
    { label: t('nav.faq'), href: '#troubleshooting', icon: '🔍' },
    { label: t('nav.contact'), href: '#footer', icon: '📧' },
    { label: t('nav.privacy'), href: '#policy', icon: '📋' }
  ]

  const sidebarVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  }

  const handleItemClick = (href) => {
    setIsOpen(false)

    // Gestione navigazione
    if (href === '#policy') {
      window.location.hash = 'policy'
    } else if (href === '#hero') {
      window.location.hash = 'home'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.hash = 'home'
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center lg:hidden"
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

      {/* Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 right-0 h-full w-80 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl shadow-2xl z-50 lg:hidden border-l border-gray-200 dark:border-gray-700"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        {/* Header Sidebar */}
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

        {/* Menu Items - Contenitore principale scrollabile */}
        <div className="overflow-y-auto" style={{ height: 'calc(100vh - 140px - 120px)' }}>
          <motion.nav className="px-6 py-4 space-y-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleItemClick(item.href)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                variants={itemVariants}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </motion.nav>
        </div>

        {/* Footer Sidebar - Fisso in fondo */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4 text-center"
            variants={itemVariants}
          >
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Pronto per iniziare?
            </p>
            <motion.a
              href="mailto:areasettantotto@icloud.com"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('common.contact')}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
