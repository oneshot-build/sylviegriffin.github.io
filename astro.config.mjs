// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  security: {
    checkOrigin: false
  },
  site: 'https://sylviegrf.com',
  integrations: [tailwind(), react()],
  server: {
    host: '0.0.0.0',
    port: 4321,
    allowedHosts: true,
  },
});
