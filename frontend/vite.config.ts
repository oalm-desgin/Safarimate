import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api/auth': {
        target: 'http://localhost:8085',
        changeOrigin: true,
      },
      '/api/places': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/api/prayer': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      },
      '/api/trips': {
        target: 'http://localhost:8084',
        changeOrigin: true,
      },
    },
  },
})

