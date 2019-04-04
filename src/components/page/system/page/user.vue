<template>
  <div
    id="user"
    v-loading="loading"
    element-loading-text="数据加载中">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <label>用户名称:</label>
            <el-input class="wh150" v-model="name" placeholder="请输入用户名称" @keyup.enter.native="primary"></el-input>
            <el-button type="primary" @click="primary">查询</el-button>
            <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
          </div>
          <div class="table-button">
            <el-button type="text"  icon="fa  fa-plus" class="el-icon-button" @click="add">新增</el-button>
            <el-button type="text"  icon="fa fa-trash-o" class="el-icon-button" @click="deleteAll">删除</el-button>
          </div>
          <table-normal
            :table-data="tableData"
            :table-header="tableHeader"
            :modal-append-to-body="bodyFalse"
            :operation="operation"
            @redact="redact"
            @multiTable="multiTable"
            @deleteRow="deleteRow"
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
            <el-form-item label="用户名称:" prop="name">
              <el-input v-model="ruleForm.name"  placeholder="请输入用户名称"></el-input>
            </el-form-item>
            <el-form-item label="分配角色:" prop="roleId">
              <el-select style="width: 100%" v-model="ruleForm.roleId" placeholder="请选择角色">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password"  v-model="ruleForm.password" placeholder="请输入密码"></el-input>
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
  import tableNormal from '../../../common/tableNormal'
  export default{
    name: "user",
    components:{
      tableNormal
    },
    data(){
      return{
        loading:true,
        name:"",
        tableData:[],
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {prop:"name",label:"用户名称",type:"normal"},
          {prop:"password",label:"密码",type:"normal"},
          {prop:"operation",label:"操作",type:"operation"},
        ],
        multipleSelection:[],
        dialogVisible:false,
        bodyFalse:false,
        operation:true,
        options:[],
        title:"",
        ruleForm:{
          name:"",
          password:'',
          roleId:""
        },
        rules:{
          name: [
            { required: true, message: '用户名称不能为空', trigger: 'blur' },
            // { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          roleId:[
            { required: true, message: '角色不能为空', trigger: 'change' }
          ]
        },
      }
    },
    methods:{
      search(){
        this.$http.get("http://localhost:3000/users").then(res=>{
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
        let url="http://localhost:3000/users?name_like=";
        if(this.name){
          url="http://localhost:3000/users?name_like=";
        }else{
          url="http://localhost:3000/users";
        }
        this.$http.get(url+this.name).then(res=>{
          if(res.status===200){
            let data=res.data;
            setTimeout(()=>{
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
          const { export_json_to_excel } = require('../../../../vendor/Export2Excel');
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
      pageLoading(data){
        this.loading=data;
        setTimeout(()=>{
          this.loading=false
        },500)
      },
      add(){
        this.title="用户新增";
        this.dialogVisible=true;
      },
      redact(data){
        this.dialogVisible=true;
        this.title="用户修改";
        this.ruleForm.name=data.name;
        this.ruleForm.password=data.password;
        this.ruleForm.roleId=data.roleId;
        this.ruleForm.id=data.id;
      },
      multiTable(data){
        this.multipleSelection=data;
      },
      deleteRow(data){
        if(data===true){
          this.deleteAll();
        }
      },
      deleteAll(){
        if(this.multipleSelection.length>0){
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading=true;
            this.$http.delete('http://localhost:3000/users/'+this.multipleSelection[0].id).then(res=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.search();
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$message({
            type: 'error',
            message: '请选择需要删除的数据!'
          });
        }
      },
      submitForm(){
        const _this=this;
        _this.$refs['ruleForm'].validate((valid)=>{
          if(valid){
            let url,msg,msg1;
            if(_this.title==="用户新增"){
              url="http://localhost:3000/users";
              msg="新增成功";
              msg1="新增失败";
              _this.$http.post(url,_this.ruleForm).then(res=>{
                _this.$message.success(msg);
                _this.loading=true;
                _this.dialogVisible=false;
                this.search();
              })
            }else{
              url="http://localhost:3000/users/"+this.ruleForm.id;
              msg="修改成功";
              msg1="修改失败";
              _this.$http.patch(url,_this.ruleForm).then(res=>{
                _this.$message.success(msg);
                _this.loading=true;
                _this.dialogVisible=false;
                this.search();
              })
            };

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
          name:"",
          password:"",
          roleId:""
        };

      }
    },
    mounted(){
      this.search();
      this.$http.get('http://localhost:3000/roles').then(res=>{
        if(res.status===200){
          let data=res.data;
          this.options = data;
        }
      })
    },
    created(){

    },
  }
</script>

<style lang="less" scoped>
  #user{
    width: 100%;
    height: 100%;
  }
</style>
