import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://tools.claangel.site',
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel({
    edgeMiddleware: false
  }),
  alias: {
    '@components': new URL('./src/components', import.meta.url).pathname,
    '@assets': new URL('./src/assets', import.meta.url).pathname,
    '@layouts': new URL('./src/layouts', import.meta.url).pathname,
    '@pages': new URL('./src/pages', import.meta.url).pathname,
    '@styles': new URL('./src/styles', import.meta.url).pathname,
  },
  vite: {
    ssr: {
      noExternal: ['@vercel/blob']
    },
    build: {
      rollupOptions: {
        external: [],
      },
    },
  },
});