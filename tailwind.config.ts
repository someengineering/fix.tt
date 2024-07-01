import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      'marian-blue': {
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
        sans: [
          'var(--font-plus-jakarta-sans)',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '3.25rem' }],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
