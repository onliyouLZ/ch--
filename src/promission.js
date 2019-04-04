import router from './router'
import axios from 'axios'
const _import = require('./router/_import_' + process.env.NODE_ENV)//获取组件的方法
import home from '@/components/common/home' //home 是架构组件，不在后台返回，在文件里单独引入
import store from './store'


let getRouter=getObjArr('router');
router.beforeEach((to, from, next) => {
  let roleId = localStorage.getItem('roleId');
  if(to.path=== '/login'){
    localStorage.setItem('roleId',"");
    next()
  }else if(!!roleId){
    axios.get('http://localhost:3000/menus?roleId='+roleId).then(res => {
      let routers = filterAsyncRouter(res.data[0].menuList);//过滤路由
      router.addRoutes(routers); //动态添加路由
      global.antRouter = routers;//将路由数据传递给全局变量，做侧边栏菜单渲染工作
    });
    next();
  }else{
    next('/login')
  }


  // let getRouter=getObjArr('router');//用来获取后台拿到的路由
  // let roleId = localStorage.getItem('roleId');
  // let path = to.path;
  // if (path === '/login') {
  //   next();
  //   return
  // }
  // if(roleId){
  //   debugger
  //   if (!getRouter) {//不加这个判断，路由会陷入死循环
  //     if (!getObjArr('router')) {
  //       axios.get('http://localhost:3000/menus?roleId='+roleId).then(res => {
  //         getRouter = res.data[0].menuList;//后台拿到路由
  //         saveObjArr('router', getRouter) //存储路由到localStorage
  //         routerGo(to, next,getRouter)//执行路由跳转方法
  //       })
  //     } else {//从localStorage拿到了路由
  //       getRouter = getObjArr('router')//拿到路由
  //       routerGo(to, next,getRouter)
  //     }
  //   } else {
  //     next()
  //   }
  // }else{
  //   next('/login');
  // }

});

function routerGo(to, next,getRouter) {
  let routers = filterAsyncRouter(getRouter);//过滤路由
  router.addRoutes(routers); //动态添加路由
  global.antRouter = routers;//将路由数据传递给全局变量，做侧边栏菜单渲染工作
  // next({ ...to, replace: true });
  next();
};

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(localStorage.getItem(name));

}

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
