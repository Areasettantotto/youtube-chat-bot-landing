import { motion } from 'framer-motion'

export default function Footer() {
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: '🔗' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '📺' }
  ]

  return (
    <motion.footer
      className="w-screen h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors snap-start snap-always"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-8"
          variants={childVariants}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            🚀 Pronto a iniziare?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
            Porta il tuo canale YouTube al livello successivo con interazioni coinvolgenti in tempo reale.
          </p>
          <motion.a
            href="mailto:areasettantotto@icloud.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 font-semibold"
          >
            📧 Contattami
          </motion.a>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-6 mb-8"
          variants={childVariants}
        >
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 dark:text-gray-300"
            >
              <span>{link.icon}</span>
              <span className="hidden sm:inline">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="border-t border-gray-200 dark:border-gray-700 pt-6"
          variants={childVariants}
        >
          <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400 space-y-2">
            <p>© 2025 Marco Busato. Tutti i diritti riservati.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Realizzato con ❤️ usando React, Tailwind CSS e Framer Motion
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
