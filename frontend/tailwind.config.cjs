/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilita o modo escuro
  theme: {
    extend: {
      colors: {
        'infinity-orange': '#ba1d0a',
        'infinity-dark': '#101010',
      }
    },
  },
  plugins: [],
}