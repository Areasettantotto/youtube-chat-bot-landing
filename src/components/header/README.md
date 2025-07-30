# Header Component Structure

Il componente Header è stato progettato con un'architettura modulare per garantire:
- 🔧 **Manutenibilità**: Ogni sotto-componente ha una responsabilità specifica
- 🚀 **Scalabilità**: Facile aggiungere nuove funzionalità
- ♻️ **Riutilizzabilità**: I componenti possono essere riutilizzati in altri contesti
- 🧪 **Testabilità**: Ogni modulo può essere testato singolarmente

## 📁 Struttura Directory

```
src/components/header/
├── Logo.jsx              # Logo animato con YouTube theme
├── LanguageSelector.jsx  # Dropdown per selezione lingua
├── ThemeToggle.jsx      # Toggle dark/light mode
├── MobileMenu.jsx       # Menu hamburger per mobile
└── README.md           # Questa documentazione
```

## 🎯 Componenti

### Header.jsx (Componente principale)
- **Responsabilità**: Layout principale, orchestrazione dei sotto-componenti
- **Props**: `dark`, `setDark`
- **Caratteristiche**:
  - Layout responsive (desktop navigation hidden su mobile)
  - Backdrop blur effect
  - Animazioni Framer Motion coordinate
  - Fixed positioning con z-index 50

### Logo.jsx
- **Responsabilità**: Logo aziendale con branding YouTube
- **Caratteristiche**:
  - Icona YouTube SVG con indicatore chat verde
  - Testo "YT ChatBot" nascosto su mobile
  - Animazioni hover/tap
  - Click handler per scroll to top

### LanguageSelector.jsx
- **Responsabilità**: Selezione lingua multilingua
- **Dependencies**: `useLanguage` hook
- **Caratteristiche**:
  - Dropdown animato con bandiere
  - Overlay per chiusura automatica
  - Indicatore lingua corrente
  - Responsive (nascosto su schermi molto piccoli)

### ThemeToggle.jsx
- **Responsabilità**: Toggle tra modalità chiara/scura
- **Props**: `dark`, `setDark`
- **Caratteristiche**:
  - Icone animate 🌙/☀️
  - Rotazione smooth a 180°
  - Styling consistente con altri controlli

### MobileMenu.jsx
- **Responsabilità**: Navigazione mobile con menu hamburger
- **Props**: `isOpen`, `setIsOpen`
- **Caratteristiche**:
  - Hamburger animato (3 linee → X)
  - Sidebar slide-in da destra
  - Overlay semi-trasparente
  - Stagger animations per items
  - Gestione navigazione hash/scroll

## 🎨 Design System

### Colori
- **Background**: `bg-white/95 dark:bg-gray-900/95`
- **Bordi**: `border-gray-200/20 dark:border-gray-700/20`
- **Testo**: `text-gray-700 dark:text-gray-300`
- **Accent**: YouTube Red (`from-red-500 to-red-600`)

### Dimensioni
- **Header Height**: `h-16` (64px)
- **Button Size**: `w-10 h-10` (40x40px)
- **Logo Size**: `w-10 h-10` (40x40px)
- **Mobile Menu**: `w-80` (320px width)

### Animazioni
- **Header Entry**: Spring animation da `-y-100`
- **Hover Effects**: Scale `1.02-1.05`
- **Tap Effects**: Scale `0.95-0.98`
- **Durations**: `0.2-0.3s` per responsiveness

## 🔧 Utilizzo

```jsx
import Header from './components/Header'

function App() {
  const [dark, setDark] = useState(false)

  return (
    <Header dark={dark} setDark={setDark} />
  )
}
```

## 🌐 Internazionalizzazione

Il componente utilizza il sistema **LanguageProvider + useLanguage** per:
- **Traduzioni in tempo reale**: Cambio lingua istantaneo senza ricaricamento
- **Stato globale condiviso**: Tutti i componenti si aggiornano automaticamente
- **Persistenza localStorage**: Mantiene la selezione tra sessioni
- **Context API**: Gestione centralizzata per performance ottimali

### Utilizzo del Sistema i18n

```jsx
import { useLanguage } from '../../hooks/useLanguage'

function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useLanguage()

  return (
    <div>
      <h1>{t('nav.features')}</h1>
      <button onClick={() => changeLanguage('en')}>
        Switch to English
      </button>
      <p>Current: {currentLanguage}</p>
    </div>
  )
}
```

### Setup Provider (già configurato)

```jsx
// In Router.jsx
import { LanguageProvider } from './hooks/useLanguage'

function Router() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  )
}
```

## 📱 Responsiveness

| Breakpoint | Comportamento |
|------------|---------------|
| `sm` (640px+) | Logo text visibile, Language selector visibile |
| `lg` (1024px+) | Desktop navigation visibile, Mobile menu nascosto |
| Mobile | Solo icone, hamburger menu, layout ottimizzato touch |

## 🚀 Performance

- **Lazy Loading**: Componenti caricati solo quando necessari
- **Memoization**: Hook ottimizzati per evitare re-render
- **Animations**: Hardware accelerated con transform/opacity
- **Bundle Size**: Componenti tree-shakeable
