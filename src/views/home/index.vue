<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img src="../../assets/img/headImg.jpg" />
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="loginInfo">
            <p>上次登录时间：<span>2021-7-19</span></p>
            <p>上次登录时间：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px; height: 200px">
          <el-table :data="tableData" style="width: 100%">
            <!-- 遍历对象(val:对象属性值，key：对象属性名) -->
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="16" style="margin-top: 20px">
        <el-card shadow="hover" style="height: 280px">
          <div style="height: 280px" ref="echarts"></div>
        </el-card>
        <div class="graph">
          <el-card shadow="hover" style="height: 250px; flex: 1">
            <div style="height: 240px" ref="zhuEcharts"></div>
          </el-card>
          <el-card shadow="hover" style="height: 250px; flex: 1">
            <div style="height: 240px" ref="bingEcharts"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData, getMonthData } from "../../api/data.js";
import * as echarts from "echarts";

export default {
  name: "Index",

  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日销量",
        monthBuy: "月销量",
        totalBuy: "总销量",
      },
    };
  },

  mounted() {
    // 请求首页表格数据
    getData().then((res) => {
      this.tableData = res.data;
    });
    // 请求首页折线图数据
    getMonthData().then((res) => {
      const name = Object.keys(res.data[0]);
      const series = [];
      name.forEach((key) => {
        series.push({
          name: key,
          data: res.data.map((item) => item[key]),
          type: "line",
        });
      });
      const option = {
        title: {
          text: "各品牌月销量折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: name,
        },
        xAxis: {
          data: ["一月", "二月", "三月", "四月", "五月", "六月"],
        },
        yAxis: {
          type: "value",
        },
        series: series,
      };
      echarts.init(this.$refs.echarts).setOption(option);
    });

    // 柱状图
    const zhuOption = {
      legend: {
        textStyle: {
          color: "#FF0033",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: ["一", "二", "三", "四", "五", "六", "七"],
      },
      yAxis: {
        type: "value",
      },
      color: ["#FF0033", "#333399"],
      series: [
        {
          name: "新增用户",
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
        {
          name: "活跃用户",
          data: [80, 165, 50, 180, 70, 210, 100],
          type: "bar",
        },
      ],
    };
    echarts.init(this.$refs.zhuEcharts).setOption(zhuOption);

    // 饼图
    const bingOption = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "日销量",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "小米" },
            { value: 735, name: "华为" },
            { value: 580, name: "苹果" },
            { value: 484, name: "三星" },
            { value: 300, name: "vivo" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    echarts.init(this.$refs.bingEcharts).setOption(bingOption);
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.user {
  position: relative;
  border-bottom: 1px solid #cccc;
  img {
    position: relative;
    left: 0;
    top: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  .userInfo {
    position: absolute;
    left: 110px;
    top: 30px;
    .name {
      font-size: 25px;
      margin: 0 0 0 30px;
    }
    .access {
      font-size: 15px;
      color: #9999;
      margin: 0 0 80px 30px;
    }
  }
}
.graph {
  display: flex;
  height: 250px;
  width: 100%;
  margin-top: 15px;
}
</style>