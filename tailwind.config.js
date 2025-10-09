/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // dark mode toggle
  theme: {
    extend: {
      keyframes: {
        'pop-fade': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '60%': { transform: 'scale(1.03)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'pop-fade': 'pop-fade 220ms cubic-bezier(.2,.9,.2,1) both',
      },
    },
  },
  plugins: [],
}
