// 📦 Header Components Index
// Facilita l'import dei componenti modulari

// Componenti principali
export { default as Header } from '../Header'
export { default as Logo } from './Logo'
export { default as LanguageSelector } from './LanguageSelector'
export { default as ThemeToggle } from './ThemeToggle'
export { default as MobileMenu } from './MobileMenu'

// Esempi di utilizzo
export {
  CustomHeader,
  HeaderControls,
  MinimalHeader,
  AlternativeHeader,
  ComponentShowcase
} from './HeaderExamples'

// 🎯 Esempi di utilizzo:

// Import singolo componente
// import { Logo } from '../components/header'

// Import multipli
// import { Logo, ThemeToggle, LanguageSelector } from '../components/header'

// Import dell'header completo
// import { Header } from '../components/header'

// Import esempi custom
// import { CustomHeader, MinimalHeader } from '../components/header'
