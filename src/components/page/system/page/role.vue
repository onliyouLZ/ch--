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
            <el-button type="text"  icon="fa fa-trash-o" class="el-icon-button" @click="deleteAll">删除</el-button>
          </div>
          <table-normal
            :table-data="tableData"
            :table-header="tableHeader"
            :modal-append-to-body="bodyFalse"
            :operation="operation"
            :showAccredit=true
            @redact="redact"
            @multiTable="multiTable"
            @deleteRow="deleteRow"
            @pageLoading="pageLoading"
            @accredit="accredit">
          </table-normal>
        </el-card>
      </el-col>
    </el-row>

    <!--新增及修改角色弹窗-->
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

    <!--菜单弹窗-->
    <el-dialog
    title="菜单授权"
    :visible.sync="dialogAccredit"
    class="dialogAccredit"
    width="20%">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-tree
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :check-strictly="true"
            @check-change="checkChange"
            highlight-current
            :default-checked-keys="checkData"
            :props="defaultProps">
          </el-tree>
        </el-col>
        <el-col :span="24" style="text-align: center;margin-top: 10px">
          <el-button type="primary" @click="saveMenu">保存</el-button>
          <el-button @click="cancelMenu">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>


<script>
  import tableNormal from '../../../common/tableNormal'
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
          {prop:"operation",label:"操作",type:"operation"},
        ],
        multipleSelection:[],
        dialogVisible:false,
        dialogAccredit:false,
        bodyFalse:false,
        operation:true,
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
        multipleTable:[],
        treeData: [],
        defaultProps:{
          children: 'children',
          label: 'label'
        },
        menuId:"",
        menuData:[],
        checkData:[],
        treeObjArr:[]
      }
    },
    methods:{
      //搜索
      search(){
        this.$http.get("roles").then(res=>{
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
      //查询
      primary(){
        this.loading=true;
        let url="roles?roleName_like=";
        if(this.roleName){
          url="roles?roleName_like=";
        }else{
          url="roles";
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
      //导出
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
      //导出数据处理
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //翻页loading
      pageLoading(data){
        this.loading=data;
        setTimeout(()=>{
          this.loading=false
        },500)
      },
      //打开新增窗口
      add(){
        this.title="角色新增";
        this.dialogVisible=true;
      },
      //打开修改窗口
      redact(data){
        this.dialogVisible=true;
        this.title="角色修改";
        this.ruleForm.roleName=data.roleName;
        this.ruleForm.date=data.date;
        this.ruleForm.remark=data.remark;
        this.ruleForm.id=data.id;
      },
      multiTable(data){
        this.multipleSelection=data;
      },
      //删除方法
      deleteAll(){
        if(this.multipleSelection.length>0){
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading=true;
            this.$http.delete('roles/'+this.multipleSelection[0].id).then(res=>{
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
      //行删除
      deleteRow(data){
        if(data===true){
          this.deleteAll();
        }
      },
      //提交
      submitForm(){
        const _this=this;
        _this.$refs['ruleForm'].validate((valid)=>{
          if(valid){
            let url,msg,msg1;
            if(_this.title==="角色新增"){
              url="roles";
              msg="新增成功";
              msg1="新增失败";
              _this.$http.post(url,_this.ruleForm).then(res=>{
                _this.$message.success(msg);
                _this.loading=true;
                _this.dialogVisible=false;
                this.search();
              })
            }else{
              url="roles/"+this.ruleForm.id;
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
      //重置
      reset(){
        this.dialogVisible=false;
      },
      //关闭新增修改窗口
      dialogClose(ruleForm){
        this.dialogVisible=false;
        this.$refs[ruleForm].resetFields();
        // this.$refs.multipleTable.clearSelection();
        this.ruleForm={
          roleName:"",
          remark:'',
          date:"",
        };

      },
      //打开菜单授权窗口
      accredit(data){
        const _this=this;
        const result=[];
        _this.dialogAccredit=true;
        _this.roleId=data.id;
        _this.$http.get('menus/?roleId='+data.id).then(res=>{
          if(res.status===200){
            _this.menuData=res.data;
            _this.menuId=res.data[0].id
            _this.treeData=_this.menuData[0].menuList[0].children;
            getCheckData(_this.treeData);
            _this.checkData=result;
          }
        });
        //获取已选中的菜单
        function getCheckData(arr){
          if(arr){
            arr.forEach(item=>{
              _this.treeObjArr.push(item);//获取到待处理的数组数据
              item.hidden===false&&result.push(item.id);
              if(item.children instanceof Array){
                getCheckData(item.children)
              }
            })
          };
        }
      },
      //保存菜单
      saveMenu(){
        this.$http.patch('menus/'+ this.menuId,this.menuData[0]).then(res=>{
          if(res.status===200){
            this.dialogAccredit=false;
            this.$message.success("保存成功")
          }
        })
      },
      checkChange(data,node,child){
        data.hidden=!data.hidden;

      },
      //取消保存
      cancelMenu(){
        this.dialogAccredit=false;
      }
    },
    mounted(){
      this.search();

    },
    created(){

    }
  }
</script>

<style lang="less" scoped>
  #role{
    width: 100%;
    height: 100%;
  }

</style>
<style>
  #role .dialogAccredit .el-dialog__body{
    padding: 10px 50px;
  }
</style>
