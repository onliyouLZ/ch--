import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页',permission:true}
        },
        {
          path: '/role',
          component: resolve => require(['../components/page/role.vue'], resolve),
          meta: { title: '角色管理',permission:true}
        },
        {
          path: '/user',
          component: resolve => require(['../components/page/user.vue'], resolve),
          meta: { title: '用户管理',permission:true}
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/page/403.vue'], resolve),
      meta: { title: '403' }
    },
    {
      path: '*',
      component: resolve => require(['../components/page/404.vue'], resolve)
    }
  ]
})
