import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { BASE_URL } from './src/utils/apiPaths.js'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: BASE_URL, //'http://localhost:8000', or your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
})
