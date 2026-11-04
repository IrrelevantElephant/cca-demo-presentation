import { defineConfig } from 'vite';

// Keep the upstream Reveal library build and its dist/ artifacts untouched.
export default defineConfig({
  base: './',
  publicDir: false,
  server: { port: 8000 },
  build: { outDir: 'deck-dist', emptyOutDir: true },
});
