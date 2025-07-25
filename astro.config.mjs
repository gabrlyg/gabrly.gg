import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  adapter: netlify(),
});
