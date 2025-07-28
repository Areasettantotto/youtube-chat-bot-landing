import { motion } from 'framer-motion'

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    file: 'messages/messages.json',
    botLabel: '🤖 [BOT]'
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    file: 'messages/messages-italian.json',
    botLabel: '🤖 [BOT]'
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    file: 'messages/messages-russian.json',
    botLabel: '🤖 [БОТ]'
  },
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    file: 'messages/messages-cinese.json',
    botLabel: '🤖 [机器人]'
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    file: 'messages/messages-arabo.json',
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
      className="w-screen min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors snap-start snap-always py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            🌍 Supporto Multilingua
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Il bot supporta 5 lingue diverse con messaggi personalizzati per ogni regione
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={itemVariants}
        >
          {languages.map((lang, idx) => (
            <motion.div
              key={lang.code}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{lang.flag}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {lang.name}
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3">
                  <code className="text-sm text-gray-700 dark:text-gray-300">
                    {lang.file}
                  </code>
                </div>
                <div className="text-sm font-mono bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                  {lang.botLabel}
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
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Il bot rileva automaticamente la lingua selezionata e mostra:
            </p>
            <div className="mt-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
              🌍 Loaded messages: Italiano (messages/messages-italian.json)
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
