
<template>
  <el-container>
    <el-header>
      <!-- 三个部分 -->
      <el-row>
        <el-col :span="5">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col class="col" :span="18">
          <a @click.prevent="logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 左侧菜单导航 -->
        <!--
        el-menu : 菜单父组件
        -  default-active="2" 默认高亮  index
        -  @open="handleOpen"
        -  @close="handleClose"
        - active-text-color="#ffd04b" 高亮颜色

        el-submenu : 菜单子组件 (可展开 它里面可以放    el-menu-item : 菜单元素)

        el-menu-item : 菜单元素

        路由功能 :
          - router : false => true => 启动路由功能
          - 以 index 作为 path 进行路由跳转

        -->
        <el-menu
          :router="true"
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 第一个 -->
          <!-- 第一层 的index 只要唯一即可 -->
          <el-submenu :index="item1.id+''" v-for='item1 in menus' :key='item1.id'>
            <!-- 标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item1.authName }}</span>
            </template>

            <el-menu-item v-for='item2 in item1.children' :key='item2.id' :index="'/'+item2.path">{{ item2.authName }}</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      menus :[]
    }
  },
  created() {
    this.loadMenus();
  },
  methods: {
    /**
     * 退出登录
     */
    async logout() {
      try {
        await this.$confirm("此操作将退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        // 点击确定了,才会执行 后面的代码
        console.log("点击确定了");
        // 1. 删除token
        localStorage.removeItem("token");
        // 2. 跳转到login
        this.$router.push("/login");
        // 3. 提示退出成功
        this.$message({
          message: "退出成功",
          type: "success",
          duration: 800
        });
      } catch (error) {
        console.log("点击取消了");
        this.$message({
          type: "info",
          message: "已取消退出",
          duration: 800
        });
      }

      // 点击确定按钮
      // .then(() => {
      //    console.log('点击确定了');

      // })
      // // 点击取消
      // .catch(() => {
      //  console.log('点击取消了');
      // });
    },
    logout1() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 点击确定按钮
        .then(() => {
          // 1. 删除token
          localStorage.removeItem("token");
          // 2. 跳转到login
          this.$router.push("/login");
          // 3. 提示退出成功
          this.$message({
            message: "退出成功",
            type: "success",
            duration: 800
          });
        })
        // 点击取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 800
          });
        });
    },
    handleOpen(key, keyPath) {
      console.log("打开了");
    },
    handleClose(key, keyPath) {
      console.log("关闭了");
    },
    /**
     * 动态获取左侧权限
     */
    async loadMenus() {
      let res = await this.$axios.get('menus')
      console.log(res);
      this.menus = res.data.data

    }
  }
};
</script>

<style scoped lang='less'>
/* 容器 */
.el-container {
  height: 100%;
  min-width: 900px;
}

/* 头部 */
.el-header {
  background: #b3c1cd;
  padding: 0;
  height: 60px;
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
    a {
      color: #daa520;
      text-decoration: none;
    }
  }
}

/* 侧栏 */
.el-aside {
  background: #545c64;
}

/* 内容 */
.el-main {
  background: #eaeef1;
}
</style>

