/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#3326ae",
        secondary:"#28a745",
        error:"#dc3545",
        warning:"#fd7e14",
        emphasis:"#6f42c1" 
      }
    },
    /* colors:{
      primary:"#3326ae",
      secondary:"#28a745",
      error:"#dc3545",
      warning:"#fd7e14",
      emphasis:"#6f42c1"
    } */
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('flowbite/plugin')
  ],
}
