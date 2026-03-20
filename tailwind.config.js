/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'floral-white': '#F5F5ED',
        'blush-pop': '#FFABD2',
        'pine-teal': '#15221b',
        'canary-yellow': '#FFF946',
        'pearl-aqua': '#8DDEDE',
      },
      fontFamily: {
        'tt-commons': ['TT Commons', 'Helvetica', 'sans-serif'],
        'tt-commons-light': ['TTCommonsLight', 'Helvetica', 'sans-serif'],
        'geometric': ['Geometric415Lite', 'Helvetica', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
};
