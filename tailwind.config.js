/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Основные цвета ShabbatHub
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9ff',
          300: '#a3bfff',
          400: '#7a9cff',
          500: '#1e3a8a', // Основной синий
          600: '#1e3a8a',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        },
        gold: {
          400: '#fbbf24',
          500: '#d4a853', // Золотой акцент
          600: '#b8942e',
        },
        cream: '#faf8f5',
      },
      fontFamily: {
        // Шрифты с поддержкой иврита и кириллицы
        sans: ['Rubik', 'system-ui', 'sans-serif'],
        hebrew: ['Frank Ruhl Libre', 'David Libre', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
