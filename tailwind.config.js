/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        strong: 'MontserratBold',
        balanced: 'MontserratSemiBold',
        standard: 'MontserratMedium',
        soft: 'MontserratRegular',
      },
    },
  },
  plugins: [],
}
