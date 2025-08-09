import { useState, useEffect } from 'react'

/**
 * useActiveSection - React hook to track the active section during scroll.
 * @param {string[]} sectionIds - Array of section ids to track
 * @param {number} offset - Offset in pixels to subtract (e.g. header height)
 * @returns {string|null} - id of the active section
 */
export function useActiveSection(sectionIds, offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id)
            return
          }
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
