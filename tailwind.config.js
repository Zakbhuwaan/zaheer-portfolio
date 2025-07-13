/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: '#0a1124', // Deep midnight blue
          800: '#172554', // Slightly lighter
        },
        primary: {
          400: '#c084fc', // Light purple
          500: '#a259f7', // Main purple
        },
        light: {
          100: '#f3f4f6', // Light gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'Rubik', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}

