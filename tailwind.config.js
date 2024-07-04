/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: ["./_site/**/*.{html,js}",],
  theme: {
    extend: {
      screens: {
        'max-3xl': {'max': '1919px'},
        'max-md': {'max': '767px'},
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
        sans: ["Freizeit", "Icons", "sans-serif"],
        pluto: ["Pluto-Regular", "sans-serif"],
        serif: ["Inferi", "Icons", "serif"],
      },
      spacing: {
        'def': '0.75rem',
        'def-2': '1.5rem',
        'def-3': '2.25rem',
        'def-4': '3rem',
        'def-5': '3.75rem',
        'def-6': '4.5rem',
      },

      gridRow: {
        'span-7': 'span 7 / span 7',
      },

      listStyleType: {
        'square': 'square',
      }
    },

    colors: {
      'bg': 'var(--bg)',
      'bg-dark': 'var(--bg-dark)',
      "accent": "var(--accent)",
      'accent-sec': 'var(--accent-sec)',
      'base-dark': 'var(--base-dark)',
      'base-bright': 'var(--base-bright)',
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('max-md', "@media screen and (max-width: theme('screens.md'))"); // instead of hard-coded 640px use sm breakpoint value from config. Or anything
    }),
  ],
}
