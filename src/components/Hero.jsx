import MotionLayout, { motion } from './MotionLayout.jsx'
import { childVariants } from '../animations/variants'
import { useLanguage } from '../hooks/useLanguage.jsx'
import Logo from './header/Logo.jsx'
import ParticlesBackground from './ParticlesBackground.jsx'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <MotionLayout
      id="hero"
      className="relative overflow-hidden text-center min-h-[60vh] md:min-h-screen flex items-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <ParticlesBackground />
      <div className="relative z-10 w-full max-w-6xl mx-auto pb-8">
        <motion.div className="mb-4 flex justify-center" variants={childVariants}>
          <Logo size="big" />
        </motion.div>
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white leading-tight"
          variants={childVariants}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto mb-6 sm:mb-8 px-2 leading-relaxed"
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
          className="inline-block bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold max-w-xs sm:max-w-sm mx-auto"
        >
          {t('hero.cta')}
        </motion.a>
      </div>
    </MotionLayout>
  )
}
