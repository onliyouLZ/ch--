import router from './router'
import axios from 'axios'
const _import = require('./router/_import_' + process.env.NODE_ENV)//获取组件的方法
import home from '@/components/common/home' //home 是架构组件，不在后台返回，在文件里单独引入
import store from './store'
let getRouter //用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  let roleId = sessionStorage.getItem('roleId');
  if(to.path=== '/login'){
    next();
    return
  }else{
    if(roleId){ //判断是否获取到用户id
      if(!global.antRouter){//判断是否存储在全局
        if(!localStorage.getItem('router')){//判断本地是否存储路由
          axios.get('menus?roleId='+roleId).then(res => {
            getRouter = res.data[0].menuList;//后台拿到路由
            console.info("拉取菜单成功",getRouter);
            saveObjArr('router',getRouter);//存储在本地
            routerGo(to, next)//执行路由跳转方法
          });
        }else{//如果本地存在就从本地读取
          getRouter = getObjArr('router');//拿到路由
          routerGo(to, next)
        }
      }else{
        next()
      }
    }else{
      next('/login');
    }
  }
});



function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter);//过滤路由
  router.addRoutes(getRouter); //动态添加路由
  global.antRouter = getRouter;//将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'home') {//home组件特殊处理
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

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));

}
