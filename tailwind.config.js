/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./country.html", "./main.js","./src/**/*.{html,js}"],
  theme: {
    extend: {
      visibility: ['group-hover'],
      fontFamily: {
        NunitoSans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        DarkBlueDM: 'hsl(209, 23%, 22%)',
        VeryDarkBlueDM: 'hsl(207, 26%, 17%)',
        VeryDarkBlueLM: 'hsl(200, 15%, 8%)',
        DarkGrayLM: 'hsl(0, 0%, 52%)',
        VeryLightGrayLM: 'hsl(0, 0%, 98%)',
        White: 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
}