import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import { config } from 'dotenv';

// Load .env file
config();

export default defineConfig({
  site: 'https://tools.claangel.site',
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel(),
  alias: {
    '@components': new URL('./src/components', import.meta.url).pathname,
    '@assets': new URL('./src/assets', import.meta.url).pathname,
    '@layouts': new URL('./src/layouts', import.meta.url).pathname,
    '@pages': new URL('./src/pages', import.meta.url).pathname,
    '@styles': new URL('./src/styles', import.meta.url).pathname,
  },
  vite: {
    define: {
      'process.env.BLOB_READ_WRITE_TOKEN': JSON.stringify(process.env.BLOB_READ_WRITE_TOKEN)
    },
    build: {
      rollupOptions: {
        external: [],
      },
    },
  },
});