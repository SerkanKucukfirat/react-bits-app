import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Preview (GitHub Pages): the 3D site lives next to the classic site at <base>/3d/.
// Live (LIVE=1, slimwell.com.tr): the 3D site is the whole site, served from the domain root,
// and it carries the shared public/ files (device photos, wp/ images, CNAME) itself.
const live = process.env.LIVE === '1'
const base = live ? '/' : (process.env.BASE_PATH ?? '/') + '3d/'

export default defineConfig({
  root: import.meta.dirname,
  base,
  publicDir: live ? path.resolve(import.meta.dirname, '../public') : 'public',
  define: { 'import.meta.env.VITE_LIVE': JSON.stringify(live) },
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(import.meta.dirname, '../src'),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, live ? '../dist' : '../dist/3d'),
    emptyOutDir: true,
  },
})
