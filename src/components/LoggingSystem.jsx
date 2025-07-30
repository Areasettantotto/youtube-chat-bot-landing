import { motion } from 'framer-motion'
import { useState } from 'react'

const logTypes = [
  {
    name: 'participants.log',
    icon: '👥',
    description: 'Nuovi partecipanti unici',
    example: '[2025-07-24T15:30:50.456Z] NEW PARTICIPANT: User456 (Total: 15)',
    color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
  },
  {
    name: 'valid_attempts.log',
    icon: '✅',
    description: 'Tentativi validi e vincitori',
    example: '[2025-07-24T15:30:45.123Z] ✅ Valid attempt User123: "60.50"',
    color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
  },
  {
    name: 'discarded_attempts.log',
    icon: '❌',
    description: 'Tentativi non validi',
    example: '[2025-07-24T15:31:10.789Z] ❌ Invalid attempt User789: "abc" (Not a number)',
    color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  },
  {
    name: 'exhausted_attempts.log',
    icon: '🚫',
    description: 'Utenti che hanno esaurito i tentativi',
    example: '[2025-07-24T15:32:00.123Z] 🚫 User456 exhausted attempts (3/3)',
    color: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
  },
  {
    name: 'startup_errors.json',
    icon: '⚠️',
    description: 'Errori di avvio del bot',
    example: '{"timestamp": "2025-07-24T15:00:00.000Z", "error": "API quota exceeded"}',
    color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
  }
]

const configExamples = [
  {
    title: 'Configurazione Base',
    code: `# Contest configuration
CORRECT_PRICE=60.56
MAX_ATTEMPTS=3
LIVE_DURATION=20
EXTRA_DISCOUNT_FOR_THE_NEAREST=true

# Logging
ENABLE_LOGS=true
LOGS_DIR=logs`
  },
  {
    title: 'Soglie Sconto Personalizzate',
    code: `# 3 periodi temporali con sconti diversi
EXTRADISCOUNT_THRESHOLDS=[
  {"min":0,"max":5,"discount":80},
  {"min":6,"max":15,"discount":70},
  {"min":16,"max":"LIVE_DURATION_MINUTES","discount":60}
]`
  },
  {
    title: 'Polling API Avanzato',
    code: `# Polling dinamico basato sul traffico
MIN_POLLING=5000             # Traffico alto
MID_POLLING=10000            # Traffico medio
MAX_POLLING=30000            # Traffico basso
HIGH_TRAFFIC_THRESHOLD=10    # Soglia traffico alto
MEDIUM_TRAFFIC_THRESHOLD=2   # Soglia traffico medio`
  }
]

export default function LoggingSystem() {
  const [activeConfig, setActiveConfig] = useState(0)

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
      id="logging"
      className="w-screen min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors snap-start snap-always py-20 pt-24 scroll-mt-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            📊 Sistema di Logging Avanzato
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
            Monitoraggio completo delle attività del bot con log dettagliati e configurazione flessibile
          </p>
        </motion.div>

        {/* Log Types */}
        <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
            📁 Tipi di Log Generati
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {logTypes.map((log, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl flex-shrink-0">{log.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {log.name}
                    </h4>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                      {log.description}
                    </p>
                    <div className={`p-2 sm:p-3 lg:p-4 rounded-lg ${log.color}`}>
                      <code className="text-xs sm:text-sm font-mono break-all block overflow-hidden">
                        {log.example}
                      </code>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Configuration Examples */}
        <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
            ⚙️ Esempi di Configurazione
          </h3>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              {configExamples.map((config, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveConfig(idx)}
                  className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-w-0 ${
                    activeConfig === idx
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="block truncate">{config.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeConfig}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-6"
            >
              <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                <pre className="text-green-400 text-xs sm:text-sm leading-relaxed">
                  <code>{configExamples[activeConfig].code}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Live Output Example */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg"
          variants={itemVariants}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
            🖥️ Output Console in Tempo Reale
          </h3>
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4 lg:p-6 overflow-x-auto">
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-mono">
              <div className="text-blue-400">📋 Loaded languages config: 5 languages available</div>
              <div className="text-green-400">🌍 Loaded messages: Italiano (messages/messages-italian.json)</div>
              <div className="text-yellow-400">⚙️ Loaded 3 custom discount thresholds from .env</div>
              <div className="text-purple-400">📁 Directory logs created automatically</div>
              <div className="text-green-400">🚀 Listening to chat...</div>
              <div className="text-blue-400">🟢 Contest started, from now you have 20 minutes and 3 attempts!</div>
              <div className="text-white">💬 New message from User123: "60.50"</div>
              <div className="text-green-400">✅ Valid attempt logged: User123</div>
              <div className="text-red-400">🎉 EXACT WINNER: User123 with €60.56 - Extra discount: 80%</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
