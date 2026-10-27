import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The 3D site lives next to the classic site: <base>/3d/
const base = (process.env.BASE_PATH ?? '/') + '3d/'

export default defineConfig({
  root: import.meta.dirname,
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(import.meta.dirname, '../src'),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, '../dist/3d'),
    emptyOutDir: true,
  },
})
