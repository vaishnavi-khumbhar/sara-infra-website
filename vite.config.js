import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves the site at https://vaishnavi-khumbhar.github.io/sara-infra-website/
// so every asset path must start with the repo name.
export default defineConfig({
  base: '/sara-infra-website/',
  plugins: [react()],
})
