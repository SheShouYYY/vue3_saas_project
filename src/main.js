// 引入
import { createApp } from 'vue'
// 引入pinia
import { createPinia } from 'pinia'
// 引入app组件
import App from './App.vue'
// 引入路由
import router from './router'
// 引入接口
import * as api from "./api/home.js"
// 引入初始样式表
import '/reset.css'

// 创建实例
const app = createApp(App)

// 原型上挂载
app.config.globalProperties.$api = api
// 使用pinia
app.use(createPinia())
// 使用路由
app.use(router)

// 挂载
app.mount('#app')
