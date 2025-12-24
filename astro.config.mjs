import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://tools.claangel.site',
  integrations: [tailwind()],
  output: 'static',
  adapter: vercel({
    edgeMiddleware: false,
    includeFiles: [],
  }),
  vite: {
    build: {
      rollupOptions: {
        external: [],
      },
    },
  },
});