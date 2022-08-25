import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://47.93.114.103:6688/manage",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }
  }
})
