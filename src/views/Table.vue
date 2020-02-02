<template>
  <div class="province">
    <el-table :data="tableData" style="width: 100%">

      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- <el-form label-position="left" inline class="demo-table-expand"> -->
          <div class="area" v-for="(item,index) in props.row.city" :key="index">
            <span>{{ item.name }}</span>
            <span>{{ item.conNum }}</span>
            <span>{{ item.deathNum }}</span>
            <span>{{ item.cureNum }}</span>
          </div>
          <!-- </el-form> -->
        </template>
      </el-table-column>

      <el-table-column width="170" label="省份" prop="name">
        <template slot-scope="scope">
          <span style="font-weight: 700;font-size: 16px;">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" label="确诊" prop="value">
        <template slot-scope="scope">
          <span style="font-weight: 700;font-size: 16px;">{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" label="死亡" prop="deathNum">
        <template slot-scope="scope">
          <span style="font-weight: 700;font-size: 16px;">{{ scope.row.deathNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="治愈" prop="cureNum">
        <template slot-scope="scope">
          <span style="font-weight: 700;font-size: 16px;">{{ scope.row.cureNum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="省份详情数据">
            <template slot="header" slot-scope="">
        <div class="province_detail">省份详情数据</div>
      </template>
                  <template slot-scope="scope">
          <!-- <span style="font-weight: 700;font-size: 16px;">{{ scope.row.cureNum }}</span>
           -->
            <div class="more_detail">
                            <el-button v-if="scope.row.city.length" size="small" type="primary" round class="more_detail">
               更多详情
           </el-button>
            </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
@Component
export default class DiscountMap extends Vue {
  private tableData: any[] = [];
  private getData(): void {
    this.axios
      .get("http://localhost:3000/getData?kind=province")
      .then((res: any[]) => {
        let response: any[] = res.data.data;
        response.map((item: any) => {
            let value: number = 0;
            let deathNum: number = 0;
            let cureNum: number = 0;
            if(item.city.length) {
                            item.city.map((tem: any) => {
                value += Number(tem.conNum);
                deathNum += Number(tem.deathNum);
                cureNum += Number(tem.cureNum);
            })
            let poor_value: number = Number(item.value) - value; 
            let poor_deathNum: number = Number(item.deathNum) - deathNum;
            let poor_cureNum: number = Number(item.cureNum) - cureNum;

            if(poor_value | poor_deathNum | poor_cureNum) {
                const obj: any = {
                    "name": '未命名地区',
                    "conNum": poor_value,
                    "susNum": 0,
                    "cureNum": poor_cureNum,
                    "deathNum": poor_deathNum,
                    "mapName": '未命名地区',
                }
                item.city.push(obj);
            }
            }
        })
        this.tableData = response;
      });
  }
  private mounted(): void {
    this.getData();
  }
}
</script>
<style lang="less" scoped>
.province {
  width: 70%;
  margin: 0 auto;
}
.area {
  width: 100%;
  display: flex;
  height: 25px;
  line-height: 25px;
  border-bottom: 1px solid #eee;
  :not(:first-child) {
    margin-left: 90px;
    width: 10px;
  }
  :first-child {
    width: 90px;
  }
  span {
    display: inline-block;
  }
}
.more_detail {
    text-align: center;
}
.province_detail {
    text-align: center;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>