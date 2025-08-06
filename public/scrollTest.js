// Script di test automatico per lo scroll tra le sezioni principali
const sectionIds = [
  'hero',
  'setup',
  'features',
  'multilingual',
  'logging',
  'troubleshooting',
  'footer'
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    console.log('Scrolled to:', id)
  } else {
    console.warn('Section not found:', id)
  }
}

// Scroll automatico tra tutte le sezioni ogni 1.5 secondi
let idx = 0
function autoScroll() {
  if (idx < sectionIds.length) {
    scrollToSection(sectionIds[idx])
    idx++
    setTimeout(autoScroll, 1500)
  } else {
    idx = 0
    setTimeout(autoScroll, 2000)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(autoScroll, 1000)
})
