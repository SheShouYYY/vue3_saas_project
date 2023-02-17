<template>
  <div class="nav-swiper">
    <div class="nav-swiper-main">
      <div class="swiper-t">
        <ul @mouseleave="mouseLeave">
          <li
            v-for="category1 in category1List"
            :key="category1.id"
            :class="categoryId == category1.id ? 'active' : ''"
            @mouseenter="mouseCategory1(category1.id)"
          >
            <span>{{ category1.categoryName }}</span>
            <el-icon><ArrowRight /></el-icon>
          </li>
          <div class="active-r" v-show="isShow">
            <div class="active-r-t">
              <h3 class="active-title">基础知识</h3>
              <div>
                <div>知识点：</div>
                <ul>
                  <li v-for="category2 in category2List" :key="category2.id">
                    {{ category2.categoryName }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="active-r-b">
              <ul>
                <li v-for="course in courseList" :key="course.id">
                  <img :src="course.courseCover" />
                  <div>
                    <div class="active-course-title">
                      {{ course.firstCategoryName }}
                    </div>
                    <div class="active-course-type">
                      {{ useLevel(course.courseLevel).value }}·{{
                        course.clicks
                      }}人报名
                    </div>
                    <div class="active-course-price">免费学习</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ul>
        <div>
          <el-carousel :interval="2000" arrow="always">
            <el-carousel-item v-for="item in swiperList" :key="item.id">
              <img :src="item.imageUrl" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <ul class="swiper-b">
        <li>
          <h3>
            <img src="@/assets/image/chuji.png" />
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
        <li>
          <h3>
            <img src="@/assets/image/chuji.png" />
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
        <li>
          <h3>
            <img src="@/assets/image/chuji.png" />
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
        <li>
          <h3>
            <img src="@/assets/image/chuji.png" />
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
        <li>
          <h3>
            <img src="@/assets/image/chuji.png" />
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 引入判断等级的hooks
import useLevel from '@/hooks/useLevel'

//element的icon
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from '@vue/reactivity'

// 控制鼠标移入层显示
let isShow = ref(false)

// 获取全局挂载方便获取接口
const { proxy } = getCurrentInstance()
const api = proxy.$api

// 轮播图
let swiperList = ref([])
// 发送请求获取数据
api.reqGetSliders().then((res) => {
  swiperList.value = res.data.data.list
})

// 一级分类菜单
let category1List = ref([])
// 二级分类菜单
let category2List = ref([])
// 课程列表
let courseList = ref([])
// 存储id切换class
let categoryId = ref('')
// 获取数据
api.reqCategory1().then((res) => (category1List.value = res.data.data.list))
// 事件
const mouseCategory1 = (id) => {
  // 显示
  isShow.value = true

  // 保存id作为标识，切换class
  categoryId.value = id

  // 获取二级列表
  api
    .reqCategory2({ categoryId: id })
    .then((res) => (category2List.value = res.data.data.list))

  // 获取课程列表
  api
    .reqCourse({ pageNum: 1, pageSize: 4, entity: { firstCategory: id } })
    .then((res) => (courseList.value = res.data.data.pageInfo.list))
}
const mouseLeave = () => {
  isShow.value = false
  categoryId.value = ''
}
</script>

<style scoped>
.nav-swiper {
  background: url('@/assets/image/transitionbg.png') no-repeat;
  width: 100%;
  height: 600px;
}
.nav-swiper-main {
  width: 1000px;
  padding: 47px 0;
  margin: 0 auto;
}
.swiper-t {
  display: flex;
  height: 373px;
  border-radius: 11px 11px 0px 0px;
}
.swiper-t > ul {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 160px;
  height: 100%;
  background: #2b283d;
  border-radius: 11px 0px 0px 0px;
}
.swiper-t > ul > li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 37px;
  padding: 0 20px;
  font-size: 16px;
  color: #f2f2f2;
  cursor: pointer;
}
.active {
  background: linear-gradient(
    90deg,
    #3fe5ff 0%,
    rgba(62, 222, 255, 0.93) 2%,
    rgba(60, 203, 255, 0.73) 9%,
    rgba(58, 186, 255, 0.56) 17%,
    rgba(57, 172, 255, 0.41) 25%,
    rgba(55, 160, 255, 0.28) 33%,
    rgba(54, 150, 255, 0.18) 43%,
    rgba(53, 142, 255, 0.1) 53%,
    rgba(53, 137, 255, 0.04) 64%,
    rgba(53, 133, 255, 0.01) 77%,
    rgba(53, 133, 255, 0) 100%
  );
}
.active-r {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 160px;
  z-index: 999;
  width: 724px;
  height: 373px;
  background: #ffffff;
  border-radius: 0px 11px 0px 0px;
}
.active-r-t {
  padding: 23px 30px;
}
.active-r-t > div {
  display: flex;
  margin-top: 11px;
}
.active-r-t > div ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: 7px;
}
.active-r-t > div ul li + li {
  margin-left: 20px;
}
.active-r-b {
  width: 724px;
  height: 217px;
  background: #f3f5f6;
}
.active-r-b > ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  padding: 0 30px;
}
.active-r-b > ul li {
  display: flex;
  width: 50%;
}
.active-r-b > ul li img {
  width: 140px;
  height: 81px;
}
.active-r-b > ul li > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 4px;
}
.active-course-title {
  font-size: 14px;
  color: #333333;
}
.active-course-type {
  font-size: 12px;
  color: #808080;
}
.active-course-price {
  font-size: 12px;
  color: #3586ff;
}
.swiper-t > div {
  width: 840px;
  height: 373px;
}
.el-carousel {
  height: 373px;
}
.el-carousel img {
  width: 100%;
  height: 373px;
}
:deep(.el-carousel__container) {
  height: 373px;
}
.swiper-b {
  display: flex;
}
.swiper-b li {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 213px;
  height: 133px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 0px 0px 0px 11px;
}
.swiper-b li img {
  width: 64px;
  height: 64px;
}
.swiper-b li div {
  margin-left: 11px;
}
.swiper-b li div h4 {
  font-size: 16px;
  color: #333333;
}
.swiper-b li div span {
  font-size: 12px;
  color: #808080;
}
</style>