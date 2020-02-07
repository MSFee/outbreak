<template>
      <div >
          <div id="map" />
      </div>
</template>

<script lang="ts">
import world from 'echarts/map/json/world.json'
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
@Component
export default class chinaMap extends Vue {
  @Prop() private msg!: string;
   private install(): void {
      const mapData =  this.getData();
      mapData.then(res => {
        let worldData: any[] = [];
        worldData = res.data.data; 
        this.echarts.registerMap('china',world);
        const myEchart = this.echarts.init(document.getElementById('map'));
        myEchart.setOption({
          backgroundColor: '#FFFFFF',
          title: {
            text: '世界疫情图',
            subtext: '数据来源：新浪微博',
            x:'center'
          },
          tooltip : {
              trigger: 'item'
          },
    
          //左侧小导航图标
          visualMap: {
            splitList: [
              {start: 100},
              {start: 10, end: 100},
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
                    show: false,  //省份名称
                },
                emphasis: {
                    show: false
                }
            },
            data: worldData
          }
        ]
        })
        }
      )
    }
    private async getData() {
       return  await this.axios.get('http://localhost:3000/getData?kind=world');
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
