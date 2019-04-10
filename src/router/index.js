import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);






export const constantRouterMap=[
  {
    path: '/login',
    component: resolve => require(['@/components/page/Login.vue'], resolve)
  }
];





export default new Router({
  mode:"history",
  routes:constantRouterMap,
})

