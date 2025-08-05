import { motion } from 'framer-motion'
/**
 * NavLinks - shared navigation links for both desktop and mobile
 * @param {Object} props
 * @param {Array} props.items - array of {label, href, icon?}
 * @param {string} props.activeSection - id of the active section
 * @param {function} [props.onItemClick] - click handler (for mobile)
 * @param {boolean} [props.isMobile] - if true, render as mobile menu
 */
export default function NavLinks({ items, activeSection, onItemClick, isMobile }) {
  return (
    <>
      {items.map((item) => {
        const targetId = item.href.replace('#', '')
        const isActive = activeSection === targetId
        if (isMobile) {
          return (
            <motion.button
              key={item.href}
              onClick={() => onItemClick && onItemClick(item.href)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              whileHover={{ x: isActive ? 2 : 4 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Navigate to ${item.label}`}
            >
              {item.icon && (
                <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
              )}
              <span className={`font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>{item.label}</span>
              <span className={`ml-auto transition-opacity ${isActive ? 'opacity-100 text-blue-500' : 'opacity-0 group-hover:opacity-100 text-gray-400'}`}>{isActive ? '●' : '→'}</span>
            </motion.button>
          )
        } else {
          // Desktop nav link
          return (
            <motion.a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors relative whitespace-nowrap ${
                isActive
                  ? 'text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 origin-left"
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          )
        }
      })}
    </>
  )
}
