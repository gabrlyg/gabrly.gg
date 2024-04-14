import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
      },
      fontFamily: {
        lato: ['"Lato"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'box-md': '4px 6px rgb(148 163 184 / var(--tw-border-opacity))',
      },
    },
  },
  plugins: [],
};
