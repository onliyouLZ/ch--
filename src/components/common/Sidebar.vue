<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes"  background-color="#324157"
          text-color="#bfcbd9" active-text-color="#20a0ff"  router>
            <template v-for="(item,index) in items">
              <el-menu-item v-if="item.children.length === 0" :index="item.path" :key="item.path" >
                <i class="iconfont" :class="item.meta.icon"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </el-menu-item>
               <el-submenu  v-if="item.children.length >= 1" :index="item.path">
                  <template slot="title">
                    <i class="iconfont" :class="item.meta.icon"></i>
                    <span>{{ item.meta.title }}</span>
                  </template>
                 <template v-for="(child,index) in item.children">
                    <el-menu-item :index="child.path" :key="child.path">{{child.meta.title}}</el-menu-item>
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
            items:[]
        }
    },
    computed:{
      onRoutes(){
          return this.$route.path.replace('/','');
      }
    },
    methods:{

    },
    mounted(){
      //菜单获取需要异步
      setTimeout(()=>{
        this.items=global.antRouter[0].children;
      },0)

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
