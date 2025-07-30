import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage.jsx'

export default function LanguageShowcase() {
  const { currentLanguage, getAvailableLanguages, t } = useLanguage()
  const languages = getAvailableLanguages()

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          🌍 {t('nav.multilingual')} Demo
        </h3>

        <div className="space-y-3 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('hero.title')}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`p-2 rounded-lg text-center transition-all ${
                lang.code === currentLanguage
                  ? 'bg-blue-100 dark:bg-blue-900/20 ring-2 ring-blue-500'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <div className="text-lg">{lang.flag}</div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {lang.code.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Current: {currentLanguage.toUpperCase()} | Total: {languages.length} languages
        </p>
      </div>
    </motion.div>
  )
}
