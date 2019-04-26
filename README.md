# vue-manage-system #
基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案。[线上地址](https://github.com/onliyouLZ/bengzhan.git)

## 项目引入插件 ##
1.字体图标库 阿里巴巴矢量图库、Font Awesome 字体图标库 [线上地址](http://fontawesome.dashgame.com/)
2.导出excel Export2Excel 使用方法详见博客 [地址](https://blog.csdn.net/weixin_40043172/article/details/87969774)
3.本项目启用store状态管理 仅存储了登录用户名以及角色id 剩下自己根据项目扩展

## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 首页
- [x] 用户/角色关联
- [x] 权限测试
- [x] 404 / 403

## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 组件
	|       |-- common                   // 公共组件
	|           |-- bus.js           	 // Event Bus
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- tableNormal.vue      // 表格组件
	|           |-- Sidebar.vue          // 公共左边栏
	|           |-- Tags.vue           	 // 页面切换标签组件
	|           |-- treeTable.vue        // 树表格(没用)
	|       |-- page                   	 // 主要路由页面
	|           |-- 403.vue
	|           |-- 404.vue
	|           |-- DashBoard.vue        // 系统首页
	|           |-- Login.vue            // 登录页面
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明
	|-- promission.js                    // 路由跳转监控


## 安装步骤 ##

	git clone https://github.com/onliyouLZ/bengzhan.git      // 把模板下载到本地
	cd bengzhan         // 进入模板目录
	npm install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##
	// 开启服务器，浏览器访问 http://localhost:8080
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## 组件使用说明与演示 ##

### echarts ###
echarts 组件
### echartsResizeHelper ###
echarts自动伸缩大小 组件





### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)



## 其他注意事项 ##
### 一、如果我不想用到上面的某些组件呢，那我怎么在模板中删除掉不影响到其他功能呢？ ###

第一步：删除该组件的路由

第二步：删除引入该组件的文件

第三步：删除该页面的入口

第四步：卸载该组件。执行以下命令：

	npm uninstall ***** -S

完成。

### 二、如何切换主题色呢？ ###

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 background-color/text-color/active-text-color 属性去掉即可。

