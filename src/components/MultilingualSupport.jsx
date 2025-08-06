import { motion } from 'framer-motion'

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    file: 'default.json'
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    file: 'italian.json'
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    file: 'russian.json'
  },
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    file: 'cinese.json'
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    file: 'arabo.json'
  }
]

export default function MultilingualSupport() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <motion.section
      className="w-full min-h-screen flex flex-col justify-center items-center px-3 sm:px-4 lg:px-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors pt-20 sm:pt-24 pb-20 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full max-w-7xl mx-auto text-center">
        <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white overflow-safe">
            🌍 Supporto Multilingua
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 overflow-safe">
            Il bot supporta 5 lingue diverse con messaggi personalizzati per ogni regione
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12"
          variants={itemVariants}
        >
          {languages.map((lang, idx) => (
            <motion.div
              key={lang.code}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="text-center">
                <div className="flex flex-col items-center gap-2 sm:gap-3 mb-3">
                  <span className="text-xl sm:text-2xl lg:text-3xl">{lang.flag}</span>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white overflow-safe">
                    {lang.name}
                  </h3>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                  <code className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-all overflow-safe">
                    {lang.file}
                  </code>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            📝 Configurazione Lingua
          </h3>
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4 text-left overflow-x-auto">
            <pre className="text-green-400 text-xs sm:text-sm overflow-safe">
              <code>{`# Seleziona la lingua nel file .env
MESSAGES_FILE=messages/messages-italian.json   # 🇮🇹 Italiano
MESSAGES_FILE=messages/messages.json           # 🇬🇧 English
MESSAGES_FILE=messages/messages-russian.json   # 🇷🇺 Russian
MESSAGES_FILE=messages/messages-cinese.json    # 🇨🇳 Chinese
MESSAGES_FILE=messages/messages-arabo.json     # 🇸🇦 Arabic`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
