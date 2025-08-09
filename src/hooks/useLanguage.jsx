import { useState, useEffect, createContext, useContext } from 'react'

const languages = {
  it: {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    translations: {
      // Navigation
      'nav.features': 'Funzionalità',
      'nav.setup': 'Setup',
      'nav.multilingual': 'Multilingua',
      'nav.faq': 'FAQ',
      'nav.home': 'Home',
      'nav.contact': 'Contatti',
      'nav.privacy': 'Privacy',
      'nav.logging': 'Logging',

      // Header
      'header.toggleTheme': 'Cambia tema',
      'header.selectLanguage': 'Seleziona lingua',
      'header.menu': 'Menu',

      // Hero section
      'hero.title': '💬 Live Chat Guess',
      'hero.subtitle': 'Coinvolgi il tuo pubblico con un gioco a premi in tempo reale durante le tue dirette.',
      'hero.cta': 'Scopri come funziona',

      // Common
      'common.contact': 'Contattaci',
      'common.getStarted': 'Inizia ora'
    }
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    translations: {
      // Navigation
      'nav.features': 'Features',
      'nav.setup': 'Setup',
      'nav.multilingual': 'Multilingual',
      'nav.faq': 'FAQ',
      'nav.home': 'Home',
      'nav.contact': 'Contact',
      'nav.privacy': 'Privacy',
      'nav.logging': 'Logging',

      // Header
      'header.toggleTheme': 'Toggle theme',
      'header.selectLanguage': 'Select language',
      'header.menu': 'Menu',

      // Hero section
      'hero.title': '🎯 Live Chat Guess',
      'hero.subtitle': 'Engage your audience with real-time prize games during your live streams.',
      'hero.cta': 'Discover how it works',

      // Common
      'common.contact': 'Contact us',
      'common.getStarted': 'Get started'
    }
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    translations: {
      // Navigation
      'nav.features': 'Функции',
      'nav.setup': 'Настройка',
      'nav.multilingual': 'Языки',
      'nav.faq': 'FAQ',
      'nav.home': 'Главная',
      'nav.contact': 'Контакты',
      'nav.privacy': 'Конфиденциальность',
      'nav.logging': 'Логирование',

      // Header
      'header.toggleTheme': 'Переключить тему',
      'header.selectLanguage': 'Выбрать язык',
      'header.menu': 'Меню',

      // Hero section
      'hero.title': '🎯 Live Chat Guess',
      'hero.subtitle': 'Вовлекайте свою аудиторию в призовые игры в реальном времени во время прямых трансляций.',
      'hero.cta': 'Узнать как это работает',

      // Common
      'common.contact': 'Связаться с нами',
      'common.getStarted': 'Начать'
    }
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    translations: {
      // Navigation
      'nav.features': '功能',
      'nav.setup': '设置',
      'nav.multilingual': '多语言',
      'nav.faq': '常见问题',
      'nav.home': '主页',
      'nav.contact': '联系',
      'nav.privacy': '隐私',
      'nav.logging': '日志记录',

      // Header
      'header.toggleTheme': '切换主题',
      'header.selectLanguage': '选择语言',
      'header.menu': '菜单',

      // Hero section
      'hero.title': '🎯 Live Chat Guess',
      'hero.subtitle': '在直播期间通过实时奖品游戏吸引您的观众。',
      'hero.cta': '了解工作原理',

      // Common
      'common.contact': '联系我们',
      'common.getStarted': '开始使用'
    }
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    translations: {
      // Navigation
      'nav.features': 'الميزات',
      'nav.setup': 'الإعداد',
      'nav.multilingual': 'متعدد اللغات',
      'nav.faq': 'الأسئلة الشائعة',
      'nav.home': 'الرئيسية',
      'nav.contact': 'اتصل',
      'nav.privacy': 'الخصوصية',
      'nav.logging': 'تسجيل الأحداث',

      // Header
      'header.toggleTheme': 'تبديل المظهر',
      'header.selectLanguage': 'اختر اللغة',
      'header.menu': 'القائمة',

      // Hero section
      'hero.title': '🎯 Live Chat Guess',
      'hero.subtitle': 'اجعل جمهورك يشارك في ألعاب الجوائز في الوقت الفعلي أثناء البث المباشر.',
      'hero.cta': 'اكتشف كيف يعمل',

      // Common
      'common.contact': 'اتصل بنا',
      'common.getStarted': 'ابدأ الآن'
    }
  }
}

// 🌍 Context to manage language globally
const LanguageContext = createContext()

// 🎯 Provider that wraps the entire app
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Try to retrieve the language from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'it'
    }
    return 'it'
  })

  useEffect(() => {
    // Save the language to localStorage when it changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', currentLanguage)
    }
  }, [currentLanguage])

  const t = (key) => {
    const lang = languages[currentLanguage] || languages.it
    return lang.translations[key] || key
  }

  const changeLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languageCode)
    }
  }

  const getAvailableLanguages = () => {
    return Object.values(languages).map(({ code, name, flag }) => ({
      code,
      name,
      flag
    }))
  }

  const getCurrentLanguageInfo = () => {
    return languages[currentLanguage] || languages.it
  }

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getAvailableLanguages,
    getCurrentLanguageInfo
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// 🪝 Custom hook that uses the context
export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage deve essere usato all\'interno di un LanguageProvider')
  }

  return context
}

export default useLanguage
