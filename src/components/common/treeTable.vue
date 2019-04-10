<template>
  <div id="treeTable">
    <el-table
      :data="formatData"
      :row-style="showRow"
      header-cell-class-name="table-header-public"
      :height=tableHeight
      v-bind="$attrs">
      <el-table-column v-if="columns.length===0" width="150">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
          <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"/>
            <i v-else class="el-icon-minus"/>
          </span>
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <!-- Todo -->
          <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
          <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
          <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"/>
            <i v-else class="el-icon-minus"/>
          </span>
          {{ scope.row[column.value] }}
        </template>
      </el-table-column>
      <slot/>
    </el-table>
    <div  class="table-footer" v-if="data.length>0 && showTableFooter===true">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,40,60]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import treeToArray from './eval'
  export default {
    name: "treeTable",
    data(){
      return{
        pageIndex:1, //当前显示第几页
        pageSize:10, //每页显示多少条
        currentPage:1, //前往多少页
      }
    },
    props: {
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      },
      tableHeight:{
        type:Number,
        default:function () {
          return 650
        }
      },
      showTableFooter:{
        type:Boolean,
        default:true
      }
    },
    computed: {
      // 格式化数据源
      formatData: function() {
        let tmp;
        if (!Array.isArray(this.data)) {
          tmp = [this.data];
        } else {
          tmp = this.data;
        }
        const func = this.evalFunc || treeToArray;
        const args = this.evalArgs
          ? Array.concat([tmp, this.expandAll], this.evalArgs)
          : [tmp, this.expandAll];
        return func.apply(null,args).slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      },
      total(){
        return this.data.length
      },
    },
    methods: {
      handleSizeChange(val){
        this.pageSize = val;
        // this.$emit('pageLoading',true)
      },
      handleCurrentChange(val){
        this.pageIndex = val;
        // this.$emit('pageLoading',true);
      },
      showRow: function (row) {
        const show = row.row.parent
          ? row.row.parent._expanded && row.row.parent._show
          : true;
        row.row._show = show;
        return show
          ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
          : "display:none;";
      },
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        const record = this.formatData[trIndex];
        record._expanded = !record._expanded;
      },
      // 图标显示
      iconShow(index, record) {
        return index === 0 && record.children && record.children.length > 0;
      },
    }
  }
</script>

<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<style scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before {
    content: "";
  }
  .processContainer {
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }
  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
    margin-left: -18px;
  }
</style>

