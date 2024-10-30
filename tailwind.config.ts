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
      purple: {
        '50': '#f4f3ff',
        '100': '#ece9fe',
        '200': '#dbd7fd',
        '300': '#c1b6fc',
        '400': '#a28cf9',
        '500': '#845ef4',
        '600': '#7640eb',
        '700': '#652ad7',
        '800': '#5323b4',
        '900': '#461f93',
        '950': '#2a1164',
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
