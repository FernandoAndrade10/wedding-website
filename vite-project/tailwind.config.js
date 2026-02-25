/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "hover:text-peach",
    "text-peach",
    "hover:text-sage",
    'text-sage',
    'hover:text-rust',
    'text-rust',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        float: 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        mauve: '#CE9C9C',
        sage: '#A3B18A',
        peach: '#FFBC9A',
        rust: '#B35C44',
      },
      fontFamily: {
        cutout: ['"Staatliches"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

