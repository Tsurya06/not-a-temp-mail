import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/not-a-temp-mail/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})
