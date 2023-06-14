import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, './src'),
    }
  },
  /**
   * 当你的开发环境需要处理跨域时，你可以使用 proxy 选项来配置一个代理。
   * @param port 前端项目启动服务端口
   * @param target 代理目标地址
   */
  server: {
    host: "0.0.0.0",
    port:3000,
    proxy: {
      '/dev-api': {
        target: "",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      }
    }
  } 
})
