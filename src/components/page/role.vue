<template>
  <div
    id="role"
    v-loading="loading"
    element-loading-text="数据加载中">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <label>角色名称:</label>
            <el-input class="wh150" v-model="roleName" placeholder="请输入角色"></el-input>
            <el-button type="primary" @click="primary">查询</el-button>
            <el-button type="success">导出</el-button>
          </div>
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <template v-for="item in tableHeader">
              <el-table-column
                v-if="item.type==='selection'"
                type="selection"
                width="40"
                fixed>
              </el-table-column>
              <el-table-column
                v-if="item.type==='normal'"
                :prop="item.prop"
                :label="item.label"
                align="center">
              </el-table-column>
            </template>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  export default{
    name: "role",
    data(){
      return{
        loading:true,
        roleName:"",
        tableData:[],
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {prop:"date",label:"创建时间",type:"normal"},
          {prop:"roleName",label:"角色名称",type:"normal"},
          {prop:"remark",label:"备注",type:"normal"},
        ]
      }
    },
    methods:{
      search(){
        this.$http.get("http://localhost:3000/roles").then(res=>{
          if(res.status===200){
            let data=res.data;
            setTimeout(()=>{
              this.tableData=data;
              this.loading=false;
            },500)
          }
        })
      },
      primary(){
        this.loading=true;
        setTimeout(()=>{
          this.loading=false;
        },800)
      }
    },
    mounted(){

    },
    created(){
      this.search();
    }
  }
</script>

<style lang="less" scoped>
  #role{
    width: 100%;
    height: 100%;
  }
</style>
