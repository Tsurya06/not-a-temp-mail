import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return defineConfig({
    plugins: [react()],
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
    define: {
      'import.meta.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
      'import.meta.env.VITE_STORAGE_KEY': JSON.stringify(env.VITE_STORAGE_KEY ),
      'import.meta.env.VITE_PUBLIC_URL': JSON.stringify(env.VITE_PUBLIC_URL)
    }
  })
}