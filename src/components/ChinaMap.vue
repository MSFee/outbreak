<template>
      <div id="map">

      </div>
</template>

<script lang="ts">
import china from 'echarts/map/json/china.json'
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
@Component
export default class chinaMap extends Vue {
  @Prop() private msg!: string;
   private install(): void {
      const mapData =  this.getData();
      mapData.then(res => {
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
              trigger: 'item'
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
            name: '数据',
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
            data: res.data.data
          }
        ]
        })
        }
      )
    }
    private async getData() {
       return  await this.axios.get('http://106.54.193.152:3000/getData?kind=national');
    }
    private  mounted(): void{
       this.install();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #map {
    width: 100vw;
    height: 500px;
  }

</style>
