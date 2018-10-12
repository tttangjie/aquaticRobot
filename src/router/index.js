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
      component: (resolve) => require(['../components/backStage/Index'], resolve),
      children:[
        {
          path: 'robot',
          name: 'robotController',
          component: (resolve) => require(['../components/robotController'], resolve),
        },
        {
          path: 'technology',
          name: 'technologyController',
          component: (resolve) => require(['../components/technologyController'], resolve),
        },
        {
          path: 'expert',
          name: 'expert',
          component: (resolve) => require(['../components/backStage/expert/ExpertManagement'], resolve),
        },
        {
          path: 'admin-controller',
          name: 'adminController',
          component: (resolve) => require(['../components/backStage/systemSetup/AdminController'], resolve),
        },
        {
          path: 'disease',
          name: 'disease',
          component: (resolve) => require(['../components/backStage/repository/Disease'], resolve),
        },
        {
          path: 'product',
          name: 'product',
          component: (resolve) => require(['../components/backStage/repository/Product'], resolve),
        },
      ]
    },

  ]
})
