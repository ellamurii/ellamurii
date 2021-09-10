const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        secondary: colors.pink,
        red: colors.red,
      },
      fontFamily: {
        'manrope': ['"Manrope"']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
