import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // The site is hosted at the domain root; routes such as /starift/app still
  // need assets to resolve from /assets instead of /starift/assets.
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  server: { host: true, port: 5173 },
})
