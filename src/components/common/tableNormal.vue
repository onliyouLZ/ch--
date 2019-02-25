<template>
  <div id="tableNormal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <label>仓库名称:</label>
        <el-input placeholder="请输入仓库名称" style="width: 150px"></el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="success">导出</el-button>
      </div>
      <div class="table-button">
        <el-button type="text" icon="fa  fa-plus" >新增</el-button>
        <el-button type="text" icon="fa fa-trash-o">删除</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="700">

      </el-table>


      <div class="footer" v-if="tableData.length>0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20,40,60]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <div class="choice" v-if="multipleSelection.length>0"><span>当前页选中:{{multipleSelection.length > 0 ? multipleSelection.length+"条" : " "}}</span></div>
      </div>
    </el-card>
  </div>
</template>


<script>
  export default {
    name:"tableNormal",
    data(){
      return{

      }
    },
    props:{
      tableHeader:{
        type:Object,
        default:{}
      },
      tableData:{
        type:Array,
        default:[]
      },
      export:{
        type:Boolean,
        data:false
      }
    },
    methods:{
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
  }
</script>
