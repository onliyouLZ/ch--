import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);






export const constantRouterMap=[
  {
    path: '/login',
    component: resolve => require(['@/components/page/Login.vue'], resolve)
  }
  // {
  //   path: '/403',
  //   component: resolve => require(['../components/page/403.vue'], resolve),
  //   meta: { title: '403' }
  // },
  // {
  //   path: '*',
  //   component: resolve => require(['../components/page/404.vue'], resolve)
  // },
  // {
  //   path: '/',
  //   component: resolve => require(['../components/common/Home.vue'], resolve),
  //   redirect: '/dashboard',
  //   children:[
  //     {
  //       path: 'dashboard',
  //       component: resolve => require(['@/components/page/Dashboard.vue'], resolve),
  //       meta: { title: '首页',permission:true,icon:"icon-zhuye"}
  //     },
  //
  //     // {
  //     //   path: 'role',
  //     //   component: resolve => require(['../components/page/role.vue'], resolve),
  //     //   meta: { title: '角色管理',permission:true}
  //     // },
  //     // {
  //     //   path: 'user',
  //     //   component: resolve => require(['../components/page/user.vue'], resolve),
  //     //   meta: { title: '用户管理',permission:true}
  //     // },
  //   ]
  // },
];





export default new Router({
  mode:"history",
  routes:constantRouterMap,
})

