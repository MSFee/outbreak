<template>
  <div id="main"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
@Component
export default class DiscountMap extends Vue {
  private xAxisData: any[] = [];
  private cn_conNum: any[] = [];
  private cn_deathNum: any[] = [];
  private cn_cureNum: any[] = [];
  private cn_susNum: any[] = [];
  private history: any[] = [];
  private install(): void {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.echarts.init(document.getElementById('main'));
      // 绘制图表
        myChart.setOption({
        title: {
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['确诊', '疑似', '治愈', '死亡']
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '确诊',
                type: 'line',
                stack: '确诊',
                data: this.cn_conNum,
            },
            {
                name: '疑似',
                type: 'line',
                stack: '疑似',
                data: this.cn_susNum,
            },
            {
                name: '治愈',
                type: 'line',
                stack: '治愈',
                data: this.cn_cureNum,
            },
            {
                name: '死亡',
                type: 'line',
                stack: '死亡',
                data: this.cn_deathNum,
            }
        ]
        });
  }
  private getData(): void {
     this.axios.get('http://106.54.193.152:3000/getData?kind=national_broken').then((res: any) => {
              const data = res.data.data;
              this.history = data;
              this.history.reverse();
                this.history.map(item => {
                this.xAxisData.push(item.date);
                this.cn_conNum.push(item.cn_conNum);
                this.cn_deathNum.push(item.cn_deathNum);
                this.cn_cureNum.push(item.cn_cureNum);
                this.cn_susNum.push(item.cn_susNum);
              })
             this.install();
      })
  }
  private mounted(): void {
    this.getData();
  }
}
</script>
<style lang="less" scoped>
#main {
  height: 500px;
  width: 100vw;
}
</style>>