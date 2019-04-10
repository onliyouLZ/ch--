<template>
    <div class="sidebar">
        <el-menu
          class="sidebar-el-menu"
          :default-active="onRoutes"
          background-color="#324157"
          text-color="#bfcbd9"
          active-text-color="#20a0ff"
          router
         >
          <template v-for="(item,index) in items">
            <el-menu-item v-if="item.children.length === 0 && item.hidden===false" :index="item.path" :key="item.path" >
              <i class="iconfont" :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
            <template v-if="item.children.length >= 1 && item.hidden===true">
              <template v-for="(child,index) in item.children">
                <el-menu-item v-if="child.hidden===false" :index="child.path" :key="child.path">
                  <i class="iconfont" :class="child.meta.icon"></i>
                  <span slot="title">{{ child.meta.title }}</span>
                </el-menu-item>
              </template>
            </template>
            <el-submenu  v-if="item.children.length >= 1 && item.hidden===false" :index="item.path">
              <template slot="title">
                <i class="iconfont" :class="item.meta.icon"></i>
                <span>{{ item.meta.title }}</span>
              </template>
              <template v-for="(child,index) in item.children">
                <el-menu-item v-if="child.hidden===false" :index="child.path" :key="child.path">{{child.meta.title}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        collapse: false,
        items:[],
      }
    },
    computed:{
      onRoutes(){
        return this.$route.path;
      }
    },
    methods:{
    },
    mounted(){
      this.items=JSON.parse(localStorage.getItem('router'))[0].children;
    },
    created(){

    }
  }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
        height: 100%;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
