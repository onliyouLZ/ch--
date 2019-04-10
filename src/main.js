// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import echarts from 'echarts'
import $ from 'jquery'
import './utils/echartsResizeHelper'
import './promission'//这里进行路由后台获取的模拟

import ElementUI from 'element-ui';
import  './utils/utils'
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
Vue.prototype.$echarts=echarts;





new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
