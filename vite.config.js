import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  tailwindcss: {
    config: './tailwind.config.js',
  },
  plugins: [react()],
})
