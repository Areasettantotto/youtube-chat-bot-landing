import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage.jsx'

/**
 * 🧪 Componente di Test per verificare le traduzioni in tempo reale
 *
 * Questo componente mostra:
 * - Traduzione corrente in tempo reale
 * - Pulsanti per cambiare lingua rapidamente
 * - Indicatori visivi per il cambio lingua
 */
export default function LanguageTestPanel() {
  const {
    t,
    currentLanguage,
    changeLanguage,
    getAvailableLanguages,
    getCurrentLanguageInfo
  } = useLanguage()

  const languages = getAvailableLanguages()
  const currentLangInfo = getCurrentLanguageInfo()

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-[60] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 max-w-sm"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
          🧪 Language Test Panel
        </h3>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-300">
          <span>{currentLangInfo.flag}</span>
          <span>{currentLangInfo.name}</span>
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
            {currentLanguage}
          </code>
        </div>
      </div>

      {/* Test di traduzione in tempo reale */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          Live Translation Test:
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {t('nav.features')}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {t('header.selectLanguage')}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            {t('hero.cta')}
          </div>
        </div>
      </div>

      {/* Pulsanti cambio lingua rapido */}
      <div className="grid grid-cols-5 gap-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`p-2 rounded text-xs transition-all ${
              lang.code === currentLanguage
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Switch to ${lang.name}`}
          >
            <div>{lang.flag}</div>
            <div className="text-[10px] mt-1">{lang.code.toUpperCase()}</div>
          </motion.button>
        ))}
      </div>

      <div className="mt-3 text-center">
        <div className="text-[10px] text-gray-400 dark:text-gray-500">
          ✅ Real-time translations {process.env.NODE_ENV === 'development' ? '(Dev Mode)' : ''}
        </div>
      </div>
    </motion.div>
  )
}
