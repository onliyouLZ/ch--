<template>
  <!--<div class="wh100" id="tableNormal"-->
       <!--v-loading="loading"-->
       <!--element-loading-text="加载中">-->
    <!--<el-card class="box-card">-->
      <!--<div slot="header" class="clearfix">-->
        <!--<div class="card-header-titleCard">-->
          <!--<label>{{inputName}}:</label>-->
          <!--<el-input :placeholder="placeholder" v-model="inputValue" class="wh150"></el-input>-->
        <!--</div>-->
        <!--<div class="card-header-titleCard">-->
          <!--<label>时间:</label>-->
          <!--<el-date-picker-->
            <!--v-model="times"-->
            <!--type="datetimerange"-->
            <!--range-separator="至"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期">-->
          <!--</el-date-picker>-->
        <!--</div>-->
        <!--<div class="card-header-titleCard">-->
          <!--<el-button  type="primary" @click="primary">查询</el-button>-->
          <!--<el-button  type="success" v-if="exports" @click="exportExcel(tableData,multipleSelection)">导出</el-button>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="table-button" v-show="buttonShow">-->
        <!--<el-button type="text" class="el-icon-button" icon="fa  fa-plus">新增</el-button>-->
        <!--<el-button type="text" class="el-icon-button" icon="fa fa-trash-o">删除</el-button>-->
      <!--</div>-->
      <!---->
    <!--</el-card>-->
  <!--</div>-->
  <div id="tableNormal">
    <el-table
      :data="tables"
      border
      ref="multipleTable"
      style="width: 100%"
      :height=tableHeight
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
      header-cell-class-name="table-header-public"
      :span-method="merge===true ? objectSpanMethod:objectSpanMethod1">
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
        <!--是否开启行内按钮-->
        <template
          v-if="operation===true">
          <el-table-column
            v-if="item.type==='operation'"
            :prop="item.prop"
            :label="item.label"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="redact(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
              >删除</el-button>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <div class="table-footer" v-if="tableData.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,40,60]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <div class="table-choice" v-if="multipleSelection.length>0">当前页面选中:{{multipleSelection.length > 0 ? multipleSelection.length+"条" : " "}}</div>
    </div>
  </div>
</template>


<script>
  export default {
    name:"tableNormal",
    data(){
      return{
        inputValue:"",
        multipleSelection:[],
        loading:true,
        times: [new Date().datePro('{%d-1}').formatDate('yyyy-MM-dd HH:ss:mm'), new Date().formatDate('yyyy-MM-dd HH:ss:mm')],
        pageIndex:1, //当前显示第几页
        pageSize:10, //每页显示多少条
        currentPage:1, //前往多少页
      }
    },
    props:{
      tableData:{
        type:Array,
        default:[]
      },
      tableHeader:{
        type:Array,
        default:[]
      },
      tableHeight:{
        type:Number,
        default:function () {
          return 650
        }
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
      },
      ExportName:{
        type:String,
        default:"测试表导出"
      },
      typeNum:{//计算出来需要合并的列
        type:Array,
      },
      colspanIndex:{
        type:Number,
      },
      exports:{//是否开启导出
        type:Boolean,
        data:false
      },
      merge:{//是否开启合并
        type:Boolean,
        default:function () {
          return false
        }
      },
      operation:{//是否开启行内编辑
        type:Boolean,
        default:false
      },
    },
    methods:{
      handleSizeChange(val){
        this.pageSize = val;
        this.$emit('pageLoading',true)
      },
      handleCurrentChange(val){
        this.pageIndex = val;
        this.$emit('pageLoading',true)
      },
      rowClick(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      redact(index,row){
        return this.$emit('redact',row)
      },
      // primary(){
      //   this.loading=true;
      //   setTimeout(()=>{
      //     this.loading=false
      //   },500)
      // },
      // exportExcel(tableData,multipleSelection){
      //   let tableDatas=[];
      //   if(multipleSelection.length>0){
      //     tableDatas=multipleSelection
      //   }else{
      //     tableDatas=tableData
      //   }
      //   require.ensure([], () => {
      //     const { export_json_to_excel } = require('../../vendor/Export2Excel');
      //     const tHeader=[],filterVal=[];
      //     $.each(this.tableHeader,(v,item)=>{
      //       if(item.label){
      //         tHeader.push(item.label);
      //         filterVal.push(item.prop);
      //       }
      //     });
      //     const list = tableDatas;
      //     const data = this.formatJson(filterVal, list);
      //     export_json_to_excel(tHeader, data,this.ExportName);
      //
      //   })
      // },
      // formatJson(filterVal, jsonData){
      //   return jsonData.map(v => filterVal.map(j => v[j]))
      // },
      /**
       * 合并单元格
       * @param row
       * @param column
       * @param rowIndex
       * @param columnIndex
       * @return {{colspan: Number, rowspan: Array / Number}}
       */
      objectSpanMethod({ row, column, rowIndex, columnIndex }){
        const _row=this.typeNum[rowIndex];
        if(columnIndex===this.colspanIndex){
          return {
            colspan:this.colspanIndex,
            rowspan:_row
          }
        }
      },
      objectSpanMethod1({ row, column, rowIndex, columnIndex }){
          return false
      }
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
