import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://tools.claangel.site',
  integrations: [tailwind()],
  output: 'server',
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
    ssr: {
      noExternal: ['@supabase/supabase-js'],
    },
  },
});
