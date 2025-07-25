export default function Header({ dark, setDark }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-end p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors">
      <button
        aria-label="Toggle dark mode"
        onClick={() => setDark(d => !d)}
        className="rounded-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
      >
        {dark ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  )
}
