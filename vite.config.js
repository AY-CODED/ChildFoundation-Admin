import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ensure this is exactly what you are importing

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})