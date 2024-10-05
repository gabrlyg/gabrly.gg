import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

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
  integrations: [react(), tailwind(), mdx()],
  output: 'server',
  adapter: netlify(),
});
