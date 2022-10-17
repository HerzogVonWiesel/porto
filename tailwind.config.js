/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: ["./_site/**/*.{html,js}",],
  theme: {
    extend: {
      screens: {
        'max-3xl': {'max': '1919px'},
      },

      maxWidth: {
        'screen-3xl': '1920px',
      },

      cursor: {
        'custom': 'url("/images/cursor_blk.svg"), auto',
        'custom-dark': 'url("/images/cursor_wht.svg"), auto',
        'custom-clk': 'url("/images/cursor_clk.svg") 0 15, pointer',
      },

      fontFamily: {
        freizeit: ["Freizeit", "Icons", "sans-serif"],
        pluto: ["Pluto-Regular", "sans-serif"],
      },
    },

    colors: {
      'bg': '#fff7ed',
      'dark-bg': '#200F00',
      'orangered': 'orangered',
      'darkslateblue': 'darkslateblue',
      'black': 'black',
      'white': 'white',
      'orange-50': '#fff7ed',
      'bisque': 'bisque',
      'dark-orange': '#200F00',
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('max-md', "@media screen and (max-width: theme('screens.md'))"); // instead of hard-coded 640px use sm breakpoint value from config. Or anything
    }),
  ],
}
