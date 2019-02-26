<template>
  <div class="wh100" id="tableNormal"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="card-header-titleCard">
          <label>{{inputName}}:</label>
          <el-input :placeholder="placeholder" v-model="inputValue" class="wh150"></el-input>
        </div>
        <div class="card-header-titleCard">
          <label>时间:</label>
          <el-date-picker
            v-model="times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="card-header-titleCard">
          <el-button  type="primary">查询</el-button>
          <el-button  type="success">导出</el-button>
        </div>
      </div>
      <div class="table-button" v-show="buttonShow">
        <el-button type="text" icon="fa  fa-plus" >新增</el-button>
        <el-button type="text" icon="fa fa-trash-o">删除</el-button>
      </div>
      <el-table
        :data="tables"
        border
        ref="multipleTable"
        style="width: 100%"
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
        header-cell-class-name="table-header-public">
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


      <div class="table-footer" v-if="tableData.length>0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20,40,60]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <div class="table-choice" v-if="multipleSelection.length>0"><span>当前页选中:{{multipleSelection.length > 0 ? multipleSelection.length+"条" : " "}}</span></div>
      </div>
    </el-card>
  </div>
</template>


<script>
  export default {
    name:"tableNormalz",
    data(){
      return{
        inputValue:"",
        multipleSelection:[],
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        currentPage4: 1,//当前显示第几页
        loading:true,
        times:new Date()
      }
    },
    props:{
      tableHeader:{
        type:Array,
        default:[
          {data:'',title:'',type:"selection"},
          {prop:"date",label:"创建时间",type:"normal"},
          {prop:"roleName",label:"角色名称",type:"normal"},
          {prop:"remark",label:"备注",type:"normal"},
        ]
      },
      tableData:{
        type:Array,
        default:[
          {date:"2019-01-01",roleName:"管理员",remark:"备注"},
          {date:"2019-01-01",roleName:"管理员",remark:"备注"},
          {date:"2019-01-01",roleName:"管理员",remark:"备注"},
        ]
      },
      export:{
        type:Boolean,
        data:false
      },
      placeholder:{
        type:String,
        default:"请输入名称"
      },
      inputName:{
        type:String,
        default:"输入框title"
      },
      buttonShow:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      rowClick(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
    mounted(){
      setTimeout(()=>{
        this.loading=false
      },500)
    },
    computed:{
      tables(){
        //实现前端分页
        return this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      },
      total(){
        return this.tableData.length
      },

    },
  }
</script>

<style lang="less" scoped>
  #tableNormal .clearfix{
    min-height: 44px;
    line-height: 44px;
  }
  #tableNormal .card-header-titleCard{
    float: left;
    margin-right: 10px;
  }
</style>
