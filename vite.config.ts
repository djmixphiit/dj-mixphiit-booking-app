import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages under repo dj-mixphiit-booking-app
  base: '/dj-mixphiit-booking-app/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}) 
