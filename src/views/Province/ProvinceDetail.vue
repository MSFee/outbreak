<template>
  <div class="body">
      <div id="main"></div>
      <ProvinceDiscount :childrenProvinceName="queryName"/>
  </div>
</template>
<script lang="ts">
import sichuan from "echarts/map/json/province/sichuan.json";
import hebei from "echarts/map/json/province/hebei.json";
import beijing from "echarts/map/json/province/beijing.json";
import hubei from "echarts/map/json/province/hubei.json";
import guangdong from "echarts/map/json/province/guangdong.json";
import zhejiang from "echarts/map/json/province/zhejiang.json";
import henan from "echarts/map/json/province/henan.json";
import hunan from "echarts/map/json/province/hunan.json";
import chongqing from "echarts/map/json/province/chongqing.json";
import anhui from "echarts/map/json/province/anhui.json";
import shandong from "echarts/map/json/province/shandong.json";
import jilin from "echarts/map/json/province/jilin.json";
import fujian from "echarts/map/json/province/fujian.json";
import jiangxi from "echarts/map/json/province/jiangxi.json";
import jiangsu from "echarts/map/json/province/jiangsu.json";
import shanghai from "echarts/map/json/province/shanghai.json";
import guangxi from "echarts/map/json/province/guangxi.json";
import hainan from "echarts/map/json/province/hainan.json";
import heilongjiang from "echarts/map/json/province/heilongjiang.json";
import liaoning from "echarts/map/json/province/liaoning.json";
import yunnan from "echarts/map/json/province/yunnan.json";
import tianjin from "echarts/map/json/province/tianjin.json";
import shanxi from "echarts/map/json/province/shanxi.json";
import neimenggu from "echarts/map/json/province/neimenggu.json";
import guizhou from "echarts/map/json/province/guizhou.json";
import xizang from "echarts/map/json/province/xizang.json";
import qinghai from "echarts/map/json/province/qinghai.json";
import xinjiang from "echarts/map/json/province/xinjiang.json";
import ningxia from "echarts/map/json/province/ningxia.json";

import { Component, Prop, Vue, Provide } from "vue-property-decorator";

import ProvinceDiscount from '@/views/Province/ProvinceDiscount.vue';
@Component({
   components: {
     ProvinceDiscount,
   }
})
export default class DiscountMap extends Vue {
  private charts = null;
  private provinceName: any;
  private cityData: any[] = [];
  private queryName: any;
  private arr: any[] = [
    sichuan,
    hebei,
    beijing,
    hubei,
    guangdong,
    zhejiang,
    henan,
    hunan,
    chongqing,
    anhui,
    shandong,
    jilin,
    fujian,
    jiangxi,
    jiangsu,
    shanghai,
    guangxi,
    hainan,
    shanxi,
    heilongjiang,
    liaoning,
    yunnan,
    tianjin,
    neimenggu,
    guizhou,
    xizang,
    qinghai,
    xinjiang,
    ningxia

  ];
  private arr2: any[] = [
    'sichuan',
    'hebei',
    'beijing',
    'hubei',
    'guangdong',
    'zhejiang',
    'henan',
    'hunan',
    'chongqing',
    'anhui',
    'shandong',
    'jilin',
    'fujian',
    'jiangxi',
    'jiangsu',
    'shanghai',
    'guangxi',
    'hainan',
    'shanxis',
    'heilongjiang',
    'liaoning',
    'yunnan',
    'tianjin',
    'neimenggu',
    'guizhou',
    'xizang',
    'qinghai',
    'xinjiang',
    'ningxia'
  ];
  private option = {
    backgroundColor: "#87CEFA", //设置背景颜色
    title: {
      show: true,
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    //左侧小导航图标
    visualMap: {
      show: true,
      x: "left",
      y: "bottom",
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
    series: [
      {
        name: "确诊",
        type: "map",

        map: "chongqing",
        roam: false,
        zoom: 1.2,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: false
          }
        },
        data: this.cityData
      }
    ]
  };
  private randomData(): number {
    return Math.round(Math.random() * (12 - 1) + 1);
  }
  private install(): void {
    this.echarts.registerMap("chongqing", this.provinceName);
    // 基于准备好的dom，初始化echarts实例
    const myChart = this.echarts.init(document.getElementById("main"));
    // 绘制图表

    myChart.setOption(this.option);
  }
  private created(): void {
    const name = this.$router.currentRoute.query.province;
    this.queryName = name;
    const map = new Map();
    for(let i=0;i< this.arr.length; i++) {
        map.set(this.arr2[i], this.arr[i]);
    }
    this.provinceName = map.get(name);
  }
  private getData() {
      this.axios.get(`http://106.54.193.152:3000/getProvince?name=${this.queryName}`).then((res: any) => {
          const data = res.data.data.data.city;
          data.map((item: any) => {
              const obj = {
                  name: item.name[item.name.length - 1] === '市' || item.name[item.name.length - 1] === '区' ? item.name : `${item.name}市`,
                  value: item.conNum,
              }
              this.cityData.push(obj);
          })
         this.install();
      })
  }
  private mounted(): void {
    // const myChart = this.echarts.init(document.getElementById("main"));
    this.getData();
  }
}
</script>
<style lang="less" scoped>
.body {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
}
#main {
  height: 500px;
  width: 100vw;
}
</style>



