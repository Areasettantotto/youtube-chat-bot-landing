import MotionLayout, { motion } from './MotionLayout.jsx'
import { childVariants } from '../animations/variants'
import { useLanguage } from '../hooks/useLanguage.jsx'
import Logo from './header/Logo.jsx'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <MotionLayout id="hero" className="text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-6xl mx-auto pb-8">
        <motion.div className="mb-4 flex justify-center" variants={childVariants}>
          <Logo size="big" />
        </motion.div>
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
          href="#setup"
          variants={childVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          // className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold max-w-xs sm:max-w-sm mx-auto"
          // className="inline-block bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold max-w-xs sm:max-w-sm mx-auto"
          className="inline-block bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold max-w-xs sm:max-w-sm mx-auto"
          // className="inline-block bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold max-w-xs sm:max-w-sm mx-auto"
          // className="inline-block bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold max-w-xs sm:max-w-sm mx-auto"
        >
        {t('hero.cta')}
      </motion.a>
      </div>
    </MotionLayout>
  )
}
