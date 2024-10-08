/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ca1515',
        'secondary': '#111111'
      },
    },
    screens: {
      'xs': '576px',
      'sm': '768px',
      'md': '992px',
      'lg': '1200px'
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
