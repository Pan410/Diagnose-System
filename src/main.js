// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import $ from 'jquery'
import axios from 'axios'
//加密
import crypto from '../tools/crypto'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//提示框
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'


Vue.prototype.axios = axios
Vue.prototype.crypto = crypto
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Toast);

axios.defaults.headers.common['Authentication-Token'] = store.state.token;
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['Authentication-Token'] = store.state.token
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response);
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          this.$store.commit('del_token');
          router.replace({
            path: '/admin',
            query: {
              redirect: router.currentRoute.fullPath
            } //登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  });


/* eslint-disable no-new */
Vue.filter('timeFormat', value => {
  // return value +'time'
})
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: {
    App
  },
  template: '<App/>'
})
