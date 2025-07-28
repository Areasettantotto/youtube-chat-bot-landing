import { motion } from 'framer-motion'

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    file: 'messages.json',
    botLabel: '🤖 [BOT]'
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    file: 'messages-italian.json',
    botLabel: '🤖 [BOT]'
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    file: 'messages-russian.json',
    botLabel: '🤖 [БОТ]'
  },
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    file: 'messages-cinese.json',
    botLabel: '🤖 [机器人]'
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    file: 'messages-arabo.json',
    botLabel: '🤖 [بوت]'
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
      id="multilingual"
      className="w-screen min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors snap-start snap-always py-20 pt-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            🌍 Supporto Multilingua
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Il bot supporta 5 lingue diverse con messaggi personalizzati per ogni regione
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
          variants={itemVariants}
        >
          {languages.map((lang, idx) => (
            <motion.div
              key={lang.code}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">{lang.flag}</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {lang.name}
                  </h3>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 mb-2">
                  <code className="text-xs text-gray-700 dark:text-gray-300">
                    {lang.file}
                  </code>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📝 Configurazione Lingua
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 text-left">
            <pre className="text-green-400 text-sm overflow-x-auto">
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
