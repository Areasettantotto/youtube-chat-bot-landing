/**
 * 🧪 Test Performance Traduzioni in Tempo Reale
 *
 * Questo file contiene utilities per testare le performance
 * del sistema di traduzioni multilingua
 */

// 🚀 Test cambio lingua rapido
export const testLanguageSwitching = () => {
  const languages = ['it', 'en', 'ru', 'zh', 'ar']
  let currentIndex = 0

  const interval = setInterval(() => {
    const newLang = languages[currentIndex % languages.length]

    // Simula il cambio lingua
    console.log(`🌍 Switching to: ${newLang}`)

    // In una app reale, chiameresti changeLanguage(newLang)
    // changeLanguage(newLang)

    currentIndex++

    if (currentIndex >= languages.length * 2) {
      clearInterval(interval)
      console.log('✅ Language switching test completed')
    }
  }, 500)
}

// 📊 Monitor re-render dei componenti
export const createRenderCounter = (componentName) => {
  let renderCount = 0

  return () => {
    renderCount++
    console.log(`🔄 ${componentName} rendered ${renderCount} times`)
    return renderCount
  }
}

// ⚡ Test performance Context API
export const measureContextPerformance = () => {
  const start = performance.now()

  // Simula accesso a molte traduzioni
  const testKeys = [
    'nav.features',
    'nav.setup',
    'nav.multilingual',
    'nav.faq',
    'hero.title',
    'hero.subtitle',
    'header.toggleTheme',
    'header.selectLanguage',
    'common.contact',
    'common.getStarted'
  ]

  testKeys.forEach(key => {
    // In una app reale: t(key)
    console.log(`Accessing translation: ${key}`)
  })

  const end = performance.now()
  console.log(`⚡ Translation access took ${end - start} milliseconds`)

  return end - start
}

// 🎯 Utility per debug traduzioni
export const debugTranslations = (currentLanguage, availableLanguages) => {
  console.group('🌍 Translation Debug Info')
  console.log('Current Language:', currentLanguage)
  console.log('Available Languages:', availableLanguages)
  console.log('Browser Language:', navigator.language)
  console.log('LocalStorage Language:', localStorage.getItem('language'))
  console.groupEnd()
}

// 📈 Test memory usage
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = performance.memory
    console.group('🧠 Memory Usage')
    console.log('Used:', (memory.usedJSHeapSize / 1024 / 1024).toFixed(2), 'MB')
    console.log('Total:', (memory.totalJSHeapSize / 1024 / 1024).toFixed(2), 'MB')
    console.log('Limit:', (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2), 'MB')
    console.groupEnd()
  }
}

export default {
  testLanguageSwitching,
  createRenderCounter,
  measureContextPerformance,
  debugTranslations,
  monitorMemoryUsage
}
