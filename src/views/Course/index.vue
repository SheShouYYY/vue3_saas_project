<template>
  <Header></Header>
  <div class="course-filter">
    <div class="filter-main">
      <div class="filter-item">
        <div class="item-title">课程方向：</div>
        <ul>
          <li
            :class="activeIndex1 == '1' ? 'filter-all' : ''"
            @click="checkCategory1All"
          >
            全部
          </li>
          <li
            v-for="item1 in category1List"
            :key="item1.id"
            @click="checkCategory1(item1.id)"
            :class="activeIndex1 == item1.id ? 'filter-all' : ''"
          >
            {{ item1.categoryName }}
          </li>
        </ul>
      </div>
      <div class="filter-item">
        <div class="item-title">课程分类：</div>
        <ul class="filter-ul">
          <li
            :class="activeIndex2 == '2' ? 'filter-all' : ''"
            @click="checkCategory2All"
          >
            全部
          </li>
          <li
            v-for="item2 in category2List"
            :key="item2.id"
            @click="checkCategory2(item2.id)"
            :class="activeIndex2 == item2.id ? 'filter-all' : ''"
          >
            {{ item2.categoryName }}
          </li>
        </ul>
      </div>
      <div class="filter-item">
        <div class="item-title">课程难度：</div>
        <ul>
          <li
            :class="activeIndex3 == '0' ? 'filter-all' : ''"
            @click="checkLevelAll"
          >
            全部
          </li>
          <li
            v-for="item3 in levelList"
            :key="item3.id"
            :class="activeIndex3 == item3.id ? 'filter-all' : ''"
            @click="checkLevel(item3.id)"
          >
            {{ item3.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="course-list">
    <div class="list-main">
      <div class="list-t">
        <ul>
          <li
            v-for="(item, index) in sortList"
            :key="item.id"
            @click="changeSort(item)"
          >
            <span :class="sortIndex == item.id ? 'sort' : ''">{{
              item.name
            }}</span>
            <i v-if="index !== 3">|</i>
            <div class="caret" v-if="index === 3">
              <el-icon :size="8" :color="sortTop ? '#388fff' : ''"
                ><CaretTop
              /></el-icon>
              <el-icon :size="8" :color="!sortTop ? '#388fff' : ''"
                ><CaretBottom
              /></el-icon>
            </div>
          </li>
        </ul>
        <div>
          <el-radio-group
            size="small"
            v-model="radioValue"
            @change="handeleRadio"
          >
            <el-radio-button label="全部课程" />
            <el-radio-button label="免费课程" />
            <el-radio-button label="会员课程" />
          </el-radio-group>
        </div>
      </div>
      <ul class="list-c">
        <li v-for="course in courseList" :key="course.id">
          <img :src="course.courseCover" />
          <div class="course-content">
            <h3>{{ course.courseName }}</h3>
            <div>
              {{ useLevel(course.courseLevel).value }} ·
              {{ course.clicks }}人报名
            </div>
            <div class="price">
              <div class="price-vip">
                {{ course.isMember == 1 ? '会员课程' : '免费课程' }}
              </div>
              <div class="price-total">¥{{ course.salePrice }}</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="list-b">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="courseListTotal"
          @current-change="handeleCurrent"
        />
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>


<script setup>
//引入组件
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
//element
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'

// 引入判断等级的hooks
import useLevel from '@/hooks/useLevel'

// 判断选中的类名
let activeIndex1 = ref('1')
let activeIndex2 = ref('2')
let activeIndex3 = ref('0')

// 获取全局挂载方便获取接口
const { proxy } = getCurrentInstance()
const api = proxy.$api

// 整理课程对象这是一个空对象
const courseOption = () => ({
  pageNum: 1, // 页码
  pageSize: 8, // 一页的数量
  entity: {
    firstCategory: '', // 一级分类id
    secondCategory: '', // 二级分类id
    isMember: '', // 会员课程（传1）
    isFree: '', // 免费课程（传1）
    sortBy: '', // 排序
    courseLevel: '' // 课程等级
  }
})
// 复制出来的对象
const courseFn = reactive(courseOption())

// 一级分类菜单
let category1List = ref([])
// 获取数据
const getCategory1 = async () => {
  const result = await api.reqCategory1()
  if (result.data.meta.code == 200) {
    category1List.value = result.data.data.list
  }
}
getCategory1()

// 二级分类菜单
let category2List = ref([])
// 获取二级列表
const getCategory2 = async (id = -1) => {
  let categoryId = id
  const result = await api.reqCategory2({ categoryId })
  if (result.data.meta.code == 200) {
    category2List.value = result.data.data.list
  }
}
getCategory2()

// 课程难度的对象
let levelList = reactive([
  { id: 1, name: '初级' },
  { id: 2, name: '中级' },
  { id: 3, name: '高级' }
])

// 课程列表
let courseList = ref([])
let courseListTotal = ref(0)
// 获取课程列表
const getCourseList = async (courseFn) => {
  const result = await api.reqCourse(courseFn)
  if (result.data.meta.code == 200) {
    courseList.value = result.data.data.pageInfo.list
    courseListTotal.value = result.data.data.pageInfo.total
  }
}
// 获取课程列表
getCourseList(courseFn)

// 选中一级菜单的事件
const checkCategory1 = (id1) => {
  // 切换class
  activeIndex1.value = id1
  courseFn.entity.secondCategory = ''
  courseFn.entity.firstCategory = id1
  // 重新获取二级列表
  getCategory2(id1)
  getCourseList(courseFn)
  console.log(courseFn, '111')
}

// 选中二级菜单的事件
const checkCategory2 = (id2) => {
  // 切换class
  activeIndex2.value = id2
  courseFn.entity.secondCategory = id2
  getCourseList(courseFn)
}

// 选中课程难度的事件
const checkLevel = (id3) => {
  // 切换class
  activeIndex3.value = id3
  courseFn.entity.courseLevel = id3
  getCourseList(courseFn)
}

// 选中全部分类1
const checkCategory1All = () => {
  activeIndex1.value = '1'
  activeIndex2.value = '2'
  getCourseList(courseOption())
  getCategory2()
}
// 选中全部分类2
const checkCategory2All = () => {
  activeIndex2.value = '2'
  courseFn.entity.secondCategory = ''
  getCourseList(courseFn)
}
// 选中全部等级
const checkLevelAll = () => {
  activeIndex3.value = '0'
  courseFn.entity.courseLevel = ''
  getCourseList(courseFn)
}

// 综合/最新购买....
let sortIndex = ref(0)
const sortList = reactive([
  { id: 0, name: '综合' },
  { id: 1, name: '最新课程' },
  { id: 2, name: '最多购买' },
  { id: 3, name: '价格' }
])
let sortTop = ref(true)
const changeSort = (item) => {
  sortIndex.value = item.id
  if (item.id === 0) {
    courseFn.entity.sortBy = ''
    getCourseList(courseFn)
  }
  if (item.id == 1) {
    courseFn.entity.sortBy = 'time-asc'
    getCourseList(courseFn)
  }
  if (item.id == 2) {
    courseFn.entity.sortBy = 'purchase-asc'
    getCourseList(courseFn)
  }
  if (item.id == 3) {
    sortTop.value = !sortTop.value
    if (sortTop.value) {
      courseFn.entity.sortBy = 'price-asc'
    } else {
      courseFn.entity.sortBy = 'price-desc'
    }
    getCourseList(courseFn)
  }
}

// 切换会员和免费课程
let radioValue = ref('')
const handeleRadio = (val) => {
  if (val == '全部课程') {
    courseFn.entity.isFree = ''
    courseFn.entity.isMember = ''
    getCourseList(courseFn)
  } else if (val == '会员课程') {
    courseFn.entity.isMember = 1
    courseFn.entity.isFree = ''
    getCourseList(courseFn)
  } else {
    courseFn.entity.isFree = 1
    courseFn.entity.isMember = ''
    getCourseList(courseFn)
  }
}

// 分页器
const handeleCurrent = (val) => {
  courseFn.pageNum = val
  getCourseList(courseFn)
}
</script> 

<style scoped>
.course-filter {
  width: 100%;
  height: 197px;
  background: #f3f5f9;
}
.filter-main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 1000px;
  height: 197px;
  margin: 0 auto;
}
.filter-item {
  display: flex;
  align-items: center;
}
.filter-item .filter-ul {
  margin-top: 12px;
}
.filter-item .filter-ul li {
  margin-bottom: 10px;
}

.item-title {
  margin-left: 20px;
  width: 100px;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
.filter-item ul {
  width: 1000px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.filter-item ul li {
  margin-right: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #515759;
  cursor: pointer;
}
.filter-item ul li.filter-all {
  padding: 0 8px;
  line-height: 30px;
  text-align: center;
  color: #388fff;
  font-size: 14px;
  background: rgba(44, 128, 255, 0.1);
  border-radius: 5px;
}
.course-list {
  padding: 50px 0;
  background: #fff;
}
.list-main {
  width: 1000px;
  margin: 0 auto;
}
.list-t {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.list-t ul {
  display: flex;
}
.list-t ul li {
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #515759;
}
.list-t ul li i {
  margin: 0 12px;
}
.list-t ul .sort {
  color: #388fff;
}
.caret {
  display: flex;
  flex-direction: column;
}
.list-c {
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
}
.list-c li {
  float: left;
  margin-top: 38px;
  margin-right: 10px;
  width: 240px;
  height: 245px;
  background: #ffffff;
  box-shadow: 1px 3px 3px rgba(27, 39, 94, 0.1);
  border-radius: 5px;
}
.list-c li img {
  width: 240px;
  height: 153px;
}
.course-content {
  padding: 7px 16px;
}
.course-content h3 {
  font-size: 12px;
  color: #333333;
}
.course-content > div {
  padding: 7px 0;
  font-size: 12px;
  color: #808080;
}
.price {
  display: flex;
}
.price-vip {
  width: 64px;
  height: 16px;
  margin-right: 10px;
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #ff928e 0%, #fe7062 99%);
  border-radius: 16px 0px 16px 0px;
}
.price-total {
  font-size: 12px;
  color: #ff727f;
}
.list-b {
  padding-top: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>