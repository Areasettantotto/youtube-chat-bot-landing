import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../hooks/useLanguage.jsx'

export default function LanguageSelector({ flagOnly = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [justChanged, setJustChanged] = useState(false)
  const { currentLanguage, changeLanguage, getAvailableLanguages, getCurrentLanguageInfo, t } = useLanguage()

  const languages = getAvailableLanguages()
  const selectedLang = getCurrentLanguageInfo()

  // 🎯 Effect to show feedback when the language changes
  useEffect(() => {
    setJustChanged(true)
    const timer = setTimeout(() => setJustChanged(false), 1000)
    return () => clearTimeout(timer)
  }, [currentLanguage])

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.15 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  }

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)

    // 🎉 Visual feedback for language change
    setJustChanged(true)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md ${
          justChanged ? 'ring-2 ring-green-400 ring-opacity-75' : ''
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('header.selectLanguage')}
        animate={{
          scale: justChanged ? [1, 1.05, 1] : 1,
          transition: { duration: 0.3 }
        }}
      >
        <span className="text-lg">{selectedLang.flag}</span>
        {!flagOnly && (
          <span className="hidden sm:inline text-sm font-medium">{selectedLang.name}</span>
        )}

        {/* 🟢 Successful language change indicator */}
        <AnimatePresence>
          {justChanged && (
            <motion.span
              className="text-green-500 text-xs"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✓
            </motion.span>
          )}
        </AnimatePresence>

        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to close the dropdown */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute right-0 mt-2 w-56 min-w-[14rem] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 px-2 z-50"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center space-x-3 px-5 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    lang.code === currentLanguage
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                  {lang.code === currentLanguage && (
                    <span className="ml-auto text-green-500">✓</span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
