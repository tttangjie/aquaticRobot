import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: (resolve) => require(['../components/Login'], resolve),
    },
    {
      path: '/personal',
      name: 'Personal',
      component: (resolve) => require(['../components/backStage/personalManagement/Personal'], resolve),
    },
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['../components/backStage/Index'], resolve),
      children:[
        {
          path: 'robot',
          name: 'robotController',
          component: (resolve) => require(['../components/backStage/user/robotController'], resolve),
        },
        {
          path: 'customer',
          name: 'customerController',
          component: (resolve) => require(['../components/backStage/user/customerController'], resolve),
        },
        {
          path: 'technology',
          name: 'technologyController',
          component: (resolve) => require(['../components/backStage/afterService/technologyController'], resolve),
        },
        {
          path: 'service',
          name: 'Service',
          component: (resolve) => require(['../components/backStage/afterService/Service'], resolve),
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
          path: 'alarm',
          name: 'alarm',
          component: (resolve) => require(['../components/backStage/systemSetup/Alarm'], resolve),
        },
        {
          path: 'disease',
          name: 'disease',
          component: (resolve) => require(['../components/backStage/repository/Disease'], resolve),
        },
        {
          path: 'drugstore',
          name: 'drugstore',
          component: (resolve) => require(['../components/backStage/repository/DrugStore'], resolve),
        },
        {
          path: 'seedStore',
          name: 'seedStore',
          component: (resolve) => require(['../components/backStage/repository/seedStore'], resolve),
        },
        {
          path: 'product',
          name: 'product',
          component: (resolve) => require(['../components/backStage/repository/Product'], resolve),
        },
        {
          path: 'feedStore',
          name: 'feedStore',
          component: (resolve) => require(['../components/backStage/repository/feedStore'], resolve),
        },

      ]
    },

  ],

})
