import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,       // <— aquí fijas el puerto
    strictPort: true  // <— opcional: falla si 5173 ya está en uso
  }
})
