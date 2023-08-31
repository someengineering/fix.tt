import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      primary: {
        '50': '#eef7ff',
        '100': '#daecff',
        '200': '#bddfff',
        '300': '#8fccff',
        '400': '#5baeff',
        '500': '#358dfc',
        '600': '#1e6ef2',
        '700': '#1757de',
        '800': '#1946b4',
        '900': '#1c4396', // Marian Blue
        '950': '#152856',
      },
      'cornflower-blue': {
        '50': '#f1f4fd',
        '100': '#dfe7fa',
        '200': '#c7d6f6',
        '300': '#a0bcf0',
        '400': '#648de5', // Cornflower Blue
        '500': '#5275df',
        '600': '#3d58d3',
        '700': '#3447c1',
        '800': '#2f3b9e',
        '900': '#2b357d',
        '950': '#1e234d',
      },
      tangerine: {
        '50': '#fffbec',
        '100': '#fff5d3',
        '200': '#ffe8a5',
        '300': '#ffd66d',
        '400': '#ffb832',
        '500': '#ffa00a',
        '600': '#f78400', // Tangerine
        '700': '#cc6402',
        '800': '#a14d0b',
        '900': '#82410c',
        '950': '#461f04',
      },
      jade: {
        '50': '#ebfef4',
        '100': '#d0fbe2',
        '200': '#a4f6ca',
        '300': '#6aebaf',
        '400': '#2fd88f',
        '500': '#0abf77',
        '600': '#00ac6b', // Jade
        '700': '#007c51',
        '800': '#036241',
        '900': '#045037',
        '950': '#012d20',
      },
      amaranth: {
        '50': '#fff1f3',
        '100': '#ffe4e7',
        '200': '#ffccd5',
        '300': '#fea3b2',
        '400': '#fd6f8b',
        '500': '#f63d65',
        '600': '#e01a4f', // Amaranth
        '700': '#c01043',
        '800': '#a1103f',
        '900': '#8a113c',
        '950': '#4d041d',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito-sans)'],
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
