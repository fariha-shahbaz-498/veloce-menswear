import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This tells Vite to look inside your "src" folder for the index.html file
  root: './src',
  server: {
    port: 5173,
    // Ensures fallback routing works flawlessly for your page views
    historyApiFallback: true,
  }
});