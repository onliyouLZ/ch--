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
            <el-input class="wh150" v-model="roleName" placeholder="请输入角色" @keyup.enter.native="primary"></el-input>
            <el-button type="primary" @click="primary">查询</el-button>
            <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
          </div>
          <div class="table-button">
            <el-button type="text"  icon="fa  fa-plus" class="el-icon-button" @click="add">新增</el-button>
            <el-button type="text"  icon="fa fa-trash-o" class="el-icon-button">删除</el-button>
          </div>
          <table-normal
            :table-data="tableData"
            :table-header="tableHeader"
            :modal-append-to-body="bodyFalse"
            @checkMulti="SelectionChange"
            @pageLoading="pageLoading">
          </table-normal>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      @close="dialogClose('ruleForm')"
      width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="角色名称:" prop="roleName">
              <el-input v-model="ruleForm.roleName"  placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="创建时间:" prop="date">
              <el-date-picker
                v-model="ruleForm.date"
                type="date"
                placeholder="请选择日期"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input  v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
  import tableNormal from '../common/tableNormal'
  export default{
    name: "role",
    components:{
      tableNormal
    },
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
        ],
        multipleSelection:[],
        dialogVisible:false,
        bodyFalse:false,
        title:"",
        ruleForm:{
          roleName:"",
          remark:'',
          date:"",
        },
        rules:{
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
            // { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          date:[
            { required: true, message: '日期不能为空', trigger: 'blur' }
          ],
        },
      }
    },
    methods:{
      search(){
        this.$http.get("http://localhost:3000/roles").then(res=>{
          if(res.status===200){
            let data=res.data;
            $.each(data,(v,item)=>{
              item.date=new Date(item.date).formatDate('yyyy-MM-dd')
            });
            setTimeout(()=>{
              this.tableData=data;
              this.loading=false;
            },500)
          }
        })
      },
      primary(){
        this.loading=true;
        let url="http://localhost:3000/roles?roleName_like=";
        if(this.roleName){
          url="http://localhost:3000/roles?roleName_like=";
        }else{
          url="http://localhost:3000/roles";
        }
        this.$http.get(url+this.roleName).then(res=>{
          console.log(res);
          if(res.status===200){
            let data=res.data;
            setTimeout(()=>{
              $.each(data,(v,item)=>{
                item.date=new Date(item.date).formatDate('yyyy-MM-dd')
              });
              this.tableData=data;
              this.loading=false;
            },500)
          }
        });
      },
      exportExcel(tableData,multipleSelection){
        let tableDatas=[];
        if(multipleSelection.length>0){
          tableDatas=multipleSelection
        }else{
          tableDatas=tableData
        }
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          const tHeader=[],filterVal=[];
          $.each(this.tableHeader,(v,item)=>{
            if(item.label){
              tHeader.push(item.label);
              filterVal.push(item.prop);
            }
          });
          const list = tableDatas;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data,"文档1");
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      SelectionChange(data){
        this.multipleSelection=data;
      },
      pageLoading(data){
        this.loading=data;
        setTimeout(()=>{
          this.loading=false
        },500)
      },
      add(){
        this.title="角色新增";
        this.dialogVisible=true;
      },
      submitForm(){
        const _this=this;
        _this.$refs['ruleForm'].validate((valid)=>{
          if(valid){
            let url,msg,msg1;
            if(_this.title==="角色新增"){
              url="http://localhost:3000/roles";
              msg="新增成功";
              msg1="新增失败";
            }else{
              url="http://localhost:3000/roles";
              msg="修改成功";
              msg1="修改失败";
            };
            _this.$http.post(url,_this.ruleForm).then(res=>{
              _this.$message.success(msg);
              _this.loading=true;
              _this.dialogVisible=false;
            })
          }
        })
      },
      reset(){
        this.dialogVisible=false;
      },
      dialogClose(ruleForm){
        this.dialogVisible=false;
        this.$refs[ruleForm].resetFields();
        // this.$refs.multipleTable.clearSelection();
        this.ruleForm={
          roleName:"",
          remark:'',
          date:"",
        };
        this.search();
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
