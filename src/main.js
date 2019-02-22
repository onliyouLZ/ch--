// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import $ from 'jquery'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

import Cookies from 'js-cookie'

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });

/**
 * 简单的axios封装
 * @type {boolean}
 */
axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';
axios.defaults.crossDomain=true; //支持跨域
axios.defaults.withCredentials=true;//让ajax携带cookie



Vue.prototype.$http = axios;





//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const token=localStorage.getItem("roleId");
  if(!token && to.path !== '/login'){
    next('/login');
  }else if(to.meta.permission){
    token === "1" ? next() : next('/403');
  }else{
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    }else{
      next();
    }
  }
});



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
