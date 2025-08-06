import { motion } from 'framer-motion'
import { useState } from 'react'

const troubleshootingItems = [
  {
    id: 1,
    icon: '📺',
    problem: 'No active live stream found',
    solution: 'Assicurati di aver avviato una diretta live su YouTube prima di eseguire il bot',
    steps: [
      'Vai su YouTube Studio',
      'Clicca su "Trasmetti dal vivo"',
      'Avvia la diretta',
      'Verifica che lo stato sia "Live" (non "Scheduled")'
    ],
    code: null
  },
  {
    id: 2,
    icon: '🔑',
    problem: 'Error reading client_secret.json',
    solution: 'Il file delle credenziali Google non è presente o non è valido',
    steps: [
      'Vai su Google Cloud Console',
      'Scarica nuovamente client_secret.json',
      'Posiziona il file nella root del progetto',
      'Verifica che il nome sia esatto: client_secret.json'
    ],
    code: 'ls -la | grep client_secret.json'
  },
  {
    id: 3,
    icon: '⚙️',
    problem: 'Invalid EXTRADISCOUNT_THRESHOLDS format',
    solution: 'Errore nella sintassi JSON delle soglie sconto nel file .env',
    steps: [
      'Verifica la sintassi JSON nel file .env',
      'Usa double quotes per le proprietà',
      'Controlla parentesi quadre e graffe',
      'Testa la validità del JSON online'
    ],
    code: `# Formato corretto:
EXTRADISCOUNT_THRESHOLDS=[{"min":0,"max":10,"discount":80}]`
  },
  {
    id: 4,
    icon: '🌐',
    problem: 'Error retrieving live stream',
    solution: 'Problemi con le API di YouTube o quote insufficienti',
    steps: [
      'Controlla le quote API in Google Cloud Console',
      'Verifica che YouTube Data API v3 sia abilitata',
      'Controlla i permessi OAuth 2.0',
      'Riprova tra qualche minuto'
    ],
    code: 'node index.js # Riavvia il bot'
  },
  {
    id: 5,
    icon: '🔄',
    problem: 'Authentication failed / Token refresh',
    solution: 'Token scaduto o credenziali non valide',
    steps: [
      'Elimina il file token.json',
      'Riavvia il bot',
      'Completa nuovamente l\'autorizzazione',
      'Copia il codice di autorizzazione nel terminale'
    ],
    code: `rm token.json
node index.js`
  }
]

const debugConfig = {
  title: 'Modalità Debug',
  description: 'Configurazione per troubleshooting avanzato',
  code: `# Debug mode nel file .env
ENABLE_LOGS=true
MIN_POLLING=3000  # Polling più veloce per test
MESSAGE_DELAY=1000  # Riduce il delay tra messaggi

# Per vedere tutti i log in dettaglio
DEBUG=true
VERBOSE_LOGGING=true`
}

export default function Troubleshooting() {
  const [activeItem, setActiveItem] = useState(1)

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

  const activeItemData = troubleshootingItems.find(item => item.id === activeItem)

  return (
    <motion.section
      className="w-full min-h-screen flex flex-col justify-center items-center px-3 sm:px-4 lg:px-6 bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 transition-colors pt-20 sm:pt-24 pb-20 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white overflow-safe">
            🔍 Troubleshooting e FAQ
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 overflow-safe">
            Risolvi rapidamente i problemi più comuni con il tuo YouTube Chat Bot
          </p>
        </motion.div>

        <motion.div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" variants={itemVariants}>
          {/* Problem List */}
          <div className="lg:col-span-1">
            <div className="space-y-2 sm:space-y-3">
              {troubleshootingItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 overflow-hidden ${
                    activeItem === item.id
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm overflow-safe">
                        {item.problem}
                      </h4>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Solution Detail */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl sm:text-3xl flex-shrink-0">{activeItemData?.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white overflow-safe">
                    {activeItemData?.problem}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 overflow-safe">
                    {activeItemData?.solution}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-4">
                  🛠️ Passaggi per la risoluzione:
                </h4>
                <ol className="space-y-3">
                  {activeItemData?.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm overflow-safe flex-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {activeItemData?.code && (
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">
                    💻 Comando da eseguire:
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                    <pre className="text-green-400 text-xs sm:text-sm leading-relaxed overflow-safe">
                      <code>{activeItemData.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Debug Section */}
        <motion.div
          className="mt-8 sm:mt-12 bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🐛 {debugConfig.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-2 overflow-safe">
              {debugConfig.description}
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 sm:p-4 lg:p-6 overflow-x-auto">
            <pre className="text-green-400 text-xs sm:text-sm leading-relaxed overflow-safe">
              <code>{debugConfig.code}</code>
            </pre>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg overflow-hidden">
              <div className="text-lg sm:text-xl mb-2">📊</div>
              <div className="text-xs sm:text-sm font-semibold text-blue-800 dark:text-blue-200 overflow-safe">
                YouTube Data API
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-300 overflow-safe">
                10,000 units/day
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 rounded-lg overflow-hidden">
              <div className="text-lg sm:text-xl mb-2">📞</div>
              <div className="text-xs sm:text-sm font-semibold text-green-800 dark:text-green-200 overflow-safe">
                Support Email
              </div>
              <div className="text-xs text-green-600 dark:text-green-300 overflow-safe break-all">
                areasettantotto@icloud.com
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-lg overflow-hidden">
              <div className="text-lg sm:text-xl mb-2">🔗</div>
              <div className="text-xs sm:text-sm font-semibold text-purple-800 dark:text-purple-200 overflow-safe">
                GitHub Repository
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-300 overflow-safe">
                @Areasettantotto
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
