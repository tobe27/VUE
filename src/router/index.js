import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    redirect: {
      name: 'index'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/views/index/index.vue'], resolve)
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/login/login.vue'], resolve)
  }
  // {
  //   path: '/customer',
  //   name: 'customer',
  //   meta: { roleId: [1,2,3] },
  //   component: resolve => require(['@/views/customer/index.vue'], resolve)
  // },
  // {
  //   path: '*',
  //   name: '404',
  //   component: resolve => require(['@/views/404/404.vue'], resolve)
  // }
]
export default new Router({
  base: process.env.BASE_URL,
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/customer',
    name: 'customer',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/customer/index.vue'], resolve)
  },
  {
    path: '/customer/inDetail',
    name: '客户信息',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/customer/inDetail.vue'], resolve)
  },
  // {
  //   path: '/users',
  //   name: 'users',
  //   meta: { roleId: [1, 2, 3] },
  //   component: resolve => require(['@/views/users/users.vue'], resolve),
  //   children: [  //这里就是二级路由的配置
  //     {
  //       path: '/detail',
  //       name: 'detail',
  //       component: resolve => require(['@/views/users/detail.vue'], resolve)
  //     }
  //   ]
  // },
  {
    path: '/users',
    name: 'users',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/users/users.vue'], resolve)
  },
  {
    path: '/users/detail',
    name: 'detail',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/users/detail.vue'], resolve)
  },
  // 机构管理
  {
    path: '/mechanism',
    name: 'mechanism',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/mechanism/index.vue'], resolve)
  },
  {
    path: '/household',
    name: 'household',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/information/household/index.vue'], resolve)
  },
  {
    path: '/household/detail',
    name: 'Dhousehold',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/information/household/detail.vue'], resolve)
  },
  {
    path: '/blacklist',
    name: 'blacklist',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/information/blacklist.vue'], resolve)
  },
  {
    path: '/bluelist',
    name: 'bluelist',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/information/bluelist.vue'], resolve)
  },
  {
    path: '/greylist',
    name: 'greylist',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/information/greylist.vue'], resolve)
  },
  {
    path: '/poorlist',
    name: 'poorlist',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/information/poorlist.vue'], resolve)
  },
  {
    path: '/whitelist',
    name: 'whitelist',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/information/whitelist.vue'], resolve)
  },
  {
    path: '/label',
    name: 'label',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/label/index.vue'], resolve)
  },
  {
    path: '/label/detail',
    name: 'labelDetail',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/label/detail.vue'], resolve)
  },
  {
    path: '/grid',
    name: 'grid',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/grid/index.vue'], resolve)
  },
  {
    path: '/grid/detail',
    name: 'gridDtail',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/grid/detail.vue'], resolve)
  },
  {
    path: '/grid/mesher',
    name: 'mesher',
    meta: { roleId: [1, 2, 3] },
    component: resolve => require(['@/views/grid/mesher/index.vue'], resolve)
  }
  // {
  //   path: '*',
  //   name: '404',
  //   component: resolve => require(['@/views/404/404.vue'], resolve)
  // }
]
