import { motion } from 'framer-motion'

export default function Hero() {
  // Variants per animazione fade-in on-scroll
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

  return (
    <motion.section
      id="hero"
      className="w-screen h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors snap-start snap-always"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-gray-900 dark:text-white"
        variants={childVariants}
      >
        🎯 YouTube Live Chat Bot
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mb-8"
        variants={childVariants}
      >
        Coinvolgi il tuo pubblico con un gioco a premi in tempo reale durante le tue dirette.
      </motion.p>
      <motion.a
        href="#features"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold"
      >
        Scopri come funziona
      </motion.a>
    </motion.section>
  )
}
