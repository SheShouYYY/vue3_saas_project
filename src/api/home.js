import request from '@/utils/request.js'

// 轮播图的接口
export const reqGetSliders = () => request({ url: '/slider/getSliders' })

// 新上好课的接口
export const reqMostNew = (data) => request({ url: '/course/mostNew', method: 'post', data })

// 获取一级分类列表
export const reqCategory1 = () => request({ url: '/course/category/getFirstCategorys' })

// 获取二级分类id 
export const reqCategory2 = (params) => request({ url: `/course/category/getSecondCategorys`, params })

// 获取课程接口
export const reqCourse = (data) => request({ url: '/course/search', method: 'post', data })
