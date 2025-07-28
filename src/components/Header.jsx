export default function Header({ dark, setDark }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-end p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-colors">
      <button
        aria-label="Toggle theme"
        onClick={() => setDark(d => !d)}
        className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
      >
        {dark ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
