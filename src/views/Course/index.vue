<template>
  <Header></Header>
  <div class="course-filter">
    <div class="filter-main">
      <div class="filter-item">
        <div class="item-title">课程方向：</div>
        <ul>
          <li class="filter-all">全部</li>
          <li v-for="item1 in category1List" :key="item1.id">
            {{ item1.categoryName }}
          </li>
        </ul>
      </div>
      <div class="filter-item">
        <div class="item-title">课程分类：</div>
        <ul class="filter-ul">
          <li class="filter-all">全部</li>
          <li v-for="item2 in category2List" :key="item2.id">
            {{ item2.categoryName }}
          </li>
        </ul>
      </div>
      <div class="filter-item">
        <div class="item-title">课程难度：</div>
        <ul>
          <li class="filter-all">全部</li>
          <li v-for="item3 in levelList" :key="item3.id">{{ item3.name }}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="course-list">
    <div class="list-main">
      <div class="list-t">
        <ul>
          <li>综合</li>
          <li>|</li>
          <li>最新课程</li>
          <li>|</li>
          <li>最多购买</li>
          <li>|</li>
          <li>
            <span>价格</span>
            <div class="caret">
              <el-icon :size="8"><CaretTop /></el-icon>
              <el-icon :size="8"><CaretBottom /></el-icon>
            </div>
          </li>
        </ul>
        <div>
          <el-checkbox label="免费课程" />
          <el-checkbox label="会员免费课程" />
        </div>
      </div>
      <ul class="list-c">
        <li v-for="course in courseList" :key="course.id">
          <img :src="course.courseCover" />
          <div class="course-content">
            <h3>{{ course.courseName }}</h3>
            <div>
              {{ useLevel(courseLevel).value }} · {{ course.clicks }}人报名
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
        <el-pagination background layout="prev, pager, next" :total="1000" />
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

// 获取全局挂载方便获取接口
const { proxy } = getCurrentInstance()
const api = proxy.$api

// 整理课程对象
const courseOption = reactive({
  pageNum: 1, // 页码
  pageSize: 8, // 一页的数量
  entity: {
    firstCategory: '', // 一级分类id
    secondCategory: '', // 二级分类id
    isMember: '', // 会员课程（传1）
    isFree: '', // 免费课程（传1）
    sortBy: '' // 排序
  }
})

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
const getCategory2 = async () => {
  const categoryId = -1
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
// 获取课程列表
const getCourseList = async (courseOption) => {
  const result = await api.reqCourse(courseOption)
  if (result.data.meta.code == 200) {
    courseList.value = result.data.data.pageInfo.list
  }
}
// 获取课程列表
getCourseList(courseOption)
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
  width: 50px;
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
  align-items: center;
  margin-right: 16px;
  font-size: 14px;
  font-weight: 400;
  color: #515759;
}
.caret {
  display: flex;
  flex-direction: column;
}
.list-c {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list-c li {
  float: left;
  margin-top: 38px;
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