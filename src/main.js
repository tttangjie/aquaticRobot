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

axios.defaults.baseURL = global_.baseURL;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
