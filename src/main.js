// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入 路由
import router from './router/router.js'

// 引入 element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入全局的css
import './assets/css/common.css'

// 处理axios的三个问题
import axios from 'axios'
// 处理1 : 基路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 处理2 : 每次引入axios
Vue.prototype.$axios = axios
// 处理3 :
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
axios.interceptors.request.use(
  function (config) {
    // 拦截每次请求,携带token
    config.headers.Authorization = localStorage.getItem('token')

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 安装一下  element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
