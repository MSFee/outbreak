<template>
      <div >
          <div class="list">
              <div class="list_allData">
                 <p> <span>全国</span> {{ time }} (北京时间) 数据统计</p>
              </div>
              <div class="list_data">
                <ul>
                  <li>
                     <p>确诊</p>
                     <div> <span>{{ gntotal }}</span> 例 </div>
                     <div>较昨日 <span>+ {{ sus_gntotal }} </span></div>
                  </li>
                   <li>
                     <p>疑似</p>
                     <div> <span>{{ sustotal }}</span> 例 </div>
                     <div>较昨日 <span>+ {{ sus_sustotal }} </span></div>
                  </li>
                   <li>
                     <p>死亡</p>
                     <div> <span>{{ deathtotal }}</span> 例 </div>
                      <div>较昨日 <span>+ {{ sus_deathtotal }} </span></div>
                  </li>
                   <li>
                     <p>治愈</p>
                     <div> <span>{{ curetotal }}</span> 例 </div>
                      <div>较昨日 <span>+ {{ sus_curetotal }} </span></div>
                  </li>
                </ul>
              </div>
          </div>
          <div id="map" />
      </div>
</template>

<script lang="ts">
import china from 'echarts/map/json/china.json'
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
@Component
export default class chinaMap extends Vue {
  @Prop() private msg!: string;
   private time: string = '';
   private gntotal: string = '';
   private deathtotal: string = '';
   private sustotal: string = '';
   private curetotal: string = '';

   private sus_gntotal: number = 0;
   private sus_deathtotal: number = 0;
   private sus_sustotal: number = 0;
   private sus_curetotal: number = 0;

   private install(): void {
      const mapData =  this.getData();
      mapData.then(res => {
        const chinaData = res.data.data;
        console.log(chinaData);
        this.echarts.registerMap('china',china);
        const myEchart = this.echarts.init(document.getElementById('map'));
        myEchart.setOption({
          backgroundColor: '#FFFFFF',
          title: {
            text: '全国疫情图',
            subtext: '数据来源：新浪微博',
            x:'center'
          },
          tooltip : {
              transitionDuration: 0,
              axisPointer: {
                z: 2
              },
              triggerOn: 'click',
              trigger: 'item',
              enterable: true,
              backgroundColor: 'rgb(255,255,255,0.9)',
              borderWidth: 1,
              borderColor: '#ccc',
              textStyle: {
                color: '#666',
                fontSize: 9,
              },
              extraCssText: 'z-index: 2',
              confine: true,
              padding: 0,
              formatter: (param: any) => {
                    var toolTipStr = '';
                    toolTipStr = '<div style="width: 130px; height: 200px; padding: 10px;">' +
                        '<div style="color: blue; font-size: 20px; margin-top: 10px;">'+param.data.name+'</div>' +
                        '<div style="margin-top: 10px;font-size: 17px;color: #333;"><span style="display:block;margin-top: 20px;">确诊:'+param.data.value+'</span>' +
                        '<span style="display:block; margin-top: 20px;">死亡:'+param.data.deathNum+'</span>' +
                        '<span style="display:block; margin-top: 20px;">治愈:'+param.data.cureNum+'</span></div>' +
                    '</div>'
                    return toolTipStr
              }
          },
    
          //左侧小导航图标
          visualMap: {
            splitList: [
              {start: 1000},
              {start: 500, end: 1000},
              {start: 100, end: 499},
              {start: 10, end: 99},
              {start: 1, end: 9},
              {start: 0, end: 0},
            ],
            color: ['rgb(118,22,27)', 'rgb(201,47,49)', 'rgb(226,101,84)','rgb(242,168,140)', 'rgb(251,238,211)', '#fff'],
            left: 'left',
            top: 'bottom',
        },
    
        //配置属性
          series: [{
            name: '确诊人数',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
                normal: {
                    show: true,  //省份名称
                    textStyle: {
                      fontSize: 12,
                      fontWeight: 'bold',
                    }
                },
                emphasis: {
                    show: false
                }
            },
            data: chinaData
          }
        ]
        })
        }
      )
    }
    private async getData() {
       return  await this.axios.get('http://localhost:3000/getData?kind=national');
    }
    private getAllData(): void {
       this.axios.get('http://localhost:3000/getData').then((res: any) => {
         const data = res.data.data;
         this.time = data.times;
         this.gntotal = data.gntotal;
         this.deathtotal = data.deathtotal;
         this.sustotal = data.sustotal;
         this.curetotal = data.curetotal;

         const history = data.historylist;
         this.sus_gntotal = history[0].cn_conNum - history[1].cn_conNum;
         this.sus_deathtotal = history[0].cn_deathNum - history[1].cn_deathNum;
         this.sus_sustotal = history[0].cn_susNum - history[1].cn_susNum;
         this.sus_curetotal = history[0].cn_cureNum - history[1].cn_cureNum;
       })
    }
    private created(): void {
       this.getAllData();
    }
    private  mounted(): void{
       this.install();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list {
  height: 150px;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  background: rgb(245,245,245);
  .list_allData {
    display: flex;
    height: 30px;
    width: 100%;
    margin-top: 15px;
    span {
      display: inline-block;
      padding-left: 8px;
      padding-right: 8px;
      padding-top: 3px;
      padding-bottom: 3px;
      border-radius: 3px;
      background: rgb(77,121,243);
      font-weight: 700;
      color: white;
    }
    p {
      margin: 0 auto;
      color: #777;
      font-size: 15px;
    }
  }
  .list_data {
    margin: 0 auto;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
    }
    li {
      margin-right: 70px;
      p {
        font-size: 15px;
        font-weight: 600;
        margin: 0;
      }
      div:first-of-type {
        font-size: 20px;
        font-weight: 700;
        span{
          color: rgb(77,121,243);
        }
      }
      div:last-of-type {
        color: #777;
        span {
          font-weight: 700;
        }
      }
    }
  }
}
#map {
  width: 100vw;
  height: 500px;
}
.tool-tip-wrap {
  height: 400px;
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  .name {
    color: blue;
  }
}
</style>
