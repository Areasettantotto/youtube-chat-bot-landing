import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage.jsx'
import Logo from './header/Logo'
import LanguageSelector from './header/LanguageSelector'
import ThemeToggle from './header/ThemeToggle'
import MobileMenu from './header/MobileMenu'

export default function Header({ dark, setDark }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-300"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo a sinistra */}
          <motion.div variants={itemVariants}>
            <Logo />
          </motion.div>

          {/* Menu desktop al centro - nascosto su mobile */}
          <motion.nav
            className="hidden lg:flex items-center space-x-8"
            variants={itemVariants}
          >
            {[
              { label: t('nav.features'), href: '#features' },
              { label: t('nav.setup'), href: '#setup' },
              { label: t('nav.multilingual'), href: '#multilingual' },
              { label: t('nav.logging'), href: '#logging' },
              { label: t('nav.faq'), href: '#troubleshooting' }
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </motion.nav>

          {/* Controlli a destra */}
          <motion.div
            className="flex items-center space-x-3"
            variants={itemVariants}
          >
            {/* Selettore lingua - nascosto su mobile molto piccolo */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Toggle tema */}
            <ThemeToggle dark={dark} setDark={setDark} />

            {/* Menu mobile */}
            <MobileMenu
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
            />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
