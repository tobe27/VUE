<template>
   <div class="chart">
    <div class="title">
        <div class="tabs">
          <span>产品持有概况</span>
        </div>
    </div>
    
    <ve-pie class="pie" :data="chartData" height="350px"></ve-pie>
  </div>
  
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['产品类别', '持有人数'],
          rows: [
            { '产品类别': '授信率', '持有人数': 1393 },
            { '产品类别': '用信率', '持有人数': 3530 },
            { '产品类别': '借记卡', '持有人数': 2923 },
            { '产品类别': '手机银行', '持有人数': 3792 },
            { '产品类别': '存款有效户', '持有人数': 1723 },
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.chart {
  .title {
    padding: 8px;
    height:50px;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid #ddd;

    span {
      line-height:34px;
    }
  }
}
</style>
