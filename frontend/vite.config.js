import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Adjust the port to match your Node.js backend
      // '/api': 'https://glacial-lake-outburst-floods-system.onrender.com', // Adjust the port to match your Node.js backend

    },
  },
});