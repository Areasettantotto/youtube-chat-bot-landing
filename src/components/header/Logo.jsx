import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export default function Logo({ small = false, size = 'normal' }) {
  const [altTextIdx, setAltTextIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const altTexts = [
    'YouTube',
    'Chat Bot',
    'Live Assistant'
  ]

  // rotate altTexts for the normal (non-big) variant only
  useEffect(() => {
    if (small || size === 'big') return
    const interval = setInterval(() => {
      setAltTextIdx(idx => (idx + 1) % altTexts.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [small, size])

  // extract numeric tokens from altTexts for the big bubble (e.g. 60.56)
  let numericAlt = altTexts
    .map(s => (s || '').toString())
    .map(s => (s.match(/[0-9]+(?:\.[0-9]+)?/g) || []).join(' '))
    .map(s => {
      // keep only integer part for visual effect
      const parts = s.split(/\s+/).map(token => {
        const n = parseFloat(token)
        if (Number.isFinite(n)) return String(Math.trunc(n))
        return ''
      }).filter(Boolean)
      return parts.join(' ')
    })
    .filter(Boolean)

  // ensure at least 4 numeric values to rotate: add sensible fallbacks if needed
  const fallbacks = ['42', '77', '88', '13', '21', '99']
  const uniq = Array.from(new Set(numericAlt))
  let i = 0
  while (uniq.length < 4 && i < fallbacks.length) {
    if (!uniq.includes(fallbacks[i])) uniq.push(fallbacks[i])
    i++
  }
  numericAlt = uniq.slice(0, Math.max(4, uniq.length))

  const [numericIdx, setNumericIdx] = useState(0)
  const [dotHovered, setDotHovered] = useState(false)
  // rotate numeric values only when big and the mouse is over the dot
  useEffect(() => {
    if (size !== 'big' || !dotHovered || numericAlt.length === 0) return
    const interval = setInterval(() => {
      setNumericIdx(i => (i + 1) % numericAlt.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [size, dotHovered, numericAlt.length])
  // touch toggle handler for mobile: toggle dotHovered on touch
  const handleDotTouchToggle = (e) => {
    // prevent the synthetic mouse events that can follow touch
    if (e && e.preventDefault) e.preventDefault()
    setDotHovered(prev => !prev)
  }

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
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* YouTube-inspired icon con chat bubble */}
  {/* size variations: compact (small), normal (icon + text), big (large icon-only) */}
  <div className={`relative ${size === 'big' ? 'w-16 h-16' : 'w-10 h-10'} bg-gradient-to-br from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-lg flex items-center justify-center shadow-lg overflow-hidden`}>
        {/* YouTube Play Icon */}
        <svg
          className={`${size === 'big' ? 'w-14 h-14' : 'w-9 h-9'} text-white`}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
            {/* Rounded red background */}
          <rect x="0" y="0" width="64" height="64" rx="12" fill="none"/>
          {/* Robot head (less rounded) */}
          <rect x="14" y="18" width="36" height="28" rx="4" fill="#fff" stroke="#222" strokeWidth="2"/>
          {/* Eyes (rounded-rects instead of circles) */}
          <rect x="22" y="28" width="8" height="8" rx="2" fill="#222" />
          <rect x="34" y="28" width="8" height="8" rx="2" fill="#222" />
          {/* Mouth */}
          <rect x="28" y="42" width="8" height="4" rx="1" fill="#222"/>
          {/* Antenna (bar with small rounding) */}
          <rect x="31" y="8" width="2" height="8" rx="1" fill="#222"/>
          <rect x="30" y="6" width="4" height="6" rx="1" fill="#fff" stroke="#222" strokeWidth="2"/>
          {/* Ears (rounded squares) */}
          <rect x="11" y="29" width="6" height="6" rx="1" fill="#222"/>
          <rect x="47" y="29" width="6" height="6" rx="1" fill="#222"/>
          {/* Speech bubble removed for big variant - keep icon clean; the interactive HTML bubble remains */}
        </svg>
        {/* Animated HTML bubble for big variant: expands on hover and shows altTexts; now opens from the green dot */}
        {size === 'big' && (
          <motion.div
            aria-hidden={!dotHovered}
            initial={false}
            animate={{
              width: dotHovered ? 52 : 12,
              height: dotHovered ? 44 : 12,
              top: dotHovered ? 6 : 8,
              right: dotHovered ? 6 : 8,
              borderRadius: dotHovered ? 12 : 9999,
              opacity: dotHovered ? 1 : 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 30,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.45))',
              WebkitBackdropFilter: 'blur(6px)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.12) inset, 0 6px 14px rgba(0,0,0,0.08)'
            }}
          >
                <motion.div
                  key={numericIdx}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: dotHovered ? 1 : 0, scale: dotHovered ? [1.08, 0.98, 1] : 0.9 }}
                  transition={{ duration: 0.38, times: [0, 0.6, 1], ease: 'easeOut' }}
                >
                  <div className="text-base font-extrabold text-white text-center max-w-[56px] px-1 whitespace-nowrap overflow-hidden truncate" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.38)' }}>
                    {numericAlt[numericIdx] || ''}
                  </div>
                </motion.div>
          </motion.div>
        )}
        {/* Chat indicator (small dot) - visible for small/normal, hidden for big to avoid overlap with bubble */}
        {/* Always render the green dot (even for big) so the bubble can open from it visually; keep it aria-hidden */}
        <div
          className={
            `absolute ${size === 'big' ? '-top-2 -right-2 w-6 h-6' : '-top-1 -right-1 w-4 h-4'} bg-green-400 dark:bg-green-300 rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse`
          }
          aria-hidden="true"
          onMouseEnter={() => setDotHovered(true)}
          onMouseLeave={() => setDotHovered(false)}
          onTouchEnd={handleDotTouchToggle}
        />
      </div>

      {/* Show text only for normal (non-small, non-big) variant */}
      {!small && size !== 'big' && (
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
