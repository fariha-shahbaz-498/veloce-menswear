import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // This explicitly forces Vite to look at the main root folder for index.html
        main: resolve(__dirname, 'index.html'), 
      },
    },
  },
});