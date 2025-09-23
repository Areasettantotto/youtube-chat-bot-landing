import MotionLayout, { motion } from './MotionLayout.jsx'
import { childVariants } from '../animations/variants'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Footer() {
  const { t } = useLanguage()

  const socialLinks = [
    { key: 'github', name: t('footer.social.github'), url: 'https://github.com/Areasettantotto/youtube-chat-bot.git', icon: '🔗' },
    { key: 'linkedin', name: t('footer.social.linkedin'), url: 'https://linkedin.com', icon: '💼' },
    { key: 'youtube', name: t('footer.social.youtube'), url: 'https://www.youtube.com/@fabiorizzi6370/streams', icon: '📺' }
  ]

  return (
    <MotionLayout className="text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          className="mb-8"
          variants={childVariants}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white overflow-safe">
            {t('footer.ctaTitle')}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 overflow-safe">
            {t('footer.ctaSubtitle')}
          </p>
          <motion.a
            href="mailto:areasettantotto@icloud.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base"
            // className="inline-block bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base"
            className="inline-block bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base"
          >
            {t('footer.ctaButton')}
          </motion.a>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-4 sm:space-x-6 mb-8 flex-wrap gap-y-3"
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
              className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 dark:text-gray-300 overflow-hidden"
            >
              <span className="flex-shrink-0">{link.icon}</span>
              <span className="hidden sm:inline whitespace-nowrap">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="border-t border-gray-200 dark:border-gray-700 pt-6"
          variants={childVariants}
        >
          <div className="text-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
            <motion.a
              href="#policy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors whitespace-nowrap"
            >
              {t('footer.policy')}
            </motion.a>
          </div>

          <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400 space-y-2 overflow-safe">
            <p>{t('footer.copyright')}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {t('footer.builtWith')}
            </p>
          </div>
        </motion.div>
      </div>
    </MotionLayout>
  )
}
