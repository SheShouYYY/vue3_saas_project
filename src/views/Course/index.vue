<template>
  <Header></Header>
  <div class="course-filter">
    <div class="filter-main">
      <div class="filter-item">
        <div class="item-title">课程方向：</div>
        <ul>
          <li class="filter-all">全部</li>
          <li>前端开发</li>
          <li>前端开发</li>
          <li>前端开发</li>
          <li>前端开发</li>
        </ul>
      </div>
      <div class="filter-item">
        <div class="item-title">课程方向：</div>
        <ul>
          <li class="filter-all">全部</li>
          <li>前端开发</li>
          <li>前端开发</li>
          <li>前端开发</li>
          <li>前端开发</li>
        </ul>
      </div>
      <div class="filter-item">
        <div class="item-title">课程方向：</div>
        <ul>
          <li class="filter-all">全部</li>
          <li>前端开发</li>
          <li>前端开发</li>
          <li>前端开发</li>
          <li>前端开发</li>
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
        <li>
          <img src="@/assets/img/course1.png" />
          <div class="course-content">
            <h3>课程标题</h3>
            <div>初级 · 111人报名</div>
            <div class="price">
              <div class="price-vip">会员专享</div>
              <div class="price-total">¥ 299</div>
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
  justify-content: space-around;
  width: 1000px;
  height: 197px;
  margin: 0 auto;
}
.filter-item {
  display: flex;
  align-items: center;
}
.item-title {
  margin-left: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
.filter-item ul {
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter-item ul li {
  margin-right: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #515759;
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
  height: 275px;
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
  margin-right: 3px;
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