
<template>
  <el-container>
    <el-header>
      <!-- 三个部分 -->
      <el-row>
        <el-col :span="8">
          <img src="../../assets/images/logo.png" alt>
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col class="col" :span="8">
          恭喜35期学员平均月薪资 2万
          <a href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {};
</script>

<style scoped>

.el-container {
  height: 100%;
  min-width: 900px;
}

.el-header {
  background: #b3c1cd;
  padding: 0;
  height: 60px;
}

h1 {
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 28px;
}

.col {
  text-align: right;
  line-height: 60px;
  padding-right: 30px;
}

a {
  color: #daa520;
  text-decoration: none;
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>

