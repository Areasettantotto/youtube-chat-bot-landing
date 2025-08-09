import { motion } from 'framer-motion'
import { useEffect } from 'react'

const policySection = {
  title: "Privacy Policy e Termini di Servizio",
  lastUpdated: "28 Luglio 2025",
  sections: [
    {
      id: "overview",
      title: "🔍 Panoramica del Servizio",
      content: `Il YouTube Live Chat Contest Bot è un'applicazione software sviluppata da Marco Busato che consente ai creator di YouTube di organizzare contest interattivi durante le dirette live. Il bot monitora la chat in tempo reale e gestisce automaticamente i contest basati su numeri.`
    },
    {
      id: "data-collection",
      title: "📊 Raccolta e Utilizzo dei Dati",
      content: `Il nostro bot raccoglie e utilizza i seguenti dati esclusivamente per il funzionamento del servizio:`,
      list: [
        "Messaggi pubblici nella chat live di YouTube (solo numeri per i contest)",
        "Username degli utenti partecipanti (per identificare i vincitori)",
        "Timestamp dei messaggi (per la gestione dei contest temporali)",
        "ID del canale YouTube (per identificare la diretta)",
        "Dati di autenticazione OAuth 2.0 (memorizzati localmente)"
      ]
    },
    {
      id: "data-storage",
      title: "💾 Archiviazione e Sicurezza",
      content: `I dati vengono trattati con la massima sicurezza:`,
      list: [
        "Tutti i dati sono memorizzati localmente sul server del proprietario",
        "Nessun dato viene trasmesso a server terzi",
        "I file di log sono accessibili solo al proprietario del bot",
        "Le credenziali OAuth sono crittografate e protette",
        "I dati possono essere eliminati in qualsiasi momento"
      ]
    },
    {
      id: "user-rights",
      title: "👤 Diritti degli Utenti",
      content: `Gli utenti hanno i seguenti diritti:`,
      list: [
        "Diritto di accesso ai propri dati raccolti",
        "Diritto di cancellazione dei propri dati",
        "Diritto di limitazione del trattamento",
        "Diritto di opposizione al trattamento",
        "Diritto alla portabilità dei dati"
      ]
    },
    {
      id: "youtube-compliance",
      title: "📺 Conformità YouTube API",
      content: `Il bot è completamente conforme alle politiche di YouTube:`,
      list: [
        "Utilizza esclusivamente le YouTube Data API v3 ufficiali",
        "Rispetta tutti i rate limit e le quote API",
        "Non modifica, elimina o interferisce con i contenuti YouTube",
        "Legge solo i dati pubblicamente disponibili nella chat",
        "Include sempre l'identificazione [BOT] nei messaggi",
        "Non raccoglie dati personali sensibili"
      ]
    },
    {
      id: "legal-compliance",
      title: "⚖️ Conformità Legale",
      content: `Il servizio è conforme alle seguenti normative:`,
      list: [
        "GDPR (General Data Protection Regulation)",
        "Termini di Servizio di YouTube",
        "Politiche Developer di Google",
        "Normative italiane sulla privacy",
        "Copyright e proprietà intellettuale"
      ]
    },
    {
      id: "contact",
      title: "📧 Contatti e Supporto",
      content: `Per qualsiasi domanda riguardante questa policy o i tuoi dati:`,
      list: [
        "Email: areasettantotto@icloud.com",
        "Tempo di risposta: entro 72 ore",
        "Supporto tecnico disponibile in italiano e inglese",
        "GitHub: @Areasettantotto per segnalazioni tecniche"
      ]
    }
  ]
}

export default function PolicyPage() {
  // Automatically scroll to top when the page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])
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
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors"
      variants={sectionVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.header
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <span>⬅️</span>
              <span>Torna alla Home</span>
            </motion.a>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📋 {policySection.title}
            </h1>
            <p className="text-xl opacity-90">
              YouTube Live Chat Contest Bot
            </p>
            <div className="mt-6 text-blue-100">
              Ultimo aggiornamento: {policySection.lastUpdated}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div className="space-y-12" variants={itemVariants}>
          {policySection.sections.map((section, idx) => (
            <motion.section
              key={section.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {section.title}
              </h2>

              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-4">{section.content}</p>

                {section.list && (
                  <ul className="space-y-3">
                    {section.list.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* Google Compliance Badge */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 text-center border border-green-200 dark:border-green-700"
          variants={itemVariants}
        >
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Certificazione Google API Compliance
          </h3>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Questa applicazione è stata sviluppata seguendo rigorosamente le linee guida di Google per le YouTube Data API v3,
            garantendo la massima sicurezza e conformità alle normative vigenti.
          </p>
          <div className="mt-6 flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-gray-600 dark:text-gray-400">YouTube API v3 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-gray-600 dark:text-gray-400">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-gray-600 dark:text-gray-400">OAuth 2.0 Secure</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-8"
          variants={itemVariants}
        >
          <p className="mb-2">© 2025 Marco Busato - Tutti i diritti riservati</p>
          <p className="text-sm">
            Per domande o richieste relative a questa policy, contatta:
            <a href="mailto:areasettantotto@icloud.com" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              areasettantotto@icloud.com
            </a>
          </p>
        </motion.footer>
      </div>
    </motion.div>
  )
}
