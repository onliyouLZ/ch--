<template>
    <div id="dashboard">
        <el-row :gutter="20">
            <el-col :span="18">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-card shadow="hover" class="mgb20">
                    <img src="../../assets/1.png" class="image" style="height: 250px;width: 100%">
                    <div class="card-body">
                      <div class="card-header">
                        <h4>东西湖白马泾泵站</h4>
                        <div>
                        东西湖区防洪排涝的重点工程。设计总装机1900kw(6*3200kw),设计流量160m³/s，设计净扬程8.66m,设计排涝标准为二十年一遇，一日暴雨一日排完,设计暴雨量为212.03mm ,受益面积为50.7万亩,工程总投资为3.78亿元。
                      </div>
                      </div>
                      <div class="card-content">
                        <div class="c-c-item">
                          <h4>3/4</h4>
                          <span>开机台数</span>
                        </div>
                        <div class="c-c-item">
                          <h4>3</h4>
                          <span>本次运行台时</span>
                        </div>
                        <div class="c-c-item">
                          <h4>3</h4>
                          <span>累计运行台时</span>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="16">
                  <el-card shadow="hover" class="mgb10">
                    <div class="card-two">
                      <div class="c-t-item">
                        <svg   class="icon" aria-hidden="true">
                          <use  xlink:href="#icon-zongxiangbiaochi" x="15" y="0"></use>
                        </svg>
                        <p>前池水位</p>
                        <span class="c-t-i-n">88.88</span>
                      </div>
                      <div class="c-t-item">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-zongxiangbiaochi" x="15" y="0"></use>
                        </svg>
                        <p>外江水位</p>
                        <span class="c-t-i-n">88.88</span>
                      </div>
                      <div class="c-t-item">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-zongxiangbiaochi" x="15" y="0"></use>
                        </svg>
                        <p>隔污闸水位(前)</p>
                        <span class="c-t-i-n">88.88</span>
                      </div>
                      <div class="c-t-item">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-zongxiangbiaochi" x="15" y="0"></use>
                        </svg>
                        <p>隔污闸水位(后)</p>
                        <span class="c-t-i-n">88.88</span>
                      </div>
                    </div>
                  </el-card>
                  <el-card shadow="hover" class="mgb20">
                    <div slot="header" class="clearfix">
                      <span>任务列表</span>
                    </div>
                    <table-normal
                      :table-data="taskTableData"
                      :table-header="taskTableHeader"
                      :table-border="tableBorder"
                      :show-header="showHeader"
                      :show-stripe="showStripe"
                      :show-table-footer="showTableFooter"
                      :table-height="330">
                    </table-normal>
                  </el-card>
                </el-col>
              </el-row>

            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">

              </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import tableNormal from '../common/tableNormal'
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
              taskTableData:[
                {name:"巡检任务名称",department:"运行一部",tm:"2019-03-27",state:"未完成"},
                {name:"巡检任务名称",department:"运行一部",tm:"2019-03-27",state:"未完成"},
                {name:"巡检任务名称",department:"运行一部",tm:"2019-03-27",state:"未完成"},
                {name:"巡检任务名称",department:"运行一部",tm:"2019-03-27",state:"未完成"},
                {name:"巡检任务名称",department:"运行一部",tm:"2019-03-27",state:"未完成"},
                {name:"巡检任务名称",department:"运行一部",tm:"2019-03-27",state:"未完成"},
                {name:"巡检任务名称",department:"运行一部",tm:"2019-03-27",state:"未完成"},
              ],
              taskTableHeader:[
                {data:'',title:'',type:"selection"},
                {prop:"name",label:"任务名称",type:"normal"},
                {prop:"department",label:"任务部门",type:"normal"},
                {prop:"tm",label:"任务时间",type:"normal"},
                {prop:"state",label:"任务状态",type:"normal"},
              ],
              tableBorder:false,//是否显示边框
              showHeader:false,//是否显示表头
              showStripe:true,//是否带斑马条纹
              showTableFooter:false,//是否显示翻页
            }
        },
        components: {
          Schart,
          tableNormal
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){

        },
        activated(){

        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);

        },
        methods: {

        }
    }

</script>


<style scoped>

#dashboard .card-body{
  padding: 5px;
  text-align: center;
}
#dashboard .card-body  .card-header h4{

}
#dashboard .card-body  .card-header div{
  line-height: 30px;
  font-size: 14px;
}
#dashboard .card-body .card-content{
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px 0;
  background-color: #eef2f8;
}
#dashboard .card-body .card-content .c-c-item{
  flex: 1;
}
#dashboard .card-body .card-content .c-c-item h4{
  font-size: 30px;
  font-weight: normal;
}
#dashboard .card-body .card-content .c-c-item span{
  font-size: 14px;
}
#dashboard  .card-two{
  display: flex;
}
#dashboard  .card-two .c-t-item{
  flex: 1;
  height: 65px;
  line-height: 30px;
}
#dashboard  .card-two .c-t-item svg{
  float: left;
}
#dashboard  .card-two .c-t-item p{
  font-size: 14px;
}
#dashboard  .card-two .c-t-item .c-t-i-n{
  font-size: 30px;
}
</style>
