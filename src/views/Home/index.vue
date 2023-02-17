<template>
  <!-- 头部 -->
  <Header></Header>
  <!-- 轮播图 -->
  <NavSwiper></NavSwiper>
  <!-- 信息 -->
  <div ref="target">
    <NewCourse v-if="targetIsVisible"></NewCourse>
  </div>
</template>

<script setup>
// 按需引入组件，当用户看到了再加载
import { useIntersectionObserver } from '@vueuse/core'
import Header from '@/components/Header.vue'
import NavSwiper from '@/views/Home/NavSwiper.vue'

// 按需引入组件，当用户看到了再加载
const NewCourse = defineAsyncComponent(() =>
  import('@/views/Home/NewCourse.vue')
)
const target = ref(null)
const targetIsVisible = ref(true)

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    targetIsVisible.value = isIntersecting
  }
})
// ----------------------
</script>

<style>
</style>