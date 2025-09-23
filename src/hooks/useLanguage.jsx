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
      'hero.title': 'Live Chat Guess Bot',
      'hero.subtitle': 'Il tuo assistente in tempo reale per trasformare la chat in un gioco coinvolgente.',
      'hero.cta': '🚀 Scopri come funziona',

      // Multilingual support
      'multilingual.title': '🌍 Supporto Multilingua',
      'multilingual.subtitle': 'Il bot supporta 5 lingue diverse con messaggi personalizzati per ogni regione',
      'multilingual.configTitle': '📝 Configurazione Lingua',

      // Logging system
      'logging.title': '📊 Sistema di Logging Avanzato',
      'logging.subtitle': 'Monitoraggio completo delle attività del bot con log dettagliati e configurazione flessibile',
      'logging.typesTitle': '📁 Tipi di Log Generati',
      'logging.configTitle': '⚙️ Esempi di Configurazione',
      'logging.types.participants.name': 'participants.log',
      'logging.types.participants.description': 'Nuovi partecipanti unici',
      'logging.types.valid_attempts.name': 'valid_attempts.log',
      'logging.types.valid_attempts.description': 'Tentativi validi e vincitori',
      'logging.types.discarded_attempts.name': 'discarded_attempts.log',
      'logging.types.discarded_attempts.description': 'Tentativi non validi',
      'logging.types.exhausted_attempts.name': 'exhausted_attempts.log',
      'logging.types.exhausted_attempts.description': 'Utenti che hanno esaurito i tentativi',
      'logging.types.startup_errors.name': 'startup_errors.json',
      'logging.types.startup_errors.description': 'Errori di avvio del bot',
      'logging.configExamples.base.title': 'Configurazione Base',
      'logging.configExamples.thresholds.title': 'Soglie Sconto Personalizzate',
      'logging.configExamples.polling.title': 'Polling API Avanzato',

      // Setup Guide
      'setup.title': '🚀 Guida Setup Completa',
      'setup.subtitle': 'Segui questi semplici passaggi per configurare il tuo YouTube Live Chat Guess Bot',
      'setup.step1.title': 'Clone e Installazione',
      'setup.step1.description': 'Scarica il progetto e installa le dipendenze',
      'setup.step2.title': 'Google API Setup',
      'setup.step2.description': 'Configura le credenziali YouTube Data API v3',
      'setup.step2.step1': 'Vai su Google Cloud Console',
      'setup.step2.step2': 'Crea un nuovo progetto',
      'setup.step2.step3': 'Abilita YouTube Data API v3',
      'setup.step2.step4': 'Crea credenziali OAuth 2.0',
      'setup.step2.step5': 'Scarica client_secret.json',
      'setup.step3.title': 'Configurazione Environment',
      'setup.step3.description': 'Imposta le variabili di ambiente',
      'setup.step4.title': 'Prima Esecuzione',
      'setup.step4.description': 'Autorizza il bot e inizia a usarlo',

      // Footer
      'footer.ctaTitle': '🎮 Pronto a iniziare?',
      'footer.ctaSubtitle': 'Porta il tuo canale YouTube al livello successivo con interazioni coinvolgenti in tempo reale.',
      'footer.ctaButton': '📧 Contattami',
      'footer.social.github': 'GitHub',
      'footer.social.linkedin': 'LinkedIn',
      'footer.social.youtube': 'YouTube (Utenti Test)',
      'footer.policy': '📋 Privacy Policy',
      'footer.copyright': '© 2025 Marco Busato - Areasettantotto. Tutti i diritti riservati.',
      'footer.builtWith': 'Realizzato con ❤️ usando React, Tailwind CSS e Framer Motion',

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
      'hero.title': 'Live Chat Guess Bot',
      'hero.subtitle': 'Your real-time assistant to turn chat into an engaging game.',
      'hero.cta': 'Discover how it works',

      // Multilingual support
      'multilingual.title': '🌍 Multilingual Support',
      'multilingual.subtitle': 'The bot supports 5 languages with customized messages for each region',
      'multilingual.configTitle': '📝 Language Configuration',

      // Logging system
      'logging.title': '📊 Advanced Logging System',
      'logging.subtitle': 'Full monitoring of bot activity with detailed logs and flexible configuration',
      'logging.typesTitle': '📁 Generated Log Types',
      'logging.configTitle': '⚙️ Configuration Examples',
      'logging.types.participants.name': 'participants.log',
      'logging.types.participants.description': 'New unique participants',
      'logging.types.valid_attempts.name': 'valid_attempts.log',
      'logging.types.valid_attempts.description': 'Valid attempts and winners',
      'logging.types.discarded_attempts.name': 'discarded_attempts.log',
      'logging.types.discarded_attempts.description': 'Invalid attempts',
      'logging.types.exhausted_attempts.name': 'exhausted_attempts.log',
      'logging.types.exhausted_attempts.description': 'Users that exhausted attempts',
      'logging.types.startup_errors.name': 'startup_errors.json',
      'logging.types.startup_errors.description': 'Bot startup errors',
      'logging.configExamples.base.title': 'Base Configuration',
      'logging.configExamples.thresholds.title': 'Custom Discount Thresholds',
      'logging.configExamples.polling.title': 'Advanced API Polling',

      // Setup Guide
      'setup.title': '🚀 Complete Setup Guide',
      'setup.subtitle': 'Follow these simple steps to configure your YouTube Live Chat Guess Bot',
      'setup.step1.title': 'Clone & Install',
      'setup.step1.description': 'Download the project and install dependencies',
      'setup.step2.title': 'Google API Setup',
      'setup.step2.description': 'Configure YouTube Data API v3 credentials',
      'setup.step2.step1': 'Go to Google Cloud Console',
      'setup.step2.step2': 'Create a new project',
      'setup.step2.step3': 'Enable YouTube Data API v3',
      'setup.step2.step4': 'Create OAuth 2.0 credentials',
      'setup.step2.step5': 'Download client_secret.json',
      'setup.step3.title': 'Environment Configuration',
      'setup.step3.description': 'Set the required environment variables',
      'setup.step4.title': 'First Run',
      'setup.step4.description': "Authorize the bot and start using it",

      // Footer
      'footer.ctaTitle': '🎮 Ready to get started?',
      'footer.ctaSubtitle': 'Bring your YouTube channel to the next level with engaging real-time interactions.',
      'footer.ctaButton': '📧 Contact me',
      'footer.social.github': 'GitHub',
      'footer.social.linkedin': 'LinkedIn',
      'footer.social.youtube': 'YouTube (Users Test)',
      'footer.policy': '📋 Privacy Policy',
      'footer.copyright': '© 2025 Marco Busato - Areasettantotto. All rights reserved.',
      'footer.builtWith': 'Built with ❤️ using React, Tailwind CSS and Framer Motion',

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
      'hero.title': 'Live Chat Guess Bot',
      'hero.subtitle': 'Ваш помощник в реальном времени, превращающий чат в увлекательную игру.',
      'hero.cta': 'Узнать, как это работает',

      // Multilingual support
      'multilingual.title': '🌍 Поддержка нескольких языков',
      'multilingual.subtitle': 'Бот поддерживает 5 языков с индивидуальными сообщениями для каждого региона',
      'multilingual.configTitle': '📝 Настройка языка',

      // Logging system
      'logging.title': '📊 Система расширенного логирования',
      'logging.subtitle': 'Полный мониторинг активности бота с детальными логами и гибкой конфигурацией',
      'logging.typesTitle': '📁 Типы генерируемых логов',
      'logging.configTitle': '⚙️ Примеры конфигурации',
      'logging.types.participants.name': 'participants.log',
      'logging.types.participants.description': 'Новые уникальные участники',
      'logging.types.valid_attempts.name': 'valid_attempts.log',
      'logging.types.valid_attempts.description': 'Допустимые попытки и победители',
      'logging.types.discarded_attempts.name': 'discarded_attempts.log',
      'logging.types.discarded_attempts.description': 'Недопустимые попытки',
      'logging.types.exhausted_attempts.name': 'exhausted_attempts.log',
      'logging.types.exhausted_attempts.description': 'Пользователи, исчерпавшие попытки',
      'logging.types.startup_errors.name': 'startup_errors.json',
      'logging.types.startup_errors.description': 'Ошибки запуска бота',
      'logging.configExamples.base.title': 'Базовая конфигурация',
      'logging.configExamples.thresholds.title': 'Пользовательские пороги скидок',
      'logging.configExamples.polling.title': 'Продвинутое опрос API',

      // Setup Guide
      'setup.title': '🚀 Полное руководство по настройке',
      'setup.subtitle': 'Следуйте этим простым шагам для настройки вашего YouTube Live Chat Guess Bot',
      'setup.step1.title': 'Клонирование и установка',
      'setup.step1.description': 'Скачайте проект и установите зависимости',
      'setup.step2.title': 'Настройка Google API',
      'setup.step2.description': 'Настройте учетные данные YouTube Data API v3',
      'setup.step2.step1': 'Перейдите в Google Cloud Console',
      'setup.step2.step2': 'Создайте новый проект',
      'setup.step2.step3': 'Включите YouTube Data API v3',
      'setup.step2.step4': 'Создайте учетные данные OAuth 2.0',
      'setup.step2.step5': 'Скачайте client_secret.json',
      'setup.step3.title': 'Настройка окружения',
      'setup.step3.description': 'Установите переменные окружения',
      'setup.step4.title': 'Первый запуск',
      'setup.step4.description': 'Авторизуйте бота и начните использовать',

      // Footer
      'footer.ctaTitle': '🎮 Готовы начать?',
      'footer.ctaSubtitle': 'Поднимите свой канал YouTube на новый уровень с помощью вовлекающих действий в реальном времени.',
      'footer.ctaButton': '📧 Связаться',
      'footer.social.github': 'GitHub',
      'footer.social.linkedin': 'LinkedIn',
      'footer.social.youtube': 'YouTube (Тестовые пользователи)',
      'footer.policy': '📋 Политика конфиденциальности',
      'footer.copyright': '© 2025 Marco Busato - Areasettantotto. Все права защищены.',
      'footer.builtWith': 'Создано с ❤️ используя React, Tailwind CSS и Framer Motion',

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
      'hero.title': 'Live Chat Guess Bot',
      'hero.subtitle': '您的实时助手，将聊天变成有趣的游戏。',
      'hero.cta': '了解工作原理',

      // Multilingual support
      'multilingual.title': '🌍 多语言支持',
      'multilingual.subtitle': '该机器人支持 5 种语言，并为每个地区提供定制消息',
      'multilingual.configTitle': '📝 语言配置',

      // Logging system
      'logging.title': '📊 高级日志系统',
      'logging.subtitle': '全面监控机器人活动，具有详细日志和灵活配置',
      'logging.typesTitle': '📁 生成的日志类型',
      'logging.configTitle': '⚙️ 配置示例',
      'logging.types.participants.name': 'participants.log',
      'logging.types.participants.description': '新的唯一参与者',
      'logging.types.valid_attempts.name': 'valid_attempts.log',
      'logging.types.valid_attempts.description': '有效尝试和获胜者',
      'logging.types.discarded_attempts.name': 'discarded_attempts.log',
      'logging.types.discarded_attempts.description': '无效尝试',
      'logging.types.exhausted_attempts.name': 'exhausted_attempts.log',
      'logging.types.exhausted_attempts.description': '耗尽尝试的用户',
      'logging.types.startup_errors.name': 'startup_errors.json',
      'logging.types.startup_errors.description': '启动错误',
      'logging.configExamples.base.title': '基础配置',
      'logging.configExamples.thresholds.title': '自定义折扣阈值',
      'logging.configExamples.polling.title': '高级 API 轮询',

      // Setup Guide
      'setup.title': '🚀 完整设置指南',
      'setup.subtitle': '按照这些简单步骤配置您的 YouTube Live Chat Guess Bot',
      'setup.step1.title': '克隆与安装',
      'setup.step1.description': '下载项目并安装依赖',
      'setup.step2.title': 'Google API 设置',
      'setup.step2.description': '配置 YouTube Data API v3 的凭证',
      'setup.step2.step1': '访问 Google Cloud 控制台',
      'setup.step2.step2': '创建新项目',
      'setup.step2.step3': '启用 YouTube Data API v3',
      'setup.step2.step4': '创建 OAuth 2.0 凭证',
      'setup.step2.step5': '下载 client_secret.json',
      'setup.step3.title': '环境配置',
      'setup.step3.description': '设置环境变量',
      'setup.step4.title': '首次运行',
      'setup.step4.description': '授权机器人并开始使用',

      // Footer
      'footer.ctaTitle': '🎮 准备好开始了吗？',
      'footer.ctaSubtitle': '通过实时互动将您的 YouTube 频道提升到一个新的水平。',
      'footer.ctaButton': '📧 联系我',
      'footer.social.github': 'GitHub',
      'footer.social.linkedin': 'LinkedIn',
      'footer.social.youtube': 'YouTube (测试用户)',
      'footer.policy': '📋 隐私政策',
      'footer.copyright': '© 2025 Marco Busato - Areasettantotto。保留所有权利。',
      'footer.builtWith': '使用 ❤️ 构建，基于 React、Tailwind CSS 和 Framer Motion',

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
      'hero.title': 'Live Chat Guess Bot',
      'hero.subtitle': 'مساعدك في الوقت الحقيقي لتحويل الدردشة إلى لعبة ممتعة.',
      'hero.cta': 'اكتشف كيف يعمل',

      // Multilingual support
      'multilingual.title': '🌍 دعم متعدد اللغات',
      'multilingual.subtitle': 'الروبوت يدعم 5 لغات مع رسائل مخصصة لكل منطقة',
      'multilingual.configTitle': '📝 تكوين اللغة',

      // Logging system
      'logging.title': '📊 نظام تسجيل متقدم',
      'logging.subtitle': 'مراقبة كاملة لنشاط الروبوت مع سجلات مفصلة وتكوين مرن',
      'logging.typesTitle': '📁 أنواع السجلات المولدة',
      'logging.configTitle': '⚙️ أمثلة التكوين',
      'logging.types.participants.name': 'participants.log',
      'logging.types.participants.description': 'مشتركين فريدين جدد',
      'logging.types.valid_attempts.name': 'valid_attempts.log',
      'logging.types.valid_attempts.description': 'محاولات صحيحة والفائزون',
      'logging.types.discarded_attempts.name': 'discarded_attempts.log',
      'logging.types.discarded_attempts.description': 'محاولات غير صالحة',
      'logging.types.exhausted_attempts.name': 'exhausted_attempts.log',
      'logging.types.exhausted_attempts.description': 'المستخدمون الذين استنفدوا المحاولات',
      'logging.types.startup_errors.name': 'startup_errors.json',
      'logging.types.startup_errors.description': 'أخطاء بدء التشغيل',
      'logging.configExamples.base.title': 'التكوين الأساسي',
      'logging.configExamples.thresholds.title': 'عتبات الخصم المخصصة',
      'logging.configExamples.polling.title': 'استطلاع API المتقدم',

      // Setup Guide
      'setup.title': '🚀 دليل إعداد كامل',
      'setup.subtitle': 'اتبع هذه الخطوات البسيطة لتكوين روبوت دردشة YouTube Live Chat Guess Bot',
      'setup.step1.title': 'استنساخ والتثبيت',
      'setup.step1.description': 'قم بتنزيل المشروع وتثبيت التبعيات',
      'setup.step2.title': 'إعداد Google API',
      'setup.step2.description': 'قم بتكوين بيانات اعتماد YouTube Data API v3',
      'setup.step2.step1': 'اذهب إلى وحدة تحكم Google Cloud',
      'setup.step2.step2': 'أنشئ مشروعًا جديدًا',
      'setup.step2.step3': 'قم بتمكين YouTube Data API v3',
      'setup.step2.step4': 'أنشئ بيانات اعتماد OAuth 2.0',
      'setup.step2.step5': 'حمّل client_secret.json',
      'setup.step3.title': 'تكوين البيئة',
      'setup.step3.description': 'اضبط متغيرات البيئة',
      'setup.step4.title': 'التشغيل الأول',
      'setup.step4.description': 'قم بتفويض الروبوت وابدأ في استخدامه',

      // Footer
      'footer.ctaTitle': '🚀 هل أنت مستعد للبدء؟',
      'footer.ctaSubtitle': 'ارتقِ بقناتك على YouTube إلى المستوى التالي بتفاعلات جذابة في الوقت الفعلي.',
      'footer.ctaButton': '📧 اتصل',
      'footer.social.github': 'GitHub',
      'footer.social.linkedin': 'LinkedIn',
      'footer.social.youtube': 'YouTube (مستخدمو الاختبار)',
      'footer.policy': '📋 سياسة الخصوصية',
      'footer.copyright': '© 2025 Marco Busato - Areasettantotto. جميع الحقوق محفوظة.',
      'footer.builtWith': 'تم الإنشاء بـ ❤️ باستخدام React و Tailwind CSS و Framer Motion',

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
