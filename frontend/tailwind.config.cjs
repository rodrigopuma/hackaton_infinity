/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Para habilitar o modo escuro
  theme: {
    extend: {
      colors: {
        'infinity-dark': '#1A1A1A', // fundo principal escuro
        'infinity-gray': '#2A2A2A', // Cor para cards e elementos de UI
        'infinity-gray-light': '#404040', // Um cinza um pouco mais claro para bordas
        'infinity-red': '#E84A3F', // A cor destaque da Infinity
        'infinity-text': '#F0F0F0' // Cor principal do texto (branco suave)
      },

      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // fonte customizada
      }
    },
  },
  plugins: [],
}