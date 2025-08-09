import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Logo({ small = false }) {
  const [altTextIdx, setAltTextIdx] = useState(0)
  const altTexts = [
    'YouTube',
    '60.56',
    'Live Assistant',
    '105.49',
    'You win!!'
  ]

  useEffect(() => {
    if (small) return
    const interval = setInterval(() => {
      setAltTextIdx(idx => (idx + 1) % altTexts.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [small])
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
          className="w-9 h-9 text-white"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rounded red background */}
          <rect x="0" y="0" width="64" height="64" rx="16" fill="none"/>
          {/* Robot head (larger) */}
          <rect x="14" y="18" width="36" height="28" rx="13" fill="#fff" stroke="#222" strokeWidth="2"/>
          {/* Eyes */}
          <circle cx="26" cy="32" r="4" fill="#222"/>
          <circle cx="38" cy="32" r="4" fill="#222"/>
          {/* Mouth */}
          <rect x="28" y="42" width="8" height="4" rx="2" fill="#222"/>
          {/* Antenna */}
          <rect x="31" y="10" width="2" height="10" rx="1" fill="#222"/>
          <circle cx="32" cy="10" r="4" fill="#fff" stroke="#222" strokeWidth="2"/>
          {/* Ears */}
          <circle cx="14" cy="32" r="5" fill="#222"/>
          <circle cx="50" cy="32" r="5" fill="#222"/>
          {/* Speech bubble with question mark (larger) */}
          <rect x="44" y="8" width="16" height="14" rx="4" fill="#fff" stroke="#222" strokeWidth="2"/>
          <text x="52" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#222">?</text>
        </svg>
        {/* Chat indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 dark:bg-green-300 rounded-full border-2 border-white dark:border-gray-800"></div>
      </div>

      {!small && (
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            Chat Guess
          </h1>
          <motion.p
            className="text-xs text-gray-500 dark:text-gray-400 font-medium -mt-0.5 min-h-[1.2em]"
            key={altTextIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {altTexts[altTextIdx]}
          </motion.p>
        </div>
      )}
    </motion.div>
  )
}
