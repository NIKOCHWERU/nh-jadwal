/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefdf9',
          100: '#F8F7F2',
          200: '#f0ead1',
          300: '#e6d4a5',
          400: '#C4A747',
          500: '#A97C09',
          600: '#8b6407',
          700: '#6e4f06',
          800: '#573f05',
          900: '#463304',
        }
      }
    },
  },
  plugins: [],
}