import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },
      '/files': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/files2': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/files3': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/ProfilePhotos': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
