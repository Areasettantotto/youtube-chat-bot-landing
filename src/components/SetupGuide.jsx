import { motion } from 'framer-motion'
import { useState } from 'react'

const setupSteps = [
  {
    id: 1,
    icon: '📥',
    title: 'Clone e Installazione',
    description: 'Scarica il progetto e installa le dipendenze',
    code: `git clone https://github.com/Areasettantotto/youtube-chat-bot
cd youtube-chat-bot
npm install`
  },
  {
    id: 2,
    icon: '🔑',
    title: 'Google API Setup',
    description: 'Configura le credenziali YouTube Data API v3',
    steps: [
      'Vai su Google Cloud Console',
      'Crea un nuovo progetto',
      'Abilita YouTube Data API v3',
      'Crea credenziali OAuth 2.0',
      'Scarica client_secret.json'
    ]
  },
  {
    id: 3,
    icon: '⚙️',
    title: 'Configurazione Environment',
    description: 'Imposta le variabili di ambiente',
    code: `# Copia il file di esempio
cp .env.example .env

# Modifica con le tue impostazioni
nano .env`
  },
  {
    id: 4,
    icon: '🚀',
    title: 'Prima Esecuzione',
    description: 'Autorizza il bot e inizia a usarlo',
    code: `node index.js`
  }
]

export default function SetupGuide() {
  const [activeStep, setActiveStep] = useState(1)

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
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
      id="setup"
      className="w-screen min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors snap-start snap-always py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            🚀 Guida Setup Completa
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Segui questi semplici passaggi per configurare il tuo YouTube Live Chat Bot
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8" variants={itemVariants}>
          {/* Step Navigator */}
          <div className="space-y-4">
            {setupSteps.map((step) => (
              <motion.div
                key={step.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  activeStep === step.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                }`}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step Content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
          >
            {setupSteps.find(step => step.id === activeStep) && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">
                    {setupSteps.find(step => step.id === activeStep).icon}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {setupSteps.find(step => step.id === activeStep).title}
                  </h3>
                </div>

                {setupSteps.find(step => step.id === activeStep).code && (
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{setupSteps.find(step => step.id === activeStep).code}</code>
                    </pre>
                  </div>
                )}

                {setupSteps.find(step => step.id === activeStep).steps && (
                  <ol className="space-y-2">
                    {setupSteps.find(step => step.id === activeStep).steps.map((stepItem, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span>{stepItem}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
