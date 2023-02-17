<template>
  <div class="new-course">
    <div class="new-course-main">
      <div class="new-course-t">
        <div class="title-hot">
          <div class="hot">HOT</div>
          <div class="hot-c"></div>
        </div>
        <div class="title-txt">新上好课</div>
      </div>
      <ul class="new-course-b">
        <li v-for="item in mostNewList" :key="item.id">
          <img :src="item.courseCover" />
          <div class="course-content">
            <h3>{{ item.courseName }}</h3>
            <div>
              {{ useLevel(item.courseLevel).value }} · {{ item.clicks }}人报名
            </div>
            <div class="price">
              <div class="price-vip">会员专享</div>
              <div class="price-total">¥{{ item.salePrice }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 引入判断等级的hooks
import useLevel from '@/hooks/useLevel'
// 获取全局挂载方便获取接口
const { proxy } = getCurrentInstance()
const api = proxy.$api

// 新上好课
let mostNewList = ref([])
const reqMostNewList = async () => {
  const data = { pageNum: 1, pageSize: 10 }
  const result = await api.reqMostNew(data)
  if (result.status === 200) mostNewList.value = result.data.data.pageInfo.list
}
reqMostNewList()
</script>
<style scoped>
.new-course {
  padding: 38px 0;
  background: #f3f5f9;
}
.new-course-main {
  width: 1000px;
  margin: 0 auto;
}
.new-course-t {
  display: flex;
}
.title-hot {
  display: flex;
}
.title-hot .hot {
  width: 65px;
  line-height: 32.5px;
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #ff727f 0%, #fc685c 100%);
  border-radius: 5px 0px 5px 5px;
}
.title-hot .hot-c {
  width: 0;
  height: 0;
  border: 3px solid #fc685c;
  border-bottom-color: transparent;
  border-right-color: transparent;
}
.title-txt {
  position: relative;
  z-index: 999;
  margin-left: 11px;
  font-size: 23px;
  color: #333333;
}
.title-txt:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
  width: 120%;
  margin-left: -10%;
  height: 5px;
  background: linear-gradient(90deg, #fbf84f 0%, #fea935 100%);
  border-radius: 5px;
}
.new-course-b {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.new-course-b li {
  margin-left: 10px;
  float: left;
  margin-top: 38px;
  width: 240px;
  height: 245px;
  background: #ffffff;
  box-shadow: 1px 3px 3px rgba(27, 39, 94, 0.1);
  border-radius: 5px;
}
.new-course-b li img {
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
  margin-right: 8px;
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #ff928e 0%, #fe7062 99%);
  border-radius: 16px 0px 16px 0px;
}
.price-total {
  font-size: 12px;
  color: #ff727f;
}
</style>