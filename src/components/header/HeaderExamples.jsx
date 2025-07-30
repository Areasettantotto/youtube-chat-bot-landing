// 🎯 Esempio di utilizzo dei componenti Header modulari
// Questo file mostra come importare e utilizzare singolarmente i componenti

import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Import dei singoli componenti modulari
import Logo from './header/Logo'
import LanguageSelector from './header/LanguageSelector'
import ThemeToggle from './header/ThemeToggle'
import MobileMenu from './header/MobileMenu'

// 📌 Esempio 1: Header Custom con layout diverso
export function CustomHeader() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo al centro per layout custom */}
          <div className="flex-1" />
          <Logo />
          <div className="flex-1 flex justify-end space-x-4">
            <LanguageSelector />
            <ThemeToggle dark={dark} setDark={setDark} />
            <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
          </div>
        </div>
      </div>
    </header>
  )
}

// 📌 Esempio 2: Solo controlli senza logo
export function HeaderControls() {
  const [dark, setDark] = useState(false)

  return (
    <div className="flex items-center space-x-3">
      <LanguageSelector />
      <ThemeToggle dark={dark} setDark={setDark} />
    </div>
  )
}

// 📌 Esempio 3: Header minimale per dashboard
export function MinimalHeader() {
  const [dark, setDark] = useState(false)

  return (
    <motion.div
      className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Logo />
      <div className="flex items-center space-x-2">
        <ThemeToggle dark={dark} setDark={setDark} />
      </div>
    </motion.div>
  )
}

// 📌 Esempio 4: Header con stile differente
export function AlternativeHeader() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-red-100 transition-colors">Features</a>
            <a href="#setup" className="hover:text-red-100 transition-colors">Setup</a>
            <a href="#faq" className="hover:text-red-100 transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 rounded-lg p-1">
              <LanguageSelector />
            </div>
            <div className="bg-white/10 rounded-lg p-1">
              <ThemeToggle dark={dark} setDark={setDark} />
            </div>
            <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
          </div>
        </div>
      </div>
    </div>
  )
}

// 📌 Esempio 5: Uso singolo componente in un card
export function ComponentShowcase() {
  const [dark, setDark] = useState(false)

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Componenti Header
      </h3>

      <div className="space-y-4">
        {/* Solo Logo */}
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Logo Component:</p>
          <Logo />
        </div>

        {/* Solo Language Selector */}
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Language Selector:</p>
          <LanguageSelector />
        </div>

        {/* Solo Theme Toggle */}
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Theme Toggle:</p>
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
      </div>
    </div>
  )
}

/*
🎨 VANTAGGI DELLA MODULARITÀ:

✅ Riutilizzabilità
- Ogni componente può essere usato singolarmente
- Facilita la creazione di varianti del layout

✅ Manutenibilità
- Modifiche isolate a singoli componenti
- Testing più facile e mirato

✅ Scalabilità
- Aggiunta di nuovi componenti senza modificare l'esistente
- Composizione flessibile per nuovi layout

✅ Performance
- Tree shaking automatico
- Lazy loading possibile per componenti non utilizzati

✅ Consistenza
- Design system unificato
- Comportamenti standardizzati

🚀 PROSSIMI STEP:
- Aggiungere PropTypes o TypeScript per type safety
- Implementare unit tests per ogni componente
- Creare Storybook stories per documentazione visual
- Aggiungere A11y features (aria-labels, keyboard navigation)
- Implementare tema personalizzabile via CSS custom properties
*/
