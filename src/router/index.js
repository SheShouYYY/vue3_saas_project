// 引入
import { createRouter, createWebHistory } from 'vue-router'

// 创建路由
const router = createRouter({
  // 路由模式 history
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由配置
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home/index.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('../views/Course/index.vue')
    }
  ]
})

// 暴露
export default router
