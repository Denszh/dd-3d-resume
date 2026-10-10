import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 默认保留相对资源地址以支持子目录部署；Cloudflare Pages 使用根路径部署。
  base: process.env.VITE_BASE_PATH ?? './',
  plugins: [react()],
  server: { host: true, port: 5173 },
})
