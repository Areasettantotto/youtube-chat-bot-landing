import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage.jsx'

export default function ThemeToggle({ dark, setDark }) {
  const { t } = useLanguage()

  return (
    <motion.button
      aria-label={t('header.toggleTheme')}
      onClick={() => setDark(d => !d)}
      className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        initial={false}
        animate={{ rotate: dark ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-lg"
      >
        {dark ? '🌙' : '☀️'}
      </motion.span>
    </motion.button>
  )
}
