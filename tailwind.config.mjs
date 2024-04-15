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
        'jetbrains-mono': ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        'box-md': '4px 6px rgb(148 163 184 / var(--tw-border-opacity))',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.toggle-slider': {
          content: '""',
          borderRadius: '0.125rem',
          backgroundColor: 'rgb(51 65 85)',
          position: 'absolute',
          display: 'inline-block',
          width: '24px',
          height: '24px',
          top: '2px',
          left: '2px',
          transition: '0.2s',
        },
        '.toggle-slider-on': {
          transform: 'translateX(32px)',
          backgroundColor: 'rgb(226 232 240)',
        },
      });
    },
  ],
};
