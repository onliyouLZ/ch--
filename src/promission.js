import router from './router'
import axios from 'axios'
const _import = require('./router/_import_' + process.env.NODE_ENV)//获取组件的方法
import home from '@/components/common/home' //home 是架构组件，不在后台返回，在文件里单独引入
import store from './store'


router.beforeEach((to, from, next) => {
  let roleId = localStorage.getItem('roleId');
  if(to.path=== '/login'){
    localStorage.setItem('roleId',"");
    next()
  }else if(roleId){
    if(global.antRouter){
      next()
    }else{
      axios.get('http://localhost:3000/menus?roleId='+roleId).then(res => {
        console.log(1);
        let routers = filterAsyncRouter(res.data[0].menuList);//过滤路由
        router.addRoutes(routers); //动态添加路由
        global.antRouter = routers;//将路由数据传递给全局变量，做侧边栏菜单渲染工作 可换成vuex
      });
    }
    next();
  }else{
    next('/login')
  }
});



function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'home') {//Layout组件特殊处理
        route.component = home;
      } else {
        route.component = _import(route.component);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  });

  return accessedRouters
}
