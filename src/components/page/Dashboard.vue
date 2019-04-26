<template>
    <div id="dashboard">
        <el-row :gutter="10">
            <el-col :span="18">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-card shadow="hover" class="mgb10">
                    <img src="../../assets/1.png" class="image" style="height: 250px;width: 100%">
                    <div class="card-body">
                      <div class="card-header">
                        <h4>站区简介</h4>
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
                  <el-card shadow="hover" class="mgb10">
                    <div slot="header" class="clearfix">
                      <span>开机台时</span>
                    </div>
                    <div id="boot_prod_chart" style="width: 100%;height:250px;" v-on-echart-resize></div>
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
                  <el-card shadow="hover" class="mgb10">
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
                  <el-card shadow="hover" class="mgb10">
                    <div slot="header" class="clearfix">
                      <span>预警列表</span>
                    </div>
                    <table-normal
                      style="width: 70%;float: left"
                      :table-data="earlyTableData"
                      :table-header="earlyTableHeader"
                      :table-border="tableBorder"
                      :show-header="showHeader"
                      :show-stripe="showStripe"
                      :show-table-footer="showTableFooter"
                      :table-height="260">
                    </table-normal>
                    <div id="pie_prod_chart" style="width: 30%;height:250px;float: left" v-on-echart-resize></div>
                  </el-card>
                </el-col>
                <el-col :span="24">
                  <el-card shadow="hover" class="mgb10">
                    <div slot="header" class="clearfix">
                      <span>重要视频</span>
                    </div>
                    <div style="display: flex;height: 170px">
                      <div style="flex: 1">
                        <video height="100%" width="100%" src="../../assets/VID_20190328_002536.mp4" controls="controls"></video>
                      </div>
                      <div style="flex: 1">
                        <video height="100%" width="100%" src="../../assets/VID_20190328_002536.mp4" controls="controls"></video>
                      </div>
                      <div style="flex: 1">
                        <video height="100%" width="100%" src="../../assets/VID_20190328_002536.mp4" controls="controls"></video>
                      </div>
                      <div style="flex: 1">
                        <video height="100%" width="100%" src="../../assets/VID_20190328_002536.mp4" controls="controls"></video>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>

            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" class="mgb10">
                <div slot="header" class="clearfix">
                  <span>{{new Date().formatDate('MM')}}月{{new Date().formatDate('dd')}}日&nbsp;&nbsp;周{{week}}</span>
                </div>
                <div id="weather-view-he"></div>
                <div class="waterDrop">
                  <template v-for="(item,index) in waterDrop" >
                    <div class="d-w-item" v-bind:key="index">
                      <p>{{item.tm}}</p>
                      <i class="iconfont" :class="item.icon"></i>
                      <p>{{item.rain}}mm</p>
                    </div>
                  </template>
                </div>
              </el-card>
              <el-card shadow="hover" class="mgb10">
                <div slot="header" class="clearfix">
                 <span>雨量</span>
                </div>
                <div id="rain_prod_chart" style="width: 100%;height:250px;" v-on-echart-resize></div>
              </el-card>
              <el-card shadow="hover" class="mgb10">
                <div slot="header" class="clearfix">
                  <span>水位</span>
                </div>
                <div id="water_prod_chart" style="width: 100%;height:350px;" v-on-echart-resize></div>
              </el-card>
            </el-col>
        </el-row>
    </div>
</template>



<script>
  import tableNormal from '../common/tableNormal'
  import Schart from 'vue-schart';
  import echarts from 'echarts'
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
            earlyTableData:[
              {describe:"这里是预警描述,这里是预警描述"},
              {describe:"这里是预警描述,这里是预警描述"},
              {describe:"这里是预警描述,这里是预警描述"},
              {describe:"这里是预警描述,这里是预警描述"},
              {describe:"这里是预警描述,这里是预警描述"},
              {describe:"这里是预警描述,这里是预警描述"},
            ],
            earlyTableHeader:[
              {data:'',title:'',type:"selection"},
              {prop:"describe",label:"预警描述",type:"normal"},
            ],
            tableBorder:false,//是否显示边框
            showHeader:false,//是否显示表头
            showStripe:true,//是否带斑马条纹
            showTableFooter:false,//是否显示翻页
            waterDrop:[
              {tm:"现在",rain:"10",icon:"icon-shuidi"},
              {tm:"11时",rain:"10",icon:"icon-shuidi"},
              {tm:"12时",rain:"0",icon:"icon-drop"},
              {tm:"13时",rain:"0",icon:"icon-drop"},
              {tm:"14时",rain:"10",icon:"icon-shuidi"},
              {tm:"15时",rain:"0",icon:"icon-drop"},
            ]
          }
      },
      components: {
        Schart,
        tableNormal
      },
      computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        },
        week(){
          let str = "";
          let day=new Date().getDay()-1;
            switch (day) {
              case 0:
                str="一";
                break;
              case 1:
                str="二";
                break;
              case 2:
                str="三";
                break;
              case 3:
                str="四";
                break;
              case 4:
                str="五";
                break;
              case 5:
                str="六";
                break;
              case 6:
                str="七";
                break;
              default:
                str="";
                break
            };
            return str
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
        init_charts(){
          /**
           * 雨量
           */
          let rain_prod_chart = this.$echarts.init(document.getElementById('rain_prod_chart'));
          let rain_prod_chart_option={
            color: ['#3398DB'],
            xAxis: {
              type: 'category',
              data: ['13日', '14日', '15日', '16日', '17日']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [120, 200, 150, 80, 70],
              type: 'bar',
              barWidth:20
            }]
          };
          rain_prod_chart.setOption(rain_prod_chart_option);

          /**
           * 开机台数
           */
          let boot_prod_chart = this.$echarts.init(document.getElementById('boot_prod_chart'));
          let boot_prod_chart_option={
            color: ['#3398DB'],
            xAxis: {
              type: 'category',
              data: ['13日', '14日', '15日', '16日', '17日']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [120, 200, 150, 80, 70],
              type: 'bar',
              barWidth:20
            }]
          };
          boot_prod_chart.setOption(boot_prod_chart_option);

          /**
           * 水位
           */
          let water_prod_chart = this.$echarts.init(document.getElementById('water_prod_chart'));
          let water_prod_chart_option={
            xAxis: {
              type: 'category',
              data: ['13日', '14日', '15日', '16日', '17日']
            },
            legend: {
              data:['邮件营销','联盟广告','视频广告','直接访问']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
              },
              {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
              },
              {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
              }
            ]
          };
          water_prod_chart.setOption(water_prod_chart_option);


          let pie_prod_chart = this.$echarts.init(document.getElementById('pie_prod_chart'));
          let pie_prod_chart_option={
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
                ],
                label:false,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          pie_prod_chart.setOption(pie_prod_chart_option);
        },
        getWeather(){
          let oHead = document.getElementById('weather-view-he');
          let oScript= document.createElement("script");
          oScript.type = "text/javascript";
          oScript.src="https://apip.weatherdt.com/view/static/js/r.js?v=1111";
          oHead.appendChild( oScript);
        }
      },
      mounted() {
        this.getWeather();
        this.init_charts();
      },
      watch:{
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

#dashboard  .waterDrop{
  text-align: center;
  display: flex;
  font-size: 12px;
}
#dashboard .waterDrop .d-w-item{
  flex: 1;
}


</style>
<style>
/**
天气
*/
#dashboard #weather-view-he{
  border: none!important;
}
#dashboard #weather-view-he .wv-v-h-copyright{
  display: none;
}
</style>
