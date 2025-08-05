import { useState, useEffect } from 'react'

/**
 * useActiveSection - React hook per tracciare la sezione attiva durante lo scroll.
 * @param {string[]} sectionIds - Array di id delle sezioni da tracciare
 * @param {number} offset - Offset in pixel da sottrarre (es. altezza header)
 * @returns {string|null} - id della sezione attiva
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
