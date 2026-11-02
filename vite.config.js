import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from the custom domain root (www.sarainfra.com), so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})