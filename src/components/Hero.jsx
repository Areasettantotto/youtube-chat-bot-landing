import MotionLayout, { motion } from './MotionLayout.jsx'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Hero() {
  const { t } = useLanguage()

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <MotionLayout className="text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-6xl mx-auto pt-20 pb-8">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white overflow-safe leading-tight"
          variants={childVariants}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto mb-6 sm:mb-8 px-2 overflow-safe leading-relaxed"
          variants={childVariants}
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.a
          href="#features"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold max-w-xs sm:max-w-sm mx-auto"
        >
          {t('hero.cta')}
        </motion.a>
      </div>
    </MotionLayout>
  )
}
