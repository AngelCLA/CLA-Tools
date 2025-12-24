// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://tools.claangel.site', // Cambia esto por tu dominio real
  vite: {
    plugins: [tailwindcss()]
  }
});