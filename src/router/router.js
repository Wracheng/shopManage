/**
 * 路由的工作
 * 准备工作
 * 1. 安装 npm i vue-router
 * 2. 引入 import VueRouter from 'vue-router'
 * 3. 注意点 : vue-router 和 vuex 在模块化(把他们单独提到一个js文件里)工程中,需要使用 Vue.use(安装一下)
 * 4. 实例化 + 挂载 (导出去再挂载)
 * 四个步骤
 *   > 1,先把需要的组件创建出来 Login.vue  Home.vue
 *   > 走流程
 *     1. 入口 (url测试)
 *     2. 匹配规则
 *     3. 组件
 *     4. 出口
 */

// 注意点 : 模块化工程中, 记得使用 vue 安装一下 路由功能
import Vue from 'vue'
// 引入路由
// const VueRouter = require('vue-router')
import VueRouter from 'vue-router'

// 引入组件
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'
import Users from '../components/users/Users.vue'
import Roles from '../components/roles/Roles.vue'
import Rights from '../components/rights/Rights.vue'
import Categories from '../components/categories/Categories.vue'
import Goods from '../components/goods/Goods.vue'
import GoodsAdd from '../components/goods-add/GoodsAdd.vue'

// 安装一下
Vue.use(VueRouter)

// 实例化
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users/:page?', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }
  ]
})

// 导航 守卫
router.beforeEach((to, from, next) => {
  // 判断访问的是不是登录页面
  if (to.path === '/login') {
    next()
  } else {
    // 其他页面
    // 判断有没有登录过
    let token = localStorage.getItem('token')
    // 判断token有没有值
    token ? next() : next('/login')
  }
})

// 导出 路由
export default router
