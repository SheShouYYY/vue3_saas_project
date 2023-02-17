import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],//自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    proxy: {
      //  '/api'为请求前缀，用于控制是不是走代理，想走代理时就在请求前缀前边加上这个请求前缀
      '/api': {
        target: 'http://testapi.xuexiluxian.cn',
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

