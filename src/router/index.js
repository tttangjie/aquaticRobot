import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: (resolve) => require(['../components/Login'], resolve),
    },
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['../components/index'], resolve),
    }
  ]
})
