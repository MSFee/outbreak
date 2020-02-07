<template>
  <div class="main">
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in activities"
          :key="index"
          :timestamp="item.date"
          type="primary"
          placement="top"
        >
        <a :href="item.url">{{ item.title }}</a>
        </el-timeline-item>
      </el-timeline>
      <div @click="getMore" v-if="page < pageMaxNum" class="bottom">展开更多</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
@Component
export default class DynamicDetail extends Vue {
  private activities: any[] = [];
  private page: number = 1;
  private pageMaxNum: number = 0;
  private getData(): void {
    this.axios
      .get(`http://localhost:3000/getDynamic?page=${this.page}`)
      .then((res: any) => {
        const response = res.data.result;
        this.pageMaxNum = response.meta && response.meta.pageMaxNum || this.pageMaxNum;
        this.page === 1 ? this.activities = response.data : this.activities.push(...response.data);
      });
  }
  private getMore(): void {
      this.page ++;
      this.getData();
  }
  private created(): void {
    this.getData();
  }
}
</script>
<style lang="less" scoped>
.el-timeline {
  text-align: left;
}
.main {
  width: 100vw;
  background: #eee;
  overflow: hidden;
  .block {
    width: 50vw;
    margin: 1px auto;
    padding: 10px;
    background: #fff;
    a {
      color: black;
      font-size: 20px;
      cursor: pointer;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .bottom {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-top: 1px solid #ccc;
      color: blue;
      cursor: pointer;
    }
  }
}
</style>