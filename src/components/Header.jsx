import { useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { getNavItems } from './header/navItems'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage.jsx'
import Logo from './header/Logo'
import LanguageSelector from './header/LanguageSelector'
import ThemeToggle from './header/ThemeToggle'
import MobileMenu from './header/MobileMenu'
import NavLinks from './header/NavLinks'

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

  // Use centralized navItems
  const navItems = getNavItems(t, 'desktop')
  const sectionIds = navItems.map(item => item.href.replace('#', ''))
  const activeSection = useActiveSection(sectionIds, 100)

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 transition-colors"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo on the left */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <span className="hidden sm:inline"><Logo /></span>
            <span className="inline sm:hidden"><Logo small /></span>
          </motion.div>

          {/* Desktop menu in the center - hidden on mobile */}
          <motion.nav
            className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center"
            variants={itemVariants}
          >
            <NavLinks items={navItems} activeSection={activeSection} />
          </motion.nav>

          {/* Controls on the right */}
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
            variants={itemVariants}
          >
            {/* Language selector: only flag on mobile, full on desktop */}
            <div className="block sm:hidden">
              <LanguageSelector flagOnly />
            </div>
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Theme toggle */}
            <ThemeToggle dark={dark} setDark={setDark} />

            {/* Mobile menu */}
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
