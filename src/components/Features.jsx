import { motion } from 'framer-motion'

const features = [
  {
    icon: '🎯',
    title: 'Contest Intelligenti',
    description: 'Gestione automatica dei contest con prezzo target e tentativi limitati per utente',
    details: ['Prezzo target configurabile', 'Tentativi per utenti configurabili', 'Rilevamento automatico del vincitore', 'Possibilità di premiare il partecipante che si avvicina di più al prezzo target']
  },
  {
    icon: '🌍',
    title: 'Supporto Multilingua',
    description: 'Bot disponibile in 5 lingue con messaggi personalizzati per ogni regione',
    details: ['🇮🇹 Italiano', '🇬🇧 English', '🇷🇺 Русский', '🇨🇳 中文', '🇸🇦 العربية']
  },
  {
    icon: '📊',
    title: 'Sistema di Logging',
    description: 'Monitoraggio completo con log dettagliati di tutte le attività',
    details: ['Log partecipanti', 'Tentativi validi/non validi', 'Errori di sistema', 'Esportazione dati']
  },
  {
    icon: '⚡',
    title: 'Polling Dinamico',
    description: 'Ottimizzazione automatica basata sul traffico della chat',
    details: ['Polling veloce (5s) - traffico alto', 'Polling medio (10s)', 'Polling lento (30s) - traffico basso']
  },
  {
    icon: '🎁',
    title: 'Sconti Temporali',
    description: 'Sistema di sconti personalizzabili basati sul tempo di partecipazione',
    details: ['Sconti fino all\'80%', 'Soglie temporali configurabili', 'Incentivi per partecipazione veloce']
  },
  {
    icon: '🔐',
    title: 'Sicurezza e Privacy',
    description: 'Conformità completa alle API YouTube e normative GDPR',
    details: ['OAuth 2.0 sicuro', 'Dati locali', 'Conformità YouTube', 'Privacy completa']
  }
]

export default function Features() {
  // Variants per animazioni avanzate fade-on-scroll
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.08
      }
    }
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section
      id="features"
      className="w-full min-h-screen flex flex-col justify-center items-center px-3 sm:px-4 lg:px-6 bg-gray-50 dark:bg-gray-900 transition-colors snap-start snap-always py-16 sm:py-20 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white text-center overflow-safe"
          variants={itemVariants}
        >
          🔧 Funzionalità Avanzate
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-2 text-center overflow-safe"
          variants={itemVariants}
        >
          Il bot più completo per contest interattivi su YouTube Live
        </motion.p>

        <motion.div
          className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer group overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 overflow-safe">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm overflow-safe">
                  {feature.description}
                </p>
                <div className="space-y-1 sm:space-y-2">
                  {feature.details.map((detail, detailIdx) => (
                    <div
                      key={detailIdx}
                      className="text-xs bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 overflow-safe break-words"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
