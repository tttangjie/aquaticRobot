// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './vuex/store'
import VueCookie from 'vue-cookie'
import global_ from './../static/config/global'

Vue.use(ElementUI, VueCookie)

Vue.config.productionTip = false;
Vue.prototype.GLOBAL = global_;
Vue.prototype.$axios = axios;
Vue.prototype.$cookie = VueCookie;

axios.defaults.baseURL = global_.Base_URL;
axios.defaults.headers['Content-Type'] = 'application/json';

// axios请求拦截
axios.interceptors.request.use(config => {
  //判断VueCookie中是否存在token
  if (VueCookie.get("token")) {
    // 存在将api_token写入 request header
    config.headers.Authorization = `Bearer ${VueCookie.get("token")}`;
  }
  return config;
},error => {
  return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
