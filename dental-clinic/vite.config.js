import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dist',
  build: {
    outDir: '../dist',
    emptyOutDir: false,
  },
});
