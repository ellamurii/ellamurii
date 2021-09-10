const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
