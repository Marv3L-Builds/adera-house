import tailwindcss from '@tailwindcss/vite';
import vinext from 'vinext';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: { exclude: ['next/link'] },
  plugins: [tailwindcss(), vinext(), nitro({ preset: 'vercel' })],
});
