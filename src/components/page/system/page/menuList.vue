<template>
  <div
    id="menu-list"
    v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <label>菜单名称:</label>
            <el-input class="wh150" v-model="name" placeholder="请输入菜单名称"></el-input>
            <el-button type="primary" >查询</el-button>
          </div>
          <div class="table-button">
            <el-button type="text"  icon="fa  fa-plus" class="el-icon-button" >新增</el-button>
            <el-button type="text"  icon="fa fa-trash-o" class="el-icon-button" >删除</el-button>
          </div>
          <tree-table :data="data" :columns="columns" border/>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import treeTable from "../../../common/treeTable";
  export default {
    name: "menu-list",
    components: { treeTable },
    data(){
      return{
        loading:true,
        name:"",
        columns: [
          {
            text: "事件",
            value: "event",
            width: 200
          },
          {
            text: "ID",
            value: "id"
          },
          {
            text: "时间线",
            value: "timeLine"
          },
          {
            text: "备注",
            value: "comment"
          }
        ],
        data: [
          {
            id: 0,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 1,
            event: "事件1",
            timeLine: 100,
            comment: "无",
            children: [
              {
                id: 2,
                event: "事件2",
                timeLine: 10,
                comment: "无"
              },
              {
                id: 3,
                event: "事件3",
                timeLine: 90,
                comment: "无",
                children: [
                  {
                    id: 4,
                    event: "事件4",
                    timeLine: 5,
                    comment: "无"
                  },
                  {
                    id: 5,
                    event: "事件5",
                    timeLine: 10,
                    comment: "无"
                  },
                  {
                    id: 6,
                    event: "事件6",
                    timeLine: 75,
                    comment: "无",
                    children: [
                      {
                        id: 7,
                        event: "事件7",
                        timeLine: 50,
                        comment: "无",
                        children: [
                          {
                            id: 71,
                            event: "事件71",
                            timeLine: 25,
                            comment: "xx"
                          },
                          {
                            id: 72,
                            event: "事件72",
                            timeLine: 5,
                            comment: "xx"
                          },
                          {
                            id: 73,
                            event: "事件73",
                            timeLine: 20,
                            comment: "xx"
                          }
                        ]
                      },
                      {
                        id: 8,
                        event: "事件8",
                        timeLine: 25,
                        comment: "无"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 3,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 4,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 5,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 6,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 7,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 8,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 9,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 10,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          }
        ]
      }
    },
    mounted(){
      setTimeout(()=>{
        this.loading=false;
      },500)
    }
  }
</script>

