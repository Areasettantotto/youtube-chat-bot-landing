import { motion } from 'framer-motion'

const features = [
  "Gestione tentativi per utente",
  "Messaggi automatici in chat",
  "Supporto multilingua",
  "Log degli utenti e dei vincitori",
  "Configurabile da file .env"
]

export default function Features() {
  // Variants per animazioni avanzate fade-on-scroll
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      filter: 'blur(10px)'
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15
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
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.section
      id="features"
      className="w-screen h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors snap-start snap-always"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 lg:mb-12 text-gray-900 dark:text-white"
          variants={itemVariants}
        >
          🔧 Funzionalità principali
        </motion.h2>
        <motion.ul
          className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 text-left"
          variants={containerVariants}
        >
          {features.map((item, idx) => (
            <motion.li
              key={idx}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors text-sm sm:text-base lg:text-lg text-gray-800 dark:text-gray-100 cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="mr-2 text-green-500 dark:text-green-400">✅</span> {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  )
}
