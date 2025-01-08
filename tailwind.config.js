/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/client/**/*.{html,php}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}