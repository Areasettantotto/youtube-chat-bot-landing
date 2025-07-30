import { motion } from 'framer-motion'

export default function Logo() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      className="flex items-center space-x-3 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={handleLogoClick}
    >
      {/* YouTube-inspired icon con chat bubble */}
      <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-lg">
        {/* YouTube Play Icon */}
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        {/* Chat indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 dark:bg-green-300 rounded-full border-2 border-white dark:border-gray-800"></div>
      </div>

      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          YT ChatBot
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium -mt-0.5">
          Live Assistant
        </p>
      </div>
    </motion.div>
  )
}
